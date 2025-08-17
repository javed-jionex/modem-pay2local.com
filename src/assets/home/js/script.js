$(document).ready(function () {
  var section = $(".sticky-header");
  var sectionOffset = section.offset().top;

  $(window).scroll(function () {
    if ($(window).scrollTop() > sectionOffset) {
      section.addClass("sticky");
    } else {
      section.removeClass("sticky");
    }
  });

  $(".mobile-nav").click(function () {
    $(".nav-menu").toggleClass("show");
    $(".mobile-nav .fa-bars").toggleClass("hide");
    $(".mobile-nav .fa-xmark").toggleClass("show");
  });


});