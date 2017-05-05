<!-- 个人空间首页 -->
<template>
  <div class="main-personal-info">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <router-link to="/personal-space">
                <el-button class="fa fa-address-card" type="text" >&nbsp;&nbsp;我的空间</el-button>
              </router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <Row>
      <Col :xs="0" :sm="10" :md="8" :lg="5">
        <div class="main-left">
          <Card class="left-card">

            <div class="card-title">
                <Button type="ghost" size="small" @click="selfdetails('123456789')">个人资料</Button>
            </div>

             <div style="text-align:center">
                 <img src="../../../../static/img/img.jpg" class="header-img" @click="editAvatar()">
                 <p><h3>{{ name }}</h3></p>

             </div>
             <div style="text-align:center">
                  <p>我关注的<Button type="text" style="color:green">{{myFocus}}</Button></p>
                  <p>关注我的<Button type="text" style="color:green">{{myFans}}</Button></p>
             </div>
          </Card>

          <Card class="left-card">
            <div class="card-title">
                <Button type="ghost" size="small">文章类别</Button>
            </div>
             <div style="text-align:center">
                  <p v-for="o in 10"><Tag color="green">类别 {{o}}</Tag></p>
             </div>
          </Card>

          <Card class="left-card">
            <div class="card-title">
                <Button type="ghost" size="small">日期轨迹</Button>
            </div>
             <div style="text-align:center">
                  <p v-for="o in 10"><Tag color="green">2017年 {{o}}月</Tag></p>
             </div>
          </Card>
        </div>
      </Col>

      <Col :xs="24" :sm="14" :md="16" :lg="19">
        <div class="details">
          <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
      </Col>

    </Row>
    <Modal
      v-model="editAvatarView"
      title="修改头像"
      @on-ok="ok"
      @on-cancel="cancel">
      <upload-picture></upload-picture>
    </Modal>
  </div>
</template>

<script>
  import uploadPicture from '../upload/UploadPicture.vue';
  export default {
    data() {
      return {
        editAvatarView: false,
        name:"姓名",
        myFocus: 20,
        myFans: 50
      };
    },
    components: {
      uploadPicture
    },
    methods: {
      selfdetails(userId){
        console.log(userId);
        let args = {
          name: 'selfDetails',
          params: {
            userId: userId
          }
        }
        this.$router.push(args);
      },
      editAvatar() {
        console.log("修改头像");
        this.editAvatarView = true;
        console.log(this.editAvatarView);
      },
      ok () {
          this.$Message.info('点击了确定');
      },
      cancel () {
          this.$Message.info('点击了取消');
      }
    }
  }
</script>


<style>

  .main-left {
  }

  .header-img {
    width: 100px;
    height: 100%;
    border-radius: 50%;
  }

  .header-img:hover {
    border: green;
    border-width: 1px;
    border-style:outset;
    cursor: pointer;
  }

  .main-personal-info {
    width: 100%;
    margin: auto;
    overflow-y: hidden;
  }

  .left-card {
    width:90%;
    margin: 10px;
  }

  /*.content {
    width: 100%;
    background-color: #EEEEEE;
  }*/
</style>
