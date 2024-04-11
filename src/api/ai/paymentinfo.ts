import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/ai/paymentInfo';

export interface DataRecord {
    id?: string;
    orderNo?: string;
    transactionId?: string;
    paymentType?: string;
    tradeType?: string;
    tradeState?: string;
    payerTotal?: string;
    content?: string;
    createTime?: string;
    updateTime?: string;
    createUserString?: string;
    updateUserString?: string;
}

export interface ListParam {
    orderNo?: string;
    transactionId?: string;
    paymentType?: string;
    tradeState?: string;
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
