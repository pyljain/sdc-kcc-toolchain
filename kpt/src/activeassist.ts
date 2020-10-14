import { Configs } from 'kpt-functions';
import request from 'request-promise'
import {google} from 'googleapis'

import { isNamespace, Namespace } from './gen/io.k8s.api.core.v1'
import {ComputeInstance, isComputeInstance} from './compute_instance'
import { Recommendations, Recommendation, RecommendationOperation } from './recommendation'

const BASE_ENDPOINT="recommender.googleapis.com/v1/projects"

export async function activeassist(configs: Configs) {

  const vms: ComputeInstance[] = configs.getAll().filter(isComputeInstance);
  console.log('vms', vms);

  const namespacesWithProjectId: Map<string, string> = getNamespacesWithProjectID(configs);
  console.log('namespacesWithProjectId', namespacesWithProjectId);

  // Collect list of projects with locations
  const projectWithLocations: Map<string, string[]> = getProjectWithLocations(vms, namespacesWithProjectId);
  console.log('projectWithLocations', projectWithLocations);

  // Get a list of recommendations
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  })

  // process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/node/.gcloud/credentials.json'

  const authClient = await auth.getClient();

  const token = (await authClient.getAccessToken())?.token || '';

  const recommendations = await getAllRecommendations(projectWithLocations, token);

  console.log('token', token);
  console.log('recommendations', recommendations);

  // Filter recommendations which are not for operation = 'replace'
  const recommendationsToApply =
    recommendations.filter(filterRecommendations);

  // Mutate configs
  vms.forEach(vm => {
    let vmNamespace = vm.metadata.namespace;
    if (vmNamespace) {
      let vmProject = namespacesWithProjectId.get(vmNamespace);

      if (vmProject) {
        recommendationsToApply.forEach(rec => {
            rec.content?.operationGroups?.forEach(g => g.operations?.forEach(operation => {
              if (operation.action == 'replace' &&
                  vm.metadata.name == getVMName(operation) &&
                  vm.spec?.zone == getLocation(operation) &&
                  vmProject == getProject(operation)) {
                if (vm.spec) {
                  vm.spec.machineType = getMachineType(operation);
                }
              }
            })
          )}
        )
      }
    }
  })
}

const getNamespacesWithProjectID = (configs: Configs): Map<string, string> =>
  configs.getAll().filter(isNamespace)
    .reduce((acc: Map<string, string>, val: Namespace) => {
      if (val?.metadata?.annotations) {
        if ('cnrm.cloud.google.com/project-id' in val?.metadata?.annotations) {
          acc.set(val.metadata.name, val?.metadata?.annotations['cnrm.cloud.google.com/project-id']);
        }
      }
      return acc;
    }, new Map())

const getProjectWithLocations = (
  vms: ComputeInstance[],
  namespacesWithProjectId: Map<string, string>): Map<string, string[]> =>
    vms.reduce((acc: Map<string, string[]>, val: ComputeInstance) => {
      const ns = val.metadata.namespace;
      const location = val.spec?.zone;
      if (ns && location) {
        if (namespacesWithProjectId.has(ns)) {
          const project = namespacesWithProjectId.get(ns);

          if (project) {
            let locations = acc.get(project) || [];
            locations.push(location);
            acc.set(project, locations);
          }
        }
      }

      return acc;
    }, new Map());

const getAllRecommendations = async (projectWithLocations: Map<string, string[]>, token: string): Promise<Recommendation[]> => {

  const promises = Array.from(projectWithLocations.keys()).reduce((acc: Promise<Recommendations>[], project: string) => {

    const locations = projectWithLocations.get(project);
    const recommendationPromises = locations?.map(location => invokeRecommendationAPI(project, location, token)) || [];
    return acc.concat(recommendationPromises)
  }, [])

  const recommendations = await Promise.all(promises);

  return recommendations.reduce((acc: Recommendation[], value: Recommendations) => {
    if (value.recommendations) {
      return acc.concat(value.recommendations);
    }
    return acc
  }, [])
}

const invokeRecommendationAPI = async (project: string, location: string, token: string): Promise<Recommendations> => {

  let options = {
    uri: `https://${BASE_ENDPOINT}/${project}/locations/${location}/recommenders/google.compute.instance.MachineTypeRecommender/recommendations`,
    headers: {
    "x-goog-user-project": project,
    "Authorization": `Bearer ${token}`
    },
    json: true
  }

  return request(options);
}

const filterRecommendations = (recommendation: Recommendation): Boolean => {

  let groups = recommendation.content?.operationGroups;
  if (recommendation.recommenderSubtype == 'CHANGE_MACHINE_TYPE' && groups) {
    for (let group of groups) {
      if (group.operations) {
        for (let operation of group.operations) {
          if (operation.action == 'replace') {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function getVMName(operation: RecommendationOperation): string {
  const parts = operation.resource?.split('/') || [''];
  return parts.length > 0 ? parts[parts.length - 1] : '';
}

function getLocation(operation: RecommendationOperation): string {
  const parts = operation.resource?.split('/') || [''];
  return parts.length > 7 ? parts[6] : '';
}

function getProject(operation: RecommendationOperation): string {
  const parts = operation.resource?.split('/') || [''];
  return parts.length > 5 ? parts[4] : '';
}

function getMachineType(operation: RecommendationOperation): string {
  const parts = operation.value?.split('/') || [''];
  return parts[parts.length - 1];
}

activeassist.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
