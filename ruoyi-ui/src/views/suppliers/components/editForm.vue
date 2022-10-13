<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <span class="formTitle"> 供应商基本信息</span>
          <el-form-item label="品线" prop="productLine">
            <el-select v-model="form.productLine" placeholder="请选择品线" clearable filterable remote :loading="loading"
              :remote-method="query=>remoteMethod(query,'productLine','productLineArray')">
              <el-option v-for="item in lineArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" prop="title">
            <el-select v-model="form.title" placeholder="请选择供应商" clearable filterable remote :loading="loading"
              :remote-method="query=>remoteMethod(query,'title','titleArray')">
              <el-option v-for="item in lineArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商代码" prop="code">
            <el-select v-model="form.code" placeholder="请选择供应商" clearable filterable remote :loading="loading"
              :remote-method="query=>remoteMethod(query,'code','codeArray')">
              <el-option v-for="item in lineArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="跟进人" prop="principal">
            <el-select v-model="form.principal" placeholder="请选择跟进人" clearable filterable remote :loading="loading"
              :remote-method="query=>remoteMethod(query,'principal','principalArray')">
              <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contactName">
            <el-input v-model="form.contactName" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="电话" prop="contactPhone">
            <el-input v-model="form.contactPhone" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="contactEmail">
            <el-input v-model="form.contactEmail" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="地址" prop="contactAddress">
            <el-input v-model="form.contactAddress" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="提货地址" prop="shippingAddress">
            <el-input v-model="form.shippingAddress" placeholder="请输入提货地址" />
          </el-form-item>
        </el-col>
        <el-col :span="13" style="padding-left:40px">
          <span class="formTitle">财务信息</span>
          <el-form-item label="支付方式" prop="paymentOption">
            <el-select v-model="form.paymentOption" placeholder="请选择支付方式" clearable>
              <el-option v-for="item in payTypeArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="结算方式" prop="settleOption">
            <el-select v-model="form.settleOption" placeholder="请选择结算方式" clearable>
              <el-option v-for="item in closeArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="预付比例" prop="prepaidPercentage">
            <el-input v-model="form.prepaidPercentage" type="number" placeholder="请输入预付比例" />
          </el-form-item>
          <el-form-item label="账期" prop="paymentPeriod">
            <el-input v-model="form.paymentPeriod" placeholder="请输入账期" />
          </el-form-item>
          <el-form-item label="结算币种" prop="settleCurrency">
            <el-select v-model="form.settleCurrency" placeholder="请选择结算币种" clearable>
              <el-option v-for="item in currentcyArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="收款信息" prop="paymentInfo">
            <el-input v-model="form.paymentInfo" placeholder="请输入收款信息" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getSupplier, handleAddSupplier, handleUpdateSupplier } from '@/api/suppliers/index'

export default {
  name: "EditForm",
  props: {
    lineArray: {
      type: Array,
      default: [],
    },
    persionArray: {
      type: Array,
      default: [],
    },
    payTypeArray: {
      type: Array,
      default: [],
    },
    // 结算方式下拉值
    closeArray: {
      type: Array,
      default: [],
    },
    // 结算币种
    currentcyArray: {
      type: Array,
      default: [],
    },
  },
  data () {
    return {
      loading: false,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
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
    /** 远程搜索功能
     * query:搜索值
     * param:表单参数
     * selectKey:下拉渲染值
     */
    remoteMethod (query, param, selectKey) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      }
      console.log(query, param, selectKey)
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加供应商";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getSupplier(id).then(response => {
        this.form = response.data;
        console.log(this.form)
        this.open = true;
        this.title = "编辑供应商";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            handleUpdateSupplier(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.$emit('ok');
            });
          } else {
            handleAddSupplier(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.$emit('ok');
            });
          }
        }

      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        productLine: undefined,
        title: undefined,
        code: undefined,
        principal: undefined,
        contactName: undefined,
        contactPhone: undefined,
        contactEmail: undefined,
        contactAddress: undefined,
        shippingAddress: undefined,
        paymentOption: undefined,
        settleOption: undefined,
        prepaidPercentage: undefined,
        paymentPeriod: undefined,
        settleCurrency: undefined,
        paymentInfo: undefined,
      };
      this.resetForm("form");
    },
  }
}
</script>
<style>
.formTitle {
  padding-left: 5px;
  font-size: 17px;
  color: #303133;
  border-left: thick solid #1890ff;
}
</style>