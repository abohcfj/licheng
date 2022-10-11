import request from '@/utils/request'
import { getSuppliers,getSuppliersById,lineArray,persionArray,payTypeArray,closeArray,currentcyArray,addSupplier,updateSupplier,deleteSupplier
  ,getSupplierDetails,auditList,agreeAudit,deleteAudit } from '@/api/mock'
// 查询供货商列表
export function listSuppliers(query) {
    return getSuppliers();
    // return request({
    //     url: '/suppliers/list',
    //     method: 'get',
    //     params: query
    // })
}

// 查看供货商表单详情
export function getSupplier(id){
  return getSuppliersById(id);
  // return request({
  //   url: '/suppliers/' + id,
  //   method: 'get'
  // })
}

// 查看供货商详情
export function getDetails(id){
  return getSupplierDetails(id)
}

// 新增供货商
export function handleAddSupplier(data){
  return addSupplier(data)
  // return request({
  //   url: '/suppliers',
  //   method: 'post',
  //   data: data
  // })
}

// 更新供货商
export function handleUpdateSupplier(data){
  return updateSupplier(data)
  // return request({
  //   url: '/suppliers',
  //   method: 'put',
  //   data: data
  // })
}

// 删除供货商
export function handleDeleteSupplier(id){
  return deleteSupplier(id)
  // return request({
  //   url: '/suppliers/' + id,
  //   method: 'delete',
  // })
}

// 查询待审核的数据
export function listAudit(){
  return auditList()
  // return request({
  //   url: '/suppliers/audit',
  //   method: 'get'
  // })
}

// 审核数据--同意
export function handleAgreeAudit(data){
  return agreeAudit(data);
  // return request({
  //   url: '/suppliers/audit/agree',
  //   method: 'put',
  //   data
  // })
}

// 审核数据--删除
export function handleDeleteAudit(id){
  return deleteAudit(id);
  // return request({
  //   url: '/suppliers/audit/delete/'+id,
  //   method: 'delete',
  //   data
  // })
}

// 获取所有品线
export function getAllLines(){
  return lineArray()
}

//获取所有跟进人
export function getAllPersions(){
  return persionArray()
}

//获取所有支付方式
export function getAllPayType(){
  return payTypeArray()
}

// 获取所有结算方式
export function getAllClose(){
  return closeArray()
}

// 获取所有结算币种
export function getAllCurrentcy(){
  return currentcyArray()
}