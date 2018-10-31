// https://api.coinmarketcap.com/v2/ticker
// http://www.mocky.io/v2/5bd1dfac2f00008d2ed8fe73
var request = require('request'),
	express = require('express'),
	app 	= express()


var crypt = "http://www.mocky.io/v2/5bd1dfac2f00008d2ed8fe73"

app.set("view engine", "ejs")

app.get('/', function(req, res){
	res.render('list.ejs')
})

app.get('/search', function(req, res, body){
	console.log("search page")
	var name = req.params.name
	res.render("search.ejs")
})

app.get('/results', function(req, res){
	console.log("Results Page")

	var query = req.query.search.toLowerCase()
	var key_id = 0
	if(query === "bitcoin")
		key_id = 1

	var url = "https://api.coinmarketcap.com/v2/ticker/" + key_id + '/'
	request(url, function(error, response, body){
		if(!error && res.statusCode == 200){
			var data = JSON.parse(body)
			console.log(data)
			res.render('list.ejs', {data: data})
		}
	})
})

// app.get('/results', function(req, res){
// 	request(crypt, function(err, rep , body){
// 		var list_crypt = JSON.parse(body)
// 		console.log(list_crypt) 

// 		var data 
// 		for(let i=0; i<list_crypt['currencies'].length; i++){
// 			request(url_id+'/'+list_crypt['currencies'][i], function(err, res, body){
// 				data = JSON.parse(body)
// 				console.log(data)
// 			})
// 		}
// 		res.render('list.ejs', {data: data})
// 	})	
// })


app.listen(8080, function(){
	console.log("app is running!")
})