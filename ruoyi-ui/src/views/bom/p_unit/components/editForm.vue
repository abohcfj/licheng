<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="1000px"
    append-to-body
    style="padding: 30px"
  >
    <el-form ref="form" :inline="true" :model="form" >
        <el-table :data="form.list">
           <el-table-column prop="line" label="品线">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialCategory"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="materialCategory" label="品牌">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialCategory"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="物料类别">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialName"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="materialCode" label="物料名称">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialCode"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="物料编码">
           <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="供应商代码">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialCode"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="currency" label="供应商名称">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.materialCode"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="单价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="币种">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.supplierCode"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in persionArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>
           <el-table-column prop="quantity" label="MOQ">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
           <el-table-column prop="quantity" label="生产L/T">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
           <el-table-column prop="quantity" label="整箱数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
           <el-table-column prop="quantity" label="备注">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.quantity"
                placeholder="录入"
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="scope.$index === 0"
                @click="handleAddRow(_)"
                >新增一行</el-button
              >
              <el-button
                v-if="scope.$index !== 0"
                size="mini"
                type="text"
                @click="handleDelete(_, scope.$index)"
              >
                删除此行</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
  props: {
    persionArray: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      loading: false,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
      form: {
        list:[{}]
      },
      rules: {
        productLine: [
          { required: true, message: "品线不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        pn: [{ required: true, message: "PN不能为空", trigger: "blur" }],
        sku: [{ required: true, message: "SKU不能为空", trigger: "blur" }],
        brand: [{ required: true, message: "品牌不能为空", trigger: "blur" }],
        country: [{ required: true, message: "国家不能为空", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    
    /** 对某个供应商增加一行数据输入 */
    handleAddRow(index) {
      let data = {
        id: this.form.list.length,
        materialCategory: undefined,
        materialName: undefined,
        code: undefined,
        supplierCode: undefined,
        price: undefined,
        currentcy: undefined,
        quantity: undefined,
      };
      this.form.list.push(data);
    },
    /** 对某个供应商删除某行数据 */
    handleDelete(tableIndex, rowIndex) {
      this.form.list.splice(rowIndex, 1);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加物料";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBom(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑物料";
      });
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
        list:[{}]
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
