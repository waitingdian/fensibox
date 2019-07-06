<template>
  <div class="task">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <div>
        <div class="left f-pr">
          <no-ssr>
            <el-form ref="form" @submit.native.prevent :inline="true" :model="form" label-width="100px">
              <p class="p-t-25 f-fwb p-b-50">选择项目 <i class="el-icon-arrow-right"></i></p>
              <el-form-item label="选择项目" style="padding-top: 30px;">
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
        <div class="right p-l-10 p-r-10">
          <el-form ref="douyinForm"
                   @submit.native.prevent
                   :model="douyinForm"
                   label-width="100px"
                   v-loading="searchLoading"
                   size="mini">
            <el-form-item label="抖音视频链接">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="douyinForm.dylink" placeholder="请填写抖音视频链接"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="getDyspInfo" type="primary">查询</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="视频ID">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="douyinForm.dyId" placeholder="抖音视频ID" disabled></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="copyUrl(douyinForm.dyId)">复制</el-button>
                </el-col>
              </el-row>
              <!--<template>{{ douyinForm.dyId }}</template>-->
            </el-form-item>
            <el-form-item label="快手视频链接">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="douyinForm.kslink" placeholder="请填写快手视频链接"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="getKsspInfo" type="primary">查询</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="快手ID">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="douyinForm.ksId" placeholder="快手视频ID" disabled></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="copyUrl(douyinForm.ksId)">复制</el-button>
                </el-col>
              </el-row>
              <!--<template>{{ douyinForm.ksId }}</template>-->
            </el-form-item>
            <el-form-item label="作品ID">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="douyinForm.ksPro" placeholder="快手作品ID" disabled></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="copyUrl(douyinForm.ksPro)">复制</el-button>
                </el-col>
              </el-row>
              <!--<template>{{ douyinForm.ksPro }}</template>-->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="p-t-30">
        <!--左下-->
        <div class="bot-left f-pr">
          <p class="f-fs18 p-b-15">商品信息</p>
          <p class="p-l-35 p-b-15">商品编号: {{ detailInfo.gid }}</p>
          <p class="p-l-35 p-b-15">用户等级:
            <span v-if="userInfo.role == 0">普通用户</span>
            <span v-if="userInfo.role == 1">会员</span>
          </p>
          <p class="p-l-35 p-b-15">可用积分: {{ userInfo.credit }}积分</p>
          <p class="p-b-15 p-l-35">单价: {{ detailInfo.price }}积分</p>
          <p class="p-b-15 p-l-35">会员单价: {{ detailInfo.member_price }}积分</p>
        </div>
        <!--右下-->
        <div class="bot-right p-l-40">
          <p class="f-fs18 p-b-20">下单</p>
          <no-ssr>
            <el-form @submit.native.prevent ref="orderForm"
                     :model="orderForm"
                     label-width="100px"
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
        douyinForm: {
          dylink: '',
          dyId: '',
          kslink: '',
          ksId: '',
          ksPro: ''
        },
        limit: 500,   // 当前页数不分页默认写了500
        detailInfo: {
          labels: []
        },
        userInfo: {},
        searchLoading: false
      }
    },
    methods: {
      copyUrl (url) {
        if (!url) {
          this.$message.error('请先搜索后再复制')
          return false
        }
        var text = url;
        var textareaEle = document.createElement('input');
        textareaEle.style.fontSize = '12pt';
        textareaEle.style.border = '0';
        textareaEle.style.padding = '0';
        textareaEle.style.margin = '0';
        textareaEle.style.position = 'absolute';
        textareaEle.style['right'] = '-9999px';
        var yPosition = window.pageYOffset || document.documentElement.scrollTop;
        textareaEle.style.top = yPosition + 'px';
        textareaEle.setAttribute('readonly', '');
        textareaEle.value = text;
        document.body.appendChild(textareaEle);
        textareaEle.select();
        textareaEle.setSelectionRange(0, textareaEle.value.length);
        var succeeded = document.execCommand('copy');
        if (succeeded) {
          this.$message({
            type: 'success',
            message: '复制成功!'
          });
        } else {
          this.$message({
            type: 'info',
            message: '复制失败，请手动输入以上网址'
          });
        }
        document.body.removeChild(textareaEle);
      },
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
            this.$confirm('下单成功', '温馨提示', {
              confirmButtonText: '前往订单列表',
              cancelButtonText: '继续下单',
              type: 'success'
            }).then(() => {
              location.href = '/order'
            }).catch(() => {
            });
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      getDyspInfo () {
        if(!this.douyinForm.dylink) {
          this.$message.error("请输入抖音链接后查询")
          return false
        }
        this.searchLoading = true
        this.$axios.$get(`${this.$store.state.baseUrl}product/getDyspInfo?url=${this.douyinForm.dylink}`).then((res) => {
          this.searchLoading = false
          if (res.code == 200) {
            this.douyinForm.dyId = res.data.dyId
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.searchLoading = false
        })
      },
      getKsspInfo () {
        if(!this.douyinForm.kslink) {
          this.$message.error("请输入快手链接后查询")
          return false
        }
        this.searchLoading = true
        this.$axios.$get(`${this.$store.state.baseUrl}product/getKsspInfo?url=${this.douyinForm.kslink}`).then((res) => {
          this.searchLoading = false
          if (res.code == 200) {
            this.douyinForm.ksId = res.data.videoid
            this.douyinForm.ksPro = res.data.authorid
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.searchLoading = false
        })
      },
      confimBox (params) {
        let str = ''
        this.orderForm.labels.forEach((item) => {
          str += `<p class="p-l-15">${item.name}: ${item.value}</p>`
        })
        let text = this.$createElement('div', {
          domProps: {
            // 商品名称 下单数量 消耗积分 会员消耗积分
            innerHTML: `${str}
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
      },
      operation(a, b, digits, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
          case 'add':
            if (t1 === t2) { // 两个小数位数相同
              result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
              result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
              result = n1 * (t2 / t1) + n2
            }
            return result / max
          case 'subtract':
            if (t1 === t2) {
              result = n1 - n2
            } else if (t1 > t2) {
              result = n1 - n2 * (t1 / t2)
            } else {
              result = n1 * (t2 / t1) - n2
            }
            return result / max
          case 'multiply':
            result = (n1 * n2) / (t1 * t2)
            return result
          case 'divide':
            result = (n1 / n2) * (t2 / t1)
            return result
        }
      }
      },
    mounted () {
      this.getProductList()
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    computed: {
      totalPrice (){
        let price = 0
        if (this.detailInfo && this.detailInfo.price) {
          var dotPos = this.detailInfo.price.indexOf('.')
          var len = this.detailInfo.price.substr(dotPos+1).length
          len = len
          var times  = Math.pow(10, len)
          price = (this.orderForm.count * (this.detailInfo.price * times))/times
          price = price.toFixed(5)
        }
        return price
      },
      vipTotalPrice (){
        let price = 0
        if (this.detailInfo && this.detailInfo.member_price) {
          var dotPos = this.detailInfo.member_price.indexOf('.')
          var len = this.detailInfo.member_price.substr(dotPos+1).length
          len = len
          var times  = Math.pow(10, len)
          price = (this.orderForm.count * (this.detailInfo.member_price * times))/times
          price = price.toFixed(5)
        }
        return price
        // return ((this.orderForm.count * this.detailInfo.member_price)*1000000)/1000000
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
        width: 397px;
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
