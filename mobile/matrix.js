$(function() {
  $("a.kyu").each(function() {
    let angriff = Number($(this).data("angriff"));
    let technik = Number($(this).data("technik"));

    if (
      (typeof(vidurl[angriff]) !== "undefined") &&
      (typeof(vidurl[angriff][technik]) !== "undefined") &&
      (typeof(vidurl[angriff][technik]["url"]) !== "undefined") &&
      vidurl[angriff][technik]["url"].length > 0
    ) {
      $(this).attr("href", vidurl[angriff][technik]["url"]);
    } else {
      $(this).addClass("missing");
    }
  });
});