<template>
  <!-- 待审核数据对话框 -->
  <!-- 如果存在修改的字段，应增加原数据字段进行判断是否显示和数据展示-->
  <el-dialog :title="title" :visible.sync="open" width="1400px" append-to-body>
    <el-table v-loading="loading" :data="detailsList">
      <el-table-column label="品线" align="center" prop="productLine">
        <template slot-scope="scope">
          <span>{{scope.row.productLine}}</span>
          <br />
          <span class="old" v-if="scope.row.productLine">({{scope.row.productLine}})</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" align="center" prop="title">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
          <br />
          <span class="old" v-if="scope.row.title">({{scope.row.title}})</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商代码" align="center" prop="code">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
          <br />
          <span class="old" v-if="scope.row.code">({{scope.row.code}})</span>
        </template>
      </el-table-column>
      <el-table-column label="跟进人" align="center" prop="principal">
        <template slot-scope="scope">
          <span>{{scope.row.principal}}</span>
          <br />
          <span class="old" v-if="scope.row.principal">({{scope.row.principal}})</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="contactName">
        <template slot-scope="scope">
          <span>{{scope.row.contactName}}</span>
          <br />
          <span class="old" v-if="scope.row.contactName">({{scope.row.contactName}})</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="contactPhone">
        <template slot-scope="scope">
          <span>{{scope.row.contactPhone}}</span>
          <br />
          <span class="old" v-if="scope.row.contactPhone">({{scope.row.contactPhone}})</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" prop="contactEmail">
        <template slot-scope="scope">
          <span>{{scope.row.contactEmail}}</span>
          <br />
          <span class="old" v-if="scope.row.contactEmail">({{scope.row.contactEmail}})</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" prop="contactAddress">
        <template slot-scope="scope">
          <span>{{scope.row.contactAddress}}</span>
          <br />
          <span class="old" v-if="scope.row.contactAddress">({{scope.row.contactAddress}})</span>
        </template>
      </el-table-column>
      <el-table-column label="提货地址" align="center" prop="shippingAddress">
        <template slot-scope="scope">
          <span>{{scope.row.shippingAddress}}</span>
          <br />
          <span class="old" v-if="scope.row.shippingAddress">({{scope.row.shippingAddress}})</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center" prop="paymentOption">
        <template slot-scope="scope">
          <span>{{scope.row.paymentOption}}</span>
          <br />
          <span class="old" v-if="scope.row.paymentOption">({{scope.row.paymentOption}})</span>
        </template>
      </el-table-column>
      <el-table-column label="结算方式" align="center" prop="settleOption" >
        <template slot-scope="scope">
          <span>{{scope.row.settleOption}}</span>
          <br />
          <span class="old" v-if="scope.row.settleOption">({{scope.row.settleOption}})</span>
        </template>
      </el-table-column>
      <el-table-column label="预付比例" align="center" prop="prepaidPercentage" >
        <template slot-scope="scope">
          <span>{{scope.row.prepaidPercentage}}</span>
          <br />
          <span class="old" v-if="scope.row.prepaidPercentage">({{scope.row.prepaidPercentage}})</span>
        </template>
      </el-table-column>
      <el-table-column label="账期" align="center" prop="paymentPeriod" >
        <template slot-scope="scope">
          <span>{{scope.row.paymentPeriod}}</span>
          <br />
          <span class="old" v-if="scope.row.paymentPeriod">({{scope.row.paymentPeriod}})</span>
        </template>
      </el-table-column>
      <el-table-column label="结算币种" align="center" prop="settleCurrency" >
        <template slot-scope="scope">
          <span>{{scope.row.settleCurrency}}</span>
          <br />
          <span class="old" v-if="scope.row.settleCurrency">({{scope.row.settleCurrency}})</span>
        </template>
      </el-table-column>
      <el-table-column label="收款信息" align="center" prop="paymentInfo">
        <template slot-scope="scope">
          <span>{{scope.row.paymentInfo}}</span>
          <br />
          <span class="old" v-if="scope.row.paymentInfo">({{scope.row.paymentInfo}})</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="handleRemark">
        <template slot-scope="scope">
          <span style="color:forestgreen">{{scope.row.handleRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width"  fixed="right">
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