/*window.addEventListener("scroll", _.throttle(updateNavBar, 50));
window.addEventListener("scroll", _.throttle(updateTooltipPos, 100));*/

$(window).on('resize scroll', function() {
    checkElementsEnteredViewport();
});

$(document).ready(function() {
    $('.parallax').parallax();
    setTimeout(function(){
        $('.scrollspy').scrollSpy(); 
    }, 100);
});

function checkElementsEnteredViewport() {
    if(enteredViewport($('#section-1 h3'), false)) {
        $('#section-1 h3').addClass('enteredViewport');
    }
    if(enteredViewport($('#section-2 h3'), false)) {
        $('#section-2 h3').addClass('enteredViewport');
    }
    if(enteredViewport($('#section-3 h3'), false)) {
        $('#section-3 h3').addClass('enteredViewport');
    }
    if(enteredViewport($('#kaufkraftGraph'), true)) {/*
        $('#kaufkraftGraph .st5').css('stroke', '#ff00ff');
        document.querySelector('#kaufkraftGraph #usd').setAttribute('class','.move');*/
        $('#kaufkraftGraph #usd').addClass('move');
        $('#kaufkraftGraph #eur').addClass('move');
    }
}

function enteredViewport(el, down) {
    var elementTop = $(el).offset().top;
    var elementBottom = elementTop + $(el).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    if(down) {
        return elementBottom > viewportTop && elementBottom < viewportBottom;   
    }
    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function updateNavBar(){
    let fromTop = window.scrollY;
    document.querySelectorAll(".navlink").forEach(link => {
        let section = document.querySelector(link.hash);
        if(section.offsetTop - getMargin(section) / 2 - 1 <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
}

function updateTooltipPos(){
    let changeY = 100;
    let top = window.scrollY;
    document.querySelectorAll(".tooltip .tooltiptext").forEach(tooltip => {
        let posY = tooltip.getBoundingClientRect().top;
        if(posY < changeY){
            tooltip.classList.add("bottom");
            tooltip.classList.remove("top");
        } else if(posY >= changeY + tooltip.offsetHeight + 10){
            tooltip.classList.add("top");
            tooltip.classList.remove("bottom");
        }
    });
}

function scrollUp(){
    let current = document.querySelector(".current");
    if(current){
        let section = document.querySelector(current.hash);
        if(window.scrollY - section.offsetTop < 200){
            let before = current.parentElement.previousElementSibling;
            if(before){
                //document.querySelector(before.firstElementChild.hash).scrollIntoView();
                window.scrollTo(0, document.querySelector(before.firstElementChild.hash).offsetTop - getMargin("#section-1") / 2 + 5);
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            section.scrollIntoView();
        }
    }
}

function scrollDown(){
    let current = document.querySelector(".current");
    if(current){
        let next = current.parentElement.nextElementSibling;
        if(next){
            //document.querySelector(next.firstElementChild.hash).scrollIntoView();
            window.scrollTo(0, document.querySelector(next.firstElementChild.hash).offsetTop - getMargin("#section-1") / 2 + 5);
        }
    }else{
        //document.querySelector(document.querySelector(".navlink").hash).scrollIntoView();
        window.scrollTo(0, document.querySelector(document.querySelector(".navlink").hash).offsetTop - getMargin("#section-1") / 2);
    }
}

/* disable tap to search on chrome for android */
$(".tooltip").click(function(event){
    event.preventDefault();
});

/* smoothe animation (https://css-tricks.com/using-css-transitions-auto-dimensions/) */
function expandText(secId) {
    $(secId + " > .card-content .exp").css("display", "none");
    $(secId + " > .card-content .expandable").css("display", "inline");
    $(secId + " > .card-content .short").css("display", "block");
}

function shortenText(secId) {
    $(secId + " > .card-content .exp").css("display", "block");
    $(secId + " > .card-content .expandable").css("display", "none");
    $(secId + " > .card-content .short").css("display", "none");
}

function getAbsoluteHeight(el) {
    el = (typeof el === 'string') ? document.querySelector(el) : el;
    return el.offsetHeight + Math.floor(getMargin(el) / 2);
}
function getMargin(el){
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return margin;
}

(function($, window) {
    var adjustAnchor = function() {
        var $anchor = $(':target'), fixedElementHeight = getMargin("#section-1") / 2 - 5;
        if ($anchor.length > 0) {
            window.scrollTo(0, $anchor.offset().top - fixedElementHeight);
        }
    };
    $(window).on('hashchange', function() {
        adjustAnchor();
    });
    $(window).on('load', function() {
        adjustAnchor();
        $(".navlink").on('click', function(e){
            e.preventDefault();
            location.hash = e.target.hash;
            //adjustAnchor();
        });
    });
})(jQuery, window);