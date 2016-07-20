var OperatorLogin = "http://sneaks.topdesk.com:757/tas/api/login/operator";
var incidentURI =     "http://sneaks.topdesk.com:757/tas/api/incidents";
var incidentURIorder = "http://sneaks.topdesk.com:757/tas/api/incidents?order_by=target_date%2BASC";
var incidentList = [];
var incidentsImported = false;
//var statusOfIncidents=206;

login(OperatorLogin, "dawnm", "dawnm")
	.then(function(token) {
		return getIncidents(token, 0);
	})
	.then(console.log.bind(console))
	.catch(function(data) {
		console.log(2, 'error', data);
	});

function login(loginURI, name, pass){
	return new Promise(function (resolve,reject){
		var loginGET = new XMLHttpRequest();
		loginGET.open("GET", loginURI);
		loginGET.setRequestHeader("Authorization", "BASIC " + btoa(name+":"+pass));
		// loginGET.setRequestHeader("Content-Type", "application/json");
		loginGET.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(this.response);
			} else {
				reject(this.statusText);
			}
		};

		loginGET.onerror = function () {
			reject(this.statusText);
		};
		loginGET.send();
	});
}

function getIncidents(token, offset) {
	var url = incidentURIorder + "&start=" + (offset || 0);
	httpRequest(url, "GET", token).then(
	function(response) {
		console.log(response);
		if (response.status === 206) {
			 for (var i =0;i <response.incidents.length;i++){
			 	incidentList.push(response.incidents[i]);
			 	}
			getIncidents(token, (offset || 0)+10);
		}
		else {
			for (var i =0;i <response.incidents.length;i++){
				incidentList.push(response.incidents[i]);
			}
			incidentsImported = true;
			fillHTML();
		}
	});
}

function httpRequest(url, method, token) {
	return new Promise(function (resolve,reject){
		var request = new XMLHttpRequest();
		request.open(method, url);
		request.setRequestHeader("Authorization", 'TOKEN id="' + token +'"');
		request.setRequestHeader("Content-Type", "application/json");

		request.addEventListener("load", function (event) {
			statusOfIncidents=event.target.status;

			if (event.target.status >= 200 && event.target.status < 300) {
				resolve({status: event.target.status,
					incidents: JSON.parse(event.target.response)});
				statusOfIncidents=event.target.status;

			} else {
				reject(event.target.statusText);
			}
		});

		request.addEventListener("error", function (event) {
			reject(event.target.statusText);
		});

		request.send();


	});
}
