"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComputeInstance = exports.ComputeInstanceSpec = exports.ComputeInstance = void 0;
const com_google_cloud_cnrm_compute_v1beta1_1 = require("./gen/com.google.cloud.cnrm.compute.v1beta1");
const KIND = 'ComputeInstance';
class ComputeInstance {
    constructor(meta) {
        this.apiVersion = com_google_cloud_cnrm_compute_v1beta1_1.ComputeInstanceList.apiVersion;
        this.kind = KIND;
        this.metadata = meta;
    }
}
exports.ComputeInstance = ComputeInstance;
class ComputeInstanceSpec {
}
exports.ComputeInstanceSpec = ComputeInstanceSpec;
function isComputeInstance(o) {
    return o && o.apiVersion === com_google_cloud_cnrm_compute_v1beta1_1.ComputeInstanceList.apiVersion && o.kind === KIND;
}
exports.isComputeInstance = isComputeInstance;
//# sourceMappingURL=compute_instance.js.map