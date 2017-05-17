import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/article/Articles.vue'],resolve) //文章列表
                },
                {
                    name: 'pubArticleList',
                    path: '/pubArticleList',
                    component: resolve => require(['../components/page/home/PubArticleList.vue'],resolve) //文章详情
                },
                {
                    path: '/personal-space',
                    component: resolve => require(['../components/page/personalSpace/PersonalSpace.vue'],resolve), //个人空间
                    children:[
                      {
                        path: '/',
                        component: resolve => require(['../components/page/personalSpace/MainRight.vue'],resolve) //右侧默认显示
                      },
                      {
                          name: 'editPost',
                          path: '/edit/:type',
                          component: resolve => require(['../components/page/personalSpace/EditPost.vue'],resolve) //内容编辑
                      },
                      {
                          name: 'selfDetails',
                          path: '/self-details/:userId',
                          component: resolve => require(['../components/page/personalSpace/selfDetails.vue'],resolve) //个人资料详情页
                      },
                      {
                          name: 'totalCharts',
                          path: '/total-charts',
                          component: resolve => require(['../components/page/personalSpace/totalCharts.vue'],resolve) //统计页面
                      },
                      {
                          path: '/edit-category',
                          component: resolve => require(['../components/page/personalSpace/EditCategory.vue'],resolve) //统计页面
                      },
                      {
                          name: 'timerLineList',
                          path: '/timerLine',
                          component: resolve => require(['../components/page/article/TimerLineList.vue'],resolve)
                      },
                      {
                          name: 'userDynamicTable',
                          path: '/userDynamicTable/:userId',
                          component: resolve => require(['../components/page/table/UserDynamicTable.vue'], resolve) 
                      },
                      //文档上传
                      {
                          name: 'uploadFile',
                          path: '/uploadFile/:fileType',
                          component: resolve => require(['../components/page/upload/UploadFile.vue'], resolve)     
                      }
                    ]
                },
                {
                    name: "othersSpace",
                    path: '/othersSpace/:postId',
                    component: resolve => require(['../components/page/othersSpace/OthersSpace.vue'],resolve)
                    // ,
                    // children: [
                    //     {
                    //         name: 'articleInfo',
                    //         path: '/',
                    //         component: resolve => require(['../components/page/article/Articles-info.vue'],resolve) //文章详情
                    //     }
                    // ]
                },
                { 
                    name: 'othersInfo',
                    path: '/othersInfo/:userId',
                    component: resolve => require(['../components/page/othersSpace/OthersInfo.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/homePage',
            component: resolve => require(['../components/page/home/Home.vue'],resolve)
        }
    ]
})
