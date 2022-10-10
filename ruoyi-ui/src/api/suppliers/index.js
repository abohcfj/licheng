import request from '@/utils/request'
import { getSuppliers } from '@/api/mock'
// 查询供货商列表
export function listSuppliers(query) {

    return getSuppliers();
    // return request({
    //     url: '/suppliers/list',
    //     method: 'get',
    //     params: query
    // })
}