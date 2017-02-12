// Initialize app
var myApp = new Framework7();

var uuidUsed = "";
var loadFromFile = false;
var dataSaved = [];


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
		dataSaved = localStorage.dataSaved;
    });	
});

function capturePhoto(){
	console.log("test");
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });
}

function onSuccess(imageData) {
	console.log(imageData);
	$("#imgready").html("<img id='imgupload' height='100%' src='"+imageData+"'>")
	//image.src = "data:image/jpeg;base64," + imageData;
}
function onFail(message) {
	alert('Failed because: ' + message);
}
function sendDataProblem(type){
	var imgUri = $("#imgupload").attr("src");
	var options = new FileUploadOptions();
	var ext = imgUri.split(".").pop();
	options.fileKey = "file";
	options.fileName = type+"_"+uuidUsed+"."+ext;
	options.mimeType = "text/plain";
	var params = getDataProblem(type);
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(imgUri, encodeURI("http://gamerspace.us/index.php/c_gangguan/upload_img"), win, fail, options);
}
function saveDataProblem(type){
	var params = getDataProblem(type);
	var imgUri = $("#imgupload").attr("src");
	var data = {
		params:params,
		imgUri:imgUri
	};
	dataSaved.push(data);
	localStorage.dataSaved = dataSaved;
}
function loadFromFile(){
	for(var i=0;i<dataSaved.length;i++){
		if(dataSaved[i].params.uuid==uuidUsed){
			var obj = dataSaved[i].params;
			$("input[name='id_pelanggan']").val(obj.id_pelanggan);
			$("input[name='nama']").val(obj.nama);
			$("input[name='alamat']").val(obj.alamat);
			$("input[name='daya']").val(obj.daya);
			$("input[name='no_meter']").val(obj.no_meter);
			$("input[name='merk_meter']").val(obj.merk_meter);
			$("input[name='tanggal_rusak']").val(obj.tanggal_rusak);
			$("input[name='jenis_kerusakan']").val(obj.jenis_kerusakan);
			$("input[name='keterangan']").val(obj.keterangan);
			break;
		}
	}
	$("#imgupload").attr("src",dataSaved[i].imgUri);
}

function getDataProblem(type){
	var obj = new Object();
	obj.id = uuidUsed;
	obj.pra_pasca = type;
	obj.id_pelanggan = $("input[name='id_pelanggan']").val();
	obj.nama = $("input[name='nama']").val();
	obj.alamat = $("input[name='alamat']").val();
	obj.daya = $("input[name='daya']").val();
	obj.no_meter = $("input[name='no_meter']").val();
	obj.merk_meter = $("input[name='merk_meter']").val();
	obj.tanggal_rusak = $("input[name='tanggal_rusak']").val();
	obj.jenis_kerusakan = $("select[name='jenis_kerusakan']").val();
	obj.keterangan = $("input[name='keterangan']").val();
	return obj;
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function win(r){
	console.log(r);
}
function fail(e){
	console.log(e);
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
	if(page.name === 'index'){
		loadFromFile = false;
	}
    if (page.name === 'prabayar') {
		if(!loadFromFile){
			uuidUsed = generateUUID();
		}else{
			uuidUsed = page.query.id;
			loadFromFile();
		}
        $("#imgready").click(capturePhoto);
		$("#kirim").click(function(){
			sendDataProblem("prabayar");
		});
		$("#simpan").click(function(){
			saveDataProblem("prabayar")
		});
    }
	if (page.name === 'pascabayar') {
		if(!loadFromFile){
			uuidUsed = generateUUID();
		}else{
			uuidUsed = page.query.id;
			loadFromFile();
		}
        $("#imgready").click(capturePhoto);
		$("#kirim").click(function(){
			sendDataProblem("pascabayar");
		});
		$("#simpan").click(function(){
			saveDataProblem("pascabayar")
		});
    }
	if(page.name === 'tersimpan'){
		loadFromFile = true;
		for(var i=0;i<dataSaved.length;i++){
			$("#saved").append("<a href='"+dataSaved[i].params.pra_pasca+".html?id="+dataSaved[i].params.id+"'><li class='item-content' id='"+dataSaved[i].params.id+"'>"+dataSaved[i].params.id_pelanggan+"</li>");
		}
	}
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    
})