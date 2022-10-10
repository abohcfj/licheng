// 查看供应商列表
const suppliersList = {
    "total": 4,
    "rows": [{
            "id": 1,
            "line": "text",
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11'
        },
        {
            "id": 2,
            "line": "text2",
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11'
        },
        {
            "id": 3,
            "line": "text3",
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11'
        },
        {
            "id": 4,
            "line": "text4",
            "code": "123456",
            "name": "alpha",
            "concat": "beta",
            "phone": "555-8989",
            "email": "888@gmail.com",
            "term": "2022-12-12",
            "method": "现结",
            "persion": "管理员",
            "address": "text",
            "remark": "bb",
            "createTime": '2022-10-10 12:33:11'
        }
    ],
    "code": 200,
    "msg": "查询成功"
}

export function getSuppliers() {
    return new Promise(function(resolve, reject) {
        resolve(suppliersList)
    })
}