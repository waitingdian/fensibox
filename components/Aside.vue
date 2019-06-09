<template>
  <div class="aside f-fl">
    <div class="meuns">
      <div class="item" v-for="item in menuList" :key="item.name">
        <!--<span class="menu f-db">-->
          <!--&lt;!&ndash;<nuxt-link :to="item.link">item.name</nuxt-link>&ndash;&gt;-->
          <!--&lt;!&ndash; <a @click="goPath(item.link)" :class="{'fsh-f-gold': $route.path.indexOf(item.link)!=-1}">{{ item.name }}{{item.show}}</a></span> &ndash;&gt;-->
          <!--<a :class="{'fsh-f-gold': $route.path.indexOf(item.link)!=-1}" :href="item.link">{{ item.name }}{{item.show}}</a></span>-->
            <!--<div v-show="item.show" class="children" v-for="childMenu in item.children">-->
          <!--<a :class="{'fsh-f-c': $route.path.indexOf(childMenu.link)!=-1}" :href="childMenu.link || 'javascript:;'">{{ childMenu.name }}</a>-->
        <!--</div>-->
        <span class="menu f-db">
          <a :href="item.link || 'javascript:;'" :class="{'fsh-f-gold': true}">{{ item.name }}</a>
        </span>
        <div class="children" v-show="$route.path.indexOf(item.link)!=-1" v-for="(childMenu,childIndex) in item.children">
          <i class="link" v-if="childIndex < item.children.length-1"></i>
          <a :href="childMenu.link || 'javascript:;'" :class="{'active': $route.path == childMenu.link}">{{ childMenu.name }}</a>
        </div>
      </div>
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
        menuList: [
          {
            name: '首页', link: '/home',show: false,
            children: [
              {
                name: '个人中心', link: '/home'
              },
              {
                name: '邀请有礼', link: '/home/invite'
              }
            ]
          },
          {
            name: '任务中心', link: '/task',show: false,
            children: [
              {
                name: '发布任务', link: '/task'
              }
            ]
          },
          {
            name: '订单中心', link: '/order',show: false,
            children: [
              {
                name: '我的订单', link: '/order'
              }
            ]
          },
          {
            name: '积分管理', link: '/recharge',show: false,
            children: [
              {
                name: '充值中心', link: '/recharge'
              },
              {
                name: '充值记录', link: '/recharge/record'
              }
            ]
          }
        ]
      }
    },
    methods: {
      goPath (link) {
        console.log(link)
        if (!link) {
          return false
        }
        link = link.toString()
        this.$router.push({path: link})
      }
    },
    mounted () {
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          console.log(val.params);
          Object.assign(this.routeParams, val.params)
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>
<style lang="less">
  .aside{
    width: 270px;
    overflow: hidden;
    .meuns{
      a {
        display: block;
      }
      .menu,.children {
        background-color: #172099;
        width: 270px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 18px;
        a{
          color: #fff;
        }
      }
      .children {
        background-color: #fff;
        /*border-bottom: 1px dotted #172099;*/
        position: relative;
        i.link {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-image: linear-gradient(to right, #172099 0%, #ccc 50%, transparent 50%);
          background-size: 8px 1px;
          background-repeat: repeat-x;
        }
        a{
          color: #222;
          &:hover{
            color: #172099;
          }
          &.active{
            color: #172099;
          }
        }
        &:last-child{
          border-bottom: none;
        }
      }
      .item {
        margin-bottom: 3px;
      }
    }
  }
</style>
