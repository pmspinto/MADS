function testRegisterActionDifferentPasswords(){

	// the test values
	var email = "email@emailhost.com";
	var name = "user";
	var password = "password";
	var cpassword = "otherpassword";
	
	if(password==cpassword && trim(email)!="" && trim(name)!="" && trim(password)!="") 
	{
		ok(false, "The passwords are different so the program shouldn't reach this point");

	}else{
		ok(true, "The passwords are different so the program ends");
	}
	
}

function testRegisterActionEmptyEmail(){

	// the test values
	var email = "";
	var name = "user";
	var password = "password";
	var cpassword = "password";
	
	if(password==cpassword && trim(email)!="" && trim(name)!="" && trim(password)!="") 
	{
		ok(false, "The email is empty so the program shouldn't reach this point");

	}else{
		ok(true, "The email is empty so the program ends");
	}
	
}

function testRegisterActionEmptyName(){

	// the test values
	var email = "email@emailhost.com";
	var name = "";
	var password = "password";
	var cpassword = "password";
	
	if(password==cpassword && trim(email)!="" && trim(name)!="" && trim(password)!="") 
	{
		ok(false, "The name is empty so the program shouldn't reach this point");

	}else{
		ok(true, "The name is empty are different so the program ends");
	}
	
}

function testRegisterAndLogin(){

	// stop qunit
	stop();

	// the test values
	var email = "email@emailhost.com";
	var name = "new user";
	var password = "password";
	var cpassword = "password";
	
	if(password==cpassword && trim(email)!="" && trim(name)!="" && trim(password)!="") 
	{
		// restart
		register_ajax(email, name, password, testRegisterAndLoginSuccessCallback);

	}else{
		// restart
		start();
		ok(false, "fields are all valid so this point shouldn't be reached");
	}
	
}

function testRegisterAndLoginSuccessCallback(data){

	// restart qunit
	start();

	if (data=="ok"){
		ok(true, "data returned ok, so the registration process is finished");
		// stop qunit and call the ajax_login function
		stop();
		var email = "email@emailhost.com";
		var password = "password";
		ajax_login(email,password,testRegisterLoginSuccessCallback);
	}else{
		ok(false, "data didn't return ok");
	}
}

function testRegisterLoginSuccessCallback(data){
	// start qunit
	start();
	
	// parse the json string
	var response = JSON.parse(data);

	// the test
	expect(5);
	strictEqual(typeof response['error'], "undefined", 'The error value should be undefined');
	equals(response['email'], 'email@emailhost.com', "The user email");
	equal(response['projs'].length, 1, "The number of projects that this user is a part of(shoud have one, the tutorial)");
	equals(response['name'], 'new user', "The name");
}
