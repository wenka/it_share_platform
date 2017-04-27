<template>

  <div class="main">

    <div class="header">
        <img class="header-logo" src='../../../static/img/logo.jpg' alt="图标不见了"/>
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
              <el-menu-item index="1"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
              <el-menu-item index="2"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
              <el-menu-item index="3"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
              <el-submenu index="4">
                <template slot="title"><span class="fa fa-cloud-download">&nbsp;资源下载</span></template>
                <el-menu-item index="4-1"><span class="fa fa-book">&nbsp;使用手册</span></el-menu-item>
                <el-menu-item index="4-2"><span class="fa fa-file-archive-o">&nbsp;源码实例</span></el-menu-item>
              </el-submenu>
            </el-menu>
          </Col>
          <Col :xs="24" :sm="0" :md="0" :lg="0">
            <el-menu default-active="0" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
              <el-submenu index="0">
                <template slot="title"><li class="el-icon-menu"></li>导航</template>
                <el-menu-item index="1"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
                <el-menu-item index="2"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
                <el-menu-item index="3"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
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
            <Card :bordered="false" v-for="(o, index) in 10" :offset="index > 0 ? 10 : 0">
              <p slot="title" class="fa fa-hand-o-right">&nbsp;&nbsp;无边框标题{{index}}</p>
              <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
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
              <div v-for="o in 4" class="text item">
                <a href="">{{'列表内容 ' + o }}</a>
              </div>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="right-content-title fa fa-ambulance">&nbsp;&nbsp;江湖救急</span>
                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
              </div>
              <div v-for="o in 4" class="text item">
                <a href="">{{'列表内容 ' + o }}</a>
              </div>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="right-content-title fa fa-user-plus">&nbsp;&nbsp;热门作者</span>
                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
              </div>
              <div v-for="o in 4" class="text item">
                <a href="">{{'列表内容 ' + o }}</a>
              </div>
            </el-card>

          </div>
        </Col>
      </Row>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <p>
        <i class="fa fa-qq" aria-hidden="true">&nbsp;wkwenka@gmail.com</i>
        <i class="fa fa-weixin" aria-hidden="true">&nbsp;15738826986</i>
      </p>
      <p>
        <i class="fa fa-weibo" aria-hidden="true">&nbsp;爱红尘的苦行僧</i>
        <i class="fa fa-github" aria-hidden="true">&nbsp;wenka</i>
      </p>
      <p><i class="fa fa-copyright" aria-hidden="true">版权所有</i></p>
    </div>
  </div>

</template>

<script>
export default {
    data() {
      return {
        banner:[
          {src: '../../../static/img/banner/1.jpg'},
          {src: '../../../static/img/banner/bootstrap.jpg'},
          {src: '../../../static/img/banner/vue.jpg'},
          {src: '../../../static/img/banner/java.jpg'}
        ] ,
        activeName2: '1',
        acticle: {
          currentDate: new Date(),
          articleAuthor: '傻帽哈哈哈哈',
          articleTitle: '文章标题lalalalallalalal啦啦啦啦啦',
          articleContent: '午后的阳光，刺眼而又绚丽，恣意的照在身上，让人感到舒服和自然，拿一把躺椅，懒洋洋的倒在上面，是那么的和谐。徐徐的微风吹来，纷纷芳香传来，沐浴其中，更是心旷神怡。不知过来多久，一阵刺耳的铃声传来，将我从梦中带回现实，睁开眼睛，阳光已经成了夕阳，让人有了一股忧伤感，也许这就是“夕阳无限好，只是近黄昏”的完美解释吧?惬意的生活总是短暂的，忙碌才是正轨。迈着沉重的步伐，拖着躺椅，回到工作的环境，一切还是那么的熟悉，除了安静就只有压抑了，只有窗边的几盆花有活着的样子，但是一个个耷拉着头，似乎也在做最后的挣扎。看着眼前的一切，不知道为何，总感觉度日如年。不知多少次幻想回到家，和家人聊天，和父母诉说内心，可是一开门，映入眼帘的画面是那么的和谐，爸爸妈妈都在拿着手机玩，谁也不会打扰谁，有时家里的气氛比单位还安静，有时各种嘈杂声从手机传出，好不热闹。拖着疲惫的身体，一声问候中，坐到电脑前，打开电脑，看看手机，沉浸其中。多少次想和爸妈说，家里能不能其乐融融的吃饭聊天，可是话到嘴边，总会打退堂鼓，甚至有时厌倦了，想发脾气，可是看到父母的满头白发，又选择默默忍受，可是，网络让我感受不到家的温暖，网络里一切是冰冷的。面对着便捷的生活，多少次想回家不动手机电脑，去贴近自然，可是听到熟悉的铃声，就忍不住低着头。这种熟悉的生活，我想我受够了，可是依赖性让我无法摆脱。1840年鸦片战争以来，中国人民备受磨难，终于在百年后1949年站起来了，如今，还不到百年，中国人民已经被手机压低了肩膀，一个个垂着头， 这画面可能是最和谐的吧!低头族，不知是谁创造的词语，可是如今大家以之为豪。而且这支队伍越发庞大，不知何时这种现象会逐渐消失，我很期待。其实，网络不是我们的全部，网络是促进社会的，而不是与社会脱轨的，更不是我们和亲人朋友友谊曾进的屏障，更何况网络是双刃剑，有可能扭曲和误导我们的人生价值观，愿大家多陪陪家人朋友，少一点沉迷网络，有时间多去领略大自然的鬼斧神工，你会发现从网络了解的东西只是冰山一角!'
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
         console.log(key, keyPath);
       },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      PersonalSpace(){
        console.log("个人空间");
        var username = localStorage.getItem('ms_username');
        console.log(username);
        if (!username || username == undefined || username == "") {
            this.$router.push('/login');
        }else {
            this.$router.push('/personal-space');
        }
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
    overflow: auto;
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
