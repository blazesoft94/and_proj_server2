$(document).ready(function() {

    

    $(".hungry:first-child h2").addClass("underline-fast");
    $("nav .navbar-brand").addClass("underline");
    $(".hungry label").click(function(){
        $(".hungry h2").removeClass("underline-fast");
        $(this).find("h2").addClass("underline-fast");
    });

    var peopleSlider = document.getElementById("people-slider");
    var budgetSlider = document.getElementById("budget-slider");			
    var peopleSpan = document.getElementById("people-span");
    var budgetSpan = document.getElementById("budget-span");
    peopleSpan.innerHTML = peopleSlider.value;


    // Update the current slider value (each time you drag the slider handle)
    peopleSlider.oninput = function() {
        peopleSpan.innerHTML = this.value;
        budgetSlider.min = peopleSlider.value*200;
        budgetSlider.max = peopleSlider.value*1500;
        
        if(budgetSlider.value<=budgetSlider.min){
            // console.log("yep budget value is less or equal to min");
            // console.log(budgetSlider.value, budgetSlider.min)
            budgetSlider.value = budgetSlider.min;
            budgetSpan.innerHTML = budgetSlider.value;
        }

    }
    budgetSlider.oninput = function() {
        budgetSpan.innerHTML = this.value;
    }
    $(window).on('scroll',function(){
        
            if ($(window).scrollTop() >= 50) {
                var scrollValue = $(window).scrollTop();
                scrollValue=scrollValue-50;
                scrollValue = scrollValue/100;
                scrollValue = scrollValue<0.5 ? 0.5 : scrollValue;
                scrollValue = scrollValue>0.95 ? 0.95 : scrollValue;
                $('nav.navbar').css({
                    'background-color' : `rgba(44, 47, 47,${scrollValue})`
                }).fadeIn();
            } else {
                $('nav.navbar').css({
                    'background-color' : 'rgba(44, 47, 47, 0.5)'
                });
            }
    });
});