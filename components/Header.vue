<template>
  <div class="header">
    <div class="container-1200">
      <div class="right f-fr f-fs16">
        <div class="item p-r-35">
          <i class="iconfont f-fs28 f-vam">&#xe649;</i>
          <span class="f-vam">积分: {{ userInfo.credit }}</span>
        </div>
        <div class="item p-r-35 f-csp" @click="goRecharge">
          <i class="iconfont f-fs24 f-vam" style="font-size: 24px">&#xe604;</i>
          <span class="f-vam">充值</span>
        </div>
        <div class="item p-r-25">
          <i class="iconfont f-vam" style="font-size: 22px">&#xe696;</i>
          <span class="f-vam">帮助中心</span>
        </div>
        <!--<div class="item p-r-20">-->
          <!--<i class="iconfont f-vam" style="font-size: 44px">&#xe643;</i>-->
        <!--</div>-->
        <div class="item p-r-20" @click="signOut">
          <i class="iconfont f-vam f-csp" style="font-size: 36px">&#xe648;</i>
        </div>
      </div>
      <h1><i class="logo f-vam"></i> 上热门 <i class="iconfont">&#xe630;</i> 就用<span class="f-fwb">粉丝盒</span> </h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    components: {
    },
    data() {
      return {
        integral: '',  // 积分
        userInfo: {}
      }
    },
    methods: {
      getUserInfo () {
        this.$axios.$get(`/api/user/info `).then((res) => {
          if (res.code == 200) {
            let userInfo = JSON.stringify(res.data)
            localStorage.setItem('userInfo', userInfo)
            this.userInfo = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      signOut () {
        sessionStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.$message.success("退出成功")
        setTimeout(() => {
          location.replace('/login')
        }, 500)
      },
      goRecharge () {
        location.href = "/recharge"
      }
    },
    mounted () {
      this.getUserInfo()
    }
  }
</script>
<style lang="less">
  .header{
    background-color: #172099;
    height: 95px;
    line-height: 95px;
    color: #fff;
    font-size: 20px;
    margin-bottom: 25px;
    .right{
      .item{
        float: left;
      }
    }
    .logo{
      margin-top: -8px;
      margin-right: 8px;
      display: inline-block;
      width: 54px;
      height: 40px;
      background-image: url('../static/image/samll_logo.png');
      background-size: cover;
    }
  }
</style>
