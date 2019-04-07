function Account(name, age, weight, bloodType, allergies, medication, doctor, school, avatar){
	//user account info we need;
	this.name = name;
	this.age = +age;
	this.weight = +weight;
	this.bloodType = bloodType;
	this.medication = medication;
	this.allergies = allergies;
	this.doctor = doctor;//should be instiution objects I think
	this.school = school;
	this.avatar = avatar;
}

function Contact(type, name, phone, email, address){
	//schools and doctors since we use the same info
	this.type = type;
	this.name = name;
	this.phone = phone;
	this.email = email;
	this.address = address;
}

function Event(title, date, description, users){
	this.title = title;
	this.date = new Date(date);
	this.description = description;
	this.users = new Array(users); //make this a list of associated user names
}

function File(name, source, date){
	this.name = name;
	this.source = source;
	this.data = date;
}

function setupAvatarOnClick(){
	$(".accountIcon").on("click", function() {
		if (this.id == "plusIcon") {
		  return;
		}
		var selected = this;
		selectedUser = this.querySelector('.card-title').innerHTML;
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
		populateAccountInfo(selectedUser);
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
}

function drawAccountAvatar(person){
	var element = document.getElementById('avatarTemplate').content.cloneNode(true);
	element.querySelector('.accountIcon').id = person.name + 'Icon';
	element.querySelector('img').src = (person.avatar == null)? 'images/default_icon.PNG': person.avatar;
	element.querySelector('.card-title').innerHTML = person.name;
	var leftContent = document.getElementById('leftContent');
	leftContent.insertBefore(element, leftContent.children[1]);//insert as the 2nd item behind the back arrow
	setupAvatarOnClick();
}

function populateAccountInfo(name){
	//function to fill out account info when an account picture is clicked;
	//takes the account name
	if(name !== selectedUser){
		console.log(name);
		console.log(selectedUser);
		return;
	}
	var disable = function(target){
		target.querySelector('.noInfoDefault').style.display = 'flex';
		target.querySelector('.populatedInfo').style.display = 'none';
	}
	var enable = function(target){
		target.querySelector('.noInfoDefault').style.display = null;
		target.querySelector('.populatedInfo').style.display = null;
	}
	var person = users.filter(person => person.name.toLowerCase() == name.toLowerCase())[0];
	var userInfo = document.getElementById('userInfo');
	if(person.age == null && person.weight == null && person.medication == null && person.allergies == null && person.weight == null){
		disable(userInfo);
	} else{
		enable(userInfo);
		userInfo.querySelector('#ageValue').innerHTML = person.age;
		userInfo.querySelector('#weightValue').innerHTML = person.weight;
		userInfo.querySelector('#bloodTypeValue').innerHTML = person.bloodType;
		var populateList = function(id, values){
			var list = userInfo.querySelector('#'+id);
			while(list.firstChild){
				list.removeChild(list.firstChild);
			}
			if(values){
				values.forEach(function(val){
					var listItem = document.createElement('li');
					listItem.innerHTML = val.trim();
					list.appendChild(listItem)
				});
			}
		}
		populateList('allergiesList', person.allergies);
		populateList('medicationList', person.medication);
	}
	var fillContactInfo = function(target, contact){
		enable(target)
		target.querySelector('#nameValue').innerHTML = contact.name;
		target.querySelector('#numberValue').innerHTML = contact.phone;
		target.querySelector('#emailValue').innerHTML = contact.email;
		target.querySelector('#addressValue').innerHTML = contact.address;
	}
	var doctorInfo = document.getElementById('doctorInfo');
	if(person.doctor == null){
		disable(doctorInfo);
	}else{
		fillContactInfo(doctorInfo, person.doctor);
	}
	var schoolInfo = document.getElementById('schoolInfo');
	if(person.school == null){
		disable(schoolInfo);
	}else{
		fillContactInfo(schoolInfo, person.school);
	}
}

var middlestHigh = new Contact('school', 'Middlest High School', '888-432-4353', 'nurse@achoo.edu', '4800 Avenue Q');
var collegeElementary = new Contact('school', 'College Elementary School', '834-432-4333', 'mam please dont email us', '445 fake st.');
var users = new Array(
	new Account('Bob', '13', '140', 'A+', ['Pollen', 'Bees'], ['PollenBeeGone'], null, middlestHigh, 'images/boy_icon.png'),
	new Account('Jannette', '12', '120', 'O-', ['Sandwich Crusts'], ['Smuckers Uncrustables'], null, collegeElementary, 'images/girl_icon.png')
);
users.forEach(function(user){
	drawAccountAvatar(user);
});
var selectedUser = null;
