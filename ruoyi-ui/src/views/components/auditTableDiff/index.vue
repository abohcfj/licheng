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
      const {note,originalItemDetail} = this.tableData
      // 先判断是否为编辑操作
      if(note === '编辑'){
        // 在判断是否存在老数据
        if(originalItemDetail){
          // 新老数据是否不一致
          if(originalItemDetail[this.paramKey]&&this.tableData[this.paramKey] !== originalItemDetail[this.paramKey]){
            value = true
          }
        }
      }
      return value
    },
    text(){
      const {originalItemDetail} = this.tableData
      return originalItemDetail[this.paramKey]?originalItemDetail[this.paramKey]:''
    }
  },
  methods:{

  }

}
</script>