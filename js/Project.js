function Project(id, name, user, creationDate, users) {

	/* methods */

	// saves this project instance
	this.save = function() {
		alert( "SAVE NOW!" )
	}

	// prints some debug info
	this.printInfo = function(){
		alert("id: " + this.id + 
			"\nname: " + this.name +
			"\nowner: " + this.owner + 
			"\ncreation date: " + this.creationDate + 
			"\nusers: " + this.users);
	}

	// fetch the users involved in this project
	this.getdbProjectUsers = function(projectId){
		return new Array("admin@mads.com", "scrub@mads.com", "lowlife@mads.com")
	}

	/* atributes */
	this.id = id;
	this.name = name;
	this.owner = user;
	this.creationDate = creationDate;
	this.users = this.getdbProjectUsers(this.id); // array of emails used to consult the dictionary


}
// static methods for the Project class
Project.staticMethod = function(){
	alert("static method")
}




function ProjectList(){

	/* atributes */
	this.projects = new Object();


	/* methods */
	
	// prints some debug info
	this.printInfo = function(){
		alert("There are " + Object.keys(this.projects).length + " projects.");
	}

	// returns a project based on the id
	// if the project isn't found locally then it's fetched
	this.getProject = function(id){
		
		// if the id exist return it
		if(typeof this.projects[id] != 'undefined')
			return this.projects[id];
		else{
			// or get it, set it here and return it	
			dbProject = this.getdbProject(id);
			this.projects[id] = dbProject;
			return dbProject;
		}	
	}

	// returns an array of projects based on their ids
	// if any of the projects isn't found locally then they're fetched
	this.getProjects = function(ids){
	
		// the return value
		returnProjects = [];		

		for(id in ids){

			// if the id exist return it
			if(typeof this.projects[id] != 'undefined')
				this.returnProjects.push(projects[id]);
			else{
				// or get it, set it here and return it	
				dbProject = this.getdbProject(id);
				this.projects[id] = dbProject;
				returnProjects.push(dbProject);
			}
		}
	}

	// this method is called when a project is not
	// present in the projects list
	// it fetches the project from the DB and
	// returns a project object
	this.getdbProject = function(id){
		alert("getdbProject()");
		return new Project(-1, "default", "default", "0000-00-00")
	}
	
}
