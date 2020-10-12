import { Configs } from 'kpt-functions';
import {ComputeInstanceList} from './gen/com.google.cloud.cnrm.compute.v1beta1';
import request from 'request-promise'
const BASE_ENDPOINT="recommender.googleapis.com/v1/projects"
const PROJECT="sandbox-jainpayal"
// const RECOMMENDER="google.compute.instance.MachineTypeRecommender"
import {google} from 'googleapis'


export async function activeassist(configs: Configs) {
  // TODO: implement.
  console.error("Hello there")


  // Read KCC manifests from Github, from local directory ../manifests
  // let promises:Array<Promise<void>> = [];
  const listOfVMs = configs.getAll().filter(o => o.apiVersion == ComputeInstanceList.apiVersion && o.kind == 'ComputeInstance')
    .map((c: any) => {
      console.error("Value of c is", c)

      let vmParams = {
        name: c.metadata.name ,
        machineType: c.spec.machineType,
        location: c.spec.zone,
        // meta: c
      }
      return vmParams
    })

  // Parse through each config to see if it a VM and then look for recommendations
  console.log("Getting recommendations for VMs", listOfVMs)
  // Create an array of promises

  // Fetch OAuth Token
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  })

  const authClient = await auth.getClient()

  const TOKEN = (await authClient.getAccessToken()).token
  console.log("TOKEN IS", TOKEN)

  //Get recommendations for each project and recommendation type

  const getRecommendationsForProjectandType = (project:string, meta:any): Array<Promise<any>> => {

    project = PROJECT
    meta = {
      "google.compute.instance.MachineTypeRecommender": ["us-west1-a"]
    }

    let promises: Array<Array<Promise<any>>>
    promises = Object.keys(meta).map(k => {

      const o = meta[k].map((loc: any) => {
        let options = {
          uri: `https://${BASE_ENDPOINT}/${project}/locations/${loc}/recommenders/${k}/recommendations`,
          headers: {
          "x-goog-user-project": project,
          "Authorization": `Bearer ${TOKEN}`
          },
          json: true
        }
        console.log("Options are", options)
        return request(options)
      })

      return o;
    })

    return [].concat(...promises as any);

  }

  // Parse recommendations for each recommendation type
  const recommenderResponse = await Promise.all(getRecommendationsForProjectandType(PROJECT, {}))
  console.log("Response from Recommender API", JSON.stringify(recommenderResponse, null, 2))

  // let promises = listOfVMs.map(vm => {
  //     let options = {
  //       uri: `https://${BASE_ENDPOINT}/${PROJECT}/locations/${vm.location}/recommenders/${RECOMMENDER}/recommendations`,
  //       headers: {
  //       "x-goog-user-project": PROJECT,
  //       "Authorization": `Bearer ${TOKEN}`
  //       },
  //       json: true
  //     }
  //     console.log("Options are", options)
  //     return request(options)
  // })

  // const recommenderResponse = await Promise.all(promises)
  // console.log("Response from Recommender API", JSON.stringify(recommenderResponse, null, 2))

  // const getReplaceOpDetails = (recommendation: any) => {
  //   console.log("In getReplaceOpDetails", recommendation)
  //   let operations = recommendation.content.operationGroups[0].operations
  //   let details = operations.filter((op: any) => op.action == "replace")
  //   return {
  //     "vmName": details[0].resource,
  //     "recommendedChange": details[0].value
  //   }
  // }

  // let curatedRecommendations: any[] = []
  // if (recommenderResponse.length > 0) {
  //   console.log("Parsing recommendations")

  //   curatedRecommendations = recommenderResponse.map(rec => {
  //    // console.log("For recommendation", rec.recommendations[0])
  //     if (rec.recommendations) {
  //       let opDetails = getReplaceOpDetails(rec?.recommendations[0])
  //       console.log("Op details", opDetails)
  //       let curatedRecommendation = {
  //         vmName: opDetails.vmName,
  //         reason: rec.recommendations[0].description,
  //         recommendedChange: opDetails.recommendedChange,
  //         recommendationId: rec.recommendations[0].name,
  //         eTag: rec.recommendations[0].etag
  //       }
  //       console.log("RECO", curatedRecommendation)
  //       return curatedRecommendation
  //     }
  //     console.log("NO RECOMMENDATION")
  //     return
  //   })


  //   console.log("Parsing complete")
  // }

  // console.log("CURATED RECOMMENDATIONS", curatedRecommendations)

}



activeassist.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
