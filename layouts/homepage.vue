<template>
  <div>
    <nuxt/>
  </div>
</template>
<script>
  import Header from '@/components/Header'
  import Aside from '@/components/Aside'
  export default {
    name: 'homepage',
    components: {
      Header,
      Aside
    },
    data() {
      return {
      }
    },
    methods: {},
    mounted () {
    }
  }
</script>
<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
</style>
