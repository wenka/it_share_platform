<template>
	<div class="echarts">
    	<IEcharts :option="pie" ></IEcharts>
    </div>
	
</template>

<script>
	import IEcharts from 'vue-echarts-v3';
	export default {
		data(){
			return {
				pie: {
	                color:["#20a0ff","#13CE66","#F7BA2A"],
	                title : {
	                    text: '发表量',
	                    x:'center'
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
	                        center: ['50%', '50%'],
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
			IEcharts
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
    }
</style>