<!-- 修改/新建文章 -->
<template>
  <div>

    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><Icon type="ios-paper"></Icon>&nbsp;&nbsp;{{ postType }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="富文本编辑器" name="editor-edit">
        <v-vue-editor :post-type="postType"></v-vue-editor>
      </el-tab-pane>

      <el-tab-pane label="MarkDown编辑器" name="md-edit" :disabled="mdShow">
        <v-markdown :post-type="postType"></v-markdown>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import vMarkdown from '../editor/Markdown.vue';
  import vVueEditor from '../editor/VueEditor.vue';

  export default{
    data(){
      return {
        mdShow: false,
        postType: '',
        activeName: 'editor-edit'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      vMarkdown,vVueEditor
    },
    created: function(){
      let meId = localStorage.getItem("me-id");
        if (meId) {
            // this.$router.push("/personal-space");
        }else{
            localStorage.setItem("last-router",this.$route.path);
            this.$router.push('/login');
        }
      console.log(this.$route.params);
      this.postType = this.$route.params.type;
      if (this.postType == '提问') {
        this.mdShow = true;
      }
      // console.log(this.postType);
    }
  }
</script>

<style>
  .el-tab-pane {
    height: 10%;
  }
</style>
