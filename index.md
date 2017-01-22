# 一个简单的幻灯片插件

```javascript
$('#demo1').RollMagic({
  box: "#demo1", //总框架

  picBox: "#picBox", //大图框架
  thumBox: "#thumBox", //小图框架

  prev: "#prev", //大图左箭头
  next: "#next", //大图右箭头

  thumPrev: "#thumPrev", //小图左箭头
  thumNext: "#thumNext", //小图右箭头

  autoplay: true, //是否自动播放

  interTime: 5000, //图片自动切换间隔
  delayTime: 400, //切换一张图片时间

  order: 0, //当前显示的图片
  displayThum: 5, //小图显示数量

  nowImg: '#nowImg', //当前位置
  totalImg: '#totalImg' //图片总数
});
```
