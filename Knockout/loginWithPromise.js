var loginWithPromise = {};

var OperatorLogin = "http://sneaks.topdesk.com:757/tas/api/login/operator";
var incidentURI = "http://sneaks.topdesk.com:757/tas/api/incidents";
var incidentList;

loginWithPromise.login = function(loginURI, name, pass){
	var loginPromise = new Promise(
		function (resolve,reject){

			var loginGET = new XMLHttpRequest();
			loginGET.open("GET", loginURI);
			loginGET.setRequestHeader("Authorization", "BASIC " + btoa(name+":"+pass));
			// loginGET.setRequestHeader("Content-Type", "application/json");
			loginGET.send();
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
		}
	);
	return loginPromise;
}

loginWithPromise.getIncidentList = function(iURI, token){
	var incidentPromise = new Promise(
		function (resolve,reject){

			var incidentGET = new XMLHttpRequest();
			incidentGET.open("GET", iURI);
			incidentGET.setRequestHeader("Authorization", 'TOKEN id="' + token +'"');
			incidentGET.setRequestHeader("Content-Type", "application/json");

			incidentGET.onload = function () {
				if (this.status >= 200 && this.status < 300) {
				resolve(JSON.parse(incidentGET.response));
				incidentList = JSON.parse(incidentGET.response);
				} else {
				reject(this.statusText);
				}
	        };

	        incidentGET.onerror = function () {
				reject(this.statusText);
	        };
					incidentGET.send();
		}
	);
	return incidentPromise;
}

var callback = {
  success: function(data) {
    console.log(1, 'success', data);
    loginWithPromise.getIncidentList(incidentURI, data)
    	.then(callback2.success, callback2.error)
  },
  error: function(data) {
    console.log(2, 'error', data);
  }
};

var callback2 = {
  success: function(data) {
    console.log(1, 'success', data);
  },
  error: function(data) {
    console.log(2, 'error', data);
  }
};


//if we have the token

loginWithPromise.login(OperatorLogin, "dawnm", "dawnm")
	.then(callback.success, callback.error)
