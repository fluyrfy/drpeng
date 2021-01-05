import axios from 'axios'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '彭博士知識地圖',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100&display=swap' }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML'
      }
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
    '~/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-loading-overlay'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    /*
    ** add dev and prod env to control api path
    ** Doc: https://github.com/nuxt-community/dotenv-module/issues/59
    */
    [
      '@nuxtjs/dotenv',
      {
        filename: process.env.ENV === 'dev' ? '.env' : '.env.' + process.env.ENV
      }
    ]
  ],
  /*
  ** vuetify settings
  */
  vuetify: {
    treeShake: true,
    defaultAssets: false,
    customVariables: ['~/assets/scss/_variables.scss'],
    optionsPath: './vuetify.option.js'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // eslint
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    interval: 1000,
    async routes () { // dynamic route to generate subject page
      const subject = await axios.get(`${process.env.BASE_API_URL_GENERATE}subject/?status=true&ordering=-order`)

      const subjectRoute = subject.data.map((item) => {
        return `/subject/${item.id}`
      })

      const sectionList = subject.data.map((item) => {
        return `/subject/${item.id}/section`
      })

      const routeList = [...subjectRoute, ...sectionList]

      return routeList
    }
  }
}
