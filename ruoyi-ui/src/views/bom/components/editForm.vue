<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body style="padding:30px">
    <div class="divSpace"><span class="formTitle"> 供应商基本信息</span></div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules">
      <el-form-item prop="sku">
        <el-input v-model="form.sku" placeholder="Sku/录入" class="inputline" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="产品名称" class="inputline" />
      </el-form-item>
      <el-form-item prop="pn">
        <el-select v-model="form.pn" placeholder="PN" clearable class="inputline" filterable>
          <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item prop="productLine">
        <el-select v-model="form.productLine" placeholder="品线" clearable class="inputline" filterable>
          <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item prop="brand">
        <el-select v-model="form.brand" placeholder="品牌" clearable class="inputline" filterable>
          <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item prop="country">
        <el-select v-model="form.country" placeholder="国家" clearable style="width: 100px" filterable>
          <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-button type="primary" size="medium" @click="addSupplier">增加供应方案</el-button>
      <div v-for="(item, index) in form.suppliers" :key="item.label" class="divSpace">
        <div class="divSpace" style="position:relative;left:-20px">
          <i class="el-icon-close" style="font-size: 20px;padding-left: -20px;" @click="deleteSupplier(index)" />
          <span class="formTitle">供应商信息{{ index + 1 }}</span>
        </div>
        <div class="divSpace">
          <el-form-item label="供应商分类">
            <el-select v-model="item.supplierCategory" placeholder="主供应商/辅供应商" clearable>
              <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="采购比例">
            <el-select v-model="item.ratio" clearable>
              <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
        </div>
        <el-table :data="item.materials">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="materialCategory" label="辅料类别">
            <template slot-scope="scope">
              <el-select v-model="scope.row.materialCategory" clearable>
                <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="辅料名称">
            <template slot-scope="scope">
              <el-select v-model="scope.row.materialName" clearable>
                <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="materialCode" label="辅料编码">
            <template slot-scope="scope">
              <el-select v-model="scope.row.materialCode" clearable>
                <el-option v-for="item in persionArray" :key="item.label" :label="item.label" :value="item.label" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="供应商代码" />
          <el-table-column prop="price" label="单价">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder="录入" />
            </template>
          </el-table-column>
          <el-table-column prop="currency" label="币种">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currency" placeholder="录入" />
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantity" placeholder="录入" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" v-if="scope.$index === 0" @click="handleAddRow(index)">新增一行</el-button>
              <el-button v-if="scope.$index !== 0" size="mini" type="text" @click="handleDelete(index, scope.$index)">
                删除此行</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>

import {
  getBom,
  handleAddBom,
  handleUpdateBom,
} from "@/api/boms/index";
export default {
  name: "EditForm",
  props: {
    persionArray: {
      type: Array,
      default: [],
    },
  },
  data () {
    return {
      loading:false,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
      form: {
        suppliers: [
          {
            supplierCategory: undefined,
            ratio: undefined,
            materials: [
              {
                id: 0,
                materialCategory: undefined,
                materialName: undefined,
                code: undefined,
                supplierCode: undefined,
                price: undefined,
                currentcy: undefined,
                quantity: undefined,
              },
            ],
          },
        ],
      },
      rules: {
        productLine: [{ required: true, message: "品线不能为空", trigger: "blur" }],
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        pn: [
          { required: true, message: "PN不能为空", trigger: "blur" },
        ],
        sku: [
          { required: true, message: "SKU不能为空", trigger: "blur" },
        ],
        brand: [
          { required: true, message: "品牌不能为空", trigger: "blur" },
        ],
        country: [
          { required: true, message: "国家不能为空", trigger: "blur" },
        ],

      },
    };
  },
  created () { },
  methods: {
    /** 增加供应商信息 */
    addSupplier () {
      let data = {
        supplierCategory: undefined,
        ratio: undefined,
        materials: [
          {
            id: 0,
            materialCategory: undefined,
            materialName: undefined,
            code: undefined,
            supplierCode: undefined,
            price: undefined,
            currentcy: undefined,
            quantity: undefined,
          },
        ],
      };
      this.form.suppliers.push(data);
    },
    
    /** 对某个供应商增加一行数据输入 */
    handleAddRow (index) {
      let data = {
        id: this.form.suppliers[index].materials.length,
        materialCategory: undefined,
        materialName: undefined,
        code: undefined,
        supplierCode: undefined,
        price: undefined,
        currentcy: undefined,
        quantity: undefined,
      };
      this.form.suppliers[index].materials.push(data);
    },
    /** 对某个供应商删除某行数据 */
    handleDelete (tableIndex, rowIndex) {
      this.form.suppliers[tableIndex].materials.splice(rowIndex, 1);
    },
    /** 删除动态的供应商信息 */
    deleteSupplier (index) {
      this.form.suppliers.splice(index, 1);
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加SKU对应BOM页面";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids;
      getBom(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑SKU对应的BOM页面";
      });
    },
    /** 根据sku查询表单数据 */
    handleUpdateBySku (sku) {
      this.reset();
      // 请求相关接口
      getBom(sku).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑SKU对应的BOM页面";
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
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        sku: undefined,
        name: undefined,
        pn: undefined,
        productLine: undefined,
        brand: undefined,
        country: undefined,
        suppliers: [
          {
            supplierCategory: undefined,
            ratio: undefined,
            materials: [
              {
                id: 0,
                materialCategory: undefined,
                materialName: undefined,
                code: undefined,
                supplierCode: undefined,
                price: undefined,
                currentcy: undefined,
                quantity: undefined,
              },
            ],
          },
        ],
      };
      this.resetForm("form");
    },
  },
};
</script>
<style>
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
