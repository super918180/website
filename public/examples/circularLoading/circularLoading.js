//环形进度条start
(function($) {
    var CircularLoading = (function() {
        function CircularLoading(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CircularLoading.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CircularLoading.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.size = _this.settings.size;
                _this.border = _this.settings.border;
                _this.bgColor = _this.settings.bgColor;
                _this.frontColor = _this.settings.frontColor;
                _this.containerBorder = parseInt(_this.size) + parseInt(_this.border) * 2;
                _this.fontSize = _this.settings.fontSize;
                _this._initCircularDom();
            },
            //绘制dom结构
            _initCircularDom: function() {
                var _this = this;
                var domHtml = '<div id="circular_box">';
                domHtml += '<div id="circular_bg_right"></div>';
                domHtml += '<div id="circular_rount_right"></div>';
                domHtml += '<div id="circular_bg_left"></div>';
                domHtml += '<div id="circular_rount_left"></div>';
                domHtml += '<div id="circular_num">0</div>';
                domHtml += '</div>';
                // 先清除容器div的所有样式，在清空里面的内容，最后插入新的内容
                _this.element.removeAttr("style").empty().append(domHtml);
                _this.container_element = _this.element.find("#circular_box");
                _this.container_div = _this.element.find("#circular_box div");
                _this.bg_right_element = _this.element.find("#circular_bg_right");
                _this.bg_left_element = _this.element.find("#circular_bg_left");
                _this.round_right_element = _this.element.find("#circular_rount_right");
                _this.round_left_element = _this.element.find("#circular_rount_left");
                _this.num_element = _this.element.find("#circular_num");
                //设置样式
                _this.container_element.css({
                    'width': _this.containerBorder + 'px',
                    'height': _this.containerBorder + 'px',
                });
                _this.container_div.css({
                    'height': _this.size + 'px',
                    'width': _this.size + 'px'
                });
                _this.bg_right_element.css({
                    'border': _this.bgColor + ' ' + _this.border + 'px solid'
                });
                _this.bg_left_element.css({
                    'border': _this.bgColor + ' ' + _this.border + 'px solid',
                    'clip': 'rect(0,' + _this.containerBorder / 2 + 'px,' + _this.containerBorder + 'px, 0)'
                });
                _this.round_right_element.css({
                    'border': _this.frontColor + ' ' + _this.border + 'px solid',
                    'clip': 'rect(0,' + _this.containerBorder / 2 + 'px,' + _this.containerBorder + 'px, 0)'
                });
                _this.round_left_element.css({
                    'border': _this.frontColor + ' ' + _this.border + 'px solid',
                    'clip': 'rect(0,' + _this.containerBorder + 'px,' + _this.containerBorder + 'px, ' + _this.containerBorder / 2 + 'px)',
                    'display': 'none'
                });
                _this.num_element.css({
                    'font-size': _this.fontSize,
                    'color': _this.frontColor,
                    'line-height': _this.size + 'px',
                    'text-align': 'center',
                    'margin': _this.border + 'px'
                });
            },
            // 进度改变时调用
            numChange: function() {
                var _this = this;
                var currentNum = _this.element.data('num');
                if (parseInt(currentNum) >= 100) {
                    currentNum = '100';
                }
                _this.num_element.text(currentNum + '%');
                if (currentNum <= 50) {
                    _this.round_right_element.css('transform', 'rotate(' + 3.6 * currentNum + 'deg)');
                    _this.round_left_element.css('display', 'none');
                } else {
                    _this.round_right_element.css('transform', 'rotate(180deg)');
                    _this.round_left_element.css('display', 'block');
                    _this.round_left_element.css('transform', 'rotate(' + 3.6 * (currentNum - 50) + 'deg)');
                }
                // 如果进度到100
                if (parseInt(currentNum) >= 100) {
                    _this.removeCircularLoading();
                }
            },
            // 移除环形进度条
            removeCircularLoading: function() {
                var _this = this;
                _this.container_element.fadeOut('slow', function() {
                    _this.container_element.remove();
                });
            }
        };
        // 必须要将该对象返回出去
        return CircularLoading;
    })();
    $.fn.CircularLoading = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CircularLoading');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CircularLoading(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CircularLoading', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        });
    };
    // 默认参数
    $.fn.CircularLoading.defaultValue = {
        // 圆大小
        size: '25',
        // 环大小
        border: '5',
        // 环背景
        bgColor: '#CCC',
        // 进度背景
        frontColor: '#008000',
        // 进度条字体大小
        fontSize: '12px'
    };
})(jQuery);
//环形进度条end
