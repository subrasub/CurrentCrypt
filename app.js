// https://api.coinmarketcap.com/v2/ticker
// http://www.mocky.io/v2/5bd1dfac2f00008d2ed8fe73
var request = require('request'),
	express = require('express'),
	app 	= express()


var crypt = "http://www.mocky.io/v2/5bd1dfac2f00008d2ed8fe73"
var url_id = "https://api.coinmarketcap.com/v2/ticker"


request(crypt, function(err, res, body){
	var list_crypt = JSON.parse(body)
	console.log(list_crypt) 
})

app.listen(8080, function(){
	console.log("app is running!")
})