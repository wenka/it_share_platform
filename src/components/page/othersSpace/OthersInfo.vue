<template>
	<div class="personal-main">
		<div class="personal-info">
			<div class="crumbs">
		        <el-breadcrumb separator="/">
		                <el-button  class="fa fa-tags" type="text">&nbsp;&nbsp;简单介绍</el-button>
		        </el-breadcrumb>
		    </div>
			<Row>
				<Col :xs="0" :sm="4" :md="4" :lg="4">
					<div class="personal-avatar">
						<img src="../../../../static/img/img.jpg" class="header-img">
					</div>		
					<el-button class="foucsBtn" type="foucsBtn.type" @click="foucsBtnClick(user.id)" size="mini">&nbsp;&nbsp;{{foucsBtn.text}}</el-button>
				</Col>
				<Col :xs="24" :sm="20" :md="20" :lg="20">
					<div class="personal-content">
						<Form class="info-content-form">
							<Form-item>
								<Input type="text" v-model="user.name" readonly class="input-form">
									<span slot="prepend">用户名：</span>
								</Input>
							</Form-item>
							<Form-item>
								<Input type="text" v-model="user.tel" readonly class="input-form">
									<span slot="prepend">电&nbsp;&nbsp;&nbsp;&nbsp;话：</span>
								</Input>
							</Form-item>
							<Form-item label="介    绍：">
								<Input type="textarea" v-model="user.remark" readonly class="input-form">
								</Input>
							</Form-item>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
		<div class="personal-category">
			<div class="crumbs">
		        <el-breadcrumb separator="/">
		            <el-button class="fa fa-tags" type="text">&nbsp;&nbsp;擅长领域</el-button>
		        </el-breadcrumb>
		        <div class="category-list">
		        	<Tag v-for="item in categoryItems" type="border" color="green">
						{{ item.name }}
					</Tag>
		        </div>
		    </div>
		</div>
		<div class="personal-charts">
			<div class="crumbs">
		        <el-breadcrumb separator="/">
		            <el-button class="fa fa-tags" type="text">&nbsp;&nbsp;发表统计</el-button>
		        </el-breadcrumb>
		        <div class="charts">
		        	<IEcharts :option="pie" ></IEcharts>
		        </div>
		    </div>
		</div>
		<div class="personal-new-activity">
			<div class="crumbs">
		        <el-breadcrumb separator="/">
		            <el-button class="fa fa-tags" type="text">&nbsp;&nbsp;最新动态</el-button>
		        </el-breadcrumb>
		        <div>
		        	<Table :columns="columns" height="500" :data="postList" border stripe @on-row-click="postInfo"></Table>
		        </div>
		    </div>
		</div>
		<Back-top></Back-top>
	</div>
</template>

<script>
	import IEcharts from 'vue-echarts-v3';
	export default{
		data(){
			return {
				getUserUrl: 'it/user/',
				getCategoryUrl: 'it/category/getByUser',
				getPostListSizeUrl: 'it/post/getListSize',
				getPostListUrl: 'it/post/getList',
				userId: '',
				foucsBtn: {
					type: "success",
					text: "加关注"
				},
				user: {
				},
				categoryItems: {
				},
				columns: [
					{
						title: "标题",
						key: "title",
						align: "center",
						ellipsis: true
					},
					{
						title: "类别",
						key: "categoryName",
						align: "center"
					},
					{
						title: "内容",
						key: "content",
						align: "center",
						ellipsis: true
					},
					{
						title: "文章类型",
						key: "postType",
						align: "center"
					},
					{
						title: "时间",
						key: "createTime",
						align: "center"
					}
				],
				postList: [
				],
				pie: {
	                color:["#20a0ff","#13CE66","#F7BA2A"],
	                title : {
	                    text: '发表量',
	                    x:'center'
	                },
	                tooltip : {
	                    trigger: 'item',
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
	                legend: {
	                    orient: 'vertical',
	                    left: 'left',
	                    data: ["博客", "头条", "提问"]
	                },
	                series : [
	                    {
	                        name: '销量',
	                        type: 'pie',
	                        radius : '50%',
	                        center: ['50%', '50%'],
	                        data:[
	                            
	                        ],
	                        itemStyle: {
	                            emphasis: {
	                                shadowBlur: 10,
	                                shadowOffsetX: 0,
	                                shadowColor: 'rgba(0, 0, 0, 0.5)'
	                            }
	                        }
	                    }
	                ]
	            }
			}
		},
		components: {
			IEcharts
		},
		created() {
			this.init();
		},
		methods: {
			//关注按钮
			init(){
				this.userId = this.$route.params.userId;
				// console.log(this.$route.params.userId);
				console.log(this.userId);
				// if (this.userId == undefined) {
				// 	this.$router
				// }
				this.getUser(this.userId);
				this.getCategoryList(this.userId);
				this.getPostListSize(this.userId,"博客");
		        this.getPostListSize(this.userId,"头条");
		        this.getPostListSize(this.userId,"提问");
		        this.getPostList(this.userId);
			},
			foucsBtnClick(userId){
				console.log(userId);
				if (this.foucsBtn.text == "加关注") {
					this.foucsBtn.text = "取消关注";
					this.$Message.success("关注成功");
				}else{
					this.foucsBtn.text = "加关注";
					this.$Message.success("取消关注成功");
				}
			},
			//查看多
			postInfo(row){
				console.log(row);
			},
			//查询用户
			getUser(userId){
				console.log(userId);
				this.$http.get(this.getUserUrl + userId).then(
					response => {
						this.user = response.body;
						console.log(this.user);
					},
					response => {
						let errorMsg = response.body.developerMessage;
			            this.$message.error(errorMsg);
			            if (errorMsg.indexOf("未认证") > -1) {
			            	this.$router.push("/login");
			            }
					}
				);
			},
			// 获取类别集合
			getCategoryList(userId){
				this.$http.get(this.getCategoryUrl,{params:{userId:userId}}).then(
					response => {
						this.categoryItems = response.body;
						console.log(this.categoryItems);
					},
					response => {
						let errorMsg = response.body.developerMessage;
			            this.$message.error(errorMsg);
			            if (errorMsg.indexOf("未认证") > -1) {
			            	this.$router.push("/login");
			            }
					}
				);
			},
			//获取发表物数量
			getPostListSize(userId,postType){
				console.log(userId + "<-->" + postType);
				let args = {
					userId: userId,
					postType: postType,
					states: "1"
				};
				this.$http.get(this.getPostListSizeUrl,{params:args}).then(
		          	response => {
		            	if (postType == "博客") {
		             		this.pie.series[0].data.push({value:response.body,name:'博客'});
		            	}else if(postType == "头条"){
							this.pie.series[0].data.push({value:response.body,name:'头条'});
		            	}else if(postType == "提问"){
							this.pie.series[0].data.push({value:response.body,name:'提问'});
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
			},
			//获取文章集合
			getPostList(userId){
				let args = {
		            param: "",
		            userId: userId,
		            states: "1"
		        }
		        this.$http.get(this.getPostListUrl,{params:args}).then(
		          response => {
		              this.postList = response.body;
		              console.log(this.postList);
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
	.category-list {
		text-align: center;
	}
	.table-id{
		display: none;
	}
	.input-form {
		/*margin: 5px;*/
	}
	.info-content-form {
		margin: 10px;
		width: 100%;
		text-align: center;
		/*border-color: #CCCCFF;
		border-style: solid;
		border-radius: 50px;
		border-width: 1px;*/
		float: left;
	}
	.personal-content {
		width: 90%;
	}
	.intr-span {
		background-color: #CCCCCC;
		border-width: 0.5px;
		border-style: solid;
		border-color: #CCCCCC;
		border-radius: 10px;
	}
	.header-img {
	    width: 100px;
	    height: 100%;
	    border-radius: 50%;
	    margin: 0 auto;
	}
	.foucsBtn {
		margin: 5px;
		width: 90%;
	}
	.personal-avatar {
		width: 90%;
		text-align: center;
		align-content: center;
	}
	.personal-charts,.charts{
		min-height: 200px;
		height: 500px;
		width: 100%;
	}
	.personal-info,.personal-category,.personal-new-activity,.personal-charts{
		width: 100%;
		height: auto;
		/*background-color: red;*/
		border-color: #CCCC99;
		border-style: solid;
		border-radius: 10px;
		border-width: 1px;
		/*text-align: center;*/
	}
	.personal-main {
		margin: 0 auto;
		max-width: 980px;
	}
	.fa {
		margin: 5px;
	}
</style>