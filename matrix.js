function clearHighlight($highlighed) {
  $highlighed.removeClass("kyu-1").removeClass("kyu-2").removeClass("kyu-3").removeClass("kyu-4").removeClass("kyu-5");
}

$(function() {
  $('table#matrix td.kyu').hover(function() {
    let kyu = $(this).data("kyu");

    clearHighlight($('tr.angriff td').add("td.technik"));

    let angriff = Number($(this).data("angriff"));
    $('tr.angriff td:nth-child(' + angriff + ')').addClass('kyu-' + kyu);

    let technik = Number($(this).data("technik"));
    $("td.technik-" + technik).addClass('kyu-' + kyu);

    if (
      (typeof(vidurl[angriff]) === "undefined") ||
      (typeof(vidurl[angriff][technik]) === "undefined")
    ) {
      console.log("missing video Link fuer Angiff " + angriff + " und Technik " + technik);
    }
  });

  $('td.empty').hover(function() {
    clearHighlight($('tr.angriff td').add("td.technik"));
  });

  $('table#matrix td.kyu').each(function() {
    let angriff = Number($(this).data("angriff"));
    let technik = Number($(this).data("technik"));
    let kyu = $(this).html();
    $(this).data("kyu", kyu);

    if (
      (typeof(vidurl[angriff]) !== "undefined") &&
      (typeof(vidurl[angriff][technik]) !== "undefined")
    ) {
      $(this).html(
        '<a ' + 
          'href="' + vidurl[angriff][technik]["url"] + '" ' + 
          'title="' + vidurl[angriff][technik]["label"] + '" ' + 
          'class"external" ' + 
          'target="_blank">' +
          kyu +
        '</a>'
      );

      $(this).attr("title", vidurl[angriff][technik]["label"]).click(function() {
        $('a', $(this)).get(0).click();
      });
    }
  });
});
