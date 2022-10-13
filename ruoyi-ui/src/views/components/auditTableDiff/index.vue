<template>
  <div>
    <span>{{ tableData[paramKey] }}</span>
    <div style="color:red;font-size: 10px;" v-if="flag">
    <span>({{text}})</span>
  </div>
  </div>
  
</template>
<script>
export default {
  name:'AuditTableDiff',
  props:{
    paramKey:{
      type:String,
      default:''
    },
    tableData:{
      type:Object,
      default:{}
    }
  },
  data(){
    return {
      
   }
  },
  computed:{
    flag(){
      let value = false
      const {handleRemark,olddata} = this.tableData
      // 先判断是否为编辑操作
      if(handleRemark === '编辑'){
        // 在判断是否存在老数据
        if(olddata){
          // 新老数据是否不一致
          if(olddata[this.paramKey]&&this.tableData[this.paramKey] !== olddata[this.paramKey]){
            value = true
          }
        }
      }
      return value
    },
    text(){
      const {olddata} = this.tableData
      return olddata[this.paramKey]?olddata[this.paramKey]:''
    }
  },
  methods:{

  }

}
</script>