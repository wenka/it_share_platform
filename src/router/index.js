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
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/article/Articles.vue'],resolve) //文章列表
                },
                {
                    path: '/article-info',
                    component: resolve => require(['../components/page/article/Articles-info.vue'],resolve) //文章详情
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
                      }
                    ]
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
