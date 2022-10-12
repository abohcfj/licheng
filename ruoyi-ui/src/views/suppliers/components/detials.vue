<template>
  <!-- 供应商详情对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList">
      <el-table-column label="品线" align="center" prop="productLine" />
      <el-table-column label="供应商" align="center" prop="title" />
      <el-table-column label="供应商代码" align="center" prop="code" />
      <el-table-column label="跟进人" align="center" prop="principal"/>
      <el-table-column label="联系人" align="center" prop="contactName" />
      <el-table-column label="电话" align="center" prop="contactPhone" />
      <el-table-column label="邮箱" align="center" prop="contactEmail" />
      <el-table-column label="地址" align="center" prop="contactAddress" />
      <el-table-column label="提货地址" align="center" prop="shippingAddress" />
      <el-table-column label="支付方式" align="center" prop="paymentOption" />
      <el-table-column label="结算方式" align="center" prop="settleOption" />
      <el-table-column label="预付比例" align="center" prop="prepaidPercentage" />
      <el-table-column label="账期" align="center" prop="paymentPeriod" />
      <el-table-column label="结算币种" align="center" prop="settleCurrency" />
      <el-table-column label="收款信息" align="center" prop="paymentInfo" />
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