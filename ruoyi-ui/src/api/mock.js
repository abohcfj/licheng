// 查看供应商列表
let suppliersList = {
  total: 4,
  rows: [
    {
      id: 1,
      productLine: "text",
      code: "123456",
      title: "alpha",
      contactName: "beta",
      contactPhone: "555-8989",
      contactEmail: "888@gmail.com",
      paymentPeriod: "2022-12-12",
      principal: "管理员",
      contactAddress: "text",
      shippingAddress: "暂无",
      note: "bb",
      createdDate: "2022-10-10 12:33:11",
      paymentOption: "公对公",
      settleOption: "现结",
      prepaidPercentage: 50,
      paymentPeriod: "text",
      settleCurrency: "USD",
      paymentInfo: "text",
      handleRemark: "编辑",
      olddata: {
        id: 1,
        productLine: "text22",
        code: "12345611",
        title: "alpha2",
        contactName: "beta3",
        contactPhone: "555-8989",
        contactEmail: "888@gmail.com",
        paymentPeriod: "2022-12-12",
        principal: "管理员",
        contactAddress: "text",
        shippingAddress: "暂无",
        note: "bb",
        createdDate: "2022-10-10 12:33:11",
        paymentOption: "公对公",
        settleOption: "现结",
        prepaidPercentage: 50,
        paymentPeriod: "text",
        settleCurrency: "USD",
        paymentInfo: "text",
        handleRemark: "编辑",
      },
    },
    {
      id: 2,
      productLine: "text2",
      code: "123456",
      title: "alpha",
      contactName: "beta",
      contactPhone: "555-8989",
      contactEmail: "888@gmail.com",
      paymentPeriod: "2022-12-12",
      principal: "管理员",
      contactAddress: "text",
      shippingAddress: "暂无",
      note: "bb",
      createdDate: "2022-10-10 12:33:11",
      paymentOption: "公对公",
      settleOption: "现结",
      prepaidPercentage: 50,
      paymentPeriod: "text",
      settleCurrency: "USD",
      paymentInfo: "text",
      handleRemark: "编辑",
    },
    {
      id: 3,
      productLine: "text3",
      code: "123456",
      title: "alpha",
      contactName: "beta",
      contactPhone: "555-8989",
      contactEmail: "888@gmail.com",
      paymentPeriod: "2022-12-12",
      principal: "管理员",
      contactAddress: "text",
      shippingAddress: "暂无",
      note: "bb",
      createdDate: "2022-10-10 12:33:11",
      paymentOption: "公对公",
      settleOption: "现结",
      prepaidPercentage: 50,
      paymentPeriod: "text",
      settleCurrency: "USD",
      paymentInfo: "text",
      handleRemark: "编辑",
    },
    {
      id: 4,
      productLine: "text4",
      code: "123456",
      title: "alpha",
      contactName: "beta",
      contactPhone: "555-8989",
      contactEmail: "888@gmail.com",
      paymentPeriod: "2022-12-12",
      principal: "管理员",
      contactAddress: "text",
      shippingAddress: "暂无",
      note: "bb",
      createdDate: "2022-10-10 12:33:11",
      paymentOption: "公对公",
      settleOption: "现结",
      prepaidPercentage: 50,
      paymentPeriod: "text",
      settleCurrency: "USD",
      paymentInfo: "text",
      handleRemark: "编辑",
    },
  ],
  code: 200,
  msg: "查询成功",
};

// 获取供应商的品线列表
export function lineArray() {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "查询成功",
      data: [
        {
          id: 1,
          label: "text",
        },
        {
          id: 2,
          label: "text1",
        },
        {
          id: 3,
          label: "text2",
        },
        {
          id: 4,
          label: "text3",
        },
      ],
    };
    resolve(data);
  });
}

// 获取所有跟进人
export function persionArray() {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "查询成功",
      data: [
        {
          id: 1,
          label: "管理员",
        },
        {
          id: 2,
          label: "员工",
        },
      ],
    };
    resolve(data);
  });
}

//查看供应商列表
export function getSuppliers() {
  return new Promise(function (resolve, reject) {
    resolve(suppliersList);
  });
}

// 查看供应商表单详情
export function getSuppliersById(id) {
  let { rows } = suppliersList;
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        let data = {
          data: Object.assign({}, rows[i]),
          code: 200,
          msg: "",
        };
        resolve(data);
      }
    }
  });
}

// 查看供应商详情
export function getSupplierDetails(id) {
  return new Promise(function (resolve, reject) {
    resolve(suppliersList);
  });
}

// 新增供应商
export function addSupplier(data) {
  let { total, rows } = suppliersList;
  total += 1;
  data.id = total;
  rows.push(data);
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

// 更新供货商
export function updateSupplier(data) {
  const { id } = data;
  let { rows } = suppliersList;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === id) {
      rows.splice(i, 1, data);
    }
  }
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

// 删除供货商
export function deleteSupplier(id) {
  let { rows } = suppliersList;
  if (Array.isArray(id)) {
    //需后台处理多选删除
  } else {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        rows.splice(i, 1);
      }
    }
  }
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

//获取所有支付方式
export function payTypeArray() {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "查询成功",
      data: [
        {
          id: 0,
          label: "供应商系统对私",
        },
        {
          id: 1,
          label: "供应商系统对公",
        },
        {
          id: 2,
          label: "公对公",
        },
      ],
    };
    resolve(data);
  });
}

// 获取所有结算方式
export function closeArray() {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "查询成功",
      data: [
        {
          id: 0,
          label: "现结",
        },
        {
          id: 1,
          label: "月结",
        },
      ],
    };
    resolve(data);
  });
}

// 获取所有结算币种
export function currentcyArray() {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "查询成功",
      data: [
        {
          id: 0,
          label: "USD",
        },
        {
          id: 1,
          label: "CNY转USD",
        },
        {
          id: 2,
          label: "CNY",
        },
      ],
    };
    resolve(data);
  });
}

// 查询待审核数据
export function auditList() {
  return new Promise(function (resolve, reject) {
    resolve(suppliersList);
  });
}

// 审核数据--同意
export function agreeAudit(data) {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

// 审核数据--删除
export function deleteAudit(id) {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

/**
 *
 * 以下数据对应BOM管理页面
 */

let bomList = {
  total: 3,
  code: 200,
  msg: "查询成功",
  rows: [
    {
      id: 1,
      productLine: "text",
      brand: "ABCDE",
      country: "US",
      pn: "88823",
      sku: "AB54646",
      code: "FSDAKLIA",
      price: "33.3",
      currency: "$",
      note: "无",
      supplierCategory: "主供应商",
      ratio: "80%",
      createdDate: "2022-10-10 12:33:11",
      handleRemark: "编辑",
      materialCategory: "半成品",
      materialName: "主机",
      materialCode: "LL",
      name: "01-LL",
      quantity: "1",
      historyPrice: "$",
      olddata: {
        id: 1,
        productLine: "text123",
        brand: "ABCDE",
        country: "US",
        pn: "88823",
        sku: "AB53646",
        code: "FSDAKLIA",
        price: "34.3",
        currency: "$",
        note: "无",
        supplierCategory: "主供应商",
        ratio: "80%",
        createdDate: "2022-10-10 12:33:11",
        handleRemark: "编辑",
        materialCategory: "半成品",
        materialName: "主机",
        materialCode: "LL",
        name: "01-LL",
        quantity: "1",
        historyPrice: "$",
      },
    },
    {
      id: 2,
      productLine: "text",
      brand: "ABCDE",
      country: "US",
      pn: "88823",
      sku: "AB54646",
      code: "FSDAKLIA",
      price: "33.3",
      currency: "$",
      note: "无",
      supplierCategory: "主供应商",
      ratio: "80%",
      createdDate: "2022-10-10 12:33:11",
      handleRemark: "编辑",
      materialCategory: "半成品",
      materialName: "主机",
      materialCode: "LL",
      name: "01-LL",
      quantity: "1",
      historyPrice: "$",
      olddata: {
        id: 2,
        productLine: "text123",
        brand: "ABCDE",
        country: "US",
        pn: "88823",
        sku: "AB53646",
        code: "FSDAKLIA",
        price: "34.3",
        currency: "$",
        note: "无",
        supplierCategory: "主供应商",
        ratio: "80%",
        createdDate: "2022-10-10 12:33:11",
        handleRemark: "编辑",
        materialCategory: "半成品",
        materialName: "主机",
        materialCode: "LL",
        name: "01-LL",
        quantity: "1",
        historyPrice: "$",
      },
    },
    {
      id: 3,
      productLine: "text",
      brand: "ABCDE",
      country: "US",
      pn: "88823",
      sku: "AB54646",
      code: "FSDAKLIA",
      price: "33.3",
      currency: "$",
      note: "无",
      supplierCategory: "主供应商",
      ratio: "80%",
      createdDate: "2022-10-10 12:33:11",
      handleRemark: "编辑",
      materialCategory: "半成品",
      materialName: "主机",
      materialCode: "LL",
      name: "01-LL",
      quantity: "1",
      historyPrice: "$",
      olddata: null,
    },
  ],
};

//查看BOM列表
export function getBoms() {
  return new Promise(function (resolve, reject) {
    resolve(bomList);
  });
}

// 新增BOM数据
export function addBom(data) {
  let { total, rows } = bomList;
  total += 1;
  data.id = total;
  rows.push(data);
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

// 更新BOM数据
export function updateBom(data) {
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}

//根据id查看某条数据
export function getBomsById(id) {
  let data = {
    code: 200,
    msg: "操作成功",
    data: {
      id: 1,
      sku: "AB54646",
      name: "产品名称",
      pn: "44456",
      productLine: "text",
      brand: "ABCDH",
      country: "US",
      suppliers: [
        {
          supplierCategory: "主供应商",
          ratio: 80,
          materials: [
            {
              materialCategory: "半成品",
              materialName: "主机",
              materialCode: "LL",
              price: 22,
              currency: "CNY",
              quantity: 100,
            },
            {
              materialCategory: "半成品",
              materialName: "主机",
              materialCode: "LL",
              price: 22,
              currency: "CNY",
              quantity: 100,
            },
          ],
        },
        {
          supplierCategory: "辅供应商",
          ratio: 20,
          materials: [
            {
              materialCategory: "半成品",
              materialName: "主机",
              materialCode: "LL",
              price: 22,
              currency: "CNY",
              quantity: 100,
            },
            {
              materialCategory: "半成品",
              materialName: "主机",
              materialCode: "LL",
              price: 22,
              currency: "CNY",
              quantity: 100,
            },
          ],
        },
      ],
    },
  };
  return new Promise(function (resolve, reject) {
    resolve(data);
  });
}

// 删除Bom
export function deleteBom(id) {
  let { rows } = bomList;
  if (Array.isArray(id)) {
    //需后台处理多选删除
  } else {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        rows.splice(i, 1);
      }
    }
  }
  return new Promise(function (resolve, reject) {
    let data = {
      code: 200,
      msg: "操作成功",
      data: null,
    };
    resolve(data);
  });
}
