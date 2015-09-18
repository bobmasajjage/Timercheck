
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
        password: "namutamba@"
    }),


    // Lets try to ask for team members
    TeamMembers = harvest.People;

    TeamMembers.list({}, function(err, team){
        if(err){
            console.log(err)
        }

        var users = team.map(function(member) {
            return member.user;
        });

        // console.log(users);

        users.map(function(user){
            // console.log(user)

        });
    });

    //ASk for the list of all current projects

    Projects = harvest.Projects;

    Projects.list({}, function(err, currentProjects){
        if (err){
            console.log(err);
        }
        var projects = currentProjects.map(function(project){
            return project.project;
        });
        // console.log(active_projects);

        projects.map(function(project){
            if(project.active === false){
                console.log(project);
            }
        });
    });


 // CALL the timer here where to check whose timer is not running and whose is running
// exaple id = 1090850//Bob
    TimeTracking = harvest.TimeTracking;
    
    // for(var i in TimeTracking){
    //  console.log(i);
    // };

    // var params = {id:1090850};

TimeTracking.daily({}, function(err, response) {
    if (err){

        throw new Error(err);   
    };

    // console.log(response.Project);
});


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});