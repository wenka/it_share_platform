<!-- 富文本编辑器页面 -->
<template>
    <div class="markdown-editor">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            <Form :rules="ruleValidate" :model="post" ref="post"> 
                <Form-item label="标题" prop="title" >
                    <Input v-model="post.title" />
                </Form-item>
                <Form-item label="类别" >
                    <!-- <Input v-model="post.category.name" /> -->
                    <el-button type="success" icon="edit" size="mini" @click="addCategory()">添加类别</el-button>
                </Form-item>
            </Form>
           
        </div>
        <quill-editor ref="myTextEditor" v-model="post.content" :config="editorOption"></quill-editor>
        <upload-file></upload-file>
        <el-button class="editor-btn" type="primary" @click="submit('post')" v-show="submitbtn">提交</el-button>
        <Modal
          v-model="editCategoryView"
          title="编辑类别"
          @on-ok="ok"
          @on-cancel="cancel">
          <v-edit-category></v-edit-category>
        </Modal>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    import uploadFile from '../upload/UploadFile.vue';
    import vEditCategory from '../personalSpace/EditCategory.vue';
    export default {
        props:[
            'postType'
        ],
        data: function(){
            return {
                saveUrl: 'it/post/',
                submitbtn: true,
                editCategoryView: false,
                editorOption: {
                    // something config
                },
                category:{
                    id: "",
                    name: ""
                },
                post: {
                    title: "",
                    postType: "",
                    content: ""
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
            quillEditor,uploadFile,vEditCategory
        },
        created: function(){
            console.log(this.postType);
            this.post.postType = this.postType;
        },
        methods: {
            addCategory(){
                this.editCategoryView = true;
            },
            ok(){
                this.$Message.info("您点击了确定");
            },
            cancel(){
                this.$Message.info("您点击了取消");
            },
            onEditorChange({ editor, html, text }) {
                this.post.content = html;
            },
            submit(post){
                this.submitbtn = false;
                console.log(this.post);
                this.$refs[post].validate((valid) => {
                    if (valid) {
                        if(this.category.name != ""){
                            this.post.category = this.category;
                        }
                        this.$http.post(this.saveUrl,JSON.stringify(this.post)).then(
                            response => {
                                this.$Message.success('提交成功!');
                            },
                            response => {
                                let errorMsg = response.body.developerMessage;
                                this.$message.error(errorMsg);
                                if (errorMsg.indexOf("未认证") > -1) {
                                    this.$router.push("/login");
                                }
                                this.$Message.success('保存失败!');
                            }
                        );
                    }else{
                        this.$message.error("请填写标题和类别");
                    }
                    
                });
                this.submitbtn = true;
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .markdown-editor {
      height: 50%;
    }
</style>
