$(function() {
  $('table#matrix td.kyu').hover(function() {

    $('tr.angriff td').add("td.technik").removeClass("selected");

    let angriff = Number($(this).data("angriff"));
    $('tr.angriff td:nth-child(' + angriff + ')').addClass('selected');

    let technik = Number($(this).data("technik"));
    $("td.technik-" + technik).addClass('selected');

    if ((typeof(vidurl[angriff]) === "undefined") || (typeof(vidurl[angriff][technik]) === "undefined")) {
      console.log("missing video Link fuer Angiff " + angriff + " und Technik " + technik);
    }

  });

  $('td.empty').hover(function() {
    $('tr.angriff td').add("td.technik").removeClass("selected");
  });

  $('table#matrix td.kyu').each(function() {
    let angriff = Number($(this).data("angriff"));
    let technik = Number($(this).data("technik"));
    let kyu = $(this).html();
    if ((typeof(vidurl[angriff]) !== "undefined") && (typeof(vidurl[angriff][technik]) !== "undefined")) {
      $(this).html(
        '<a href="' + vidurl[angriff][technik]["url"] + '" title="' + vidurl[angriff][technik]["label"] + '" target="_blank">' + kyu + "</a>"
      );
    }
  });
});