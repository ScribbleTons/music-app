export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'musicapp',
        meta: [{
            charset: 'utf-8'
        }, {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }, {
            hid: 'description',
            name: 'description',
            content: ''
        }],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
        }],
        script: [{
            src: "https://use.fontawesome.com/7ac65a83b2.js"
        }]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@fortawesome/fontawesome-svg-core/styles.css'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [{
        src: '~/plugins/sweetalert'
    }, {
        src: '~/plugins/fontawesome.js'
    }, {
        src: '~/plugins/moment',
    }],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    //target
    // target: 'static',

    server: {
        port: 4000, // default: 3000
        host: 'localhost', // default: localhost,
        timing: false
    },

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/fontawesome',

    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: '/api/',
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '\[path\][name].ext'
                }
            });
        }
    },

    //server middleware
    serverMiddleware: {
        '/api': '~/api',
    }
}