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
                <Form-item label="标签">
                    <el-tag :key="tag" v-for="tag in tagItems" type="success" style="margin:5px;" :closable="true" :close-transition="false" @close="handleClose(tag)">
                    {{tag.name}}
                    </el-tag>
                    <Input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @on-blur="handleInputConfirm">
                    </Input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
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
        <quill-editor ref="myTextEditor" v-model="post.content" :config="editorOption"></quill-editor>
        <!-- <upload-file></upload-file> -->
        <el-button class="editor-btn" type="primary" @click="submit('post')" v-show="submitbtn">提交</el-button>
        <Modal
          v-model="editCategoryView"
          title="编辑类别" scrollable cancel-text="">
          <v-edit-category v-on:category-changes="listenCategoryChange"></v-edit-category>
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
                getCategoryUrl: 'it/category/getByUser',
                saveUrl: 'it/post/',
                submitbtn: true,
                editCategoryView: false,
                editorOption: {
                    // something config
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
                categoryItems: [],
                tagItems: [],
                inputVisible: false,
                inputValue: ""
            }
        },
        components: {
            quillEditor,uploadFile,vEditCategory
        },
        created: function(){
            let meId = localStorage.getItem("me-id");
            if (meId) {
                // this.$router.push("/personal-space");
            }else{
                localStorage.setItem("last-router",this.$route.path);
                this.$router.push('/login');
            }
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
                        localStorage.setItem("last-router",this.$route.path);
                        this.$router.push("/login");
                    }
                }
            );
        },
        methods: {
            //添加标签
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.tagItems.push({"name":inputValue});
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //显示标签输入框
            showInput() {
                this.inputVisible = true;
                // this.$nextTick(_ => {
                //     this.$refs.saveTagInput.$refs.input.focus();
                // });
            },
            //关闭标签
            handleClose(tag) {
                this.tagItems.splice(this.tagItems.indexOf(tag), 1);
            },
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
            //提交表单
            submit(post){
                this.submitbtn = false;
                console.log(this.post);
                this.$refs[post].validate((valid) => {
                    if (valid) {
                        if (this.post.category.id == "") {
                            this.$message.error("请选择类别");
                            return;
                        }
                        this.$set(this.post,"tags",this.tagItems);
                        console.log(JSON.stringify(this.post));
                        this.$http.post(this.saveUrl,JSON.stringify(this.post)).then(
                            response => {
                                this.$Message.success('提交成功!');
                                this.$route.go(0);
                            },
                            response => {
                                let errorMsg = response.body.developerMessage;
                                this.$message.error(errorMsg);
                                if (errorMsg.indexOf("未认证") > -1) {
                                    localStorage.removeItem('me-id');
                                    localStorage.removeItem('me-name');
                                    localStorage.setItem("last-router",this.$route.path);
                                    this.$router.push("/login");
                                }
                            }
                        );
                    }else{
                        this.$message.error("请填写标题");
                    }
                    
                });
                this.submitbtn = true;
            },
            //将选择的类别添加到表单
            addCategoryToForm(category){
                console.log(category);
                this.post.category.id = category.id;
                this.post.category.name = category.name;
            },
            //监听 categoryItems 变化
            listenCategoryChange(categoryItems){
                this.categoryItems = categoryItems;
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
    .ivu-modal-footer{
        display: none;
    }
    .editor-btn{
        margin-top: 20px;
    }
    .markdown-editor {
      height: 50%;
    }
</style>
