module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                prependData: `@import "@/styles/global.scss";`
            },
        }
    }
}
