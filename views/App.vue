<template>
  <div id="app">
    <router-view></router-view>
    <el-button type="primary" @click="goPage">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello vue'
    }
  },
  methods: {
  	goPage () {
  		this.$router.push({path: '/update'})
  	}
  }
}
</script>
