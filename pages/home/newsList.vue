<template>
  <div class="news-page">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <p class="p-t-25 f-fwb p-b-10">公告列表 <i class="el-icon-arrow-right"></i></p>
      <no-ssr>
        <el-table
          class="p-t-10"
          :data="tableData"
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="title"
            label="公告标题"
            width="320">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            class="f-tac p-t-25 p-b-20"
            background
            layout="total, prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.size"
            @current-change = "handleCurrentChange">
          </el-pagination>
        </div>
      </no-ssr>
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
          {title: '公告列表', link: ''},
        ],
        tableData: [],
        pageInfo: {
          page: 1,
          size: 10,
          total: 0
        },
        loading: false
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.pageInfo.page = val
        this.getList()
      },
      getList () {
        this.loading = true
        let query = `?limit=${this.pageInfo.size}&offset=${this.pageInfo.size*(this.pageInfo.page-1)}`
        this.$axios.$get(`${this.$store.state.baseUrl}announcement/list${query}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.tableData = res.data.items
            this.pageInfo.total = res.data.page.total_row || 0
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      format(date, fmt) {
        var that = new Date(date)
        var o = {
          "M+" : that.getMonth()+1,                 //月份
          "d+" : that.getDate(),                    //日
          "h+" : that.getHours(),                   //小时
          "m+" : that.getMinutes(),                 //分
          "s+" : that.getSeconds(),                 //秒
          "q+" : Math.floor((that.getMonth()+3)/3), //季度
          "S"  : that.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt;
      }
    },
    mounted () {
      this.getList()
    },
    computed:{
    }
  }
</script>
<style lang="less">
  .news-page{
    background-color: #fff;
    .content{
      padding-left: 35px;
    }
  }
</style>
