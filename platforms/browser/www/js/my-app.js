// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
	
	$(document).ready(function (){
        console.log("jquery ready");
    });	
});

function capturePhoto(){
	console.log("test");
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });
}

function onSuccess(imageData) {
	console.log(imageData);
	$("#imgready").html("<img style='width:100px;height:100px' src='"+imageData+"'>")
	//image.src = "data:image/jpeg;base64," + imageData;
}
function onFail(message) {
	alert('Failed because: ' + message);
}



// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	console.log("prabayar");
    if (page.name === 'prabayar') {
        $("#photobutton").click(capturePhoto);
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    
})