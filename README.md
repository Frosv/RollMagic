# FrosvSlide
v1.0

此插件仅绑定了切换和按钮功能，css样式可以自行定义


```javascript
$('#demo1').slide({
  box:"#demo1",//总框架

  picBox:"#picBox",//大图框架
  thumBox:"#thumBox",//小图框架
  pop_div:"#demo2",//弹出框框架(未更新)

  prev:"#prev",//大图左箭头
  next:"#next",//大图右箭头

  thumPrev:"#thumPrev",//小图左箭头
  thumNext:"#thumNext",//小图右箭头

  pop_prev:"#prev2",//弹出框左箭头(未更新)
  pop_next:"#next2",//弹出框右箭头(未更新)

  pop_pic:"#ban_pic2",//弹出框图片框架(未更新)
  pop_xx:".pop_up_xx",//关闭弹出框按钮(未更新)

  mhc:".mhc",//朦灰层(未更新)

  autoplay:true,//是否自动播放(未更新)

  interTime:5000,//图片自动切换间隔
  delayTime:400,//切换一张图片时间

  pop_up:true,//大图是否有弹出框(未更新)
  pop_delayTime:400,//弹出框切换一张图片时间(未更新)

  picdire:true,//大图滚动方向（true为水平方向滚动）(未更新)
  mindire:true,//小图滚动方向（true为水平方向滚动）(未更新)

  order:0,//当前显示的图片（从0开始）
  displayThum:5//小图显示数量
});
```
