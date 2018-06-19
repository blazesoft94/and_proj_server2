$(window).on('scroll',function(){
        if(window.innerWidth>768){
            var scrollValue = $(window).scrollTop();
            // console.log("scroll value:",scrollValue);
            if(scrollValue>=87){
                // var top = scrollValue>150 ? 87 : scrollValue-87;
                // console.log(147-top);
                // top2 = 147-top;
                $(".menu-nav").css({
                    "top" : "60px"
                })
            }
            else{
                var t =148-scrollValue;
                // console.log(t);
                $(".menu-nav").css({
                    "top" : t+"px"
                })
            }
        }
});