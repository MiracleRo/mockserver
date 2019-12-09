<template>
  <div class="list-view">
    <div class="button-wrapper">
      <el-button type="primary" icon="el-icon-document-add" @click="goToUpdate">新增</el-button>
      <el-button type="primary" icon="el-icon-download" @click="downApi">下载</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import {Api} from '../util/axois/index'

export default {
  data() {
    return {
      apiList: [],
      pageSize: 10,
      pageNum: 1
    }
  },
  created() {
    this.getApiList()
  },
  methods: {
    async getApiList() {
      try {
        const apiList = await Api.list({params:{pageSize: this.pageSize,pageNum:this.pageNum}})
        this.apiList = [...apiList.list]
      } catch (e) {
        console.log(e)
      }
    },
    goToUpdate() {
      this.$router.push('update')
    },
    downApi() {
      console.log(111111)
    }
  }
}
</script>
<style lang="less">
.list-view {
  .button-wrapper {
    display: flex;
     justify-content: flex-end;
  }
}
</style>