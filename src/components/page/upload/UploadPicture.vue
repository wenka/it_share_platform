<template>
  <div class="upload-pic-view">

    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 图片上传</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <img class="pre-img" :src="src" alt="">
    <vue-core-image-upload :class="['btn-primary','pure-button-primary','js-btn-crop']"
                           :crop="true"
                           text="选择图片"
                           url="/api/posts/"
                           extensions="png,gif,jpeg,jpg"
                           cropRatio="1:1"
                           @:imageuploaded="imageuploaded"
                           @:errorhandle="handleError"></vue-core-image-upload>
  </div>
</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
  export default {
      data: function(){
          return {
              src: '../../../static/img/img.jpg',
              fileList: []
          }
      },
      components: {
              VueCoreImageUpload
      },
      methods:{
          imageuploaded(res) {
              console.log(res)
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
