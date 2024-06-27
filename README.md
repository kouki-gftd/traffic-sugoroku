## 交通すごろくゲーム
このアプリケーションは移動手段の選択によってそれにより引き起こされる渋滞や大量のCo2排出などについて考えるきっかけをあたえることを目的として作られた交通シミュレーションアプリです。

## 概要
交通すごろくゲームは、プレイヤーが移動手段（車、公共交通機関）を選択し、その選択が交通状況や環境に与える影響を体験できるゲームです。

## 使用技術
**プログラミング言語**: TypeScript  

**フレームワーク**: React, Next.js  

**データベース**: SQLite  

**その他**: TailwindCSS

## インストール方法
リポジトリをクローンします。  
git@github.com:kouki-gftd/traffic-sugoroku.git

ディレクトリに移動し、依存関係のインストールを行う。  
cd  traffic-sugoroku  
npm install  

## 使用方法
アプリケーションを起動します。  
npm run dev

ブラウザで http://localhost:3000/register にアクセスします。  
register画面でキャラクターの名前を入力します。  
![register画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/register.png)


Create New Room画面でゲームモードを選び、Nextボタンを押します。
(簡易版のため現在はBasic Modeのみ)  
![create-new-room画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/create-new-room.png)


room画面でプレイする都市と公共交通機関に関する設定を選びます。  
(簡易版のためいずれも未実装)  
設定完了後にGAME STARTボタンをクリックしてゲーム開始です。
![create-new-room画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/room.png)
