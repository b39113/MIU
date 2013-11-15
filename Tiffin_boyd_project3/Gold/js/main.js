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


/* Event Listeners */
var save = aaa('butSubmit');
save.addEventListener("click" , validate);
clearAllLink.addEventListener("click", clearLocal);
displayLink.addEventListener("click", autofillData);
