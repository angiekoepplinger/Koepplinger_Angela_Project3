//Angela Koepplinger
//Visual Frameworks: Term 1209
// Project 3: Web App Part 3
//Date: /12


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	//alert(localStorage.value(0));

	//getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};


	//Create select field element and populate with options.
	function createList(selector, listOptions){
		var formTag = document.getElementsByTagName("form");   //formTag is an array of all of the form tags.
		var selectLi = $(selector);
		var makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "list");
		
		for(var i=0, j=listOptions.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = listOptions[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};

	//Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].asset;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			assetValue = radios[i].value;
			};
		};
		console.log(assetValue);
	};

	function getCheckboxValue(itemName){
		if($(itemName).checked){
			return value = $(itemName).value;
		} else{
			return value = "No"
		};
	};

	function toggleControls(x){
		switch(x){
			//when display data is selected, data is "on", hide form.
			case "on":
				$("procurementTask").style.display = "none";		//clear data is in an anchor tag in HTML, anchor tags are by default "inline".  
				$("clearData").style.display = "inline";			//If you make it a block level element, it will span the width of the display.
				$("displayData").style.display = "none";			//We do not want the displayData tab to show, because we are in this page already, so we turn it off.
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("procurementTask").style.display = "block"; 
				$("clearData").style.display = "inline";
				$("displayData").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		};
	};
	
	function storeData(){
		var id = Math.floor(Math.random()*100000001);
		//Gather up all of our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedRadio();

		var item           			= {};
			item.purchaseType      	= ["Purchase Type:", $("list").value];
			item.workOrder 			= ["Work Order:", $("workOrder").value];
			item.supportSite 		= ["Support Site:", $("supportSite").value];
			item.itemType 			= ["Item Type:", $("list").value];
			item.asset 				= ["Asset:", assetValue];
			item.manufacturer 		= ["Manufacturer:", $("manufacturer").value];
			item.partNumber 		= ["Part Number:", $("partNumber").value];
			item.qty 				= ["Qty:", $("qty").value];
			item.urgency 			= ["Urgency:", $("urgency").value];
			item.mgmtApproval 		= ["Management Approval:", getCheckboxValue("mgmtApproval")];
			item.rrRequest 			= ["R&R Request:", getCheckboxValue("rrRequest")];
			item.dateRequired 		= ["Date Required:", $("dateRequired").value];
			item.completionDate		= ["Completion Date:", $("completionDate").value];
			item.notes			 	= ["Notes:", $("notes").value];

			//Save data into Local Storage: Use Stringify to convert our object to a string.
			localStorage.setItem(id, JSON.stringify(item));
			alert("Purchase Task Saved!");
	};


	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in Local Storage.")
		};
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeUl = document.createElement("ul");
		makeDiv.appendChild(makeUl);
		
		for(var i = 0, j=localStorage.length; i<j; i++){ 									//Loop through the local storage and grab the id(key) & associated object(value)
			if(Number(localStorage.key(i)/1) === Number(localStorage.key(i))) {			//Safari 6 adds info to the local storage, convert strings to numbers to exclude safari storage from our data.
				var makeli = document.createElement("li");
				var linksLi = document.createElement("li");	//NEW
				makeUl.appendChild(makeli);
				var key = localStorage.key(i);  											//id associated with form submission object
				var value = localStorage.getItem(key); 										 //the object, in this case: var item{}
				var object = JSON.parse(value);												//convert string from local storage back into an object using JSON.parse!
				var makeSubUl = document.createElement("ul");
				makeli.appendChild(makeSubUl)
				for(var x in object){														//example: for "item.purchaseType"(key) in the object
					var makeSubli = document.createElement("li");
					makeSubUl.appendChild(makeSubli);
					//get the "value" of the data in our object. The value of our key is an array.
					//[x] = key,  [0] = label in array, [1] = value in array.
					var objSubText = object[x][0]+ " " +object[x][1];	
					makeSubli.innerHTML = objSubText;	
					makeSubUl.appendChild(linksLi);	//NEW  edit link & delete link
				};
			};
			makeItemLinks(localStorage.key(i), linksLi);	//Create our edit and delete buttons/link for each item in local storage.	
		};
		document.body.appendChild(makeDiv);
	};

	
	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Task";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};


	function editItem(){
		//Grab data from our item from Local Storage.
		var value = localStorage.getItem(this.key);	//this.key = editItem.key, you can use this because this function is tied to the editLink item
		var item = JSON.parse(value)  //value is = to value of this.key, which is a string

		//show the form
		toggleControls("off");

		//populate the form fields with current localStorage values.
		$("list").value 			= item.purchaseType[1];	//index[1] is the value of our items
		$("workOrder").value 		= item.workOrder[1];
		$("supportSite").value 		= item.supportSite[1];
		$("list").value 			= item.itemType[1];
		var radios = document.forms[0].asset;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Yes" && item.asset[1] == "Yes"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "No" && item.asset[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			};
		};
		$("manufacturer").value 	= item.manufacturer[1];
		$("partNumber").value 		= item.partNumber[1];
		$("qty").value 				= item.qty[1];
		$("urgency").value 			= item.urgency[1];
		if(item.mgmtApproval[1] == "Yes"){
			$("mgmtApproval").setAttribute("checked", "checked");
		};
		if(item.rrRequest[1] == "Yes"){
			$("rrRequest").setAttribute("checked", "checked");
		};
		$("dateRequired").value 	= item.dateRequired[1];
		$("completionDate").value 	= item.completionDate[1];
		$("notes").value 			= item.notes[1];

		//Remove the initial listener from the input "save contact" button.
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Button
		$("submit").value = "Edit Task";
		var editSubmit = $("submit");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	};


	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		} else {
			localStorage.clear();
				alert("All contacts are deleted!");
				window.location.reload();
				return false;
		};
	};

	function validate(e){		//e = event data
		//Define the elements that we want to check
		//var getList = $("list");
		var getWorkOrder = $("workOrder");
		var getSupportSite = $("supportSite");
		var getdateRequired =  $("dateRequired");

		//Get Error Messages
		var messageAray = [];
		//Group Validation
		// if(getList.value=="--Choose A Type"){
		// 	var listError = "Please choose a type";
		// 	getList.style.border = "1px solid red";
		// 	messageArray.push(listError);
		// };

		//Work Order Validation
		if(getworkOrder.value ==="") {
			var workOrderError = "Please enter Work Order";
			getworkOrder.style.border = "1px solid red";
			messageArray.push(workOrderError);
		};

		//Support Site Validation
		if(getsupportSite.value ==="") {
			var supportSiteError = "Please enter Support Site";
			getsupportSite.style.border = "1px solid red";
			messageArray.push(supportSiteError);
		};

		//Date Required Validation
		if(getdateRequired.value ==="") {
			var dateRequiredError = "Please enter Date Required";
			getdateRequired.style.border = "1px solid red";
			messageArray.push(dateRequiredError);
		};

		// email Validation
		// var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		// if(!re.exec(getEmail.value))){
		// 	var emailError = "Please enter valid email address.";
		// 	getEmail.style.border = "1px solid red";
		// 	messageArray.push(emailError);
		// };

		//If there were errors, display them on the screen.
		if(messageArray.length >= 1){
			for(var i=0, j = messageArray.length; i<j; i++){
				var text = document.createEleent("li");
				text.innerHTML = messageArray[i];
				errorMsg.appendChild(text);
			};
		};
		e.preventDefault();
		return false;
	};

	//Variable defaults
	var purchaseTypeOptions = ["--Select A Type--", "Maintenance", "Product"];
	createList("purchaseType", purchaseTypeOptions);
	var itemTypeOptions = ["--Select A Type--", "Hardware", "Software", "Support Contract"];
	createList("itemType", itemTypeOptions);
	var assetValue;
	var value;
	errorMsg = $("errors");
	

	// Set Link & Submit Click Events
	 var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", validate);
});














































/*JavaScript: Save Data

Now let's make our form actually do something. Let's have it save data submitted through 
your form into Local Storage.

Requirements

Use an external .js file
Write a saveData function that saves all data input into the form into Local Storage.
This means the values for your input, select, radio or checkboxes etc.
You should also save a key(random number) for your values(array or object). Each 
saved entry will be a key:value pair.
The key should be a random number which will create a unique id.
The value should be an array or object that contains all the values of your form 
field data.
This allows for our form to save multiple submissions into Local Storage without 
overwriting data.
Remember you can test your local storage by using the Web Inspector

JavaScript: Get Data

So now that we have items saved into Local Storage. But that's not really useful to our 
user's since they can't see what they saved. That means we need to list out our saved data 
onto the screen.

Requirements

Once data has been submitted through the form, we can grab the data submitted from 
Local Storage. List out your saved data from Local Storage on the additem.html document using 
the Display Data link you created. Make sure you hide the form when you display your data on 
screen as shown in the example screenshots. You can use these the following screenshots as a 
guideline. Your project's screen will vary from this example based on your topic.
 Form filled out before submission.
 Form has been submitted, form is now hidden, and data is displayed.

JavaScript: Clear Data

Now that data is stored in local storage, we need a way to delete the data.

Requirements

Create a function that removes all data from local storage.
Be sure to create a clear data link or button in your app that runs the function 
that removes all data.

JavaScript: Array Function

Write an array function(s) that populates at least one select form element. 
This probably will be for your categories but you may have more select fields for other things 
depending on the topic you chose. This will REPLACE your static HTML select element(s) so that 
you can see an alterative way to create HTML elements. */




