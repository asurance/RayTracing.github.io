import Merge from 'webpack-merge'
import BaseConfig from './webpack.base.config'
import { Configuration } from 'webpack'
import { resolve } from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config = {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve(__dirname, '../doc')
    }
} as Configuration

export default Merge(BaseConfig, config)