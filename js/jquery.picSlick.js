/** 
 * 一个简单的轮播图插件
 * @author frosv
 * @version 0.0.1
 * 
 * @param {String} box 整个轮播图盒子
 * @param {String} title 设置当前页数
 * @param {String} imgBox 大图容器
 * @param {String} prevBotton 大图上一页按钮
 * @param {String} nextBotton 大图下一页按钮
 */

(function ($, undefind) {
  const pluginName = 'slick';
  let defaults = {
    box: '#demo',
    imgBox: '#switch',
    title: '',
    prevBotton: '',
    nextBotton: ''
  };

  /**
   * 动画列队
   * 
   * @param {Element} _this 移动的容器
   * @param {Number} moveWidth 移动的距离
   */
  function animateQueue(_this, moveWidth) {
    _this.queue(function () {
      _this.animating = true;

      _this.animate({
        marginLeft: moveWidth
      }, 'fast', function () {
        _this.animating = false;
      });
      _this.dequeue();
    });
  }

  function cloneNode($imgBoxLi) {
    let fristNode = $imgBoxLi.eq(0).clone();
    let lastNode = $imgBoxLi.eq(-1).clone();
    $imgBoxLi.eq(0).before(lastNode);
    $imgBoxLi.eq(-1).before(fristNode);
  }

  /**
   * 插件主体
   * 
   * @class Plugin
   */
  class Plugin {
    constructor(element, options) {
      this.options = $.extend({}, defaults, options);
      this.$box = $(this.options.box);
      this.$imgBox = $(this.options.imgBox);
      this.$imgBox.animating = false;
      this.$imgBoxLi = this.$imgBox.find('li');
      // cloneNode(this.$imgBoxLi);
      this.imgBoxWidth = this.$imgBoxLi.eq(0).width();
      this.boxWidth = this.imgBoxWidth * this.$imgBoxLi.length;

      this.init();
    }

    init() {
      //计算图片大小，给外部容器宽度
      this.$imgBox.css('width', this.boxWidth);

      this.bindEvent();
    }

    bindEvent() {
      let next = this.options.nextBotton;
      let prev = this.options.prevBotton;
      this.$box.on('click', next, $.proxy(this.nextEvent, this));
      this.$box.on('click', prev, $.proxy(this.prevEvent, this));
    }

    nextEvent() {
      if (!this.$imgBox.animating) {
        //判断是否最后一张
        if (parseInt(this.$imgBox.css('marginLeft'), 10) == -this.boxWidth + this.imgBoxWidth) {
          this.$imgBox.css('marginLeft', 0);
          return;
        }

        let nextWidth = parseInt(this.$imgBox.css('marginLeft'), 10) - this.imgBoxWidth;

        animateQueue(this.$imgBox, nextWidth);
      }
    }
    prevEvent() {
      if (!this.$imgBox.animating) {
        //判断是否是第一张
        if (parseInt(this.$imgBox.css('marginLeft'), 10) == 0) {
          this.$imgBox.css('marginLeft', -this.boxWidth + this.imgBoxWidth);
          return;
        }

        let nextWidth = parseInt(this.$imgBox.css('marginLeft'), 10) + this.imgBoxWidth;

        animateQueue(this.$imgBox, nextWidth);
      }
    }
  };

  //暴露方法
  $.fn[pluginName] = function (options) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function () {
      var $this = $(this);
      var data = $this.data('plugin_' + pluginName);

      if (!data) {
        $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
      }

      /**
       * @function 快速调用组件内部方法
       * 
       * @example $element.pluginName('method')
       * 
       * @param {String} pluginName 插件名称
       * @param {String} method 组件内暴露的方法
       * 
       * @return {Function} 调用插件内暴露的方法
       */

      if (typeof options === 'string') {
        data[options].apply(data, args);
      }
    });
  };

})(jQuery);