function testLoginAction(){

	// stop qunit
	stop();

	// the original code
	//var email = document.getElementById('loginemail').value;
	//var password = document.getElementById('loginpassword').value;
	
	// the test values
	var email = 'mads@fe.up.pt';
	var password = '12345';	
	
	ajax_login(email,password,testLoginSuccessCallback);
}

function testIncorrectLoginAction(){
	// stop qunit
	stop();
	// the test values
	var email = 'mads@fe.up.pt';
	var password = '1';	

	ajax_login(email,password,testIncorrectLoginSuccessCallback);
}

function testIncorrectLoginAction2(){
	// stop qunit
	stop();
	// the test values
	var email = 'mads@up.pt';
	var password = '12345';	

	ajax_login(email,password,testIncorrectLoginSuccessCallback2);
}

// called when the login ajax call is successful inside a test
function testLoginSuccessCallback(data){
	// start qunit
	start();
	
	// parse the json string
	var response = JSON.parse(data);

	// the test
	expect(4);
	strictEqual(typeof response['error'], "undefined", 'The error value should be undefined');
	equals(response['email'], 'mads@fe.up.pt', "The user email");
	deepEqual(response['projs'], new Array('2', '23', '24', '25'), "The list of projects that this user is a part of");
	equals(response['name'], 'MADS 2011', "The name");
	
	// the original login success callback
	//loginSuccessCallback(data);
	
}

function testIncorrectLoginSuccessCallback(data){

	// start qunit
	start();
	
	// parse the json string
	var response = JSON.parse(data);

	// the test
	expect(1);
	equals(response['error'], 'Invalid login', 'This login will fail because it has a wrong password');
	

}

function testIncorrectLoginSuccessCallback2(data){

	// start qunit
	start();
	
	// parse the json string
	var response = JSON.parse(data);

	// the test
	expect(1);
	equals(response['error'], 'Invalid login', 'This login will fail because it has a wrong email');
	

}
