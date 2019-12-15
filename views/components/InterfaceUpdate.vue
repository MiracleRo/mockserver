<template>
  <div class="wrapper">
    <div class="editer-wrapper">
      <div ref="codeEditor"></div>
    </div>
    <div class="form-wrapper">
      <el-form ref="form" :model="temp" label-width="80px" class="form">
        <el-form-item label="METHOD:">
          <el-select v-model="temp.methods" class="form-item" size="small">
            <el-option v-for="item in methods" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="URL:">
          <el-input v-model="temp.url" class="form-item" size="small">
            <template slot="prepend">/</template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="temp.description" class="form-item" size="small"></el-input>
        </el-form-item>
        <div class="create-button">
          <el-button type="primary" @click="submit">创建</el-button>
        </div>
        <el-button-group>
          <el-button type="primary" icon="el-icon-s-order">格式化</el-button><el-button type="primary" icon="el-icon-circle-close">关闭</el-button>
        </el-button-group>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import jsBeautify from 'js-beautify/js/lib/beautify'

if (typeof window !== 'undefined') {
  ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')
  require('brace/ext/language_tools')
  require('brace/ext/searchbox')
  require('../util/snippets')
}
export default {
  data () {
    return {
      codeEditor: null,
      methods: [
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
        { label: 'put', value: 'put' },
        { label: 'delete', value: 'delete' },
        { label: 'patch', value: 'patch' }
      ],
      temp: {
        url: '',
        mode: '{"data": {}}',
        method: 'get',
        description: ''
      }
    }
  },
  mounted () {
    this.codeEditor = ace.edit(this.$refs.codeEditor)
    this.codeEditor.getSession().setMode('ace/mode/javascript')
    this.codeEditor.setTheme('ace/theme/monokai')
    this.codeEditor.setOption('tabSize', 2)
    this.codeEditor.setOption('fontSize', 15)
    this.codeEditor.setOption('enableLiveAutocompletion', true)
    this.codeEditor.setOption('enableSnippets', true)
    this.codeEditor.clearSelection()
    this.codeEditor.getSession().setUseWorker(false)
    this.codeEditor.on('change', this.onChange)
    this.codeEditor.commands.addCommand({
      name: 'save',
      bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
      exec: () => {
        this.submit()
      }
    })

    if (this.isEdit) {
      this.autoClose = true
      this.temp.url = this.mockData.url.slice(1) // remove /
      this.temp.mode = this.mockData.mode
      this.temp.method = this.mockData.method
      this.temp.description = this.mockData.description
    }

    this.$nextTick(() => {
      this.codeEditor.setValue(this.temp.mode)
      this.format()
    })
  },
  methods: {
    submit() {
      console.log(111111111)
    },
     format () {
      const context = this.codeEditor.getValue()
      let code = /^http(s)?/.test(context)
        ? context
        : jsBeautify.js_beautify(context, { indent_size: 2 })
      this.codeEditor.setValue(code)
    },
    onChange () {
      this.temp.mode = this.codeEditor.getValue()
    }
  }
}
</script>
<style lang="less">
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  overflow: hidden;
  .editer-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    & > div {
      height: 100%;
    }
  }
  .form-wrapper {
    text-align: center;
    flex: 0 0 350px;
    height: 100%;
    .form {
      width: 300px;
      margin: 200px auto;
      .create-button {
        margin: 10px 0;
      }
      .form-item {
        width: 220px;
      }
    }
  }
}
</style>