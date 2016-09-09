# FrosvSlide
v1.0

此插件仅绑定了切换和按钮功能，css样式可以自行定义，图片当前位置还有总数只需要将class或者id穿进去就可以自动加入就可以使用，反正找不到也不会自己加进去


```javascript
$('#house').slide({
  box: "#house", //总框架
  bigPic: "#houseTop", //大图框架
  thum: "#housebottom", //小图框架
  prev: "#housePrev1", //大图左箭头
  next: "#houseNext1", //大图右箭头
  close: '#houseClose', //关闭按钮
  nowImg: '#houseImg',//图片当前数
  imgTotal: '#houseTotal',//图片总数
  delayTime: 400, //切换一张图片时间
  order: 0, //当前显示的图片（从0开始）
  displayThum: 3 //小图显示数量
});
```
