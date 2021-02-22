const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#A70000' },
            javascriptEnabled: true,
          },
        },
      },
    },
    { plugin: new AntdDayjsWebpackPlugin() },
  ],
};
