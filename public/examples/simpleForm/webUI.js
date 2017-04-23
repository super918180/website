//环形精度条start
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
//环形精度条end

//输入框start
(function($) {
    var CreateInput = (function() {
        function CreateInput(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateInput.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateInput.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.type = _this.settings.type;
                _this.spec = _this.settings.spec;
                _this.length = _this.settings.length;
                _this.placeholder = _this.settings.placeholder;
                _this.isRequired = _this.settings.isRequired;
                _this._initInputDom();
            },
            //初始化输入框DOM结构
            _initInputDom: function() {
                var _this = this,
                    inputContainer = $('<div></div>'),
                    inputContent = $('<input type="' + _this.type + '"></input>'),
                    inputResult = $('<div></div>');
                inputContainer.addClass('input_container');
                inputContent.addClass('input_text input_text_blur');
                inputResult.addClass('input_result');
                inputContainer.append(inputContent);
                inputContainer.append(inputResult);
                _this.element.append(inputContainer);
                // 记录当前需要操作的dom
                _this.input = _this.element.find('input');
                _this.container = _this.element.find('.input_container');
                if (_this.placeholder !== null) {
                    _this.input.prop('placeholder', _this.placeholder);
                }
                _this._initEvent();
            },
            // 绑定事件
            _initEvent: function() {
                var _this = this;
                // 获取焦点focus,失去焦点blur,值改变change
                // 如果输入框只读的话就不操作
                _this.input.focus(function() {
                    if (!$(this).attr('readonly')) {
                        _this._setStatus(this, 'focus');
                    }
                }).blur(function() {
                    if (!$(this).attr('readonly')) {
                        if (_this.getValue() === '') {
                            if (_this.isRequired) {
                                // 必填项失去焦点
                                _this._setStatus(this, 'error');
                            } else {
                                // 非必填项失去焦点
                                _this._setStatus(this, 'blur');
                            }
                        } else {
                            // 有值得情况直接进行值校验
                            if (_this._checkSpec()) {
                                _this._setStatus(this, 'right');
                            } else {
                                _this._setStatus(this, 'error');
                            }
                        }
                    }
                }).keyup(function() {
                    _this._checkLenght();
                });;
            },
            //校验输入框输入内容
            _checkSpec: function() {
                var _this = this;
                return _this.spec.test(_this.getValue());
            },
            //检验输入框输入长度
            _checkLenght: function() {
                var _this = this,
                    inputLength = _this.length,
                    //8-32这种格式的范围
                    currentLength = _this.getValue().length,
                    // 长度是否在范围内
                    lengthFlag = true;
                if (/^\d+-\d+$/.test(inputLength)) {
                    // 区间范围
                    var valueRange = inputLength.split('-');
                    //当前值长度小于设定范围
                    if (parseInt(valueRange[0], 10) > currentLength) {
                        lengthFlag = false;
                    }
                    //当前值长度大于设定范围，屏蔽输入
                    if (currentLength > parseInt(valueRange[1], 10)) {
                        _this.setValue(_this.getValue().substring(0, parseInt(valueRange[1], 10)));
                    }
                } else if (/^\d+$/.test(inputLength)) {
                    // 固定长度
                    // 当前长度不等于设定长度
                    if (currentLength !== parseInt(inputLength, 10)) {
                        lengthFlag = false;
                    }
                }
                // 长度不在区间飘红
                if (!lengthFlag) {
                    _this._setStatus(_this.input, 'error');
                } else {
                    _this._setStatus(_this.input, 'focus');
                }

            },
            //设置输入框状态，正确，错误，失去焦点，获得焦点
            _setStatus: function(inputObj, status) {
                $(inputObj).removeClass('input_text_focus input_text_blur input_text_right input_text_error');
                $(inputObj).siblings('.input_result').removeClass('input_result_right input_result_error');
                if (status === "right") {
                    $(inputObj).addClass('input_text_right');
                    $(inputObj).siblings('.input_result').addClass('input_result_right').text('√');
                } else if (status === "error") {
                    $(inputObj).addClass('input_text_error')
                    $(inputObj).siblings('.input_result').addClass('input_result_error').text('×');
                } else if (status === "blur") {
                    $(inputObj).addClass('input_text_blur');
                } else if (status === "focus") {
                    $(inputObj).addClass('input_text_focus');
                }
            },
            //设置输入框大小
            setSize: function(size) {
                var _this = this;
                var scaleSize = 1;
                if (size === 'small') {
                    scaleSize = 0.8;
                } else if (size === 'big') {
                    scaleSize = 1.2;
                } else if (parseInt(size, 10) !== NaN) {
                    scaleSize = parseInt(size, 10)
                };
                _this.container.css('transform', 'scale(' + scaleSize + ')');
            },
            //输入框置灰
            setGrey: function(flag) {
                var _this = this;
                if (flag) {
                    _this.input.prop('readonly', '');
                } else {
                    _this.input.removeAttr('readonly');
                }
            },
            //获取输入框值
            getValue: function() {
                return this.input.val();
            },
            //设置输入框值
            setValue: function(str) {
                this.input.val(str);
            }
        };
        // 必须要将该对象返回出去
        return CreateInput;
    })();
    $.fn.CreateInput = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateInput');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateInput(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateInput', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateInput.defaultValue = {
        // 输入框类型：text,password
        type: "text",
        //输入框规则
        spec: null,
        //长度
        length: null,
        //描述输入字段
        placeholder: null,
        //是否必填
        isRequired: false
    };
})(jQuery);
//输入框end

//单选按钮start
(function($) {
    var CreateRadio = (function() {
        function CreateRadio(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateRadio.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateRadio.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.group = _this.settings.group;
                _this.textArr = _this.settings.textArr;
                _this.checkedIndex = _this.settings.checkedIndex;
                _this.changeFunc = _this.settings.changeFunc;
                _this._initRadioDom();
            },
            _initRadioDom: function() {
                var _this = this,
                    parentId = _this.element.attr('id'),
                    radioHtmlStr = '';
                for (var i = 0; i < _this.textArr.length; i++) {
                    radioHtmlStr += '<div class="ui_radio_group">';
                    radioHtmlStr += '<input class="ui_raido" type="radio" name="' + _this.group + '" id="' + parentId + '_radio' + i + '">';
                    radioHtmlStr += '<label class="ui_radio_label" for="' + parentId + '_radio' + i + '"></label>'
                    radioHtmlStr += '<span>' + _this.textArr[i] + '</span></div>';
                }
                _this.element.append(radioHtmlStr);
                _this.input = _this.element.find('input');
                _this.label = _this.element.find('label');
                _this.input.eq(_this.checkedIndex).prop('checked', 'checked');
                _this._initEvent();
            },
            _initEvent: function() {
                var _this = this;
                // 切换单选按钮是触发的动作，通过判断当前点中按钮状态是否改变判断
                _this.label.click(function() {
                    if (!$(this).siblings('input').is(':checked')) {
                        if ($.type(_this.changeFunc) === 'function') {
                            _this.changeFunc();
                        }
                    }
                });
            },
            //输入框置灰
            setGrey: function(flag) {
                var _this = this;
                if (flag) {
                    _this.label.addClass('ui_radio_label_grey');
                    _this.input.prop('disabled', '');
                } else {
                    _this.label.removeClass('ui_radio_label_grey');
                    _this.input.removeAttr('disabled');
                }
            },
            //获取输入框值
            getValue: function() {
                var _this = this,
                    selectIndex = 0;
                _this.input.each(function(index, el) {
                    if ($(this).is(':checked')) {
                        selectIndex = index;
                    }
                });
                return selectIndex;
            },
            //设置输入框值
            setValue: function(index) {
                this.input.removeAttr('checked');
                this.input.eq(index).attr('checked', 'checked');
            }

        };
        // 必须要将该对象返回出去
        return CreateRadio;
    })();
    $.fn.CreateRadio = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateRadio');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateRadio(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateRadio', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateRadio.defaultValue = {
        // 所属组
        group: '',
        //显示的文字
        textArr: [],
        // 默认选中项
        checkedIndex: 0,
        //值改变的时候调用
        changeFunc: null
    };
})(jQuery);
//单选按钮end

//复选按钮start
(function($) {
    var CreateCheckbox = (function() {
        function CreateCheckbox(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateCheckbox.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateCheckbox.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.group = _this.settings.group;
                _this.textArr = _this.settings.textArr;
                _this.valueArr = _this.settings.valueArr;
                _this.hasSelectAll = _this.settings.hasSelectAll;
                _this.changeFunc = _this.settings.changeFunc;
                _this._initRadioDom();
            },
            _initRadioDom: function() {
                var _this = this,
                    parentId = _this.element.attr('id'),
                    radioHtmlStr = '';
                // 添加全选
                if (_this.hasSelectAll) {
                    _this.textArr.unshift('全选');
                    _this.valueArr.unshift('All');
                }
                for (var i = 0; i < _this.textArr.length; i++) {
                    radioHtmlStr += '<div class="ui_checkbox_group">';
                    radioHtmlStr += '<input class="ui_checkbox" type="checkbox" name="' + _this.group + '" id="' + parentId + '_checkbox' + i + '">';
                    radioHtmlStr += '<label class="ui_checkbox_label" for="' + parentId + '_checkbox' + i + '"></label>'
                    radioHtmlStr += '<span>' + _this.textArr[i] + '</span></div>';
                }
                _this.element.append(radioHtmlStr);
                _this.input = _this.element.find('input');
                // 如果有全选的话给全选加一个class
                if (_this.hasSelectAll) {
                    _this.input.eq(0).addClass('ui_checkbox_selectAll');
                }
                _this.label = _this.element.find('label');
                _this._initEvent();
            },
            _initEvent: function() {
                var _this = this;
                // 切换单选按钮是触发的动作，通过判断当前点中按钮状态是否改变判断
                _this.input.change(function() {
                    // 如果是点击全选触发的那么要勾选或者去勾选所有的
                    if ($(this).hasClass('ui_checkbox_selectAll')) {
                        // 全选勾选
                        if ($(this).is(':checked')) {
                            //置灰的按钮不操作
                            _this.input.not('.ui_checkbox_grey').prop("checked", "checked");
                        } else {
                            // 全选去勾选
                            _this.input.not('.ui_checkbox_grey').removeAttr("checked");
                        }
                    } else {
                        // 除全选外的选项如果没被选中的个数为0，那么说明说有的都被选中，此时全选勾选
                        if (_this.input.not('.ui_checkbox_selectAll').not(':checked,.ui_checkbox_grey').length === 0) {
                            _this.input.eq(0).prop("checked", "checked");
                        } else {
                            if (_this.hasSelectAll) {
                                _this.input.eq(0).removeAttr("checked");
                            }
                        }
                    }
                    //每次值改变的时候自定义函数
                    if ($.type(_this.changeFunc) === 'function') {
                        _this.changeFunc();
                    }
                });
            },
            //多选框置灰
            setGrey: function(flag, greyArr) {
                var _this = this;
                if (flag) {
                    for (var i = 0; i < greyArr.length; i++) {
                        _this.input.eq(greyArr[i]).prop('disabled', 'disabled').addClass('ui_checkbox_grey').siblings('label').addClass('ui_checkbox_grey');
                    }
                } else {
                    for (var i = 0; i < greyArr.length; i++) {
                        _this.input.eq(greyArr[i]).removeAttr('disabled').addClass('ui_checkbox_grey').siblings('label').removeClass('ui_checkbox_grey');
                    }
                }
            },
            //获取输入框值
            getValue: function() {
                var _this = this,
                    selectIndexArr = [];
                _this.input.each(function(index, el) {
                    if ($(this).is(':checked')) {
                        selectIndexArr.push(index);
                    }
                });
                return selectIndexArr;
            },
            //设置输入框值
            setValue: function(indexArr) {
                this.input.removeAttr('checked');
                for (var i = 0; i < indexArr.length; i++) {
                    this.input.eq(indexArr[i]).prop('checked', 'checked');
                }
            }

        };
        // 必须要将该对象返回出去
        return CreateCheckbox;
    })();
    $.fn.CreateCheckbox = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateCheckbox');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateCheckbox(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateCheckbox', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateCheckbox.defaultValue = {
        // 所属组
        group: '',
        //显示的文字
        textArr: [],
        //checkbox每一项对应的值
        valueArr: [],
        //全选
        hasSelectAll: true,
        //值改变的时候调用
        changeFunc: null
    };
})(jQuery);
//复选按钮end

// 开关start
(function($) {
    var CreateSwitch = (function() {
        function CreateSwitch(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateSwitch.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateSwitch.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.status = _this.settings.status;
                _this.changeFunc = _this.settings.changeFunc;
                _this._initRadioDom();
            },
            _initRadioDom: function() {
                var _this = this,
                    switchBackground = $('<div class="ui_switch_background"></div>'),
                    switchFront = $('<div class="ui_switch_front"></div>');
                switchBackground.append(switchFront);
                if (_this.status === 'on') {
                    switchBackground.addClass('ui_switch_background_on');
                    switchFront.addClass('ui_switch_front_on')
                } else {
                    switchBackground.addClass('ui_switch_background_off');
                    switchFront.addClass('ui_switch_front_off')
                }
                _this.element.append(switchBackground);
                _this.switchBackground = _this.element.find('.ui_switch_background')
                _this.switchFront = _this.element.find('.ui_switch_front')
                _this._initEvent();
            },
            _initEvent: function() {
                var _this = this;
                _this.switchBackground.click(function() {
                    if (!_this.switchBackground.hasClass('ui_switch_background_grey')) {
                        if (_this.getValue() === "on") {
                            _this.switchBackground.removeClass('ui_switch_background_on').addClass('ui_switch_background_off');
                            _this.switchFront.removeClass('ui_switch_front_on').addClass('ui_switch_front_off');
                        } else {
                            _this.switchBackground.removeClass('ui_switch_background_off').addClass('ui_switch_background_on');
                            _this.switchFront.removeClass('ui_switch_front_off').addClass('ui_switch_front_on');
                        }
                        //每次值改变的时候自定义函数
                        if ($.type(_this.changeFunc) === 'function') {
                            _this.changeFunc();
                        }
                    }
                });
            },
            //置灰
            setGrey: function(flag) {
                //todo
                var _this = this;
                if (flag) {
                    _this.switchBackground.addClass('ui_switch_background_grey');
                } else {
                    _this.switchBackground.removeClass('ui_switch_background_grey');
                }

            },
            //获取值
            getValue: function() {
                var _this = this;
                if (_this.switchFront.hasClass('ui_switch_front_on')) {
                    return "on";
                } else {
                    return "off";
                }
            },
            //设置值
            setValue: function(status) {
                var _this = this;
                if (status === "on") {
                    _this.switchBackground.removeClass('ui_switch_background_off').addClass('ui_switch_background_on');
                    _this.switchFront.removeClass('ui_switch_front_off').addClass('ui_switch_front_on');
                } else {
                    _this.switchBackground.removeClass('ui_switch_background_on').addClass('ui_switch_background_off');
                    _this.switchFront.removeClass('ui_switch_front_on').addClass('ui_switch_front_off');
                }
            }

        };
        // 必须要将该对象返回出去
        return CreateSwitch;
    })();
    $.fn.CreateSwitch = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateSwitch');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateSwitch(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateSwitch', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateSwitch.defaultValue = {
        // 状态
        status: 'on',
        changeFunc: null
    };
})(jQuery);
// 开关end

//按钮start
(function($) {
    var CreateButton = (function() {
        function CreateButton(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateButton.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateButton.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.title = _this.settings.title;
                _this.ckickFunc = _this.settings.ckickFunc;
                _this._initRadioDom();
            },
            _initRadioDom: function() {
                var _this = this;
                var buttomDom = $('<button class="ui_button ">' + _this.title + '</button>');
                buttomDom.append('<div class="ui_button_circle"></div>');
                _this.element.append(buttomDom)
                _this.button = _this.element.find('button');
                _this.buttonCircle = _this.element.find('.ui_button_circle');
                _this._initEvent();
            },
            _initEvent: function() {
                var _this = this;
                _this.button.click(function(e) {
                    if (!_this.button.hasClass('ui_button_grey')) {
                        if ($.type(_this.ckickFunc) === 'function') {
                            _this.ckickFunc();
                        }

                        //点击按钮的时候添加圆放大效果
                        _this.buttonCircle.removeClass('ui_button_circle_show');
                        _this.buttonCircle.css({ 'left': e.offsetX - 100 + 'px', 'top': e.offsetY - 100 + 'px' }).show();
                        // 必须加延时才有动画效果
                        setTimeout(function() {
                            _this.buttonCircle.addClass('ui_button_circle_show');
                        }, 0);
                        setTimeout(function() {
                            _this.buttonCircle.hide();
                        }, 600);
                    }
                });
            },
            //置灰
            setGrey: function(flag) {
                var _this = this;
                if (flag) {
                    _this.button.addClass('ui_button_grey');
                } else {
                    _this.button.removeClass('ui_button_grey');
                }
            }

        };
        // 必须要将该对象返回出去
        return CreateButton;
    })();
    $.fn.CreateButton = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateButton');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateButton(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateButton', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateButton.defaultValue = {
        title: "",
        //点击的时候调用
        ckickFunc: null
    };
})(jQuery);
//按钮end
//Tab页签end
(function($) {
    var CreateTab = (function() {
        function CreateTab(element, options) {
            // 将用户配置项与默认选项进行深拷贝
            this.settings = $.extend(true, $.fn.CreateTab.defaultValue, options || {});
            this.element = element;
            this.init();
        }
        CreateTab.prototype = {
            // 初始化插件
            init: function() {
                var _this = this;
                _this.dataArr = _this.settings.dataArr;
                _this._initRadioDom();
            },
            _initRadioDom: function() {
                var _this = this;
                var tabTitleHtml = '';
                var tabContentHtml = '';
                for (var i = 0; i < _this.dataArr.length; i++) {
                    tabTitleHtml += '<div class="ui_tab_nav" index="' + [i] + '">' + _this.dataArr[i][0] + '</div>';
                    // 自定义ID
                    if ($.type(_this.dataArr[i][1]) === 'string') {
                        tabContentHtml += '<div id="' + _this.dataArr[i][1] + '">' + _this.dataArr[i][2] + '</div>';
                    } else {
                        // 非自定义ID，自动生成一个ID
                        tabContentHtml += '<div id="' + $(_this).attr('id') + '_tab_content' + [i] + '">' + _this.dataArr[i][2] + '</div>';
                    }
                }
                $(_this.element).append(tabTitleHtml).append('<div class="ui_tab_content">');
                _this.tabNav = $(_this.element).find('.ui_tab_nav');
                _this.tabNav.eq(0).addClass('ui_tab_nav_active');
                _this.tabNav.append('<div class="ui_button_circle"></div>');
                $(_this.element).find('.ui_tab_content').append(tabContentHtml);
                $(_this.element).find('.ui_tab_content').children('div').eq(0).siblings('div').hide();
                _this._initEvent();
            },
            _initEvent: function() {
                var _this = this;
                _this.tabNav.click(function(e) {
                    _this.tabNav.removeClass('ui_tab_nav_active');
                    $(this).addClass('ui_tab_nav_active');
                    var currentIndex = $(this).attr('index');
                    $(_this.element).find('.ui_tab_content').children('div').hide().eq(currentIndex).show();
                    _this.buttonCircle = $(this).find('.ui_button_circle');
                    //点击按钮的时候添加圆放大效果
                    _this.buttonCircle.removeClass('ui_button_circle_show');
                    _this.buttonCircle.css({ 'left': e.offsetX - 100 + 'px', 'top': e.offsetY - 100 + 'px' }).show();
                    // 必须加延时才有动画效果
                    setTimeout(function() {
                        _this.buttonCircle.addClass('ui_button_circle_show');
                    }, 0);
                    setTimeout(function() {
                        _this.buttonCircle.hide();
                    }, 600);
                });
            },

        };
        // 必须要将该对象返回出去
        return CreateTab;
    })();
    $.fn.CreateTab = function(options) {
        return this.each(function() {
            var _this = $(this),
                // 从当前对象下读取实例
                instance = _this.data('CreateTab');
            // 如果没有实例新建一个
            if (!instance) {
                // 新建实例,_this表示当前选中元素，options表示配置
                instance = new CreateTab(_this, options);
                // 将当前实例保存到data数据中
                _this.data('CreateTab', instance);
            }
            if ($.type(options) === 'string') {
                // 带参函数
                if (/\w*\(*\)/.test(options)) {
                    var functionName = options.split('(')[0],
                        functionParam = options.split("(")[1].replace(')', '');
                    return instance[functionName](functionParam);
                } else {
                    // 不带参函数
                    return instance[options]();

                }
            }
        });
    };
    // 默认参数
    $.fn.CreateTab.defaultValue = {
        //创建Tab页签的数据
        dataArr: []
    };
})(jQuery);
//Tab页签end
