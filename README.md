# YS Web Application Boilerplate

## !重要

- DatePicker、TimePicker、Calendar组件需要从 `src/components/YSDatePicker/` 目录引入，直接引入antd组件会出现dayjs的兼容性bug，原因参照 [Antd 官方文档相关说明](https://ant.design/docs/react/replace-moment-cn)。
- 字符串需提取到 `/public/locales/zh/{moduleName}.json` 文件中，并通过 `react-i18next` 库相关方法引入，可参考 `src/components/Demo` 组件写法，详情参照 `react-i18next` 文档。

## Technology Stack

- react：based on `create-react-app`
- typescript
- ant-design
- styled-component
- react-i18next

## Project Catalog

- public：图标、导出配置、js文件引入
  - config.js 导出配置文件
  - locales 国际化配置文件
- src
  - api：api索引
  - assets：代码中使用的静态资源如图片、语音等
  - components：组件
    - 公共组件名称以 `YS` 开头
  - configs：项目配置：路由、菜单等
  - models：实体Interface或Types
  - pages：独立页面
  - utils：工具类

## Tips

### 状态管理

推荐使用Hooks进行状态管理：

- 组件/模块内部状态：useState、useReducer
- 全局状态：useContext

### i18n/国际化

- [react-i18next 官方文档](https://react.i18next.com/)
- 将所有字符串放入 `/public/locales/{lngName}/{moduleName}.json`
- 开发期间或无国际化要求的项目可只写中文
- 基本Hooks用法参考 `src/components/Demo/DemoTable.tsx` 

### 样式

- 推荐：采用css-in-js方案，使用 `styled-components` 实现
  - 将公共样式封装为独立的Styled组件
  - `src/components`目录下以“YS”开头的组件为内置的公共组件，大多是对ant-design进行较为松散的定制
- 也可采用CSS Module方案
