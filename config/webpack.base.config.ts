import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

const config = {
    entry: resolve(__dirname, '../src/index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'RayTracing',
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
} as Configuration

export default config