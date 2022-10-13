<template>
  <!-- 供应商详情对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <span class="formTitle"> 供应商基本信息</span>
          <el-form-item label="品线" prop="productLine">
            <el-input v-model="form.productLine" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="title">
            <el-input v-model="form.title" :disabled="true" size="small"></el-input>

          </el-form-item>
          <el-form-item label="供应商代码" prop="code">
            <el-input v-model="form.code" :disabled="true" size="small"></el-input>

          </el-form-item>
          <el-form-item label="跟进人" prop="principal">
            <el-input v-model="form.principal" :disabled="true" size="small"></el-input>

          </el-form-item>
          <el-form-item label="联系人" prop="contactName">
            <el-input v-model="form.contactName" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="contactPhone">
            <el-input v-model="form.contactPhone" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="contactEmail">
            <el-input v-model="form.contactEmail" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="contactAddress">
            <el-input v-model="form.contactAddress" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="提货地址" prop="shippingAddress">
            <el-input v-model="form.shippingAddress" :disabled="true" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13" style="padding-left:40px">
          <span class="formTitle">财务信息</span>
          <el-form-item label="支付方式" prop="paymentOption">
            <el-input v-model="form.paymentOption" :disabled="true" size="small"></el-input>

          </el-form-item>
          <el-form-item label="结算方式" prop="settleOption">
            <el-input v-model="form.settleOption" :disabled="true" size="small"></el-input>

          </el-form-item>
          <el-form-item label="预付比例" prop="prepaidPercentage">
            <el-input v-model="form.prepaidPercentage" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="账期" prop="paymentPeriod">
            <el-input v-model="form.paymentPeriod" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="结算币种" prop="settleCurrency">
            <el-input v-model="form.settleCurrency" :disabled="true" size="small"></el-input>
          </el-form-item>
          <el-form-item label="收款信息" prop="paymentInfo">
            <el-input v-model="form.paymentInfo" :disabled="true" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      form:{},
      rules: {
        productLine: [
          { required: true, message: "品线不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "供应商代码不能为空", trigger: "blur" }
        ],
        principal: [
          { required: true, message: "跟进人不能为空", trigger: "blur" }
        ],
        paymentOption: [
          { required: true, message: "支付方式不能为空", trigger: "blur" }
        ],
        settleOption: [
          { required: true, message: "结算方式不能为空", trigger: "blur" }
        ],
        prepaidPercentage: [
          { required: true, message: "预付比例不能为空", trigger: "blur" }
        ],
        paymentPeriod: [
          { required: true, message: "账期不能为空", trigger: "blur" }
        ],
        settleCurrency: [
          { required: true, message: "结算币种不能为空", trigger: "blur" }
        ],
        paymentInfo: [
          { required: true, message: "收款信息不能为空", trigger: "blur" }
        ]
      }
    }
  },
  created () {

  },
  methods: {
    getInfo(id){
      this.open = true
      getDetails(id).then(res=>{
        this.form = res.rows[0]
      })
      console.log(this.form)
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.form = {};
    },
  }
}
</script>
<style>

</style>