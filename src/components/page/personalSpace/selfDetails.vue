<!-- 个人资料详情页  -->

<template>

  <div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="fa fa-list-alt" aria-hidden="true">&nbsp;&nbsp;{{ user.name }}</i></el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 用户资料详情表单begin -->
        <div>
          <Form ref="user" :model="user" :rules="ruleValidate" :label-width="80">
              <Form-item label="姓名" prop="name">
                  <Input v-model="user.name" placeholder="请输入姓名"></Input>
              </Form-item>
              <Form-item label="邮箱" prop="mail">
                  <Input v-model="user.mail" placeholder="请输入邮箱"></Input>
              </Form-item>
              <Form-item label="城市" prop="city">
                  <Select v-model="user.city" placeholder="请选择所在地">
                      <Option value="beijing">北京市</Option>
                      <Option value="shanghai">上海市</Option>
                      <Option value="shenzhen">深圳市</Option>
                      <Option value="zhengzhou">郑州市</Option>
                  </Select>
              </Form-item>
              <Form-item label="选择日期">
                  <Row>
                      <Col span="11">
                          <Form-item prop="date">
                              <Date-picker type="date" placeholder="选择日期" v-model="user.date"></Date-picker>
                          </Form-item>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <Form-item prop="time">
                              <Time-picker type="time" placeholder="选择时间" v-model="user.time"></Time-picker>
                          </Form-item>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="性别" prop="gender">
                  <Radio-group v-model="user.gender">
                      <Radio label="male">男</Radio>
                      <Radio label="female">女</Radio>
                  </Radio-group>
              </Form-item>
              <Form-item label="爱好" prop="interest">
                  <Checkbox-group v-model="user.interest">
                      <Checkbox label="吃饭"></Checkbox>
                      <Checkbox label="睡觉"></Checkbox>
                      <Checkbox label="跑步"></Checkbox>
                      <Checkbox label="看电影"></Checkbox>
                  </Checkbox-group>
              </Form-item>
              <Form-item label="介绍" prop="desc">
                  <Input v-model="user.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
              </Form-item>
              <Form-item>
                  <Button type="primary" @click="handleSubmit('user')">提交</Button>
                  <Button type="ghost" @click="handleReset('user')" style="margin-left: 8px">重置</Button>
              </Form-item>
          </Form>
        </div>
        <!-- 用户详情表单end -->
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        user: {
            id:'',
            name: '姓名',
            mail: 'wkwenka@gmail.com',
            city: 'zhengzhou',
            gender: 'male',
            interest: ['吃饭','睡觉','跑步','看电影'],
            date: '',
            time: '',
            desc: '哈哈哈哈'
        },
        ruleValidate: {
            name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            mail: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            city: [
                { required: true, message: '请选择城市', trigger: 'change' }
            ],
            gender: [
                { required: true, message: '请选择性别', trigger: 'change' }
            ],
            interest: [
                { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
            ],
            date: [
                { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
            ],
            time: [
                { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请输入个人介绍', trigger: 'blur' },
                { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
            ]
          }
      };
    },
    created: function(){
      this.user.id = this.$route.params.userId;
    },
    methods: {
           handleSubmit (name) {
               this.$refs[name].validate((valid) => {
                   if (valid) {
                       this.$Message.success('提交成功!');
                   } else {
                       this.$Message.error('表单验证失败!');
                   }
               })
           },
           handleReset (name) {
               this.$refs[name].resetFields();
           }
       }
  }
</script>

<style>

</style>
