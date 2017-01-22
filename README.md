### 一个简单的幻灯片插件

> 基础配置

```javascript
var app = $('#demo1').RollMagic({
  //总框架
  box: "#demo1",

  //大图框架
  picBox: "#picBox",
  //小图框架
  thumBox: "#thumBox",

  //大图左箭头
  prev: "#prev",
  //大图右箭头
  next: "#next",

  //小图左箭头
  thumPrev: "#thumPrev",
  //小图右箭头
  thumNext: "#thumNext",

  //是否自动播放
  autoplay: true,

  //图片自动切换间隔
  interTime: 5000,
  //切换一张图片时间
  delayTime: 400,

  //当前显示的图片
  order: 0,
  //小图显示数量
  displayThum: 5,

  //当前位置
  nowImg: '#nowImg',

  //图片总数
  totalImg: '#totalImg',

  beforeInit: function() {
    console.log('beforeInit');
  },

  inited: function() {}
});
```
**box**

实例化的总框架，插件会自动搜索框架下方的images然后计算出总数

**picBox**

大图的盒子

**thumBox**

缩略图盒子(thumbnail:缩略图)

**prev**

大图的左箭头，大图的向左切换功能

**next**

大图的左箭头，大图的向右切换功能

**thumPrev**

缩略图的左箭头，缩略图的向左切换功能

**thumNext**

缩略图的左箭头，缩略图的向右切换功能

**autoplay**

自动轮播功能

**interTime**

图片切换时间

**delayTime**

切换一张图片的时间，有淡入淡出效果

**order**

当前显示的图片，从0开始

**displayThum**

缩略图显示的数量
