<template>
    <div class="header">
        <div class="logo">
          <img class="header-logo" src='../../../static/img/logo.jpg'>
          <div class="header-title" @click="backHome()">IT 技术分享平台 </div>
        </div>
        <div class="serach">
            <span class="el-icon-search search-span" @click="showSearch"></span>
            <transition name="fade">
              <input type="text" v-model="param" @keyup.13="search($event)" v-show="active" class="search-input"/>
            </transition>
          </span>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                          <span class="fa fa-user-circle-o">  个人中心</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="loginout">
                      <span class="el-icon-information">  退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin',
                active: false,
                param: ""
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            showSearch() {
                console.log("search" + this.active);
                if (this.active) {
                  this.active = false;
                }else {
                  this.active = true;
                }
            },
            search(ev) {
              if(ev.keyCode == 13){
                this.$message({
                  message: '恭喜你，搜索' + this.param + '成功',
                  type: 'success'
                });
                this.param = "";
                this.active = false;
              }
            },
            backHome() {
              console.log("返回首页");
              this.$router.push('/homePage');
            }
        }
    }
</script>
<style scoped>

    .header-title:hover{
      color: #009966;
      text-decoration:underline;
      cursor: pointer;
    }

    .header-title {
      margin: auto;
      float: left;
      color: #00CC99;
    }

    .header-logo {
      border-radius: 50%;
      height:50px;;
      float: left;
      margin-left: 10px;
      margin-top: 10px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .10s
    }
    .fade-enter, .fade-leave-active {
      transition: opacity .10s
    }

    .search-input {
      border-width: 0px;
      background-color: #E5E9F2;
      max-width: 70%;
      max-height: 35px;
      margin: auto;
      padding: 10px;
      border-radius: 50px;
    }

    input {
      border-radius: 50px;
    }

    .serach-span {
      border-width: 1px;
      border-color: #D3DCE6;
      border-style: dashed;
      float: left;
      /*height: 50%;*/
    }

    .serach {
      width: 250px;
      float: left;
      max-height: 70px;
    }

    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #464c5b;
        background-color: #f5f7f9;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #464c5b;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #464c5b;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: left;
    }
</style>
