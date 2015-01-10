$(document).ready(function() {

loadMenus();
hideModules();
connectMenuToModules();
updatePointTotals();

/*loadSubmitPoints();
loadPastWork();
loadOtherBrothers();
loadChapterStats();
loadAbout();

To be implemented. Some of these functions will make calls to the JSON database
which I need help with!

They will assemble an HTML string to be inserted in the div with the appropriate
class name.

*/


/*Here are the functions called to enable the menu.*/

function hideModules() {
	$(".siteMenu div").each(function() {
		var name = findModuleName(this);
		$(".siteModule" + name).not(".activeModule").css("display","none");
	})
}

function loadMenus() {
	loadMenu("loggedOut");
	loadMenu("loggedIn");
}

function loadMenu(menuType) {

	/*Select all DOM elements with class siteModule and 
	class menuType (loggedOut or loggedIn) that are NOT
	the menu itself.

	The point of this is that the menu automatically updates
	when we add new modules to the site.
	*/

	//for each site module marked for inclusion in the menu,
	//but not including the menu itself.
	$(".siteModule." + menuType).not(".siteMenu").each(function() {
		
		//grabs the module titlce from the child div with class 'title'
		var moduleTitle = $(this).find(".title").html();

		//creates a new div inside the appropriate menu div
		var moduleClass = $(this).attr("class").split(" ")[0];

		//adds div to menu
		
		//If this module is marked as active to start
		if($(this).attr("class").indexOf("activeModule") >-1) {
			$(".siteMenu." + menuType).append(
			"<div class = \"" + moduleClass + " highlightedMenuItem\">"
			+ moduleTitle + "</div>");
		}

		//regular module
		else {
			$(".siteMenu." + menuType).append(
			"<div class = \"" + moduleClass + "\">"
			+ moduleTitle + "</div>");
		}
	})
}

function connectMenuToModules() {
	
	//loops through each div in menu and binds to module of same class.
	$(".siteMenu div").click(function(event) {		
		

		/*uses the class name of each div element in the menu
		to connect the action of clicking the menu item
		to making the module with the same class visible.*/
		
		//"this" is current div in loop
		var name = findModuleName(this); 

		//keeps active modules visible if ctrl key is held during click.
		deactivateModule(name, event);
		unhighlightMenuItem(name, event);
		
		activateModule(name, event);
		highlightMenuItem(name, event);
	});
}

function findModuleName(thisLink) {
	/*grabs the first class name from "this" menu div*/
	return "." + $(thisLink).attr('class').split(' ')[0];
}

//hides current "activeModule"
function deactivateModule(name, event) {
	
	if(event.ctrlKey) return;
	//checks to see if module is already active
	if ($(".activeModule").not(name).length > 0) {
	$('.activeModule').not(name)
	.removeClass('activeModule').slideUp(400);
	}
}

function activateModule(name, event){
	//finds div with classes ".siteModule" AND name

	if ($(".siteModule" + name).attr("class")
		.indexOf("activeModule") == -1) {
		
		$(".siteModule" + name).slideDown(400)
		.addClass('activeModule');
	}
	else if (event.ctrlKey && 
		$(".siteModule.activeModule").not(name).length > 0) {
		$(".siteModule" + name).slideUp(400)
		.removeClass('activeModule');
	}
}

function unhighlightMenuItem(name, event) {
	if(!event.ctrlKey) {
		$('.siteMenu div').not(name).removeClass('highlightedMenuItem');
	}
}	

function highlightMenuItem(name, event){
	//finds div with class name inside siteMenu div
	if(event.ctrlKey && 
		$(".siteModule.activeModule").not(name).length > 0) {
		$(".siteMenu").find(name)
		.toggleClass('highlightedMenuItem');
	}

	else {
		$(".siteMenu").find(name)
		.addClass('highlightedMenuItem');
	}
}



/*-----------------------------------*/

function toggleMenu() {

}

/*Imported functions from Aidan*/

function tts(level, name, todo, payload) {	

	if (payload === undefined) {
			var address = get_url(level, name);
			var request = new XMLHttpRequest();
		    request.open("GET", address);
			request.send();
			request.onreadystatechange = todo;
		} else {
			var address = get_url(level);
			$.ajax({ url: address,
		  	data: JSON.stringify(payload),
		  	type: "POST",
		  	contentType: "application/json"});
		}
}

function updatePointTotals() {
	tts("SIGMA", "SIGMA", function() {
		if (this.readyState == 4) {
				$(".sigmaPoints").html($.parseJSON(this.response)["points"]);
			}
		});
	tts("PHI", "PHI", function() {
		if (this.readyState == 4) {
				$(".phiPoints").html($.parseJSON(this.response)["points"]);
			}
		});
	tts("EPSILON", "EPSILON", function() {
		if (this.readyState == 4) {
				$(".epsilonPoints").html($.parseJSON(this.response)["points"]);
			}
		});
	tts("BROTHERMENTOR", "BROTHERMENTOR", function() {
		if (this.readyState == 4) {
				$(".brotherMentorPoints").html($.parseJSON(this.response)["points"]);
			}
		});
	//$(gebi("bmp")).append($.parseJSON(tts("BrotherMentor", "BrotherMentor").response)["points"]); (Haven't implemented BM)
}
});