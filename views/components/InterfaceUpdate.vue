<template>
  <div class="wrapper">
    <div class="editer-wrapper">
      <div ref="codeEditor"></div>
    </div>
    <div class="form-wrapper">
      <el-form ref="form" :model="temp" :rules="rules" label-width="80px" class="form">
        <el-form-item label="METHOD:" prop="method">
          <el-select v-model="temp.method" class="form-item" size="small">
            <el-option v-for="item in method" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="URL:" prop="url">
          <el-input v-model="temp.url" class="form-item" size="small">
            <template slot="prepend">/</template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input v-model="temp.description" class="form-item" size="small"></el-input>
        </el-form-item>
        <div class="create-button">
          <el-button type="primary" @click="submit">创建</el-button>
        </div>
        <el-button-group>
          <el-button type="primary" icon="el-icon-s-order" @click="format">格式化</el-button>
          <el-button type="primary" icon="el-icon-circle-close" @click="close">关闭</el-button>
        </el-button-group>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import jsBeautify from 'js-beautify/js/lib/beautify'
import {Api} from '../util/axois/index'

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
      rules: {
        method: [
            { required: true, message: '请选择METHOD', trigger: 'blur' }
        ],
        url: [
            { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      method: [
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
        { label: 'put', value: 'put' },
        { label: 'delete', value: 'delete' },
        { label: 'patch', value: 'patch' }
      ],
      temp: {
        url: '',
        rule: '{"data": {}}',
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
      this.temp.rule = this.mockData.rule
      this.temp.method = this.mockData.method
      this.temp.description = this.mockData.description
    }

    this.$nextTick(() => {
      this.codeEditor.setValue(this.temp.rule)
      this.format()
    })
  },
  methods: {
    convertUrl (url) {
      const newUrl = '/' + url
      return newUrl === '/'
        ? '/'
        : newUrl.replace(/\/\//g, '/').replace(/\/$/, '')
    },
    submit() {
      if (!this.temp.rule) {
        this.$message.error('接口数据不能为空!');
        return
      }
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const mockUrl = this.convertUrl(this.temp.url)
          try {
            const value = (new Function(`return ${this.temp.rule}`))() // eslint-disable-line
            if (!value) {
              this.$message.error('接口数据不能为空。')
              return
            } else if (typeof value !== 'object') {
              throw new Error()
            }
          } catch (err) {
            if (!/^http(s)?:\/\//.test(this.temp.rule)) {
              this.$message.error(error.message || '请检查数据定义是否符合要求。')
              return
            }
          }
          try {
            await Api.create({data: {...this.temp, url:mockUrl}})
            this.$message.success('新增成功!')
            this.$router.push('/')
          } catch(e) {
            this.$message.error(e)
          }     
        }
      })
    },
    format () {
      const context = this.codeEditor.getValue()
      let code = /^http(s)?/.test(context)
        ? context
        : jsBeautify.js_beautify(context, { indent_size: 2 })
      this.codeEditor.setValue(code)
    },
    close () {
      this.$router.go(-1)
    },
    onChange () {
      this.temp.rule = this.codeEditor.getValue()
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