//Angela Koepplinger
//Visual Frameworks: Term 1209
// Project 2: Web App Part 2
//Date: 09/08/12


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
			item.dateRequired 		= ["Date Required:", $("requiredByDate").value];
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
				};
			};	
		};
		document.body.appendChild(makeDiv);
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

	//Variable defaults
	var purchaseTypeOptions = ["--Select A Type--", "Maintenance", "Product"];
	createList("purchaseType", purchaseTypeOptions);
	var itemTypeOptions = ["--Select A Type--", "Hardware", "Software", "Support Contract"];
	createList("itemType", itemTypeOptions);
	var assetValue;
	var value;
	

	// Set Link & Submit Click Events
	 var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
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




