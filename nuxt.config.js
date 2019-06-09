const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/index.less',
    'element-ui/lib/theme-chalk/index.css'
  ],
  script: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/axios', ssr: false },
    { src:'@/plugins/tool', ssr:false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'prev') ? "" : "http://192.168.24.51:20230/",
    withCredentials: true,
    proxy: process.env.NODE_ENV !== 'production'
  },
  proxy: {
    '/api/': {
      target: 'http://47.105.221.99:8081/', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' //将 /api 替换掉
      }
    }
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/error/404.vue')
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
