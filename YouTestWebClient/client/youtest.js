/**
 * Module Name	: 	"YouTest"
 * Service Name	: 	"yts" 
 */

var useTestData = true;
var baseTestData = {
	"categories": [],
	"questions": [],
	"users": [],
	"institutes": [],
	"papers":[],
	"results":[]
};

if(angular){
	var ytm = angular.module("YouTest", []);
	//alert('You Test module loaded.');

	function inflateUrl(serviceUrl){
    	if(serviceUrl){
    		if(appBase && !serviceUrl.startsWith('http')){
	    		serviceUrl = appBase.getServiceURL(serviceUrl)
    		}
    	}
    	return serviceUrl;
	}

	// service : access test data 
		
	function ytsWithTestData($http) 
	{
		var testdata = baseTestData;
		// init test data.
		if(appBase && useTestData){
			testdata = loadTestData();
		}

		function saveTestData(data){
			//alert("Saving: " + JSON.stringify(data));
			appBase.storage.testdata = JSON.stringify(data);
		}

		function loadTestData(){
			var testdata = {};
			if(appBase.storage){
				var data = appBase.storage.testdata;
				if(data){
					testdata = JSON.parse(data);
					//alert(JSON.stringify(testdata));
				}
			}
			// test data validity
			if(!testdata.categories || !testdata.questions){
				testdata = baseTestData;
				saveTestData(testdata);
			}
			return testdata;
		}

		function deleteTestData(){
			delete appBase.storage.testdata;
		}

		/*
		 * Generic functions.
		 */    
		this.alert = function (msg) {
			if(console){
				console.log(msg);
			}
	        alert(msg);
	    }
	    

		/*
	     * Data APIs
	     */
	    
	    // categories
	    this.loadCategories = function(filter, success, failure){
	    	//alert(JSON.stringify(filter));
	    	// TODO: consider filter
	    	success(testdata.categories);
	    }
	    
	    this.loadAllCategories = function(success, failure){
	    	success(testdata.categories);
	    }
	    
	    this.saveCategory = function(category, success, failure){
	    	// TODO: consider category
	    	testdata.categories.push(category);
	    	saveTestData(testdata)
	    	success(category);
	    }
	    
	    // questions
	    this.loadQuestions = function(filter, success, failure){
	    	//alert(JSON.stringify(filter));
	    	// TODO: consider filter
	    	success(testdata.questions);
	    }
	    
	    this.loadAllQuestions = function(success, failure){
	    	success(testdata.questions);
	    }
	    
	    this.saveQuestion = function(ques, success, failure){
	    	// TODO: consider questions
	    	//alert(JSON.stringify(testdata.questions));
	    	for(var i=0; i<ques.length; i++){
		    	testdata.questions.push(ques[i]);
	    	}
	    	//alert(JSON.stringify(testdata.questions));
	    	saveTestData(testdata);
	    	success(questions);
	    }
	    
	    this.getTextForVoice = function(voiceData, success, failure){
	    	var fd = new FormData();
	    	fd.append("audio", voiceData);
	    	
	    	$http.post(inflateUrl("search"), fd, 
	    			{transformRequest: angular.identity, headers: {'Content-Type': undefined}},
	    	function(result){
				if(success){
					success(result);
				}
			},
			function(error){
				if(failure){
					failure (error);
				}
			});
	    }
	    // end
	}
	
	// service : access remote data 
	function ytsWithRemoteData($http) 
	{
		
	
		/*
		 * Generic functions.
		 */    
		this.alert = function (msg) {
			if(console){
				console.log(msg);
			}
	        alert(msg);
	    }
	    
	    this.post = function(serviceUrl, data, success, failure){
	    	this.service($http.post, serviceUrl, data, success, failure);
	    }

	    this.get = function(serviceUrl, data, success, failure){
	    	this.service($http.get, serviceUrl, data, success, failure);
	    }

	    this.service = function(method, serviceUrl, data, success, failure){
	    	if(!data) {
	    		data = {};
	    	}
	    	/*
	    	if(serviceUrl){
	    		if(appBase && !serviceUrl.startsWith('http')){
		    		serviceUrl = appBase.getServiceURL(serviceUrl)
	    		}
	    	}
	    	*/
	    	//alert("running post service: " + serviceUrl);
	    	method(inflateUrl(serviceUrl), data)
				.then(
						function(result){
							if(success){
								success(result);
							}
						},
						function(error){
							if(failure){
								failure (error);
							}
						}
				);
	    }
	    
	    /*
	     * Data APIs
	     */
	    
	    // categories
	    this.loadCategories = function(filter, success, failure){
	    	//alert(JSON.stringify(filter));
	    	this.post("categories/load", {"selector":filter}, function(result){
	    		success(result.data);
	    	}, failure);
	    }
	    
	    this.loadAllCategories = function(success, failure){
	    	this.post("categories/load", {}, function(result){
	    		success(result.data);
	    	}, failure);
	    }
	    
	    this.saveCategory = function(category, success, failure){
	    	this.post("categories/save", {"categories": [category]}, function(result){
	    		//alert("Success : " + JSON.stringify(result));
	    		success(result.data.docs);
	    	}, failure);
	    }
	    
	    // questions
	    this.loadQuestions = function(filter, success, failure){
	    	//alert(JSON.stringify(filter));
	    	this.post("questions/load", {"selector":filter}, function(result){
	    		success(result.data);
	    	}, failure);
	    }
	    
	    this.loadAllQuestions = function(success, failure){
	    	this.post("questions/load", {}, function(result){
	    		success(result.data);
	    	}, failure);
	    }
	    
	    this.saveQuestion = function(questions, success, failure){
	    	this.post("questions/save", {"questions": [questions]}, function(result){
	    		//alert("Success : " + JSON.stringify(result));
	    		success(result.data.docs);
	    	}, failure);
	    }
	    
	    this.getTextForVoice = function(voiceData, success, failure){
	    	var fd = new FormData();
	    	fd.append("audio", voiceData);
	    	/*
	    	this.post("search", fd, function(result){
	    		//alert("Success : " + JSON.stringify(result));
	    		success(result.data);
	    	}, failure);
			*/
	    	
	    	$http.post(inflateUrl("search"), fd, 
	    			{transformRequest: angular.identity, headers: {'Content-Type': undefined}},
	    	function(result){
				if(success){
					success(result);
				}
			},
			function(error){
				if(failure){
					failure (error);
				}
			});
	    	
	    	/*
	    	$.ajax({
	    	    "type" : "post",
	    	    "url" : inflateUrl("search"),
	    	    "data" : fd,
	    	    "cache" : false,
	    	    "contentType" : false,
	    	    "processData" : false,
	    	    "success": function(result) {
	    	    	success(result);
	    	    }
	    	});
	    	*/
	    }
	    // end
	}
	
	ytm.service("yts", 
			['$http',
				(useTestData)? ytsWithTestData : ytsWithRemoteData
			]
	);	
}