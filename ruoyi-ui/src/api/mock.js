// 查看供应商列表
let suppliersList = {
    "total": 4,
    "rows": [{
            "id": 1,
            "line": 1,
            "lineString":"text",
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "pickup":"暂无",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11',
            "payType":0,
            "payTypeString":"公对公",
            "closeType":0,
            "closeTypeString":"现结",
            "tatio":50,
            "paymentDays":"text",
            "currentcy":0,
            "currentcyString":"USD",
            "proceeds":"text",
            "handleRemark":"编辑"
        },
        {
            "id": 2,
            "lineString": "text2",
            "line":2,
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "pickup":"暂无",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11',
            "payType":0,
            "payTypeString":"公对公",
            "closeType":0,
            "closeTypeString":"现结",
            "tatio":50,
            "paymentDays":"text",
            "currentcy":0,
            "currentcyString":"USD",
            "proceeds":"text",
            "handleRemark":"编辑"
        },
        {
            "id": 3,
            "lineString": "text3",
            "line":3,
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "pickup":"暂无",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11',
            "payType":0,
            "payTypeString":"公对公",
            "closeType":0,
            "closeTypeString":"现结",
            "tatio":50,
            "paymentDays":"text",
            "currentcy":0,
            "currentcyString":"USD",
            "proceeds":"text",
            "handleRemark":"编辑"
        },
        {
            "id": 4,
            "lineString": "text4",
            "line":4,
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "pickup":"暂无",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11',
            "payType":0,
            "payTypeString":"公对公",
            "closeType":0,
            "closeTypeString":"现结",
            "tatio":50,
            "paymentDays":"text",
            "currentcy":0,
            "currentcyString":"USD",
            "proceeds":"text",
            "handleRemark":"编辑"
        }
    ],
    "code": 200,
    "msg": "查询成功"
}

// 获取供应商的品线列表
export function lineArray(){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"查询成功",
      "data":[
        {"id":1, "label":"text"},
        {"id":2, "label":"text1"},
        {"id":3, "label":"text2"},
        {"id":4, "label":"text3"}
      ]
    }
    resolve(data)
  })
}

// 获取所有跟进人
export function persionArray(){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"查询成功",
      "data":[
        {"id":1, "label":"管理员"},
        {"id":2, "label":"员工"}
      ]
    }
    resolve(data)
  })
}

//查看供应商列表
export function getSuppliers() {
    return new Promise(function(resolve, reject) {
        resolve(suppliersList)
    })
}

// 查看供应商表单详情
export function getSuppliersById(id){
  let {rows} = suppliersList
  return new Promise(function(resolve, reject) {
    for(let i = 0; i<rows.length;i++){
      if(rows[i].id === id){
        let data = {
          "data":Object.assign({},rows[i]),
          "code": 200,
          "msg": ""
        }
        resolve(data) 
      }
    }
  })
}

// 查看供应商详情
export function getSupplierDetails(id){
  return new Promise(function(resolve, reject) {
    resolve(suppliersList)
  })
}

// 新增供应商
export function addSupplier(data){
  let {total,rows} = suppliersList
  total += 1
  data.id = total
  rows.push(data)
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"操作成功",
      "data":null,
    }
    resolve(data)
  })
}

// 更新供货商
export function updateSupplier(data){
  const {id} = data
  let {rows} = suppliersList
  for(let i = 0; i<rows.length;i++){
    if(rows[i].id === id){
      rows.splice(i,1,data)
    }
  }
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"操作成功",
      "data":null,
    }
    resolve(data)
  })
}

// 删除供货商
export function deleteSupplier(id){
  let {rows} = suppliersList
  if(Array.isArray(id)){
    //需后台处理多选删除
  }else{
    for(let i = 0; i<rows.length;i++){
      if(rows[i].id === id){
        rows.splice(i,1)
      }
    }
  }
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"操作成功",
      "data":null,
    }
    resolve(data)
  })
}

//获取所有支付方式
export function payTypeArray(){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"查询成功",
      "data":[
        {"id":0, "label":"供应商系统对私"},
        {"id":1, "label":"供应商系统对公"},
        {"id":2, "label":"公对公"}
      ]
    }
    resolve(data)
  })
}

// 获取所有结算方式
export function closeArray(){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"查询成功",
      "data":[
        {"id":0, "label":"现结"},
        {"id":1, "label":"月结"},
      ]
    }
    resolve(data)
  })
}

// 获取所有结算币种
export function currentcyArray(){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"查询成功",
      "data":[
        {"id":0, "label":"USD"},
        {"id":1, "label":"CNY转USD"},
        {"id":2, "label":"CNY"},
      ]
    }
    resolve(data)
  })
}

// 查询待审核数据
export function auditList(){
  return new Promise(function(resolve, reject) {
    resolve(suppliersList)
  })
}

// 审核数据--同意
export function agreeAudit(data){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"操作成功",
      "data":null,
    }
    resolve(data)
  })
}

// 审核数据--删除
export function deleteAudit(id){
  return new Promise(function(resolve, reject) {
    let data = {
      "code":200,
      "msg":"操作成功",
      "data":null,
    }
    resolve(data)
  })
}