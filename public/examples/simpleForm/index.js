$(function() {
    //loading效果
    $("#loading").CircularLoading();
    var number = 0;
    setInterval(function() {
        number = number === 99 ? 0 : number + 1;
        $("#loading").data('num', number).CircularLoading('numChange');
    }, 500);
    // 输入框
    $("#username").CreateInput({
        type: "text",
        spec: /^[0-9]\d*$/,
        length: '5-8',
        placeholder: '不能为空，只能输入数字，长度为5-8',
        isRequired: true
    }).CreateInput('setSize(small)');
    $("#username2").CreateInput({
        type: "password",
        spec: /^[0-9]\d*$/,
        placeholder: '可以为空，只能输入数字，长度为5-8',
        isRequired: false
    }).CreateInput('setSize(1)');
    $("#username3").CreateInput({
        type: "text",
        spec: /^[a-zA-Z]+$/,
        placeholder: '可以为空，只能输入字母，长度为5-8',
        isRequired: false
    }).CreateInput('setSize(big)');
    $("#username4").CreateInput({
        type: "text",
        spec: /^[0-9]\d*$/,
        placeholder: '不能输入任何内容哦',
        isRequired: false
    }).CreateInput('setGrey(true)');

    $("#radio_sex").CreateRadio({
        // 所属组
        group: 'sex',
        //显示的文字
        textArr: ['男', '女'],
        //值改变的时候调用
        changeFunc: function() {
            // console.log(1);
        }
    });
    var radioObj = $("#radio_sex").data('CreateRadio');
    radioObj.setValue(1);
    $("#checkbox1").CreateCheckbox({
        group: 'checkgroup',
        textArr: ['HTML', 'CSS', 'JavaScript', 'node.js', 'Angular.js'],
        valueArr: ['HTML', 'CSS', 'JavaScript', 'node.js', 'Angular.js'],
        hasSelectAll: true,
        changeFunc: null
    });
    var checkboxObj = $("#checkbox1").data('CreateCheckbox');
    //第三个和第四个置灰
    checkboxObj.setGrey(true, [2, 3]);
    checkboxObj.setValue([1, 4]);
    console.log(checkboxObj.getValue());
    $("#switch0").CreateSwitch({
        status: "on",
        changeFunc: function() {
            console.log($("#switch0").data('CreateSwitch').getValue());
        }
    });
    var switchObj = $("#switch0").data('CreateSwitch');
    switchObj.setValue('off');
    switchObj.setGrey(false);
    $("#button0").CreateButton({
        title: "Click Me",
        //点击的时候调用
        ckickFunc: function() {
            console.log(1);
        }
    });
    var buttonObj = $("#button0").data('CreateButton');
    buttonObj.setGrey(false);
    var tabData = [
        ['Tab1', 'tab_id1', '这是第一个页签<br />这是第一个页签<br />这是第一个页签<br />', function() { console.log(1) }],
        ['Tab2', 'tab_id2', '这是第二个页签<br />这是第二个页签<br />这是第二个页签<br />', function() { console.log(2) }],
        ['Tab3', 'tab_id3', '这是第三个页签<br />这是第三个页签<br />这是第三个页签<br />', function() { console.log(3) }]
    ];
    $("#tab0").CreateTab({
        dataArr: tabData
    });
});
