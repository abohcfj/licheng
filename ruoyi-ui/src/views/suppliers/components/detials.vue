<template>
  <!-- 供应商详情对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="550px" append-to-body>
    <el-row>
      <el-col :span="11">
        <el-descriptions title="供应商基本信息" :column="1">
          <el-descriptions-item label-class-name="my-label" label="品线">{{ form.productLine }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="供应商">{{ form.productLine }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="供应商代码">{{ form.code }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="跟进人">{{ form.principal }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="联系人">{{ form.contactName }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="电话">{{ form.contactPhone }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="邮箱">{{ form.contactEmail }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="地址">{{ form.contactAddress }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="提货地址">{{ form.shippingAddress }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="13" style="padding-left:40px">
        <el-descriptions title="财务信息" :column="1">
          <el-descriptions-item label-class-name="my-label" label="支付方式">{{ form.paymentOption }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="结算方式">{{ form.settleOption }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="预付比例">{{ form.prepaidPercentage }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="账期">{{ form.paymentPeriod }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="结算币种">{{ form.settleCurrency }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="收款信息">{{ form.paymentInfo }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="邮箱">{{ form.contactEmail }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="地址">{{ form.contactAddress }}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="提货地址">{{ form.shippingAddress }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getSupplier } from '@/api/suppliers/index'

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
      form: {},
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
    getInfo (id) {
      this.open = true
      getSupplier(id).then(res => {
        this.form = res.data
      })
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

.my-label{
  font-size:14px;
  /* color:black; */
  font-weight: 600;
}

</style>