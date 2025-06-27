const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// 安全设置
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

let connection = null;

// 数据库连接路由
app.post('/api/connect', async (req, res) => {
    try {
        const { host, port, username, password, database } = req.body;

        // 如果已有连接，先关闭
        if (connection) {
            await connection.end();
        }

        // 创建新连接
        connection = await mysql.createConnection({
            host,
            port: parseInt(port),
            user: username,
            password,
            database
        });

        await connection.connect();
        res.json({ message: '连接成功' });
    } catch (error) {
        console.error('数据库连接错误:', error);
        res.status(500).json({ error: `数据库连接失败: ${error.message}` });
    }
});

// 执行查询路由
app.post('/api/query', async (req, res) => {
    try {
        if (!connection) {
            return res.status(400).json({ error: '未连接到数据库' });
        }

        const { query } = req.body;
        
        // 执行查询
        const [results] = await connection.execute(query);
        res.json(results);
    } catch (error) {
        console.error('查询执行错误:', error);
        res.status(500).json({ error: `查询执行失败: ${error.message}` });
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const DOMAIN = process.env.DOMAIN || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`服务器运行在 http://${HOST}:${PORT}`);
    console.log(`本地访问: http://localhost:${PORT}`);
    console.log(`域名访问: http://${DOMAIN}`);
}); 