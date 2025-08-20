(function ($) {
  $(document).ready(function () {
    $(document).on("click", ".section-more__item", function () {
      console.log("click");
      $(this).siblings().removeClass("active");
      $(this).toggleClass("active");
    });
  });
})(jQuery);
