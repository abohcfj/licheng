<template>
  <!-- 待审核数据对话框 -->
  <!-- 如果存在修改的字段，应增加原数据字段进行判断是否显示和数据展示-->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList">
      <el-table-column label="品线" align="center" prop="lineString">
        <template slot-scope="scope">
          <span>{{scope.row.lineString}}</span>
          <br />
          <span class="old" v-if="scope.row.lineString">({{scope.row.lineString}})</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" align="center" prop="name">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
          <br />
          <span class="old" v-if="scope.row.name">({{scope.row.name}})</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商代码" align="center" prop="code">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
          <br />
          <span class="old" v-if="scope.row.code">({{scope.row.code}})</span>
        </template>
      </el-table-column>
      <el-table-column label="跟进人" align="center" prop="persion">
        <template slot-scope="scope">
          <span>{{scope.row.persion}}</span>
          <br />
          <span class="old" v-if="scope.row.persion">({{scope.row.persion}})</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="concat">
        <template slot-scope="scope">
          <span>{{scope.row.concat}}</span>
          <br />
          <span class="old" v-if="scope.row.concat">({{scope.row.concat}})</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="phone">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
          <br />
          <span class="old" v-if="scope.row.phone">({{scope.row.phone}})</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" prop="email">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
          <br />
          <span class="old" v-if="scope.row.email">({{scope.row.email}})</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" prop="address">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
          <br />
          <span class="old" v-if="scope.row.address">({{scope.row.address}})</span>
        </template>
      </el-table-column>
      <el-table-column label="提货地址" align="center" prop="pickup">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
          <br />
          <span class="old" v-if="scope.row.phone">({{scope.row.phone}})</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center" prop="payTypeString">
        <template slot-scope="scope">
          <span>{{scope.row.payTypeString}}</span>
          <br />
          <span class="old" v-if="scope.row.payTypeString">({{scope.row.payTypeString}})</span>
        </template>
      </el-table-column>
      <el-table-column label="结算方式" align="center" prop="closeTypeString" >
        <template slot-scope="scope">
          <span>{{scope.row.closeTypeString}}</span>
          <br />
          <span class="old" v-if="scope.row.closeTypeString">({{scope.row.closeTypeString}})</span>
        </template>
      </el-table-column>
      <el-table-column label="预付比例" align="center" prop="tatio" >
        <template slot-scope="scope">
          <span>{{scope.row.tatio}}</span>
          <br />
          <span class="old" v-if="scope.row.tatio">({{scope.row.tatio}})</span>
        </template>
      </el-table-column>
      <el-table-column label="账期" align="center" prop="paymentDays" >
        <template slot-scope="scope">
          <span>{{scope.row.paymentDays}}</span>
          <br />
          <span class="old" v-if="scope.row.paymentDays">({{scope.row.paymentDays}})</span>
        </template>
      </el-table-column>
      <el-table-column label="结算币种" align="center" prop="currentcyString" >
        <template slot-scope="scope">
          <span>{{scope.row.currentcyString}}</span>
          <br />
          <span class="old" v-if="scope.row.currentcyString">({{scope.row.currentcyString}})</span>
        </template>
      </el-table-column>
      <el-table-column label="收款信息" align="center" prop="proceeds">
        <template slot-scope="scope">
          <span>{{scope.row.proceeds}}</span>
          <br />
          <span class="old" v-if="scope.row.proceeds">({{scope.row.proceeds}})</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="handleRemark">
        <template slot-scope="scope">
          <span style="color:forestgreen">{{scope.row.handleRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleSubmit(scope.row)">通过</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)" v-hasPermi="['suppliers:audit']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { listAudit,handleAgreeAudit,handleDeleteAudit } from '@/api/suppliers/index'

export default {
  name: "Audit",
  props: {

  },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "待审核",
      detailsList: [],
    }
  },
  created () {

  },
  methods: {
    getInfo () {
      this.open = true
      this.loading = true;
      listAudit().then(res => {
        this.detailsList = res.rows
        this.total = res.total;
        this.loading = false;
      })
    },
    handleSubmit (row) { 
      const {id} = row
      // 构造需要的数据进行上传
      handleAgreeAudit(row).then(res=>{
        this.$modal.msgSuccess("提交成功");
      })
    },
    handleDelete (row) {
      const {id} = row
      handleDeleteAudit(id).then(res=>{
        this.$modal.msgSuccess("删除成功");
      })
     },
    // 取消按钮
    cancel () {
      this.open = false;
      this.detailsList = [];
    },
  }
}
</script>
<style>
.old {
  color: red
}
</style>