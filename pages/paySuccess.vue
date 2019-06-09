<template>
  <div class="pay-success">
    <Nav :navs="navs"></Nav>
    <div class="content p-l-35">
      <p class="p-t-25 f-fwb p-b-10">充值成功 <i class="el-icon-arrow-right"></i></p>
      <div class="wrap">
        <el-button class="m-r-10" @click="goRecord">充值完成</el-button>
        <span class="f-csp ewm-container" @mouseenter="showEwm = true" @mouseleave="showEwm = false">充值遇到问题?
          <div class="ewm" v-show="showEwm">
            <img src="~/static/image/weixin.jpg" alt="微信客服">
            <p class="fsh-f-c">请联系客服帮您解决</p>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'record',
    components: {
      Nav
    },
    data() {
      return {
        navs: [
          {title: '充值成功', link: ''},
        ],
        showEwm: false
      }
    },
    methods: {
      goRecord () {
        location.href = '/recharge/record'
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
  .pay-success{
    height: 560px;
    background-color: #fff;
    .wrap{
      padding: 100px 0;
      text-align: center;
    }
    .ewm-container{
      display: inline-block;
      padding: 10px;
      position: relative;
      .ewm{
        position: absolute;
        bottom: -90px;
        right: -176px;
        margin-left: -80px;
        width: 170px;
        height: 180px;
        z-index: 1000;
        border: 1px solid #D5D5D5;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.20);
        background-color: #fff;
        border-radius: 4px;
        img {
          width: 150px;
          height: 150px;
          padding-top: 12px;
        }
        &:before{
          position: absolute;
          left: -20px;
          bottom: 115px;
          margin-left: 0px;
          content: '';
          border: 10px solid transparent;
          border-right-color: #ccc;
        }
        &:after{
          position: absolute;
          left: -16px;
          bottom: 117px;
          margin-left: 0;
          content: '';
          border: 8px solid transparent;
          border-right-color: #fff;
        }
      }
    }
  }
</style>
