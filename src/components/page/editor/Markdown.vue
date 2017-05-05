<!-- markdown编辑页面 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="plugins-tips">
            Vue-SimpleMDE：Vue.js的Markdown Editor组件。
            访问地址：<a href="https://github.com/F-loat/vue-simplemde" target="_blank">Vue-SimpleMDE</a>
        </div> -->
        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
        <div class="plugins-tips">
            <upload-file></upload-file>
            <el-button class="editor-btn" type="primary" @click="submit()">提交</el-button>
        </div>
        <!-- <mavonEditor v-model="content" height="100px;"/> -->
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';
    // import { mavonEditor } from 'mavon-editor';
    import uploadFile from '../upload/UploadFile.vue';
    export default {
        data: function(){
            return {
                content:'',
                configs: {
                    status: true,
                    initialValue: 'Hello BBK',
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                }
            }
        },
        components: {
          markdownEditor,uploadFile
            // mavonEditor
        },
        methods: {
          submit() {
            this.$message({
              message: '发表成功',
              type: 'success'
            });
          }
        }
    }
</script>

<style>
  .footer {
    display: none;
  }
</style>
