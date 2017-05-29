<template>
    <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <el-button class="fa fa-coffee" type="text" readobly>&nbsp;&nbsp;我的操作记录</el-button>
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <el-table :data="data" border style="width: 100%" row-class-name="row-class"  v-loading="loading" element-loading-text="拼命加载中哦^_^">
        <el-table-column label="#序号" width="150">
          <template scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="250">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
         <el-table-column label="操作记录" show-overflow-tooltip>
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.context }}</p>
                <div slot="reference" class="name-wrapper">
                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    <span style="margin-left: 10px">{{ scope.row.context }}</span>
                </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination small :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="sizes,total,prev,pager,next,jumper" :total="total" @current-change="pageChange" @size-change="pageSizeChange"></el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        getLogListUrl: "it/log/logList",
        pageSize: 5,
        total:0,
        data:[],
        tableData: [],
        currentPage:0
      }
    },
    created(){
        this.getLogList();
    },
    methods: {
      pageSizeChange(size){
        this.pageSize = size;
        this.changeData(1,this.pageSize);
      },
      // 页面更换
      pageChange(page){
        // this.$message.success("当前页：" + page);
        this.currentPage = page;
        this.changeData(page,this.pageSize);
      },
      //换页
      changeData(page,pageSize){
        this.loading = true;
        console.log((page-1)*pageSize + "---" + ((page-1)*pageSize+pageSize));
        let d = this.tableData.slice((page-1)*pageSize,(page-1)*pageSize+pageSize);
        console.log(d);
        this.data = d;
        this.loading = false;
      },
      //获取数据
      getLogList(){
        this.loading = true;
        this.$http.get(this.getLogListUrl).then(
            response => {
                this.tableData = response.body;
                console.log(this.tableData);
                this.total = this.tableData.length;
                console.log(this.total);
                this.changeData(1,this.pageSize);
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
      }
    }
  }
</script>

<style>
    .pagination {
        width: 100%;
    }
    .cell {
        overflow: hidden;
    }
    .item {
      margin-top: 10px;
      margin-right: 40px;
    }
</style>