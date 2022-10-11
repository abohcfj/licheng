<template>
  <!-- 添加或修改供应商对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="950px" append-to-body>
    <span class="formTitle"> 供应商基本信息</span>
    <el-form ref="form" :inline="true" :model="form" :rules="rules">
      <el-form-item prop="sku">
        <el-input v-model="form.sku" placeholder="Sku/录入" class="inputline" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="form.name"
          placeholder="产品名称"
          class="inputline"
        />
      </el-form-item>
      <el-form-item prop="pn">
        <el-select
          v-model="form.pn"
          placeholder="PN"
          clearable
          class="inputline"
        >
          <el-option
            v-for="item in persionArray"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="line">
        <el-select
          v-model="form.line"
          placeholder="品线"
          clearable
          class="inputline"
        >
          <el-option
            v-for="item in persionArray"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="brand">
        <el-select
          v-model="form.brand"
          placeholder="品牌"
          clearable
          class="inputline"
        >
          <el-option
            v-for="item in persionArray"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="country">
        <el-select
          v-model="form.country"
          placeholder="国家"
          clearable
          style="width: 100px"
        >
          <el-option
            v-for="item in persionArray"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" size="medium" @click="addSupplier"
        >增加供应方案</el-button
      >
      <div v-for="(item, index) in form.suppliers" :key="item.id">
        <div>
          <i
            class="el-icon-close"
            style="font-size: 20px"
            @click="deleteSupplier(index)"
          />
          <span class="formTitle">供应商信息{{ index + 1 }}</span>
        </div>
        <div>
          <el-select
            v-model="item.category"
            placeholder="主供应商/辅供应商"
            clearable
          >
            <el-option
              v-for="item in persionArray"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="item.tatio" placeholder="采购比例" clearable>
            <el-option
              v-for="item in persionArray"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <el-table :data="item.list">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="kind" label="辅助类别">
            <template slot-scope="scope">
              <el-select v-model="scope.row.kind" clearable>
                <el-option
                  v-for="item in persionArray"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="辅助名称">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" clearable>
                <el-option
                  v-for="item in persionArray"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="辅助编码">
            <template slot-scope="scope">
              <el-select v-model="scope.row.code" clearable>
                <el-option
                  v-for="item in persionArray"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="供应商代码" />
          <el-table-column prop="supplierCode" label="单价">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder="录入" />
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="币种">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currentcy" placeholder="录入" />
            </template>
          </el-table-column>
          <el-table-column prop="supplierCode" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count" placeholder="录入" />
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
                @click="handleAddRow(index)"
                >新增一行</el-button
              >
              <el-button
                v-if="scope.$index !== 0"
                size="mini"
                type="text"
                @click="handleDelete(index, scope.$index)"
                >删除此行</el-button
              >
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
  getSupplier,
  handleAddSupplier,
  handleUpdateSupplier,
} from "@/api/suppliers/index";

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
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 表单参数
      form: {
        suppliers: [
          {
            category: undefined,
            tatio: undefined,
            list: [
              {
                id: 0,
                kind: undefined,
                name: undefined,
                code: undefined,
                supplierCode: undefined,
                price: undefined,
                currentcy: undefined,
                count: undefined,
              },
            ],
          },
        ],
      },
      rules: {
        line: [{ required: true, message: "品线不能为空", trigger: "blur" }],
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        code: [
          { required: true, message: "供应商代码不能为空", trigger: "blur" },
        ],
        persion: [
          { required: true, message: "跟进人不能为空", trigger: "blur" },
        ],
        payType: [
          { required: true, message: "支付方式不能为空", trigger: "blur" },
        ],
        closeType: [
          { required: true, message: "结算方式不能为空", trigger: "blur" },
        ],
        tatio: [
          { required: true, message: "预付比例不能为空", trigger: "blur" },
        ],
        paymentDays: [
          { required: true, message: "账期不能为空", trigger: "blur" },
        ],
        currentcy: [
          { required: true, message: "结算币种不能为空", trigger: "blur" },
        ],
        proceeds: [
          { required: true, message: "收款信息不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    /** 增加供应商信息 */
    addSupplier() {
      let data = {
        category: undefined,
        tatio: undefined,
        list: [
          {
            id: 0,
            kind: undefined,
            name: undefined,
            code: undefined,
            supplierCode: undefined,
            price: undefined,
            currentcy: undefined,
            count: undefined,
          },
        ],
      };
      this.form.suppliers.push(data);
    },
    /** 对某个供应商增加一行数据输入 */
    handleAddRow(index) {
      let data = {
        id: this.form.suppliers[index].list.length,
        kind: undefined,
        name: undefined,
        code: undefined,
        supplierCode: undefined,
        price: undefined,
        currentcy: undefined,
        count: undefined,
      };
      this.form.suppliers[index].list.push(data);
    },
    /** 对某个供应商删除某行数据 */
    handleDelete(tableIndex, rowIndex) {
      this.form.suppliers[tableIndex].list.splice(rowIndex, 1);
    },
    /** 删除动态的供应商信息 */
    deleteSupplier(index) {
      this.form.suppliers.splice(index, 1);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加SKU对应BOM页面";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSupplier(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑供应商";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form);
          // if (this.form.id != undefined) {
          //   handleUpdateSupplier(this.form).then((response) => {
          //     this.$modal.msgSuccess("修改成功");
          //     this.open = false;
          //     this.$emit("ok");
          //   });
          // } else {
          //   handleAddSupplier(this.form).then((response) => {
          //     this.$modal.msgSuccess("新增成功");
          //     this.open = false;
          //     this.$emit("ok");
          //   });
          // }
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
        sku: undefined,
        name: undefined,
        pn: undefined,
        line: undefined,
        brand: undefined,
        country: undefined,
        suppliers: [
          {
            category: undefined,
            tatio: undefined,
            list: [
              {
                id: 1,
                kind: undefined,
                name: undefined,
                code: undefined,
                supplierCode: undefined,
                price: undefined,
                currentcy: undefined,
                count: undefined,
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
.formTitle {
  padding-left: 5px;
  font-size: 17px;
  color: #303133;
  border-left: thick solid #1890ff;
}
.inputline {
  width: 120px;
}
</style>
