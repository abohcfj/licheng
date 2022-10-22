<template>
  <!-- 待审核数据对话框 -->
  <!-- 如果存在修改的字段，应增加原数据字段进行判断是否显示和数据展示-->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList" style="font-size: 12px">
      <el-table-column label="品线" align="center" prop="sku">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="sku" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="name">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="name" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="物料类别" align="center" prop="pn">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="pn" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="物料名称" align="center" prop="productLine">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="productLine" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="物料编码" align="center" prop="brand">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="brand" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="供应商代码" align="center" prop="country">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="country" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" align="center" prop="supplierCategory">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="supplierCategory" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center" prop="ratio">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="ratio" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" prop="materialId">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="materialId" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="MOQ" align="center" prop="materialCategory">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="materialCategory" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="生产L/T" align="center" prop="materialName">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="materialName" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="整箱数" align="center" prop="materialCode">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="materialCode" :tableData="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="supplierCode">
        <template slot-scope="scope">
          <AuditTableDiff paramKey="supplierCode" :tableData="scope.row" />
        </template>
      </el-table-column>
      
      <el-table-column label="申请时间" align="center" prop="createdDate">
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleSubmit(scope.row)">通过</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)" v-hasPermi="['suppliers:audit']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import AuditTableDiff from '@/views/components/auditTableDiff/index'

import { listBoms } from "@/api/boms/index";
import { handleAgreeAudit, handleDeleteAudit } from "@/api/suppliers/index";

export default {
  name: "Audit",
  components: { AuditTableDiff },
  props: {},
  data () {
    return {
      // 遮罩层
      loading: true,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "待审核",
      detailsList: [],
    };
  },
  created () { },
  methods: {
    getInfo () {
      this.open = true;
      this.loading = true;
      listBoms().then((res) => {
        this.detailsList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },
    handleSubmit (row) {
      const { id } = row;
      // 构造需要的数据进行上传
      handleAgreeAudit(row).then((res) => {
        this.$modal.msgSuccess("提交成功");
      });
    },
    handleDelete (row) {
      const { id } = row;
      handleDeleteAudit(id).then((res) => {
        this.$modal.msgSuccess("删除成功");
      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.detailsList = [];
    },
  },
};
</script>
<style>
.old {
  color: red;
}
</style>
