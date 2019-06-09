<template>
  <div class="task">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <div>
        <div class="left f-pr">
          <no-ssr>
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
              <p class="p-t-25 f-fwb p-b-10">选择平台 <i class="el-icon-arrow-right"></i></p>
              <el-form-item label="选择平台">
                <el-select v-model="form.platform" @change="choosePlatform" placeholder="请选择平台">
                  <el-option v-for="item in productList"
                             :key="item.gid"
                             :label="item.name"
                             :value="item.gid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </no-ssr>
        </div>
        <div class="right">
          <p class="f-fs18 p-b-10">用户信息</p>
          <p class="p-l-35 p-t-10" style="line-height: 3">用户名: {{ userInfo.username }}</p>
          <p class="p-l-35" style="line-height: 3">用户等级:
            <span v-if="userInfo.role == 0">普通用户</span>
            <span v-if="userInfo.role == 1">会员</span>
          </p>
          <p class="p-l-35" style="line-height: 3">可用积分: {{ userInfo.credit }}积分</p>
        </div>
      </div>
      <div class="p-t-30 p-l-15">
        <!--左下-->
        <div class="bot-left f-pr">
          <p class="f-fs18 p-b-20">商品信息</p>
          <p class="p-b-15">商品编号: {{ detailInfo.gid }}</p>
          <p class="p-b-15">单价: {{ detailInfo.price }}积分</p>
          <p class="p-b-15">会员单价: {{ detailInfo.member_price }}积分</p>
        </div>
        <!--右下-->
        <div class="bot-right p-l-40">
          <p class="f-fs18 p-b-20">下单</p>
          <no-ssr>
            <el-form ref="orderForm"
                     :model="orderForm"
                     label-width="110px"
                     v-loading="loading"
                     size="mini">
              <el-form-item v-for="(item,index) in orderForm.labels"
                            :label="item.name"
                            :key="item.id"
                            :prop="'labels.' + index + '.value'"
                            :rules="{required: true, message: '请输入', trigger: 'blur'}">
                <el-input v-model="item.value"
                          :placeholder="item.palceholder">
                </el-input>
              </el-form-item>
              <el-form-item label="下单数量">
                <el-input-number v-model="orderForm.count"
                                 @change="changeCount"
                                 :step="detailInfo.rate"
                                 :min="orderForm.limitMin"
                                 :max="orderForm.limitMax"
                                 label="描述文字">
                </el-input-number>
              </el-form-item>
              <el-form-item label="总计" class="m-b-5">
                  <span style="color: #ccc;" class="f-fs12 p-l-15">{{ totalPrice }} 积分</span>
              </el-form-item>
              <el-form-item label="会员总计">
                  <span class="member-price">{{ vipTotalPrice }} 积分</span>
              </el-form-item>
              <div class="f-tac">
                <el-button style="width: 60%" @click="submitForm('orderForm')" type="primary">下单</el-button>
              </div>
            </el-form>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'login',
    components: {
      Nav
    },
    data() {
      return {
        navs: [
          {title: '发布任务', link: ''}
        ],
        loading: false,
        productList: [],
        form: {
          platform: ''
        },
        orderForm: {
          count: 0,
          labels: []
        },
        limit: 500,   // 当前页数不分页默认写了500
        detailInfo: {
          labels: []
        },
        userInfo: {}
      }
    },
    methods: {
      changeCount(value) {
        if (value < this.orderForm.limitMin) {
          this.$message.error(`下单数量无效,不能小于${this.orderForm.limitMin}`)
        }
        if (value > this.orderForm.limitMax) {
          this.$message.error(`下单数量无效,不能大于${this.orderForm.limitMax}`)
        }
        if(value && value % this.detailInfo.rate!=0){
          this.$message.error(`下单数量无效,请输入${this.detailInfo.rate}的倍数`)
        }
      },
      getProductList () {
        this.$axios.$get(`${this.$store.state.baseUrl}product/list?limit=${this.limit}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.productList = res.data.items
            this.form.platform = res.data.items[0].gid
            this.getProductDetail(this.form.platform)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      choosePlatform () {
        this.getProductDetail(this.form.platform)
      },
      getProductDetail (id) {
        this.loading = true
        this.$axios.$get(`${this.$store.state.baseUrl}product/detail/${id}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            let labels = []
            res.data.inputs.forEach((item) => {
              let obj = {value: '', name: item[0], palceholder:item[1], id: item[2]}
              labels.push(obj)
            })
            this.orderForm.labels = labels
            this.detailInfo = res.data
            this.orderForm.count = res.data.limit_min
            this.orderForm.limitMin = res.data.limit_min
            this.orderForm.limitMax = res.data.limit_max

          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.orderForm.count <= 0) {
              this.$message.error('下单数量无效,请重选输入')
              return false
            }
            if(this.orderForm.count && this.orderForm.count % this.detailInfo.rate!=0){
              this.$message.error(`下单数量无效,请输入${this.detailInfo.rate}的倍数`)
              return false
            }
            let inputs = this.orderForm.labels.map((item) => {
              return item.value
            })
            let params = {gid: this.form.platform, num: this.orderForm.count, inputs: inputs}
            this.confimBox(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addOrder (params) {
        this.loading = true
        this.$axios.$post(`${this.$store.state.baseUrl}order/add`, params).then((res) => {
          this.loading = false
          if (res.code == 200) {
            location.href='/order'
            // this.$router.push('/order')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      confimBox (params) {
        let text = this.$createElement('div', {
          domProps: {
            // 商品名称 下单数量 消耗积分 会员消耗积分
            innerHTML: `<p class="p-l-15">视频ID: ${this.form.platform}</p>
                        <p class="p-l-15">下单数量: ${this.orderForm.count}</p>
                        <p class="p-l-15">消耗积分: ${this.totalPrice}</p>
                        <p class="p-l-15">会员消耗积分: ${this.vipTotalPrice}</p>`
          }
        })
        this.$confirm(text, '您的下单信息为', {
          type: 'none',
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          this.addOrder(params)
        })
      }
    },
    mounted () {
      this.getProductList()
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    computed: {
      totalPrice (){
        return (this.orderForm.count * (this.detailInfo.price*1000000))/1000000
      },
      vipTotalPrice (){
        return (this.orderForm.count * (this.detailInfo.member_price*1000000))/1000000
      }
    }
  }
</script>
<style lang="less">
  .task{
    background-color: #fff;
    .content{
      padding:0px 32px 26px 32px;
      color: #222;
      >div{
        display: flex;
      }
      .left{
        width: 412px;
        height: 290px;
        border-bottom: 1px dotted #8d8b8c;
      }
      .left,.bot-left{
        &:after{
          position: absolute;
          top: 35px;
          right: 0;
          content: '';
          width: 1px;
          height: 220px;
          background-color: #d6d6d6;
        }
      }
      .right{
        width: 420px;
        height: 290px;
        padding: 35px 45px;
        line-height: 1.5;
        border-bottom: 1px dotted #8d8b8c;
      }
      .bot-left{
        width: 397px;
        line-height: 1.5;
      }
      .bot-right{
        width: 405px;
      }
      .member-price{
        color: #ff0000;
      }
    }
  }
</style>
