# MySQL数据库连接器

这是一个简单的Web应用程序，用于连接MySQL数据库并执行SQL查询。

## 功能特点

- 支持连接到MySQL数据库（包括本地和远程数据库）
- 简洁美观的用户界面
- 实时连接状态显示
- SQL查询编辑器
- 查询结果表格显示
- 错误处理和提示

## 部署方式

### 1. 本地开发环境部署

1. 确保已安装Node.js（版本 >= 14）

2. 克隆项目后，在项目目录中运行：
   ```bash
   npm install
   ```

3. 启动服务器：
   ```bash
   npm start
   ```

4. 在浏览器中访问：
   ```
   http://localhost:3000
   ```

### 2. 生产环境部署

1. 服务器要求：
   - Node.js 环境（版本 >= 14）
   - 稳定的网络连接
   - 建议使用 NGINX 或 Apache 作为反向代理

2. 部署步骤：
   ```bash
   # 克隆项目
   git clone [项目地址]
   
   # 安装依赖
   npm install --production
   
   # 设置环境变量（可选）
   export PORT=3000  # 设置运行端口
   
   # 使用PM2等进程管理器启动（推荐）
   pm2 start server.js --name mysql-connector
   ```

3. 配置反向代理（推荐）：
   - 使用NGINX配置示例：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 使用说明

1. 在连接表单中填写数据库连接信息：
   - 主机地址：
     * 本地数据库使用 `localhost`
     * 远程数据库使用对应的服务器地址
     * 阿里云RDS示例：`rm-uf6xxxxx.mysql.rds.aliyuncs.com`
   - 端口：默认为 3306
   - 用户名：具有适当权限的数据库用户
   - 密码：对应用户的密码
   - 数据库名称：要连接的数据库名

2. 点击"连接数据库"按钮

3. 连接成功后，在查询编辑器中输入SQL语句
   示例查询：
   ```sql
   SELECT * FROM users LIMIT 10;
   SHOW TABLES;
   DESCRIBE table_name;
   ```

4. 点击"执行查询"按钮查看结果

## 安全注意事项

1. 数据库安全：
   - 建议使用只读账号进行查询操作
   - 限制数据库用户的权限范围
   - 定期更新数据库密码
   - 使用防火墙限制数据库访问IP

2. 应用安全：
   - 在生产环境中使用HTTPS
   - 配置适当的CSP (Content Security Policy)
   - 启用日志记录以追踪操作
   - 定期更新依赖包版本

3. 服务器安全：
   - 及时更新服务器系统
   - 配置防火墙规则
   - 使用反向代理保护应用
   - 启用DDoS防护

## 问题排查

如果遇到连接问题，请检查：

1. 数据库连接信息是否正确：
   - 主机地址和端口是否准确
   - 用户名和密码是否正确
   - 数据库名称是否存在

2. 网络连接：
   - 确保服务器可以访问数据库
   - 检查防火墙设置
   - 验证网络连接是否稳定

3. 权限问题：
   - 确认数据库用户有足够权限
   - 检查数据库是否允许远程连接
   - 验证连接字符串格式

4. 常见错误：
   - "Access denied"：检查用户名密码
   - "Host not allowed"：检查IP白名单
   - "Connection refused"：检查端口是否开放

## 技术支持

如遇到问题：
1. 检查控制台错误信息
2. 查看服务器日志
3. 提交Issue获取帮助

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 后端：Node.js, Express
- 数据库：MySQL
- 样式框架：Bootstrap 5
- 图标：Boxicons 