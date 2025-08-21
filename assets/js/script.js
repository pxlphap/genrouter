(function ($) {
  $(document).ready(function () {
    $(document).on("click", ".section-more__item", function () {
      $(this).siblings().removeClass("active");
      $(this).toggleClass("active");
    });

    const $form = $(".section-form__form");

    function isFilled($field) {
      if ($field.is("select")) {
        return $field.prop("selectedIndex") > 0;
      }
      return $.trim($field.val() || "") !== "";
    }

    function syncActive($field) {
      const $wrapper = $field.closest(".form-input__item-wrapper");
      if (isFilled($field) || $field.is(":focus")) {
        $wrapper.addClass("active");
      } else {
        $wrapper.removeClass("active");
      }
    }

    function fixSelectPlaceholder($select) {
      const $ns = $select.next(".nice-select");
      if (!$ns.length) return;

      if ($select.prop("selectedIndex") === 0) {
        $ns.removeClass("has-value");
        $ns.find(".current").text("");
      } else {
        $ns.addClass("has-value");
        $ns.find(".current").text($select.find("option:selected").text());
      }
    }

    $("select").each(function () {
      const $s = $(this);
      if (!$s.next().hasClass("nice-select")) {
        $s.niceSelect();
      }
      fixSelectPlaceholder($s);
      syncActive($s);
    });

    $form.on("focusin", "input, textarea", function () {
      $(this).closest(".form-input__item-wrapper").addClass("active");
      $(this).closest(".form-input__item").find(".form-input__error").removeClass("active");
    });

    $form.on("input blur", "input, textarea", function () {
      syncActive($(this));
    });

    $form.on("change", "select", function () {
      const $sel = $(this);
      fixSelectPlaceholder($sel);
      syncActive($sel);
      $sel.closest(".form-input__item").find(".form-input__error").removeClass("active");
    });

    $form.on("focusin", ".nice-select", function () {
      $(this).closest(".form-input__item-wrapper").addClass("active");
      $(this).closest(".form-input__item").find(".form-input__error").removeClass("active");
    });

    $form.on("focusout", ".nice-select", function () {
      const $select = $(this).prev("select");
      fixSelectPlaceholder($select);
      syncActive($select);
    });

    // ----------------- Submit -----------------
    $form.on("submit", function (e) {
      e.preventDefault();
      let ok = true;

      $form.find(".form-input__item").each(function () {
        const $field = $(this).find("input, textarea, select").first();

        if (!isFilled($field)) {
          $(this).find(".form-input__error").addClass("active");
          ok = false;
        } else {
          $(this).find(".form-input__error").removeClass("active");
        }

        syncActive($field);
        if ($field.is("select")) fixSelectPlaceholder($field);
      });
    });
  });
})(jQuery);
