<template>
  <div class="userinfo">
    <Nav :navs="navs"></Nav>
    <div class="info">
      <div class="left f-pr">
        <img class="avator" src="~/static/image/avator.png" alt="">
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
      <h6 class="f-fs18 p-b-20">最新公告</h6>
      <p v-for="item in newsList"
         class="p-b-10 f-csp"
         v-loading="loading"
         @click="getDetail(item)">
        <i class="iconfont p-r-10">&#xe630;</i>{{ item.title }}
        <span class="p-l-35">{{ item.created_time }}</span>
        <span class="iconfont f-csp p-l-25">&#xe6dd;</span>
      </p>
    </div>
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

  export default {
    name: 'userinfo',
    components: {
      Nav
    },
    data() {
      return {
        dialogVisible: false,
        loading: false,
        navs: [
          {title: '个人中心', link: ''},
        ],
        userInfo: {
        },
        newsList: [],
        detailInfo: {}
      }
    },
    methods: {
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
        this.$axios.$get(`${this.$store.state.baseUrl}announcement/list`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.newsList = res.data.items
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
      }
    },
    mounted () {
      this.getUserInfo()
      this.getNewsList()
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
    height: 180px;
    padding: 15px 30px;
    background-color: #fff;
    p{
      line-height: 1.2;
    }
  }
</style>
