(function($) {
  var pluginName = 'RollMagic';
  var defaults = {
    //默认配置
  };
  function Plugin(element, options) {
    this.options = $.extend({}, defaults, options);
    //缓存基本参数
    this.$box = $(this.options.box);
    this.$imgBox = $(this.options.imgBox);
    this.imgLength = $(this.options.imgBox).find('img').length;
    // this.rollType = this.options.rollType;
    this.init();
  };

  //初始化
  Plugin.prototype.init = function() {
    // console.log(this.$box);
    // if(this.rollType == 'roll'){
    //   this.$imgBox.find('li').css('float','left');
    // }
    //显示当前的显示数
    // console.log(this.imgLength);
    // debugger;
    // console.log(typeof(this.options.imgDisplay));
    //判断设置图片的当前显示数是否超出总数
    if (this.options.imgDisplay + 1 > this.imgLength) {
      console.log('显示当前数超出图片总数!');
      return;
    }
    this.$imgBox.find('li').eq(this.options.imgDisplay).css('display','block');
    this.bindEvent();
  };

  //绑定事件
  Plugin.prototype.bindEvent = function() {
    var prev = this.options.prevBotton;
    var next = this.options.nextBotton;
    this.$box.on('click', next, $.proxy(this.nextEvent, this));
    this.$box.on('click', prev, $.proxy(this.prevEvent, this));
  };

  //下一张事件
  Plugin.prototype.nextEvent = function() {
    var _this = this;
    _this.options.imgDisplay++;
    if (_this.options.imgDisplay == _this.imgLength) {
      _this.options.imgDisplay = 0;
    }
    _this.$imgBox.find('li').eq(_this.options.imgDisplay).css('display','block').siblings('li').css('display','none');
  };

  //上一张事件
  Plugin.prototype.prevEvent = function() {
    var _this = this;
    if (_this.options.imgDisplay == 0) {
      _this.options.imgDisplay = _this.imgLength;
    }
    _this.options.imgDisplay--;
    _this.$imgBox.find('li').eq(_this.options.imgDisplay).css('display','block').siblings('li').css('display','none');
  };

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
