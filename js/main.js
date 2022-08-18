import $ from "jquery";
import "slick-carousel";

$(function () {
  /* Dom Elements */
  const $testimonial = $(".slider-testimonial__body");
  const $testimonialArrowContainer = $(".slider-testimonial__dots");

  /* Slider team */
  $testimonial.slick({
    arrows: false,
    dots: true,
    slidesToShow: 2,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 1000,
    appendDots: $testimonialArrowContainer,
    customPaging: function (slider, i) {
      return '<button class="slider-testimonial__dot"></button>';
    },
  });
  // $(".slider-test").slick();
});
