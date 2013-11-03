// JavaScript code for Week 4
//Project 
//Boyd Tiffin
//1309 -Visual Frameworks


// Load all content before JS code runs
window.addEventListener("DOMContentLoaded", function(){
	// Global Functions
	function $(x){
		var myElement = document.getElementById(x);
		return myElement;
	};
	
// Functions
	
	// Array for creating the Select Fields with JS
	var statusGroup = ["Idea", "Requirements", "Development", "Production"],
	itemTypeValue = false,
	errMsg = $('errors');
	catCreate();
	
	
	// Create Select Field from JS instead of HTML
	function catCreate(){
		var myForm = document.getElementsByTagName("form"),
			selectLi = $('select'), // Get select element into a var
			createSelect = document.createElement('select'); //create a select element
			createSelect.setAttribute("id", "status"); // create an ID attribute and apply to select tag we created
		for(var i=0, j=statusGroup.length; i<j; i++){
			var makeOption = document.createElement('option'),
				optText = statusGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			createSelect.appendChild(makeOption);
		}
		selectLi.appendChild(createSelect);
	};
	
	// Clear ALl data function which is called when the button is clicked
	var clearAll = function(){
		if(localStorage.length ===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("Data has been cleared!");
			window.location.reload();
			return false;
		}
	};
	
	// Checkbox Value
	function getRadios(){
		var radioValue = document.forms[0].ideaType;
		for(i=0, j=radioValue.length; i<j; i++){
			if(radioValue[i].checked){
				itemTypeValue = radioValue[i].value;
			}
		}
	};
	
	
	// Toggle Display for Display Data
	function toogleControls(n){
		switch(n){
			case "on":
				$('mySubmit').style.display = "none";
				$('clearAllLink').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
			break;
			case "off":
				$('mySubmit').style.display = "block";
				$('clearAllLink').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
			break;
			default:
				return false;
		}
	};
	
	
	// Function to Store Data
	function storeData(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		// Get all form data in an Object
		getRadios();
		var idea = {};
			idea.title = ["Idea Title:", $('ideaTitle').value];
			idea.importance = ["Importance:", $('importance').value];
			idea.dateDue = ["Date Due:", $('dateDue').value];
			idea.description = ["Description:", $('description').value];
			idea.status = ["Status:", $('status').value];
			idea.type = ["Type:", itemTypeValue];
			// Add Radio Check to get value
		localStorage.setItem(id, JSON.stringify(idea));
		console.log(idea);
		alert("Idea Logged!");
	};

	// Function to display items and hide form when button is clicked
	var displayData = function(){
/*
		if(document.getElementById("items")){
			// remove all content on screen
			document.getElementById("items").innerHTML = "";
		}
*/
		toogleControls("on");
		if(localStorage.length === 0){
			alert("You have no ideas to display, default data was added");
			autoFillData();
			window.location.reload();
		}
		// Display data to user
		var createDiv = document.createElement('div');
		createDiv.setAttribute("id", "items");
		var createList = document.createElement('ul');
		createDiv.appendChild(createList);
		document.body.appendChild(createDiv);
		$('items').style.display = "block";
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
	
	function getImage(createSubList, catName){
		var imageLi = document.createElement('li');
		createSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "img/"+ catName + ".png")
		imageLi.appendChild(newImg);
	}
	
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function createItemLinks(key,createLinks){
		var editLink = document.createElement('a');
		editLink.href = "#";
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
		toogleControls("off");
		console.log(idea);
		$('ideaTitle').value = idea.title[1];
		$('importance').value = idea.importance[1];
		$('dateDue').value = idea.dateDue[1];
		$('description').value = idea.description[1];
		$('status').value = idea.status[1];		
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
		$('butSubmit').value = "Edit Idea";
		// Create a listener that will run validate function
		var editSubmit = $('butSubmit');
		editSubmit.addEventListener("click", validate);
		// Save key value established as property of edit submit event
		editSubmit.key = this.key;
	};
	
	function validate(e){
		// Define scope of validation
		var getTitle = $('ideaTitle');
		var getDateDue = $('dateDue');
		var getDescription = $('description');
		var getStatus = $('status');
		var messageAry = [];
		
		// Reset Error msg
		errMsg.innerHTML = "";
		getTitle.style.border = "1px solid black";
		getDateDue.style.border = "1px solid black";
		getDescription.style.border = "1px solid black";
		getStatus.style.border = "1px solid black";
		
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
		if(getStatus.value === ""){
			var statusError = "Please add a Current Status.";
			getStatus.style.border = "1px solid red";
			messageAry.push(statusError);
		}
/*
		// Email RegEx
		var re = /^\w+([\.-]?\w+)([\.-]?\w+)*(\.\w{2,3,4})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
*/
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
	
	function deleteItem(key){
		var ask = confirm("Are you sure you want to delete this idea?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Idea was deleted successfully!");
			window.location.reload();
		}else{
			alert("Idea was not deleted, now get to work!")
		}
	};
	
	/* Listeners */
	var save = $('butSubmit');
	save.addEventListener("click" , validate);
	clearAllLink.addEventListener("click", clearAll);
	displayLink.addEventListener("click", displayData);
});