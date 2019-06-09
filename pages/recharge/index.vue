<template>
  <div class="recharge">
    <Nav :navs="navs"></Nav>
    <div class="p-t-30 p-l-35">
      <p class="p-b-20">用户名: {{ userInfo.username }}</p>
      <p class="p-b-50">当前积分: {{ userInfo.credit }}</p>
    </div>
    <div class="content">
      <iframe src="./pay/cspay.html" style="width: 100%;height: 360px" frameborder="0"></iframe>
      <!--<iframe src="" frameborder="0"></iframe>-->
      <!--<div id="qrcode" class="qrcode m-r-35">-->
        <!--<img v-if="qrcodeObj" src="qrcodeObj" alt="">-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<p class="f-fwb p-b-15 f-tal">充值说明及规则</p>-->
        <!--<div>-->
          <!--<p>第一步：扫码后直接输入您想要充值的金额</p>-->
          <!--<p>第二步：支付宝充值备注填写xxxxx 未填写则不到账</p>-->
          <!--<p>第三步：扫码后等待自动到账</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'

  export default {
    name: 'detail',
    components: {
      Nav
    },
    data() {
      return {
        navs: [
          {title: '充值中心', link: ''},
        ],
        userInfo: {},
        userName: '哈哈哈',
        integral: 666,
        qrcodeObj: {}, // 二维码配置
      }
    },
    methods: {
      // qrcode() {
      //   this.qrcodeObj = new QRCode('qrcode', {
      //     width: 132,
      //     height: 132,
      //     text: 'http://pic.58pic.com/58pic/13/16/16/19V58PICnbg_1024.jpg', // 二维码地址
      //     colorDark : "#000",
      //     colorLight : "#fff",
      //   })
      //   console.log(55555555555)
      //   console.log(this.qrcodeObj)
      // },
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // setTimeout(()=> {
      //   this.qrcode()
      // },5000)
    }
  }
</script>
<style lang="less">
  .recharge {
    background-color: #fff;
    color: #222;
    .content {
      padding: 0px 50px 130px 80px;
      display: flex;
      .qrcode {
        border: 1px solid #172099;
        width: 245px;
        height: 245px;
      }
      .right {
        width: 360px;
        padding-top: 65px;
        text-align: center;
        div {
          text-align: left;
          line-height: 2;
        }
      }
    }
  }
</style>
