/**
 *by frosv
 *多图切换含有缩略图
 *使用绝对定位隐藏显示
 */

(function($) {
  var pluginName = 'RollMagic';
  var defaults = {
    //默认配置
    bigWidth: 800,
    bigNum: 0,
    thumNum: 0,
    autoPlay: 'ture',
    delayTime: 0
  };

  //获取每个节点
  function Plugin(element, options) {
    this.$window = $(window);
    this.$document = $(document);
    this.$element = $(element);
    this.options = $.extend({}, defaults, options); //后面覆盖前面
    // console.log(this.options);

    this.imgNum = $(this.options.slideBox).find('img').length;
    this.btnName = this.options.slideNum;
    this.imgSrc = $(this.options.slideBox).find('img').map(function() {
      return this.src;
    });
    this.imgLength = $(this.options.picBox).find('ul li').length;
    this.thumLenth = $(this.options.thumBox).find('ul li').length;
    this.thumWidth = $(this.options.thumBox).find('ul li').outerWidth(true);
    this.beforeInit = this.options.beforeInit;
    this.inited = this.options.inited;
    // console.log(this.beforeInit);

    // this.beforeInit();
    this.init();
  };



  //初始化
  Plugin.prototype.init = function() {
    //初始化之前
    if(this.beforeInit && typeof this.beforeInit === 'function'){
      // console.log('ok');
      this.beforeInit();
    }
    $(this.options.thumBox).find('ul').width(this.thumLenth * this.thumWidth);
    $(this.options.imgTotal).html(this.imgLength);
    var bigNum = this.options.bigNum;
    var thumNum = this.options.thumNum;
    var _this = this;
    $(this.options.thumBox).find('li').on('click', function(event) {
      var numIndex = $(_this.options.thumBox).find('li').index(this);
      bigNum = thumNum = numIndex;
      _this.showBig(bigNum);
      _this.showThum(bigNum);

      bigNum++;
      $(_this.options.nowImg).html(bigNum);

    }).eq(this.options.order).trigger('click');
    this.bindEvent();


    if (this.options.autoPlay) {
      this.autoPlay();
    }

    $(this.options.totalImg).html(this.imgLength);

    //实例化之后
    if(this.inited && typeof this.inited === 'function'){
      this.inited();
    }
  };


  //绑定事件
  Plugin.prototype.bindEvent = function() {
    //大图按钮
    var perv = this.options.prev;
    var next = this.options.next;
    //小图按钮
    var thumPrev = this.options.thumPrev;
    var thumNext = this.options.thumNext;
    // console.log(thumPrev);
    // console.log(next);
    var close = this.options.close;

    //改变上下文，将function中的this指向全局this


    //大图按钮事件绑定
    this.$element.on('click', next, $.proxy(this.nextEvent, this));
    this.$element.on('click', perv, $.proxy(this.prevEvent, this));
    //小图按钮事件绑定
    this.$element.on('click', thumNext, $.proxy(this.nextEvent, this));
    this.$element.on('click', thumPrev, $.proxy(this.prevEvent, this));
    //关闭按钮
    this.$element.on('click', close, $.proxy(this.closeEvent, this));
    // this.$element.on('click', close, $.proxy(this.closeEvent, this));
  };

  //图片播放
  Plugin.prototype.autoPlay = function() {
    var _this = this;
    var playTime = setInterval(function() {
      var flag = $(_this.options.picBox).find('ul').data('num');
      _this.showBig(flag);
      _this.showThum(flag);
      flag++;
      if (flag == _this.imgLength) {
        flag = 0;
      }
      $(_this.options.picBox).find('ul').data('num', flag);
      _this.displayNum(flag);
    }, _this.options.interTime);
    $(this.options.picBox).hover(function() {
      clearTimeout(playTime);
    }, function() {
      playTime = setInterval(function() {
        var flag = $(_this.options.picBox).find('ul').data('num');
        _this.showBig(flag);
        _this.showThum(flag);
        flag++;
        if (flag == _this.imgLength) {
          flag = 0;
        }
        $(_this.options.picBox).find('ul').data('num', flag);
        _this.displayNum(flag);
      }, _this.options.interTime);
    });
  };

  //向左按钮事件
  Plugin.prototype.prevEvent = function(event) {

    var flag = $(this.options.picBox).find('ul');
    var bigNum = $(flag).data('num');
    // console.log(bigNum);
    bigNum--;
    if (bigNum == 0) {
      bigNum = this.imgLength;
    }
    bigNum--;
    this.showBig(bigNum);
    this.showThum(bigNum);
    bigNum++;
    $(flag).data('num', bigNum);
    this.displayNum(bigNum);
  };

  //向右按钮事件
  Plugin.prototype.nextEvent = function() {

    var flag = $(this.options.picBox).find('ul');
    var bigNum = $(flag).data('num');
    if (bigNum == this.imgLength) {
      bigNum = 0
    }
    this.showBig(bigNum);
    this.showThum(bigNum);
    bigNum++;
    $(flag).data('num', bigNum);
    this.displayNum(bigNum);
  };

  //关闭按钮事件
  Plugin.prototype.closeEvent = function(el) {
    // $(this.options.box).css('display', 'none');
  };

  //大图显示
  Plugin.prototype.showBig = function(bigNum) {
    // console.log()
    $(this.options.picBox).find('ul li').eq(bigNum).fadeIn(this.options.delayTime).siblings('li').fadeOut(this.options.delayTime);
    $(this.options.thumBox).find('li').eq(bigNum).addClass('on').siblings(this).removeClass('on');
  };

  //缩略图显示
  Plugin.prototype.showThum = function(thumNum) {
    // console.log(thumNum);
    var displayNum = thumNum - this.options.displayThum + 2;
    var displayWidth = -displayNum * this.thumWidth;
    // console.log(displayWidth);

    $(this.options.thumBox).find('ul li').css('float', 'left');
    if (this.thumLenth > this.options.displayThum) {
      if (thumNum < 4) {
        displayWidth = 0;
      } else if (thumNum == this.thumLenth - 1) {
        displayWidth = -(displayNum - 1) * this.thumWidth;
      }

      $(this.options.thumBox).find('ul').stop().animate({
        'left': displayWidth
      }, this.options.delayTime);
    }
  };

  //显示当前个数
  Plugin.prototype.displayNum = function(bigNum) {
    var imgNumber = $(this.options.nowImg);
    $(imgNumber).html(bigNum);
  }

  //暴露方法
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

  //event
  beforeInit: function() {},

  inited: function() {}
});
