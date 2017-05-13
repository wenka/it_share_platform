<!-- 个人资料详情页  -->

<template>

  <div>
    <div class="crumbs">
        <el-breadcrumb separator="/">·
            <el-breadcrumb-item><i class="fa fa-list-alt" aria-hidden="true">&nbsp;&nbsp;{{ user.name }}</i></el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 用户资料详情表单begin -->
        <div>
          <Form ref="user" :model="user" :rules="ruleValidate" :label-width="80">
              <Form-item label="id" prop="id" v-show="false">
                  <Input v-model="user.id" ></Input>
              </Form-item>
              <Form-item label="账户" prop="account">
                  <Input v-model="user.account" placeholder="请输入账户"></Input>
              </Form-item>
              <Form-item label="姓名" prop="name">
                  <Input v-model="user.name" placeholder="请输入姓名"></Input>
              </Form-item>
              <Form-item label="邮箱" prop="email">
                  <Input v-model="user.email" placeholder="请输入邮箱"></Input>
              </Form-item>
              <Form-item label="地址" prop="address">
                 <Input v-model="user.address" placeholder="请输入地址"></Input>
              </Form-item>
              <Form-item label="性别" prop="gender">
                  <Radio-group v-model="user.gender">
                      <Radio label="male">男</Radio>
                      <Radio label="female">女</Radio>
                      <Radio label="none">保密</Radio>
                  </Radio-group>
              </Form-item>
              <Form-item label="介绍" prop="remark">
                  <Input v-model="user.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入个人简介...">
                  	
                  </Input>
              </Form-item>
              <Form-item>
                  <Button type="primary" @click="handleSubmit('user')" v-show="submitbtn">提交</Button>
                  <Button type="ghost" @click="handleReset('user')" style="margin-left: 8px">重置</Button>
              </Form-item>
          </Form>
        </div>
        <!-- 用户详情表单end -->
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      	getUserUrl: "it/user/",
      	saveUrl: "it/user/",
      	submitbtn: true,
        user: {
            id:'',
            account: '',
            createTime: '',
            kindCode: '',
            name: '',
            spell: '',
           	state: '',
            email: '',
            address: '',
            gender: 'none',
            remark: ''
        },
        ruleValidate: {
            name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            gender: [
                { required: false, message: '请选择性别', trigger: 'change' }
            ],
            remark: [
                { required: false, message: '请输入个人介绍', trigger: 'blur' }
            ]
          }
      };
    },
    created: function(){
      this.user.id = this.$route.params.userId;
      this.$http.get(this.getUserUrl + this.user.id).then(response => {
          console.log(response.body);
          this.user = response.body;
      }, response => {
          let errorMsg = response.body.developerMessage;
          this.$message.error(errorMsg);
          if (errorMsg.indexOf("未认证") > -1) {
            localStorage.removeItem('me-id');
            localStorage.removeItem('me-name');
            this.$router.push("/login");
          }
      });
    },
    methods: {
           handleSubmit (name) {
           		this.submitbtn = false;
               	this.$refs[name].validate((valid) => {
                   if (valid) {
                   	console.log(JSON.stringify(this.user));
                   	this.$http.post(this.saveUrl,JSON.stringify(this.user)).then(response => {
                   		 	this.$Message.success('提交成功!');
                   		 	this.submitbtn = true;
	                   	},response => {
	                   		this.submitbtn = true;
	                   		let errorMsg = response.body.developerMessage;
					              this.$message.error(errorMsg);
      					        if (errorMsg.indexOf("未认证") > -1) {
                            localStorage.removeItem('me-id');
                            localStorage.removeItem('me-name');
      					            this.$router.push("/login");
      			          	}
      	             }
                    );
                 } else {
                     this.$Message.error('表单验证失败!');
                     this.submitbtn = true;
                 }
             })
           },
           handleReset (name) {
               this.$refs[name].resetFields();
           }
       }
  }
</script>

<style>

</style>
