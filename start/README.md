## 服务端Node + 前端 js

* 安装express（初级使用） ✔
* 安装express-handlerbars  ✔
* 安装sass  ✔
* 安装gulp（最开始配合compass使用） ✔
* 开始使用gulp  ✔
* express高级使用，前端架构逐步生成  ✔
* 阿里云系统搭建  ✔
* mongoose初步  ✔
* jquery/angular选型，使用（后台系统使用angular，前端使用jquery+require）
* mongoose深入
* gaevent深入
* flatui使用



####tips:
* 不要过度设计
* 个人项目中将会使用gulp，而团队项目中将会使用grunt
* 个人项目将会使用jquery+require或者angular

####blog规划：
1、结构规划：
左侧导航栏,需要响应式，768px以上显示，768px以下以按钮形式展示

2、中间图片，响应式

3、列表，每一项需要能显示简介或者不显示

    a、首页之类的列表，需要展示的信息比较多

    b、普通的列表，不需要展示简介

    c、归档之类的列表，不需要展示太多信息

    d、文章字段_id, title, date, content, topic, tags, alias, summary, private


4、mongoose将会在20号之前使用  ✔

5、阿里云搭建以后，前端投入减少，专向后端，未来的一段时间重点后端环境，前端进行配合，工作达到90%时再开始前端优化

6、mongo没有推进的情况下进展比较缓慢，前端部分的问题只剩下工作量，node部分需要更多理解，不过需要配合mongo进行

7、音乐、图书、track等栏目需要读取一些本地数据，同时也有可能获取微信等其它方式发送过来的数据

####timeline:

1、mongo需要解决post问题，注意native和mongoose之间的差异，未来需要做的事情：

    a、解决post  ✔

    b、实现登陆  ✔ (还有一点问题)(问题解决，next问题)

    c、登陆状态（权限） ✔

    d、文章列表 (简单存储、加载)  ✔

    f、node一个异步的问题，上线之前需要解决

    g、blog提交功能

    h、多种文章列表controller (探测tag、topic，对获取的数据进行删选)

    i、分页

2、后台设计

    a、博客

    b、图片

    c、music

    d、track from wechat

    e、blog event track

    f、先使用handlebars后使用angular (handlebars部署完成，不准备使用angular)  ✔

    g、tag、topic处理（包括添加tag界面、topic界面以及在编辑界面的展示,tag界面管理标签，其他界面不涉及添加功能，只进行读取）

3、优化

    a、markdown解析

    b、评论

    c、文章关联关系（前后篇等）

    d、404 (前后台的404可能不同的展现方式，后台404直接导到dashboard，前台的可能设置404)

    e、登陆状态下前台可以直接跳转到后台

    f、设置ico

    g、文章是否需要设置三种状态(公开展示，公开但是需要url无显示入口，不公开)(前台智能获取前两种公开的blog)

