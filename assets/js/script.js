(function ($) {
  $(document).ready(function () {
    $(document).on("click", ".section-more__item", function () {
      $(this).siblings().removeClass("active");
      $(this).toggleClass("active");
    });

    $(document).on("click", ".section-outstanding__tab-item", function () {
      let idx = $(this).attr("tab-id");
      $(this).siblings().removeClass("active");
      $(this).toggleClass("active");
      $(this)
        .closest(".section-outstanding")
        .find(".section-outstanding__tab-content-item")
        .removeClass("active");
      $(this)
        .closest(".section-outstanding")
        .find(".section-outstanding__tab-content-item[tab-id=" + idx + "]")
        .addClass("active");
    });

    const $form = $(".section-form__form");

    function isFilled($field) {
      if ($field.is("select")) {
        const selectedIndex = $field.prop("selectedIndex");
        const selectedText = $.trim($field.find("option:selected").text());
        return selectedIndex > 0 && selectedText !== "";
      }
      return $.trim($field.val() || "") !== "";
    }

    function syncActive($field) {
      const $wrapper = $field.closest(".form-input__item-wrapper");
      const isFilledResult = isFilled($field);
      const isFocusResult = $field.is(":focus");

      if (isFilledResult || isFocusResult) {
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
        $ns.find(".current").text("Please select an option");
      } else {
        $ns.addClass("has-value");
        const selectedText = $select.find("option:selected").text();
        $ns.find(".current").text(selectedText);
      }
    }

    $("select").each(function () {
      const $s = $(this);
      if ($s.next().hasClass("nice-select")) {
        $s.next(".nice-select").remove();
      }
      $s.hide();
      $s.niceSelect();
      fixSelectPlaceholder($s);
      syncActive($s);
    });

    $form.on("focusin", "input, textarea", function () {
      $(this).closest(".form-input__item-wrapper").addClass("active");
      $(this).closest(".form-input__item").find(".form-input__error").removeClass("active");
    });

    $form.on("input blur", "input, textarea", function () {
      syncActive($(this));
      if (isFilled($(this))) {
        $(this).closest(".form-input__item-wrapper").addClass("active");
      }
    });

    $form.on("change", "select", function () {
      fixSelectPlaceholder($(this));
      syncActive($(this));
      $(this).closest(".form-input__item").find(".form-input__error").removeClass("active");
      if (isFilled($(this))) {
        $(this).closest(".form-input__item-wrapper").addClass("active");
      }
    });

    $form.on("focusin", ".nice-select", function () {
      $(this).closest(".form-input__item-wrapper").addClass("active");
      $(this).closest(".form-input__item").find(".form-input__error").removeClass("active");
    });

    $form.on("focusout", ".nice-select", function () {
      const $select = $(this).prev("select");
      fixSelectPlaceholder($select);
      syncActive($select);
      if (isFilled($select)) {
        $select.closest(".form-input__item-wrapper").addClass("active");
      }
    });

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
