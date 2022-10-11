<template>
  <!-- 供应商详情对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList">
      <el-table-column label="品线" align="center" prop="lineString" />
      <el-table-column label="供应商" align="center" prop="name" />
      <el-table-column label="供应商代码" align="center" prop="code" />
      <el-table-column label="跟进人" align="center" prop="persion"/>
      <el-table-column label="联系人" align="center" prop="concat" />
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="提货地址" align="center" prop="pickup" />
      <el-table-column label="支付方式" align="center" prop="payTypeString" />
      <el-table-column label="结算方式" align="center" prop="closeTypeString" />
      <el-table-column label="预付比例" align="center" prop="tatio" />
      <el-table-column label="账期" align="center" prop="paymentDays" />
      <el-table-column label="结算币种" align="center" prop="currentcyString" />
      <el-table-column label="收款信息" align="center" prop="proceeds" />
    </el-table>
  </el-dialog>
</template>
<script>
import { getDetails } from '@/api/suppliers/index'

export default {
  name: "Detilas",
  props: {

  },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "供应商详情",
      detailsList:[],
    }
  },
  created () {

  },
  methods: {
    getInfo(id){
      this.open = true
      this.loading = true;
      getDetails(id).then(res=>{
        this.detailsList = res.rows
        this.total = res.total;
        this.loading = false;
      })
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.detailsList = [];
    },
  }
}
</script>
<style>

</style>