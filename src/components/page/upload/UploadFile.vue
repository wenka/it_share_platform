<template>
  <div>
  		<div class="crumbs">
          	<el-breadcrumb separator="/">
              	<el-breadcrumb-item>
               	   <el-button class="fa fa-cloud-upload" type="text" readobly>&nbsp;&nbsp;上传{{fileType}}</el-button>
             	</el-breadcrumb-item>
          	</el-breadcrumb>
      	</div>
      	<div>
      		<Form>
                <Form-item label="类别：" :model="attachmentBag">
                	<br>
                    <label>选择类别：&nbsp;</label>
                    <Button v-for="item in categoryItems" @click="addCategoryToForm(item)" icon="pricetag"  size="small">
                        {{ item.name }}
                    </Button>
                    <el-button type="success" icon="edit" size="mini" @click="addCategory()">添加类别</el-button>
                    <Input v-model="attachmentBag.category.id" v-show="false" disabled/>
                    <Input v-model="attachmentBag.category.name" readonly/>
                </Form-item>
                <Form-item label="备注：" >
                	<Input v-model="attachmentBag.remark" type="textarea" :rows="4" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
				    <Upload
				        action="/it/upload" :on-error="uploadError" :on-success="uploadSuccess">
				        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
				    </Upload>
                </Form-item>
                <Form-item>
                	<el-button class="editor-btn" type="primary" @click="submit()" v-show="submitbtn">提交</el-button>
                </Form-item>
      		</Form>
      	</div>
      	<Modal
          v-model="editCategoryView"
          title="编辑类别" scrollable cancel-text="">
          <v-edit-category :category-type="categoryType" v-on:category-changes="listenCategoryChange"></v-edit-category>
        </Modal>
  </div>
</template>

<script>
	import vEditCategory from '../personalSpace/EditCategory.vue';
	export default {

		data(){
			return {
				saveAttachmentBagUrl: 'it/attachmentBag/',
				getCategoryUrl: 'it/category/getByUser',
				categoryType: "附件类别",
				editCategoryView: false,
				submitbtn: "true",
				fileType: "",
				tagItems: [],
                inputVisible: false,
                inputValue: "",
                categoryItems: [],
                attachmentBag: {
                	category: {
	                	id: "",
	                	name: ""
	                },
	                attachment: {
	                	id: "0"
	                },
	                remark: "",
	                fileType: "",
	                state: 1
                }
			}
		},
		created() {
			this.init();
		},
		components: {
           vEditCategory
        },
		methods: {
			//保存
			submit() {
				console.log(this.attachmentBag);
				if (this.attachmentBag.category.id == "") {
					this.$message.error("请选择类别");
				}else{
					this.attachmentBag.fileType = this.fileType;
					this.$http.post(this.saveAttachmentBagUrl,JSON.stringify(this.attachmentBag)).then(
						response => {
                                this.$Message.success('提交成功!');
                                // this.$route.go(0);
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
				}
			},
			//获取类别集合
			getCateortItems(){
				this.$http.get(this.getCategoryUrl,{params:{categoryType:this.categoryType}}).then(
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
			addCategory(){
                this.editCategoryView = true;
            },
			 //监听 categoryItems 变化
            listenCategoryChange(categoryItems){
                this.categoryItems = categoryItems;
                 console.log("--- 类别改变 ---");
            },
            //将选择的类别添加到表单
            addCategoryToForm(category){
                console.log(category);
                this.attachmentBag.category.id = category.id;
                this.attachmentBag.category.name = category.name;
            },
            uploadSuccess(response,file){
            	console.log(response);
            	console.log(file);
            	this.attachmentBag.attachment = response;
            },
            uploadError(error){
            	this.$message.error(error);
            },
			init(){
				this.fileType = this.$route.params.fileType;
				this.getCateortItems();
			}
		},
		watch: {
		     // 如果路由有变化，会再次执行该方法
		     "$route": "init"
	    }
	}	

</script>
