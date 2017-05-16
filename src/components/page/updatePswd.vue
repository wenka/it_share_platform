<template>
	<div>
		 <el-form :model="user" :rules="rules" ref="update" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="user.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="新密码" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item prop="tel">
                <el-input type="tel" placeholder="电话" v-model="user.tel" v-on:blur="showCodeInput()"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="code" placeholder="短信验证码" v-show="codeShow" v-model="user.code" v-on:blur="ok('update')"></el-input>
            </el-form-item>
            <div class="login-btn">
                <el-button size="small" type="success" disabled>{{ timer }}</el-button>
                <el-button size="small" type="success" @click="reSendCode()" v-show="sendCodeBtn">重新发送</el-button>
                <el-button size="small" type="success" v-show="registerBtn" @click="ok('update')">修改密码</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				updatePswdUrl: 'it/pub/updatePswd',
				code: '123456',
				Interval: "",
				codeShow: false,
                sendCodeBtn: false,
                registerBtn: true,
                timer: 60,
				user: {
                    username: '',
                    password: '',
                    tel: '',
                    code: ''
                },
				rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,10}$/,message: '字母开头，字母数字下划线[4-10]'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        // ,
                        // { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/, message: '必须包含大小写字母和数字的组合[6-10]'}
                    ],
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {
                            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                            message: '手机号不合法'
                        }
                    ],
                    code: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' }
                    ]
                }
			}
		},
		methods: {
			ok(formName){
				console.log(formName);
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.user.code !== this.code){
                            this.$message.error("验证码错误");
                        }else{
                            this.$emit('user-changes',this.user);
                            let args = {
                            	account: this.user.username,
                            	tel: this.user.tel,
                            	password: this.user.password
                            }
                            this.$http.get(this.updatePswdUrl,{params:args}).then(
                            	response => {
                            		 this.$message.success("修改密码成功");
                            	},
                            	response => {
                            		this.$message.error(response.body.developerMessage);
                            	}
                            );
                        }
                    }else{
                         this.$message.error("请正确填写表单");
                    }
                });
			},
			//显示验证码输入框
            showCodeInput(){
                console.log(this.user.tel);
                let patt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

                if (patt.test(this.user.tel)) {
                    this.codeShow = true;
                    // this.$http.get(this.sendMsgUrl + this.user.tel).then(
                    //     response => {
                    //         this.code = response.body.code;
                            this.Interval = setInterval(this.updateTimer,1000);
                            this.$message.success("验证码发送成功");
                    //     },
                    //     response => {
                    //         this.$message.error("验证码发送失败，请检查手机号是否有误");
                    //     }
                    // );
                }else{
                    this.codeShow = false;
                    this.sendCodeBtn = false;
                }
            },
            //倒计时
            updateTimer(){
                if(this.timer <= 0) 
                {
                    this.timer = 60;
                    this.sendCodeBtn = false;
                }
                else{
                    this.timer--;
                }
                if (this.timer <= 0) {
                    this.sendCodeBtn = true;
                    clearInterval(this.Interval);;
                }
                console.log(this.timer);
            },
            //重新发送验证码
            reSendCode(){
                this.showCodeInput();
            }
		}
	}
</script>

<style>
	

</style>