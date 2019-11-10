# papyrus

Vue-cli@3.4.1
https://noumenon-th.net/programming/2019/02/15/vue-cli-3/

セットアップ(package系)
https://gyazo.com/e4c2b39bd3dd8a9c314cd636c5712295

セットアップ(electron)
https://qiita.com/jshindo/items/910db55f93c0c4c00727




# ディレクトリ構成 

├── src 
│    ├──App.vue  
│    ├──components 
│    │        ├──globals (どこにでも共通して使うもの:header,footer,navigationなど)  
│    │        ├──pages (ページとして使うもの。ここにpartsを入れていく:loginPageなど)  
│    │        └──parts (パーツとして使うもの:ボタンやリストなど)  
│    ├──assets (画像やデータなどを保管する場所)  
│    ├── main.js (Vueオブジェクトの定義)  
│      ├── background.js (electron自体の設定:windowの幅など)    
│      ├── store  
│      │      └── index.js (Vuex)  
│      └── router  
│            └── index.js(Routerの登録)  
├── node_modules(plugin:vuex,routerなど の直接的な管理を行う。消したらそのpluginを使っていた部分は動かなくなるが、package.jsonに記述されているものなら │     復元可能)  
└── package.json (pluginのバーズジョンの管理などを行う。npm installを行うとこれを元にnode_modulesがインストールされていく)  


他にもたくさんあるけどここら辺わかってれば大丈夫  
(随時更新)  
