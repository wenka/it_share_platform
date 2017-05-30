<!-- 个人资料详情页  -->

<template>

  <div>
    <div class="crumbs">
        <el-breadcrumb separator="/">·
            <el-breadcrumb-item><i class="fa fa-list-alt" aria-hidden="true">&nbsp;&nbsp;{{ user.name }}</i></el-breadcrumb-item>
        </el-breadcrumb>

        <Tabs type="card">
          <Tab-pane label="基本资料">
            <!-- 用户资料详情表单begin -->
            <div v-loading="loadingMe" element-loading-text="拼命加载中哦^_^">
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
                      <Button type="primary" @click="handleSubmit('user')" :disabled="submitbtn">提交</Button>
                      <Button type="ghost" @click="handleReset('user')" style="margin-left: 8px">重置</Button>
                  </Form-item>
              </Form>
            </div>
            <!-- 用户详情表单end -->
          </Tab-pane>
          <Tab-pane label="手机号">
            <Form ref="telForm" :model="telForm" :rules="ruleTel" :label-width="80">
              <Form-item>
                <Input v-model="user.tel" readonly>
                    <span slot="prepend">原手机号：</span>
                </Input>
              </Form-item>

              <Form-item prop="tel">
                <Input v-model="telForm.tel">
                    <span slot="prepend">新手机号：</span>
                </Input>
              </Form-item>

              <Form-item prop="code">
                <Input v-model="telForm.code" width="200px;">
                    <span slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;验证码：</span>
                    <span slot="append" >[{{timer}}]&nbsp;<a :disabled="reSendCodeBtn" @click="reSendCode()">获取验证码</a></span>
                </Input>
              </Form-item>
             
              <Form-item>
                  <Button type="primary" @click="updateTel('telForm')" :disabled="submitbtn">修改</Button>
              </Form-item>
            </Form>
          </Tab-pane>
         <!--  <Tab-pane label="修改密码">
            
          </Tab-pane> -->
        </Tabs>
        
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        reSendCodeBtn: false,
        Interval: "",
        timer: 60,
        loadingMe: true,
      	getUserUrl: "it/user/",
      	saveUrl: "it/user/",
        sendMsgUrl: 'it/pub/sendCode/',
        updateTelUrl: 'it/user/updateTel/',
      	submitbtn: false,
        user: {
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
          },
        telForm: {
          code: "",
          tel: ""
        },
        code: "123456",
        ruleTel: {
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          tel: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              {
                  pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                  message: '手机号不合法'
              }
          ]
        }
      };
    },
    created: function(){
      let meId = localStorage.getItem("me-id");
      if (meId) {
          this.getMe();
        }else{
            localStorage.setItem("last-router",this.$route.path);
            this.$router.push('/login');
        }
    },
    methods: {
      reSendCode(){
        this.sendCode();
      },
      //倒计时
      updateTimer(){
        if(this.timer <= 0) 
          {
              this.timer = 60;
              this.reSendCodeBtn = false;
          }
          if(this.timer <= 0) 
          {
              this.timer = 60;
              this.reSendCodeBtn = false;
          }
          else{
              this.timer--;
              this.reSendCodeBtn = true;
          }
          if (this.timer <= 0) {
              clearInterval(this.Interval);;
              this.reSendCodeBtn = false;
              this.timer = 60;
          }
          console.log(this.timer);
      },
      sendCode(){
        let patt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

        if (patt.test(this.telForm.tel)) {
            if(this.telForm.tel == this.user.tel){
              this.$message.error("手机号未更换");
              return;
            }
            this.$http.get(this.sendMsgUrl + this.telForm.tel).then(
                response => {
                    this.code = response.body.code;
                    this.Interval = setInterval(this.updateTimer,1000);
                    this.$message.success("验证码发送成功");
                },
                response => {
                    this.$message.error("验证码发送失败，请检查手机号是否有误");
                }
            );
        }else{
           this.$message.error("新手机号不合法");
        }
      },
      updateTel(name){
        console.log(name);
        this.submitbtn = true;
        this.$refs[name].validate((valid) => {
           if (valid) {
            if (this.code == this.telForm.code) {
              this.$http.post(this.updateTelUrl + this.telForm.tel).then(
                response => {
                  this.user.tel = this.telForm.tel;
                  this.$message.success("修改成功");
                  this.submitbtn = false;
                  this.code = "";
                },
                response => {
                  this.submitbtn = false;
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
            }else{
               this.$Message.error('验证码不匹配!');
               this.submitbtn = false;
            }
           } else {
               this.$Message.error('表单验证失败!');
               this.submitbtn = false;
           }
        })
      },
      getMe(){
        
        this.loadingMe = true;
        this.user.id = this.$route.params.userId;
        this.$http.get(this.getUserUrl + this.user.id).then(response => {
            console.log(response.body);
            this.user = response.body;
            this.loadingMe = false;
        }, response => {
            let errorMsg = response.body.developerMessage;
            this.$message.error(errorMsg);
            if (errorMsg.indexOf("未认证") > -1) {
              localStorage.removeItem('me-id');
              localStorage.removeItem('me-name');
              localStorage.setItem("last-router",this.$route.path);
              this.$router.push("/login");
            }
        });
      },
       handleSubmit (name) {
       		this.submitbtn = true;
           	this.$refs[name].validate((valid) => {
               if (valid) {
               	console.log(JSON.stringify(this.user));
               	this.$http.post(this.saveUrl,JSON.stringify(this.user)).then(response => {
               		 	this.$Message.success('提交成功!');
               		 	this.submitbtn = false;
                 	},response => {
                 		this.submitbtn = false;
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
