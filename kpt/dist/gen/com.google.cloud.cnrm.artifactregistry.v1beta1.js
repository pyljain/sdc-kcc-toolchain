"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArtifactRegistryRepositoryList = exports.ArtifactRegistryRepositoryList = void 0;
// ArtifactRegistryRepositoryList is a list of ArtifactRegistryRepository
class ArtifactRegistryRepositoryList {
    constructor(desc) {
        this.apiVersion = ArtifactRegistryRepositoryList.apiVersion;
        this.items = desc.items;
        this.kind = ArtifactRegistryRepositoryList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ArtifactRegistryRepositoryList = ArtifactRegistryRepositoryList;
function isArtifactRegistryRepositoryList(o) {
    return o && o.apiVersion === ArtifactRegistryRepositoryList.apiVersion && o.kind === ArtifactRegistryRepositoryList.kind;
}
exports.isArtifactRegistryRepositoryList = isArtifactRegistryRepositoryList;
(function (ArtifactRegistryRepositoryList) {
    ArtifactRegistryRepositoryList.apiVersion = "artifactregistry.cnrm.cloud.google.com/v1beta1";
    ArtifactRegistryRepositoryList.group = "artifactregistry.cnrm.cloud.google.com";
    ArtifactRegistryRepositoryList.version = "v1beta1";
    ArtifactRegistryRepositoryList.kind = "ArtifactRegistryRepositoryList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ArtifactRegistryRepositoryList.Metadata = Metadata;
})(ArtifactRegistryRepositoryList = exports.ArtifactRegistryRepositoryList || (exports.ArtifactRegistryRepositoryList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.artifactregistry.v1beta1.js.map