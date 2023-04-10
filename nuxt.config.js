export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ycta_cp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap'}
    ]
  },
  server: {
    host: process.env.NUXT_HOST,
    port: process.env.NUXT_PORT,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'css/general'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Главная',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue'),
        title: 'Главная'
      })
      routes.push({
        name: 'Фильтры',
        path: '/filters',
        component: resolve(__dirname, 'pages/Filters.vue'),
        title: 'Фильтры'
      })
      routes.push({
        name: 'Категории',
        path: '/categories',
        component: resolve(__dirname, 'pages/Categories.vue'),
        title: 'Категории'
      })
      routes.push({
        name: 'Подкатегории',
        path: '/subcategories',
        component: resolve(__dirname, 'pages/Subcategories.vue'),
        title: 'Подкатегории'
      })
      routes.push({
        name: 'Товары',
        path: '/products',
        component: resolve(__dirname, 'pages/Products.vue'),
        title: 'Товары'
      })
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
