<template>

  <div class="main">
    <div class="header">
        <img class="header-logo" src='../../../static/img/logo.jpg' alt="图标不见了"/>
        <div class="header-title">IT 技术分享平台 </div>
    </div>
    <!-- 轮播图 -->
    <div>
      <el-carousel :interval="4000" type="card" height="400px;">
        <el-carousel-item v-for="item in 4">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 导航 -->
    <div class="tab">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="技术头条" name="first">
          <div class="tab-content">
            <br>1
            <br>2
            <br>3
            <br>4
            <br>5
            <br>6
            <br>7
            <br>8
            <br>9
            <br>10
            <br>11
          </div>
        </el-tab-pane>
        <el-tab-pane label="技术博客" name="second">博客Blog</el-tab-pane>
        <el-tab-pane label="技术问答" name="third">IT问答</el-tab-pane>
        <el-tab-pane label="资源下载" name="fourth">资源下载</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>
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

  .tab {
    width: auto;
    height: 500px;
    max-width: 980px;
    margin: auto;
  }

  .tab-content {
    height: auto;
    width: 100%;
  }

  .main {
    height: auto;
    overflow-y: scroll;
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
