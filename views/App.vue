<template>
  <div id="app">
    <div class="view">
      <router-view></router-view>
    </div>
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
    goPage() {
      this.$router.push({ path: '/update' })
    }
  }
}
</script>

<style lang="less">
#app {
  .view {
    width: 100%;
  }
}
</style>