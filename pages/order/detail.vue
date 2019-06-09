<template>
  <div class="order-detail">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <div class="left">
        <p>订单号: {{ detailInfo.oid }}</p>
        <p>下单数量: {{ detailInfo.num }}</p>
        <p>退单数量数量: {{ detailInfo.tnum }}</p>
        <p>状态: {{ detailInfo.status }}</p>
        <p>下单时间: {{ detailInfo.createdTime }}</p>
      </div>
      <div>
        <p>渠道名称: {{ detailInfo.oid }}</p>
        <p>视频ID: {{ detailInfo.id }}</p>
        <p>下单金额: {{ detailInfo.orderPrice }}</p>
        <p>当前数量: {{ detailInfo.nowNum }}</p>
        <p>初始数量: {{ detailInfo.startNum }}</p>
        <p v-show="detailInfo.remark">备注: {{ detailInfo.remark }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'orderdetail',
    components: {
      Nav
    },
    data() {
      return {
        navs: [
          {title: '我的订单', link: '/order/list'},
          {title: '订单详情', link: ''},
        ],
        typeList: [
          {name: '全部',value: 1},
          {name: '快手点赞',value: 2},
          {name: '抖音评论',value: 3}
        ],
        detailInfo: {}
      }
    },
    methods: {
      getOrderDetail (id) {
        this.loading = true
        this.$axios.$get(`${this.$store.state.baseUrl}order/detail/${id}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.detailInfo = res.data || {}
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    mounted () {
      this.getOrderDetail(this.$route.query.orderId)
    }
  }
</script>
<style lang="less">
  .order-detail{
    background-color: #fff;
    .content{
      padding: 50px 105px;
      display: flex;
      color: #222;
      p{
        padding-bottom: 35px;
      }
      .left{
        width: 320px;
      }
    }
  }
</style>
