# sameenblog-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```

## Structure
<pre>
│  .gitignore          # 忽略无需git控制的文件  比如 node_modules
│  .eslintrc.js        # 检查语法文件
│  package.json        # 项目配置
│  README.md           # 项目说明
│
│
├─node_modules
│
├─build
│     │  ...
│     │  webpack.base.config.js         # webpack 基础配置
│     │  webpack.dev.config.js          # webpack 开发配置
│     └─ webpack.prod.config.js         # webpack 生产配置
│
└─src
    │  App.vue         # 主vue
    │  main.js         # 启动配置
    │  index.html      # 首页
    │
    ├─components       # 组件
    │      IndexPage.vue
    │      ArticleDetail.vue
    │      ArticleItem.vue
    │      ArticleList.vue
    │      ...
    │
    ├─mock              #模拟数据
    │
    ├─server            #模拟服务器 以请求数据
    │
    ├─utils             #ajax方法
    │   │
    │   └─ajax.js
    │
    └─assets            #资源文件夹

</pre>


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
