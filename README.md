# 課程系統

## 開始

將程式 clone 下來:

```bash
git clone https://github.com/www991024/project.git
```

在 server 底下建立.env 加入下列兩行 並連接 mongoDB Atlas :

```bash
mongodb+srv://<account>:<password>@cluster0.u4hsmrt.mongodb.net/?retryWrites=true&w=majority&appName=<DBname>
PASSPORT_SECRET=THISISTOPSECRET
```

## 用法

分別將 client 與 server 的 node_modules 下載下來

```bash
開啟終端機
cd project/SERVER
cd project/client
分別執行npm install
```

開啟 server

```bash
cd project/SERVER
nodemon app.js
```

開啟 client

```bash
cd project/client
npm start
```
