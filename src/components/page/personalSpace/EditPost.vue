<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="富文本编辑器" name="editor-edit">
        <v-vue-editor></v-vue-editor>
      </el-tab-pane>

      <el-tab-pane label="MarkDown编辑器" name="md-edit">
        <v-markdown></v-markdown>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import vMarkdown from './Markdown.vue';
  import vVueEditor from './VueEditor.vue';
  export default{
    data(){
      return {
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
    }
  }
</script>

<style>

</style>
