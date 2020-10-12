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
const com_google_cloud_cnrm_compute_v1beta1_1 = require("./gen/com.google.cloud.cnrm.compute.v1beta1");
const request_promise_1 = __importDefault(require("request-promise"));
const BASE_ENDPOINT = "recommender.googleapis.com/v1/projects";
const PROJECT = "sandbox-jainpayal";
// const RECOMMENDER="google.compute.instance.MachineTypeRecommender"
const googleapis_1 = require("googleapis");
function activeassist(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: implement.
        console.error("Hello there");
        // Read KCC manifests from Github, from local directory ../manifests
        // let promises:Array<Promise<void>> = [];
        const listOfVMs = configs.getAll().filter(o => o.apiVersion == com_google_cloud_cnrm_compute_v1beta1_1.ComputeInstanceList.apiVersion && o.kind == 'ComputeInstance')
            .map((c) => {
            console.error("Value of c is", c);
            let vmParams = {
                name: c.metadata.name,
                machineType: c.spec.machineType,
                location: c.spec.zone,
            };
            return vmParams;
        });
        // Parse through each config to see if it a VM and then look for recommendations
        console.log("Getting recommendations for VMs", listOfVMs);
        // Create an array of promises
        // Fetch OAuth Token
        const auth = new googleapis_1.google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const authClient = yield auth.getClient();
        const TOKEN = (yield authClient.getAccessToken()).token;
        console.log("TOKEN IS", TOKEN);
        //Get recommendations for each project and recommendation type
        const getRecommendationsForProjectandType = (project, meta) => {
            project = PROJECT;
            meta = {
                "google.compute.instance.MachineTypeRecommender": ["us-west1-a"]
            };
            let promises;
            promises = Object.keys(meta).map(k => {
                const o = meta[k].map((loc) => {
                    let options = {
                        uri: `https://${BASE_ENDPOINT}/${project}/locations/${loc}/recommenders/${k}/recommendations`,
                        headers: {
                            "x-goog-user-project": project,
                            "Authorization": `Bearer ${TOKEN}`
                        },
                        json: true
                    };
                    console.log("Options are", options);
                    return request_promise_1.default(options);
                });
                return o;
            });
            return [].concat(...promises);
        };
        // Parse recommendations for each recommendation type
        const recommenderResponse = yield Promise.all(getRecommendationsForProjectandType(PROJECT, {}));
        console.log("Response from Recommender API", JSON.stringify(recommenderResponse, null, 2));
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
    });
}
exports.activeassist = activeassist;
activeassist.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
//# sourceMappingURL=activeassist_backup.js.map