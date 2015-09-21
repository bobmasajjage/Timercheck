
//import the HTTP module
var http = require('http');

var Harvest = require("harvest")

//Lets define a port we want to listen to
const PORT=5000; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('Woo NOde Server running: ' + request.url);
}


// try to call the API

var Harvest = require('harvest'),
    harvest = new Harvest({
        subdomain: "digitalprocoza",
        email: "bob@io.co.za",
        password: "namutamba@",
        debug: true
    }),


    // // Lets try to ask for team members
    people = harvest.People;

    people.list({}, function(err, team){
        if (err) {

            // throw new Error(err);
        };
        // console.log(team);
    });

    var params = {id:1090850};

    TimeTracking = harvest.TimeTracking;

    TimeTracking.daily({}, function(err, response) {
        if (err){

        throw new Error(err);   
    };

    // console.log(response);
});


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});