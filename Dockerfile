# ----- Rrea-admin -----
# イメージ指定
FROM node:18.0.0

# 作者指定
LABEL maintainer="renhou"

# ワークスペース指定
WORKDIR /usr/src/Rrea-admin

# package.jsonとyarn.lockコピー
COPY ["dist", "./"]

# インストール
# RUN yarn

# ファイルコピー
COPY . .

# ビルド
# RUN yarn build

# 次のイメージ指定
FROM nginx:latest

# コンテナ内のビルドしたdistフォルダをnginxへコピー
COPY --from=0 /usr/src/Rrea-admin/dist/ /usr/share/nginx/html/

# nginxコンフィグファイルコピー
COPY default.conf /etc/nginx/conf.d/default.conf