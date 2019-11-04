<template>
  <div class="list-view">
    <div class="button-wrapper">
      <el-button type="primary" icon="el-icon-document-add" @click="goToUpdate">新增</el-button>
      <el-button type="primary" icon="el-icon-download" @click="downApi">下载</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  methods: {
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