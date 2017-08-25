/** 
 * 一个简单的轮播图插件
 * @author frosv
 * @version 0.0.1
 * 
 * @param {String} box 整个轮播图盒子
 * @param {String} title 设置当前页数
 * @param {String} imgBox 大图容器
 * @param {String} nextBotton 大图下一页按钮
 */

(function ($, undefind) {
  const pluginName = 'slick';
  let defaults = {
    imgBox: '#switch'
  };

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
      this.boxWidth = this.$imgBox.find('li').width() * this.$imgBox.find('li').length;
      this.init();
    }
    init() {

      //计算图片大小，给外部容器宽度
      
      this.$imgBox.css('width', this.boxWidth);

      this.bindEvent();
    }
    bindEvent() {
      let prev = this.options.prevBotton;
      this.$box.on('click', next, $.proxy(this.nextEvent, this));
    }
    nextEvent() {
      if(parseInt(this.$imgBox.css('marginLeft'),10) == -this.boxWidth){
        this.$imgBox.css('marginLeft', 0)
      }
      let nextWidth = parseInt(this.$imgBox.css('marginLeft'),10) - this.$imgBox.find('li').width();
      this.$imgBox.css('marginLeft', nextWidth)
    }
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
