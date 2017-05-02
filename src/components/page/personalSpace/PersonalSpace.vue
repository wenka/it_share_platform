<template>
  <div class="main-personal-info">
    <Row>
      <Col :xs="0" :sm="10" :md="8" :lg="5">
        <div class="main-left">
          <Card style="width:100%">
             <div style="text-align:center">
                 <img src="../../../../static/img/img.jpg" class="header-img">
                 <h3>{{ name }}</h3>
             </div>
         </Card>
        </div>
      </Col>

      <Col :xs="24" :sm="14" :md="16" :lg="19">
        <div class="main-right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-list-alt">&nbsp;&nbsp;我的博客</span>
              <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
            </div>
            <div v-for="o in 4" class="text item">
              <a href="#">{{'列表内容 ' + o }}</a>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-newspaper-o">&nbsp;&nbsp;我的头条</span>
              <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
            </div>
            <div v-for="o in 4" class="text item">
              <a href="#">{{'列表内容 ' + o }}</a>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="right-content-title fa fa-question-circle">&nbsp;&nbsp;我的问答</span>
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
      name:"姓名"
    };
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

  .main-personal-info {
    width: 100%;
    margin: auto;
    overflow-y: hidden;
  }

  /*.content {
    width: 100%;
    background-color: #EEEEEE;
  }*/
</style>
