### 一个简单的幻灯片插件

> 基础配置

```javascript
$('#demo1').RollMagic({
  box: "#demo1", //总框架

  picBox: "#picBox", //大图框架
  thumBox: "#thumBox", //缩略图框架

  prev: "#prev", //大图左箭头
  next: "#next", //大图右箭头

  thumPrev: "#thumPrev", //缩略图左箭头
  thumNext: "#thumNext", //缩略图右箭头

  autoplay: true, //是否自动播放

  interTime: 5000, //图片自动切换间隔
  delayTime: 400, //切换一张图片时间

  order: 0, //当前显示的图片
  displayThum: 5, //缩略图显示数量

  nowImg: '#nowImg', //当前位置
  totalImg: '#totalImg' //图片总数
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
