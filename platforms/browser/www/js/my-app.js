// Initialize app
var myApp = new Framework7();

var uuidUsed = "";
var loadFromFile = false;
var dataSaved = [];
var dataDownloaded = [];
var dataDownloadedGantimeter = [];
var dataSavedTindakan = [];
var dataSavedGantimeter = [];
var imgAct="gangguan";

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
	
	//if (typeof FCMPlugin != 'undefined') {
	//	FCMPlugin.onTokenRefresh(function(token){
	//		console.log(token);
	//	});
	//	FCMPlugin.onNotification(function(data){
	//		console.log(data);
	//	});
	//}
	
	$(document).ready(function (){
        console.log("jquery ready");
		if(localStorage.dataSaved!==undefined)
			dataSaved = JSON.parse(localStorage.dataSaved);
		if(localStorage.dataSavedTindakan!==undefined)
			dataSavedTindakan = JSON.parse(localStorage.dataSavedTindakan);
		if(localStorage.dataSavedGantimeter!==undefined)
			dataSavedGantimeter = JSON.parse(localStorage.dataSavedGantimeter);
		
		
		$("#login").click(function(){
			console.log("do login");
			doLogin();
		});
		$("#_logout").click(function(){
			localStorage.dataLogin = null;
			window.location = "index.html";
			
		});
		
		if(localStorage.dataLogin!==undefined){
			$("#_username").html((JSON.parse(localStorage.dataLogin))[0].username);
			if((JSON.parse(localStorage.dataLogin))[0].role==="pl"){
				$("#hide_pl").hide();
			};
		}
		
    });	
});

function capturePhoto(type){
	imgAct=type;
	console.log("test");
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });
}

function onSuccess(imageData) {
	console.log(imageData);
	if(imgAct==="gangguan")
		$("#imgready").html("<img id='imgupload' width='100%' src='"+imageData+"'>");
	
	if(imgAct==="tindakan")
		$("#imgready2").html("<img id='imgupload2' width='100%' src='"+imageData+"'>");
	
}
function onFail(message) {
	alert('Failed because: ' + message);
}
function sendDataProblem(type){
	
	myApp.popup('.popup-loading');
	
	//saving
	
	var params = getDataProblem(type);
	var imgUri = $("#imgupload").attr("src");
	var data = {
		params:params,
		imgUri:imgUri
	};
	dataSaved.push(data);
	localStorage.dataSaved = JSON.stringify(dataSaved);
	
	//end saving
	
	
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
function sendDataTindakan(){
	myApp.popup('.popup-loading');
	
	//saving
	
	var params = getDataTindakan();
	var imgUri = $("#imgupload").attr("src");
	var data = {
		params:params,
		imgUri:imgUri
	};
	dataSavedTindakan.push(data);
	localStorage.dataSavedTindakan = JSON.stringify(dataSavedTindakan);
	myApp.closeModal(".popup-loading");
	
	//
	
	var imgUri = $("#imgupload2").attr("src");
	var options = new FileUploadOptions();
	var ext = imgUri.split(".").pop();
	options.fileKey = "file";
	options.fileName = "tindakan_"+uuidUsed+"."+ext;
	options.mimeType = "text/plain";
	var params = getDataTindakan();
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(imgUri, encodeURI("http://gamerspace.us/index.php/c_tindakan/upload_img"), win, fail, options);
}
function saveDataProblem(type){
	myApp.popup('.popup-loading');
	var params = getDataProblem(type);
	var imgUri = $("#imgupload").attr("src");
	var data = {
		params:params,
		imgUri:imgUri
	};
	dataSaved.push(data);
	localStorage.dataSaved = JSON.stringify(dataSaved);
	myApp.closeModal(".popup-loading");
	alert("sukses tersimpan");
}
function saveDataGantimeter(){
	myApp.popup('.popup-loading');
	var params = getDataGantimeter();
	var imgUri = $("#imgupload").attr("src");
	var imgUri2 = $("#imgupload2").attr("src");
	var data = {
		params:params,
		imgUri:imgUri,
		imgUri2:imgUri2
	};
	dataSavedGantimeter.push(data);
	localStorage.dataSavedGantimeter = JSON.stringify(dataSavedGantimeter);
	myApp.closeModal(".popup-loading");
	alert("sukses tersimpan");
}
function sendDataGantimeter(){
	myApp.popup('.popup-loading');
	
	//saving
	
	var params = getDataGantimeter();
	var imgUri = $("#imgupload").attr("src");
	var imgUri2 = $("#imgupload2").attr("src");
	var data = {
		params:params,
		imgUri:imgUri,
		imgUri2:imgUri2
	};
	dataSavedGantimeter.push(data);
	localStorage.dataSavedGantimeter = JSON.stringify(dataSavedGantimeter);
	
	//
	
	var imgUri = $("#imgupload").attr("src");
	var options = new FileUploadOptions();
	var ext = imgUri.split(".").pop();
	options.fileKey = "file";
	options.fileName = "gantimeter1_"+uuidUsed+"."+ext;
	options.mimeType = "text/plain";
	var params = getDataGantimeter();
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(imgUri, encodeURI("http://gamerspace.us/index.php/c_penggantian/upload_img"), uploadFoto2, fail, options);
}
function uploadFoto2(){
	myApp.popup('.popup-loading');
	var imgUri = $("#imgupload2").attr("src");
	var options = new FileUploadOptions();
	var ext = imgUri.split(".").pop();
	options.fileKey = "file";
	options.fileName = "gantimeter2_"+uuidUsed+"."+ext;
	options.mimeType = "text/plain";
	var params = {};
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(imgUri, encodeURI("http://gamerspace.us/index.php/c_penggantian/upload_img2"), win, fail, options);
}
function saveDataTindakan(){
	myApp.popup('.popup-loading');
	var params = getDataTindakan();
	var imgUri = $("#imgupload").attr("src");
	var data = {
		params:params,
		imgUri:imgUri
	};
	dataSavedTindakan.push(data);
	localStorage.dataSavedTindakan = JSON.stringify(dataSavedTindakan);
	myApp.closeModal(".popup-loading");
	alert("sukses tersimpan");
}

function loadDataFromFile(){
	for(var i=0;i<dataSaved.length;i++){
		if(dataSaved[i].params.id===uuidUsed){
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
			$("#imgready").html("<img id='imgupload' width='100%' src='"+dataSaved[i].imgUri+"'>");
			break;
		}
	}
	
}
function getDataTindakan(){
	var obj = new Object();
	obj.id = uuidUsed;
	obj.tindakan = $("select[name='tindakan']").val();
	return obj;
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
function getDataGantimeter(){
	var obj = new Object();
	obj.id = uuidUsed;
	obj.id_pelanggan = $("input[name='id_pelanggan']").val();
	obj.nama = $("input[name='nama']").val();
	obj.alamat = $("input[name='alamat']").val();
	obj.daya = $("input[name='daya']").val();
	obj.no_meter_lama = $("input[name='no_meter_lama']").val();
	obj.no_meter_baru = $("input[name='no_meter_baru']").val();
	obj.merk_meter_lama = $("input[name='merk_meter_lama']").val();
	obj.merk_meter_baru = $("input[name='merk_meter_baru']").val();
	obj.tanggal_ganti = $("input[name='tanggal_ganti']").val();
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
	myApp.closeModal(".popup-loading");
	alert("sukses terkirim");
}
function fail(e){
	console.log(e);
	myApp.closeModal(".popup-loading");
	alert("gagal terkirim");
}

function downloadData(){
	myApp.popup('.popup-loading');
	var datemin = $("input[name='datemin']").val();
	var datemax = $("input[name='datemax']").val();
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_gangguan/get_gangguan_download/"+datemin+"/"+datemax, function() {
		
	})
	.done(function(data) {
		dataDownloaded = data;
		myApp.closeModal(".popup-loading");
		$("#downloaded").html("");
		for(var i=0;i<data.length;i++){
			$("#downloaded").append("<a href='resume.html?id="+data[i].id+"&type=gangguan'><li class='item-content' id='"+data[i].id+"'>"+data[i].id_pelanggan+"</li>");
		}
	})
	.fail(function() {
		alert( "error" );
	})
}
function e_downloadData(){
	myApp.popup('.popup-loading');
	var datemin = $("input[name='e_datemin']").val();
	var datemax = $("input[name='e_datemax']").val();
	window.open("http://gamerspace.us/index.php/c_gangguan/get_gangguan_download_csv/"+datemin+"/"+datemax,"_self");
	myApp.closeModal(".popup-loading");
}
function e_downloadDataGantimeter(){
	myApp.popup('.popup-loading');
	var datemin = $("input[name='datemin2']").val();
	var datemax = $("input[name='datemax2']").val();
	window.open("http://gamerspace.us/index.php/c_gangguan/get_penggantian_download_csv/"+datemin+"/"+datemax,"_self");
	myApp.closeModal(".popup-loading");
}
function downloadDataGantimeter(){
	myApp.popup('.popup-loading');
	var datemin = $("input[name='datemin2']").val();
	var datemax = $("input[name='datemax2']").val();
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_penggantian/get_penggantian_download/"+datemin+"/"+datemax, function() {
		
	})
	.done(function(data) {
		dataDownloadedGantimeter = data;
		myApp.closeModal(".popup-loading");
		$("#downloaded2").html("");
		for(var i=0;i<data.length;i++){
			$("#downloaded2").append("<a href='resume.html?id="+data[i].id+"&type=gantimeter'><li class='item-content' id='"+data[i].id+"'>"+data[i].id_pelanggan+"</li>");
		}
	})
	.fail(function() {
		alert( "error" );
	})
}
function doLogin(){
	var _username = $("input[name='username']").val();
	var _password = $("input[name='password']").val();
	var jqxhr = $.post( "http://gamerspace.us/index.php/c_login/login/",{ username:_username, password: _password }, function() {
		
	})
	.done(function(data) {
		
		if(data.error!==undefined){
			alert("wrong username or password");
		}else{
			localStorage.dataLogin = JSON.stringify(data);
			window.location = "index2.html";
		}
	})
	.fail(function() {
		alert( "network error" );
	})
}

function previewSendCt(){
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_gangguan/get_gangguan_by_id/"+uuidUsed, function() {
		
	})
	.done(function(data) {
		console.log(data);
		
		var obj = data[0];
		if(obj.tindakan===null)obj.tindakan="";
			var str = ""
			+"tipe = "+obj.pra_pasca
			+"<br/>id_pelanggan =   "+obj.id_pelanggan
			+"<br/>nama = "+obj.nama
			+"<br/>alamat = "+obj.alamat
			+"<br/>daya = "+obj.daya
			+"<br/>no_meter = "+obj.no_meter
			+"<br/>merk_meter = "+obj.merk_meter
			+"<br/>tanggal_rusak = "+obj.tanggal_rusak
			+"<br/>jenis_kerusakan = "+obj.jenis_kerusakan
			+"<br/>keterangan = "+obj.keterangan
			+"<br/>tindakan = "+obj.tindakan
			+"<div class='row'>"
			+"<div id='img_problem' class='col-50 center'>"
			+"<p>problem</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/"+obj.pra_pasca+"_"+obj.id+".jpg'>"
			+"</div>"
			+"<div id='img_tindakan' class='col-50 center'>"
			+"<p>solved</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/tindakan_"+obj.id+".jpg'>"
			+"</div>"
			+"</div>"
			$("#itemdetail").html(str);
	})
	.fail(function() {
		alert( "network error" );
	});
}
function previewData(id){
	uuidUsed = id;
	for(var i=0;i<dataDownloaded.length;i++){
		if(dataDownloaded[i].id===id){
			var obj = dataDownloaded[i];
			if(obj.tindakan===null)obj.tindakan="";
			var str = ""
			+"tipe = "+obj.pra_pasca
			+"<br/>id_pelanggan =   "+obj.id_pelanggan
			+"<br/>nama = "+obj.nama
			+"<br/>alamat = "+obj.alamat
			+"<br/>daya = "+obj.daya
			+"<br/>no_meter = "+obj.no_meter
			+"<br/>merk_meter = "+obj.merk_meter
			+"<br/>tanggal_rusak = "+obj.tanggal_rusak
			+"<br/>jenis_kerusakan = "+obj.jenis_kerusakan
			+"<br/>keterangan = "+obj.keterangan
			+"<br/>tindakan = "+obj.tindakan
			+"<div class='row'>"
			+"<div id='img_problem' class='col-50 center'>"
			+"<p>problem</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/"+obj.pra_pasca+"_"+obj.id+".jpg'>"
			+"</div>"
			+"<div id='img_tindakan' class='col-50 center'>"
			+"<p>solved</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/tindakan_"+obj.id+".jpg'>"
			+"</div>"
			+"</div>"
			$("#itemdetail").html(str);
			break;
		}
	}
}

function previewDataGantimeter(id){
	for(var i=0;i<dataDownloadedGantimeter.length;i++){
		if(dataDownloadedGantimeter[i].id===id){
			var obj = dataDownloadedGantimeter[i];
			var str = ""
			+"<br/>id_pelanggan =   "+obj.id_pelanggan
			+"<br/>nama = "+obj.nama
			+"<br/>alamat = "+obj.alamat
			+"<br/>daya = "+obj.daya
			+"<br/>no_meter_lama = "+obj.no_meter_lama
			+"<br/>no_meter_baru = "+obj.no_meter_baru
			+"<br/>merk_meter_lama = "+obj.merk_meter_lama
			+"<br/>merk_meter_baru = "+obj.merk_meter_baru
			+"<br/>tanggal_ganti = "+obj.tanggal_ganti
			+"<br/>jenis_kerusakan = "+obj.jenis_kerusakan
			+"<br/>keterangan = "+obj.keterangan
			+"<div class='row'>"
			+"<div id='img_problem' class='col-50 center'>"
			+"<p>sebelum</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/gantimeter1_"+obj.id+".jpg'>"
			+"</div>"
			+"<div id='img_tindakan' class='col-50 center'>"
			+"<p>sesudah</p>"
			+"<img style='width:100%' src='http://www.gamerspace.us/img/gantimeter2_"+obj.id+".jpg'>"
			+"</div>"
			+"</div>"
			$("#itemdetail").html(str);
			break;
		}
	}
}

function loadCt(){
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_ct/get_ct_by_id/"+uuidUsed, function() {
		
	})
	.done(function(data) {
		$("#ct_text").html(data[0].ct_code);
	})
	.fail(function() {
		alert( "network error" );
	});
}
function sendCt(){
	var _id = uuidUsed;
	var _ct = $("input[name='ct_code']").val();
	var data = { id:_id, ct_code: _ct };
	console.log(data);
	var jqxhr = $.post( "http://gamerspace.us/index.php/c_ct/insert_ct/",data, function() {
		
	})
	.done(function(data) {
		console.log(data);
		alert("ct send");
	})
	.fail(function() {
		alert( "network error" );
	})
}

function loadNeedCt(){
	console.log("load need ct begin");
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_ct/need_ct_list/", function() {
		
	})
	.done(function(data) {
		console.log("load need ct done");
		$("#needctlist").html("");
		for(var i=0;i<data.length;i++){
			$("#needctlist").append("<a href='sendct.html?id="+data[i].id+"'><li class='item-content' id='"+data[i].id+"'>need ct | id.pel : "+data[i].id_pelanggan+"</li>");
		}
	})
	.fail(function() {
		alert( "network error" );
	});
}

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('login', function (page) {
	console.log("login page");
})
myApp.onPageInit('index', function (page) {
	console.log("index page");
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageBeforeAnimation', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	console.log(page);
	
	if(page.name === 'index'){
		loadFromFile = false;
		console.log("index nih");
		if((JSON.parse(localStorage.dataLogin))[0].role==="pl"){
			$("#hide_pl").hide();
		};
	}
    if (page.name === 'prabayar') {
		if(!loadFromFile){
			uuidUsed = generateUUID();
		}else{
			uuidUsed = page.query.id;
			loadDataFromFile();
		}
        $("#imgready").click(function(){
			capturePhoto("gangguan");
		});
		$("#kirim").click(function(){
			sendDataProblem("prabayar");
		});
		$("#simpan").click(function(){
			saveDataProblem("prabayar")
		});
		
		loadCt();
    }
	if (page.name === 'pascabayar') {
		if(!loadFromFile){
			uuidUsed = generateUUID();
		}else{
			uuidUsed = page.query.id;
			loadDataFromFile();
		}
        $("#imgready").click(function(){
			capturePhoto("gangguan");
		});
		$("#kirim").click(function(){
			sendDataProblem("pascabayar");
		});
		$("#simpan").click(function(){
			saveDataProblem("pascabayar")
		});
		
		loadCt();
		
    }
	if(page.name === 'tersimpan'){
		loadFromFile = true;
		$("#saved").html("");
		for(var i=0;i<dataSaved.length;i++){
			$("#saved").append("<a href='"+dataSaved[i].params.pra_pasca+".html?id="+dataSaved[i].params.id+"'><li class='item-content' id='"+dataSaved[i].params.id+"'>"+dataSaved[i].params.id_pelanggan+"</li>");
		}
		$("#saved-gantimeter").html("");
		for(var i=0;i<dataSavedGantimeter.length;i++){
			$("#saved-gantimeter").append("<a href='gantimeter.html?id="+dataSavedGantimeter[i].params.id+"'><li class='item-content' id='"+dataSavedGantimeter[i].params.id+"'>"+dataSavedGantimeter[i].params.id_pelanggan+"</li>");
		}
	}
	if(page.name === 'tindakan'){
		
		$("#imgready2").click(function(){
			capturePhoto("tindakan");
		});
		
		$("#simpan2").click(function(){
			saveDataTindakan();
		});
		$("#kirim2").click(function(){
			sendDataTindakan();
		});
	}
	if(page.name === 'download'){
		$("#download").click(function(){
			downloadData();
		});
		$("#download2").click(function(){
			downloadDataGantimeter();
		});
	}
	if(page.name === 'download_excel'){
		$("#e_download").click(function(){
			e_downloadData();
		});
		$("#e_download2").click(function(){
			e_downloadDataGantimeter();
		});
	}
	if(page.name === 'resume'){
		uuidUsed = page.query.id;
		if(page.query.type==="gantimeter")
			previewDataGantimeter(uuidUsed);
		else
			previewData(uuidUsed);
	}
	if (page.name === 'gantimeter') {
		if(!loadFromFile){
			uuidUsed = generateUUID();
		}else{
			uuidUsed = page.query.id;
			loadDataFromFile();
		}
        $("#imgready").click(function(){
			capturePhoto("gangguan");
		});
		$("#imgready2").click(function(){
			capturePhoto("tindakan");
		});
		$("#kirim").click(function(){
			sendDataGantimeter();
		});
		$("#simpan").click(function(){
			saveDataGantimeter()
		});
    }
	if (page.name === 'sendct') {
		uuidUsed = page.query.id;
		previewSendCt();
		$("#send_ct").click(function(){
			sendCt();
		});
	}
	if (page.name === 'needct') {
		loadNeedCt();
	}
	if (page.name === 'statistik') {
		getStat();
	}
	
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    
})

function getStat(){
	var jqxhr = $.get( "http://gamerspace.us/index.php/c_gangguan/get_gangguan_statistik_bulanan", function() {
		
	})
	.done(function(data) {
		console.log(data);
		drawStat(data);
		
	})
	.fail(function() {
		alert( "error" );
	})
}

function drawStat(_data){
	console.log(_data);
	var bln = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AGU","SEP","OKT","NOV","DES"];
	var data = [];
	for(var i=0;i<_data.length;i++){
		var _temp = [bln[_data[i].bulan],_data[i].jumlah];
		data.push(_temp);
	}

		$.plot("#stat_bulanan", [ data ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.6,
					align: "center"
				}
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			}
		});
}