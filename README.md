## 安装本地开发工具 create-react-app

$ npm install -g create-react-app

$ create-react-app my-app

$ cd my-app

$ npm start

### 进入目录 删除 src 目录下的文件，这里是我们开发环境 rm -rf src/*

 - 在src目录下新建 index.js , index.css 文件夹
 
 - index.js 是入口文件,index.css是样式文件，npm start 会自动加载这两个文件到public首页

 - npm build 会打包 src 和 public 目录下文件 到build
 