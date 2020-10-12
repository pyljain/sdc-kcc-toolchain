"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBigtableTableList = exports.BigtableTableList = exports.isBigtableInstanceList = exports.BigtableInstanceList = exports.isBigtableGCPolicyList = exports.BigtableGCPolicyList = exports.isBigtableAppProfileList = exports.BigtableAppProfileList = void 0;
// BigtableAppProfileList is a list of BigtableAppProfile
class BigtableAppProfileList {
    constructor(desc) {
        this.apiVersion = BigtableAppProfileList.apiVersion;
        this.items = desc.items;
        this.kind = BigtableAppProfileList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigtableAppProfileList = BigtableAppProfileList;
function isBigtableAppProfileList(o) {
    return o && o.apiVersion === BigtableAppProfileList.apiVersion && o.kind === BigtableAppProfileList.kind;
}
exports.isBigtableAppProfileList = isBigtableAppProfileList;
(function (BigtableAppProfileList) {
    BigtableAppProfileList.apiVersion = "bigtable.cnrm.cloud.google.com/v1beta1";
    BigtableAppProfileList.group = "bigtable.cnrm.cloud.google.com";
    BigtableAppProfileList.version = "v1beta1";
    BigtableAppProfileList.kind = "BigtableAppProfileList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigtableAppProfileList.Metadata = Metadata;
})(BigtableAppProfileList = exports.BigtableAppProfileList || (exports.BigtableAppProfileList = {}));
// BigtableGCPolicyList is a list of BigtableGCPolicy
class BigtableGCPolicyList {
    constructor(desc) {
        this.apiVersion = BigtableGCPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = BigtableGCPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigtableGCPolicyList = BigtableGCPolicyList;
function isBigtableGCPolicyList(o) {
    return o && o.apiVersion === BigtableGCPolicyList.apiVersion && o.kind === BigtableGCPolicyList.kind;
}
exports.isBigtableGCPolicyList = isBigtableGCPolicyList;
(function (BigtableGCPolicyList) {
    BigtableGCPolicyList.apiVersion = "bigtable.cnrm.cloud.google.com/v1beta1";
    BigtableGCPolicyList.group = "bigtable.cnrm.cloud.google.com";
    BigtableGCPolicyList.version = "v1beta1";
    BigtableGCPolicyList.kind = "BigtableGCPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigtableGCPolicyList.Metadata = Metadata;
})(BigtableGCPolicyList = exports.BigtableGCPolicyList || (exports.BigtableGCPolicyList = {}));
// BigtableInstanceList is a list of BigtableInstance
class BigtableInstanceList {
    constructor(desc) {
        this.apiVersion = BigtableInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = BigtableInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigtableInstanceList = BigtableInstanceList;
function isBigtableInstanceList(o) {
    return o && o.apiVersion === BigtableInstanceList.apiVersion && o.kind === BigtableInstanceList.kind;
}
exports.isBigtableInstanceList = isBigtableInstanceList;
(function (BigtableInstanceList) {
    BigtableInstanceList.apiVersion = "bigtable.cnrm.cloud.google.com/v1beta1";
    BigtableInstanceList.group = "bigtable.cnrm.cloud.google.com";
    BigtableInstanceList.version = "v1beta1";
    BigtableInstanceList.kind = "BigtableInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigtableInstanceList.Metadata = Metadata;
})(BigtableInstanceList = exports.BigtableInstanceList || (exports.BigtableInstanceList = {}));
// BigtableTableList is a list of BigtableTable
class BigtableTableList {
    constructor(desc) {
        this.apiVersion = BigtableTableList.apiVersion;
        this.items = desc.items;
        this.kind = BigtableTableList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigtableTableList = BigtableTableList;
function isBigtableTableList(o) {
    return o && o.apiVersion === BigtableTableList.apiVersion && o.kind === BigtableTableList.kind;
}
exports.isBigtableTableList = isBigtableTableList;
(function (BigtableTableList) {
    BigtableTableList.apiVersion = "bigtable.cnrm.cloud.google.com/v1beta1";
    BigtableTableList.group = "bigtable.cnrm.cloud.google.com";
    BigtableTableList.version = "v1beta1";
    BigtableTableList.kind = "BigtableTableList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigtableTableList.Metadata = Metadata;
})(BigtableTableList = exports.BigtableTableList || (exports.BigtableTableList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.bigtable.v1beta1.js.map