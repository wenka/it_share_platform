<!-- 单一文章详情页 -->
<template>
    <div class="info">
        <!-- 文章内容开始 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 文章详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>文章内容</h3>
            <div class="visit-number"><el-button type="primary" >访客量：100</el-button></div>
            <article style="text-indent: 35px;">
                <h1>{{acticle.title}}</h1>
                <h2>文章副标题</h2>
                <p>{{acticle.content}}</p>
                <div class="acticle-share">
                    <el-button type="primary" icon="share" size="mini" class="share-button">  分享</el-button>
                </div>
            </article>
        </div>
        <!-- 文章内容结束 -->
        <!--  标签开始 -->
        <div class="ms-doc">
          <h4>标签</h4>
          <article>
            <div class="acticle-tags">
              <el-tag  v-for="tag in tags" class="tag" type="primary">{{tag.name}}</el-tag >
            </div>
          </article>
        </div>
        <!-- 标签结束 -->
        <!-- 打赏开始 -->
        <div class="ms-doc ms-pay">
          <h4>打赏</h4>
          <div class="pay-button">
              <p>
                坚持原创，您的鼓励是我前进的动力！
              </p>
              <el-button type="danger" @click="pay">赏</el-button>
          </div>
          <div class="pay-image" v-show="active">
            <div class="pay-weixin">
              <img src="../../../../static/img/weixin.png" alt="无二维码" width="200px"/>
              <p>
                微信支付
              </p>
            </div>
            <div class="pay-zhifubao">
              <img src="../../../../static/img/zhifubao.png"  alt="无二维码" width="200px"/>
              <p>
                支付宝支付
              </p>
            </div>
          </div>
        </div>
        <!-- 打赏结束 -->
        <!-- 评论开始 -->
        <div class="ms-doc">
            <h4>所有评论</h4>
            <article>
              <div class="comments">
                <div class="comments-tip">
                    <img src="../../../../static/img/img.jpg" class="image">
                    <div class="comments-author">
                      AA
                    </div>
                </div>
                <div class="comments-area">
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" :disabled="true" value="写的真好">
                  </el-input>
                </div>
                <div>
                  <el-button type="success" size="mini" class="reply"><Icon type="reply"></Icon> 回复</el-button>
                </div>
              </div>
              <div class="comments">
                <div class="comments-tip">
                    <img src="../../../../static/img/img.jpg" class="image">
                    <div class="comments-author">
                      BB
                    </div>
                </div>
                <div class="comments-area">
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" :disabled="true" value="写的真好2，点赞"></el-input>
                </div>
                <div>
                  <el-button type="success" size="mini" class="reply"><Icon type="reply"></Icon> 回复</el-button>
                </div>
              </div>

              <h5>撰写评论：</h5>

              <div class="comments">
                <div class="comments-tip">
                    <img src="../../../../static/img/img.jpg" class="image">
                    <div class="comments-author">
                      我
                    </div>
                </div>
                <div class="comments-area">
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入评论内容" ></el-input>
                </div>
                <div>
                  <el-button type="success" size="mini" class="send" @click="send"><Icon type="paper-airplane"></Icon> 发送</el-button>
                </div>
              </div>
            </article>
        </div>
        <!-- 评论结束 -->
    </div>
</template>

<script>
    export default {
        data(){
            return {
              acticle:{
                id: '',
                content: '',
                title: '',
                author: ''
              },
              active: false,
              tags: [
                 { name: '标签一', type: '' },
                 { name: '标签二', type: 'gray' },
                 { name: '标签三', type: 'primary' },
                 { name: '标签四', type: 'success' },
                 { name: '标签五', type: 'warning' },
                 { name: '标签六', type: 'danger' },
                 { name: '标签七', type: 'warning' },
                 { name: '标签八', type: 'warning' },
                 { name: '标签九', type: 'warning' },
                 { name: '标签十', type: 'warning' },
                 { name: '标签十一', type: 'warning' },
                 { name: '标签十二', type: 'warning' },
                 { name: '标签十三', type: 'warning' },
                 { name: '标签十四', type: 'warning' },
                 { name: '标签十五', type: 'warning' },
                 { name: '标签十六', type: 'warning' }
              ]
            }
        },
        created: function(){
          this.acticle.id = this.$route.params.userId;
          console.log(this.acticle);
        },
        methods:{
          pay(){
            if (this.active) {
              this.active = false;
            }else {
              this.active = true;
            }
          },
          send(){
            this.$message({
               message: '评论成功',
               type: 'success'
             });
          }
        }
    }
</script>

<style scoped>
    .info {
      margin: auto;
    }

    .tag {
        margin: 5px;
        border-radius: 8px;
    }

    .acticle-tags {
      width: 100%;
      text-align: center;
      line-height: 35px;
    }

    .share-button {
      float: right;
      background-color: #F7BA2A;
      width: 10%;
      height: 100%;
    }

    .acticle-share {
      width: 100%;
      height: auto;
      margin-bottom: 30px;
    }

    .pay-image {
      text-align: center;
      width: 80%;
      margin: auto;
      padding: 5px;
      height: 250px;;
    }

    .pay-weixin :hover{
      color: #13CE66;
    }

    .pay-zhifubao :hover{
      color: #13CE66;
    }

    .pay-weixin {
      float: left;
      width: 50%;
      margin: auto;
    }

    .pay-zhifubao {
      width: 50%;
      float: left;
      margin: auto;
    }

    .pay-button {
      width: 100%;
      text-align: center;
      font-style: italic;
      padding: 5px;
    }
    .ms-pay {
      height: auto;
      /*text-align: center;*/
    }

    .comments-author {
        font-size: 10px;
        margin-top: 5px;
        word-break:keep-all;
        white-space:normal;
        overflow:hidden;
        text-overflow:ellipsis;
        height: 20px;
        text-align: center;
    }

    .image {
      width: 60%;
      height: 60%;;
      border-radius: 50%;
      display: block;
      margin: auto;
    }

    .comments-tip {
      width: 10%;
      float: left;
    }

    .comments-area {
      width: 84%;
      float: left;
    }

    .reply {
      float: right;
      margin: 5px;
    }

    .send {
      float: right;
      margin: auto;
      padding-bottom: 5px;
    }
    .comments {
      width: 90%;
      height: 80px;
      margin: 30px;
    }

    .visit-number {
        float: right;
        margin: 5px;
        color: #13CE66;
    }

    .ms-doc{
        width:100%;
        /*max-width: 980px;*/
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    h4 {
      padding: 9px 10px 10px;
      margin: 0;
      font-size: 14px;
      line-height: 17px;
      background-color: #D3DCE6;
      border: 1px solid #d8d8d8;
      border-bottom: 0;
      border-radius: 3px 3px 0 0;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
