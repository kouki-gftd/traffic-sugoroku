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

一番下のSTATS欄に表示されているのが参加しているプレイヤーです。  
上記に表示されている番号が地名を表しています。  
このゲームの目的は他のプレイヤーより先にゴールし、かつできるだけCO₂排出量を少なく抑えることです。  
そのため同順位でゴールした場合はCO₂排出量が少ないプレイヤーが優先して繰り上がるルールとなっています。  
![create-new-room画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/game-play.png)


ゲームが始まると画面上に自動でこのような選択画面が表示されます。  
プレイヤーはCARカードかPUBLIC TRANSPORTカードのどちらかを選びながらゴールを目指すことになります。  
CARカードは他のプレイヤーが出したカードによって進むマス数が変化するカードで出されたCARカードが少ない分、多くマス数を進めることが出来ます。  
逆にCARカードが多く選ばれてしまった時は進めるマス数が少なくなってしまいます。  
また、CARカードを選んだ場合のみCO₂排出量の値が高くなります。  
これはゲームの進行状況によっては順位に影響を及ぼす値ですので覚えておいてください。  
PUBLIC TRANSPORTカードは常に一定のマス数を進むカードです。  
CARカードのように他のカードの影響を受けず、CO₂排出量もありません。  
![create-new-room画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/card-selection.png)


ゲーム終了後に自動的にgame finished画面へと移ります。  
ここではプレイヤーの順位と選択したカードの履歴、CO₂排出量が表示されます。  
![create-new-room画面](https://github.com/kouki-gftd/traffic-sugoroku/raw/develop/public/images/game-finish.png)
