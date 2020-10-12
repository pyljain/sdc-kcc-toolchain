"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSecretManagerSecretVersionList = exports.SecretManagerSecretVersionList = exports.isSecretManagerSecretList = exports.SecretManagerSecretList = void 0;
// SecretManagerSecretList is a list of SecretManagerSecret
class SecretManagerSecretList {
    constructor(desc) {
        this.apiVersion = SecretManagerSecretList.apiVersion;
        this.items = desc.items;
        this.kind = SecretManagerSecretList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SecretManagerSecretList = SecretManagerSecretList;
function isSecretManagerSecretList(o) {
    return o && o.apiVersion === SecretManagerSecretList.apiVersion && o.kind === SecretManagerSecretList.kind;
}
exports.isSecretManagerSecretList = isSecretManagerSecretList;
(function (SecretManagerSecretList) {
    SecretManagerSecretList.apiVersion = "secretmanager.cnrm.cloud.google.com/v1beta1";
    SecretManagerSecretList.group = "secretmanager.cnrm.cloud.google.com";
    SecretManagerSecretList.version = "v1beta1";
    SecretManagerSecretList.kind = "SecretManagerSecretList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SecretManagerSecretList.Metadata = Metadata;
})(SecretManagerSecretList = exports.SecretManagerSecretList || (exports.SecretManagerSecretList = {}));
// SecretManagerSecretVersionList is a list of SecretManagerSecretVersion
class SecretManagerSecretVersionList {
    constructor(desc) {
        this.apiVersion = SecretManagerSecretVersionList.apiVersion;
        this.items = desc.items;
        this.kind = SecretManagerSecretVersionList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SecretManagerSecretVersionList = SecretManagerSecretVersionList;
function isSecretManagerSecretVersionList(o) {
    return o && o.apiVersion === SecretManagerSecretVersionList.apiVersion && o.kind === SecretManagerSecretVersionList.kind;
}
exports.isSecretManagerSecretVersionList = isSecretManagerSecretVersionList;
(function (SecretManagerSecretVersionList) {
    SecretManagerSecretVersionList.apiVersion = "secretmanager.cnrm.cloud.google.com/v1beta1";
    SecretManagerSecretVersionList.group = "secretmanager.cnrm.cloud.google.com";
    SecretManagerSecretVersionList.version = "v1beta1";
    SecretManagerSecretVersionList.kind = "SecretManagerSecretVersionList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SecretManagerSecretVersionList.Metadata = Metadata;
})(SecretManagerSecretVersionList = exports.SecretManagerSecretVersionList || (exports.SecretManagerSecretVersionList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.secretmanager.v1beta1.js.map