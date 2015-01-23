$(document).ready(function(){
    $('.main-slider .slides').bxSlider({
        nextSelector: '.main-slider .next',
        prevSelector: '.main-slider .prev',
        nextText: 'Следующая',
        prevText: 'Предыдущая',
        mode: 'fade'
    });
});