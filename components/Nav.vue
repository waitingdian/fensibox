<template>
  <div class="nav">
    <p>
      <a :href="item.link ? item.link : 'javascript:;'"
         v-for="(item,index) in navs">
        {{ item.title }}
        <i v-if="index < navs.length -1" class="el-icon-arrow-right"></i>
      </a>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'login',
    props: {
      navs: {
        type: Array,
        default: []
      }
    },
    components: {
    },
    data() {
      return {}
    },
    methods: {},
    mounted () {
    }
  }
</script>
<style lang="less">
  .nav {
    p {
      padding: 15px 20px;
      border-bottom: 1px solid #172099;
      font-size: 18px;
      background-color: #fff;
      a{
        color: #222;
      }
    }
  }
</style>
