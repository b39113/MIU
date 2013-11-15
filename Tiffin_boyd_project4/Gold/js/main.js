$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#formId');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.
errMsg = aaa('errors');

// Set the date variable to 30 days from today

/* Blanket function to get the element by ID */
function aaa(x){
	var myElement = document.getElementById(x);
	return myElement;
};

/* Get the radios values */
function getRadios(){
	var radioValue = document.forms[0].ideaType;
	for(i=0, j=radioValue.length; i<j; i++){
		if(radioValue[i].checked){
			itemTypeValue = radioValue[i].value;
		}
	}
};

var autofillData = function (){
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
	alert("All Default Data Was Loaded!");
};

var getData = function(){
	var createDiv = document.createElement('div');
	createDiv.setAttribute("id", "items");
	createDiv.setAttribute("data-role", "content");
	var createList = document.createElement('ul');
	createDiv.appendChild(createList);
	var displayDiv = aaa('display');
	displayDiv.appendChild(createDiv);
	aaa('items').style.display = "block";
	for(var i=0, j=localStorage.length; i<j; i++){
		var createLi = document.createElement('li');
		var createLinks = document.createElement('li');
		createList.appendChild(createLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// String to Obj
		var obj = JSON.parse(value); 
		var createSubList = document.createElement('ul');
		createLi.appendChild(createSubList);
		getImage(createSubList, obj.status[1]);
		for(var d in obj){
			var createSubLi = document.createElement('li');
			createSubList.appendChild(createSubLi);
			var optSubText = obj[d][0]+" " +obj[d][1];
			createSubLi.innerHTML = optSubText;
			createSubList.appendChild(createLinks);
		}
		createItemLinks(localStorage.key(i), createLinks); // Creates the overall app edit and delete links
	}		

};

var storeData = function(key){
	if(!key){
		var id = Math.floor(Math.random()*100000001);
	}else{
		id = key;
	}
	// Get all form data in an Object
	getRadios();
	var idea = {};
		idea.title = ["Idea Title:", aaa('ideaTitle').value];
		idea.importance = ["Importance:", aaa('importance').value];
		idea.dateDue = ["Date Due:", aaa('dateDue').value];
		idea.description = ["Description:", aaa('description').value];
		idea.status = ["Status:", aaa('status').value];
		idea.type = ["Type:", itemTypeValue];
		// Add Radio Check to get value
	localStorage.setItem(id, JSON.stringify(idea));
	alert("Idea Logged!");
	window.location.reload();
}; 

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this idea?");
	if(ask){
		localStorage.removeItem(this.key);
		alert("Idea was deleted successfully!");
		window.location.reload();
	}else{
		alert("Idea was not deleted, now get to work!")
	}
};
					
var clearLocal = function(){
	if(localStorage.length ===0){
		alert("There is no data to clear.");
	}else{
		localStorage.clear();
		alert("Data has been cleared!");
		window.location.reload();
		return false;
	}
};

function validate(e){
	// Define scope of validation
	var getTitle = aaa('ideaTitle');
	var getDateDue = aaa('dateDue');
	var getDescription = aaa('description');
	var getStatus = aaa('status');
	var messageAry = [];
	
	// Reset Error msg
	errMsg.innerHTML = "";
	
	// Title Validation
	if(getTitle.value === ""){
			var titleError = "Please add a Title.";
			getTitle.style.border = "1px solid red";
			messageAry.push(titleError);
		}
		// Date Due Validation
		if(getDateDue.value === ""){
			var dateDueError = "Please add a Due Date.";
			getDateDue.style.border = "1px solid red";
			messageAry.push(dateDueError);
		}
		// Description Validation
		if(getDescription.value === ""){
			var descriptionError = "Please add a Description.";
			getDescription.style.border = "1px solid red";
			messageAry.push(descriptionError);
		}
		// Status Validation
		if(getStatus.value === "Select Current Status"){
			var statusError = "Please add a Current Status.";
			getStatus.style.border = "1px solid red";
			messageAry.push(statusError);
		}
	// Display Errors
	if(messageAry.length >= 1){
		for(var i = 0, j=messageAry.length; i<j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	}else{
		// No issues, so kick off storeData with the original key if it exists
		storeData(this.key);
	}
	
};
// Function to get the image
function getImage(createSubList, catName){
	var imageLi = document.createElement('li');
	createSubList.appendChild(imageLi);
	var newImg = document.createElement('img');
	var setSrc = newImg.setAttribute("src", "img/"+ catName + ".png")
	imageLi.appendChild(newImg);
}

// Function to create edit and delete idea links based on key
function createItemLinks(key,createLinks){
	var editLink = document.createElement('a');
	editLink.href = "#addidea";
	editLink.key = key;
	var editText = "Edit Idea";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	createLinks.appendChild(editLink);
	//add Line Break
	var breakTag = document.createElement('br');
	createLinks.appendChild(breakTag);
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Idea";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	createLinks.appendChild(deleteLink);
};

function editItem(){
	// get item info from localStorage
	var value = localStorage.getItem(this.key);
	var idea = JSON.parse(value);
	//Show Form
	aaa('ideaTitle').value = idea.title[1];
	aaa('importance').setAttribute("value", idea.importance[1]);
	aaa('dateDue').value = idea.dateDue[1];
	aaa('description').value = idea.description[1];
	aaa('status').value = idea.status[1];		
/* 		Need Radio Button and/or Checkbox Code */
	var radioButtons = document.forms[0].ideaType;
	for(var i=0; i<radioButtons.length; i++){
		if(radioButtons[i].value == "domain" && idea.type[1] == "domain"){
			radioButtons[i].setAttribute("checked", "checked");
		}else if(radioButtons[i].value == "website" && idea.type[1] == "website"){
			radioButtons[i].setAttribute("checked", "checked");
		}else if(radioButtons[i].value == "app" && idea.type[1] == "app"){
			radioButtons[i].setAttribute("checked", "checked");
		}
	}		
	// Remove StoreData
	save.removeEventListener("click", storeData);
	// Change add to edit
	aaa('butSubmit').value = "Edit Idea";
	// Create a listener that will run validate function
	var editSubmit = aaa('butSubmit');
	editSubmit.addEventListener("click", validate);
	// Save key value established as property of edit submit event
	editSubmit.key = this.key;
};



/* Event Listeners */
var save = aaa('butSubmit');
save.addEventListener("click" , validate);
clearAllLink.addEventListener("click", clearLocal);
displayLink.addEventListener("click", getData);
defaultData.addEventListener("click", autofillData);
