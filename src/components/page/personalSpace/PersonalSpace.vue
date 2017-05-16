<!-- 
	个人空间首页
	@author 文卡
 -->
<template>
  <div class="main-personal-info">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <router-link to="/personal-space">
                <el-button class="fa fa-address-card" type="text" @click="flushPage()">&nbsp;&nbsp;我的空间</el-button>
              </router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <Row>
      <Col :xs="0" :sm="10" :md="8" :lg="5">
        <div class="main-left">
          <Card class="left-card">

            <div class="card-title">
                <Button type="ghost" size="small" @click="selfdetails(me.id)">个人资料</Button>
                <el-badge :value='unread'  class="card-msg">
                    <Button size="small" type="text" @click="showDynamic(me.id)"><Icon type="ios-bell-outline" size="26"></Icon></Button>
                </el-badge>
            </div>
             <div style="text-align:center">
                 <img src="../../../../static/img/img.jpg" class="header-img" @click="editAvatar()">
                 <p><h3>{{ me.name }}</h3></p>
             </div>
             <div style="text-align:center">
                  <p>我关注的<Button type="text" style="color:green">{{myFocus}}</Button></p>
                  <p>关注我的<Button type="text" style="color:green">{{myFans}}</Button></p>
             </div>
          </Card>

          <Card class="left-card">
            <div class="card-title">
                <Button type="ghost" size="small" @click="showCategoryView()">文章类别</Button>
            </div>
             <div style="text-align:center">
                <Button v-for="item in categoryItems" @click="clickCategory(item.id)" type="info" style="margin:2px" size="small">{{item.name}}</Button>
             </div>
          </Card>

          <Card class="left-card">
            <div class="card-title">
                <Button type="ghost" size="small" @click="totalChartsView()">统计</Button>
            </div>
             <div style="text-align:center">
                  <p><el-button type="text" @click="lookMorePost('博客')" ><span class="fa fa-list-alt"></span>&nbsp;博客({{ blogCounts }})</el-button></p>
                  <p><el-button type="text" @click="lookMorePost('头条')"><span class="fa fa-newspaper-o"></span>&nbsp;头条({{ headlineCounts }})</el-button></p>
                  <p><el-button type="text" @click="lookMorePost('提问')"><span class="fa fa-question-circle"></span>&nbsp;提问({{ qaCounts }})</el-button></p>
             </div>
          </Card>

           <Card class="left-card">
            <div class="card-title">
                <Button type="ghost" size="small">上传</Button>
            </div>
             <div style="text-align:center">
                  <p><el-button type="text" @click="update('文档')" ><span class="fa fa-list-alt"></span>&nbsp;文档上传</el-button></p>
                  <p><el-button type="text" @click="update('源码')"><span class="fa fa-newspaper-o"></span>&nbsp;源码上传</el-button></p>
             </div>
          </Card>
        </div>
      </Col>

      <Col :xs="24" :sm="14" :md="16" :lg="19">
        <div class="details">
          <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
      </Col>

    </Row>
    <Modal
      v-model="editAvatarView"
      title="修改头像"
      @on-ok="ok"
      @on-cancel="cancel">
      <upload-picture></upload-picture>
    </Modal>
    <Modal
          v-model="editCategoryView"
          title="编辑类别"
          @on-ok="ok"
          @on-cancel="cancel">
          <v-edit-category></v-edit-category>
    </Modal>
  </div>
</template>

<script>
  import uploadPicture from '../upload/UploadPicture.vue';
  import vEditCategory from './EditCategory.vue';
  export default {
    data() {
      return {
        getUnreadUrl: 'it/userDynamic/unread',
      	getRelationCountsUrl: 'it/userFans/listSize',
        getPostListSizeUrl: 'it/post/getListSize', 
        getUrl: 'it/category/getByUser',
        editAvatarView: false,
        editCategoryView: false,
        myFocus: 0, //我关注的
        myFans: 0, //关注我的
        me: {
          id: localStorage.getItem("me-id"),
          name: localStorage.getItem("me-name")
        },
        categoryItems:[],
        blogCounts: 0,
        headlineCounts: 0,
        qaCounts: 0,
        //查询文章列表的参数
        categoryIds: "",
        postType: "",
        unread: 0
      };
    },
    components: {
      uploadPicture,vEditCategory
    },
    created: function(){
      let meId = localStorage.getItem("me-id");
      if (meId) {
          // this.$router.push("/personal-space");
      }else{
          localStorage.setItem("last-router",this.$route.path);
          this.$router.push('/login');
      }
      this.flushPage();
    },
    methods: {
      selfdetails(userId){
        console.log(userId);
        let args = {
          name: 'selfDetails',
          params: {
            userId: userId
          }
        }
        this.$router.push(args);
      },
      editAvatar() {
        console.log("修改头像");
        this.editAvatarView = true;
        console.log(this.editAvatarView);
      },
      ok () {
          this.$Message.info('点击了确定');
      },
      cancel () {
          this.$Message.info('点击了取消');
      },
      //展示类别view
      showCategoryView(){
        // this.editCategoryView = false;
        this.$router.push("/edit-category");
      },
      //获取类别
      getCategoryItmes(){
        this.$http.get(this.getUrl).then(
          response => {
            this.categoryItems = response.body;
            console.log(this.categoryItems);
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
      //刷新页面数据
      flushPage(){
        this.getCategoryItmes();
        //查询统计文章数量
        this.getPostListSize("博客");
        this.getPostListSize("头条");
        this.getPostListSize("提问");
        //查询我的用户关系数量
        this.getRelationCounts("myFans");
        this.getRelationCounts("myFocus");
        this.getUnread();
      },
      getPostListSize(postType){
        console.log(postType);
        let args = {
            param: "",
            postType: postType,
            states: "1"
        }
        this.$http.get(this.getPostListSizeUrl,{params:args}).then(
          response => {
            if (postType == "博客") {
              this.blogCounts = response.body;
              console.log(this.blogCounts);
            }else if(postType == "头条"){
              this.headlineCounts = response.body;
              console.log(this.headlineCounts);
            }else if(postType == "提问"){
              this.qaCounts = response.body;
              console.log(this.qaCounts);
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
      //跳转统计视图
      totalChartsView(){
        console.log("统计视图");
        let args = {
          name: 'totalCharts',
          params: {
            blogCounts: this.blogCounts,
            headlineCounts: this.headlineCounts,
            qaCounts: this.qaCounts
          }
        };
        this.$router.push(args);
      },
      //查询用户关系(数量)
      getRelationCounts(direction){
      	//direction: me 我关注的 focusMe 关注我的
      	console.log(direction);
      	let args = {
      		direction: direction
      	}
      	this.$http.get(this.getRelationCountsUrl,{params:args}).then(
      		response => {
      			if (direction == "myFocus") {
      				this.myFocus = response.body;
      				console.log(this.myFocus);
      			}
      			else if(direction == "myFans"){
      				this.myFans = response.body;
      				console.log(this.myFans);
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
      //根据类型查询
      lookMorePost(postType){
          this.postType = postType;
          this.morePostList();
      },
      //根据所属栏目查询
      clickCategory(categoryIds){
          this.categoryIds = categoryIds;
          console.log(this.categoryIds);
          this.morePostList();
      },
      // postListRouter
      morePostList(){
          let args = {
            name: "timerLineList",
            query: {
              postType:this.postType,
              categoryIds: this.categoryIds
            }
          };
          if (this.postType == "") {
            this.$delete(args.query, 'postType');
          }

          if (this.categoryIds == "") {
            this.$delete(args.query,'categoryIds');
          }

          this.postType = "";
          this.categoryIds = "";
          this.$router.push(args);
      },
      //读取未读消息
      getUnread(){
        this.$http.get(this.getUnreadUrl).then(
          response => {
            this.unread = response.body;
            console.log("未读消息：" + this.unread);
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
      //显示动态
      showDynamic(userId){
        console.log("动态：" + userId);
        let args = {
          name: "userDynamicTable",
          params: {
            userId: userId
          }
        };
        this.$router.push(args);
      }
    }
  }
</script>


<style>

  .card-msg {
    float: right;
  }

  .main-left {
    width: 100%;
  }

  .header-img {
    width: 100px;
    height: 100%;
    border-radius: 50%;
  }

  .header-img:hover {
    border: green;
    border-width: 1px;
    border-style:outset;
    cursor: pointer;
  }

  .main-personal-info {
    width: 100%;
    margin: auto;
    overflow-y: hidden;
  }

  .left-card {
    width:90%;
    margin: 10px;
  }

  .content {
  }
</style>
