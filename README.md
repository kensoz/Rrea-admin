# 🔵 Rrea-Admin

![Node](https://img.shields.io/badge/Node.js-v18.0.0-fb7185.svg?logo=&style=flat-square)  ![Coverage](https://img.shields.io/badge/Coverage-89.45%25-84CC16.svg?style=flat-square)  ![npm](https://img.shields.io/badge/npm-v0.3.0-84CC16.svg?style=flat-square)  ![License](https://img.shields.io/badge/License-MIT-0284C7.svg?logo=&style=flat-square)

Demo:  **[Client](http://rrea-client.live) | [Admin](http://rrea-admin.live)**  ・  GitHub:   **[Server](https://github.com/kensoz/Rrea-server) | [Client](https://github.com/kensoz/Rrea-client) | [Client-Collection](https://github.com/kensoz/Rrea-client-collection)**

##### Rrea-Admin とは

メンバー位置と情報の管理システムの管理者用サイト(Admin)です。\
[APIサーバ(Server)](https://github.com/kensoz/Rrea-server)、[メンバー用サイト(Client)](https://github.com/kensoz/Rrea-client)、管理者用サイト(Admin)にFEとBEを分けている仕組みです。\
JSフレームワークはVue.js、UIライブラリはPrimeVueを選定し、構築しました。

##### メイン機能

+ ユーザー認証&権限システム、JWT認証、パスワード暗号化
+ レスポンシブ対応
+ ダークモード、テーマシステム
+ データのCRUD
+ Vitest、Vue-Test-Utilsによる自動テスト、PurgeCSSによる使っていない CSS を削除



## スタック

+ ⚡️ Vue.js 3 (Composition API)
+ ⚙️ TypeScript
+ 🎨 PrimeVue  + SASS
+ 📑 Eslint + Prettier
+ 🔌 Vitest + Vue-Test-Utils（Coverage : **89.45%**）
+ 🏭 Vite
+ 📦 Yarn
+ 🔺 RESTful API



## システムアーキテクチャー

![system](https://s2.loli.net/2022/07/15/62gMpWGVUJ3RPLs.jpg)



## ブラウザ対応

ChromeとEdgeのおすすめです！ \
✅：Stable  ・  ⚠：Unstable  ・  ❌：Not supported

|         | Chrome | Edge | Safari 10+ |  IE  | Firefox |
| :-----: | :----: | :--: | :--------: | :--: | :-----: |
| desktop |   ✅    |  ✅   |     ✅      |  ❌   |    ⚠    |
| mobile  |   ✅    |  ✅   |     ✅      |  ❌   |    ✅    |
| tablet  |   ✅    |  ✅   |     ✅      |  ❌   |    ⚠    |



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

##### テスト

```bash
yarn test
```



## 資料

+ [エラーコード対照表](https://github.com/kensoz/Rrea-server/blob/master/docs/error.md)
