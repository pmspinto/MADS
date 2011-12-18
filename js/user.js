//Classe User
function User(email,nome){

	//atributos
	this.Email = email;
	this.Name = nome;
	//array de ids de projectos
	this.Projects = new Array();
	this.CurrentProject;
	
	//metodos
	this.printInfo = function(){alert("Email: "+this.Email+", Nome: " + this.Name);}
	
	this.addProject = function(project){
		this.Projects.push(project);
	}

	this.getAllProjects = function (){
		
		//console.log("getAllProjects -> EMAIL:"+this.Email);
		
		$.post("ajax/getAllProjects.php?user="+this.Email+"",
			function(json) {    

			var response = JSON.parse(json);
			var projectOptions="";

			this.Projects = new Array();
			// successful
			if (typeof response['error'] === "undefined") {

				for(project in response){
					//projectOptions += '<option value="' + response[project]['id'] + '">' + response[project]['name'] + '</option>';
					//console.log(project);
					console.log("getAllProjects -> id: "+response[project]['id']+"\n");
					this.Projects.push(response[project]['id']);
				}
				// change the combo box
				//document.getElementById("projectSelector").innerHTML = '<option value="">Jump to a project...</option>\
				//				<option value="" disabled="disabled">---</option>' + projectOptions;

				//getCurrentProject();
			}
			// error message
			else
				showErrorMsg("Error","Couldn't get your projects!");
		}); 
	}
}

//Classe Lista de utilizadores
function ListUsers(){
	
	//atributos
	this.users = new Object();
}