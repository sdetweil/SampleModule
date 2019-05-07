/*

sample module structure


 */


Module.register("SampleModule", {
	some_variable:  true,
	some_other_valriable: "a string",
  MBW: {
    "testing": 1234,
    "testing 2": "12345678",
    "fred": "mary",
    "sue":"some other string"
  },
	defaults: {
		// holder for config info from module_name.js
		config:null,
	},

	init: function(){
		Log.log(this.name + " is in init!");
	},

	start: function(){
		Log.log(this.name + " is starting!");
	},

	loaded: function(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},

	// return list of other functional scripts to use, if any (like require in node_helper)
	getScripts: function() {
		return
		[
			// sample of list of files to specify here, if no files,do not use this routine, or return empty list

			//'script.js', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
			//'moment.js', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
			//this.file('anotherfile.js'), // this file will be loaded straight from the module folder.
			//'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
		]
	},

	// return list of stylesheet files to use if any
	getStyles: function() {
		return
		[
			// sample of list of files to specify here, if no files, do not use this routine, , or return empty list

			//'script.css', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
			//'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be avialable in the module folder.
			//this.file('anotherfile.css'), // this file will be loaded straight from the module folder.
			//'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',  // this file will be loaded from the bootstrapcdn servers.
		]
	},

	// return list of translation files to use, if any
	getTranslations: function() {
		return
		[
			// sample of list of files to specify here, if no files, do not use this routine, , or return empty list

			// en: "translations/en.json",  (folders and filenames in your module folder)
			// de: "translations/de.json"
		]
	},

	// this is the major worker of the module, it provides the displayable content for this module
	getDom1: function() {
		var wrapper = document.createElement("div");

		// if user supplied message text in its module config, use it
  if(this.config.hasOwnProperty("message")){
      // using text from module config block in config.js
      wrapper.innerHTML = this.config.message;
    }
		else{
		// use hard coded text
      wrapper.innerHTML = "Hello world!";
    }

		// pass the created content back to MM to add to DOM.
		return wrapper;
	},

	// only called if the module header was configured in module config in config.js
	getHeader: function() {
		return this.data.header + " Foo Bar";
	},

	// messages received from other modules and the system (NOT from your node helper)
	// payload is a notification dependent data structure
	notificationReceived: function(notification, payload, sender) {
		// once everybody is loaded up
		if(notification==="ALL_MODULES_STARTED"){
			// send our config to our node_helper
			this.sendSocketNotification("CONFIG",this.config)
		}
		if (sender) {
			Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} else {
			Log.log(this.name + " received a system notification: " + notification);
		}
	},
	// messages received from from your node helper (NOT other modules or the system)
	// payload is a notification dependent data structure, up to you to design between module and node_helper
	socketNotificationReceived: function(notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
	},

	// system notification your module is being hidden
	// typically you would stop doing UI updates (getDom/updateDom) if the module is hidden
	suspend: function(){

	},

	// system notification your module is being unhidden/shown
	// typically you would resume doing UI updates (getDom/updateDom) if the module is shown
	resume: function(){

	},
  // create elements... 
  // take an object in as parms, 
  // makes it easier to understand what is supplied vs not
  newElement: function(parms_object ){
  var e=null;    
  switch(parms_object.type){
     case 'table':        
        e=document.createElement('table');
     break;
     case 'row':
        e=document.createElement('tr');        
     break;
     case 'column':
        e=document.createElement('td');   
     break;
     case 'area':
        e=document.createElement('div'); 
     break;
     case 'item':
        e=document.createElement('span'); 
     break;
  }
  if(parms_object.classname !== undefined)
     e.className=parms_object.classname;
  if (parms_object.value !== undefined)     
     e.innerHTML = parms_object.value       
  if(parms_object.parent !== undefined)
     (parms_object.parent).appendChild(e)
  return e;
},

getDom: function(){
  var wrapper = document.createElement("div");
  var table = this.newElement({type:'table'}) // note here, just type specified, to test code above
  
  // repeat the rows/columns block as needed  maybe in a loop as well.. 
 
  // get the list of items in the object
  for(item_name of Object.keys(this.MBW)){  // i think this returns keys in position order, not alphabetical
    var row=this.newElement({type:"row",classname:"temperatuur-row",parent:table})  
    // add a column for the data item name
    this.newElement({parent:row, type:"column",classname:"small",value:item_name}) // parms in any order
    // get the data for the item
    let item_value= this.MBW[item_name]
    this.newElement({type:"column",classname:"small",value:item_value,parent:row})
  }
  wrapper.appendChild(table)
  return wrapper
}  

})