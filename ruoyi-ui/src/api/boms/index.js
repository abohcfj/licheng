import request from "@/utils/request";
import { getBoms, addBom, updateBom, getBomsById, deleteBom } from "@/api/mock";
// 查询BOM列表
export function listBoms(query) {
  return getBoms(query);
  // return request({
  //     url: '/purchase/supplier/list',
  //     method: 'get',
  //     params: query
  // })
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
  return addBom(data);
  // return request({
  //   url: '/boms',
  //   method: 'post',
  //   data: data
  // })
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
