$(document).ready(function() {

enableMenuLinks();
/*loadSubmitPoints();
loadPastWork();
loadOtherBrothers();
loadChapterStats();
loadAbout();*/


/*Here are the functions called to enable the menu.*/

function enableMenuLinks() {
	bindLinkToModule("submitPoints");
	bindLinkToModule("pastWork");
	bindLinkToModule("brothersPoints");
	bindLinkToModule("chapterStats");
	bindLinkToModule("about");
		}

function bindLinkToModule(moduleName) {
	$(".siteMenu").find("." + moduleName).bind("click", function(){
	removeActiveModule();
	activateModule(moduleName);
	unhighlightMenuItem();
	highlightModuleLink(moduleName);
			});
	};

function removeActiveModule() {
	$('.activeModule').css("display", "none").removeClass('activeModule');
	}

function activateModule(moduleName){
	$(".siteModule." + moduleName).css("display","block").addClass('activeModule');
	}

function unhighlightMenuItem() {
	$('.siteMenu div').removeClass('highlightedMenuItem');
	}	

function highlightModuleLink(moduleName){
	$(".siteMenu").find("." + moduleName).addClass('highlightedMenuItem');
	}


/*Here are the functions called to load the modules.*/

function loadSubmitPoints() {


}




		});
