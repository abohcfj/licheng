<template>
  <el-table
    :data="list"
    border
    :span-method="objectSpanMethod"
    style="width: 100%"
  >
    <el-table-column prop="line" label="品线"> </el-table-column>
    <el-table-column prop="brand" label="品牌"> </el-table-column>
    <el-table-column prop="country" label="国家"> </el-table-column>
    <el-table-column prop="pn" label="PN"> </el-table-column>
    <el-table-column prop="sku" label="SKU"> </el-table-column>
    <el-table-column type="index" label="序号"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "PurchaseDetails",
  data() {
    return {
      list: [
        { line: "test", brand: "wu", country: "China", pn: "xxx", sku: "xxx" },
        { line: "test", brand: "wu", country: "China", pn: "xxx", sku: "xxx" },
        { line: "test", brand: "wu", country: "China", pn: "xxx", sku: "xxx" },
        { line: "test", brand: "wu", country: "China", pn: "xxx", sku: "xxx" },
      ],
    };
  },
  methods: {
    flitterData(arr) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //name 修改
          if (
            item.line === arr[index - 1].line ||
            item.brand === arr[index - 1].brand ||
            item.country === arr[index - 1].country ||
            item.pn === arr[index - 1].pn ||
            item.sku === arr[index - 1].sku
          ) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return {
        one: spanOneArr,
      };
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4
      ) {
        // this.tableData  修改
        const _row = this.flitterData(this.list).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
};
</script>
