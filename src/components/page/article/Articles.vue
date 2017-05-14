<!-- 文章列表 -->
<template>
  <div  class="wraper" @scroll="onScroll($event)">
    <!-- <el-row @scroll="onScroll($event)"> -->
          <!-- <el-card v-for="(o, index) in 10" :offset="index > 0 ? 10 : 0"> -->
          <el-card v-for="item in postItems">
            <Row>
              <Col :xs="24" :sm="8" :md="6" :lg="4">
                <div class="author">
                  <img src="../../../../static/img/img.jpg" class="image">
                  <div class="author-content">
                    <span class="el-icon-star-on"> 作者</span>
                    <div class="author-name">
                      <Icon type="ios-person" size="20" color="#00cc66"></Icon>  
                      <p class="author-name-text">{{item.author}}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col :xs="24" :sm="16" :md="18" :lg="20">
                <div class="article">
                  <div class="title"><h3 @click="viewMore(item.id)">{{item.title}}</h3></div>
                  <div class="main-content" >
                    <p v-html="item.content"></p>
                  </div>
                  <div class="acticle-bottom">
                    <time>{{ item.createTime }}</time>
                    <el-button class="button" :plain="true" type="info" size="mini" @click="viewMore(item.id)"><span class="el-icon-more"> 更多</span></el-button>
                  </div>
                </div>
              </Col>
            </Row>
          </el-card>

      <!-- </el-row> -->
  </div>
  

</template>

<script>
export default {
  props:[
    "postItems"
  ],
  data() {
    return {
      pgSize: 10,
      pgNo: 1,
      rawItems: [],
      items: []
    };
  },
  created: function(){
    // this.rawItems.push(this.postItems);
    // this.changePgItems();
  },
  methods: {
    viewMore(id){
      console.log(id);
      let args = {
        name: 'othersSpace',
        params: {
          postId: id
        }
      }
      this.$router.push(args);
    },
    onScroll(event){
      console.log("滚动");
      var offsetHeight = event.currentTarget.offsetHeight;
      var scrollHeight = event.target.scrollHeight;
      var scrollTop = event.target.scrollTop;
      var scrollBottom = offsetHeight + scrollTop;
      // console.log("offsetHeight=" + offsetHeight + "\n" + "scrollHeight=" + scrollHeight + "\n" + "scrollTop=" + scrollTop + "\n" + "scrollBottom=" + scrollBottom);
      if(scrollTop===0){
        if(this.pgNo===1){
          return;
        }
        this.pgNo--;
        this.changePgItems();
        event.target.scrollTop=offsetHeight-1;
      };
      if(scrollBottom===scrollHeight || scrollBottom===scrollHeight+2){
        console.log("---" + Math.ceil(this.rawItems.length));
        if(this.pgNo==Math.ceil(this.rawItems.length/this.pgSize)){
          return
        }
        this.pgNo++;
        console.log(this.pgNo);
        this.changePgItems();
        // event.target.scrollTop=1;
      }
    },
    changePgItems(){
      console.log("滚动翻页");
      var start = (this.pgNo-1) * this.pgSize;
      var _items = this.rawItems.slice(0,this.pgSize+((this.pgNo-1)*this.pgSize));
      this.items = _items;
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
    width: 100%;
  }
  .title {
    width: 100%;
    top: 2xp;
    padding: 5px;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    overflow:hidden;
    text-overflow:ellipsis;
    border-width: 1px;
    border-color: #13CE66;
    border-radius: 50px;
    border-style: dashed;
  }

  .title:hover {
    cursor:pointer;
    transition: all 0.7s linear;
    border-color: #20A0FF;
    border-style: double;
    background-color: #C0CCDA;
  }

  .article {
    padding: 10px;
    float: right;
    width: 100%;
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
    /*border-radius: 50px;*/
  }

  .author-name-text:hover {
    /*font-size: 20px;*/
   /* border-width: 1px;
    border-color: #13CE66;
    border-style: dashed;*/
    cursor:pointer;
    transition: all 0.7s linear;
    border-radius: 5px;
    /*border-color: #20A0FF;
    border-style: double;*/
    background-color: #C0CCDA;
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
    width: 80%;
    height: 100%;
    max-width: 250px;
    border-radius: 50%;
    margin: auto;
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
    /*padding: 10px;*/
    margin: 10px;
    float: left;
  }
  .wraper{
    /*border:1px solid red;*/
    width: 100%;
    height:100vh;
    overflow-y: auto;
    box-sizing: border-box;
  }
  /*.content {
    overflow-y: hidden;
  }*/
</style>
