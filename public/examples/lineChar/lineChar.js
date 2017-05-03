var lineChar = function(options) {
    this.settings = options || {};
    this._init();
}
lineChar.prototype = {
    // 初始化插件
    _init: function() {
        this.data = this.settings.data;
        this.id = this.settings.id;
        this._initCanvasBg();
    },
    //绘制canvas背景
    _initCanvasBg: function() {
        //绘制网格线
        var canvas = document.getElementById(this.id);
        canvas.style.position = "absolute";
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
        //绘制动态的点和线
        var canvas2 = document.createElement('canvas');
        var context2 = canvas2.getContext('2d');
        canvas2.width = w;
        canvas2.height = h;
        canvas2.style.position = "absolute";
        // 插入到页面中
        var parentNode = document.getElementById(this.id).parentNode;
        parentNode.style.position = "relative";
        parentNode.appendChild(canvas2);
        this._initDataLine(context2, linePosArr, w, h);

    },
    _initDataLine: function(context, data, w, h) {
        var step = 0;
        var dataInterval = setInterval(function() {
            step += 0.02;
            if (step <= 1) {
                context.clearRect(0, 0, w, h);
                //画圆点
                for (var i = 0; i < data.length; i++) {
                    context.beginPath();
                    context.arc(data[i][0], h - (h - data[i][1]) * step, 5, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = 'rgba(255, 0, 0, 0.6)';
                    context.fill();
                }
                //画折线
                context.moveTo(0, h - (h - data[0][1]) * step);
                context.lineWidth = 2;
                context.strokeStyle = "rgba(255, 0, 0, 0.6)";
                for (var i = 0; i < data.length - 1; i++) {
                    context.lineTo(data[i + 1][0], h - (h - data[i + 1][1]) * step);
                }
                context.stroke();
                context.strokeStyle = "rgba(255, 0, 0, 0)";
                context.lineTo(w, h);
                context.lineTo(0, h);
                context.lineTo(0, h - (h - data[0][1]) * step);
                context.stroke();
                context.fillStyle = "rgba(255, 0, 0, 0.2)";
                context.fill();
                document.insert
            } else {
                clearInterval(dataInterval);
            }
        }, 50);
    }
};