function showDate() {
document.getElementById("B1").innerHTML = Date();
}


function play() {

//names = ["banana", "orange", "tangerine"];

//names.push("GRAPES!")
//$("#B3").html("hello");
//$("#B3").text(names[2]);
//var htmlString=$("#B3").html();
//$("#B3").text(htmlString);

$("#link1").attr("href","https://www.youtube.com/").attr("target","_blank");

$("#link1").load('indexLoad.html', function( response, status, xhr ) {
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
        $( "#error" ).html( msg + xhr.status + " " + xhr.statusText ); }
  if (status == "success"){
		alert ("Load was successful");}
  })

}


$(document).ready(function () {


	$("#Sub").click(function () {

	$("input").addClass('add').removeClass('rem');

	var FirstNam = $("#FirstName").val();
	var LastNam = $("#LastName").val();
	var Ag = $("#Age").val();

	if (FirstNam.length== 0 ) {
		$("#FirstName").css("background-color","red");
		$("#FirstName").addClass("rem").removeClass('add'); 
//		alert($("#FirstName").hasClass('rem'));
	}

	if (LastNam.length== 0 ) {
		$("#LastName").css("background-color","red").after("<span style='color:yellow'> Enter the field </span>");}

	if (Ag.length== 0 ) {
		$("#Age").css("background-color","red").after("<span style='color:yellow'> Enter the field </span>");}


//    localStorage.setItem("FirstNam1",FirstNam);
	
//    alert(FirstNam1);
//	var db=openDatabase("myDB","1","make bd","200000");

//		db.transaction(function (t) {
//		t.executeSql('CREATE TABLE IF NOT EXISTS student (id unique, first_name varchar(50), last_name varchar(50))');	
//		//t.executeSql('delete from student');
//		t.executeSql('INSERT INTO student (id, first_name, last_name) VALUES (1,localStorage.FirstNam1, "LastNam")');
//		document.querySelector('#status').innerHTML="Data Inserted";
//	})	


	


	})




//var t=$("#info1").size();

//$("#info1").append("some appended text");

//navigator.geolocation.getCurrentPosition(function(position) {
//console.log(position);
//});


$("#buttonMap").on("click", function() {


function fun() {
	$("#buttonMap").attr("value","we are DONE");
}
function delay(n){

	var deferred = $.Deferred();
	setTimeout(function() {
		deferred.resolve(fun());
	}, n);
	return deferred.promise();
}
	
function dis(){
		console.log("HEYYYYYYYYY");
}

});
///////////////////////////////////////////////////////////////


var map;
require(["esri/map", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "dojo/_base/Color", 
	"esri/graphic", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", "esri/toolbars/draw",
	"esri/dijit/Legend", "esri/renderers/UniqueValueRenderer", "esri/dijit/PopupTemplate", "esri/tasks/GeometryService",
	"esri/tasks/BufferParameters", "esri/SpatialReference", "esri/symbols/SimpleFillSymbol", "esri/config"], 
	function(Map, SimpleMarkerSymbol, SimpleLineSymbol, Color, Graphic, Query, QueryTask, FeatureLayer, Draw, Legend
			, UniqueValueRenderer, PopupTemplate, GeometryService, BufferParameters, SpatialReference, SimpleFillSymbol
			, esriConfig) {
//	esriConfig.defaults.io.corsDetection = false;
//	esriConfig.defaults.io.proxyUrl = 'Java/proxy.jsp';
//	esri.config.defaults.io.alwaysUseProxy = true;
    map = new Map("mapDiv", {
    center: [-122.4348, 37.7582],
    zoom: 13,
    basemap: "streets"
  });

map.on("click", function(e){
	var mapPoint = e.mapPoint;
	lineColor = new Color([255, 0, 0]);
	fillColor =new Color([255, 0, 0, 0.2]);
	line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, lineColor, 1);
	sms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 24, line, fillColor);
	graphic = new Graphic(mapPoint, sms);
	map.graphics.add(graphic);
})

function onQuerySuccess(featureSet) {
markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, null, new Color([50,50,255]));
map.graphics.clear();
var resultFeatures = featureSet.features;
for (var i=0, il=resultFeatures.length; i<il; i++) {
    var graphic = resultFeatures[i];
	graphic.setSymbol(markerSymbol);
	map.graphics.add(graphic);
}
}

function onError(error) {
console.error('An error ocurred in the query: ', error);
}

$("#population").change(function(){
	queryVal=this.value;
	url = "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0";
	if (queryVal.length > 0 )	{
		var queryTask = new QueryTask(url);
		var query = new Query();
		query.where = 'TOTAL_POP < ' + queryVal;
		query.returnGeometry = true;
		queryTask.execute(query, onQuerySuccess);
	}
	else { map.graphics.clear();}
})

var featureLayer0 = new FeatureLayer('http://services.arcgis.com/' +
									'V6ZHFr6zdgNZuVG0/arcgis/rest/services' +
									'/la_county_labor_centroid/FeatureServer/0');

$("#addLayer").click("on", function () {
	var pop = $("#population").find(":selected").text();
//	featureLayer0.setDefinitionExpression('TOTAL_POP > 2500');
	map.addLayer(featureLayer0);
})

draw = new Draw(map);
var featureLayer = new FeatureLayer('http://services.arcgis.com/' +
									'V6ZHFr6zdgNZuVG0/arcgis/rest/services' +
									'/la_county_labor_centroid/FeatureServer/0', {mode:FeatureLayer.MODE_SELECTION}); 
draw.on("draw-end", function (e) {
	draw.deactivate();
	var query = new Query;
	query.geometry = e.geometry;
	featureLayer.selectFeatures(query);
	map.addLayer(featureLayer);
})


$("#draw").click("on", function () {
	draw.activate(Draw.POLYGON);
})

$("#cleardraw").click("on", function () {
	map.removeLayer(featureLayer0);
	map.removeLayer(featureLayer);
})


geometryArray = [];
var drawtool = new Draw(map);
geometryservice = new GeometryService(
		'http://tasks.arcgisonline.com/ArcGIS/rest/services/' +
		'Geometry/GeometryServer');
//featureLayer6 = new FeatureLayer(
//					'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
//					'Demographics/ESRI_Census_USA/MapServer/1',{
//						mode: FeatureLayer.MODE_SELECTION,
//						outFields: ["*"]
//					});

drawtool.on("draw-end", function(e) {
if ($("#buffertext").val().length == 0) {
	console.error("Enter Buffer Size");
	$("#buffertext").css("background-color", "red");
}
else {
	$("#buffertext").css("background-color", "white");
	map.graphics.clear();
	var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, null, new Color([50,50,0]));
	var fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
    				new Color([255,0,0]), 2),new Color([255,255,0,0.25]));
	drawtool.deactivate();
	map.graphics.add(new Graphic(e.geometry, markerSymbol));
	params = new BufferParameters();
	params.geometries = [e.geometry];
    params.distances = [ $("#buffertext").val() ];
    params.unit = GeometryService.UNIT_KILOMETER;
	params.outSpatialReference = map.spatialReference;
	geometryservice.buffer(params, function(e) {
		dojo.forEach(e, function (e1) {
			map.graphics.add(new Graphic(e1, fill));
			geometryArray.push(e1);
//			var query = new Query();
//			query.geometry = e1;
//			featureLayer6.selectFeatures(query, FeatureLayer.SELECTION_NEW);
		})
//		map.addLayer(featureLayer6);
	});
} 
})


$("#buffer").click("on", function() {
	drawtool.activate(Draw.POINT);
})


$("#Intersect").click("on", function () {
	map.graphics.clear();
	var fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
    				new Color([255,0,0]), 2),new Color([255,255,0,0.25]));
	geometryservice.intersect([geometryArray[1]], geometryArray[0]).then( function (geo) {
//		dojo.forEach(geo, function(geo1) {
			console.log("hi");
//		})
	})
})	






}); /// map require
////////////////////////////////////////////////////////////////





}) ///document ready
