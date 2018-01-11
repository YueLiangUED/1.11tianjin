/**
 * Created by wangbiaozy on 2017/12/1.
 */
(function(global){
    function remChange(){
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);
$(function () {
    flag = 0;
    //首页"生成我的故事"按钮
    $('#firPageBtn').on('click',function () {
        $('.firPage').hide();
        showGuide();
        $('main').show();
        $('#heliu').addClass('act');
    });
    //点击引导浮层关闭浮层
    $('.guide').on('click',function () {
        hideGuide();
    });
    //点击遮罩关闭所有浮层
    $('#mask').on('click',function () {
        hideGuide();
        $('#tc_sm').hide();
        $('#tc_lj').hide();
        $('#tc_fx').hide();
    });

    //活动说明弹窗
    $('.hdsm').on('click',function () {
        $('#tc_sm').show();
        showMask();
    });
    //点击弹窗X
    $('.tc_close').on('click',function () {
        $(this).parent().parent().hide();
        hideMask();
    });

    //领奖按钮
    $('.lj').on('click',function () {
        $('#tc_lj').show();
        showMask();
    });
    //弹窗分享按钮
    $('#fx').on('click',function () {
        $('#tc_fx').show();
        $('#tc_lj').hide();
    });
    //点击分享浮层关闭分享浮层
    $('#tc_fx').on('click',function () {
        $(this).hide();
        hideMask();
    });

    //查看我的故事按钮
    $('#look').on('click',function () {
        $('footer').hide();
        $('#page1').css({
            transform: 'rotateX(0deg)'
        });
        $('#page2').css({
            transform: 'rotateX(0deg)'
        });
        $('#page3').css({
            transform: 'rotateX(0deg)'
        });
        $('#page4').css({
            transform: 'rotateX(0deg)'
        });
        $('#page5').css({
            transform: 'rotateX(0deg)'
        });
        $('.firPage').show();
    });
    //向上滑动
    var touchEvents = {
        touchStart: function (e) {
            e.preventDefault();
            startX = e.originalEvent.targetTouches[0].pageX;
            startY = e.originalEvent.targetTouches[0].pageY;
        },
        touchMove: function (e) {
            e.preventDefault();
            moveEndX = e.originalEvent.targetTouches[0].pageX;
            moveEndY = e.originalEvent.targetTouches[0].pageY;
            X = moveEndX - startX;
            Y = moveEndY - startY;
            if(Math.abs(Y) > Math.abs(X) && Y < 0){
                $(this).css({
                    transform: "rotateX(50deg)"
                });
            }
        },
        touchEnd: function (e) {
            e.preventDefault();
            if(Math.abs(Y) > Math.abs(X) && Y < 0){
                $(this).css({
                    transform: "rotateX(270deg)",
                });
                if($(this).context.id === 'page5'){
                    $('#heliu').removeClass('act');
                    $('#oldUser').show();//如果是老用户
                    //$('#newUser').show();//如果是新用户
                    if(flag === 0){
                        $('main').hide();
                    }else{
                        $(this).css({
                            transform: "rotateX(0deg)"
                        });
                        $('main').hide();
                        $('footer').show();
                    }
                    flag ++;

                }
            }
        }
    }
    $('.flipbook').on('touchstart','div',touchEvents.touchStart);
    $('.flipbook').on('touchmove','div',touchEvents.touchMove);
    $('.flipbook').on('touchend','div',touchEvents.touchEnd);



    //显示引导浮层
    function showGuide() {
        $('.guide').show();
        showMask();
    }
    //关闭引导浮层
    function hideGuide() {
        $('.guide').hide();
        hideMask();
    }
    //显示遮罩层    
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层  
    function hideMask(){
        $("#mask").hide();
    }
});
