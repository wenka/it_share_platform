<template>
    <div class="login-wrap">
        <div class="ms-login">
            <h2>IT 技术分享平台</h2>
            <Tabs type="card">
                <Tab-pane label="登录">
                    <el-form :model="ruleForm" :rules="loginRules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        </el-form-item>
                        <el-form-item prop="tel">
                            <el-input type="tel" placeholder="电话" v-show="false"></el-input>
                        </el-form-item>
                        <el-form-item prop="tel">
                            <el-input type="tel" placeholder="电话" v-show="false"></el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <!-- <el-button-group> -->
                              <el-button size="small" type="success" @click="submitForm('ruleForm')">登录</el-button>
                                <el-popover
                                  ref="a"
                                  placement="top"
                                  width="400"
                                  title="忘记密码"
                                  trigger="click">
                                    <v-update-pswd v-on:user-changes="listenUserChange"></v-update-pswd>
                                </el-popover>
                              <el-button size="small" type="success" v-popover:a  @click="fogetPswd()">忘记密码</el-button>
                            <!-- </el-button-group> -->
                        </div>
                    </el-form>
                </Tab-pane>
                <Tab-pane label="注册">
                     <el-form :model="registerForm" :rules="registetRules" ref="register" label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input v-model="registerForm.username" placeholder="账号" v-on:blur="checkUsername()"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="tel">
                            <el-input type="tel" placeholder="电话" v-model="registerForm.tel" v-on:blur="showCodeInput()"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input type="code" placeholder="短信验证码" v-show="codeShow" v-model="registerForm.code" @keyup.enter.native="register('registerForm')"></el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button size="small" type="success" disabled>{{ timer }}</el-button>
                            <el-button size="small" type="success" @click="reSendCode()" v-show="sendCodeBtn">重新发送</el-button>
                            <el-button size="small" type="success" v-show="registerBtn" @click="register('register')">快速注册</el-button>
                        </div>
                    </el-form>
                </Tab-pane>
            </Tabs>
        </div>
        <!-- <Modal
          v-model="updatePswd"
          title="忘记密码"
          cancel-text="" >
          <v-update-pswd v-on:user-changes="listenUserChange"></v-update-pswd>
        </Modal> -->

    </div>
</template>

<script>
    import vUpdatePswd from './updatePswd.vue';
    export default {
        data: function(){
            return {
                updatePswd: false,
                registerUrl: 'it/pub/register',
                sendMsgUrl: 'it/pub/sendCode/',
                checkUsernameUrl: 'it/user/existed/',
                errMsg: "",
                codeShow: false,
                sendCodeBtn: false,
                timer: 60,
                code: '123456',
                registerBtn: true,
                ruleForm: {
                    username: '',
                    password: ''
                },
                registerForm: {
                    username: '',
                    password: '',
                    tel: '',
                    code: ''
                },
                loginRules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,10}$/,message: '字母开头，字母数字下划线[4-10]'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        // ,
                        // { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/, message: '必须包含大小写字母和数字的组合[6-10]'}
                    ]  
                },
                registetRules: {
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
                },
                Interval: null,
                user: ""
            }
        },
        components: {
            vUpdatePswd
        },
        methods: {
            //监听 user 变化
            listenUserChange(user){
                this.user = user;
                console.log(this.user);
            },
            //忘记密码
            fogetPswd(){
                console.log("忘记密码");
                this.updatePswd = true;
            },
            submitForm(formName) {

                var args = {
                    "account": this.ruleForm.username,
                    "password": this.ruleForm.password,
                    "remberme": true
                }
                const self = this;
                console.log(JSON.stringify(args));
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(args);
                    }else{
                        this.$message.error("请正确填写用户名或密码");
                    }
                    
                });
            },
            //login
            login(args){
                this.$http.get('it/user/login',{params:args}).then(response => {
                    console.log(response.body);
                    localStorage.setItem("me-id",response.body.id);
                    localStorage.setItem("me-name",response.body.name);
                    let router = localStorage.getItem("last-router");
                    localStorage.removeItem("last-router");
                    this.$router.push(router==null?"/homePage":router);
                }, response => {
                    this.$message.error(response.body.developerMessage);
                });    
            },
            register(formName){
                console.log(formName);
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.errMsg == "") {
                            if(this.registerForm.code !== this.code){
                                    this.$message.error("验证码错误");
                            }else{
                                let args = {
                                    "account": this.registerForm.username,
                                    "password": this.registerForm.password,
                                    "kindCode": 10,
                                    "tel": this.registerForm.tel
                                }
                                this.registerBtn = false;
                                console.log(JSON.stringify(args));
                                this.$http.post(this.registerUrl,JSON.stringify(args)).then(
                                    response => {
                                        console.log(response.body);
                                        this.$message.success("注册成功");
                                        this.$delete(args, 'kindCode');
                                        this.$set(args,'remberme',true);
                                        this.login(args);

                                    },
                                    response => {
                                        this.$message.error(response.body.developerMessage);
                                    }
                                );
                                this.registerBtn = true;
                            }
                        }else{
                            this.$message.error(this.errMsg);
                        }
                    }else{
                         this.$message.error("请正确填写注册表单");
                    }
                });
            },
            //验证用户名是否可用
            checkUsername(){
                console.log(this.registerForm.username);
                this.$http.get(this.checkUsernameUrl + this.registerForm.username).then(
                    response => {
                        console.log(response.body);
                        if (response.body) {
                            this.errMsg = "账号已存在";
                            this.$message.error(this.errMsg);
                        }else{
                            this.errMsg = "";
                        }
                    },
                    response => {
                        this.$message.error(response.body.developerMessage);
                    }
                );
            },
            //显示验证码输入框
            showCodeInput(){
                console.log(this.registerForm.tel);
                let patt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

                if (patt.test(this.registerForm.tel)) {
                    this.codeShow = true;
                    // this.$http.get(this.sendMsgUrl + this.registerForm.tel).then(
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

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-color: #CCCCCC;
        background-image: url('../../../static/img/login.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:auto;
        margin:-150px 0 0 -150px;
        padding:10px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn,h2{
        text-align: center;
        margin-bottom: 5px;
    }
   /* .login-btn button{
        width:100%;
        height:36px;
    }*/
</style>
