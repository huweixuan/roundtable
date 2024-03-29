# 说明

本项目依赖truffle与react，搭配Ganache与MetaMask使用

## 安装truffle

```sh
$ npm install -g truffle
$ truffle unbox react
```

## 如果想自己创建项目，执行以下命令
```sh
$ npx truffle unbox react
```

## 编译合约

首先启动Ganache，打开MetaMask链接本地测试网络并用私钥导入生成的账号，然后在控制台执行以下命令

```sh
$ cd truffle
$ truffle compile
```

## 部署合约

```sh
$ truffle migrate
```

## 启动项目

```sh
$ cd ..
$ cd client
$ npm start
  Starting the development server...
```

## 代码目录

```sh
.
├── truffle
    ├── contracts
        └── Voting.sol // 合约
    └── migarations
        └── 2_deploy_voting.js // 合约部署
└── client // 前端代码
    └── src
        ├── components/Vote.jsx
        ├── contexts // 自动生成的中间件，依赖Web3.js
        ├── contracts
            └── Voting.json // 自动生成的合约json定义
        └── App.jsx
```
