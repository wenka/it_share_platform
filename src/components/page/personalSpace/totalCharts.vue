<template>
	<div>
		<el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <el-button class="fa fa-adjust" type="text" readobly>&nbsp;&nbsp;统计/日志</el-button>
            </el-breadcrumb-item>
        </el-breadcrumb>
		<div class="echarts">
	    	<IEcharts :option="pie" ></IEcharts>
	    </div>
		<div>
			<v-log-table></v-log-table>
		</div>
	</div>
	
</template>

<script>
	import IEcharts from 'vue-echarts-v3';
	import vLogTable from '../table/Logtable.vue';
	export default {
		data(){
			return {
				pie: {
	                color:["#20a0ff","#13CE66","#F7BA2A"],
	                title : {
	                    text: '发表量',
	                    x:'20%'
	                },
	                tooltip : {
	                    trigger: 'item',
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
	                legend: {
	                    orient: 'vertical',
	                    left: 'left',
	                    data: ["博客", "头条", "提问"]
	                },
	                series : [
	                    {
	                        name: '发表量',
	                        type: 'pie',
	                        radius : '50%',
	                        center: ['20%', '50%'],
	                        data:[
	                           
	                        ],
	                        itemStyle: {
	                            emphasis: {
	                                shadowBlur: 10,
	                                shadowOffsetX: 0,
	                                shadowColor: 'rgba(0, 0, 0, 0.5)'
	                            }
	                        }
	                    }
	                ]
	            }
            }
		},
		components: {
			IEcharts,vLogTable
		},
		created: function(){
			let meId = localStorage.getItem("me-id");
		    if (meId) {
		        // this.$router.push("/personal-space");
		    }else{
		        localStorage.setItem("last-router",this.$route.path);
		        this.$router.push('/login');
		    }
			console.log(this.$route.params);
			let blogCounts = this.$route.params.blogCounts;
			let headlineCounts = this.$route.params.headlineCounts;
			let qaCounts = this.$route.params.qaCounts;
			this.pie.series[0].data.push({value:blogCounts,name:'博客'});
			this.pie.series[0].data.push({value:headlineCounts,name:'头条'});
			this.pie.series[0].data.push({value:qaCounts,name:'提问'});
			console.log(this.pie.series[0]);
		}
	}
</script>

<style>
	.echarts {
        text-align: center;
        width: auto;
        height: 400px;
        border-style: solid;
        border-color: #DDDDDD;
        border-width: 1px;
    }
</style>