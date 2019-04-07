$(document).ready(function() {
  console.log("loaded");
  

  $("#backArrowLeft").on("click", function() {
	selectedUser = null;
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
	var docName = docInfo.getElementsByClassName("docNameValue")[0].innerHTML;
	var docNumber = docInfo.getElementsByClassName("docNumberValue")[0].innerHTML;
	var docEmail =  docInfo.getElementsByClassName("docEmailValue")[0].innerHTML;
	var docAddress = docInfo.getElementsByClassName("docAddressValue")[0].innerHTML;
	var newDoctor = new Contact('doctor', docName, docNumber, docEmail, docAddress);
	  
    var text = "Doctor Information added to:";
    var janChecked = this.parentNode.getElementsByClassName("janCheck")[0]
      .checked;
    var bobChecked = this.parentNode.getElementsByClassName("bobCheck")[0]
      .checked;
	//add selected doctors to the users and redraw
    if (bobChecked) {
      text += "\n-Bob";
	  users.filter(person => person.name.toLowerCase() == 'bob')[0].doctor = newDoctor;
	  populateAccountInfo('Bob');
    }
    if (janChecked) {
      text += "\n-Jannete";
	  users.filter(person => person.name.toLowerCase() == 'jannette')[0].doctor = newDoctor;
	  populateAccountInfo('Jannette');
    }
    alert(text);
    // should reset states of dropdown/checked boxes
    $(".dropdown-toggle").click();
  });
  
  $('#plusIcon').on('click', function(){
		var popup = $("#userInfoPopup");
		$("#popupBackDrop").css("display", "block");
		popup.css("display", "block");
		popup.css('marginTop', -(popup.height()/2));
		popup.css('marginLeft', -(popup.width()/2));
  });
  
  $('#accountIconSelect img').on('click',function(){
		$('#accountIconSelect img').toggleClass('iconSelected',false);
		$(this).toggleClass('iconSelected', true);
  });
  
  $('#createAccountSubmitButton').on('click', function(ev){
		ev.preventDefault();
		var name = $('#accountNameInput').val();
		if(name == '' || name == null){
			alert('User Name is Required');
			return;
		}
		var age = $('#accountAgeInput').val();
		var weight = $('#accountWeightInput').val();
		var bloodType = $('#accountBloodTypeInput').val();
		var image = $('.iconSelected').attr('src');
		var allergies = $('#accountConditionsInput').val().split(',');
		var medication = $('#accountMedicationInput').val().split(',');
		var newUser = new Account(name, age, weight, bloodType, allergies, medication, null, null, image);
		users.push(newUser);
		drawAccountAvatar(newUser);
		$("#userInfoPopup").css('display', 'none');
		$("#popupBackDrop").css("display", "none");
		$('#userInfoPopup input').val('');
		$('#userInfoPopup textarea').val('');
  });
  
});
