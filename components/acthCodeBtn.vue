<template>
  <no-ssr>
    <el-button v-text="text"
               @click="btnClick"
               class="border-btn"
               :disabled="disabled"></el-button>
  </no-ssr>
</template>

<script>
  export default {
    name: 'authcode-btn',
    data () {
      return {
        text: '获取验证码',
        second: this.maxSecond,
        intervalIndex: null
      }
    },
    props: {
      maxSecond: {
        type: Number,
        default: 60
      },
      phone: {
        type: String,
        default: ''
      }
    },
    computed: {
      disabled () {
        return !this.phone || !this.phone.match(/^1[345789]{1}[0-9]{9}$/) || !!this.intervalIndex
      }
    },
    methods: {
      isGotCode () {
        return this.text !== '获取验证码';
      },
      btnClick () {
        // 倒计时读秒
        this.$emit('click', this.phone, is => {
          if (is) {
            setTimeout(() => {
              this.endTime(true);
            }, 0);
          }
        })
        this.$el.disabled = true
        this.text = this.second + 's'
        this.intervalIndex = setInterval(() => {
          if (this.second === 0) {
            this.endTime();
            return
          }
          this.second--
          this.text = this.second + 's'
        }, 1000)
      },
      endTime (isNew) {
        clearInterval(this.intervalIndex)
        this.intervalIndex = null
        this.$el.disabled = false
        this.text = (isNew) ? '获取验证码' : '重新获取';
        this.second = this.maxSecond
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .border-btn {
    margin-left: 6px;
    min-width: 102px;
  }
</style>
