<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if( isset($_GET["e"]) && isset($_GET["p"]) ){	
		if( !empty($_GET["e"])  && !empty($_GET["p"])  ){	
			$conn = new mysqli("moeza.xyz:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");						
			$email=$_GET["e"];		
			$password=$_GET["p"];				
			
			// To protect MySQL injection for Security purpose		
			$email = stripslashes($email);		
			$password = stripslashes($password);		
			$email = $conn->real_escape_string($email);		
			$password = $conn->real_escape_string($password);		
			$password = md5($password);		
			
			$query="SELECT username, email, phone, address  FROM users 
					where verified=1 and email like '".$email."' and password like '".$password."'";
				
					
			$result = $conn->query($query);		
			$outp = "";				
		
			if( $rs=$result->fetch_array(MYSQLI_ASSOC)) {			
				
				if ($outp != "") {$outp .= ",";}
					
				//$outp .= '{"username":"'  . $rs["username"] . '",';			
				//$outp .= '"email":"'   . $rs["email"]        . '",';			
				//$outp .= '"phone":"'   . $rs["phone"]        . '",';						
				//$outp .= '"address":"'. $rs["address"]     . '"}';
				
				$outp = array("username" => $rs["username"], "email" => $rs["email"], "phone" => $rs["phone"], "address" => $rs["address"]);	
			}	
			
			$outp2 = array("records" => $outp);	
			$conn->close();		
			$outp = json_encode($outp2);
			echo($outp);	
		}
	}
	
?>