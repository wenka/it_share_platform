<template>
	<div>
		<div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <el-button class="fa fa-bell-o" type="text" readobly>&nbsp;&nbsp;我的{{title}}</el-button>
              </el-breadcrumb-item>
          </el-breadcrumb>
      	</div>
      	<el-table :data="data" border style="width: 90%;margin:0 auto;" row-class-name="row-class" v-loading="loading" element-loading-text="拼命加载中哦^_^">
	        <el-table-column label="#序号" width="150px" align="center">
	          <template scope="scope">
	               <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
	          </template>
	        </el-table-column>
	        <el-table-column label="关注日期" width="300px" align="center">
	          <template scope="scope">
	            <el-icon name="time"></el-icon>
	            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
	          </template>
	        </el-table-column>
	        <el-table-column label="姓名" width="300px" show-overflow-tooltip align="center">
	          <template scope="scope"  width="100">
	          	<div v-if="relationDirection == 'myFocus'">
		            <el-popover trigger="hover" placement="top">
		                <p>{{ scope.row.focus.remark }}</p>
		                <div slot="reference" class="name-wrapper">
		                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
		                    <span style="margin-left: 10px">{{ scope.row.focusName }}</span>
		                </div>
		            </el-popover>
	          	</div>
	          	<div v-else-if="relationDirection == 'myFans'">
	          		<el-popover trigger="hover" placement="top">
		                <p>{{ scope.row.owner.remark }}</p>
		                <div slot="reference" class="name-wrapper">
		                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
		                    <span style="margin-left: 10px">{{ scope.row.ownerName }}</span>
		                </div>
		            </el-popover>
	          	</div>
	          </template>
	        </el-table-column>
	        <el-table-column label="操作" align="center">
	          <template scope="scope">
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
		props:[
            'relationDirection'
        ],
	    data() {
	      return {
	      	title: "",
	        loading: true,
	        getRelationListUrl: 'it/userFans/list',
	        pageSize: 5,
	        total:0,
	        data:[],
	        tableData: [],
	        currentPage:0
	      }
    	},
    	created(){
    		console.log(this.relationDirection);
    		this.init();
    	},
    	methods: {
    		init(){
    			if (this.relationDirection == 'myFocus') {
	    			this.title = "关注";
	    		}
	    		else if(this.relationDirection == 'myFans'){
	    			this.title = "粉丝";
	    		}
	    		this.getData(this.relationDirection);
    		},
    		//查看
		    handleView(index, row){
		        console.log(row);
		        let id = "";
				if (this.relationDirection == 'myFocus') {
	    			id = row.focusId;
	    		}
	    		else if(this.relationDirection == 'myFans'){
	    			id = row.ownerId;
	    		}
		        if (row.id != undefined) {
		            let args = { 
		                name: 'othersInfo',
		                params: {
		                    userId: id
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
	      	getData(direction){
	      		this.loading = true;
	      		let args = {
		      		direction: direction
		      	};
	      		this.$http.get(this.getRelationListUrl,{params:args}).then(
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
    	},
    	watch: {
	     // 如果路由有变化，会再次执行该方法
	     "relationDirection": "init"
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