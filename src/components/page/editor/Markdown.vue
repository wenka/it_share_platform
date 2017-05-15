<!-- markdown编辑页面 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            <Form :rules="ruleValidate" :model="post" ref="post"> 
                <Form-item label="标题" prop="title" >
                    <Input v-model="post.title" />
                </Form-item>
                <Form-item label="类别" >
                    <Input v-model="post.category.id" v-show="false" disabled/>
                    <Input v-model="post.category.name" readonly/>
                    <label>选择类别：&nbsp;</label>
                    <Button v-for="item in categoryItems" @click="addCategoryToForm(item)" icon="pricetag"  size="small">
                        {{ item.name }}
                    </Button>
                    <el-button type="success" icon="edit" size="mini" @click="addCategory()">添加类别</el-button>
                </Form-item>
            </Form>
        </div>
        <markdown-editor v-model="post.content" :configs="configs" ref="markdownEditor"></markdown-editor>
        <div class="plugins-tips">
            <upload-file></upload-file>
            <el-button class="editor-btn" type="primary" v-show="submitbtn" @click="submit('post')">提交</el-button>
        </div>
        <!-- <mavonEditor v-model="content" height="100px;"/> -->
         <Modal
          v-model="editCategoryView"
          title="编辑类别"
          @on-ok="ok"
          @on-cancel="cancel">
          <v-edit-category v-on:category-changes="listenCategoryChange"></v-edit-category>
        </Modal>
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';
    // import { mavonEditor } from 'mavon-editor';
    import uploadFile from '../upload/UploadFile.vue';
    import vEditCategory from '../personalSpace/EditCategory.vue';
    export default {
        props:[
            'postType'
        ],
        data: function(){
            return {
                getCategoryUrl: 'it/category/getByUser',
                saveUrl: 'it/post/',
                submitbtn: true,
                editCategoryView: false,
                configs: {
                    status: true,
                    initialValue: 'Hello BBK',
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                },
                post: {
                    title: "",
                    postType: "",
                    content: "",
                    category:{
                        id: "",
                        name: ""
                    },
                    state: 1
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                categoryItems: []
            }
        },
        components: {
          markdownEditor,uploadFile,vEditCategory
            // mavonEditor
        },
        created: function(){
            let meId = localStorage.getItem("me-id");
            if (meId) {
                // this.$router.push("/personal-space");
            }else{
                localStorage.setItem("last-router",this.$route.path);
                this.$router.push('/login');
            }
            this.getCategoryList();
        },
        methods: {
            ok(){
                this.$Message.info("您点击了确定");
            },
            cancel(){
                this.$Message.info("您点击了取消");
            },
            submit(post) {
                this.submitbtn = false;
                console.log(this.post);
                this.$refs[post].validate((valid) => {
                    if (valid) {
                        if (this.post.category.id == "") {
                            this.$message.error("请选择类别");
                            return;
                        }
                        this.$http.post(this.saveUrl,JSON.stringify(this.post)).then(
                            response => {
                                this.$Message.success('提交成功!');
                            },
                            response => {
                                let errorMsg = response.body.developerMessage;
                                this.$message.error(errorMsg);
                                if (errorMsg.indexOf("未认证") > -1) {
                                    localStorage.removeItem('me-id');
                                    localStorage.removeItem('me-name');
                                    this.$router.push("/login");
                                }
                                // this.$Message.success('保存失败!');
                            }
                        );
                    }else{
                        this.$message.error("请填写标题");
                    }
                    
                });
                this.submitbtn = true;
            },
          //显示类别弹出框
            addCategory(){
                this.editCategoryView = true;
            },
             //监听 categoryItems 变化
            listenCategoryChange(categoryItems){
                this.categoryItems = categoryItems;
            },
            //获取类别列表
            getCategoryList(){
                console.log(this.postType);
                this.post.postType = this.postType;
                this.$http.get(this.getCategoryUrl).then(
                    response => {
                        this.categoryItems = response.body;
                        console.log(this.categoryItems);
                    },
                    response => {
                        let errorMsg = response.body.developerMessage;
                        this.$message.error(errorMsg);
                        if (errorMsg.indexOf("未认证") > -1) {
                            localStorage.removeItem('me-id');
                            localStorage.removeItem('me-name');
                            this.$router.push("/login");
                        }
                    }
                );
            },
            //将选择的类别添加到表单
            addCategoryToForm(category){
                console.log(category);
                this.post.category.id = category.id;
                this.post.category.name = category.name;
            },
        }
    }
</script>

<style>
  .footer {
    display: none;
  }
</style>
