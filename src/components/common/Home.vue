<template>
    <div class="wrapper">
        <v-head></v-head>
        <!-- <v-sidebar></v-sidebar> -->
        <div class="content">
            <transition name="el-zoom-in-center" mode="out-in">
            	<router-view></router-view>
            </transition>
        </div>
        <!-- <v-foot></v-foot> -->
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vFoot from './Footer.vue';
    // import vSidebar from './Sidebar.vue';
    export default {
        components:{
            // vHead,vSidebar
            vHead,vFoot
        }
    }
</script>
