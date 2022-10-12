<template>
  <el-dialog title="导入供应商" :visible.sync="open" width="400px" append-to-body>
    <el-upload ref="upload" :http-request="requestUpload" class="upload-demo" action="#" accept=".xlsx, .csv"
      :before-upload="beforeUpload" :file-list="fileList">
      <el-button size="small" slot="trigger" type="primary">导入供应商</el-button>
      <a style="font-size:12px;vertical-align: baseline;color: #1890ff;padding-left:10px" href="../../../suppliers.xlsx"
            download="供应商信息.xlsx" >下载数据模板</a>
      <div class="el-upload__tip" slot="tip">
        <div>
          <i class="el-icon-warning  gap"/>
          <span class="warntext">支持导入格式为slsx/csv的文件(手动修改文件后缀无效)</span>
          
        </div>
        <div><span class="warntext"><i class="el-icon-warning gap"/>模板中的表头不可更改，不可删除</span></div>
        <div><span class="warntext"><i class="el-icon-warning gap"/>数据记录不可超过5000条</span></div>
        <div><span class="warntext"><i class="el-icon-warning gap"/>供应商名称相同，取第一条记录</span></div>
        <div><span class="warntext"><i class="el-icon-warning gap"/>重复导入同个供应商数据将覆盖原有数据</span></div>

      </div>
    </el-upload>
  </el-dialog>
</template>

<script>
import {
  getToken
} from "@/utils/auth";
import axios from 'axios'
export default {
  name: 'ImportForm',
  data () {
    return {
      open: false,
      file: {},
      fileList: [],
    }
  },
  methods: {
    async beforeUpload (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      axios({
        method: 'POST',
        url: process.env.VUE_APP_BASE_API + "/web/station/import",
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'multipart/form-data'
        },
        data: formdata,
      }).then(async (res) => {
        this.$modal.msgSuccess("导入成功");
        this.handleFinish()
      },err=>{
        this.$modal.msgError("导入失败");
      })
    },
    // 覆盖默认的上传行为
    requestUpload () {
    },
    openImport () {
      this.open = true
    },
    handleFinish () {
      this.open = false
      this.fileList = []
      this.$emit("ok")
    },
    cancel () {
      this.open = false
    }
  }
}
</script>

<style>
  .warntext{
    font-size: 13px;
  }
  .gap{
    padding-right: 10px;
  }
</style>
