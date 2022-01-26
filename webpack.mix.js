const mix = require('laravel-mix');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const notifier = require('node-notifier');


//Assets path
const assetsPath = 'assets';
const publicPath = 'assets';
const paths = {
    src: {
        vendorCss: [
            './node_modules/normalize.css/normalize.css',
            './node_modules/swiper/css/swiper.min.css',
            './node_modules/ion-rangeslider/css/ion.rangeSlider.min.css',
            './node_modules/overlayscrollbars/css/OverlayScrollbars.min.css',
            './node_modules/ilyabirman-likely/release/likely.css',
            './node_modules/bootstrap-star-rating/css/star-rating.min.css',
            './node_modules/nouislider/distribute/nouislider.min.css',
            './node_modules/flatpickr/dist/flatpickr.min.css'
        ],
        appJs: [
            `${assetsPath}/js/app.js`,
        ],
        watch: [
            `${assetsPath}/app.min.css`,
            `${assetsPath}/svg.min.svg`,
            `${assetsPath}/app.min.js`,
        ],
        scss: `${assetsPath}/scss/import.scss`,
        css: [
            `${assetsPath}/scss/_vendor/fonts/*.css`,
            `${assetsPath}/scss/_vendor/*.css`
        ],
        svg: `${assetsPath}/images/icons/*.svg`
    },

    assets:{
        vendorCss: `${publicPath}/vendor.css`,
        vendorJs: `${publicPath}/vendor.js`,
        appCss: `${publicPath}/app.min.css`,
        appJs: `${publicPath}/app.min.js`,
        appJsBabel: `${publicPath}/app.babel.js`,
        svgCompiled: `/svg.min.html`
    }
};

//Livereloader options
const browserSyncOpt = {
    ui: false,
    open: false,
    files: paths.src.watch,
    injectChanges: true,
    // reloadDelay: 1500,
    notify: false
};

//Svg compile options
const svgOpt = {
    output: {
        filename: paths.assets.svgCompiled,
        svg4everybody: false,
        svgo: {
            removeTitle: true,
            removeDesc: true,
            removeStyleElement: true,
            cleanupNumericValue: true,
            removeDoctype: true,
            removeUselessDefs: true,
            removeMetadata: true,
            removeUselessStrokeAndFill: true,
            removeAttrs: {
                attrs: '.*:(fill|stroke):.*'
            },
            removeDimensions: true,
            removeViewBox: false
        },
    },
    sprite:{
        prefix: 'icon-',
        generate: {
            title: false,
        }
    }
};

// Main compile assets
mix.options({
        processCssUrls: false,
    })
    .setPublicPath(publicPath)
    .styles(paths.src.vendorCss, paths.assets.vendorCss)
    .sass(paths.src.scss, paths.assets.appCss)
    .js(paths.src.appJs, paths.assets.appJs)
    // .extract()
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery'],
        Popper: ['popper.js', 'default'],
    });

// Enable livereload and write souremap if dev
if (!mix.inProduction()){
    mix.sourceMaps()
        .webpackConfig({
            devtool: "inline-source-map"
        })
        .browserSync(browserSyncOpt)
        .disableSuccessNotifications();
}

// Extends webpack config
mix.webpackConfig({
    plugins: [
        // Set up the spritemap plugin
        new SVGSpritemapPlugin(paths.src.svg, svgOpt)
    ],
    module:{
        rules:[
            // Adapt laravel-mix webpack config to better handle svg images.
            {
                test: /\.(svg)$/,
                include: /assets\/svg/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'svg/[name].[ext]?[hash]',
                            publicPath: Config.resourceRoot
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: Config.imgLoaderOptions
                    }
                ]
            }
        ]
    },
    resolve: {
        // Aliases for import vendor
        alias: {
            'swiper': path.join(__dirname, 'node_modules/swiper/js/swiper.js')
        }
    }
});

// Catch all errors
// process.on('uncaughtException', (err) => {
//     // console.log(err);
//     console.log(err.name);
//     console.log(err.message);
//     notifier.notify({
//         title: `${err.name}`,
//         message: `Line: ${err.loc.line}; Column: ${err.loc.column}`
//     });
// });