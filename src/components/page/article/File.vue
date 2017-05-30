<!-- 文章列表 -->
<template>
  <div>
     <div style="background:#eee;padding: 20px">
        <Card :bordered="false" v-for="item in fileItems" style="margin:10px;">
            <p slot="title">{{item.createTime}}</p>
            <Button type="text" slot="extra" @click="download(item)" >
                 <Icon type="ios-download"></Icon>下载
            </Button>
            <p><Icon type="android-archive"></Icon>&nbsp;&nbsp;{{item.attachment.originalName}}</p>
            <p><Icon type="android-clipboard"></Icon>&nbsp;&nbsp;{{item.remark==""?"无说明":item.remark}}</p>
        </Card>
    </div>
  </div>
  

</template>

<script>
export default {
  props:[
    "fileItems"
  ],
  data() {
    return {
      pgSize: 10,
      pgNo: 1,
      rawItems: [],
      items: []
    };
  },
  created: function(){
    // this.rawItems.push(this.fileItems);
    // this.changePgItems();
  },
  methods: {
    download(item){
      console.log(item.attachment.id);
      let id = item.attachment.id;
      window.location.href="it/download/" + id;
    },
    onScroll(event){
      console.log("滚动");
      var offsetHeight = event.currentTarget.offsetHeight;
      var scrollHeight = event.target.scrollHeight;
      var scrollTop = event.target.scrollTop;
      var scrollBottom = offsetHeight + scrollTop;
      // console.log("offsetHeight=" + offsetHeight + "\n" + "scrollHeight=" + scrollHeight + "\n" + "scrollTop=" + scrollTop + "\n" + "scrollBottom=" + scrollBottom);
      if(scrollTop===0){
        if(this.pgNo===1){
          return;
        }
        this.pgNo--;
        this.changePgItems();
        event.target.scrollTop=offsetHeight-1;
      };
      if(scrollBottom===scrollHeight || scrollBottom===scrollHeight+2){
        console.log("---" + Math.ceil(this.rawItems.length));
        if(this.pgNo==Math.ceil(this.rawItems.length/this.pgSize)){
          return
        }
        this.pgNo++;
        console.log(this.pgNo);
        this.changePgItems();
        // event.target.scrollTop=1;
      }
    },
    changePgItems(){
      console.log("滚动翻页");
      var start = (this.pgNo-1) * this.pgSize;
      var _items = this.rawItems.slice(0,this.pgSize+((this.pgNo-1)*this.pgSize));
      this.items = _items;
    }
  }
}
</script>


<style>
 
</style>
