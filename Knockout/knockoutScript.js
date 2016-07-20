function Incident(name, descr, timeLeft, req) {
    var self = this;
    self.name = name;
    self.descr = descr;
    self.req = req;
    self.timeLeft = timeLeft;
}

// Overall viewmodel for this screen, along with initial state
function IncidentsViewModel() {
    var self = this;

    var incidentsArray = incidentList;
    var array = [];
    for(var i = 0; i < incidentsArray.length; i++){
      //if(incidentsArray[i].targetDate != null){
        var name = incidentsArray[i].creator ? incidentsArray[i].creator.name : "";
        var dateSplit = incidentsArray[i].targetDate ? incidentsArray[i].targetDate.split('-') : "";
        var timeLeft = dateSplit ? (calculateTimeLeft(new Date(dateSplit[0], dateSplit[1], dateSplit[2].substring(0,2))))  : "";
        var req = incidentsArray[i].request.split(":")[3];
        array.push(new Incident(name, incidentsArray[i].briefDescription, timeLeft, req));
      //}
    }
    self.incidents = ko.observableArray(array);


    self.removeIncident = function(incident) {
      self.incidents.remove(incident);
    }
}

var fillHTML = function(){
  if(incidentsImported){
    var s = "<table><thead><tr><th>Creator Name</th><th>Brief Description</th><th>Due Date</th><th>Request</th></tr></thead><tbody data-bind='foreach: incidents'><tr><td data-bind='text: name'></td><td data-bind='text: descr'></td><td data-bind='text: timeLeft'></td><td data-bind='text: req'></td><td><a href='#' data-bind='click: $root.removeIncident'>Done</a></td></tr></tbody></table><script type='text/javascript' src='knockoutScript.js' defer></script>";
    document.getElementById("list").innerHTML = s;
    ko.applyBindings(new IncidentsViewModel());
  }
}

var calculateTimeLeft = function(date){
  if(Math.abs((new Date()).getFullYear() - date.getFullYear()) >= 1){
    return date.getFullYear() - (new Date()).getFullYear() + "y";
  }
  else if(Math.abs((new Date()).getMonth() - date.getMonth()) >= 1){
    return date.getMonth() - (new Date()).getMonth() + "m";
  }
  else if(Math.abs((new Date()).getDay() - date.getDay()) >= 1){
    return date.getDay() - (new Date()).getDay() + "d";
  }
  else if(Math.abs((new Date()).getHours() - date.getHours()) >= 1){
    return date.getHours() - (new Date()).getHours() + "h";
  }
  else if(Math.abs((new Date()).getMinutes() - date.getMinutes()) >= 1){
    return date.getMinutes() - (new Date()).getMinutes() + "m";
  }
}

ko.applyBindings(new IncidentsViewModel());
