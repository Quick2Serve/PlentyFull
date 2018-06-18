var request = require('sync-request');
var fs = require("fs")
var data = JSON.parse(fs.readFileSync('Agency_ServiceGroup.1.json'));
var stub = data.splice(0,4);

data.forEach(element => {
	var keys = Object.keys(element);
	keys.forEach(key => {
		if (element[key] !== '') {
			var save_data = element[key];
			delete element[key];
			element[key.split(' ').join('_').toLowerCase()] = save_data
		}
		else{
			delete element[key]
		}
	});

	var getLocateUrl = "http://dev.virtualearth.net/REST/v1/Locations"
	+ `?q=${element.address1.split(" ").join("%20")}%2C${element.city}%2C${element.state}`
	+ "&maxResults=1"
	+ "&inclnb=0"
	+ "&key=AqgHPKr1L57_mZH_6-Dn5gzisX9M9GiS0i12stkN7OV2Lt5001bfEppV1wGAwXoQ";

	// element['get_locate_url'] = getLocateUrl
	try {
		var res = request('GET', getLocateUrl)
		var coordinates = JSON.parse(res.getBody())["resourceSets"][0].resources[0].bbox;
		element["latitude"] = coordinates[0];
		element["longitude"]= coordinates[1];

    element.staticImage = `http://staticmap.openstreetmap.de/staticmap.php`
    +`?center=${element["latitude"]},${element["longitude"]}`
    +"&zoom=18"
    +"&size=865x512"
    +"&maptype=mapnik"
    +`&markers=${element["latitude"]},${element['longitude']},`
    +"lightblue1";

	} catch (error) {
		console.log(error)
	}
});
console.log("Sample of Sturture:\n",data.splice(0,3))

fs.writeFileSync('clean_data.json', JSON.stringify(data, ' ', 3))
