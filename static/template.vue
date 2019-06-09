<template>
  <div class="login">
    <Nav :title="title"></Nav>
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
        title: ''
      }
    },
    methods: {},
    mounted () {
    }
  }
</script>
<style lang="less">
</style>
