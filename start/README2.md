实现系统的时候最大的问题便是经常设计过度。

自己协调前后端加设计，在速度把控上可能会出问题。

另一方面，开始的时候各方面不懂，任何尝试可能都会带来比较好的结果，但是到了后来，可能重复的工作会多一些，自己处理好这方面的问题，提高工作效率

协调next（）的时候遇到一个问题，需要严格控制判断条件

###日程计划：

* 3.1-3.3号完成90%的后台接口研发  ✔
* 3.3-3.5号完成80%的界面样式开发  ✔
* 3.5-3.8号完成90%的初期全部开发，之后再尝试部署  ✔
* 3.8-3.11号继续规划整个网站的开发工作  ✔


######tips:

* 首页隐藏一个"滑动"跳转到登陆界面的按钮  ✔

####2015-03-01

今日完成tag、topic后添加界面，并且写好相应接口。完成前台的tags界面  ✔

在后台界面开发90%之前不花过多精力在样式设计上，不要太重视细节！！  ✔

今天完成分页功能的添加  ✔

今天晚上文章详情的简陋版本添加  ✔

####2015-03-02

今天需要解决昨天没有解决的问题：分页、排序、分类(全部完成)  ✔

整理需要开发的界面：

######博客部分

* 首页(顶部区域单独画设计，下面区域是最近更新)
* 分类页(按照topic分类,url可能有两级)  ✔
* tag页(按照tag分类)  ✔
* 分类列表页(以标签形式显示，每个tag是链接)  ✔
* tag列表页(同上)  ✔
* 时间列表页  ✔
* 时间页  ✔
* blog详情页  ✔
* 后台发布页  ✔
* 后台列表页  ✔
* 后台tag、topic页(删除需要添加安全提示，添加需要添加多个内容)  ✔

######图片部分
暂时没有计划

####2015-03-03

规划一下未来三天的大概工作

* 今天继续完成接口，达到90%开发完成度  ✔
* 搜索页面根据条件筛选  ✔
* 搜索界面删除功能开发（要做安全）  ✔
* 搜索界面公开switch功能  ✔
* 修改页，提交存储功能  ✔
* 分类页面，表单功能  ✔


* 前台分类页面，按照topic分类（有分页）✔
* 前台标签页面，按照标签分类（有分页）✔
* 前台日历界面，按照事件筛选 ✔

* (首页先显示“最近更新”，显示三个)  ✔
* (首页最下方连接到“更多内容”，链接过去是所有的文章，没有主题)  ✔
* (分类界面抬头是分页)  ✔
* (标签界面抬头是标签)  ✔
* (日期界面：把“/2014/”url导到日期存档那边去，而且是以年为存档) ✔
* (存档界面：当年的存档（简化）、月份存档（同标签界面）、天存档导入到月份那边去) ✔
* (以上所有界面的显示结果都仅仅显示公开列表的) ✔

以上工作期望3、4号完成

* 表单也需要安全机制，虽然级别比较低(待考虑，因为表单即使没有也能正常运作)  ✔
* 突然想到表单的图片背景，是需要绑定到topic上面的（可能还需要做一个选择图片的功能，然后能够选择图片背景）  ✔
* 标签需要做一个简单地验证安全机制  ✔

/*
var newBlog = new Blog({
    title: '测试0018',
    date: new Date(),
    content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
    summary: '这是测试的贱贱贱加加加加123',
    alias: 'test0018',
    topics: ['JavaScript', 'life0003'],
    tags: ['Html', 'JavaScript', 'Node', '前端', 'life0002'],
    ifpublic: true,
    ifsafe: true
});
newBlog.save();
*/


####2015-03-04

规划一下各个界面，现在开始慢慢开发界面，同时再解决一下mongo的问题  ✔

####2015-03-05

功能:

* “当前目录下没有文章”  ✔
* topics界面的独特化、路由设计  ✔

####2015-03-08

最近几天被session和mongoose卡住了,今日解决，现在一切进程和之前计划一样  ✔

未来两天：

* 规划好各个界面的跳转问题  ✔

* 解决node同步异步的问题(暂时未能解决)

* 后台date默认值（已经添加）  ✔

* acrhives/year (已经完善)  ✔

####2015-03-08

规划一下未来一周的博客工作：

* 博客界面highlight问题  ✔
* 关于严伟庆界面  ✔
* 网站说明界面  ✔
* 给我留言界面  ✔
* 录入每个主题界面的信息(每个界面已经实现可以自定义图片)  ✔
* 图片界面  ✔

* 写三篇前端文章，一篇jq开篇，一篇关于博客搭建，一篇关于js精粹

####2015-03-16

上周的相关计划没有很好完成，本周有空的情况下完成这些事项，同时需要开始把重点放到博客上面来

考虑到本周也有一些工作，把书写的计划做一下详细的预定：
1、本周必须写一篇jquery开篇(周四周五)
2、本周完善一下博客搭建（每天修订）  ✔
3、本周完善一下“2015计划”（每天修订）  ✔
4、本周开始写一篇关于《平凡》的文章（周一开始） ✔
5、完成《精粹》的总结

####2015-03-31

这段时间的完成情况都很差，忙也不是理由。
未来一段时间：
1、博客补全
2、开发音乐的功能

####2015-04-01

未来一段时间，完成31号的计划；
博客：
1、《精粹》的总结
2、jq的正式开篇
3、jq之前那篇文章修改，并且添加serialized的文章

思考难道需要这样一点一点地看么

功能列表:

1、首页轮播图  ✔
2、全面的lazyload

分类
牧：coding
——前端思索:前端
——全站尝试:全栈
——读书笔记note
——成长总结summart

与:joy
——阅读reading
——观影movie
——用家evaluation
——撒欢sahuan

漂:life
——生活随笔:life
——杂乱文章:writing(侧重原创文学)
——资源分享:share
——文章存档archives

流:about
--关于:about
--友情链接:links
--留言:contact
