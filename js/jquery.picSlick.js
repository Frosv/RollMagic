/** 
 * 一个简单的轮播图插件
 * @author frosv
 * @version 0.0.1
 * @name slick
 * 
 * @param {String} box 整个轮播图盒子
 * @param {String} imgBox 大图容器
 * @param {String} prevBotton 大图上一页按钮
 * @param {String} nextBotton 大图下一页按钮
 * @param {Boolean} autoPlay 自动播放
 * @param {Number} autoPlayTime 自动播放间隔
 */

(function ($, undefind) {
  const pluginName = 'slick';
  let defaults = {
    box: '#demo',
    imgBox: '#switch',
    prevBotton: '',
    nextBotton: '',
    autoPlay: false,
    autoPlayTime: 3000
  };

  /**
   * 动画列队
   * 
   * @param {Element} $imgBox 移动的容器
   * @param {Number} moveWidth 移动的距离
   * @param {Number} boxWidth 容器宽度
   * @param {Number} imgBoxWidth 图片宽度
   */

  function animateQueue($imgBox, moveWidth, boxWidth, imgBoxWidth) {
    //添加状态码，防止多次触发
    $imgBox.animating = true;

    $imgBox.animate({
      marginLeft: moveWidth
    }, 'fast', function () {
      //动画执行完成后允许触发点击效果
      $imgBox.animating = false;

      //判断是否到了克隆区域，在动画执行完之后直接跳到相应位置，避免视觉误差
      if (parseInt($imgBox.css('marginLeft'), 10) === -boxWidth + imgBoxWidth) {
        $imgBox.css('marginLeft', -imgBoxWidth);
      } else if (parseInt($imgBox.css('marginLeft'), 10) === 0) {
        $imgBox.css('marginLeft', -boxWidth + (imgBoxWidth * 2));
      }
    });
  }

  /**
   * 克隆第一张和最后一张，并添加到头尾，做好轮播准备
   * 
   * @param {String} $imgBox 图片容器
   */

  function cloneNode($imgBox) {
    let $imgBoxLi = $imgBox.find('li');
    let fristNode = $imgBoxLi.eq(0).clone();
    let lastNode = $imgBoxLi.eq(-1).clone();
    $imgBoxLi.eq(0).before(lastNode);
    $imgBoxLi.eq(-1).after(fristNode);
  }

  /**
   * 自动播放
   * 
   * @param {Element} $imgBox 移动容器
   * @param {Element} next 下一个按钮
   * @param {Number} time 自动播放间隔 3000(ms)
   */
  function autoPlay($imgBox,next, time) {

    let setTime = setInterval(function () {
      $(next).trigger('click')
    }, time);

    $imgBox.hover(function(){
      clearInterval(setTime);
    },function(){
      setTime = setInterval(function () {
        $(next).trigger('click')
      }, time);
    });

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

      //动画播放状态码
      this.$imgBox.animating = false;

      //克隆第一个和最后一个
      cloneNode(this.$imgBox);

      //在这里获取li宽度是因为clone后的长度会变化不能提交缓存
      this.$imgBoxLi = this.$imgBox.find('li');
      this.liLength = this.$imgBoxLi.length;
      this.imgBoxWidth = this.$imgBoxLi.eq(0).width();
      this.boxWidth = this.imgBoxWidth * this.liLength;

      this.timeSet = null;

      this.init();
    }

    init() {

      //计算图片大小，给外部容器宽度
      this.$imgBox.css('width', this.boxWidth);

      //clone后应移动到应该显示的第一张
      this.$imgBox.css('marginLeft', -this.imgBoxWidth);

      //开始自动播放
      if (this.options.autoPlay) {
        autoPlay(this.$imgBox,this.options.nextBotton,this.options.autoPlayTime);
      }

      this.bindEvent();
    }

    bindEvent() {
      let next = this.options.nextBotton;
      let prev = this.options.prevBotton;

      //重新定义上下文的this，分开写事件是为了方便调用
      this.$box.on('click', next, $.proxy(this.nextEvent, this));
      this.$box.on('click', prev, $.proxy(this.prevEvent, this));
    }

    nextEvent() {
      if (!this.$imgBox.animating) {

        let nextWidth = parseInt(this.$imgBox.css('marginLeft'), 10) - this.imgBoxWidth;

        //动画列队
        animateQueue(this.$imgBox, nextWidth, this.boxWidth, this.imgBoxWidth);
      }
    }
    
    prevEvent() {
      if (!this.$imgBox.animating) {

        let nextWidth = parseInt(this.$imgBox.css('marginLeft'), 10) + this.imgBoxWidth;

        //动画列队
        animateQueue(this.$imgBox, nextWidth, this.boxWidth, this.imgBoxWidth);
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
