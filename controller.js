$(document).ready(function() {
  console.log("loaded");

  $(".accountIcon").on("click", function() {
    if (this.id == "plusIcon") {
      return;
    }
    var selected = this;
    var topPos = $(".accountIcon:first").offset().top - $(this).offset().top;
    console.log(top);
    var disapearPromise = Promise.resolve(
      $(".accountIcon")
        .each(function(index) {
          console.log(index);
          if (this !== selected) {
            var toClear = this;
            var p = Promise.resolve(
              $(this)
                .animate(
                  {
                    opacity: 0
                  },
                  1000
                )
                .promise()
            );
            var p2 = new Promise(function(resolve, reject) {
              if (index == 0) {
                $(selected).animate(
                  {
                    marginTop: topPos
                  },
                  1000
                );
              }
              resolve(true);
            });
            Promise.all([p, p2]).then(function() {
              console.log("now");
              $(toClear).css("display", "none");
              $(selected).css("marginTop", 0);
              return;
            });
          }
        })
        .promise()
    );
    disapearPromise.then(function() {
      $(this).css("cursor", "default");
      $(".accountInfo").css("display", "flex");
      return;
    });
    $("#backArrowLeft").css({
      visibility: "visible",
      cursor: "pointer"
    });
  });

  $("#backArrowLeft").on("click", function() {
    $(".accountInfo").css("display", "none");
    $(".accountIcon").animate(
      {
        opacity: 1
      },
      200,
      function() {
        $(this).css("display", "flex");
        $(this).css("cursor", "pointer");
      }
    );
    $("#backArrowLeft").css({
      visibility: "hidden",
      cursor: "default"
    });
  });

  $(".tabButton").on("click", function() {
    $(".tabButton").toggleClass("activeTab", false);
    $(this).toggleClass("activeTab", true);
    // Toggle tab
    $(".tabPage").css("display", "none");
    switch (this.id) {
      case "feedButton":
        $("#tabFeed").css("display", "flex");
        break;
      case "calendarButton":
        $("#tabCalendar").css("display", "flex");
        break;
      case "findDoctorButton":
        $("#tabMap").css("display", "flex");
        break;
      case "filesButton":
        $("#tabFiles").css("display", "flex");
        break;
      default:
    }
  });
});
