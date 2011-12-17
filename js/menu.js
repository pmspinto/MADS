

// launches the main menu
function launchMainMenu() {
	
	//Utilizador.printInfo();	
	
	//global vars
	var largura = $(window).width();
	var altura = $(window).height();
		
	// creates the dialog
	// it's not resizable nor draggable
	$('#mainMenu').dialog({ width: largura - 200, height: altura - 200, draggable: false, resizable: false, open: function(event, ui) { $('.ui-dialog-titlebar-close').show(); } });
}

function launchProjectMenu() {
	var largura = $(window).width();
	var altura = $(window).height();
	$('#project_menu').dialog({ width: largura - 200, height: altura - 200, draggable: false, resizable: false, 
											open: function(event, ui) { 
														$('.ui-dialog-titlebar-close').show();
														$('#proj_name_input').val(Utilizador.Email);
														$('#proj_desc_input').text(Utilizador.Name); 
													} 
										});
}

function addProjectWindow(){
	console.log("addProjectWindow -> vou chamar o dialog\n");
	$('#addProject_window').dialog(
							{ width: 450, height: 325, modal: true, resizable: false, closeOnEscape: true,
							  open: function(event, ui) { 
							  			//$('.ui-dialog-titlebar-close').hide(); 
							  		}
							});
}

function editProjectWindow(){
	$('#editProject_window').dialog(
							{ width: 450, height: 325, modal: true, resizable: false, closeOnEscape: true,
							  open: function(event, ui) { 
							  			//$('.ui-dialog-titlebar-close').hide();
										$('#editProject_window > #editProjectForm > #project_desc').value = Utilizador.Email;
										$('#editProject_window > #editProjectForm > #project_name').value = Utilizador.Name;
										
										console.log($('#addProjectForm > #project_desc').value +
														", "
														+ $('#addProjectForm > #project_name').value + ".");
							  		}
							});
	//console.log("editProjectWindow -> " + Utilizador.Email + " " + Utilizador.Name + "\n");
}

function fillProjectSelector(){
	$('#projectSelector').html("");
	$("<option value=\"\" disabled=\"disabled\">Jump to a project...</option>"
		+"<option value=\"\" disabled=\"disabled\">---</option>").appendTo("#projectSelector");
	for(proj in Utilizador.Projects)
		$("<option value='"+Utilizador.Projects[proj]+"'>"+Utilizador.Projects[proj]+"</option>").appendTo("#projectSelector");
	
	$('#projectSelector').val(Utilizador.CurrentProject);
		// change the value on the title bar
	$("#projectName").text(" - " + Utilizador.CurrentProject);
}