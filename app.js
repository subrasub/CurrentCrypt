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

app.get('/home', function(err, res){
	console.log("home page")
	res.redirect('home')
})

app.get('/list', function(req, res){
	console.log("list page")
	request(url+'/ticker/?limit=10', function(error, response, body){
		if(!error && res.statusCode == 200){
			var data = JSON.parse(body)
			res.render("list", {data:data['data']})
		}
	})
})

app.get('/search', function(req, res, body){
	console.log("search page")
	var name = req.params.name
	res.render('search')
})

app.get('/results', function(req, res){
	console.log("Results Page")
	
	var hash_id = {
		1:'bitcoin',2:'litecoin',52:'xrp',66:'nxt',74:'dogecoin',109:'digibyte',118:'reddcoin',131:'dash',213:'monacoin',291:'maidsafecoin',328:'monero',372:'bytecoin',463:'bitshares',512:'stellar',693:'verge',825:'tether',873:'nem',1027:'ethereum',1042:'siacoin',1104:'augur',1168:'decred',1169:'pivx',1214:'lisk',1229:'digixdao',1230:'steem',1274:'waves',1320:'ardor',1321:'ethereum classic',1343:'stratis',1376:'neo',1437:'zcash',1455:'golem',1518:'maker',1521:'komodo',1567:'nano',1586:'ark',1684:'qtum',1697:'basic attention token',1698:'horizen',1700:'aeternity',1703:'metaverse etp',1710:'veritaseum',1715:'mobilego',1720:'iota',1727:'bancor',1750:'gxchain',1757:'funfair',1758:'tenx',1759:'status',1765:'eos',1776:'crypto.com',1789:'populous',1808:'omisego',1831:'bitcoin cash',1839:'binance coin',1866:'bytom',1876:'dentacoin',1896:'0x',1903:'hypercash',1908:'nebulas',1925:'waltonchain',1934:'loopring',1958:'tron',1966:'decentraland',1975:'chainlink',2010:'cardano',2011:'tezos',2027:'cryptonex',2062:'aion',2083:'bitcoin gold',2087:'kucoin shares',2099:'icon',2132:'power ledger',2137:'electroneum',2213:'qash',2222:'bitcoin diamond',2246:'cybermiles',2299:'aelf',2300:'wax',2308:'dai',2405:'iost',2469:'zilliqa',2496:'polymath',2502:'huobi token',2563:'trueusd',2566:'ontology',2577:'ravencoin',2588:'loom network',2591:'dropil',2603:'pundi x',2606:'wanchain',2608:'mithril',2682:'holo',2694:'nexo',2772:'digitex futures',2874:'aurora',3077:'vechain',3134:'eternal token',3330:'paxos standard token',3408:'usd coin'
	};

	var query = req.query.search.toLowerCase()

	var key_id = Object.keys(hash_id).find(key => hash_id[key] === query)
	if(key_id !== undefined){
		request(url +'/ticker/' + key_id + '/', function(error, response, body){
			if(!error && res.statusCode == 200){
				var data = JSON.parse(body)
				console.log(data)
				res.render('single', {data: data['data']})
			}
		})
	}
	else{
		console.log("Incorrect search term")
		res.redirect('search')
	}
})

app.listen(8080, function(){
	console.log("app is running!")
})