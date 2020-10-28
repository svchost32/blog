 # Prepare
 > npm i express mongoose

---
 ## 路由
 | 路径 | 方法 | get | post | 是否需要登陆 | 备注 |
 | :----: | :----: | :----: | :----: | :----: | :----: |
 | / | Get | | | | 渲染首页|
 | /register | Get| | | | 注册页
 | /register|post||emal,name,password||处理注册请求
 | /login|get||||渲染登录
 |/login|post||emal,password||处理登录请求
 |/logout|get||||退出

 # 测试一下github的该动