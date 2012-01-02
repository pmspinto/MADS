function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function login_action() {
	
	var email = $('#loginemail').val();
	var password = $('#loginpassword').val();
	
	showProgressDialog();
	ajax_login(email, password,loginSuccessCallback);
}

//TODO
function ajax_login(email,pw,successCallback) {
	$.ajax({
		type: 'POST',
		url: Config.server+'ajax/login.php',
		data: { email: email, password: pw },

		success:successCallback,
  
		error:function(){
			showErrorMsg("Error","Database isn't available.");
		}
	});
}

function logout_action() {
	//TODO fazer a chamada de ajax
	//ajax_logout();
	
	vgemail = null;
	vgname = null;
	vgprojects = null;
	currentProject = null;
	showProgressDialog();
	
	//switchdialog(1);
	location.reload(true);
}

function ajax_logout() {
	$.ajax({
  		url: "ajax/logout.php",
  		success: function(){
    		document.getElementById('logbutton').innerHTML = '<button id="login_button" onclick="$("#welcomedialog").dialog({ width: largura-200, height: altura-200, modal: true, resizable: false, closeOnEscape: false, open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }});">Login</button>';
    		
			$("#login_button").button();
    		$('#welcomedialog').dialog("open");  		
    		$("#mainMenu").dialog("close");
  		}
	});
}

function showProgressDialog(){				
	$('#progress_icon').show();	
}

function hideProgressDialog(){				
	$('#progress_icon').hide();	
}

function showErrorMsg(titulo,errorMessage){
	
	document.getElementById('error_dialog').innerHTML = errorMessage;
				
	$('#error_dialog').dialog({
		title: titulo,
		resizable: false,
		draggable: false,
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		buttons: {
			"Ok" : function () {
			$(this).dialog("close");
			}
		}
	});	
}

function register_action() {
	var email = document.getElementById('registeremail').value;
	var name = document.getElementById('registername').value;
	var password = document.getElementById('registerpassword').value;
	var cpassword = document.getElementById('registercpassword').value;
	
	if(password==cpassword && trim(email)!="" && trim(name)!="" && trim(password)!="") 
	{
		register_ajax(email, name, password, registerSuccessCallback);

	}else showErrorMsg("","Passwords do not match or you have blank fields");
}


function register_ajax(email, name, password, successCallback){
	$.post(
	Config.server + "ajax/register.php",
	{    
		email: email,
		name: name,
		password: password 
	},
	successCallback);   
}

// function called when the login ajax request is successful
function loginSuccessCallback(data){
	var response = JSON.parse(data);
	
	if (response['name'] != null) {
		$('#welcomedialog').dialog("close");
		vgemail = response['email'];
		vgprojects = response['projs'];
		vgname = response['name'];

		console.log(vgprojects);
		currentProject = new Project(vgprojects[0]['id']);

		//load tasks
		if(vgprojects.length > 0){
			$.ajaxSetup({async:false});
			currentProject.loadProjInfo();
			currentProject.loadProjTasks();
			$.ajaxSetup({async:true});
		}

		// remove the login window
		switchdialog(2);
	}
	else {
		showErrorMsg("Error","Wrong email/password pair");
	}
	

	// remove progress dialog
	hideProgressDialog();
}

// function called when the register ajax request is successful
function registerSuccessCallback(data){
	if (data=="ok"){
		showErrorMsg("Success","You have been successfully registered. Welcome.");
		document.getElementById('loginemail').value = email;
		document.getElementById('loginpassword').value = password;
		login_action();
	}else{
		// error message
		showErrorMsg("Error",data);
	}
}

// function to delete a task
function deleteTask(task_id){
	$.ajax({
  		url: "ajax/delTask.php",
		type: 'POST',
		data: { id: task_id },
  		success: function(){
			// Show popup telling the user it went well ??
    		console.log("DELETE SUCCESSFULL");
  		}
	});
}

// function to be called when adding or removing a certain task to the current project's sprint
function set_task_sprint(id,sprint){
	$.ajax({
		url: "ajax/setTaskSprint.php",
		type: 'POST',
		data: { id: id, sprint: sprint },
		success: function(){
			console.log("set task sprint successfull");
		}
	});
}

// function to be called when a task is considered done
function set_task_done(id,sprint){
	$.ajax({
		url: "ajax/setTaskDone.php",
		type: 'POST',
		data: { id: id, sprint: sprint },
		success: function(){
			console.log("set task done successfull");
		}
	});
}

// function to be called when the user clicks the button to advance the current sprint of the project
function next_sprint(){
	console.log("LOOL");
}
