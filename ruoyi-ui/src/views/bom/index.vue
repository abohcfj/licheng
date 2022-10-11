<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="$refs.editForm.handleAdd()">添加SKU</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-document-add" size="mini" @click="$refs.importForm.openImport()">
          导入SKU</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-input v-model="queryParams.keyword" placeholder="搜索：品线/品牌/国家/PN/SKU/主供应商代码" clearable size="mini"
          style="width:300px" @keyup.enter.native="handleQuery" />
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="$refs.audit.getInfo()">审核</el-button>
      </el-col>
      <right-toolbar :search="false" :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" ref="filterTable">
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="品线" align="center" prop="lineString">
        <!-- TODO:远程搜索数据-->
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible">
            <div slot="reference" class="search-header">
              <span class="search-title">品线</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.lineString" clearable filterable allow-create
              default-first-option>
              <el-option v-for="item in filterData('lineString')" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('lineString')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="code">
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible1">
            <div slot="reference" class="search-header">
              <span class="search-title">品牌</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.code" clearable filterable allow-create default-first-option>
              <el-option v-for="item in filterData('code')" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('code')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="国家" align="center" prop="name">
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible2">
            <div slot="reference" class="search-header">
              <span class="search-title">国家</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.name" clearable filterable allow-create default-first-option>
              <el-option v-for="item in filterData('name')" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('name')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="PN" align="center" prop="concat">
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible2">
            <div slot="reference" class="search-header">
              <span class="search-title">PN</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.name" clearable filterable allow-create default-first-option>
              <el-option v-for="item in filterData('name')" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('name')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="SKU" align="center" prop="phone">
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible2">
            <div slot="reference" class="search-header">
              <span class="search-title">SKU</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.name" clearable filterable allow-create default-first-option>
              <el-option v-for="item in filterData('name')" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('name')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="主供应商代码" align="center" prop="email">
        <template #header>
          <el-popover placement="bottom" title="搜索" width="200" trigger="click" v-model="visible2">
            <div slot="reference" class="search-header">
              <span class="search-title">主供应商代码</span>
              <i class="search-icon el-icon-search"></i>
            </div>
            <el-select size="mini" v-model="queryParams.name" clearable filterable allow-create default-first-option>
              <el-option v-for="item in filterData('name')" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: right; margin: 0;margin-top:10px">
              <el-button size="mini" type="text" @click="handleCanleFilter('name')">取消</el-button>
              <el-button type="mini" size="text" @click="handleQuery">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="采购单价" align="center" prop="term" />
      <el-table-column label="币种" align="center" prop="method" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="$refs.detials.getInfo(scope.row.id)">详情</el-button>
          <el-button size="mini" type="text" @click="$refs.editForm.handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :pageSizes="[20,50,100]" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getList" />
    <!-- 添加或修改岗位对话框 -->
    <EditForm ref="editForm" @ok="getList" :lineArray="lineArray" :persionArray="persionArray"
      :payTypeArray="payTypeArray" :closeArray="closeArray" :currentcyArray="currentcyArray" />
    <!--供应商详情-->
    <Detilas ref="detials" />
    <!-- 导入页面 -->
    <ImportForm ref="importForm" @ok="getList" />
    <!-- 审核页面 -->
    <Audit ref="audit" @ok="getList" />
  </div>
</template>

<script>
import EditForm from './components/editForm'
import Detilas from './components/detials'
import ImportForm from './components/importForm'
import Audit from './components/audit'
import { listSuppliers, getAllLines, getAllPersions, getAllPayType, getAllClose, getAllCurrentcy, handleDeleteSupplier } from '@/api/suppliers/index'
export default {
  name: "Bom",
  components: { EditForm, Detilas, ImportForm, Audit },
  computed: {
    filterData () {
      return function (data) {
        let obj = [];
        this.supplierList.filter((item) => {
          obj.push(item[data])
        });
        let result = [... new Set(obj)].map(item => {
          return item = {
            text: item,
            value: item
          }
        })
        return result
      }
    }
  },
  data () {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
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
        lineString: undefined,
        name: undefined,
        code: undefined,
        persion: undefined
      },
      // 品线下拉值
      lineArray: [],
      // 跟进人下拉值
      persionArray: [],
      // 支付方式下拉值
      payTypeArray: [],
      // 结算方式下拉值
      closeArray: [],
      // 结算币种
      currentcyArray: []

    };
  },
  created () {
    this.getList();
    // 初始化下拉菜单可选项
    getAllLines().then(res => {
      this.lineArray = res.data
    })
    getAllPersions().then(res => {
      this.persionArray = res.data
    })
    getAllPayType().then(res => {
      this.payTypeArray = res.data
    })
    getAllClose().then(res => {
      this.closeArray = res.data
    })
    getAllCurrentcy().then(res => {
      this.currentcyArray = res.data
    })
  },
  methods: {
    /** 查询供应商列表 */
    getList () {
      this.loading = true;
      listSuppliers(this.queryParams).then(response => {
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.disableAll()
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 清楚筛选条件 */
    handleCanleFilter (item) {
      console.log(item)
      this.queryParams[item] = undefined
      console.log(this.queryParams)
      this.disableAll()
    },
    /** 将所有弹出框置为隐藏 */
    disableAll () {
      this.visible = false
      this.visible1 = false
      this.visible2 = false
      this.visible3 = false
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },

    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除选中的的数据项？').then(function () {
        return handleDeleteSupplier(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      //修改为相应导出接口
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    }
  }
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