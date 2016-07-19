var dispatcher = require('httpdispatcher');
var request = require('request');
var http = require('http');

dispatcher.setStatic('resources');

var tasks = [];
tasks.push("afwassen");
tasks.push("eten koken");
tasks.push("slapen");

dispatcher.onGet("/page1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var s = "";
  for(var i = 0; i < tasks.length; i++){
    s += tasks[i] + " " ;
  }
  res.end(JSON.stringify(s));
});

dispatcher.onPost("/page1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var a = req.body;
  console.log(a);
  tasks.push(req.body);
  res.end(a);
});

function handleRequest(request, response){
  try{
    console.log(request.url);
    dispatcher.dispatch(request, response);
  }
  catch(err){
    console.log(err);
  }
}

const PORT = 8080;

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
