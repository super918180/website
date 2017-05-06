class CircleChar {
    /**
     * Creates an instance of CircleChar.
     * @param {String} id : canvas id
     * @param {Number} target : 目标值
     * @param {Number} type : 环形图类型
     * @param {Number} isFull : 是否整圆
     * @param {String} color : 环形图颜色
     * 
     * @memberof CircleChar
     */
    constructor(id, target, type, isFull, color) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.type = type;
        this.isFull = isFull;
        this.color = color;
        this.process = 0;
        this.animate(target);
    }
    animate(target) {
        let _this = this;
        let animationId = requestAnimationFrame(function() {
            if (_this.process != target) {
                _this.process < target ? ++_this.process : --_this.process
                _this.draw(_this.ctx, _this.process);
                _this.animate(target, _this.process);
            } else {
                animationId && cancelAnimationFrame(animationId);
            }
        });
    }
    draw(ctx, percent) {
        let [w, h, r, t, c] = [this.w, this.h, Math.min(this.w, this.h) / 2, this.type, this.color];
        ctx.clearRect(0, 0, w, h);
        // 画灰色的圆
        ctx.beginPath();
        if (t == 0) {
            this.drawCircle(ctx, r, '#F6F6F6', 20, 20, r - 20, r - 20, percent, this.isFull);
        } else if (t == 1) {
            this.drawCircle(ctx, r, c, 2, 15, r - 20, r - 35, percent, this.isFull);
        } else if (t == 2) {
            this.drawCircle(ctx, r, c, 2, 15, r - 20, r - 20, percent, this.isFull);
        } else if (t == 3) {
            this.drawCircle(ctx, r, '#F6F6F6', 2, 2, r - 20, r - 20, percent, this.isFull);
        }
        ctx.strokeStyle = c;
        ctx.stroke();

        // 填充文字
        ctx.beginPath();
        ctx.font = "bold 20pt Microsoft YaHei";
        ctx.fillStyle = c;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percent + '%', r, r);
    }
    drawCircle(ctx, r, c, outW, inW, outR, inR, percent, isFull) {
        // 画灰色的圆
        ctx.lineWidth = outW;
        ctx.strokeStyle = c;
        if (isFull) {
            ctx.arc(r, r, outR, 0, Math.PI * 2);
        } else {
            ctx.arc(r, r, outR, Math.PI * 0.75, Math.PI * 0.25);
        }
        ctx.stroke();
        // 画进度环
        ctx.beginPath();
        if (isFull) {
            ctx.arc(r, r, inR, Math.PI * 1.5, Math.PI * (1.5 + 2 * percent / 100));
        } else {
            ctx.arc(r, r, inR, Math.PI * .75, Math.PI * (.75 + 1.5 * percent / 100));
        }
        ctx.lineWidth = inW;
    }
}