<template>
  <div class="main">
    <Row>
      <Col :xs="0" :sm="24" :md="24" :lg="24">
        <div>
          <Card style="width:320px">
             <div style="text-align:center">
                 <img src="../../../static/img/img.jpg">
                 <h3>一套基于 Vue.js 的高质量UI组件库</h3>
             </div>
         </Card>
        </div>
      </Col>

      <Col :xs="0" :sm="24" :md="24" :lg="24">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-file-text">&nbsp;&nbsp;热门文章</span>
              <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
            </div>
            <div v-for="o in 4" class="text item">
              <a href="#">{{'列表内容 ' + o }}</a>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-ambulance">&nbsp;&nbsp;江湖救急</span>
              <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
            </div>
            <div v-for="o in 4" class="text item">
              <a href="#">{{'列表内容 ' + o }}</a>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-user-plus">&nbsp;&nbsp;热门作者</span>
              <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
            </div>
            <div v-for="o in 4" class="text item">
              <a href="#">{{'列表内容 ' + o }}</a>
            </div>
          </el-card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  }
}
</script>


<style>
  .main {
    width: 100%;
    max-width: 980px;
    margin: auto;
  }

  .content {
    width: 100%;
    background-color: #EEEEEE;
  }
</style>
