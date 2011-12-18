function login_action() {
	//var email = $('#loginemail').value;
	//var password = $('#loginpassword').value;
	
	//usar ou estes tres hardcoded ou o de baixo
	email = "mads@fe.up.pt";
	name = "Mads2011";
	projects = [1, 3];
	
	
	//ajax_login(email, password);
	
	switchdialog(0);
	
	//Utilizador = new User(useremail,username);
	//Utilizador.CurrentProject = response['projs'][0];
	//for(proj in response['projs'])
		//Utilizador.addProject(response['projs'][proj]);
	//fillProjectSelector();
}

//TODO
function ajax_login(email,pw) {
	$.ajax({
		type: 'POST',
		url: 'ajax/login.php',
		data: { email: email, password: pw },
		
		beforeSend:function(){
			showProgressDialog();
		},
		success:function(data){
			var response = JSON.parse(data);
			
			
			
			if (response['username'] != null) {
				$('#welcomedialog').dialog("close");
				useremail = response['email'];
				userprojs = response['projects'];
				username = response['username'];
			}
			else {
				showErrorMsg("Error","Wrong email/password pair");
			}
		},
  
		error:function(){
			showErrorMsg("Error","Database isn't available.");
		}
	});
}

function logout_action() {
	//TODO fazer a chamada de ajax
	//ajax_logout();
	
	switchdialog(1);
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
	$('#progress_dialog').dialog({
		resizable: false,
		draggable: false,
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
	});	
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
		
	 $.post("ajax/register.php",{    
        email: email,
		name: name,
        password: password 
        },
		function(data) {
			
			if (data=="ok") {
				showErrorMsg("Success","You have been successfully registered. Welcome.");
				document.getElementById('loginemail').value = email;
				document.getElementById('loginpassword').value = password;
				login_action();
			}
			// error message
			else	{
				showErrorMsg("Error",data);
			}
		});    

		}
	else showErrorMsg("","Passwords do not match or you have blank fields");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}