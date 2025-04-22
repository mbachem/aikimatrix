function clearHighlight($highlighed) {
  for (var kyu = 1; kyu <= 5; kyu++) {
    $highlighed.removeClass("kyu-" + kyu);
  }
}

$(function() {
  let baseurl = window.location.href.split("#")[0];
  let sensei = window.location.hash.substr(1);

  for (i=0; i<matrix.length; i++) {
    let $option = $("<option />")
      .html(matrix[i].name)
      .attr("value", matrix[i].tag)
      .data("m", matrix[i]);

    if (sensei === matrix[i].tag) {
      $option.attr("selected", "selected");
    }
    $("#contentcreator").append($option);
  }

  $('table#matrix td.kyu').hover(function() {
    let kyu = $(this).data("kyu");

    clearHighlight($('tr.angriff td').add("td.technik"));
    if (!$(this).hasClass("missing")) {
      let angriff = Number($(this).data("angriff"));
      let technik = Number($(this).data("technik"));
      $('tr.angriff td:nth-child(' + angriff + ')').addClass('kyu-' + kyu);
      $("td.technik-" + technik).addClass('kyu-' + kyu);
    }
  });

  $('td.empty').add('tr.angriff td').add('td.technik').hover(function() {
    clearHighlight($('tr.angriff td').add("td.technik"));
  });

  $("#contentcreator").change(function() {
    window.location.href = baseurl + '#' + $(this).val();
    let m = $('option:selected', $(this)).data("m");

    $("a#sensei-url")
      .attr("href", m["url"])
      .html(m["url"]);

    $("span#sensei-name").html(m["name"]);

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
            'class"external" ' +
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

});
