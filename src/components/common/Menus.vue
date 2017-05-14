<template>
	<div>
		<Row>
          <Col :xs="0" :sm="24" :md="24" :lg="24">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" default-active="1">
              <el-menu-item index="1"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
              <el-menu-item index="2"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
              <el-menu-item index="3"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
              <el-submenu index="4">
                <template slot="title"><span class="fa fa-cloud-download">&nbsp;资源下载</span></template>
                <el-menu-item index="4-1"><span class="fa fa-book">&nbsp;使用手册</span></el-menu-item>
                <el-menu-item index="4-2"><span class="fa fa-file-archive-o">&nbsp;源码实例</span></el-menu-item>
              </el-submenu>
            </el-menu>
          </Col>
          <Col :xs="24" :sm="0" :md="0" :lg="0">
            <el-menu default-active="0" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
              <el-submenu index="0">
                <template slot="title"><li class="el-icon-menu"></li>导航</template>
                <el-menu-item index="1"><span class="fa fa-newspaper-o">&nbsp;技术头条</span></el-menu-item>
                <el-menu-item index="2"><span class="fa fa-list-alt">&nbsp;技术博客</span></el-menu-item>
                <el-menu-item index="3"><span class="fa fa-question-circle">&nbsp;技术问答</span></el-menu-item>
                <el-submenu index="4">
                  <template slot="title"><span class="fa fa-cloud-download">&nbsp;资源下载</span></template>
                  <el-menu-item index="4-1"><span class="fa fa-book">&nbsp;使用手册</span></el-menu-item>
                  <el-menu-item index="4-2"><span class="fa fa-file-archive-o">&nbsp;源码实例</span></el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </Col>
        </Row>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods: {
			handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		       console.log(key, keyPath);
      		}
		}
	}
</script>
<style>
	
</style>