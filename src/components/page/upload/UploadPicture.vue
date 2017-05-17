<template>
  <div class="upload-pic-view">

    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 图片上传</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <img class="pre-img" :src="src" alt="">
    <vue-core-image-upload :class="['btn', 'btn-primary']"
                           :crop="true"
                           text="选择图片"
                           url="/it/uploads"
                           extensions="png,gif,jpeg,jpg"
                           cropRatio="1:1"
                           inputAccept="image/*"
                           resize="local"
                           @imageuploaded="imageuploaded"
                           @errorhandle="handleError"></vue-core-image-upload>
  </div>
</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
  export default {
      data: function(){
          return {
              updateUrl: "it/user/upload",
              src: '../../../static/img/img.jpg',
              fileList: [],
              userId: ""
          }
      },
      components: {
              VueCoreImageUpload
      },
      created() {
          this.userId = localStorage.getItem("me-id");
          if (this.userId) {
          // this.$router.push("/personal-space");
          }else{
              localStorage.setItem("last-router",this.$route.path);
              this.$router.push('/login');
          }
      },
      methods:{
          imageuploaded(res) {
              console.log(res);
              let response = res[0];
              let args = {
                id: this.userId,
                attachment: {
                  id: response.id
                }
              };
              this.$http.post(this.updateUrl,JSON.stringify(args)).then(
                  response => {
                    this.$message.success("头像更改成功");
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
          handleError(){
              this.$message.error('图片上传失败');
          }
      }
  }
</script>

<style>
  .pre-img {
    width: 100px;
    height: 100%;
    border-radius: 50%;
  }

  .upload-pic-view {
    align-items: center;
    text-align: center;
  }

</style>
