<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET["n"]) && isset($_GET["un"])&& isset($_GET["ps"])&& isset($_GET["ph"])&& isset($_GET["add"])&& isset($_GET["pin"]) ){
	if( !empty($_GET["n"])  && !empty($_GET["un"])&& !empty($_GET["ps"])&& !empty($_GET["ph"])&& !empty($_GET["add"])&& !empty($_GET["pin"])  ){
	
		$conn = new mysqli("localhost:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");
		
		$name=$_GET["n"];
		$username=$_GET["un"];
		
		$password=$_GET["ps"];
		$password=md5($password);
		
		$phone=$_GET["ph"];
		$address=$_GET["add"];
		$pincode=$_GET["pin"];
		
		// To protect MySQL injection for Security purpose
		$name = stripslashes($name);
		$username = stripslashes($username);
		$password = stripslashes($password);
		$phone = stripslashes($phone);
		$address = stripslashes($address);
		$pincode = stripslashes($pincode);
		
		$name = mysql_real_escape_string($name);
		$username = mysql_real_escape_string($username);
		$password = mysql_real_escape_string($password);
		$phone = mysql_real_escape_string($phone);
		$address = mysql_real_escape_string($address);
		$pincode = mysql_real_escape_string($pincode);
		
		$check="SELECT * FROM users WHERE u_id = '$username'";
		$rs = mysqli_query($conn,$check);
		$data = mysqli_fetch_array($rs, MYSQLI_NUM);
		
		if($data[0] > 1) {
			$outp='{"result":{"created": "0" , "exists": "1" }';
		}
		else{	
			$sql = "INSERT INTO users VALUES ('$name', '$username', '$password', '$phone','$address' ,'$pincode',1 )";		
			if ($conn->query($sql) === TRUE) {
				$outp='{"result":{"created": "1", "exists": 0" }';
			} 
		}
		
		echo $outp;
		
		$conn->close();	
	}
}

?> 