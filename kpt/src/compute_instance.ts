import { KubernetesObject } from 'kpt-functions';
import {ComputeInstanceList} from './gen/com.google.cloud.cnrm.compute.v1beta1';
import * as apisMetaV1 from './gen/io.k8s.apimachinery.pkg.apis.meta.v1';

const KIND = 'ComputeInstance'

export class ComputeInstance implements KubernetesObject {
  public apiVersion: string;
  public kind: string;
  public metadata: apisMetaV1.ObjectMeta;
  public spec?: ComputeInstanceSpec;

  constructor(meta: apisMetaV1.ObjectMeta) {
    this.apiVersion = ComputeInstanceList.apiVersion
    this.kind = KIND
    this.metadata = meta;
  }
}

export class ComputeInstanceSpec {
  public machineType?: string;
  public zone?: string;
  public minCpuPlatform?: string;
}

export function isComputeInstance(o: any): o is ComputeInstance {
  return o && o.apiVersion === ComputeInstanceList.apiVersion && o.kind === KIND;
}