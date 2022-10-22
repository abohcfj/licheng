<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="$refs.editForm.handleAdd()">新增物料类别</el-button>
      </el-col>
     
      
      <right-toolbar :search="false" :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" ref="filterTable">
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="物料类别" align="center" prop="productLine">
      </el-table-column>
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :pageSizes="[20, 50, 100]" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getList" />
    <!-- 添加或修改对话框 -->
    <EditForm ref="editForm" @ok="getList"  />
    
  </div>
</template>

<script>
import EditForm from "./components/editForm";

import {
  listBoms, handleDeleteBom
} from "@/api/boms/index";
export default {
  name: "Category",
  components: { EditForm,  },
  data () {
    return {
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
      // 供应商表格数据
      supplierList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        keyword: undefined,
        productLine: undefined,
        brand: undefined,
        country: undefined,
        pn: undefined,
        sku: undefined,
        code: undefined,
      },
    };
  },
  created () {
    this.getList();
    // 初始化下拉菜单可选项
    this.initSelect()
  },
  methods: {
    /** 查询供应商列表 */
    getList () {
      this.loading = true;
      listBoms(this.queryParams).then((response) => {
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    
    /** 搜索按钮操作 */
    handleQuery () {
      this.disableAll();
      this.queryParams.pageNum = 1;
      this.getList();
    },
    
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
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
</style>
