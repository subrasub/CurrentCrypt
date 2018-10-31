// API: https://api.coinmarketcap.com/v2/ticker
var request = require('request'),
	express = require('express'),
	app 	= express()

var url = "https://api.coinmarketcap.com/v2/"

app.set("view engine", "ejs")

app.get('/', function(req, res){
	console.log("home page")
	res.render('home')
})

app.get('/list', function(req, res){
	console.log("list page")
	request(url+'/ticker/?limit=10', function(error, response, body){
		if(!error && res.statusCode == 200){
			var data = JSON.parse(body)
			// console.log(data)
			res.render("list", {data:data})
		}
	})
})

app.get('/search', function(req, res, body){
	console.log("search page")
	var name = req.params.name
	res.render("search")
})

app.get('/results', function(req, res){
	console.log("Results Page")

	var query = req.query.search.toLowerCase()
	var key_id = 0
	if(query === "bitcoin")
		key_id = 1

	
	request(url +'/ticker/' + key_id + '/', function(error, response, body){
		if(!error && res.statusCode == 200){
			var data = JSON.parse(body)
			console.log(data)
			res.render('single', {data: data})
		}
	})
})

app.listen(8080, function(){
	console.log("app is running!")
})