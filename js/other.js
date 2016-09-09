/**
 *单图切换
 *使用切换src
 */

// (function($) {
//   var pluginName = 'album';
//   var defaults = {
//     //默认配置
//   };

//   function Plugin(element, options) {
//     this.$window = $(window);
//     this.$document = $(document);
//     this.$element = $(element);
//     this.options = $.extend({}, defaults, options); //后面覆盖前面

//     this.imgNum = $(this.options.slideBox).find('img').length;//获取图片的长度
//     this.btnName = this.options.slideNum;//
//     this.imgSrc = $(this.options.slideBox).find('img').map(function() {
//       return this.src;
//     });
//     //改变上下文，将function中的this指向全局this

//     this.init();

//   };

//   Plugin.prototype.init = function() {
//     this.onClick();
//   };

//   Plugin.prototype.onClick = function() {
//     //给按钮绑定事件
//     var perv = this.options.slidePrev;
//     var next = this.options.slideNext;
//     var _this = this;
//     //改变上下文，将function中的this指向全局this，proxy在需要的时候在用，不要在初始化的时候去使用
//     this.$element.on('click', next, $.proxy(this.nextEvent, this));
//     this.$element.on('click', perv, $.proxy(this.prevEvent, this));
//   };

//   Plugin.prototype.nextEvent = function(event) {
//     //下一个
//     var divNum = this.options.slideNum;
//     var nowImg = $(divNum).html();
//     if (nowImg == this.imgNum) {
//       nowImg = 0;
//     };
//     nowImg++;
//     $(divNum).html(nowImg);
//     this.showImg(nowImg);
//   };

//   Plugin.prototype.prevEvent = function() {
//     //上一个
//     var divNum = this.options.slideNum;
//     var nowImg = $(divNum).html();
//     nowImg--;
//     if (nowImg == 0) {
//       nowImg = this.imgNum;
//     };
//     $(divNum).html(nowImg);
//     this.showImg(nowImg);
//   };

//   Plugin.prototype.showImg = function(nowImg) {
//     //展示图片
//     $(this.options.slideImg).attr('src', $(this.imgSrc)[nowImg-1]);
//   };

//   $.fn[pluginName] = function(options) {
//     //整个插件的入口
//     var args = Array.prototype.slice.call(arguments, 1);

//     return this.each(function() {
//       var $this = $(this),
//         data = $this.data('plugin_' + pluginName);

//       if (!data) {
//         $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
//       }

//       if (typeof options === 'string') {
//         data[options].apply(data, args);
//       }
//     });
//   };

// })(jQuery);


// $('#slideBox').album({
//   slideBox: '#slideBox',//存放图片盒子
//   slideImg: '#slideImg',//展示图片盒子
//   slidePrev: '#slidePrev',//下一个
//   slideNext: '#slideNext',//上一个
//   slideNum: '#num1'//显示当前位置
// });

// $('#slideBox2').album({
//   slideBox: '.slide-box-2',
//   slideImg: '.slideImg',
//   slidePrev: '.slidePrev',
//   slideNext: '.slideNext',
//   slideNum: '#num2'
// });
