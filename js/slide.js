/**
 *单图切换
 *使用切换src
 */

(function($) {
  var pluginName = 'album';
  var defaults = {
    //默认配置
  };

  function Plugin(element, options) {
    this.$window = $(window);
    this.$document = $(document);
    this.$element = $(element);
    this.options = $.extend({}, defaults, options); //后面覆盖前面

    this.imgNum = $(this.options.slideBox).find('img').length;//获取图片的长度
    this.btnName = this.options.slideNum;//
    this.imgSrc = $(this.options.slideBox).find('img').map(function() {
      return this.src;
    });
    //改变上下文，将function中的this指向全局this

    this.init();

  };

  Plugin.prototype.init = function() {
    this.onClick();
  };

  Plugin.prototype.onClick = function() {
    //给按钮绑定事件
    var perv = this.options.slidePrev;
    var next = this.options.slideNext;
    var _this = this;
    //改变上下文，将function中的this指向全局this，proxy在需要的时候在用，不要在初始化的时候去使用
    this.$element.on('click', next, $.proxy(this.nextEvent, this));
    this.$element.on('click', perv, $.proxy(this.prevEvent, this));
  };

  Plugin.prototype.nextEvent = function(event) {
    //下一个
    var divNum = this.options.slideNum;
    var nowImg = $(divNum).html();
    if (nowImg == this.imgNum) {
      nowImg = 0;
    };
    nowImg++;
    $(divNum).html(nowImg);
    this.showImg(nowImg);
  };

  Plugin.prototype.prevEvent = function() {
    //上一个
    var divNum = this.options.slideNum;
    var nowImg = $(divNum).html();
    nowImg--;
    if (nowImg == 0) {
      nowImg = this.imgNum;
    };
    $(divNum).html(nowImg);
    this.showImg(nowImg);
  };

  Plugin.prototype.showImg = function(nowImg) {
    //展示图片
    $(this.options.slideImg).attr('src', $(this.imgSrc)[nowImg]);
  };

  $.fn[pluginName] = function(options) {
    //整个插件的入口
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var $this = $(this),
        data = $this.data('plugin_' + pluginName);

      if (!data) {
        $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
      }

      if (typeof options === 'string') {
        data[options].apply(data, args);
      }
    });
  };

})(jQuery);


$('#slideBox').album({
  slideBox: '#slideBox',//存放图片盒子
  slideImg: '#slideImg',//展示图片盒子
  slidePrev: '#slidePrev',//下一个
  slideNext: '#slideNext',//上一个
  slideNum: '#num1'//显示当前位置
});

$('#slideBox2').album({
  slideBox: '.slide-box-2',
  slideImg: '.slideImg',
  slidePrev: '.slidePrev',
  slideNext: '.slideNext',
  slideNum: '#num2'
});

/**
 *多图切换含有缩略图
 *使用绝对定位隐藏显示
 */

(function($) {
  var pluginName = 'slide';
  var defaults = {

    //默认配置
    bigWidth: 800,
    bigNum: 0,
    thumNum: 0
  };

  function Plugin(element, options) {
    this.$window = $(window);
    this.$document = $(document);
    this.$element = $(element);
    this.options = $.extend({}, defaults, options); //后面覆盖前面

    this.imgNum = $(this.options.slideBox).find('img').length;
    this.btnName = this.options.slideNum;
    this.imgSrc = $(this.options.slideBox).find('img').map(function() {
      return this.src;
    });
    this.imgLength = $(this.options.bigPic).find('ul li').length;
    this.thumLenth = $(this.options.thum).find('ul li').length;
    this.thumWidth = $(this.options.thum).find('ul li').outerWidth(true);

    this.init();
  };

  Plugin.prototype.init = function() {
    $(this.options.thum).find('ul').width(this.thumLenth * this.thumWidth);
    $(this.options.imgTotal).html(this.imgLength);
    var bigNum = this.options.bigNum;
    var thumNum = this.options.thumNum;
    var _this = this;
    $(this.options.thum).find('li').on('click', function(event) {
      var numIndex = $(_this.options.thum).find('li').index(this);
      bigNum = thumNum = numIndex;
      _this.showBig(bigNum);
      _this.showThum(bigNum);

      bigNum++;
      $(_this.options.nowImg).html(bigNum);

    }).eq(this.options.order).trigger('click');
    this.bindEvent();
  };

  Plugin.prototype.bindEvent = function() {
    var perv = this.options.prev;
    var next = this.options.next;
    var close = this.options.close;

    //改变上下文，将function中的this指向全局this
    this.$element.on('click', next, $.proxy(this.nextEvent, this));
    this.$element.on('click', perv, $.proxy(this.prevEvent, this));
    this.$element.on('click', close, $.proxy(this.closeEvent, this));
  };

  Plugin.prototype.prevEvent = function(event) {
    var bigNum = $(this.options.nowImg).html();
    bigNum--;
    if (bigNum == 0) {
      bigNum = this.imgLength;
    }
    bigNum--;
    this.showBig(bigNum);
    this.showThum(bigNum);
    bigNum++;
    $(this.options.nowImg).html(bigNum);
  };

  Plugin.prototype.nextEvent = function() {
    var bigNum = $(this.options.nowImg).html();
    if (bigNum == this.imgLength) {
      bigNum = 0
    }
    this.showBig(bigNum);
    this.showThum(bigNum);
    bigNum++;
    $(this.options.nowImg).html(bigNum);
  };

  Plugin.prototype.closeEvent = function() {
    $(this.options.box).css('display', 'none');
  };

  Plugin.prototype.showBig = function(bigNum) {
    $(this.options.bigPic).find('ul li').eq(bigNum).fadeIn(this.options.delayTime).siblings('li').fadeOut(this.options.delayTime);
    $(this.options.thum).find('li').eq(bigNum).addClass('on').siblings(this).removeClass('on');
  };

  Plugin.prototype.showThum = function(thumNum) {
    var displayNum = thumNum - this.options.displayThum + 2;
    var displayWidth = -displayNum * this.thumWidth;

    $(this.options.thum).find('ul li').css('float', 'left');
    if (this.thumLenth > this.options.displayThum) {
      if (thumNum < 2) {
        displayWidth = 0;
      } else if (thumNum == this.thumLenth - 1) {
        displayWidth = -(displayNum - 1) * this.thumWidth;
      }

      $(this.options.thum).find('ul').stop().animate({ 'left': displayWidth }, this.options.delayTime);
    }
  };

  $.fn[pluginName] = function(options) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var $this = $(this),
        data = $this.data('plugin_' + pluginName);

      if (!data) {
        $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
      }

      if (typeof options === 'string') {
        data[options].apply(data, args);
      }
    });
  };

})(jQuery);

$('#house').slide({
  box: "#house", //总框架
  bigPic: "#houseTop", //大图框架
  thum: "#housebottom", //小图框架
  prev: "#housePrev1", //大图左箭头
  next: "#houseNext1", //大图右箭头
  close: '#houseClose', //关闭按钮
  nowImg: '#houseImg',
  imgTotal: '#houseTotal',
  delayTime: 400, //切换一张图片时间
  order: 0, //当前显示的图片（从0开始）
  picdire: true, //大图滚动方向（true为水平方向滚动）
  mindire: true, //小图滚动方向（true为水平方向滚动）
  displayThum: 3 //小图显示数量
});

$('#village').slide({
  box: "#village", //总框架
  bigPic: "#villageTop", //大图框架
  thum: "#villageBottom", //小图框架
  prev: "#villagePrev", //大图左箭头
  next: "#villageNext", //大图右箭头
  close: '#villageClose', //关闭按钮
  nowImg: '#nowImg',
  imgTotal: '#imgTotal',
  delayTime: 400, //切换一张图片时间
  order: 0, //当前显示的图片（从0开始）
  picdire: true, //大图滚动方向（true为水平方向滚动）
  mindire: true, //小图滚动方向（true为水平方向滚动）
  displayThum: 3 //小图显示数量
});
