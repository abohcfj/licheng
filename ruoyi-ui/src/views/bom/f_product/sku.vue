<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除
        </el-button>
      </el-col>
      <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange" border
      :span-method="objectSpanMethod">
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column prop="productLine" label="品线"> </el-table-column>
      <el-table-column prop="brand" label="品牌"> </el-table-column>
      <el-table-column prop="country" label="国家"> </el-table-column>
      <el-table-column prop="pn" label="PN"> </el-table-column>
      <el-table-column prop="sku" label="SKU"> </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="code" label="供应商代码"> </el-table-column>
      <el-table-column prop="price" label="采购单价"> </el-table-column>
      <el-table-column prop="currency" label="币种"> </el-table-column>
      <el-table-column prop="supplierCategory" label="供应商分类"> </el-table-column>
      <el-table-column prop="ratio" label="采购比例"> </el-table-column>
      <el-table-column prop="createdDate" label="录入时间" width="150"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="$refs.skuDetilas.getInfo(scope.row.id)">详情</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :pageSizes="[20, 50, 100]" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getList" />
    <SkuDetilas ref="skuDetilas" />
  </div>
</template>
<script>
import { listBoms, handleDeleteBom } from '@/api/boms/index'
import SkuDetilas from './components/skuDetials'
export default {
  name: "SKU",
  components: { SkuDetilas },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 非单个禁用
      single: true,
      list: [
      ],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  created () {
    this.getList()
  },
  methods: {
    // 查询采购详情数据
    getList () {
      this.loading = true
      listBoms(this.queryParams).then(res => {
        this.list = res.rows
        this.total = res.total;
        this.loading = false;
      })
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      // 判断是否全选当前页数据
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      this.ids = selection.map((item) => item.id);

      // 对于前五列都合并的勾选处理
      // if (selection.length === this.list.length) {
      //   this.ids = selection.map((item) => item.id);
      // } else {
      //   this.ids = []
      //   for (let i = 0; i < selection.length; i++) {
      //     let flag = false
      //     for (let j = 0; j < this.list.length; j++) {
      //       // 找到列表中的选中数据
      //       if (selection[i].id === this.list[j].id) {
      //         flag = true
      //       }
      //       // 开始寻找是否有合并列，有就加入
      //       if (flag && selection[i].line === this.list[j].line) {
      //         this.ids.push(this.list[j].id)
      //       }
      //       // 没有合并列则退出此循环 找下一个选中项的合并列
      //       if (flag && selection[i].line !== this.list[j].line) {
      //         this.flag = false
      //         break
      //       }
      //     }
      //   }
      // }

    },
    // 判断列数据是否相同
    flitterData (arr,key) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //name 修改
          if (
            item[key] === arr[index - 1][key]
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
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      let columnArray = [1,2,3,4,5]
      let keyArray = ['productLine','brand','country','pn','sku']
      if (columnArray.indexOf(columnIndex)!==-1) {
        const _row = this.flitterData(this.list,keyArray[columnIndex-1]).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    /** 删除所选中的数据 */
    handleDelete (row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm("是否确认删除选中的的数据项？")
        .then(function () {
          return handleDeleteBom(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => { });
    },
    /** 导出文件 */
    handleExport () {
      //修改为相应导出接口
      this.download("system/post/export", { ...this.queryParams, }, `post_${new Date().getTime()}.xlsx`);
    }
  },
};
</script>
