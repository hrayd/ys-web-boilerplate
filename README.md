# 前端项目初始化框架

## 技术栈

基于 `create-react-app` 创建

- react
- typescript
- ant-design
- styled-component

## 项目目录

- public：图标、导出配置、js文件引入
- src
  - api：api索引
  - assets：代码中使用的静态资源如图片、语音等
  - components：组件
  - configs：项目配置
  - models：实体Interface或Type
  - pages：独立页面
  - utils：工具类

## 开发Tips

### 状态管理

推荐使用Hooks进行状态管理：

- 组件/模块内部状态：useState、useReducer
- 全局状态：useContext

### 样式

- 推荐：采用css-in-js方案，使用 `styled-components` 实现
  - 将公共样式封装为独立的Styled组件
  - 已内置了 `Container`、`Table`、`Search`组件
- 也可采用CSS Module方案