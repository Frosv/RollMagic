/*
 *作者: FrosV
 *版本: 0.0.2
 *
 */


/*
 *如何使用
 */
(function ($, undefined) {
  var pluginName = 'RollMagic';
  var defaults = {
    //默认配置
    imgDisplay: 0, //图片当前显示位置
    playType: 'display' //图片显示方式,'roll','display'
  };

  //方法
  function Plugin(element, options) {
    this.options = $.extend({}, defaults, options);
    //缓存基本参数

    this.$box = $(this.options.box); //整体框架
    this.$imgBox = $(this.options.imgBox); //大图框架
    this.imgLength = this.$imgBox.find('img').length; //大图数量

    this.$thumImgBox = $(this.options.thumBox); //缩略图框架

    this.thumImgLenght = this.$thumImgBox.find('img').length; //缩略图数量

    var picIndex; //用于存储当前显示位置


    //初始化前执行事件钩子
    this.beforeInit = this.options.beforeInit;
    if (this.beforeInit && typeof this.beforeInit === 'function') {
      this.beforeInit();
    }

    // 调用初始化
    this.init();
  };

  //初始化
  Plugin.prototype.init = function () {

    //默认给大图加上相对定位
    this.$imgBox.css({
      'position': 'relative',
      'overflow': 'hidden'
    });

    //判断设置图片的当前显示数是否超出总数
    if (this.options.imgDisplay + 1 > this.imgLength) {
      console.log('显示当前数超出图片总数!');
      return;
    }

    //判断缩略图与大图是否相同
    if (this.imgLength != this.thumImgLenght) {
      console.log('图片数量不相等!')
    }


    //判断显示用户要求显示第几张然后给这张加上红框
    this.$thumImgBox.find('li').eq(this.options.imgDisplay).addClass('thum-border');

    //执行判断播放类型
    this.ifPlayType();
  };

  //判断显示方式

  Plugin.prototype.ifPlayType = function () {

    console.log(this.options.playType);

    if (this.options.playType == 'display') {
      //加上绝对定位让图片重叠在一起
      this.$imgBox.find('li').css({
        'position': 'absolute',
        'left': '0',
        'display': 'none'
      });

      //找到当前显示图片
      this.$imgBox.find('li').eq(this.options.imgDisplay).css('display', 'block');

      //执行时间绑定
      //可加上向左滚动事件
      this.bindEvent('display');
    } else if (this.options.playType == 'roll') {
      //给大图加上向左浮动
      this.$imgBox.find('li').css({
        'float': 'left'
      });

      this.bindEvent('roll');
    }

  };

  //绑定事件
  Plugin.prototype.bindEvent = function (playType) {
    //大图按钮
    var prev = this.options.prevBotton;
    var next = this.options.nextBotton;

    //缩略图按钮
    var thumNext = this.options.thumNextBotton;
    var thumPrev = this.options.thumPrevBotton;

    if (playType == 'display') {
      this.$box.on('click', next, $.proxy(this.nextEvent, this));
      this.$box.on('click', prev, $.proxy(this.prevEvent, this));

      this.$box.on('click', thumNext, $.proxy(this.thumNext, this)); //给缩略图下一张绑定事件
      this.$box.on('click', thumPrev, $.proxy(this.thumPrev, this)); //给缩略图下一张绑定事件
    }

  };

  //下一张事件
  Plugin.prototype.nextEvent = function (num) {
    // debugger
    console.log(typeof (num));
    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (num != undefined && typeof (num) == 'number') {

      //如果传入的值存在就让大图显示传入的值然后跳出
      _this.$imgBox.find('li').eq(num).css('display', 'block').siblings('li').css('display', 'none');
      return;

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
    console.log(_this.picIndex);

    this.thumNext(_this.picIndex);

  };

  //上一张事件
  Plugin.prototype.prevEvent = function (num) {

    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (num != undefined && typeof (num) == 'number') {

      //如果传入的值存在就让大图显示传入的值然后跳出
      _this.$imgBox.find('li').eq(num).css('display', 'block').siblings('li').css('display', 'none');
      return;

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

    this.thumPrev(_this.picIndex);

  };

  Plugin.prototype.thumNext = function (num) {
    // debugger
    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (num != undefined && typeof (num) == 'number') {

      //如果传入的值存在就让大图显示传入的值然后跳出
      _this.$thumImgBox.find('li').eq(num).addClass('thum-border').siblings('li').removeClass('thum-border');
      return;

    } else if (!_this.picIndex) {
      _this.picIndex = _this.options.imgDisplay;
    }

    _this.picIndex++;

    if (_this.picIndex == _this.thumImgLenght) {
      _this.picIndex = 0;
    }

    this.nextEvent(_this.picIndex);

    _this.$thumImgBox.find('li').eq(_this.picIndex).addClass('thum-border').siblings('li').removeClass('thum-border');

  };

  Plugin.prototype.thumPrev = function (num) {
    var _this = this;

    //判断是否有传值，有就把值放进去，没有就把初始化的显示位置放入
    if (num == undefined) {
      _this.picIndex = num;
    } else if (num != undefined && typeof (num) == 'number') {

      //如果传入的值存在就让大图显示传入的值然后跳出
      _this.$thumImgBox.find('li').eq(num).addClass('thum-border').siblings('li').removeClass('thum-border');
      return;

    } else if (!_this.picIndex) {
      _this.picIndex = _this.options.imgDisplay;
    }

    if (_this.picIndex == 0) {
      _this.picIndex = _this.thumImgLenght;
    }

    _this.picIndex--;

    this.prevEvent(_this.picIndex);

    _this.$thumImgBox.find('li').eq(_this.picIndex).addClass('thum-border').siblings('li').removeClass('thum-border');

  };

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