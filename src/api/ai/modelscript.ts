import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/ai/modelScript';

export interface DataRecord {
  id?: string;
  name?: string;
  modelId?: string;
  prompt?: string;
  coverUrl?: string;
  status?: string;
  isDelete?: string;
  createUser?: string;
  createTime?: string;
  updateUser?: string;
  updateTime?: string;
  createUserString?: string;
  updateUserString?: string;
}

export interface ListParam {
  name?: string;
  modelId?: string;
  prompt?: string;
  status?: string;
  createUser?: string;
  createTime?: string;
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface ListRes {
  list: DataRecord[];
  total: number;
}

export function list(params: ListParam) {
  return axios.get<ListRes>(`${BASE_URL}`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function get(id: string) {
  return axios.get<DataRecord>(`${BASE_URL}/${id}`);
}

export function add(req: DataRecord) {
  return axios.post(BASE_URL, req);
}

export function update(req: DataRecord, id: string) {
  return axios.put(`${BASE_URL}/${id}`, req);
}

export function del(ids: string | Array<string>) {
  return axios.delete(`${BASE_URL}/${ids}`);
}
