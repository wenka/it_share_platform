<template>
	<div class="pub-article-list-main">
		<Row>
			<Col :xs="24" :sm="4" :md="4" :lg="4">
		        <Card class="left-card">
		        	<div class="card-title">
		            	<Button type="ghost" size="small">搜素</Button>
		            </div>
		            <div style="text-align:center">
		            	<div class="serach">
				            <input type="text" v-model="param" @keyup.13="search($event)" v-show="true" class="search-input"/>
				            <span class="el-icon-search search-span" @click="search(13)"></span>
				          </span>
				        </div>
		            </div>
		        </Card>
		        <Card class="left-card">
		        	<div class="card-title">
		            	<Button type="ghost" size="small" @click="clickCategory('')">文章类别</Button>
		            </div>
		            <div style="text-align:center">
		            	<Button v-for="item in categoryItems" type="info" style="margin:2px;" size="small" @click="clickCategory(item.id)">{{item.name}}</Button>
		            </div>
		        </Card>

		        <Card class="left-card">
	              <div class="card-title">
	                <Button type="ghost" size="small">&nbsp;&nbsp;热门作者</Button>
	                <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
	              </div>
	              <div v-for="item in authorItems" class="text item">
	                <a @click="userInfor(item.ID)">{{ item.name_ }}</a>
	              </div>
	            </Card>
			</Col>	
			<Col :xs="24" :sm="20" :md="20" :lg="20">
				<div class="pub-list-right">
					<div class="tab-content">
						<Row>
				          <Col :xs="0" :sm="24" :md="24" :lg="24">
				            <el-menu unique-opened  class="el-menu-demo" mode="horizontal" @select="handleSelect" :default-active="postType">
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
				            <el-menu :default-active="postType" unique-opened class="el-menu-vertical" @select="handleSelect" @open="handleOpen" @close="handleClose">
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
					<v-article :post-items="postItems"></v-article>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import vArticle from '../article/Articles.vue';
	export default{
		data(){
			return {
				getPopularAuthorUrl: 'it/pub/popularAuthor',
				getCategoryListUrl: 'it/pub/categoryList',
				getPostListUrl: 'it/pub/getPostList',
				param: "",
				postType: "",
				categoryIds: "",
				categoryItems:[],
				postItems:[],
				authorItems: []
			}
		},
		components: {
			vArticle
		},
		created() {
			this.postType = this.$route.params.postType;
			this.getCategoryList();
			this.quertPostList();
			this.getPopularAuthor();
		},
		methods: {
			handleSelect(key, keyPath){
				this.postType = key;
				this.quertPostList();
			},
			handleOpen(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	handleClose(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
			search(ev) {
              	if(ev.keyCode == 13 || ev == 13){
	                this.$message({
	                  	message: '恭喜你，搜索' + this.param + '成功',
	                  	type: 'success'
	                });
	                this.quertPostList();
              	}
            },
            getCategoryList(){
            	this.$http.get(this.getCategoryListUrl).then(
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
            //点击类别事件
            clickCategory(categoryIds){
            	this.categoryIds = categoryIds;
            	this.quertPostList();
            },
            quertPostList(){
            	let args = {
            		param: this.param,
					postType: this.postType,
					categoryIds: this.categoryIds
            	};
            	this.$http.get(this.getPostListUrl,{params:args}).then(
            		response => {
            			this.postItems = response.body;
            			console.log(this.postItems);
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
            changePostType(postType){
            	this.postType = postType;
            	this.quertPostList();
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
		    }
		}
	}
</script>

<style>
	 .tab-content {
	    width: 100%;
	    max-width: 521px;
	    margin: auto;
	 }
	.search-input {
      border-width: 0px;
      background-color: #E5E9F2;
      /*max-width: 50%;*/
      max-height: 20px;
      margin: auto;
      /*padding: 10px;*/
      border-radius: 50px;
      width: 85%;
    }

    input {
      border-radius: 50px;
    }

    .serach-span {
      border-width: 1px;
      border-color: #D3DCE6;
      border-style: dashed;
      width: 10%;
      /*float: left;*/
      /*height: 50%;*/
    }

    .serach {
      width: 90%;
      /*float: left;*/
      max-height: 70px;
      margin: 0 auto;

    }

	.card-title {
		margin: 5px;
	}
	.left-card {
	    width:90%;
	    margin: 10px;
	    border-radius: 25px;
	  }
	.pub-list-right {
		/*background-color: blue;*/
		width: 90%;
		height: auto;
		margin: 0 auto;
	}
	.pub-list-left {
		/*background-color: red;*/
		width: 90%;
		height: auto;
		margin: 0 auto;
	}
	.pub-article-list-main {
		/*text-align: center;*/
		margin: 0 auto;
		width: 100%;
	}
</style>