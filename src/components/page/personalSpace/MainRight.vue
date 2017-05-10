<template>
  <div>
    <div class="main-right">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-list-alt">&nbsp;&nbsp;我的博客</span>
          <el-button style="float: right;" type="text" class="fa fa-file-code-o" @click="newEdit('博客')">&nbsp;新建博客</el-button>
        </div>
        <div v-for="o in 4" class="text item">
          <a href="#">{{'列表内容 ' + o }}</a>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-newspaper-o">&nbsp;&nbsp;我的头条</span>
          <el-button style="float: right;" type="text" class="fa fa-file-text" @click="newEdit('头条')">&nbsp;新建头条</el-button>
        </div>
        <div v-for="o in 4" class="text item">
          <a href="#">{{'列表内容 ' + o }}</a>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-question-circle">&nbsp;&nbsp;我的问答</span>
          <el-button style="float: right;" type="text" class="fa fa-question" @click="newEdit('提问')">&nbsp;新建提问</el-button>
        </div>
        <div v-for="o in 4" class="text item">
          <a href="#">{{'列表内容 ' + o }}</a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        getPostListUrl: 'it/post/getList',
        blogItems: [],
        headlinesItems: [],
        qaItems: []
      };
    },
    created: function(){

    },
    methods: {
      newEdit(type) {
        console.log(type);
        let args = {
          name: 'editPost',
          params: {
            type: type
          }
        }
        this.$router.push(args);
      }
    },
    //获取文章列表
    getPostList(postType){
      console.log(postType);
      let args = {
          param: "",
          postType: postType,
          states: "1"
      }
      this.$http.get(this.getPostListUrl,{params:args}).then(
        response => {
          console.log(response.body);
        },
        response => {
          let errorMsg = response.body.developerMessage;
          this.$message.error(errorMsg);
          if (errorMsg.indexOf("未认证") > -1) {
              this.$router.push("/login");
          }
        }
      );
    }
  }
</script>

<style>

</style>
