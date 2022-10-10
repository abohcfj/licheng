<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:post:add']"
        >添加供应商</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-document-add"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:post:add']"
        >导入供应商</el-button>
      </el-col>
      
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:post:remove']"
        >删除</el-button>
      </el-col>
      
      <el-col :span="1.5">
        <el-input
          v-model="queryParams.keyword"
          placeholder="搜索：品线/供货商代码/供货商名称/跟进人"
          clearable
          size="mini"
          style="width:300px"
          @keyup.enter.native="handleQuery"
        />
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          size="mini"
        >审核</el-button>
      </el-col>
      <right-toolbar :search="false" :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange" ref="filterTable">
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="品线" align="center" prop="line" >
        <template #header>
            <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible">
                <div slot="reference" class="search-header">
                    <span class="search-title">品线</span>
                    <i class="search-icon el-icon-search"></i>
                </div>
                <el-select size="mini" v-model="queryParams.line" clearable  filterable allow-create default-first-option>
                    <el-option
                        v-for="item in filterData('line')" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div style="text-align: right; margin: 0;margin-top:10px">
                    <el-button size="mini" type="text" @click="handleCanleFilter('line')">取消</el-button>
                    <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="供应商代码" align="center" prop="code" >
         <template #header>
            <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible1">
                <div slot="reference" class="search-header">
                    <span class="search-title">供应商代码</span>
                    <i class="search-icon el-icon-search"></i>
                </div>
                <el-select size="mini" v-model="queryParams.code" clearable  filterable allow-create default-first-option>
                    <el-option
                        v-for="item in filterData('code')" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div style="text-align: right; margin: 0;margin-top:10px">
                    <el-button size="mini" type="text" @click="handleCanleFilter('code')">取消</el-button>
                    <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" align="center" prop="name" >
        <template #header>
            <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible2">
                <div slot="reference" class="search-header">
                    <span class="search-title">供应商名称</span>
                    <i class="search-icon el-icon-search"></i>
                </div>
                <el-select size="mini" v-model="queryParams.name" clearable  filterable allow-create default-first-option>
                    <el-option
                        v-for="item in filterData('name')" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div style="text-align: right; margin: 0;margin-top:10px">
                    <el-button size="mini" type="text" @click="handleCanleFilter('name')">取消</el-button>
                    <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="concat" />
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="付款期限" align="center" prop="term" />
      <el-table-column label="付款方式" align="center" prop="method" />
      <el-table-column label="跟进人" align="center" prop="persion">
        <template #header>
            <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible3">
                <div slot="reference" class="search-header">
                    <span class="search-title">跟进人</span>
                    <i class="search-icon el-icon-search"></i>
                </div>
                <el-select size="mini" v-model="queryParams.persion" clearable  filterable allow-create default-first-option>
                    <el-option
                        v-for="item in filterData('persion')" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div style="text-align: right; margin: 0;margin-top:10px">
                    <el-button size="mini" type="text" @click="handleCanleFilter('persion')">取消</el-button>
                    <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="联系地址" align="center" prop="address" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text">详情</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:post:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :pageSizes="[20,50,100]"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改岗位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
        <el-row>
            <el-col :span="11">
                <span class="formTitle"> 供应商基本信息</span>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                  <el-form-item label="品线" prop="line">
                    <el-input v-model="form.line" placeholder="请输入品线" />
                  </el-form-item>
                  <el-form-item label="供应商" prop="name">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                  </el-form-item>
                    <el-form-item label="供应商代码" prop="code">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="跟进人" prop="person">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="联系人" prop="postSort">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="电话" prop="postSort">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="postSort">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="地址" prop="postSort">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="提货地址" prop="postSort">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="13" style="padding-left:40px">
                <span class="formTitle">财务信息</span>
                <el-form ref="form1" :model="form" :rules="rules" label-width="80px">
                  <el-form-item label="支付方式" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                  </el-form-item>
                  <el-form-item label="结算方式" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                  </el-form-item>
                    <el-form-item label="预付比例" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="账期" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="结算币种" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                    <el-form-item label="收款信息" prop="line">
                    <el-input v-model="form.postCode" placeholder="请输入编码名称" />
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPost, getPost, delPost, addPost, updatePost } from "@/api/system/post";
import {listSuppliers} from '@/api/suppliers/index'
export default {
  name: "Supplier",
  dicts: ['sys_normal_disable'],
  computed:{
    filterData(){
        return function(data){
            let obj = [];
            this.postList.filter((item)=>{
                obj.push(item[data])
            });
            let result = [... new Set(obj)].map(item=>{
                return item = {
                    text:item,
                    value:item
                }
            })
            return result
        }
    }
  },
  data() {
    return {
      visible:false,
      visible1:false,
      visible2:false,
      visible3:false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 岗位表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        postCode: undefined,
        postName: undefined,
        status: undefined,
        keyword:undefined,
        line:undefined,
        name:undefined,
        code:undefined
      },
      // 表单参数
      form: {},
      form1:{},
      // 表单校验
      rules: {
        line: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "岗位编码不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "岗位顺序不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "岗位顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询岗位列表 */
    getList() {
      this.loading = true;
      listSuppliers(this.queryParams).then(response => {
        this.postList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        postSort: 0,
        status: "0",
        remark: undefined
      };
      this.resetForm("form");
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.disableAll()
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 将所有弹出框置为隐藏 */
    disableAll(){
        this.visible = false
        this.visible1 = false
        this.visible2 = false
        this.visible3 = false
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.postId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加供应商";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const postId = row.postId || this.ids
      getPost(postId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            updatePost(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPost(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除品线为"' + row.line + '"的数据项？').then(function() {
        return delPost(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style>
    .formTitle{
        padding-left:5px;
        font-size: 17px;
        color: #303133;
        border-left: thick solid #1890ff;
    }
</style>