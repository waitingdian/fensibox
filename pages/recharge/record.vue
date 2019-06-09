<template>
  <div class="order">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <p class="p-t-25 f-fwb p-b-10">充值记录 <i class="el-icon-arrow-right"></i></p>
      <no-ssr>
        <el-form :inline="true" :model="searchForm" label-width="80px">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="searchForm.periodStart"
              :picker-options="startTimeOptions"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="searchForm.periodEnd"
              :picker-options="endTimeOptions"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <!--<br>-->
          <!--<el-form-item label="订单号">-->
            <!--<el-input v-model="searchForm.number" placeholder="请输入订单号"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="支付单号">-->
            <!--<el-input v-model="searchForm.payId" placeholder="请输入支付单号"></el-input>-->
          <!--</el-form-item>-->
          <!--<br>-->
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.status" placeholder="请选择订单状态">
              <el-option v-for="item in typeList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f-fr p-r-50">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          class="p-t-10"
          :data="tableData"
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额/元"
            width="110">
          </el-table-column>
          <el-table-column
            prop="deposit_type"
            label="支付方式">
            <template slot-scope="scope">
              <span v-for="item in paymentList" v-if="item.value === scope.row.deposit_type">{{ item.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="90"
            prop="address"
            label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0" type="success">成功</el-tag>
              <el-tag v-if="scope.row.status===1" type="success">失败</el-tag>
              <!--<span v-for="item in typeList" v-if="item.value === scope.row.status">{{ item.name }}</span>-->
            </template>
          </el-table-column>
          <el-table-column
            width="180px"
            prop="created_time"
            label="创建时间">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            class="f-tac p-t-25 p-b-20"
            background
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
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
          {title: '充值记录', link: ''},
        ],
        typeList: [
          {name: '全部',value: ''},
          {name: '成功',value: 1},
          {name: '失败',value: 0}
        ],
        paymentList: [
          {name: "支付宝扫码", value: 1},
          {name: "微信支付", value: 2}
        ],
        searchForm: {
          status: '',
          periodStart: '',
          periodEnd: '',
        },
        tableData: [],
        pageInfo: {
          current: 0,
          pageSize: 20,
          total: 0
        },
        loading: false
      }
    },
    methods: {
      handleCurrentChange () {
        this.pageInfo.current = val
        this.getList()
      },
      getList () {
        let periodStart = ''
        if (this.searchForm.periodStart) {
          periodStart = this.format(this.searchForm.periodStart, "yyyy-MM-dd hh:mm:ss")
        }
        let periodEnd = ''
        if (this.searchForm.periodEnd) {
          periodEnd = this.format(this.searchForm.periodEnd, "yyyy-MM-dd hh:mm:ss")
        }
        let queryString = `limit=${this.pageInfo.pageSize}&offset=${this.pageInfo.current}&status=${this.searchForm.status}&period_start=${periodStart}&period_end=${periodEnd}`
        this.loading = true
        this.$axios.$get(`${this.$store.state.baseUrl}deposit/list?${queryString}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.tableData = res.data.items || []
            this.pageInfo.total = res.data.page.cur_page
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
      startTimeOptions(){
        // 训练营开始时间
        return{
          disabledDate:(time)=>{
            //今天之前的时间不能作为起始时间
            let disabledDate = new Date(this.searchForm.periodEnd);
            return time.getTime() > disabledDate.getTime()
          }
        }
      },
      endTimeOptions(){
        // 训练营结束时间
        return{
          disabledDate:(time)=>{
            //今天之前的时间不能作为起始时间
            let disabledDate = new Date(this.searchForm.periodStart);
            return time.getTime() < disabledDate.getTime();
          }
        }
      }
    }
  }
</script>
<style lang="less">
  .order{
    background-color: #fff;
    .content{
      padding-left: 35px;
    }
    .el-input{
      width: 240px;
    }
  }
</style>
