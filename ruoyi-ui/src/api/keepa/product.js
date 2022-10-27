import request from '@/utils/request'

// 查询产品列表
export function listProduct(query) {
  return request({
    url: '/keepa/product/list',
    method: 'get',
    params: query
  })
}

// 查询产品详细
export function getProduct(productId) {
  return request({
    url: '/keepa/product/' + productId,
    method: 'get'
  })
}
// 查询产品详细
export function getProductHistoryInfo(query) {
  return request({
    url: '/keepa/product_history/list',
    method: 'get',
    params: query
  })
}

// 新增产品
export function addProduct(data) {
  return request({
    url: '/keepa/product',
    method: 'post',
    data: data
  })
}

// 修改产品
export function updateProduct(data) {
  return request({
    url: '/keepa/product',
    method: 'put',
    data: data
  })
}

// 删除产品
export function delProduct(productId) {
  return request({
    url: '/keepa/product/' + productId,
    method: 'delete'
  })
}

// 导入模板
export function template(data) {
  return request({
    url: '/keepa/product/import/template',
    method: 'post',
    data: data
  })
}

// 导入
export function importData(data) {
  return request({
    url: '/keepa/product/import',
    method: 'post',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
