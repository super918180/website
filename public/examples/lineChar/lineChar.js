(function($) {
    var lineChar = (function() {
        function lineChar(element, options) {
            this.settings = $.extend(false, $.fn.lineChar.defaultValue, options || {});
            this.element = element;
            this._init();
        }
        lineChar.prototype = {
            // 初始化插件
            _init: function() {
                this.data = this.settings.data;
                this.id = this.element.attr("id");
                this._initCanvas();
            },
            //绘制dom结构
            _initCanvas: function() {
                //绘制网格线
                var canvas = document.getElementById(this.id);
                var context = canvas.getContext('2d');
                var linePosArr = [];
                var w = canvas.width;
                var h = canvas.height;
                // 画横线
                context.beginPath();
                var h_step = 10;
                for (var i = 0; i < h_step + 1; i++) {
                    context.moveTo(0, i * h / h_step);
                    context.lineTo(w, i * h / h_step);
                }
                // 画竖线
                var w_step = this.data.length - 1;
                for (var i = 0; i < w_step + 1; i++) {
                    context.moveTo(w / w_step * i, 0);
                    context.lineTo(w / w_step * i, h);
                    linePosArr.push([w / w_step * i, (1 - this.data[i]) * h]);
                }
                context.strokeStyle = 'lightgrey';
                context.stroke();
                context.closePath();
                //画圆点
                for (var i = 0; i < linePosArr.length; i++) {
                    context.beginPath();
                    context.arc(linePosArr[i][0], linePosArr[i][1], 5, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = 'rgba(255, 0, 0, 0.6)';
                    context.fill();
                }
                //画折线
                context.moveTo(0, linePosArr[0][1]);
                context.lineWidth = 2;
                context.strokeStyle = "rgba(255, 0, 0, 0.6)"
                for (var i = 0; i < linePosArr.length - 1; i++) {
                    context.lineTo(linePosArr[i + 1][0], linePosArr[i + 1][1]);
                }
                context.stroke();
                context.strokeStyle = "rgba(255, 0, 0, 0)";
                context.lineTo(w, h);
                context.lineTo(0, h);
                context.lineTo(0, linePosArr[0][1]);
                context.stroke();
                context.fillStyle = "rgba(255, 0, 0, 0.2)";
                context.fill();
            },

        };
        // 必须要将该对象返回出去
        return lineChar;
    })();
    $.fn.lineChar = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('lineChar');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new lineChar(_this, options);
                // 将当前实例保存到data数据中
                _this.data('lineChar', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        });
    };
    // 默认参数
    $.fn.lineChar.defaultValue = {
        data: []
    };
})(jQuery);