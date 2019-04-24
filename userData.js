function Account(
  name,
  age,
  weight,
  bloodType,
  allergies,
  medication,
  doctor,
  school,
  avatar,
  color
) {
  //user account info we need;
  this.name = name;
  this.age = +age;
  this.weight = +weight;
  this.bloodType = bloodType;
  this.medication = medication;
  this.allergies = allergies;
  this.doctor = doctor; //should be instiution objects I think
  this.school = school;
  this.avatar = avatar;
  this.color = color; //underline color;
  if (color == undefined) {
    //if we run out of colors we call pop on an empty array and get undefined, I think, shouldn't really occur
    color = "gray";
  }
}

function Contact(type, name, phone, email, address) {
  //schools and doctors since we use the same info
  this.type = type;
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.address = address;
}

function Event(title, date, description, users) {
  this.title = title;
  this.date = new Date(date);
  this.description = description;
  this.users = new Array(users); //make this a list of associated user names
}

function File(name, source, date) {
  this.name = name;
  this.source = source;
  this.data = date;
}

function setupAvatarOnClick() {
  $(".accountIcon").on("click", function() {
    if (this.id == "plusIcon") {
      return;
    }
    if (selectedUser != null) {
      return;
    }
    var selected = this;
	this.style.cursor = 'default';
    selectedUser = this.querySelector(".card-title").innerHTML;
    populateAccountInfo(selectedUser);
    var topPos = $(".accountIcon:first").offset().top - $(this).offset().top;
    var disapearPromise = Promise.resolve(
      $(".accountIcon")
        .each(function(index) {
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
    $("#backArrowLeft, #accountSettingsIcon").css({
      visibility: "visible",
      cursor: "pointer"
    });

    $("[data-user]")
      .filter("[data-user !=" + selectedUser + "]")
      .css("display", "none");
    $(".saveDoctorButton").html("Assign to " + selectedUser);
  });
}

function drawAccountAvatar(person) {
  var element = document
    .getElementById("avatarTemplate")
    .content.cloneNode(true);
  element.querySelector(".accountIcon").id = person.name + "Icon";
  element.querySelector("img").src =
    person.avatar == null ? "images/default_icon.PNG" : person.avatar;
  element.querySelector(".card-title").innerHTML = person.name;
  element.querySelector(".fakeRectangle").style.backgroundColor = person.color;
  var leftContent = document.getElementById("leftContent");
  leftContent.insertBefore(element, leftContent.querySelector('#plusIcon')); //insert as the 2nd item behind the back arrow
  setupAvatarOnClick();
}

function populateAccountInfo(name) {
  //function to fill out account info when an account picture is clicked;
  //takes the account name
  if (name !== selectedUser) {
    console.log(name);
    console.log(selectedUser);
    return;
  }
  var disable = function(target) {
    target.querySelector(".noInfoDefault").style.display = "flex";
    target.querySelector(".populatedInfo").style.display = "none";
  };
  var enable = function(target) {
    target.querySelector(".noInfoDefault").style.display = null;
    target.querySelector(".populatedInfo").style.display = null;
  };
  var person = users.filter(
    person => person.name.toLowerCase() == name.toLowerCase()
  )[0];
  var userInfo = document.getElementById("userInfo");
  if (
    person.age == null &&
    person.weight == null &&
    person.medication == null &&
    person.allergies == null &&
    person.weight == null
  ) {
    disable(userInfo);
  } else {
    enable(userInfo);
    userInfo.querySelector("#ageValue").innerHTML = person.age;
    userInfo.querySelector("#weightValue").innerHTML = person.weight;
    userInfo.querySelector("#bloodTypeValue").innerHTML = person.bloodType;
    var populateList = function(id, values) {
      var list = userInfo.querySelector("#" + id);
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      if (values) {
        values.forEach(function(val) {
          var listItem = document.createElement("li");
          listItem.innerHTML = val.trim();
          list.appendChild(listItem);
        });
      }
    };
    populateList("allergiesList", person.allergies);
    populateList("medicationList", person.medication);
  }
  var fillContactInfo = function(target, contact) {
    enable(target);
    target.querySelector("#nameValue").innerHTML = contact.name;
    target.querySelector("#numberValue").innerHTML = contact.phone;
    target.querySelector("#emailValue").innerHTML = contact.email;
    target.querySelector("#addressValue").innerHTML = contact.address;
  };
  var doctorInfo = document.getElementById("doctorInfo");
  if (person.doctor == null) {
    disable(doctorInfo);
  } else {
    fillContactInfo(doctorInfo, person.doctor);
  }
  var schoolInfo = document.getElementById("schoolInfo");
  if (person.school == null) {
    disable(schoolInfo);
  } else {
    fillContactInfo(schoolInfo, person.school);
  }
}

function getSortedDates(selector, attrName, reverse = false) {
    return $($(selector).toArray().sort(function(a, b){
        var aVal = new Date(a.getAttribute(attrName)),
            bVal = new Date(b.getAttribute(attrName));
        return (reverse)? aVal - bVal: bVal - aVal;
    }));
}
function sortFeedFiles(reverse = false){
	let cards = getSortedDates('.feedAppt, .feedFile', 'data-time', reverse);
	let parent = document.getElementById('feedItems');
	cards.each(function(index, element){
		parent.append(element);
	});
}

var newUserColors = [
  "yellow",
  "blue",
  "cyan",
  "orange",
  "magenta",
  "red",
  "steelblue"
];
var middlestHigh = new Contact(
  "school",
  "Middlest High School",
  "888-432-4353",
  "nurse@achoo.edu",
  "4800 Avenue Q"
);
var collegeElementary = new Contact(
  "school",
  "College Elementary School",
  "834-432-4333",
  "mam please dont email us",
  "445 fake st."
);

if(sessionStorage.users != undefined){
	try{
		users = JSON.parse(sessionStorage.users);
	} catch{
		users = new Array(
		  new Account(
			"Bob",
			"13",
			"140",
			"A+",
			["Pollen", "Bees"],
			["PollenBeeGone"],
			null,
			middlestHigh,
			"images/boy_icon.png",
			getComputedStyle(document.body).getPropertyValue("--bob-color")
		  ),
		  new Account(
			"Jannette",
			"12",
			"120",
			"O-",
			["Sandwich Crusts"],
			["Smuckers Uncrustables"],
			null,
			collegeElementary,
			"images/girl_icon.png",
			getComputedStyle(document.body).getPropertyValue("--jannette-color")
		  )
		);
	}
} else{
	users = new Array(
	  new Account(
		"Bob",
		"13",
		"140",
		"A+",
		["Pollen", "Bees"],
		["PollenBeeGone"],
		null,
		middlestHigh,
		"images/boy_icon.png",
		getComputedStyle(document.body).getPropertyValue("--bob-color")
	  ),
	  new Account(
		"Jannette",
		"12",
		"120",
		"O-",
		["Sandwich Crusts"],
		["Smuckers Uncrustables"],
		null,
		collegeElementary,
		"images/girl_icon.png",
		getComputedStyle(document.body).getPropertyValue("--jannette-color")
	  )
	);
}
users.forEach(function(user) {
  drawAccountAvatar(user);
});

if(localStorage.newEvent == 'true'){
	swal('event added!');
}
localStorage.newEvent = false;

var selectedUser = null;

var doctors = new Array(
  new Contact(
    "doctor",
    "Dr. Realman",
    "231-555-1212",
    "Realman@FakeMail.com",
    "420 Lakeshore Dr."
  ),
  new Contact(
    "doctor",
    "Dr. Octavia",
    "362-774-3377",
    "DocOc@Octomail.com",
    "628 Spider Ln."
  ),
  new Contact(
    "doctor",
    "Dr. Strange",
    "312-995-9112",
    "Strange@Cosmail.com",
    "221b Baker St."
  ),
  new Contact(
    "doctor",
    "Dr. Doctor",
    "362-362-3622",
    "DrDoctor@Docmail.com",
    "301 Doctor Dr."
  )
);
