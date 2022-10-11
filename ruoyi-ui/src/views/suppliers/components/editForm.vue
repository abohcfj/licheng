<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-row>
      <el-col :span="11">
        <span class="formTitle"> 供应商基本信息</span>
          <el-form-item label="品线" prop="line">
            <el-select v-model="form.line" placeholder="请选择品线" clearable>
              <el-option v-for="item in lineArray" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" prop="name">
            <el-input v-model="form.name" placeholder="请输入供应商名称" />
          </el-form-item>
          <el-form-item label="供应商代码" prop="code">
            <el-input v-model="form.code" placeholder="请输入供应商代码" />
          </el-form-item>
          <el-form-item label="跟进人" prop="persion">
            <el-select v-model="form.persion" placeholder="请选择品线" clearable>
              <el-option v-for="item in persionArray" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="concat">
            <el-input v-model="form.concat" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="提货地址" prop="pickup">
            <el-input v-model="form.pickup" placeholder="请输入提货地址" />
          </el-form-item>
      </el-col>
      <el-col :span="13" style="padding-left:40px">
        <span class="formTitle">财务信息</span>
          <el-form-item label="支付方式" prop="payType">
            <el-select v-model="form.payType" placeholder="请选择支付方式" clearable>
              <el-option v-for="item in payTypeArray" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="结算方式" prop="closeType">
            <el-select v-model="form.closeType" placeholder="请选择结算方式" clearable>
              <el-option v-for="item in closeArray" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="预付比例" prop="tatio">
            <el-input v-model="form.tatio" placeholder="请输入预付比例" />
          </el-form-item>
          <el-form-item label="账期" prop="paymentDays">
            <el-input v-model="form.paymentDays" placeholder="请输入账期" />
          </el-form-item>
          <el-form-item label="结算币种" prop="currentcy">
            <el-select v-model="form.currentcy" placeholder="请选择结算币种" clearable>
              <el-option v-for="item in currentcyArray" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="收款信息" prop="proceeds">
            <el-input v-model="form.proceeds" placeholder="请输入收款信息" />
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
import { getSupplier,handleAddSupplier,handleUpdateSupplier } from '@/api/suppliers/index'

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
    payTypeArray:{
      type: Array,
      default: [],
    },
    // 结算方式下拉值
    closeArray:{
      type: Array,
      default: [],
    },
    // 结算币种
    currentcyArray:{
      type: Array,
      default: [],
    },
  },
  data () {
    return {
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
      form: {},
      rules: {
        line: [
          { required: true, message: "品线不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "供应商代码不能为空", trigger: "blur" }
        ],
        persion: [
          { required: true, message: "跟进人不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "支付方式不能为空", trigger: "blur" }
        ],
        closeType: [
          { required: true, message: "结算方式不能为空", trigger: "blur" }
        ],
        tatio: [
          { required: true, message: "预付比例不能为空", trigger: "blur" }
        ],
        paymentDays: [
          { required: true, message: "账期不能为空", trigger: "blur" }
        ],
        currentcy: [
          { required: true, message: "结算币种不能为空", trigger: "blur" }
        ],
        proceeds: [
          { required: true, message: "收款信息不能为空", trigger: "blur" }
        ]
      }
     
    }
  },
  created () {

  },
  methods: {
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
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        postSort: 0,
        status: "0",
        remark: undefined
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