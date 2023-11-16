const express = require("express");
const axios = require('axios');

const app = express();

const request = require('request');
const fs = require('fs');


// app.use(express.static("public"));
// app.use(logger);

// expressで用意されているテンプレートエンジン
app.set("view engine", "ejs");

app.get('/', async (req, res) => {


    // var request = require("request");
    // var fs = require("fs");

    // request({
    //     method: "POST",
    //     url: "https://techhk.aoscdn.com/api/tasks/visual/segmentation",
    //     headers: {
    //     "X-API-KEY": "wx9sjlg1796km3kfm"
    //     },
    //     formData: {
    //     sync: "1",
    //     image_file: fs.readFileSync("uploads/1700030491687.jpg"),
    //     }
    // }, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    // });

    // try {
    //     const apiResponse = await makeApiRequest();

    //     console.log(apiResponse);

    //     res.render('index', { text: 'こんにちは' });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    // }

    

    res.render('index', { text: 'こんにちは' });

});

app.get('/uploads/1700030491687.jpg', (req, res) => {
    const imagePath = path.join(__dirname, 'uploads', '1700030491687.jpg');
    res.sendFile(imagePath);
    res.setHeader('Content-Type', 'image/jpeg');
  });

async function makeApiRequest() {
    const imagePath = path.join(__dirname, 'views', 'source', 'ore.jpg');
    const imageContent = fs.readFileSync(imagePath);
    const API_KEY = 'wx9sjlg1796km3kfm';

    // axiosを使用して非同期にAPIリクエストを行う
    const response = await axios.post('/uploads/1700030491687.jpg', imageContent, {
        headers: {
            'Content-Type': 'image/jpeg',
            'X-API-KEY': API_KEY,
        },
        params: {
            sync: '1',
        },
    });

    return response.data;
}

app.get("/source/menu.html", (req, res) => {
    res.sendFile(__dirname + "/views/source/menu.html");
  });

app.get("/source/top.html", (req, res) => {
    res.sendFile(__dirname + "/views/source/top.html");
  });

app.listen(3000, console.log("サーバーが起動しました"));





const multer = require('multer'); // ファイルアップロードのためのミドルウェア
const path = require('path');


// ファイル保存先の設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 保存先のディレクトリを指定
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // ファイル名を一意にする
    },
});

const upload = multer({ storage });

// アップロードされた画像を保存するエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
    // ファイルがアップロードされた後の処理
    res.send('File uploaded!');
});