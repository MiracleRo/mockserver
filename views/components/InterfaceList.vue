<template>
  <div class="list-view">
    <div class="button-wrapper">
      <el-button type="primary" icon="el-icon-document-add" @click="goToUpdate">新增</el-button>
      <el-button type="primary" icon="el-icon-download" @click="downApi">下载</el-button>
    </div>
    <div class="table-wrapper">
      <el-table v-loading="loading" :data="apiList" style="width: 100%">
        <el-table-column prop="url" label="请求路径"></el-table-column>
        <el-table-column prop="method" label="请求方法"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goToPreview(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="goToUpdate(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteApi(scope.row)">删除</el-button>
          </template>
        </el-table-column>  
      </el-table>
    </div>
    <div v-show="total > 0" class="pagination-wrapper">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum"
        @current-change="pageChange"
      ></el-pagination>
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
      pageNum: 1,
      total: 0,
      loading: false
    }
  },
  created() {
    this.getApiList()
  },
  methods: {
    async getApiList() {
      try {
        this.loading = true;
        const apiList = await Api.list({params:{pageSize: this.pageSize,pageNum:this.pageNum}})
        this.apiList = [...apiList.data.list]
        this.total = apiList.data.total
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    pageChange(num) {
      this.pageNum = num;
      this.getApiList()
    },
    goToUpdate(payload) {
      payload.id ? this.$router.push(`update/${payload.id}`) : this.$router.push(`create`)
    },
    goToPreview(payload) {
      const baseUrl = window.location.host
      window.open(baseUrl + '/mock' + payload.url + '#!method=' + payload.method)
    },
    async deleteApi (payload) {
      const {id} = payload
      try {
        await Api.deleteApi({data: {id: parseInt(id)}})
        this.getApiList()
        this.$message.success('删除成功!')
      } catch(e) {
        console.log(e)
      }
    },
    downApi() {
      console.log(111111)
    }
  }
}
</script>
<style lang="less">
.list-view {
  width: 70%;
  margin: 100px auto 0;
  .button-wrapper {
    display: flex;
     justify-content: flex-end;
  }
  .table-wrapper {
    margin: 20px 0;
  }
  .pagination-wrapper {
    text-align: center;
  }
}
</style>