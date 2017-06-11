(function ($) {
  var pluginName = 'RollMagic';
  var defaults = {
    //默认配置
    imgDisplay: 0, //图片当前显示位置
    playType: 'roll' //图片显示方式
  };

  //方法
  function Plugin(element, options) {
    this.options = $.extend({}, defaults, options);
    //缓存基本参数
    this.$box = $(this.options.box);
    this.$imgBox = $(this.options.imgBox);
    // this.$thumBox = $(this.options.thumBox);
    this.imgLength = $(this.options.imgBox).find('img').length;
    var picIndex; //当前显示位置

    //初始化前执行事件钩子
    this.beforeInit = this.options.beforeInit;
    if (this.beforeInit && typeof this.beforeInit === 'function') {
      this.beforeInit();
    }

    // this.rollType = this.options.rollType;

    // 调用初始化
    this.init();

  };

  //初始化之前事件


  //初始化
  Plugin.prototype.init = function () {
    // console.log(this.$box);
    // if(this.rollType == 'roll'){
    //   this.$imgBox.find('li').css('float','left');
    // }
    //显示当前的显示数
    // console.log(this.imgLength);
    // debugger;
    // console.log(typeof(this.options.imgDisplay));

    //默认加上相对定位
    this.$imgBox.css({
      'position': 'relative',
      'overflow': 'hidden'
    });







    //判断设置图片的当前显示数是否超出总数
    if (this.options.imgDisplay + 1 > this.imgLength) {
      console.log('显示当前数超出图片总数!');
      return;
    }

    //判断缩略图是否存在
    // if (this.options.thumBox && $(this.options.thumBox).length) {
    //   // console.log('thum ex');
    //   this.thumBoxShow();
    // } else {
    //   console.log('Arguments thumBox is null or error');
    // }


    this.ifPlayType();



  };

  //判断显示方式

  Plugin.prototype.ifPlayType = function () {

    console.log(this.options.playType);

    if (this.options.playType == 'display') {
      this.$imgBox.find('li').css({
        'position': 'absolute',
        'left': '0',
        'display':'none'
      });
      this.$imgBox.find('li').eq(this.options.imgDisplay).css('display', 'block');

      this.bindEvent('display');
    } else if (this.options.playType == 'roll') {
      this.$imgBox.find('li').css({
        'float': 'left'
      });

      this.bindEvent('roll');
    }

    //展示选择第几张图

    //绑定事件

  };



  //绑定事件
  Plugin.prototype.bindEvent = function (playType) {
    var prev = this.options.prevBotton;
    var next = this.options.nextBotton;
    // var thumNext = this.options.thumNextBotton;
    if (playType == 'display') {
      this.$box.on('click', next, $.proxy(this.nextEvent, this));
      this.$box.on('click', prev, $.proxy(this.prevEvent, this));
    }
    // this.$box.on('click', thumNext, $.proxy(this.thumNext, this)); //给缩略图下一张绑定事件
  };

  //下一张事件
  Plugin.prototype.nextEvent = function (num) {
    // debugger
    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (!_this.picIndex) {
      _this.picIndex = _this.options.imgDisplay;
    }

    //将当前淡出
    _this.$imgBox.find('li').eq(_this.picIndex).fadeOut('slow'); //淡出

    _this.picIndex++;

    //超过长度变成0
    if (_this.picIndex == _this.imgLength) {
      _this.picIndex = 0;
    }

    //将下一张淡入
    _this.$imgBox.find('li').eq(_this.picIndex).fadeIn('slow');


    _this.$imgBox.find('li').eq(_this.picIndex).css('display', 'block').siblings('li').css('display', 'none');

    // console.log(_this.options.imgDisplay);

  };

  //上一张事件
  Plugin.prototype.prevEvent = function (num) {
    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (!_this.picIndex) {
      _this.picIndex = _this.options.imgDisplay;
    }

    _this.$imgBox.find('li').eq(_this.picIndex).fadeOut('slow'); //淡出

    if (_this.picIndex == 0) {
      _this.picIndex = _this.imgLength;
    }

    _this.picIndex--;

    _this.$imgBox.find('li').eq(_this.picIndex).fadeIn('slow'); //淡入

    _this.$imgBox.find('li').eq(_this.picIndex).css('display', 'block').siblings('li').css('display', 'none');

  };

  //显示缩略图个数
  // Plugin.prototype.thumBoxShow = function () {
  //   var _thumBoxWidth = $(this.$thumBox).find('li').eq(0).outerWidth(true);
  //   $(this.$thumBox).css({
  //     'overflow': 'hidden',
  //     'width': _thumBoxWidth * this.options.thumImgDisplay
  //   });
  //   $(this.$thumBox).find('ul').css('width', _thumBoxWidth * this.imgLength);
  // }

  //缩略图下一张
  // Plugin.prototype.thumNext = function (num) {
  //   var _thumBoxWidth = $(this.$thumBox).find('li').eq(0).outerWidth(true);
  //   var $thumBox = $(this.$thumBox).find('ul');
  //   var _thisThumMarginLeft = parseInt($thumBox.css('margin-left') || 0, 10);
  //   if (_thisThumMarginLeft == -(parseInt($thumBox.css('width'), 10) - _thumBoxWidth)) {
  //     $thumBox.css('margin-left', 0);
  //     return;
  //   }
  //   $thumBox.css('margin-left', -(_thumBoxWidth * this.options.thumImgDisplay - _thisThumMarginLeft))
  // }

  //暴露方法
  $.fn[pluginName] = function (options) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function () {
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