<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="400px"
    append-to-body
    style="padding: 30px"
  >
    <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="name" label="物料类别">
          <el-input
            size="small"
            v-model="form.name"
            placeholder=""
            class="inputline"
          />
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getBom, handleAddBom, handleUpdateBom } from "@/api/boms/index";
export default {
  name: "EditForm",
  data() {
    return {
      loading: false,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
      form: {
       name:''
      },
      rules: {
        name: [
          { required: true, message: "物料类别不能为空", trigger: "blur" },
        ],
        
      },
    };
  },
  created() {},
  methods: {
    
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增物料类别";
    },
    
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form);
          if (this.form.id != undefined) {
            handleUpdateBom(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.$emit("ok");
            });
          } else {
            handleAddBom(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.$emit("ok");
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        name:''
      };
      this.resetForm("form");
    },
  },
};
</script>
<style>
.el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 30px;
}

.el-dialog__body {
  padding: 30px 40px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.formTitle {
  padding-left: 5px;
  font-size: 17px;
  color: #303133;
  border-left: thick solid #1890ff;
}

.inputline {
  width: 120px;
}

.divSpace {
  padding-bottom: 10px;
}
</style>
