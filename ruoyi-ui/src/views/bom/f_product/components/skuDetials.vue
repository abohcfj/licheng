<template>
  <!-- 供应商详情对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList">
      <el-table-column label="SKU" align="center" prop="sku" />
      <el-table-column label="辅料类别" align="center" prop="materialCategory">
        <template #header>
          <ParamsSearch title="辅料类别" paramKey="materialCategory" :defaultArray="filterData('materialCategory')" @search="handleParamsSearch"/>
        </template>
      </el-table-column>
      <el-table-column label="辅料名称" align="center" prop="materialName" >
        <template #header>
          <ParamsSearch title="辅料名称" paramKey="materialName" :defaultArray="filterData('materialName')" @search="handleParamsSearch"/>
        </template>
      </el-table-column>
      <el-table-column label="辅料编码" align="center" prop="materialCode">
        <template #header>
          <ParamsSearch title="辅料编码" paramKey="materialCode" :defaultArray="filterData('materialCode')" @search="handleParamsSearch"/>
        </template>
      </el-table-column>
      <el-table-column label="供应商" align="center" prop="title" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="币种" align="center" prop="currency" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="历史价格" align="center" prop="historyPrice" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goback(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import {listBoms} from '@/api/boms/index'
import ParamsSearch from '@/views/components/paramSearch/index'

export default {
  name: "SkuDetilas",
  props: {

  },
  components:{
    ParamsSearch
  },
  computed: {
    filterData () {
      return function (data) {
        let obj = [];
        this.detailsList.filter((item) => {
          obj.push(item[data]);
        });
        let result = [...new Set(obj)].map((item) => {
          return (item = {
            text: item,
            value: item,
          });
        });
        return result;
      };
    },
  },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "BOM详情页",
      detailsList: [],
      queryParams:{
        id:undefined,
        materialCategory:undefined,
        materialName:undefined,
        materialCode:undefined
      }
    }
  },
  created () {

  },
  methods: {
    getInfo (id) {
      if(id){
        this.queryParams.id = id
      }
      this.open = true
      this.loading = true;
      listBoms(this.queryParams).then(res => {
        this.detailsList = res.rows
        this.total = res.total;
        this.loading = false;
      })
    },
    handleParamsSearch(){
      const { paramKey, value } = params
      this.queryParams[paramKey] = value
      this.getInfo()
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.detailsList = [];
    },
    // 返回一级子页面1
    goback(row){
      let sku = 'test'
      this.$router.push({name:"Finished_product",params:{sku}});
    }
  }
}
</script>
<style>

</style>