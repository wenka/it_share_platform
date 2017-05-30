<template>
    <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <el-button class="fa fa-bell-o" type="text" readobly>&nbsp;&nbsp;我的动态</el-button>
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <el-table :data="data" border style="width: 100%" row-class-name="row-class" v-loading="loading" element-loading-text="拼命加载中哦^_^">
        <el-table-column label="#序号" width="150" align="center">
          <template scope="scope">
            <el-badge is-dot class="item" v-if="scope.row.state == 0">
                <!-- <el-button size="small">评论</el-button> -->
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
            </el-badge>
             <el-badge class="item" v-else>
                <!-- <el-button size="small">评论</el-button> -->
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="250" align="center">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
         <el-table-column label="消息" width="300" show-overflow-tooltip align="center">
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.msg }}</p>
                <div slot="reference" class="name-wrapper">
                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    <span style="margin-left: 10px">{{ scope.row.msg }}</span>
                </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" v-if="scope.row.state == 0"  @click="handleEdit(scope.$index, scope.row)">标记已读</el-button>
            <el-button size="small" v-else disabled @click="handleEdit(scope.$index, scope.row)">标记已读</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" type="info" @click="handleView(scope.$index, scope.row)">查看</el-button>
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
        updateStateUrl: 'it/userDynamic/',
        userDynamicListUrl: "it/userDynamic/list",
        pageSize: 5,
        total:0,
        data:[],
        tableData: [],
        currentPage:0
      }
    },
    created(){
        let userid = this.$route.params.userId;
        console.log(userid);
        this.getDynamicList(userid);
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$http.post(this.updateStateUrl + row.id + "/" + "1").then(
            response => {
                this.$Message.success("已读");
                this.data[index].state = 1;
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
      handleDelete(index, row) {
        console.log(index, row);
        this.$http.post(this.updateStateUrl + row.id + "/" + "-1").then(
            response => {
                this.$Message.success("已删除");
                this.data.splice(index,1);
                this.tableData.splice(this.currentPage*this.pageSize+index,1);
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
      //查看
      handleView(index, row){
        console.log(row.postId);
        if (row.postId != undefined) {
            let args = { 
                name: 'othersSpace',
                params: {
                    postId: row.postId
                }
            };
            this.$router.push(args);
        }else{
            this.$Message.info("无详情");
        }

      },
      pageSizeChange(size){
        this.pageSize = size;
        this.changeData(1,this.pageSize);
      },
      // 页面更换
      pageChange(page){
        this.$message.success("当前页：" + page);
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
      getDynamicList(userId){
        this.loading = true;
        this.$http.get(this.userDynamicListUrl).then(
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