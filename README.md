# FrosvSlide
v1.0

``` javascript
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
  picdire: true, //大图滚动方向（true为水平方向滚动）
  mindire: true, //小图滚动方向（true为水平方向滚动）
  displayThum: 3 //小图显示数量
});
```
