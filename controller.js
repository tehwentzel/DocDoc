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
    $(".tabView").toggleClass("selectedView", false);
    $("#" + this.attributes["name"].value).toggleClass("selectedView", true);
  });

  $("#popupBackDrop").click(function(ev) {
    if (ev.target.classList.contains("popup")) {
      ev.stopPropagation();
      return;
    }
    $(".popup").css("display", "none");
    $(this).css("display", "none");
  });

  $(".noInfoDefault").on("click", function(ev) {
    var thisID = this.parentNode.id;
    $("#popupBackDrop").css("display", "block");
    if (thisID == "userInfo") {
      $("#userInfoPopup").css("display", "block");
    }
    if (thisID == "doctorInfo" || thisID == "schoolInfo") {
      $(".tabButton").toggleClass("activeTab", false);
      $("#findButton").toggleClass("activeTab", true);
      $(".tabView").toggleClass("selectedView", false);
      $("#find").toggleClass("selectedView", true);
      $("#userInfoPopup").css("display", "block");
    }
    ev.stopPropagation();
  });
  $(".docBox").on("click", function(ev) {
    $(".docBox").toggleClass("activeTab", false);
    $(this).toggleClass("activeTab", true);

    $(".docBoxInfo").css("display", "none");
    $("#" + this.id + "Info").css("display", "flex");
    ev.stopPropagation();
  });
  $(".close").on("click", function() {
    $("#" + this.parentNode.parentNode.id).css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
  });
  $(".saveDoctorButton").on("click", function() {});
  $(".dropdown-toggle").click(function() {
    $(this)
      .next(".dropdown-menu")
      .toggle();
  });
  $(".confirmSave").on("click", function() {
    var docInfo = this.parentNode.parentNode.parentNode;
    var text = "Doctor Information added to:";
    var janChecked = this.parentNode.getElementsByClassName("janCheck")[0]
      .checked;
    var bobChecked = this.parentNode.getElementsByClassName("bobCheck")[0]
      .checked;

    if (bobChecked) {
      text += "\n-Bob";
      $("#doctorInfo")[0].getElementsByClassName("noInfoDefault")[0].style =
        "display:none";
      $("#doctorInfo")[0].getElementsByClassName("populatedInfo")[0].style =
        "display:inline";
      $("#doctorNameValue").html(
        docInfo.getElementsByClassName("docNameValue")[0].innerHTML
      );
      $("#doctorNumberValue").html(
        docInfo.getElementsByClassName("docNumberValue")[0].innerHTML
      );
      $("#doctorEmailValue").html(
        docInfo.getElementsByClassName("docEmailValue")[0].innerHTML
      );
      $("#doctorAddressValue").html(
        docInfo.getElementsByClassName("docAddressValue")[0].innerHTML
      );
    }
    if (janChecked) {
      text += "\n-Jannete";
    }
    alert(text);
    // should reset states of dropdown/checked boxes
    $(".dropdown-toggle").click();
  });
});
