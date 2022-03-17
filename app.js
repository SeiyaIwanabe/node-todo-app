const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
app.use(express.json()); // 重要
app.use(express.static('./public'));

const PORT = 3000;

// ルーティング設計
app.use('/api/v1/tasks', taskRoute);

// データベース連携（非同期で行う）
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log('server is running'));
    } catch (err) {
        console.log(errr);
    }
};

start();
