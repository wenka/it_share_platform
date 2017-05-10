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
	                        name: '销量',
	                        type: 'pie',
	                        radius : '55%',
	                        center: ['50%', '50%'],
	                        data:[
	                            {value:335, name:'博客'},
	                            {value:310, name:'头条'},
	                            {value:234, name:'提问'}
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