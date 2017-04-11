// 作品显示列表
! function($) {
    var CreateShowItem = function(config) {
        var_this = this;
        // 默认配置
        this.config = {
            link: '',
            img: '',
            title: '',
            des: '',
            tag: [],
            see: 0,
            love: 0
        };
        if (config && $.isPlainObject(config)) {
            $.extend(this.config, config);
        }
        this._initDom();
    };
    CreateShowItem.prototype = {
        _initDom: function() {
            var container = $('<div class="col-lg-4 col-md-3 col-sm-4">');
            var img = $('<a href="' + this.config.link + '" target="_blank"><img src="' + this.config.img + '"></a>');
            var info = $('<div class="cover-info"><a href="' + this.config.link + '" target="_blank"><h4>' + this.config.title + '</h4></a><small>' + this.config.des + '</small></div>');
            var tag = $(' <div class="cover-fields"><i class="fa fa-list-ul"></i> &nbsp; ' + this.config.tag.toString() + '</div>');
            var state = $('<div class="cover-stat"><i class="fa fa-eye"></i><span class="f10"> &nbsp;' + this.config.see + '</span><i class="fa fa-heart"></i></i><span class="f10"> &nbsp;' + this.config.love + '</span></div>')
            $('#allList').append(container.append(img, info, tag, state));
        }
    };
    $.CreateShowItem = function(config) {
        return new CreateShowItem(config);
    };
}(jQuery);