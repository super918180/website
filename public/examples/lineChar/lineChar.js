class lineChar {
    // 入口函数
    constructor(options) {
        this.settings = options || {};
        // 初始化
        this._init();
    }
    // 初始化插件
    _init() {
        this.id = this.settings.id;
        this.data = this.settings.data;
        this.element = document.getElementById(this.id);
        // x坐标刻度
        this.xText = this.settings.xText;
        //y范围
        this.yScore = this.settings.yScore;
        // y坐标刻度
        this.yText = this._countYText();
        // 宽度
        this.w = this.element.offsetWidth;
        // 高度
        this.h = this.element.offsetHeight;
        // 上右下左离顶部的距离
        this.pos = {
            t: 40,
            r: 20,
            b: 40,
            l: 40
        };
        //动画的步长
        this.step = this.step || 0;
        this._createGrid();
    }
    // 计算y刻度
    _countYText() {
        var yArr = [];
        var max = this.yScore.min;
        while (max <= this.yScore.max + this.yScore.step) {
            yArr.push(max);
            max += this.yScore.step;
        }
        return yArr;
    }
    // 创建一个canvas公共方法
    _createCanvas(w, h) {
        var canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.width = w;
        canvas.height = h;
        return canvas;
    }
    // 绘制canvas背景
    _createGrid() {
        // 绘制网格线
        var canvas = this._createCanvas(this.w, this.h);
        var context = canvas.getContext("2d");
        var linePosArr = [];
        // 画横线
        context.beginPath();
        var gridH = this.h - this.pos.t - this.pos.b;
        var gridW = this.w - this.pos.l - this.pos.r;
        // 横向分成几份
        var h_step = this.yText.length - 1;
        for (var i = 0; i < h_step + 1; i++) {
            // 计算后的高度，离顶部40px
            var currH = i * gridH / h_step + this.pos.t;
            context.moveTo(this.pos.t, currH);
            context.lineTo(this.w - this.pos.r, currH);
            //绘制y轴刻度
            context.textBaseline = "middle";
            context.textAlign = "right";
            context.fillText(this.yText[this.yText.length - i - 1], this.pos.l - 10, currH);
        }
        // 画竖线
        var w_step = this.data.length - 1;
        for (var i = 0; i < w_step + 1; i++) {
            // 计算后的宽度，离左边40px
            var currW = gridW / w_step * i + this.pos.l;
            context.moveTo(currW, this.pos.t);
            context.lineTo(currW, this.h - this.pos.b);
            var currRate = (this.data[i] - this.yScore.min) / (this.yText[this.yText.length - 1] - this.yScore.min);
            linePosArr.push([currW, (1 - currRate) * gridH + this.pos.t]);
            //绘制x轴刻度
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillText(this.xText[i], currW, this.h - this.pos.b + 10);
        }
        context.strokeStyle = "lightgrey";
        context.stroke();
        context.closePath();
        this.element.appendChild(canvas);
        //绘制曲线
        this._createLine(linePosArr, this.w, this.h);
    }
    // 绘制canvas背景
    _createCoordinate() {
        var canvas = this._createCanvas(this.w, this.h);
    }
    // 创建折线和点
    _createLine(data, w, h) {
        // 绘制动态的点和线
        var canvas = this._createCanvas(w, h);
        var context = canvas.getContext("2d");
        // 插入到页面中
        this.element.appendChild(canvas);
        var _this = this;
        var step = _this.step;
        var dataInterval = setInterval(function() {
            if (step <= 1) {
                context.clearRect(0, 0, w, h);
                // 画圆点
                var currH = h - _this.pos.t - _this.pos.b;
                for (var i = 0; i < data.length; i++) {
                    context.beginPath();
                    context.arc(data[i][0], currH - (currH - data[i][1]) * step, 5, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = "rgba(0, 122, 251, 0.6)";
                    context.fill();
                    //点描述
                    context.textAlign="center";
                    context.textBaseline="bottom";
                    context.fillText(_this.data[i],data[i][0], currH - (currH - data[i][1]) * step - 5);
                }
                // 画折线
                context.moveTo(_this.pos.l, currH - (currH - data[0][1]) * step);
                context.lineWidth = 2;
                context.strokeStyle = "rgba(0, 122, 251, 0.6)";
                for (var i = 0; i < data.length - 1; i++) {
                    context.lineTo(data[i + 1][0], currH - (currH - data[i + 1][1]) * step);
                }
                context.stroke();
                context.strokeStyle = "rgba(0, 122, 251, 0)";
                context.lineTo(w - _this.pos.r, h - _this.pos.b);
                context.lineTo(_this.pos.l, h - _this.pos.b);
                context.lineTo(_this.pos.l, currH - (currH - data[0][1]) * step);
                context.stroke();
                context.fillStyle = "rgba(0, 122, 251, 0.2)";
                context.fill();
                document.insert;
                step += 0.05;
            } else {
                step = 0;
                clearInterval(dataInterval);
            }
        }, 20);
    }
    updata(data) {
        this.element.innerHTML = "";
        this.settings.xText = data.xText;
        this.settings.yText = data.yText;
        this.settings.data = data.data;
        this.step = 0;
        this._init();
    }
    addData(data) {
        this.element.innerHTML = "";
        this.settings.xText.shift();
        this.settings.xText.push(data[0]);
        this.settings.data.shift();
        this.settings.data.push(data[1]);
        this.step = 1;
        this._init();
    }
}
