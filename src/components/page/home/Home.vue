<!-- 首页 -->
<template>

  <div class="main">

    <div class="header">
        <img class="header-logo" src='../../../../static/img/logo.jpg' alt="图标不见了"/>
        <div class="header-title">IT 技术分享平台 </div>
        <div class="person-place"><span class="fa fa-home" @click="PersonalSpace()">个人空间</span></div>
    </div>
    <!-- 轮播图 -->
    <div class="picture">
      <el-carousel :interval="4000" type="card" height="400px;">
        <el-carousel-item v-for="item in banner">
          <h3><img :src='item.src' alt="图标不见了" width="100%" height="100%"/></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 导航 -->
    <div class="tab">
      <div class="tab-content">
         <Row>
          <Col :xs="0" :sm="24" :md="24" :lg="24">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" default-active="1">
              <el-menu-item index="头条"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
              <el-menu-item index="博客"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
              <el-menu-item index="提问"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
              <el-submenu index="4">
                <template slot="title"><span class="fa fa-cloud-download">&nbsp;资源下载</span></template>
                <el-menu-item index="4-1"><span class="fa fa-book">&nbsp;使用手册</span></el-menu-item>
                <el-menu-item index="4-2"><span class="fa fa-file-archive-o">&nbsp;源码实例</span></el-menu-item>
              </el-submenu>
            </el-menu>
          </Col>
          <Col :xs="24" :sm="0" :md="0" :lg="0">
            <el-menu default-active="0" class="el-menu-vertical" @select="handleSelect" @open="handleOpen" @close="handleClose">
              <el-submenu index="0">
                <template slot="title"><li class="el-icon-menu"></li>导航</template>
                <el-menu-item index="头条"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
                <el-menu-item index="博客"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
                <el-menu-item index="提问"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
                <el-submenu index="4">
                  <template slot="title"><span class="fa fa-cloud-download">&nbsp;资源下载</span></template>
                  <el-menu-item index="4-1"><span class="fa fa-book">&nbsp;使用手册</span></el-menu-item>
                  <el-menu-item index="4-2"><span class="fa fa-file-archive-o">&nbsp;源码实例</span></el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </Col>
        </Row>
      </div>
    </div>

    <!-- 首页主体 -->
    <div class="main-content">
      <Row>
        <Col :xs="24" :sm="14" :md="14" :lg="12">
          <div class="main-content-list">
            <Card :bordered="false" v-for="item in headlinesItems">
              <a slot="title" class="fa fa-hand-o-right" @click="postInfor(item.id)">&nbsp;&nbsp;{{ item.title }}</a>
              <a v-html="item.content" @click="postInfor(item.id)"></a>
            </Card>
          </div>
        </Col>
        <Col :xs="0" :sm="10" :md="10" :lg="12">
          <div class="main-content-right" >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="right-content-title fa fa-file-text">&nbsp;&nbsp;热门文章</span>
                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
              </div>
              <div v-for="item in blogItems" class="text item">
                <a @click="postInfor(item.id)">{{ item.title }}</a>
              </div>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="right-content-title fa fa-ambulance">&nbsp;&nbsp;江湖救急</span>
                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
              </div>
              <div v-for="item in qaItems" class="text item">
                <a @click="postInfor(item.id)">{{ item.title }}</a>
              </div>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="right-content-title fa fa-user-plus">&nbsp;&nbsp;热门作者</span>
                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
              </div>
              <div v-for="item in authorItems" class="text item">
                <a @click="userInfor(item.ID)">{{ item.name_ }}</a>
              </div>
            </el-card>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 底部 -->
   <!--  <div class="footer">
      <p>
        <i class="fa fa-qq" aria-hidden="true">&nbsp;wkwenka@gmail.com</i>
        <i class="fa fa-weixin" aria-hidden="true">&nbsp;15738826986</i>
      </p>
      <p>
        <i class="fa fa-weibo" aria-hidden="true">&nbsp;爱红尘的苦行僧</i>
        <i class="fa fa-github" aria-hidden="true">&nbsp;wenka</i>
      </p>
      <p><i class="fa fa-copyright" aria-hidden="true">版权所有</i></p>
    </div>-->
  </div> 

</template>

<script>
export default {
    data() {
      return {
        getPostUrl: 'it/pub/getPostList',
        getPopularAuthorUrl: 'it/pub/popularAuthor',
        blogItems: [],
        headlinesItems: [],
        qaItems: [],
        authorItems: [],
        banner:[
          {src: '../../../../static/img/banner/1.jpg'},
          {src: '../../../../static/img/banner/bootstrap.jpg'},
          {src: '../../../../static/img/banner/vue.jpg'},
          {src: '../../../../static/img/banner/java.jpg'}
        ]
      }
    },
    created: function(){
      this.getPostList("博客");
      this.getPostList("头条");
      this.getPostList("提问");
      this.getPopularAuthor();
    },
    components: {
    },
    methods: {
      handleSelect(key, keyPath) {
          console.log(key);
          let args = {
            name: "pubArticleList",
            params: {
              postType: key
            }
          };
          this.$router.push(args);
      },
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
         console.log(key, keyPath);
      },
      PersonalSpace(){
        console.log("个人空间");
        let meId = localStorage.getItem("me-id");
        console.log(meId);
        if (meId) {
            this.$router.push("/personal-space");
        }else{
            this.$router.push('/login');
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
        this.$http.get(this.getPostUrl,{params:args}).then(
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
                localStorage.removeItem('me-id');
                localStorage.removeItem('me-name');
                localStorage.setItem("last-router",this.$route.path);
                this.$router.push("/login");
            }
          }
        );
      },
      //获取热门作者
      getPopularAuthor(){
        this.$http.get(this.getPopularAuthorUrl).then(
          response => {
            this.authorItems = response.body;
            console.log(this.authorItems);
          },
          response => {
            let errorMsg = response.body.developerMessage;
            this.$message.error(errorMsg);
            if (errorMsg.indexOf("未认证") > -1) {
                localStorage.removeItem('me-id');
                localStorage.removeItem('me-name');
                localStorage.setItem("last-router",this.$route.path);
                this.$router.push("/login");
            }
          }
        );
      },
      //作者详情
      userInfor(userId){
        let args = {
          name: "othersInfo",
          params:{
            userId: userId
          }
        };
        this.$router.push(args);
      },
      //文章详情
      postInfor(postId){
        let args = {
          name: 'othersSpace', 
          params: { 
            postId: postId
          }
        };
        this.$router.push(args);
      }
    },
    components: {

    }
  };
</script>

<style>

  .el-menu-vertical {
    width: auto;
    max-width: 200px;
  }

  .right-content-title {
    line-height: 36px;
    font-size: 20px;
    font-weight: bold;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
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
    width: 80%;
    margin: 20px;
    max-height: 500px;
  }

  .ivu-card {
    border-width: 1px;
    border-color: #DDDDDD;
    border-radius: 20px;
    border-style:dashed;
    padding: 10px;
  }

  .fa-home {
    border-radius: 50px;
    border-width: 1px;
    border-color: #00FF99;
    border-style: dashed;
    padding: 5px;
  }

  .fa-home:hover {
    background-color: #CCFFFF;
    cursor: pointer;
  }

  .person-place{
    float: right;
    margin: auto;
    font-size: 15px;
    padding-right: 10px;
    color: #009966;
    height: auto;
  }

  .footer {
    width: 100%;
    height: auto;
    float: left;
    background-color: #333333;
    text-align: center;
    font-size: 15px;
    bottom: 0px;
  }

  .main-content-right {
    margin: auto;
    width: 80%;
    max-width: 980px;
    float: left;
  }

  .main-content-list {
    margin: auto;
    width: 80%;
    max-width: 980px;
    float: right;
  }
  @media screen and (max-width: 500px) {
    .main-content-list {
      margin: auto;
      width: 100%;
    }
}

  .main-content {
    width:100%;
    margin: auto;
    float: left;
    align-items: center;
    align-content: center;
  }

  .picture {
    width: 100%;
    float: left;
  }

  .header {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 70px;
      font-size: 22px;
      line-height: 70px;
      color: #464c5b;
      background-color: #f5f7f9;
  }

  .header-title:hover{
    color: #009966;
    text-decoration:underline;
    cursor: pointer;
  }

  .header-title {
    margin: auto;
    float: left;
    color: #00CC99;
  }

  .header-logo {
    border-radius: 50%;
    height:50px;;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
  }

  .tab-content {
    width: 100%;
    max-width: 521px;
    margin: auto;
  }

  .tab {
    width: 100%;
    float: left;
    min-width: 521px;
  }

  body .main {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #EEEEEE;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
