<template>
  <div class="login">
    <nav>
      <div class="container-1200">
        <i class="logo"></i>
        <!--<h1>上热门 <i class="iconfont">&#xe630;</i> 就用 <span class="f-fwb">粉丝盒</span> </h1>-->
      </div>
    </nav>
    <section class="f-pr">
      <div class="banner">
        <no-ssr>
          <el-carousel height="400px" trigger="click">
            <el-carousel-item v-for="item in carouselList" :key="item.id">
              <div style="width: 100%;height: 100%;background-size: cover; background-position: center center;" :style="{'background-image':`url(${item.url})`}"></div>
              <!--<img :src="item.url" alt="">-->
            </el-carousel-item>
          </el-carousel>
        </no-ssr>
      </div>
      <div class="login-container" v-loading="loading">
        <h2 class="f-tac fsh-f-222 f-fs32 f-fwb">欢迎登陆</h2>
        <ul>
          <el-form>
            <li>
              <span class="f-fs16 label">账号</span>
              <input type="text"
                     @change="phoneError=''"
                     maxlength="11"
                     v-model="loginForm.userName"
                     autocomplete="off"
                     @keyup.enter="login"
                     placeholder="请输入绑定手机号">
              <p class="error-txt" v-show="phoneError">{{ phoneError }}</p>
            </li>
            <li>
              <span class="f-fs16 label">密码</span>
              <input type="password" @keyup.enter="login" autocomplete="new-password" @change="passError=''" maxlength="16" v-model="loginForm.passWord" placeholder="请输入登录密码">
              <p class="error-txt" v-show="passError" >{{ passError }}</p>
            </li>
          </el-form>
          <p class="p-t-25 clearfix">

            <span class="forget f-fr">
              <nuxt-link to='/forget'>忘记密码?</nuxt-link>
            </span>
          </p>
          <no-ssr>
            <el-button style="width: 100%;margin-top:40px;" @click="login" type="primary">登录</el-button>
          </no-ssr>
          <p class="p-t-20 f-tar">没有账号?
            <nuxt-link to='/register'><span class="fsh-f-c f-csp iconfont"> 立即注册 <span class="f-fs12">&#xe70b;</span></span></nuxt-link>
          </p>
        </ul>
      </div>
      <article class="article1 f-tac p-t-60 p-b-70">
        <div class="container">
          <h2 class="f-fs28">我们的优势</h2>
          <p class="m-t-15">OUR ADVANTAGE</p>
          <no-ssr>
            <el-row style="margin-top: 95px;":gutter="12">
              <el-col :span="8" class="f-pr" >
                <div class="grid-content bg-purple">
                  <i class="circle">01</i>
                  <h5 class="f-fs-20 fsh-f-c f-tac p-b-10">如何精准提高人气</h5>
                  <ul>
                    <li><i class="iconfont">&#xe630;</i>全网独家人气递增系统</li>
                    <li><i class="iconfont">&#xe630;</i>多天人气要求一次轻松搞定</li>
                    <li><i class="iconfont">&#xe630;</i>给予最优质的人气反馈模型</li>
                    <li><i class="iconfont">&#xe630;</i>保证了整个产品关注,加购的完整增幅曲线</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="8" class="f-pr" >
                <div class="grid-content bg-purple">
                  <i class="circle">02</i>
                  <h5 class="fsh-f-c f-tac p-b-10 f-fs-20">如何保证人气分真实有效</h5>
                  <ul>
                    <li><i class="iconfont">&#xe630;</i>所有流量均为带账号浏览的优质流量</li>
                    <li><i class="iconfont">&#xe630;</i>且账号使用度不高</li>
                    <li><i class="iconfont">&#xe630;</i>规避京东系统共性稽查</li>
                    <li><i class="iconfont">&#xe630;</i>配合京东魔盒查权重</li>
                    <li><i class="iconfont">&#xe630;</i>实时查询人气分权重的变化情况</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="8" class="f-pr">
                <div class="grid-content bg-purple">
                  <i class="circle">03</i>
                  <h5 class="fsh-f-c f-tac p-b-10 f-fs-20">如何保证流量的真实有效性</h5>
                  <ul>
                    <li><i class="iconfont">&#xe630;</i>系统会根据行业大盘进行计算给商家推送相应的计划</li>
                    <li><i class="iconfont">&#xe630;</i>从浏览行为、浏览时长、关注商品、关注店铺、加入购物车、提交订单、的每一步都会随机分配</li>
                    <li><i class="iconfont">&#xe630;</i>让系统稽查毫无共性可言</li>
                    <li></li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </no-ssr>
        </div>
      </article>
      <article class="article2 f-tac">
        <div class="container">
          <h2 class="f-fs28">我们更加出色</h2>
          <p class="m-t-15">WE ARE BEETTER</p>
          <div class="wrap" style="padding-top: 70px">
            <div class="left m-r-40">
              <h5 class="p-t-50 f-fs26" style="padding-bottom: 70px">递增功能</h5>
              <p>人气分真实性</p>
              <p>流量真实性</p>
              <p>会员制度</p>
              <p>新增人群画像</p>
            </div>
            <div class="center m-r-40">
              <h5 class="f-fs26 p-t-15 p-b-20"><i class="iconfont">&#xe630;</i>本平台<i class="iconfont">&#xe630;</i></h5>
              <p class="p-t-15"><span class="fsh-f-gold">全网独家流量递增功能</span>解放你的大脑
                <br />
                让工作更加高效
              </p>
              <p class="p-t-15">可结合<span class="fsh-f-gold">京东魔盒</span>进行数据支持
                <br />
                实时监测<span>人气分增长</span>
              </p>
              <p>均为<span class="fsh-f-gold">带账号流量</span>且对每个流量的每种
                <br />
                行为进行随机<span class="fsh-f-gold">分配处理</span>
              </p>
              <p>会员采用<span class="fsh-f-gold">积分形式</span>
                <br />
                可以<span class="fsh-f-gold">多次使用</span>
              </p>
              <p>会员采用<span class="fsh-f-gold">人群画像</span>
                <br />
                可以<span class="fsh-f-gold">精准定位</span>
              </p>
            </div>
            <div class="right">
              <h5 class="f-fs26 p-t-15 p-b-20"><i class="iconfont">&#xe630;</i>其他平台<i class="iconfont">&#xe630;</i></h5>
              <p>无此功能</p>
              <p>无此功能</p>
              <p class="f-tal">无账号,通过点击链接直接进入商品,无搜索反馈分</p>
              <p class="p-t-30">无明显会员体制且稳定性不强</p>
              <p class="p-t-35">无此功能</p>
            </div>
          </div>
        </div>
      </article>
    </section>
    <footer class="f-tac">
      <div class="top p-t-35">
        <span class="f-ib f-vam">客服中心</span>
        <span class="line f-ib f-vam iconfont">&#xe63a;</span>
        <span class="f-ib f-vam f-pr" @mouseenter="showEwm = true" @mouseleave="showEwm = false">
         <img src="~/static/image/weixin.jpg" alt="人气大师任务平台">
          <div class="ewm" v-show="showEwm">
            <img src="~/static/image/weixin.jpg" alt="">
            <p class="fsh-f-c p-t-5">扫一扫添加</p>
          </div>
        </span>
      </div>
      <p class="p-t-30">人气大师任务平台 备案号: 豫ICP备19017313号</p>
    </footer>
  </div>
</template>
<script>
  export default {
    layout (context) {
      return 'homepage'
    },
    name: 'login',
    components: {
    },
    data() {
      return {
        carouselList: [
          {id: 1, url: require('../static/image/login_banner1.jpg')},
          {id: 2, url: require('../static/image/login_banner2.png')}
        ],
        errorUser: {
          text: ''
        },
        errorPass: {
          text: ''
        },
        loginForm: {
          userName: '',
          passWord: ''
        },
        showEwm: false,
        loading: false,
        phoneError: '',
        passError: ''
      }
    },
    methods: {
      getParams() {
        return {
          username: this.loginForm.userName,
          password: this.loginForm.passWord
        }
      },
      login () {
        if (!this.loginForm.userName || this.loginForm.userName.length != 11) {
          this.phoneError = '请输入正确用户名'
          return false
        }
        if (!this.loginForm.passWord) {
          this.passError = '请输入密码'
          return false
        }
        if (this.loginForm.passWord.length < 6) {
          this.passError = '请输入6-16位密码'
          return false
        }
        this.loading = true
        this.$axios.$post(`${this.$store.state.baseUrl}login `,this.getParams()).then((res) => {
          this.loading = false
          if (res.code == 200) {
            location.replace('/home')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
  .login{
    .el-carousel__item{
      img{
        height: 100%;
      }
    }
    nav{
      height: 60px;
      background-color: #fff;
      line-height: 60px;
      overflow: hidden;
      .logo{
        display: block;
        width: 237px;
        height: 40px;
        background-image: url('../static/image/logo.png');
        background-size: cover;
        margin-top: 8px;
      }
    }
    section{
      .login-container{
        position: absolute;
        z-index: 2;
        top: 20px;
        right: 10%;
        padding: 35px;
        width: 420px;
        height: 412px;
        border-radius: 4px;
        box-shadow: 1px 1px 1px #f8f8f8;
        background-color: #fff;
        .label{
          display: inline-block;
          min-width: 45px;
        }
        li{
          position: relative;
          padding: 18px 10px 15px 0;
          border-bottom: 1px solid #ecebeb;
          input{
            width: 280px;
            border: none;
            outline: none;
            padding: 10px 30px;
          }
        }
      }
      .banner{
        img{
          width: 100%;
          display: block;
        }
      }
    }
    article {
      &.article1{
        background-color: #e9eef2;
        .container {
          width: 1105px;
          margin: 0 auto;
          padding-top: 60px;
          padding-bottom: 70px;
        }
        .grid-content{
          border-radius: 4px;
          background-color: #fff;
          padding: 70px 20px 0 30px;
          height: 290px;
          .circle{
            position: absolute;
            left: 50%;
            top: 0px;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 100%;
            background-color: #3944d5;
            border: 10px solid #858cf0;
            color: #fff;
            font-size: 40px;
            line-height: 80px;
          }
          h5{
            font-size: 20px;
          }
          li {
            line-height: 28px;
            font-size: 14px;
            text-align: left;
          }
        }
      }
      &.article2 {
        color: #fff;
        background-color: #071339;
        .container{
          width: 1150px;
          margin: 0 auto;
          padding-top: 80px;
          height: 800px;
        }
        .wrap{
          display: flex;
          .left{
            width: 268px;
            height: 479px;
            background: url('../static/image/article2_left.jpg');
            p{
              line-height: 82px;
            }
          }
          .center{
            width: 428px;
            height: 479px;
            padding-left: 35px;
            background: url('../static/image/article2_center.jpg');
            p {
              font-size: 18px;
              text-align: left;
              padding: 18px 0 23px;
            }
          }
          .center,.right{
            p {
              height: 78px;
              line-height: 1.5;
            }
            .fsh-f-gold{
              color: #ffde00;
            }
          }
          .right{
            width: 268px;
            height: 479px;
            padding-left: 20px;
            padding-right: 20px;
            background: url('../static/image/article2_right.jpg');
            p {
              padding: 23px 0 25px;
            }
          }
        }
      }
    }
    footer {
      height: 210px;
      background-color: #172099;
      color: #fff;
      .line{
        display: inline-block;
        font-size: 30px;
        font-weight: 200;
        padding: 0 25px 0 35px;
      }
      img {
        width: 85px;
        height: 85px;
      }
      .ewm{
        position: absolute;
        bottom: 0;
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
          bottom: 34px;
          margin-left: 0px;
          content: '';
          border: 10px solid transparent;
          border-right-color: #ccc;
        }
        &:after{
          position: absolute;
          left: -16px;
          bottom: 36px;
          margin-left: 0;
          content: '';
          border: 8px solid transparent;
          border-right-color: #fff;
        }
      }
    }
  }
</style>
