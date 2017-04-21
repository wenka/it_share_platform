<template>
  <el-row>
      <el-card>
        <Row>
          <Col :xs="24" :sm="8" :md="6" :lg="4">
            <div class="author">
              <img src="../../../static/img/img.jpg" class="image">
              <div class="author-content">
                <span class="el-icon-star-on"> 作者</span>
                <div class="author-name">
                  <Icon type="ios-person" size="20" color="#00cc66"></Icon>  {{acticle.articleAuthor}}
                </div>
              </div>
            </div>
          </Col>
          <Col :xs="24" :sm="16" :md="18" :lg="20">
            <div class="article">
              <div class="title"><h3 @click="viewMore">{{acticle.articleTitle}}</h3></div>
              <p class="main-content">
                {{acticle.articleContent}}
              </p>
              <div class="acticle-bottom">
                <!-- <time>{{ currentDate }}</time> -->
                <el-button class="button" :plain="true" type="info" size="mini" @click="viewMore()"><span class="el-icon-more"> 更多</span></el-button>
              </div>
            </div>
          </Col>
        </Row>
      </el-card>

  </el-row>
</template>

<script>
export default {
  data() {
    return {
      acticle: {
        currentDate: new Date(),
        articleAuthor: '傻帽哈哈哈哈',
        articleTitle: '文章标题lalalalallalalal啦啦啦啦啦',
        articleContent: '午后的阳光，刺眼而又绚丽，恣意的照在身上，让人感到舒服和自然，拿一把躺椅，懒洋洋的倒在上面，是那么的和谐。徐徐的微风吹来，纷纷芳香传来，沐浴其中，更是心旷神怡。不知过来多久，一阵刺耳的铃声传来，将我从梦中带回现实，睁开眼睛，阳光已经成了夕阳，让人有了一股忧伤感，也许这就是“夕阳无限好，只是近黄昏”的完美解释吧?惬意的生活总是短暂的，忙碌才是正轨。迈着沉重的步伐，拖着躺椅，回到工作的环境，一切还是那么的熟悉，除了安静就只有压抑了，只有窗边的几盆花有活着的样子，但是一个个耷拉着头，似乎也在做最后的挣扎。看着眼前的一切，不知道为何，总感觉度日如年。不知多少次幻想回到家，和家人聊天，和父母诉说内心，可是一开门，映入眼帘的画面是那么的和谐，爸爸妈妈都在拿着手机玩，谁也不会打扰谁，有时家里的气氛比单位还安静，有时各种嘈杂声从手机传出，好不热闹。拖着疲惫的身体，一声问候中，坐到电脑前，打开电脑，看看手机，沉浸其中。多少次想和爸妈说，家里能不能其乐融融的吃饭聊天，可是话到嘴边，总会打退堂鼓，甚至有时厌倦了，想发脾气，可是看到父母的满头白发，又选择默默忍受，可是，网络让我感受不到家的温暖，网络里一切是冰冷的。面对着便捷的生活，多少次想回家不动手机电脑，去贴近自然，可是听到熟悉的铃声，就忍不住低着头。这种熟悉的生活，我想我受够了，可是依赖性让我无法摆脱。1840年鸦片战争以来，中国人民备受磨难，终于在百年后1949年站起来了，如今，还不到百年，中国人民已经被手机压低了肩膀，一个个垂着头， 这画面可能是最和谐的吧!低头族，不知是谁创造的词语，可是如今大家以之为豪。而且这支队伍越发庞大，不知何时这种现象会逐渐消失，我很期待。其实，网络不是我们的全部，网络是促进社会的，而不是与社会脱轨的，更不是我们和亲人朋友友谊曾进的屏障，更何况网络是双刃剑，有可能扭曲和误导我们的人生价值观，愿大家多陪陪家人朋友，少一点沉迷网络，有时间多去领略大自然的鬼斧神工，你会发现从网络了解的东西只是冰山一角!'
      }
    };
  },
  methods: {
    viewMore(){
      const self = this;
      console.log("查看更多");
      localStorage.setItem('acticle_author',self.acticle.acticleAuthor);
      localStorage.setItem('acticle_title',self.acticle.articleTitle);
      localStorage.setItem('acticle_content',self.acticle.articleContent);
      this.$router.push('/article-info');
    }
  }
}
</script>


<style>
  .button {
    float: right;
    margin-bottom: 0px;
    margin-right: 10px;
  }

  .acticle-bottom {
    margin-bottom: 0px;
    padding-bottom: 30px;
    width: 100%;
  }

  .main-content {
    height: 140px;
    white-space:normal;
    overflow:hidden;
    text-overflow:ellipsis;
    text-indent: 20px;
    letter-spacing: 5px;
    line-height: 20px;
  }
  .title {
    width: 100%;
    top: 2xp;
    padding: 5px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
  }

  .title:hover {
    font-size: 20px;
    border-width: 1px;
    border-color: #13CE66;
    border-radius: 3px;
    border-style: dashed;
    cursor:pointer;
    transition: all 0.7s linear;
  }

  .article {
    padding: 10px;
    float: right;
    width:auto;
    height: auto;
    background-color: #f5f7f9;
  }
  .author-name {
    padding-top: 10px;
    width: 100%;
    word-break:keep-all;
    white-space:normal;
    overflow:hidden;
    text-overflow:ellipsis;
    text-align-last: center;
    text-align: center;
    margin: auto;
    height: 100%;
  }
  .author-content {
    text-align: center;
    margin: auto;
    height: 100%;
    padding-top: 20px;
    font-size: 15px;
    font-weight: bold;
  }
  .author {
    width: 100%;
    display: block;
    float: left;
    align: center;
    text-align: center;
    height: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    max-width: 250px;
    border-radius: 50%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .el-card {
    height: auto;
    width: 45%;
    min-width: 250px;
    padding: 10px;
    margin: 10px;
    float: left;
  }
</style>
