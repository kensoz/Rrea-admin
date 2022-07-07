# 🔵 Rrea-Admin

![Coverage](https://img.shields.io/badge/Coverage-95%25-84CC16.svg?style=flat-square)  ![npm](https://img.shields.io/badge/npm-v0.3.0-84CC16.svg?style=flat-square)  ![License](https://img.shields.io/badge/License-MIT-0284C7.svg?logo=&style=flat-square)

Demo:  **[Client]() | [Admin]()**  ・  GitHub:   **[Server](https://github.com/kensoz/Rrea-server) | [Client](https://github.com/kensoz/Rrea-client) | [Client-Collection](https://github.com/kensoz/Rrea-client-collection)**

##### Rrea-Admin とは

メンバー位置と情報の管理システムの管理者用サイト(Admin)です。\
[APIサーバ(Server)](https://github.com/kensoz/Rrea-server)、[メンバー用サイト(Client)](https://github.com/kensoz/Rrea-client)、管理者用サイト(Admin)にFEとBEを分けている仕組みです。\
JSフレームワークはVue.js、UIライブラリはPrimeVueを選定し、構築しました。

##### メイン機能

+ ユーザー認証&権限システム、JWT認証、パスワード暗号化
+ レスポンシブ対応
+ ダークモード、テーマシステム
+ データのCRUD
+ Jestによる自動テスト、PurgeCSSによる使っていない CSS を削除



## スタック

+ ⚡️ Vue.js 3 (Composition API)
+ ⚙️ TypeScript
+ 🎨 PrimeVue  + SASS
+ 📑 Eslint + Prettier
+ 🏭 Vite
+ 📦 Yarn
+ 🔺 RESTful API



## 使用

##### インストール

```bash
yarn install
```

##### 開発

[http://localhost:3001](http://localhost:3001)で起動

```bash
yarn dev
```

##### ビルド

```bash
yarn build
```



## 資料

+ [エラーコード対照表](https://github.com/kensoz/Rrea-server/blob/master/docs/error.md)
