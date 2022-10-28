import request from "@/utils/request";
// 查询BOM列表
export function listUnits(query) {
  const {pageSize,pageNum} = query
  let params = {pageSize,pageNum}
  return request({
      url: '/bom/unit/list',
      method: 'post',
      data: query,
      params
  })
}


