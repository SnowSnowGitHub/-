
// function banner(){
//     $.ajax({
//         type:'get',
//         url:"js/data.json",
//         dataType:"json",
//         success:function(obj){
//             console.log(obj[0].pcUrl);
            
//             // 判断屏幕的大小
//             var isMobile=$(window).width()>768?false:true;
//             console.log(isMobile);
            
//             //使用模板
//             var imgHtml=template('imgTemplate',{list:obj,isMobile:isMobile});
//             var pointHtml=template('pointTemplate',{list:obj});
//             console.log(imgHtml);
//             console.log(pointHtml);

//             $('.carousel-indicators').html(pointHtml);
//             $('.carousel-inner').html(imgHtml);
//         }
//     })

// }

/*
步骤分析:
    2 根据数据动态渲染  根据设备当前的情况 屏幕的宽度判断

    2.1 准备数据
    2.2 把数据转换成html格式的字符串
        使用模板引擎: 将html静态内容 编译成动态的 
        发现:  点容器  图片容器  新建模板
        开始使用
    3 测试
    4 实现移动端的手势切换         
    注意: 模板引擎里面不能够使用外部的变量
*/

//banner功能封装  将所有关于banner的js代码 封装在一个方法里面
var banner=function(){

    var getData=function(callback){
        if(window.data){
            callback && callback(window.data);
            
        }else{
            $.ajax({
                type:'get',
                url:'js/data.json',
                dataType:'json',
                success:function(obj){
                    window.data=obj;
                    callback && callback(window.data);
                }
            })
        }
    }

    var render=function(){
        getData(function(){
            var isMobile=$(window).width()>768?false:true;
            var imgHtml=template('imgTemplate',{list:data,isMobile:isMobile});
            var pointHtml=template('pointTemplate',{list:data});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imgHtml);
        })
    }

    //第一种方法: 调用render  初始化轮播图
    // render();
    // $(window).on('resize',function(){
    //     render()
    // });

    //第二种方法: 绑定这个方法 再使用trigger 触发这个事件
    //resize事件: 页面尺寸发生改变的时候 触发的事件
    $(window).on('resize',function(){
        render()
        // 通过js主动触发某个事件
    }).trigger('resize')



    //4 实现移动端的手势切换
    var startx=0;
    var movedistance=0;
    // var isMove;  //这里有疑问 为什么需要isMove的判断
    $('.wjs_banner').on('touchstart',function(e){
        console.log(e);
        //根据打印知道 originalEvent: TouchEvent  触摸事件是js原生事件
        startx=e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var movex=e.originalEvent.touches[0].clientX;
        movedistance=movex-startx;
        // isMove=true;
    }).on('touchend',function(){
        //距离足够50 一定要滑动过 
        if(Math.abs(movedistance)>50){
            if(movedistance>0){
                //手势右滑动
                console.log('left');
                $('.carousel').carousel('prev')
            }else{
                //手势左滑动
                console.log('right');
                $('.carousel').carousel('next')
            }
        }
        // 这里也有疑问 为什么需要归0  每次只要一滑动不是都会重新进行赋值么
        // startx=0;
        // movedistance=0;
        // isMove=false;
    })



}
// 使用var 声明的方法 只能够在方法的后面调用
banner();



//产品推荐模块 
//1 解决换行的问题
var initMobileTab=function(){
    var widthTotal=0;
    $('.wjs_product .nav-tabs').find('li').each(function(ele,index){
        widthTotal+=$(this).outerWidth(true);
    })
    console.log(widthTotal);
    $('.wjs_product .nav-tabs').width(widthTotal);
    //2 修改结构使之区域滑动的结构
    //3 自己实现滑动效果
    new IScroll($('.wjs_product .nav-tabs-parents')[0],{
    scrollX: true,
    scrollY: false,
    click:true
})
}

initMobileTab();



$('span.yu').tooltip();
$('span.gan').tooltip();
