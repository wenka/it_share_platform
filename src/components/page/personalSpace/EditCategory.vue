<template>
	<div>
		<Form>
			<Form-item>
	            <Row>
	                <Col span="11">
	                   <Input v-model="category.name" placeholder="请输入类别名称"></Input>
	                </Col>
	                <Col span="2" style="text-align: center">&nbsp;</Col>
	                <Col span="11">
	                     <Button type="success" @click="save()" >添加</Button>
	                </Col>
	            </Row>
	        </Form-item>
		</Form>		
	</div>
</template>

<script>
	export default{
		data: function(){
			return{
				getUrl: "it/category/getByUser",
				saveUrl: "it/category/",
				category: {
					id: "",
					name:"",
					categoryType: "类别",
					creator: {
						id: localStorage.getItem("me-id"),
	         			name: localStorage.getItem("me-name")
					}
				},
				categoryItems:[]
			}
		},
		created: function(){
			this.$http.get(this.getUrl).then(
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
		methods: {
			save(){
				if (this.category.id == "") { //区分保存与修改
					this.$delete(this.category, 'id');
				}
				console.log(this.category);
				this.$http.post(this.saveUrl,JSON.stringify(this.category)).then(
		            response => {
		                this.$Message.success('保存成功!');
		                this.categoryItems.push(this.category);
		            },
		            response => {
		                let errorMsg = response.body.developerMessage;
		                this.$message.error(errorMsg);
		                if (errorMsg.indexOf("未认证") > -1) {
		                    this.$router.push("/login");
		                }
		                this.$Message.success('保存失败!');
		            }
		        );
			}
		}
	}
</script>

<style>
	

</style>