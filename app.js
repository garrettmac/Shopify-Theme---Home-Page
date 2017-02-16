 $(document).ready(function () {
// ------------- VARIABLES ------------- //
console.clear()
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  // $(window).on("mousewheel DOMMouseScroll", function(event){
  // event.stopPropagation();  event.preventDefault(); 
  // console.log("evt",evt)
  // if(_.has(evt,'originalEvent.wheelDelta')){
    // var delta  =evt.originalEvent.wheelDelta/120
  // }
  // else if(_.has(evt,'originalEvent.detail')){
    // var delta  =-evt.originalEvent.detail/3
  // }
  // else if(_.has(evt,'deltaY')){
    var delta  =-evt.deltaY///3
  // }
   // console.log("evt.detail",evt.detail)
  // console.log("delta",delta)
  $(document).ready(function() {
    $('#toptitle').text(function(i, oldText) {
        return oldText === delta ?  "not set":delta ;
    });
});
  // turn(Del);
// });
  // if (isFirefox) {
  //   //Set delta for Firefox
  //   delta = evt.detail * (-120);
  // } else if (isIe) {
  //   //Set delta for IE
  //   delta = -evt.deltaY;
  //   console.log("deltaY: ",delta)
  // } else {
  //   //Set delta for all other browsers
  //   delta = evt.wheelDelta;
  //  // delta = evt.originalEvent.wheelDelta
  //   console.log("delta: ",delta)
  // }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
 var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
//var mousewheelEvent = "mousewheel DOMMouseScroll"


//   var $fwindow = $(window);
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// console.log("scrollTop",scrollTop)
//   // on window scroll event
//   $fwindow.on('scroll resize', function() {
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   }); 
// var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
// jQuery(element).on('click', throttled);
// console.log("parallaxScroll",parallaxScroll)
// var trot=_.throttle(parallaxScroll, 60)
// console.log("trot",trot)
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}
   
 })
