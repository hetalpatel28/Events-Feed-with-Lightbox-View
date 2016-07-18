	// code for modal popup
	var modal = document.getElementById('popupModal');	
	// to close the modal
	var closeModal = document.getElementById("closeModal");
	closeModal.onclick = function() {
	    modal.style.display = "none";
	};
	// to close modal when click anywhere outside of the modal
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	};
	//open modal
	var openModal = function() {
	    modal.style.display = "block";
	};
	
	//get data (read file) using ajax call	
    function readFile(fileUrl, callback) {
    	var xhr = new XMLHttpRequest();
    	xhr.overrideMimeType("application/json");
    	xhr.open("GET", fileUrl, true);
    	xhr.onreadystatechange = function() {
        	if (xhr.readyState === 4 && xhr.status == "200") {
            	callback(xhr.responseText);
        	}
    	};
    	xhr.send(null);
	}
	
	//set more detail for each event to popup when bind onclick
	function setMoreEventDetail(eventItem){
		var rsvp ='';
		if(eventItem.rsvp != 'N/A'){
			rsvp = '<div class="event-item-rsvp"><a target="_blank" href="' + eventItem.rsvp + '"> click here to RSVP </a></div>'; 
		}
		var moreDetail= '<div class="event-item"><div class="detail-event-box"><div class="event-item-storename">' + eventItem.storename + 
			' Celebrates Hispanic Heritage month on</div><div class="event-item-wrap"><div class="event-item-month">' + 
			eventItem.month +'</div><div class="event-item-date">'+ eventItem.day +
			'</div><div class="event-item-time">'+ eventItem.time +'</div></div>' + 
			'<div class="event-item-address">' + eventItem.storename +'</div>' +
			'<div class="event-item-floor">' + eventItem.floor +'</div>' +
			'<div class="event-item-street">' + eventItem.street + ', ' + eventItem.zip +'</div>' +
			'<div class="event-item-address">' + eventItem.city + ', ' + eventItem.state +'</div>' +			
			'<div class="event-item-desc">'+ eventItem.desc +'</div>' + rsvp +'</div></div>';
    		
		document.getElementById('modalBody').innerHTML = moreDetail;
		openModal();
	}
	//call back for closure
	function getEventCallback(eventItem) {
	  return function() {
			setMoreEventDetail(eventItem);
	  };
	}
	
	function getDetail(btn){
	//	console.log(btn.id);
	//	console.log(jsonPath(hispanicEvents, "$..[?(@.entry_id == " + btn.id + ")]"));	
		var a =(jsonPath(hispanicEvents, "$..[?(@.entry_id == " + btn.id + ")]"))[0];
		setMoreEventDetail(a);
	}
	
	//show event on page
	function showEvents(hispanicEvents){
		
		for(var i=0; i < hispanicEvents.length; i++){	 		
    		var eventItem = '<div class="event-item"><div class="event-box">' + 
    			'<div class="event-item-wrap"><div class="event-item-month">' + hispanicEvents[i].month +'</div><div class="event-item-date">'+ hispanicEvents[i].day +'</div><div class="event-item-time">'+ hispanicEvents[i].time +'</div></div>' +
    			'<div class="event-item-storename">' + hispanicEvents[i].storename + '</div>' +		
    			'<div class="event-item-address">' + hispanicEvents[i].city + ', ' + hispanicEvents[i].state +'</div>' +
    			'<button onclick="getDetail(this);" class="app-button" id="'+ hispanicEvents[i].entry_id +'">see more details</button>' +
    			'</div></div>';			
    		document.getElementById('event-list').innerHTML += eventItem;    		
    		//document.getElementById(hispanicEvents[i].entry_id).onclick = getEventCallback(hispanicEvents[i]);
    	}    	
    }
	var hispanicEvents;
	window.onload = function() {
		//var fileUrl = "http://d345h07ts0fu2m.cloudfront.net/379/data48.json";
		//because of cross domain issue reading file which stored in same domain from above url
		var fileUrl = "data/data48.json";	
		
		//call to read file and parse it
		readFile(fileUrl, function(text){
	    	//var data = JSON.parse(text); 
	    	var data = JSON.parse(JSON.stringify(text));
	    	data = data.replace("cmsCallback(", ""); 
	    	data = data.substring(0, data.length - 2);
	    	var cms = JSON.parse(data);    	

	    	//get all the events for 2015
	     	//hispanicEvents = jsonPath(cms, "$..EnglishEvents2015.entries[*]");
	    	
	    	//get all the Hispanic Heritage Month events (hispanic) for 2015
	    	hispanicEvents = jsonPath(cms, "$..EnglishEvents2015.entries[?(@.desc.includes('hispanic'))]");

	    	showEvents(hispanicEvents);

		});
	};
		


	





