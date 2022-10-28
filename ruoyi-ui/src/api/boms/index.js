import request from "@/utils/request";
import { getBoms, addBom, updateBom, getBomsById, deleteBom } from "@/api/mock";
// 查询BOM列表
export function listBoms(query) {
  const {pageSize,pageNum} = query
  let params = {pageSize,pageNum}
  return request({
      url: '/purchase/bom/list',
      method: 'post',
      data: query,
      params
  })
}

// 查看供货商表单详情
export function getBom(id) {
  return getBomsById(id);
  // return request({
  //   url: '/boms/' + id,
  //   method: 'get'
  // })
}

// 新增供货商
export function handleAddBom(data) {
  return request({
    url: '/purchase/bom',
    method: 'post',
    data: data
  })
}

// 更新BOM
export function handleUpdateBom(data) {
  return updateBom(data);
  // return request({
  //   url: '/boms',
  //   method: 'put',
  //   data: data
  // })
}

// 删除BOM
export function handleDeleteBom(id) {
  return deleteBom(id);
  // return request({
  //   url: '/boms/' + id,
  //   method: 'delete',
  // })
}
