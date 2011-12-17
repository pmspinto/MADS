function loginAction() {
	var email = document.getElementById('loginemail').value;
	
	var password = document.getElementById('loginpassword').value;
	
	ajax_login(email,password);
}

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
			
			$('#progress-dialog').dialog("destroy");
			
			if (typeof response['error'] === "undefined") {
				$('#welcomedialog').dialog("close");
				useremail = response['mail'];
				userprojs = response['projs'];
				username = response['name'];

				document.getElementById('logbutton').innerHTML = '<button id="logout_button" onclick="logoutAction();">Logout</button>';
				
				$("#logout_button").button();
				
				Utilizador = new User(useremail,username);
				Utilizador.CurrentProject = response['projs'][0];
				for(proj in response['projs'])
					Utilizador.addProject(response['projs'][proj]);
				console.log(Utilizador.CurrentProject+"\n");
				fillProjectSelector();
			}
			else{
				showErrorMsg("Error","Wrong email/password pair");
				}
		},
  
		error:function(){
			showErrorMsg("Error","Database isn't available.");
		}
	});
}

function logoutAction() {
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
					
	$('#progress-dialog').dialog({
		resizable: false,
		draggable: false,
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
	});	
}

function showErrorMsg(titulo,errorMessage){
	
	document.getElementById('error-dialog').innerHTML = errorMessage;
				
	$('#error-dialog').dialog({
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

function registerAction() {
	var email = document.getElementById('registeremail').value;
	var name = document.getElementById('registername').value;
	var password = document.getElementById('registerpassword').value;
	var cpassword = document.getElementById('registercpassword').value;
	
	if(password==cpassword) 
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
				loginAction();
			}
			// error message
			else	{
				showErrorMsg("Error",data);
			}
		});    

		}
	else showErrorMsg("","Passwords do not match");
}
