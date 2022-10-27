<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公司" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入公司名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入品牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品类" prop="bu">
        <el-input
          v-model="queryParams.bu"
          placeholder="请输入品类"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="asin" prop="asin">
        <el-input
          v-model="queryParams.asin"
          placeholder="请输入asin"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-select v-model="queryParams.country" placeholder="请选择country" clearable>
          <el-option v-for="dict in dict.type.market_place" :key="dict.value" :label="dict.label"
                     :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="BS目标产品" prop="bs">
        <el-input
          v-model="queryParams.bs"
          placeholder="请输入是否是BS目标产品,判断是否是抢占BS产品，BI勾选，用于BS新增和丢失板块"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <br/>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['keepa:product:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['keepa:product:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['keepa:product:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['keepa:product:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-top"
          size="mini"
          @click="handleImport"
          v-hasPermi="['keepa:product:export']"
        >导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="公司名称" align="center" prop="company" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="品类" align="center" prop="bu" />
      <el-table-column label="asin" align="center" prop="asin" />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="大类" align="center" prop="generalCategoryRank" :sortable="'custom'" :sort-orders="['descending','ascending']">
        <template slot-scope="scope">
          <span>{{scope.row.generalCategory}}:{{scope.row.generalCategoryRank}}</span>
        </template>
      </el-table-column>
      <el-table-column label="小类" align="center" prop="categoryRank" :sortable="'custom'" :sort-orders="['descending','ascending']">
        <template slot-scope="scope">
          <span>{{scope.row.category}}:{{scope.row.categoryRank}}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键词" align="center" prop="keyword1">
        <template slot-scope="scope">
          <span>{{scope.row.keyword1}}:{{scope.row.naturalRanking1}}</span>
          <br/>
          <span>{{scope.row.keyword2}}:{{scope.row.naturalRanking2}}</span>
          <br/>
          <span>{{scope.row.keyword3}}:{{scope.row.naturalRanking3}}</span>
        </template>
      </el-table-column>

      <el-table-column label="评论数" align="center" prop="reviewCount" :sortable="'custom'" :sort-orders="['descending','ascending']"/>
      <el-table-column label="星级" align="center" prop="star" :sortable="'custom'" :sort-orders="['descending','ascending']"/>
      <el-table-column label="LD 频率" align="center" prop="ldFrequency" :sortable="'custom'" :sort-orders="['descending','ascending']"/>
      <el-table-column label="7DD频率" align="center" prop="sevenDdFrequency" :sortable="'custom'" :sort-orders="['descending','ascending']"/>
      <el-table-column label="下次LD时间" align="center" prop="nextLdDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nextLdDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格变化" align="center" prop="price">
          <template slot-scope="scope">
            <span>{{scope.row.lastPrice}}-->{{scope.row.price}}</span>
          </template>
      </el-table-column>
      <el-table-column label="更新时间 " align="center" prop="lastUpdatedDate" width="180">
        <template slot-scope="scope">
<!--          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>-->
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否是BS目标产品" align="center" prop="bs" >
      <template slot-scope="scope">
        <span>{{scope.row.bs}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['keepa:product:edit']"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-question"
            @click="queryHistoryInfo(scope.row)"
            v-hasPermi="['keepa:product:query']"
          >历史信息</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['keepa:product:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="form.company" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入品牌" />
        </el-form-item>
        <el-form-item label="品类" prop="bu">
          <el-input v-model="form.bu" placeholder="请输入品类" />
        </el-form-item>
        <el-form-item label="asin" prop="asin">
          <el-input v-model="form.asin" placeholder="请输入asin" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-select v-model="form.country" placeholder="请选择country" clearable>
            <el-option v-for="dict in dict.type.market_place" :key="dict.value" :label="dict.label"
                       :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="BS目标产品" prop="bs">
          <el-switch
            v-model="form.bs"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="关键词1" prop="keyword1">
          <el-input v-model="form.keyword1" placeholder="请输入关键词1" />
        </el-form-item>
        <el-form-item label="关键词2" prop="keyword2">
          <el-input v-model="form.keyword2" placeholder="请输入关键词2" />
        </el-form-item>
        <el-form-item label="关键词3" prop="keyword3">
          <el-input v-model="form.keyword3" placeholder="请输入关键词3" />
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title"  :visible.sync="openHistory" width="90%" height="90%" append-to-body>
        <div style="overflow-x:auto;">
          <table>
            <tr>
              <th width="100px;">日期</th>
              <td v-for="item in productHistoryList" width="150px;">{{item.dataDate}}</td>

            </tr>

            <tr>
              <th>价格</th>
              <td v-for="item in productHistoryList" >{{item.price}}</td>
            </tr>

            <tr>
              <th>大类的名称</th>
              <td v-for="item in productHistoryList" >{{item.generalCategory}}</td>
            </tr>

            <tr>
              <th>大类排名</th>
              <td v-for="item in productHistoryList" >{{item.generalCategoryRank}}</td>
            </tr>

            <tr>
              <th>小类的名称</th>
              <td v-for="item in productHistoryList" >{{item.category}}</td>
            </tr>

            <tr>
              <th>小类排名</th>
              <td v-for="item in productHistoryList" >{{item.categoryRank}}</td>
            </tr>

            <tr>
              <th>关键词1</th>
              <td v-for="item in productHistoryList" >{{item.keyword1}}</td>
            </tr>

            <tr>
              <th>自然排名1</th>
              <td v-for="item in productHistoryList" >{{item.naturalRanking1}}</td>
            </tr>

            <tr>
              <th>关键词2</th>
              <td v-for="item in productHistoryList" >{{item.keyword2}}</td>
            </tr>

            <tr>
              <th>自然排名2</th>
              <td v-for="item in productHistoryList" >{{item.naturalRanking2}}</td>
            </tr>

            <tr>
              <th>关键词3</th>
              <td v-for="item in productHistoryList" >{{item.keyword3}}</td>
            </tr>

            <tr>
              <th>自然排名3</th>
              <td v-for="item in productHistoryList" >{{item.naturalRanking3}}</td>
            </tr>

            <tr>
              <th>星级</th>
              <td v-for="item in productHistoryList" >{{item.star}}</td>
            </tr>

            <tr>
              <th>评论数量</th>
              <td v-for="item in productHistoryList" >{{item.reviewCount}}</td>
            </tr>
            <tr>
              <th>LD</th>
              <td v-for="item in productHistoryList" >{{item.ld}}</td>
            </tr>

            <tr>
              <th>7DD</th>
              <td v-for="item in productHistoryList" >{{item.sevenDd}}</td>
            </tr>
          </table>
        </div>
    </el-dialog>

    <el-dialog title="导入数据" :visible.sync="importOpen" width="800px" append-to-body>
        <el-divider></el-divider>
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <span style="display: flex;justify-content: center;">1、请下载excel数据模板，填写信息</span>
            <div style="padding: 30px;display: flex;justify-content: center;">
              <img src="./../../../../src/assets/images/excel.png" style="width: 120px;height: 120px;margin: auto">
            </div>
            <div style="padding: 30px ;display: flex;justify-content: center;">
              <el-button type="primary" size="mini" @click="handleTemplate">模板下载</el-button>
          </div>
        </el-col>
        <el-col :span="0.5" style="padding: 50px 0 50px 0">
          <div class="line"></div>
        </el-col>
        <el-col :span="8">
          <span style="display: flex;justify-content: center;">2、请上传填好的excel文件</span>
          <div style="padding: 30px;display: flex;justify-content: center;">
            <img src="./../../../../src/assets/images/excel.png" style="width: 120px;height: 120px;margin: auto">
          </div>
          <div style="padding: 30px;display: flex;justify-content: center;" v-loading="importLoading">
            <input
              type="file"
            @change="addFile"
            ref="inputer"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            >
          </div>
        </el-col>
        </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { listProduct, getProduct, delProduct, addProduct, updateProduct, getProductHistoryInfo, importData } from "@/api/keepa/product";
export default {
  name: "Product",
  dicts: ['market_place'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 选中数组ASIN
      asins: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品表格数据
      productList: [],
      // 产品历史表格数据
      productHistoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示历史信息弹出层
      openHistory: false,
      //importOpen 是否显示导入弹出层
      importOpen:false,
      //导入loading
      importLoading:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn:'updateTime',
        isAsc:'descending',
        company: null,
        brand: null,
        bu: null,
        asin: null,
        country: null,
        generalCategory: null,
        generalCategoryRank: null,
        generalCategory2: null,
        generalCategory2Rank: null,
        category: null,
        categoryRank: null,
        category2: null,
        category2Rank: null,
        category3: null,
        category3Rank: null,
        keyword1: null,
        naturalRanking1: null,
        keyword2: null,
        naturalRanking2: null,
        keyword3: null,
        naturalRanking3: null,
        reviewCount: null,
        star: null,
        ld: null,
        ldFrequency: null,
        sevenDd: null,
        sevenDdFrequency: null,
        nextLdDate: null,
        price: null,
        lastUpdatedDate: null,
        bs: null,
        status: "1",
      },
      // 表单参数
      form: {},
      //文件数据
      formData: new FormData(),
      file: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询产品列表 */
    getList() {
      this.loading = true;
      listProduct(this.queryParams).then(response => {
        this.productList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.openHistory = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        productId: null,
        company: null,
        brand: null,
        bu: null,
        asin: null,
        country: null,
        generalCategory: null,
        generalCategoryRank: null,
        generalCategory2: null,
        generalCategory2Rank: null,
        category: null,
        categoryRank: null,
        category2: null,
        category2Rank: null,
        category3: null,
        category3Rank: null,
        keyword1: null,
        naturalRanking1: null,
        keyword2: null,
        naturalRanking2: null,
        keyword3: null,
        naturalRanking3: null,
        reviewCount: null,
        star: null,
        ld: null,
        ldFrequency: null,
        sevenDd: null,
        sevenDdFrequency: null,
        nextLdDate: null,
        price: null,
        lastUpdatedDate: null,
        bs: null,
        status: "1",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.productId)
      this.asins = selection.map(item => item.asin)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const productId = row.productId || this.ids
      getProduct(productId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品";
      });
    },
    /** 查看历史信息按钮操作 */
    queryHistoryInfo(row) {
      this.reset();
      this.openHistory = true;
      this.title = "查看历史产品信息："+row.company+","+row.country+", "+row.asin;
      getProductHistoryInfo(row).then(response => {
        this.productHistoryList = response.rows;
        this.loading = false;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.productId != null) {
            updateProduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProduct(this.form).then(response => {
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
      const productIds = row.productId || this.ids;
      const selectAsins = row.asin || this.asins;
      this.$modal.confirm('确认删除产品ASIN为"' + selectAsins + '"的数据项？').then(function() {
        return delProduct(productIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('keepa/product/export', {
        ...this.queryParams
      }, `product_${new Date().getTime()}.xlsx`)
    },
    handleImport() {
      this.importOpen=true;
    },

    handleTemplate(){
      this.download('/keepa/product/import/template', {}, `info_${new Date().getTime()}.xlsx`).then(res=>{
        console.log(res)
      })
    },

    //上传文件
    addFile() {
      var _this = this;
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];
      let size = Math.floor(this.file.size / 1024);
      if (size > 20 * 1024 * 1024) {
        alert("请选择20M以内的图片！");
        return false;
      }
      this.importLoading = true;
      this.formData.append("file", this.file);
      importData(this.formData).then(response => {
        this.importLoading = false;
        alert(response.msg);
      });

    },


    handleSortChange(column){
       this.queryParams.orderByColumn = column.prop;//查询字段是表格中字段名字
       console.log(column);
       this.queryParams.isAsc = column.order;//动态取值排序顺序
       this.getList();//查询
    },


  }
};
</script>

