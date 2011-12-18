function getCurrentProject(){
	$.post("ajax/getCurrentProject.php",
		function(json) {    
			var response = JSON.parse(json);

			// successful
			if (typeof response['error'] === "undefined") {
	
				// the global variable
				currentProject = response['name'];
				// change the project name on the title bar FIXME: check if there are results
				$("#projectName").text(" - " + currentProject);

				
				
				// change the name on the combo box				
				$("#projectSelector").val(response['id']);


			}
			// error message
			else
				showErrorMsg("Error","Couldn't get your project!");
		});    


}

function projectChange(){
	var projectName = $('#projectSelector').text();
	var projectId = $('#projectSelector').val();	
	
	/*
	// change the value on the session	
	$.post("ajax/changeProject.php",
		{projectName: projectName,
		projectId: projectId});
	*/
	
	Utilizador.CurrentProject = projectId;
	$("#projectName").text(" - " + Utilizador.CurrentProject);
	$('#projectSelector').val(Utilizador.CurrentProject);
}

function createProject(){
	var nome = document.getElementById("project_name").value;
	var description = document.getElementById("project_desc").value;
	var username = Utilizador.Email;
	
	//console.log("Apanhei name: "+name+" e description: " + desc + "\n");
	$.ajax({
		type: 'POST',
		url: 'ajax/addProject.php',
		data: { user: username, name: nome , desc: description },
		success: function(data) {
			console.log(data);
			$('#addProject_window').dialog("close");
		},
		error: function(){
			showErrorMsg("Error","Database isn't available.");
		}
	});
}