<template>
  <div>
    <div class="search-header">
      <span class="search-title" :class="value!==''?'red':''">{{title}}</span>
    </div>
    <el-select size="mini" v-model="value" filterable remote clearable :loading="loading" placeholder="请选择"
      :remote-method="remoteMethod" @change="handleSearch">
      <el-option v-for="item in selectArray" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'ParamSearch',
  props: {
    paramKey:{
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    defaultArray:{
      type:Array,
      default:[]
    }
  },
  watch:{
    defaultArray(nval,oval){
      this.selectArray = nval
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      value: '',
      selectArray: []
    }
  },
  methods: {
    // 根据输入的数据查询匹配项
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true;
        // 请求相关接口进行模糊查询
        setTimeout(() => {
          this.loading = false;
          this.selectArray = [{ label: '123', value: '123' }, { label: '456', value: '456' }]
        }, 2000);
      } else {
        this.selectArray = [];
      }
      
    },
    // 对于选中的数据进行查询
    handleSearch(){
      let params = {paramKey:this.paramKey,value:this.value}
      this.$emit('search',params)
    }
  }

}
</script>
<style scoped>
  .red{
    color:red
  }
</style>