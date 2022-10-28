import request from "@/utils/request";
import {
  getSuppliers,
  getSuppliersById,
  lineArray,
  persionArray,
  payTypeArray,
  closeArray,
  currentcyArray,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierDetails,
  auditList,
  agreeAudit,
  deleteAudit,
} from "@/api/mock";
// 查询供货商列表
export function listSuppliers(query) {
  const {pageSize,pageNum} = query
  let params = {pageSize,pageNum}
  return request({
      url: '/purchase/supplier/list',
      method: 'post',
      data: query,
      params
  })
}

// 查看供货商表单详情
export function getSupplier(id) {
  return request({
    url: '/purchase/supplier/' + id,
    method: 'get'
  })
}

// 查看供货商详情
export function getDetails(id) {
  return getSupplierDetails(id);
}

// 新增供货商
export function handleAddSupplier(data) {
  return request({
    url: '/purchase/supplier',
    method: 'post',
    data: data
  })
}

// 更新供货商
export function handleUpdateSupplier(data) {
  return request({
    url: '/purchase/supplier',
    method: 'put',
    data: data
  })
}

// 删除供货商
export function handleDeleteSupplier(id) {
  return request({
    url: '/purchase/supplier/' + id,
    method: 'delete',
  })
}

// 查询待审核的数据
export function listAudit() {
  return request({
    url: '/purchase/supplier/list/in_review',
    method: 'get'
  })
}

// 审核数据--同意
export function handleAgreeAudit(id) {
  return request({
    url: '/purchase/supplier/audit/'+id,
    method: 'get',
  })
}

// 审核数据--删除
export function handleDeleteAudit(id) {
  return request({
    url: '/purchase/supplier/reject/'+id,
    method: 'get',
  })
}

// 判断供应商名称是否可用
export function checkUsableTitle(query){
  return request({
    url:'/purchase/supplier/usable/title',
    method:'get',
    params:query
  })
}

// 判断供应商代码是否可用
export function checkUsableCode(query){
  return request({
    url:'/purchase/supplier/usable/code',
    method:'get',
    params:query
  })
}


// 获取所有品线
export function getAllLines() {
  return lineArray();
}

//获取所有跟进人
export function getAllPersions() {
  return persionArray();
}

//获取所有支付方式
export function getAllPayType() {
  return payTypeArray();
}

// 获取所有结算方式
export function getAllClose() {
  return closeArray();
}

// 获取所有结算币种
export function getAllCurrentcy() {
  return currentcyArray();
}

// 根据关键字搜索下拉框的值
export function searchBykeyword(url, params) {
  return request({
    url,
    method: "get",
    params,
  });
}
