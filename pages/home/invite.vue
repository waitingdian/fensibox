<template>
  <div class="invite">
    <Nav :navs="navs"></Nav>
    <div class="content">
      <no-ssr>
        <div>
          <el-button @click="show='invite'" :class="{'fsh-f-c': show == 'invite'}" plain>推广链接 <i class="el-icon-arrow-right el-icon-arrow-right"></i></el-button>
          <el-button @click="show='detail'" :class="{'fsh-f-c': show == 'detail'}" plain>我邀请的好友 <i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
        <div v-show="show =='detail'" class="link">
          <el-table
            class="p-t-10"
            :data="tableData"
            v-loading="loading"
            style="width: 100%">
            <el-table-column
              prop="username"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="time"
              label="创建时间">
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
        </div>
        <div class="detail" v-show="show =='invite'">
          <p class="p-t-30">以下链接是您的推广链接，你可以通过微信，QQ，微博等平台进行推广，通过该链接访问的人，注册后都属于您的用户
            您将获得丰厚的奖励</p>
          <p class="p-t-25 f-fwb p-b-10">推广链接 <i class="el-icon-arrow-right"></i></p>
          <el-input style="width: 520px" v-model="inviteLink"></el-input>
          <div class="p-t-10 p-b-50">
            <el-button type="primary" @click="copyUrl">点击复制</el-button>
          </div>
          <p>推广10个好友注册充值，即可获得一年<span class="fsh-f-c f-fs16">VIP会员</span>资格</p>
        </div>
      </no-ssr>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'invite',
    components: {
      Nav
    },
    data() {
      return {
        navs: [
          {title: '邀请有礼', link: ''}
        ],
        loading: false,
        show: 'invite',
        tableData: [],
        pageInfo: {
          current: 0,
          pageSize: 20,
          total: 0
        },
        userInfo: {}
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.pageInfo.current = val
      },
      getInviteList () {
        this.loading = true
        let queryString = `limit=${this.pageInfo.pageSize}&offset=${this.pageInfo.current}`
        this.$axios.$get(`${this.$store.state.baseUrl}user/inviteList?${queryString}`).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.tableData = res.data.items || []
            this.pageInfo.total = res.data.page.total_row
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      copyUrl () {
        var text = this.inviteLink;
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
      }
    },
    mounted () {
      this.getInviteList()
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo = userInfo
    },
    computed: {
      inviteLink () {
        return `http://fensibox.com/login?user_invite_code=${this.userInfo.id}`
      }
    }
  }
</script>
<style lang="less">
  .invite{
    background-color: #fff;
    .content{
      padding: 30px 95px;
    }
    .detail{
      color: #333;
      padding-bottom: 90px;
    }
  }
</style>
