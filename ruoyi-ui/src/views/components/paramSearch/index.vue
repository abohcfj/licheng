<template>
  <div>
    <el-popover placement="bottom" title="搜索" width="200" trigger="click">
      <div slot="reference" class="search-header">
        <span class="search-title" :class="value !== '' ? 'red' : ''">{{
          title
        }}</span>
        <i class="search-icon el-icon-search"></i>
      </div>
      <el-select
        size="mini"
        v-model="value"
        filterable
        remote
        clearable
        :loading="loading"
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        @change="handleSearch"
      >
        <el-option
          v-for="(item, index) in selectArray"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-popover>
    <span style="font-size: 10px; color: darkgrey">{{ value }}</span>
  </div>
</template>
<script>
import { searchBykeyword } from "@/api/suppliers/index";

export default {
  name: "ParamSearch",
  props: {
    url: { type: String, default: "" },
    serachKey: { type: String, default: "" },
    paramKey: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    defaultArray: {
      type: Array,
      default: [],
    },
  },
  watch: {
    defaultArray(nval, oval) {
      this.selectArray = nval;
    },
  },
  data() {
    return {
      loading: false,
      visible: false,
      value: "",
      selectArray: [],
    };
  },
  methods: {
    // 根据输入的数据查询匹配项
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        // 请求相关接口进行模糊查询
        let params = {};
        if (this.serachKey === "") {
          params[this.paramKey] = query;
        } else {
          params[this.serachKey] = query;
        }
        searchBykeyword(this.url, params).then((res) => {
          if (res.code === 200) {
            this.loading = false;
            this.selectArray = res.data;
          }
        });
      }
    },
    // 对于选中的数据进行查询
    handleSearch() {
      let params = { paramKey: this.paramKey, value: this.value };
      this.$emit("search", params);
    },
  },
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
