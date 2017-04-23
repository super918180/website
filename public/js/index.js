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

$(function() {
    $(".nzz").hover(function() {
        $(".nzz").removeClass("nav-zibg");
        $(this).addClass("nav-zibg");
    });

    $("#seobut").click(function() {
        var seo = $("#searchtxt").val();
        if (seo.length > 1) {
            window.location.href = "search?seo=" + seo
        }
    });
    $('#searchtxt').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            var seo = $("#searchtxt").val();
            if (seo.length > 1) {
                window.location.href = "search?seo=" + seo
            }
        }
    });
    //给图例加背景
    $('#allList .exampleBg').each(function() {
        $(this).css('background', '#' + Math.floor(Math.random() * 16777215).toString(16));
    });
});