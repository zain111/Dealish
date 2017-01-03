<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("moeza.xyz:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");


$query="SELECT p_id,p_name,p_description,p_image_id,p_price FROM products where p_available=1 ";


	if(isset($_GET["category"]) && !empty($_GET["category"]) ){
		
		$cat = $_GET["category"];
		$cat = stripslashes($cat);
		$cat = $conn->real_escape_string($cat);
		$query=$query."and p_category like ".$cat." ";
		
	}
	
	if( isset($_GET["sort"]) && !empty($_GET["sort"]) ){
		
		$s = $_GET["sort"];
		if($s=="n"){$query.="order by p_name";}
		else ($s=="plh"){	$query.="order by p_distance";}
		//else if($s=="phl"){	$query.="order by p_price desc";}
	}

	
	

$result = $conn->query($query);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"p_id":"'  . $rs["p_id"] . '",';
    $outp .= '"p_name":"'   . $rs["p_name"]        . '",';
	$outp .= '"p_description":"'   . $rs["p_description"]        . '",';
	$outp .= '"p_image_id":"'   . $rs["p_image_id"]        . '",';
	$outp .= '"p_price":"'. $rs["p_price"]     . '"}';

	$outp = array("p_name" => $rs["name"], "p_description" => $rs["p_description"], "p_image" => $rs["p_image"]);	
}
$outp ='{"records":['.$outp.']}';
$outp2 = array("records" => $outp);	
			$conn->close();		
			$outp = json_encode($outp2);
			echo($outp);	
$conn->close();

?> 