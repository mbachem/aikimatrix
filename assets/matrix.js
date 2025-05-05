if (typeof(matrix) === "undefined") {
  var matrix = [];
}

$(function() {
  let colorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  $("body").attr('data-bs-theme', colorTheme)
  $("#switchDarkMode").prop("checked", colorTheme == "dark");

  $("#switchDarkMode").change(function() {
    let colorTheme = $("#switchDarkMode").prop("checked") ? 'dark' : 'light';
    $("body").attr('data-bs-theme', colorTheme);
  });

  let baseurl = window.location.href.split("#")[0];
  let sensei = window.location.hash.substr(1);

  matrix.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  for (i=0; i<matrix.length; i++) {
    if (!sensei && matrix[i].default) {
      sensei = matrix[i].tag;
    }

    let initial = matrix[i].name.charAt(0);
    let $optgroup = $("#" + initial, $("#contentcreator"));

    if (!$optgroup.length) {
      $optgroup = $('<optgroup id="' + initial + '" label="' + initial + '…" />')
      $("#contentcreator").append($optgroup);
    }

    let $option = $("<option />")
      .html(matrix[i].name)
      .attr("value", matrix[i].tag)
      .data("m", matrix[i]);

    if (sensei === matrix[i].tag) {
      $option.attr("selected", "selected");
    }
    $optgroup.append($option);
  }

  $("#contentcreator").change(function() {
    window.location.href = baseurl + '#' + $(this).val();
    let m = $('option:selected', $(this)).data("m");

    $("a#tomobile").attr(
      "href",
      $("a#tomobile").data("baseref") + '#' + $(this).val()
    );

    $("a#sensei-url")
      .attr("href", m["url"])
      .html(m["url"]);

    $("a#todesktop").attr(
      "href",
      $("a#todesktop").data("baseref") + '#' + $(this).val()
    );

    document.title = 'Aikimatrix - ' + m["name"];

    $("span#sensei-name").html(m["name"]);

    // Mobile
    $("a.kyu").each(function() {
      let angriff = Number($(this).data("angriff"));
      let technik = Number($(this).data("technik"));

      if (
        (typeof(m["urls"][angriff]) !== "undefined") &&
        (typeof(m["urls"][angriff][technik]) !== "undefined") &&
        (typeof(m["urls"][angriff][technik]["url"]) !== "undefined") &&
        m["urls"][angriff][technik]["url"].length > 0
      ) {
        $(this).removeClass("missing")
          .attr("href", m["urls"][angriff][technik]["url"])
          .attr("target", "_blank");
      } else {
        $(this).addClass("missing").removeAttr("href").removeAttr("target");
      }
    });

    // Desktop
    $('table#matrix td.kyu').each(function() {
      let angriff = Number($(this).data("angriff"));
      let technik = Number($(this).data("technik"));
      let kyu = $(this).data("kyu");
      $(this).data("kyu", kyu);

      if (
        (typeof(m["urls"][angriff]) !== "undefined") &&
        (typeof(m["urls"][angriff][technik]) !== "undefined") &&
        (typeof(m["urls"][angriff][technik]["url"]) !== "undefined") &&
        m["urls"][angriff][technik]["url"].length > 0
      ) {
        $(this).html(
          '<a ' +
            'href="' + m["urls"][angriff][technik]["url"] + '" ' +
            'title="' + m["urls"][angriff][technik]["label"] + ' (' + kyu + '. kyu)" ' +
            'target="_blank">' +
            kyu +
          '</a>'
        );

        $(this).removeClass("missing").attr("title", m["urls"][angriff][technik]["label"]);
      } else {
        $(this).attr("title", "missing").addClass("missing").html(kyu);
      }
    });
  }).change();
})
