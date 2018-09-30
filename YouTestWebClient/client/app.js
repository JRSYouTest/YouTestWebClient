var appBase = {
	appName:"YouTest/",
	//serviceBaseUrl: "http://localhost:9999/",
	serviceBaseUrl: "http://localhost:8080/YouTestOnline/",
	storage: localStorage,
	// <html lang="en">
	lang: "en",

	//<script src="youtest.js"></script>
	youtest: "/youtest.js",

	//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	bs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",

	//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	jq: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",

	//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	bsjs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
	
	// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
	ng_route: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>
	ng_anim: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.js"></script>
	ng_sanitize:"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.js",
	
	//<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	w3css:"https://www.w3schools.com/w3css/4/w3.css",

	// <meta name="viewport" content="width=device-width, initial-scale=1.0">
	view: "width=device-width, initial-scale=1.0",
	
	// <meta charset="utf-8">
	chset:"utf-8",
	
	init: function (){
		//alert("Initializing");
		
		document.documentElement.lang = this.lang;
		this.head = document.getElementsByTagName("head")[0];
		//this.print(this.head);

		this.addScript(this.angular);
		//this.print(this.head);

		this.addScript(this.ng_route);
		//this.print(this.head);

		this.addScript(this.jq);
		//this.print(this.head);

		this.addScript(this.bsjs);
		//this.print(this.head);

		this.addMeta([["name", "viewport"], ["content", this.view],]);
		//this.print(this.head);

		this.addMeta([["charset", this.chset],]);
		//this.print(this.head);

		this.addStylesheet(this.w3css);
		//this.print(this.head);

		this.addStylesheet(this.bs);
		//this.print(this.head);

		//this.addScript(this.youtest);
		//this.print(this.head);
		
		//alert("Init Completed");
	},
	
	print: function(ele){
		alert(ele.innerHTML);
	},
	
	addChild: function (/* parent element*/ parent, /*child tag name*/ childName, /* key-value pairs*/ attribs , clbk){
		//alert("adding : '" + childName + "'\nattributes: " + JSON.stringify(attribs));
		if(parent){
			var child = document.createElement(childName);
			for(var i=0; i<attribs.length; i++){
				var prop = attribs[i];
				child[prop[0]] = prop[1];
			}
			
			parent.appendChild(child);
			
			// error handling
			child.onload = child.onreadystatechange = function (e) {
				if (child.readyState && child.readyState !== 'complete' && child.readyState !== 'loaded') {
					alert("Loaded child :" + JSON.stringify(child));
					if(clbk){
						clbk(child)
					}
					return;
				}
			};
			
			child.onerror = function (e) {
				alert("Error loading - " + childName + " with attributes: " + attribs);
			};
		}
	},
	
	addScript: function (src, clbk){
		//alert(this.head);
		this.addChild(this.head, "script", [["src", src],], clbk);
	},
	
	addStylesheet: function (href, clbk){
		//alert(this.head);
		this.addChild(this.head, "link", [["rel", "stylesheet"],["href", href],], clbk);
	},

	addMeta: function (metaAttribs, clbk){
		//alert(this.head);
		this.addChild(this.head, "meta", metaAttribs, clbk);
	},
	
	getServiceURL: function (relPath){
		//alert(relPath);
		if(this.serviceBaseUrl){
			return this.serviceBaseUrl + relPath;
		} else {
			return getRemoteURL(relPath);
		}
	},
	
	getRemoteURL: function (relPath){
		//alert(relPath);
		var basePath = "";
		//alert(this.appName);
		if(this.appName){
			basePath = this.appName;
		}
		var matches = new RegExp("(http[s]?://[^/]*)/").exec(window.location);
		if(matches){
			basePath = matches[0] + basePath;
		}
		
		return basePath + relPath;
	},
	
	http : function(){
		if(angular){
			return angular.injector(["ng"]).get("$http");
		}
	},
	
};

//initialize
appBase.init();


