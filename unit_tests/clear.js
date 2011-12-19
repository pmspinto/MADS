function clearDB(){
	$.post(
	Config.server + "unit_tests/clearDB.php",
	function(data){
		data = JSON.parse(data);

		if(data["status"] == "ok")
			console.log("successful DB clear");
		else
			console.log("there was a problem when clearing the DB");
	});
}

