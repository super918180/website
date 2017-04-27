$(function() {
    // 滚动事件监听
    $(window).scroll(function() {
        var menu_top = $('#menu_wrap').offset().top;
        if ($(window).scrollTop() >= 455) {
            $(".nav-bg").css("top", 50);
            $(".nav-bg").css("position", "fixed");
            $('#menu_wrap').addClass('menuFixed');
            $("#search-header").removeClass("hidden");
        }
        if ($(window).scrollTop() < 455) {
            $(".nav-bg").css("position", "relative");
            $(".nav-bg").css("top", 455);
            $('#menu_wrap').removeClass('menuFixed');
            $("#search-header").addClass("hidden");
        }
    });
    $(".nzz").hover(function() {
        $(".nzz").removeClass("nav-zibg");
        $(this).addClass("nav-zibg");
    });
    // 搜索框事件
    $("#seobut").click(function() {
        var seo = $("#searchtxt").val();
        if (seo.length > 0) {
            window.location.href = "?category=query&search=" + seo
        }
    });
    $('#searchtxt').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            var seo = $("#searchtxt").val();
            if (seo.length > 0) {
                window.location.href = "?category=query&search=" + seo
            }
        }
    });
    $("#seobut-header").click(function() {
        var seo = $("#searchtxt-header").val();
        if (seo.length > 0) {
            window.location.href = "?category=query&search=" + seo
        }
        return false;
    });
    $('#searchtxt-header').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            var seo = $("#searchtxt-header").val();
            if (seo.length > 0) {
                window.location.href = "?category=query&search=" + seo
            }
        }
    });
    //给图例加背景
    $('#allList .exampleBg').each(function() {
        $(this).css('background', '#' + Math.floor(Math.random() * 16777215).toString(16));
    });
});