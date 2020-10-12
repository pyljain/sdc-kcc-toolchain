"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeassist = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
const googleapis_1 = require("googleapis");
const io_k8s_api_core_v1_1 = require("./gen/io.k8s.api.core.v1");
const compute_instance_1 = require("./compute_instance");
const BASE_ENDPOINT = "recommender.googleapis.com/v1/projects";
function activeassist(configs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const vms = configs.getAll().filter(compute_instance_1.isComputeInstance);
        const namespacesWithProjectId = getNamespacesWithProjectID(configs);
        // Collect list of projects with locations
        const projectWithLocations = getProjectWithLocations(vms, namespacesWithProjectId);
        // Get a list of recommendations
        const auth = new googleapis_1.google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const authClient = yield auth.getClient();
        const token = ((_a = (yield authClient.getAccessToken())) === null || _a === void 0 ? void 0 : _a.token) || '';
        const recommendations = yield getAllRecommendations(projectWithLocations, token);
        // Filter recommendations which are not for operation = 'replace'
        const recommendationsToApply = recommendations.filter(filterRecommendations);
        // Mutate configs
        vms.forEach(vm => {
            let vmNamespace = vm.metadata.namespace;
            if (vmNamespace) {
                let vmProject = namespacesWithProjectId.get(vmNamespace);
                if (vmProject) {
                    recommendationsToApply.forEach(rec => {
                        var _a, _b;
                        (_b = (_a = rec.content) === null || _a === void 0 ? void 0 : _a.operationGroups) === null || _b === void 0 ? void 0 : _b.forEach(g => { var _a; return (_a = g.operations) === null || _a === void 0 ? void 0 : _a.forEach(operation => {
                            var _a;
                            if (operation.action == 'replace' &&
                                vm.metadata.name == getVMName(operation) &&
                                ((_a = vm.spec) === null || _a === void 0 ? void 0 : _a.zone) == getLocation(operation) &&
                                vmProject == getProject(operation)) {
                                if (vm.spec) {
                                    vm.spec.machineType = getMachineType(operation);
                                }
                            }
                        }); });
                    });
                }
            }
        });
    });
}
exports.activeassist = activeassist;
const getNamespacesWithProjectID = (configs) => configs.getAll().filter(io_k8s_api_core_v1_1.isNamespace)
    .reduce((acc, val) => {
    var _a, _b, _c;
    if ((_a = val === null || val === void 0 ? void 0 : val.metadata) === null || _a === void 0 ? void 0 : _a.annotations) {
        if ('cnrm.cloud.google.com/project-id' in ((_b = val === null || val === void 0 ? void 0 : val.metadata) === null || _b === void 0 ? void 0 : _b.annotations)) {
            acc.set(val.metadata.name, (_c = val === null || val === void 0 ? void 0 : val.metadata) === null || _c === void 0 ? void 0 : _c.annotations['cnrm.cloud.google.com/project-id']);
        }
    }
    return acc;
}, new Map());
const getProjectWithLocations = (vms, namespacesWithProjectId) => vms.reduce((acc, val) => {
    var _a;
    const ns = val.metadata.namespace;
    const location = (_a = val.spec) === null || _a === void 0 ? void 0 : _a.zone;
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
const getAllRecommendations = (projectWithLocations, token) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = Array.from(projectWithLocations.keys()).reduce((acc, project) => {
        const locations = projectWithLocations.get(project);
        const recommendationPromises = (locations === null || locations === void 0 ? void 0 : locations.map(location => invokeRecommendationAPI(project, location, token))) || [];
        return acc.concat(recommendationPromises);
    }, []);
    const recommendations = yield Promise.all(promises);
    return recommendations.reduce((acc, value) => {
        if (value.recommendations) {
            return acc.concat(value.recommendations);
        }
        return acc;
    }, []);
});
const invokeRecommendationAPI = (project, location, token) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        uri: `https://${BASE_ENDPOINT}/${project}/locations/${location}/recommenders/google.compute.instance.MachineTypeRecommender/recommendations`,
        headers: {
            "x-goog-user-project": project,
            "Authorization": `Bearer ${token}`
        },
        json: true
    };
    return request_promise_1.default(options);
});
const filterRecommendations = (recommendation) => {
    var _a;
    let groups = (_a = recommendation.content) === null || _a === void 0 ? void 0 : _a.operationGroups;
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
};
function getVMName(operation) {
    var _a;
    const parts = ((_a = operation.resource) === null || _a === void 0 ? void 0 : _a.split('/')) || [''];
    return parts.length > 0 ? parts[parts.length - 1] : '';
}
function getLocation(operation) {
    var _a;
    const parts = ((_a = operation.resource) === null || _a === void 0 ? void 0 : _a.split('/')) || [''];
    return parts.length > 7 ? parts[6] : '';
}
function getProject(operation) {
    var _a;
    const parts = ((_a = operation.resource) === null || _a === void 0 ? void 0 : _a.split('/')) || [''];
    return parts.length > 5 ? parts[4] : '';
}
function getMachineType(operation) {
    var _a;
    const parts = ((_a = operation.value) === null || _a === void 0 ? void 0 : _a.split('/')) || [''];
    return parts[parts.length - 1];
}
activeassist.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
//# sourceMappingURL=activeassist.js.map