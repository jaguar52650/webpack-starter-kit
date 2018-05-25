let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebPackPlugin = require("html-webpack-plugin");
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,'./dist/'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay:true
    },
    // optimization: {
    //     minimize: false
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude:'/node_modules/'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     loader: ['style-loader','css-loader']
            // },
            // {
            //     test: /\.s?css$/,
            //     use: ['style-loader','css-loader','sass-loader']
            // },
            // {
            //     test: /\.s?css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback:"style-loader",
            //         use: [
            //             "css-loader"
            //             ,'sass-loader'
            //         ]
            //     })
            // },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader :'postcss-loader',
                            options:{
                                plugins:(loader) => [
                                    require('autoprefixer')({
                                        browsers:['last 2 versions','ie > 8']
                                    }),
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
        ]
    },
    plugins:[
        new ExtractTextPlugin("css/style.css"),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        // new UglifyJsPlugin({
        //     minimize: false,
        //     compress: false
        // })
    ]
    // devtool: 'eval-sourcemap'

};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    // conf.devtool = production
    //                 ? false
    //                 : 'eval-sourcemap';
    conf.devtool = production
        ? 'source-map'
        : 'eval-sourcemap';


    return conf;
}