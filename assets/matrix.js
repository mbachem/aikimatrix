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
      $(this).addClass("missing").removeClass("youtube").removeAttr("href").removeAttr("target").data("youtube", null);

      if (
        (typeof(m["urls"][angriff]) !== "undefined") &&
        (typeof(m["urls"][angriff][technik]) !== "undefined")
      ) {
        if (
        (typeof(m["urls"][angriff][technik]["url"]) !== "undefined") &&
        m["urls"][angriff][technik]["url"].length > 0
      ) {
          $(this).removeClass("missing").removeClass("youtube")
          .attr("href", m["urls"][angriff][technik]["url"])
          .attr("target", "_blank");
        }
        if(
          (typeof(m["urls"][angriff][technik]["youtube"]) !== "undefined")
        ) {
          $(this).removeClass("missing").addClass("youtube")
            .data('youtube', m["urls"][angriff][technik]["youtube"])
            .data('label', m["urls"][angriff][technik]["label"]);
        }
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
        (typeof(m["urls"][angriff][technik]) !== "undefined")
      ) {
        if (typeof(m["urls"][angriff][technik]["youtube"]) !== "undefined") {
          m["urls"][angriff][technik]["url"] =
            "https://www.youtube.com/watch?" + 
              "v=" + m["urls"][angriff][technik]["youtube"]["video"] +
              "&t=" + m["urls"][angriff][technik]["youtube"]["start"];
        }
        if (
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
        }

        $(this).removeClass("missing").attr("title", m["urls"][angriff][technik]["label"]);
      } else {
        $(this).attr("title", "missing").addClass("missing").html(kyu);
      }
    });
  }).change();


  $("a.kyu").click(function() {
    let youtube = $(this).data("youtube");
    if (typeof(youtube) === "undefined") {
      return;
    }
    let $dlg = $("div#youtube");

    $(".modal-title", $dlg).html($(this).data("label"));
    let url = "https://www.youtube.com/embed/" + youtube.video + "?autoplay=1&mute=1&controls=1";
    url += "&start=" + youtube.start;
    if (youtube.ende) {
      url += "&end=" + youtube.ende;
    }
    $(".modal-body").empty();
    $(".modal-body").append(
      '<iframe width="100%" height="100%" src="' + url + '"' +
      '   frameBorder="0" ' +
      '   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>' +
      '</iframe>'
    );
    $dlg.modal('toggle');
  })

  $("#closeYoutube").click(function() {
    let $dlg = $("div#youtube");
    $(".modal-body").empty();
    $dlg.modal('toggle');
  });
})
