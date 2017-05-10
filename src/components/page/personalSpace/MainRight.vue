<template>
  <div>
    <div class="main-right">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-list-alt">&nbsp;&nbsp;我的博客</span>
          <el-button style="float: right;" type="text" class="fa fa-file-code-o" @click="newEdit('博客')">&nbsp;新建博客</el-button>
        </div>
        <div v-for="(item,index) in blogItems" :offset="index > 0 ? 2 : 0" class="text item">
          {{index}}.<Icon type="ios-book"></Icon><a href="#">&nbsp;{{ item.title }}</a>
          {{ item.createTime }}
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-newspaper-o">&nbsp;&nbsp;我的头条</span>
          <el-button style="float: right;" type="text" class="fa fa-file-text" @click="newEdit('头条')">&nbsp;新建头条</el-button>
        </div>
        <div v-for="(item,index) in headlinesItems" class="text item" >
            {{index}}.<Icon type="ios-compose"></Icon>&nbsp;<a href="">{{ item.title }}</a>
            {{ item.createTime }}
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="right-content-title fa fa-question-circle">&nbsp;&nbsp;我的问答</span>
          <el-button style="float: right;" type="text" class="fa fa-question" @click="newEdit('提问')">&nbsp;新建提问</el-button>
        </div>
        <div v-for="(item,index) in qaItems" class="text item">
          {{index}}.<Icon type="speakerphone"></Icon><a href="#">&nbsp;{{ item.title }}</a>
          {{ item.createTime }}
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
      this.getPostList("博客");
      this.getPostList("头条");
      this.getPostList("提问");
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
            if (postType == "博客") {
              this.blogItems = response.body;
              console.log(this.blogItems);
            }else if(postType == "头条"){
              this.headlinesItems = response.body;
              console.log(this.headlinesItems);
            }else if(postType == "提问"){
              this.qaItems = response.body;
              console.log(this.qaItems);
            }
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
  }
</script>

<style>
  .text {
    font-size: 15px;
  }

  .item {
    padding: 10px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 100%;
    margin: 10px;
    max-height: 1000px;
  }
</style>
