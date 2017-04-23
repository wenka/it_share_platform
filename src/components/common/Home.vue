<template>
    <div class="wrapper">
        <v-head></v-head>
        <!-- <v-sidebar></v-sidebar> -->
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    // import vSidebar from './Sidebar.vue';
    // import vHead2 from './Header2.vue';
    export default {
        components:{
            // vHead,vSidebar
            vHead
        }
    }
</script>
