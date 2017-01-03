<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");



		
		$conn = new mysqli("moeza.xyz:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");	
		
		
		$username=$_GET["un"];
		$email = $_GET["email"];
		$password=$_GET["ps"];
		$password=md5($password);
		
		$phone=$_GET["ph"];
		$address=$_GET["add"];
		
		
		// To protect MySQL injection for Security purpose
		
		//$username = stripslashes($username);
		//$password = stripslashes($password);
		//$phone = stripslashes($phone);
		//$address = stripslashes($address);
		
		
		
		//$username = mysql_real_escape_string($username);
		//$password = mysql_real_escape_string($password);
		//$phone = mysql_real_escape_string($phone);
		//$address = mysql_real_escape_string($address);
		
		
		$check="SELECT * FROM users WHERE username = '$username'";
		$rs = mysqli_query($conn,$check);
		$data = mysqli_fetch_array($rs, MYSQLI_NUM);
		
		if($data[0] > 1) {
			$outp='{"result":{"created": "0" , "exists": "1" }';
		}
		else{	
			$sql='INSERT INTO  users (username ,  email ,  password ,  phone ,  address ,  role ,  verified ) VALUES ("'.$username.'",  "'.$email.'",  "'.$password.'",  "'.$phone.'",  "'.$address.'",  "2", 1)';
			//echo $sql;		
			if ($conn->query($sql) === TRUE) {
				//$outp='{"result":{"created": "1", "exists": "0" }';
				$outp = array("result" => array("created" => "1", "exists" => "0"));
			} 
			else {
				echo $conn->error;
				$outp = array("result" => array("created" => "0", "exists" => "0"));
			}
		}
		$outp = json_encode($outp);
		echo $outp;
		
		$conn->close();	

?>  