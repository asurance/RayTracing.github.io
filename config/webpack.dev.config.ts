import Merge from 'webpack-merge'
import BaseConfig from './webpack.base.config'
import { Configuration } from 'webpack'

const config = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
    }
} as Configuration

export default Merge(BaseConfig, config)