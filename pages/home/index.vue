<template>
  <div class="userinfo">
    <Nav :navs="navs"></Nav>
    <div class="info">
      <div class="left f-pr">
        <div class="avator">
          <img src="~/static/image/avator.png" alt="">
          <p class="f-tac m-t-20">
            <!--<el-button type="text" style="color: #172099;">修改密码</el-button>-->
            <el-button type="primary" @click="editPass">修改密码</el-button>
          </p>
        </div>
        <div class="detail fsh-f-222">
          <p>用户名: {{ userInfo.username }}</p>
          <p>可用积分: {{ userInfo.credit }}积分</p>
          <p>用户等级:
            <span v-if="userInfo.role == 0">普通用户</span>
            <span v-if="userInfo.role == 1">会员</span>
          </p>
          <p>我的用户数: {{ userInfo.count }}</p>
        </div>
      </div>
      <div class="right">
        <p class="p-b-15">客服微信号</p>
        <img src="~/static/image/weixin.jpg" alt="">
      </div>
    </div>

    <div class="news">
      <h6 class="f-fs18 p-b-20" style="width: 570px;">最新公告
        <span class="f-fs14 fsh-f-c f-fr f-csp" @click="showAll">查看全部</span>
      </h6>
      <p v-for="item in newsList"
         class="p-b-5 f-csp"
         v-loading="loading"
         @click="getDetail(item)">
        <span class="label ellipsis">
          <i class="iconfont p-r-10">&#xe630;</i>
          {{ item.title }}
        </span>
        <span class="p-l-35 ellipsis">{{ item.created_time }}</span>
        <span class="iconfont f-csp p-l-25">&#xe6dd;</span>
      </p>
      <!--<el-pagination-->
        <!--v-show="pageInfo.total && pageInfo.total > 5"-->
        <!--class="f-tac p-t-10 p-b-10"-->
        <!--background-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="pageInfo.total"-->
        <!--:page-size="pageInfo.size"-->
        <!--@current-change = "handleCurrentChange">-->
      <!--</el-pagination>-->
    </div>
    <el-dialog
      title="修改密码"
      class="edit-pass-dialog"
      :visible.sync="editDialogVisible"
      v-loading="loading"
      @close="close"
      width="480px;">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="手机号" prop="phone">
          <el-input maxlength="11" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input style="width: 210px" type="tel" v-model="form.verificationCode" auto-complete="newpassword" placeholder="请输入验证码"></el-input>
          <ActhCodeBtn ref="passwordAuthBtn" :phone="form.phone" @click="getVerCode"></ActhCodeBtn>
        </el-form-item>
        <el-form-item label="密码" prop="pass" required>
          <el-input type="password" v-model="form.pass" autocomplete="newpassword" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--required-->
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="form.checkPass" autocomplete="newpassword" placeholder="请再输一次密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="detail-dialog"
      :title="detailInfo.title"
      :visible.sync="dialogVisible">
      <p></p>
      <div v-html="detailInfo.content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  import ActhCodeBtn from '@/components/acthCodeBtn'

  export default {
    name: 'userinfo',
    components: {
      Nav
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        editDialogVisible: false,
        dialogVisible: false,
        loading: false,
        navs: [
          {title: '个人中心', link: ''},
        ],
        userInfo: {
        },
        newsList: [],
        detailInfo: {},
        form: {
          phone: '',
          verificationCode: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          phone: { required: true, message: '手机号不能为空', trigger: 'blur' },
          verificationCode: { required: true, message: '验证码不能为空', trigger: 'blur' },
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        },
        pageInfo: {
          size: 5,
          page: 1,
          total: 0
        }
      }
    },
    methods: {
      showAll () {
        location.href = '/home/newsList'
      },
      // handleCurrentChange (page) {
      //   this.pageInfo.page = page
      //   this.getNewsList()
      // },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editPwdAjax()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close () {
        this.form.phone = ''
        this.form.verificationCode = ''
        this.form.pass = ''
        this.form.checkPass = ''
      },
      editPass () {
        this.editDialogVisible = true
      },
      editPwdAjax () {
        this.loading = true
        this.$axios.$post(`${this.$store.state.baseUrl}user/editPwd`, {
          phone: this.form.phone,
          verification_code: this.form.verificationCode,
          new_password: this.form.checkPass
        }).then((res) => {
          this.loading = false
          this.editDialogVisible = false
          this.$message.success('修改成功')
        }).catch(() => {
          this.loading = false
        })
      },
      getUserInfo () {
        this.$axios.$get(`${this.$store.state.baseUrl}user/info `).then((res) => {
          if (res.code == 200) {
            this.userInfo = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getNewsList () {
        this.loading = true
        let query = `?limit=${this.pageInfo.size}&offset=${this.pageInfo.size*(this.pageInfo.page-1)}`
        this.$axios.$get(`${this.$store.state.baseUrl}announcement/list${query}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.newsList = res.data.items
            this.pageInfo.total = res.data.page.total_row || 0
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      getDetail (item) {
        this.$axios.$get(`${this.$store.state.baseUrl}announcement/detail/${item.id}`).then((res) => {
          if (res.code == 200) {
            this.detailInfo = res.data
            this.dialogVisible = true
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      getVerCode () {
        this.$axios.$get(`${this.$store.state.baseUrl}sms/send?phone=${this.form.phone}`).then((res) => {
          if (res.code == '200') {
            this.$message.success("发送成功,请注意查收")
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    },
    mounted () {
      this.getUserInfo()
      this.getNewsList()
    },
    components: {
      ActhCodeBtn
    }
  }
</script>
<style lang="less">
  .info{
    display: flex;
    padding: 55px 115px 85px 50px;
    background-color: #fff;
    margin-bottom: 5px;
    .left{
      width: 435px;
      display: flex;
      &:after{
         position: absolute;
         top: 0;
         right: 0;
         content: '';
         width: 1px;
         height: 170px;
         background-color: #d6d6d6;
       }
      .avator{
        margin-right: 66px;
      }
      .detail{
        line-height: 2.2;
        font-size: 16px;
      }
    }
    .right{
      padding-left: 120px;
      text-align: center;
    }
    img{
      width: 145px;
      height: 145px;
    }
    .detail-dialog{
      width: 520px;
    }
  }
  .news{
    height: 240px;
    padding: 15px 30px;
    background-color: #fff;
    .label{
      display: inline-block;
      width: 360px;
    }
    p{
      line-height: 1.1;
    }
  }
</style>
