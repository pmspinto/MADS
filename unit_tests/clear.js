function clearDB(){
	$.post(
	Config.server + "unit_tests/clearDB.php",
	clearDBSuccessCallBack);
}

function clearDBSuccessCallBack(data){
	if(data = "ok")
		console.log("successful DB clear");
	else
		console.log("there was a problem when clearing the DB");
}
