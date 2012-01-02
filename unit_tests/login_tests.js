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

	var obj1 = new Object;
	obj1.id = '2';
	obj1.name = 'MADS';
	var obj2 = new Object;
	obj2.id = '23';
	obj2.name = 'Tracker';
	var obj3 = new Object;
	obj3.id = '24';
	obj3.name = '';
	var obj4 = new Object;
	obj4.id = '25';
	obj4.name = 'lo';

	// the test
	expect(4);
	strictEqual(typeof response['error'], "undefined", 'The error value should be undefined');
	equals(response['email'], 'mads@fe.up.pt', "The user email");
	deepEqual(response['projs'], new Array(obj1, obj2, obj3, obj4), "The list of projects that this user is a part of");
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
