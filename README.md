# ContiNew Admin UI

<a href="https://github.com/Charles7c/continew-admin-ui-arco/blob/dev/LICENSE" target="_blank">
<img src="https://img.shields.io/badge/License-Apache--2.0-blue.svg" alt="License" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui-arco" target="_blank">
<img src="https://img.shields.io/badge/RELEASE-v2.5.0-%23ff3f59.svg" alt="Release" />
</a>
<a href="https://cn.vuejs.org/" target="_blank">
<img src="https://img.shields.io/badge/Vue-3.3.7-%236CB52D.svg?logo=Vue.js" alt="Release" />
</a>
<a href="https://arco.design/vue/docs/start" target="_blank">
<img src="https://img.shields.io/badge/Arco Design-2.53.3-%236CB52D.svg" alt="Release" />
</a>
<a href="https://ts.nodejs.cn/" target="_blank">
<img src="https://img.shields.io/badge/TypeScript-5.3.3-%236CB52D.svg?logo=TypeScript&logoColor=FFF" alt="Release" />
</a>
<a href="https://cn.vitejs.dev/" target="_blank">
<img src="https://img.shields.io/badge/Vite-4.5.1-%236CB52D.svg?logo=Vite&logoColor=FFF" alt="Release" />
</a>
<a href="https://github.com/Charles7c/continew-admin" target="_blank">
<img src="https://img.shields.io/github/stars/Charles7c/continew-admin?style=social" alt="GitHub stars" />
</a>
<a href="https://github.com/Charles7c/continew-admin" target="_blank">
<img src="https://img.shields.io/github/forks/Charles7c/continew-admin?style=social" alt="GitHub forks" />
</a>
<a href="https://gitee.com/Charles7c/continew-admin" target="_blank">
<img src="https://gitee.com/Charles7c/continew-admin/badge/star.svg?theme=white" alt="Gitee stars" />
</a>
<a href="https://gitee.com/Charles7c/continew-admin" target="_blank">
<img src="https://gitee.com/Charles7c/continew-admin/badge/fork.svg?theme=white" alt="Gitee forks" />
</a>

📚 [在线文档](https://doc.charles7c.top) | 🚀 [演示地址](https://cnadmin.charles7c.top)（账号/密码：admin/admin123）

> 全新 3.0 已经发布，点击[前往](https://gitee.com/continew/continew-admin-ui)

## 简介

ContiNew Admin（Continue New Admin）持续迭代优化的前后端分离中后台管理系统框架。开箱即用，持续提供舒适的开发体验，依托开源协作模式，提升技术透明度、放大集体智慧、共创优秀实践，源源不断地为企业级项目开发提供助力。

当前采用的技术栈：Spring Boot3（Java17）、Vue3 & TS & Vite & Arco Design、Sa-Token、MyBatisPlus、Redisson、JetCache、JustAuth、Crane4j、EasyExcel、Liquibase、Hutool 等。

## 项目起源

我热衷于做数据归档，归档后的数据可以提高学习/工作效率，为记忆“减负”，在持续的数据归档中，优质的“沉淀”会带来非匀速、跨越式的学习/工作体验。**数据归档是一件需要持续去做的事情**。

从接触程序代码的第一天，我的程序数据归档也随之开始了，刷过的算法题、笔记、对接各种组件的配置文件，甚至于一些亮眼的样式设计、“如诗”的代码片段。这些数据的沉淀丰富了我的解决方案，提高了我的编程效率，逐渐为各种场景落实成了一个个雏形程序。再后来，我意识到，我归档的这些雏形程序，有一个更为妥贴的名称：**程序框架/脚手架**。

技术的发展，导致这些雏形程序的生命周期很是短暂，它们有别于我归档的其他数据，有时由于工作的原因，没有时间很好的去沉淀它们，在使用时变得越来越不顺手。所以，某段时间，我放弃了维护，而是去采用一些更为成熟的框架。

不过，在陆续几年使用了一些同类框架之后，我前后遇到了一些困难：

1. 想要找到一个扩展性佳，代码规范良好，开发体验舒适的框架很不容易，总是差些什么
2. 对于初始使用似乎过度设计，上手困难？或是功能不全，全在专业版（收费）？更甚者，代码阅读性差，文档还要收费
3. 好不容易找到一些相较合适的，没过“多久”，部分作者可能谈恋爱了，没法对外发“电”了
4. 提 PR 可能又和原作者理念不一致，对部分框架进行二开，但又会囿于原始设计
5. 在工作中，很多想法/设计受限于客户需求、开发工期，必须优先以交付为导向，想要依靠工作来完善一个脚手架，既不现实也不甚美妙

“种一棵树最好的时间是十年前，其次是现在”。最终，我选择自己在业余时间从头写一个试试，从添加每一个依赖开始，我希望它能持续的迭代优化、演进，所以我把它命名为 **ContiNew（Continue New）**。我希望它不仅仅能吸收我的需求，而是依托开源协作模式，接受更多的可能性，沉淀更优秀的思考，设计。另外，开源出来，如果能为更广泛的小伙伴提供舒适的开发体验那就更好了。

## 项目源码

|            | Gitee                                                                                     | GitHub                                                                             |
|------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| 前端         | [gitee.com/continew/continew-admin-ui-arco](https://gitee.com/continew/continew-admin-ui-arco) | [github.com/Charles7c/continew-admin-ui-arco](https://github.com/Charles7c/continew-admin-ui-arco-arco) |
| 后端         | [gitee.com/continew/continew-admin](https://gitee.com/continew/continew-admin)            | [github.com/Charles7c/continew-admin](https://github.com/Charles7c/continew-admin)     |
| **3.0 前端** | [gitee.com/continew/continew-admin-ui](https://gitee.com/continew/continew-admin-ui)      | [github.com/Charles7c/continew-admin-ui](https://github.com/Charles7c/continew-admin-ui-arco) |

##  系统功能

> **Note**
> 更多功能和优化正在赶来💦，最新项目计划、进展请进群或关注 [任务清单](https://doc.charles7c.top/admin/intro/require.html#任务清单) 和 [更新日志](https://doc.charles7c.top/admin/other/changelog.html)。

- 个人中心：支持基础信息修改、安全设置（密码修改、邮箱绑定、手机号绑定（并提供行为验证码、短信限流等安全处理）、第三方账号绑定/解绑）、头像裁剪上传、个人操作日志查看
- 用户管理：提供用户的相关配置，新增用户后，默认密码为 123456
- 部门管理：可配置系统组织架构，树形表格展示
- 角色管理：对权限与菜单进行分配，可根据部门设置角色的数据权限
- 菜单管理：已实现菜单动态路由，后端可配置化，支持多级菜单
- 公告管理：提供公告的发布、查看和删除等功能。管理员可以在后台发布公告，并可以设置公告的生效时间、终止时间，以 markdown-it 为内核渲染 Markdown 格式内容显示
- 消息管理：提供消息查看、标记已读、全部已读、删除等功能（适配对接导航栏站内信功能）
- 字典管理：提供对系统公用数据字典的维护，例如：公告类型，支持字典标签背景色和排序等配置
- 文件管理：提供文件上传、下载、预览（目前支持图片、音视频）、重命名、切换视图（列表、网格）等功能
- 存储库管理：提供文件存储库新增、编辑、删除、导出等功能
- 系统配置：提供修改系统标题、Logo、favicon 等基础配置功能，以方便用户系统与其自身品牌形象保持一致（暂未开放高级配置）
- 代码生成：提供根据数据库表自动生成相应的前后端 CRUD 代码的功能
- 在线用户：管理当前登录用户，可一键踢下线
- 日志管理：提供在线用户监控、登录日志监控、操作日志监控和系统日志监控等监控功能

## 系统截图

> [!TIP]
> 受篇幅长度及功能更新频率影响，下方仅为系统 **部分** 功能于 **2023年11月4日** 进行的截图，更多新增功能及细节请登录演示环境或 clone 代码到本地启动查看。

<table border="1" cellpadding="1" cellspacing="1" style="width: 500px">
    <tbody>
        <tr>
            <td><img src=".image/screenshot/000登录页面.png" alt="登录页面" width="1920" /></td>
            <td><img src=".image/screenshot/001仪表盘.png" alt="仪表盘" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/002仪表盘-查看公告.png" alt="仪表盘-查看公告" width="1920" /></td>
            <td><img src=".image/screenshot/010个人中心-安全设置.png" alt="个人中心-安全设置" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/011个人中心-安全设置-修改邮箱.png" alt="个人中心-安全设置-修改邮箱" width="1920" /></td>
            <td><img src=".image/screenshot/012个人中心-修改邮箱-发送验证码.png" alt="个人中心-修改邮箱-发送验证码" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/013个人中心-修改邮箱-邮箱验证码.png" alt="个人中心-修改邮箱-邮箱验证码" width="1920" /></td>
            <td><img src=".image/screenshot/014个人中心-操作日志.png" alt="个人中心-操作日志" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/015数据可视化-分析页.png" alt="数据可视化-分析页" width="1920" /></td>
            <td><img src=".image/screenshot/016数据可视化-多维数据分析页.png" alt="数据可视化-多维数据分析页" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/020系统管理-用户管理-列表.png" alt="系统管理-用户管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/021系统管理-用户管理-新增.png" alt="系统管理-用户管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/025系统管理-部门管理-列表.png" alt="系统管理-部门管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/026系统管理-部门管理-新增.png" alt="系统管理-部门管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/030系统管理-角色管理-列表.png" alt="系统管理-角色管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/031系统管理-角色管理-新增.png" alt="系统管理-角色管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/035系统管理-菜单管理-列表.png" alt="系统管理-菜单管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/036系统管理-菜单管理-新增.png" alt="系统管理-菜单管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/040系统管理-公告管理-列表.png" alt="系统管理-公告管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/041系统管理-公告管理-新增.png" alt="系统管理-公告管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/045系统管理-消息管理-列表.png" alt="系统管理-消息管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/046站内信.png" alt="站内信" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/050系统管理-字典管理-列表.png" alt="系统管理-字典管理-列表" width="1920" /></td>
            <td><img src=".image/screenshot/051系统管理-字典管理-新增.png" alt="系统管理-字典管理-新增" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/055系统管理-系统配置.png" alt="系统管理-系统配置" width="1920" /></td>
            <td><img src=".image/screenshot/056系统管理-系统配置-恢复默认.png" alt="系统管理-系统配置-恢复默认" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/100系统工具-代码生成-列表.png" alt="系统工具-代码生成-列表" width="1920" /></td>
            <td><img src=".image/screenshot/101系统工具-代码生成-配置.png" alt="系统工具-代码生成-配置" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/200系统监控-在线用户.png" alt="系统监控-在线用户" width="1920" /></td>
            <td><img src=".image/screenshot/201系统监控-操作日志.png" alt="系统监控-操作日志" width="1920" /></td>
        </tr>
        <tr>
            <td><img src=".image/screenshot/202系统监控-系统日志.png" alt="系统监控-系统日志" width="1920" /></td>
            <td><img src=".image/screenshot/203系统监控-系统日志-详情.png" alt="系统监控-系统日志-详情" width="1920" /></td>
        </tr>
    </tbody>
</table>

## 快速开始

> **Note**
> 更详细的流程，请查看在线文档[《快速开始》](https://doc.charles7c.top/admin/intro/quick-start.html#%E5%89%8D%E7%AB%AF)。

```bash
# 1.克隆本项目
git clone https://github.com/Charles7c/continew-admin.git

# 2.在 IDE（Visual Studio Code/WebStorm）中打开前端项目 continew-admin-ui

# 3.安装 pnpm，配置淘宝源
npm install -g pnpm
pnpm config set registry https://registry.npm.taobao.org

# 4.安装依赖
pnpm i

# 5.启动程序
# 5.1 启动成功：访问 http://localhost:5173/
pnpm dev

# 6.部署
# 6.1 Docker 部署
#   6.1.1 服务器安装好 docker 及 docker-compose（参考：https://blog.charles7c.top/categories/fragments/2022/10/31/CentOS%E5%AE%89%E8%A3%85Docker）
#   6.1.2 执行 pnpm build 进行项目打包，将 dist 目录下的所有文件放到 /docker/continew-admin/html 目录下
#   6.1.3 将 docker 目录上传到服务器 / 目录下，并授权（chmod -R 777 /docker）
#   6.1.4 修改 docker-compose.yml 中的 MySQL 配置、Redis 配置、continew-admin-server 配置、Nginx 配置
#   6.1.5 执行 docker-compose up -d 创建并后台运行所有容器
# 6.2 其他方式部署
```

## 核心技术栈

| 名称                                                         | 版本   | 简介                                                         |
| :----------------------------------------------------------- | :----- | :----------------------------------------------------------- |
| <a href="https://cn.vuejs.org/" target="_blank">Vue</a>      | 3.3.7  | 渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。 |
| <a href="https://arco.design/vue/docs/start" target="_blank">Arco Design</a> | 2.53.3 | 字节跳动推出的前端 UI 框架，年轻化的色彩和组件设计。         |
| <a href="https://www.typescriptlang.org/zh/" target="_blank">TypeScript</a> | 5.3.3  | TypeScript 是微软开发的一个开源的编程语言，通过在 JavaScript 的基础上添加静态类型定义构建而成。 |
| <a href="https://cn.vitejs.dev/" target="_blank">Vite</a>    | 4.5.1  | 下一代的前端工具链，为开发提供极速响应。                     |

## 项目结构

```bash
continew-admin-ui
  ├─ config               # 全局 Vite 配置
  ├─ public               # 公共静态资源（favicon.ico、logo.svg）
  ├─ src
  │  ├─ api               # 请求接口
  │  │  ├─ demo             # 示例模块
  │  │  ├─ auth             # 认证模块
  │  │  ├─ common           # 公共模块
  │  │  ├─ monitor          # 系统监控模块
  │  │  ├─ system           # 系统管理模块
  │  │  └─ tool             # 系统工具模块
  │  ├─ assets            # 静态资源
  │  │  ├─ icons            # 图标资源
  │  │  ├─ images           # 图片资源
  │  │  └─ style            # 样式资源
  │  ├─ components        # 通用业务组件
  │  ├─ config            # 全局配置（包含 echarts 主题）
  │  │  └─ settings.json    # 配置文件
  │  ├─ directives        # 指令集（如需，可自行补充）
  │  ├─ hooks             # 全局 hooks
  │  ├─ layout            # 布局
  │  ├─ locale            # 国际化语言包
  │  ├─ mock              # 模拟数据
  │  ├─ router            # 路由配置
  │  ├─ store             # 状态管理中心
  │  ├─ types             # TypeScript 类型
  │  ├─ utils             # 工具库（mock 全局开启/关闭）
  │  ├─ views             # 页面模板
  │  │  ├─ demo             # Arco Design 相关示例模块
  │  │  ├─ dashboard        # 仪表盘模块
  │  │  ├─ login            # 登录模块
  │  │  ├─ monitor          # 系统监控模块
  │  │  │  ├─ log              # 日志管理
  │  │  │  │  ├─ login            # 登录日志
  │  │  │  │  ├─ operation        # 操作日志
  │  │  │  │  └─ system           # 系统日志
  │  │  │  └─ online           # 在线用户
  │  │  └─ system           # 系统管理模块
  │  │    ├─ announcement     # 公告管理
  │  │    ├─ config           # 系统配置
  │  │    ├─ dept             # 部门管理
  │  │    ├─ dict             # 字典管理
  │  │    ├─ menu             # 菜单管理
  │  │    ├─ message          # 消息管理
  │  │    ├─ role             # 角色管理
  │  │    └─ user             # 用户模块
  │  │      └─ center           # 个人中心
  │  ├─ App.vue
  │  └─ main.ts           # 入口文件
  ├─ .env.development
  ├─ .env.production
  ├─ index.html
  ├─ package.json
  └─ tsconfig.json
```

## 贡献指南

ContiNew Admin 致力于提供开箱即用，持续舒适的开发体验。作为一个开源项目，Creator 的初心是希望 ContiNew Admin 依托开源协作模式，提升技术透明度、放大集体智慧、共创优秀实践，源源不断地为企业级项目开发提供助力。

我们非常欢迎广大社区用户为 ContiNew Admin **贡献（开发，测试、文档、答疑等）** 或优化代码，欢迎各位感兴趣的小伙伴儿，[添加微信](https://doc.charles7c.top/support.html) 讨论或认领任务。

### 分支说明

ContiNew Admin 的分支目前分为下个大版本的开发分支和上个大版本的维护分支，PR 前请注意对应分支是否处于维护状态，版本支持情况请查看 [更新日志/版本支持](https://doc.charles7c.top/admin/other/changelog.html#%E7%89%88%E6%9C%AC%E6%94%AF%E6%8C%81)。

| 分支  | 说明                                                         |
| ----- | ------------------------------------------------------------ |
| dev   | 开发分支，默认为下个大版本的 SNAPSHOT 版本，接受新功能或新功能优化 PR |
| x.x.x | 维护分支，在 vx.x.x 版本维护期终止前（一般为下个大版本发布前），用于修复上个版本的 Bug，只接受已有功能修复，不接受新功能 PR |

### 贡献代码

如果您想提交新功能或优化现有代码，可以按照以下步骤操作：

1. 首先，在 Gitee 或 Github 上将项目 fork 到您自己的仓库
2. 然后，将 fork 过来的项目（即您的项目）克隆到本地
3. 切换到当前仍在维护的分支（请务必充分了解分支使用说明，可进群联系维护者确认）
4. 开始修改代码，修改完成后，将代码 commit 并 push 到您的远程仓库
5. 在 Gitee 或 Github 上新建 pull request（pr），选择好源和目标，按模板要求填写说明信息后提交即可（多多参考 [已批准合并的 pr 记录](https://github.com/Charles7c/continew-admin-ui-arco/pulls?q=is%3Apr+is%3Amerged)，会大大增加批准合并率）
6. 最后，耐心等待维护者合并您的请求即可

请记住，如果您有任何疑问或需要帮助，我们将随时提供支持。

> [!IMPORTANT]
> 欢迎大家为 ContiNew Admin 贡献代码，我们非常感谢您的支持！为了更好地管理项目，维护者有一些要求：
>
> 1. 请确保代码、配置文件的结构和命名规范良好，完善的代码注释
> 2. 在提交代码前，请按照 [Angular 提交规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) 编写 commit 的 message

## 反馈交流

欢迎各位小伙伴儿扫描下方二维码加好友，备注 `cnadmin`，拉你进群，探讨技术、提提需求~   

加入交流群后，你将会：

- 第一时间收到框架动态
- 第一时间收到框架更新通知
- 第一时间收到框架 Bug 通知
- 和众多大佬互相 (huá shuǐ) 交流 (mō yú)

<div align="left">
  <img src=".image/qrcode.jpg" alt="二维码" width="230px" />
</div>
<details>
<summary>无加群意愿</summary>
如无加群意愿，欢迎在 <a href="https://github.com/Charles7c/continew-admin-ui-arco/issues" target="_blank">Issues</a> 中反馈交流~ 🍻
</details>

## 鸣谢

### 鸣谢

感谢参与贡献的每一位小伙伴🥰

<a href="https://github.com/Charles7c/continew-admin/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=Charles7c/continew-admin" />
</a>

### 特别鸣谢

- 感谢 <a href="https://www.jetbrains.com/" target="_blank">JetBrains</a> 提供的 <a href="https://jb.gg/OpenSourceSupport" target="_blank">非商业开源软件开发授权</a> 
- 感谢 <a href="http://pro.arco.design/" target="_blank">Arco Design Pro</a> 开箱即用的中后台前端解决方案
- 感谢 [Gi Admin Pro](https://gitee.com/lin0716/gi-demo)，致敬各位作者为开源前端模板领域作出的贡献
  - e.g. 扩展于 Gi Admin Pro 项目开源的文件管理组件
- 感谢项目使用或未使用到的每一款开源组件，致敬各位开源先驱 :fire:

## License

- 遵循 <a href="https://github.com/Charles7c/continew-admin-ui-arco/blob/dev/LICENSE" target="_blank">Apache-2.0</a> 开源许可协议
- Copyright © 2022-present <a href="https://blog.charles7c.top" target="_blank">Charles7c</a>
