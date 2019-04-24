$(document).ready(function() {
  console.log("loaded");

  $(".tabHeader .dropdown-item").on("click", function(ev) {
    //click event for dropdown in the feed and file header sort button.  changes sort text to selected thing
    if (
      this.parentNode.parentNode.querySelector("span").innerHTML !=
      "Sort Date: " + this.innerHTML
    ) {
      this.parentNode.parentNode.querySelector("span").innerHTML =
        "Sort Date: " + this.innerHTML;
    }
  });
  
  $('#feed .tabHeader .dropdown-item').on('click', function(){
	  if(this.innerHTML.toLowerCase() == 'latest'){
		  sortFeedFiles(false);
	  } else{
		  sortFeedFiles(true);
	  }
  });

  $(".sortButton").on("click", function(ev) {
    let style = this.parentNode.querySelector(".dropdown-menu").style.display;
    this.parentNode.querySelector(".dropdown-menu").style.display =
      style == "block" ? "" : "block";
  });

  $(".tabHeader").on("mouseleave", function(ev) {
    try {
      this.querySelector(".dropdown-menu").style.display = "none";
    } catch {}
  });

  $("#backArrowLeft").on("click", function() {
    //resets account icons when back arrow is selected
    selectedUser = null;
    $(".saveDoctorButton").html("Assign to...");
    $("[data-user]").css("display", "");
    $(".accountInfo").css("display", "none");
    $(".accountIcon").animate(
      {
        opacity: 1,
      },
      200,
      function() {
        $(this).css("display", "flex");
        $(this).css("cursor", "pointer");
      }
    );
    $("#backArrowLeft, #accountSettingsIcon").css({
      visibility: "hidden",
      cursor: "default"
    });
  });

  $(".tabButton").on("click", function() {
    //switch view on tab click
    $(".tabButton").toggleClass("activeTab", false);
    $(this).toggleClass("activeTab", true);
    $(".tabView").toggleClass("selectedView", false);
    $("#" + this.attributes["name"].value).toggleClass("selectedView", true);
  });

  $("#popupBackDrop").on('click', function(ev) {
    //make account creation popup disappear when clicked outside the thing
    if (ev.target.classList.contains("popup")) {
      ev.stopPropagation();
      return;
    }
    $(".popup").css("display", "none");
    $(".docBoxInfo").css("display", "none");
    $(this).css("display", "none");
  });

  $(".noInfoDefault").on("click", function(ev) {
    //brings up find-nearby form when a box with no doctor/school info is clicked
    var thisID = this.parentNode.id;

    if (thisID == "userInfo") {
      $("#userInfoPopup").css("display", "block");
    }
    if (thisID == "doctorInfo" || thisID == "schoolInfo") {
      $(".tabButton").toggleClass("activeTab", false);
      $("#findButton").toggleClass("activeTab", true);
      $(".tabView").toggleClass("selectedView", false);
      $("#find").toggleClass("selectedView", true);
    }
    ev.stopPropagation();
  });

  $(".docBox").on("click", function(ev) {
    //$("#popupBackDrop").css("display", "block");
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    if (selectedUser != null) {
      $(".saveDoctorButton").html("Assign to " + selectedUser);
    } else {
      $(".saveDoctorButton").html("Assign to...");
    }
    $(this).toggleClass("activeTab", true);
    $("#" + this.id + "Info").css("display", "flex");
    ev.stopPropagation();
  });

  $(".close").on("click", function() {
    $("#" + this.parentNode.parentNode.id).css("display", "none");
    $(".dropdown-menu").hide();
    $(".docBox").toggleClass("activeTab", false);
  });

  $(".saveDoctorButton").on("click", function() {
    var docInfo = this.parentNode.parentNode.parentNode;
    var docName = docInfo.getElementsByClassName("docNameValue")[0].innerHTML;
    var docNumber = docInfo.getElementsByClassName("docNumberValue")[0]
      .innerHTML;
    var docEmail = docInfo.getElementsByClassName("docEmailValue")[0].innerHTML;
    var docAddress = docInfo.getElementsByClassName("docAddressValue")[0]
      .innerHTML;
    var newDoctor = new Contact(
      "doctor",
      docName,
      docNumber,
      docEmail,
      docAddress
    );
    var currInfo = $("#doctorInfo").find(".populatedInfo");

    // Handling assignment of Doctor information to user

    if (selectedUser != null) {
      // Selected user already has a doctor
      if (currInfo.css("display") != "none") {
        // Check if same doctor
        var currDoc = currInfo.find("#nameValue").html();
        if (currDoc == docName) {
          swal({
            title: "Doctor already assigned",
            text:
              docName +
              "'s information already saved to " +
              selectedUser +
              "'s profile",
            icon: "info"
          });
        }
        // Replace Doctor
        else {
          swal({
            title: "Doctor already assigned",
            text:
              "Replace " +
              currDoc +
              " with " +
              docName +
              " for " +
              selectedUser +
              "?",
            buttons: true,
            dangerMode: true,
            icon: "warning"
          }).then(willDelete => {
            if (willDelete) {
              swal({
                title: "Doctor Assigned!",
                text:
                  docName +
                  "'s information saved to " +
                  selectedUser +
                  "'s profile",
                icon: "success"
              });
              users.filter(
                person =>
                  person.name.toLowerCase() == selectedUser.toLowerCase()
              )[0].doctor = newDoctor;
              populateAccountInfo(selectedUser);
            } else {
              swal({
                title: "No changes made",
                icon: "error"
              });
            }
          });
        }
      }
      // No doctor assigned, so assign it
      else {
        swal({
          title: "Doctor Assigned!",
          text:
            docName + "'s information saved to " + selectedUser + "'s profile",
          icon: "success"
        });
        users.filter(
          person => person.name.toLowerCase() == selectedUser.toLowerCase()
        )[0].doctor = newDoctor;
        populateAccountInfo(selectedUser);
      }
    }
    // If selectedUser == null
    else {
      swal({
        title: "Assign " + docName + " to:",
        buttons: {
          janButton: {
            text: "Jannette",
            value: "Jannette"
          },
          bobButton: {
            text: "Bob",
            value: "Bob"
          }
        }
      }).then(value => {
        // Button clicked
        if (value != null) {
          var currUser = users.filter(
            person => person.name.toLowerCase() == value.toLowerCase()
          )[0];
          // New Doctor
          if (currUser.doctor == null) {
            swal({
              title: "Doctor Assigned!",
              text: docName + "'s information saved to " + value + "'s profile",
              icon: "success"
            });
            users.filter(
              person => person.name.toLowerCase() == value.toLowerCase()
            )[0].doctor = newDoctor;
            populateAccountInfo(value);
          }
          // Replace Doctor
          else {
            // Check if same doctor
            if (currUser.doctor.name == docName) {
              swal({
                title: "Doctor already assigned",
                text:
                  docName +
                  "'s information already saved to " +
                  currUser.name +
                  "'s profile",
                icon: "info"
              });
            }
            // Replace Doctor
            else {
              swal({
                title: "Doctor already assigned",
                text:
                  "Replace " +
                  currUser.doctor.name +
                  " with " +
                  docName +
                  " for " +
                  currUser.name +
                  "?",
                buttons: true,
                dangerMode: true,
                icon: "warning"
              }).then(willDelete => {
                if (willDelete) {
                  swal({
                    title: "Doctor Assigned!",
                    text:
                      docName +
                      "'s information saved to " +
                      currUser.name +
                      "'s profile",
                    icon: "success"
                  });
                  currUser.doctor = newDoctor;
                  populateAccountInfo(currUser.name);
                } else {
                  swal({
                    title: "No changes made",
                    icon: "error"
                  });
                }
              });
            }
          }
        }
      });
    }

    // should reset states of dropdown/checked boxes
    $(".docBoxInfo").css("display", "none");
	sessionStorage.users = JSON.stringify(users);
    $("#popupBackDrop").css("display", "none");
  });

  $(".tabView").on("click", function(ev) {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    $(this).css("display", "none");
    ev.stopPropagation();
  });

  $(".docBoxInfo").on("click", function(ev) {
    ev.stopPropagation();
    return false;
  });

  $("#map").on("click", function(ev) {
    ev.stopPropagation();
    return false;
  });

  $("#plusIcon").on("click", function() {
    //bring up an account creation diy modal when the plus button is clicked
    var popup = $("#userInfoPopup");
    $("#popupBackDrop").css("display", "block");
    popup.css("display", "block");
    popup.css("marginTop", -(popup.height() / 2));
    popup.css("marginLeft", -(popup.width() / 2));
  });

  $("#accountIconSelect img").on("click", function() {
    //highlights icon when selected in the account creation form
    $("#accountIconSelect img").toggleClass("iconSelected", false);
    $(this).toggleClass("iconSelected", true);
  });

  $("#createAccountSubmitButton").on("click", function(ev) {
    //maes a new account with form input, needs a name and icon (default to dog);
    ev.preventDefault();
    var name = $("#accountNameInput").val();
    if (name == "" || name == null) {
      swal("User Name is Required");
      return;
    }
    var age = $("#accountAgeInput").val();
    var weight = $("#accountWeightInput").val();
    var bloodType = $("#accountBloodTypeInput").val();
    var image = $(".iconSelected").attr("src");
    var allergies = $("#accountConditionsInput")
      .val()
      .split(",");
    var medication = $("#accountMedicationInput")
      .val()
      .split(",");
    var newUser = new Account(
      name,
      age,
      weight,
      bloodType,
      allergies,
      medication,
      null,
      null,
      image,
      newUserColors.pop()
    );
    users.push(newUser);
	sessionStorage.users = JSON.stringify(users);
    drawAccountAvatar(newUser);
    $("#userInfoPopup").css("display", "none");
    $("#popupBackDrop").css("display", "none");
    $("#userInfoPopup input").val("");
    $("#userInfoPopup textarea").val("");
  });
  
});
