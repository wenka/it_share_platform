<template>
	<div>
	    <!-- <div class="crumbs">
	        <el-breadcrumb separator="/">
	            <el-breadcrumb-item>
	                <el-button class="fa fa-address-card" type="text">&nbsp;&nbsp;详情</el-button>
	            </el-breadcrumb-item>
	        </el-breadcrumb>
	    </div> -->

		<Row>
			<Col :xs="24" :sm="14" :md="16" :lg="19">
				<div class="left-content">
					<!-- <transition name="move" mode="out-in"><router-view></router-view></transition> -->
					<v-articles-info :post="post"></v-articles-info>
				</div>
			</Col>
			<Col :xs="0" :sm="10" :md="8" :lg="5">
				<div class="right-personal">
					<Card class="right-card">
			            <div class="card-title">
			                <Button type="ghost" size="small" @click="selfAuthor(post.creatorId)">作者</Button>
			            </div>

			             <div style="text-align:center">
			                 <img src="../../../../static/img/img.jpg" class="header-img">
			                 <p><h3>{{ post.creatorName }}</h3></p>

			             </div>
			             <div style="text-align:center">
			                  <!-- <p>我关注的<Button type="text" style="color:green">{{myFocus}}</Button></p> -->
			                  <!-- <p>关注我的<Button type="text" style="color:green">{{myFans}}</Button></p> -->
			             </div>
			          </Card>
				</div>
			</Col>
		</Row>		
	</div>
</template>

<script>
	import vArticlesInfo from '../article/Articles-info.vue'
	export default{
		data(){
			return {
				getPostInfoUrl: 'it/post/',
				postId: "",
				me: {
					id: "1",
					name: "wenka"
				},
				post: {

				}
			}
		},
		created() {
			let meId = localStorage.getItem("me-id");
		    if (meId) {
		        // this.$router.push("/personal-space");
		    }else{
		        localStorage.setItem("last-router",this.$route.path);
		        this.$router.push('/login');
		    }
			this.postId = this.$route.params.postId;
			// console.log(this.postId);
			this.getPost(this.postId);

		},
		methods: {
			//通过id读取post
         	getPost(postId){
	            console.log(postId);
	            this.$http.get(this.getPostInfoUrl + postId).then(
		            response => {
		            	this.post = response.body;
		            	console.log(this.post);
		            },
		            response => {
		            	let errorMsg = response.body.developerMessage;
		                this.$message.error(errorMsg);
		                if (errorMsg.indexOf("未认证") > -1) {
		                	localStorage.removeItem('me-id');
                        	localStorage.removeItem('me-name');
		                    this.$router.push("/login");
		                }
		            }
	            );
	        },
	        // 查看作者信息
	        selfAuthor(userId){
	        	let args = {
	        		name: "othersInfo",
	        		params:{
	        			userId: userId
	        		}
	        	};
	        	this.$router.push(args);
	        },
	        //检查post是否为评论
	        checkPost(){
	        	if (this.post.parentId == undefined) {

	        	}else{
	        		this.getPost(this.post.parentId);
	        	}
	        }
		},
		components: {
			vArticlesInfo
		},
		watch: {
			"post":"checkPost"
		}
	}
</script>

<style>
	.left-content {
		text-align: center;
		width: 98%;
		height: auto;
	}

	.right-personal {
		width: 100%;
		height: 10px;
	}

	.header-img {
	    width: 100px;
	    height: 100%;
	    border-radius: 50%;
	}

	.right-car {
	    width:90%;
	    margin: 10px;
	}
</style>