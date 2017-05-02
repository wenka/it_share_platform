<template>
  <div class="footer">
    <p>
      <i class="fa fa-qq" aria-hidden="true">&nbsp;{{ qq }}</i>
      <i class="fa fa-weixin" aria-hidden="true">&nbsp;{{ wechat }}</i>
    </p>
    <p>
      <i class="fa fa-weibo" aria-hidden="true">&nbsp;{{ weibo }}</i>
      <i class="fa fa-github" aria-hidden="true">&nbsp;{{ github }}</i>
    </p>
    <p><i class="fa fa-copyright" aria-hidden="true">版权所有</i></p>
  </div>
</template>

<script>
  export default{
    data() {
        return {
            qq: 'wkwenka@gmail.com',
            wechat: "15738826986",
            weibo: "爱红尘的苦行僧",
            github: "wenka"
        }
    }
  }
</script>

<style>

.footer {
  width: 100%;
  height: auto;
  float: left;
  background-color: #333333;
  text-align: center;
  font-size: 15px;
  line-height: 15px;
  bottom: 0px;
  position: absolute;
}

</style>
