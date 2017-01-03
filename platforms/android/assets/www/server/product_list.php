<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("moeza.xyz:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");

$query = "Select * from products";
$result = $conn->query($query);

$mainoutput = array();

//while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    // echo $rs['p_name'];
    // echo "<br>";
     // if ($outp != "") {$outp .= ",";}
 //    $outp .= '{"p_id":"'  . $rs["p_id"] . '",';
 //    $outp .= '"p_name":"'   . $rs["p_name"]        . '",';
	// $outp .= '"p_description":"'   . $rs["p_description"]        . '",';
	// $outp .= '"p_image_id":"'   . $rs["p_image_id"]        . '",';
	// $outp .= '"p_price":"'. $rs["p_price"]     . '"}';

	//$outp = array("p_name" => $rs["p_name"],"p_description" => $rs["p_description"], "p_price" => $rs["p_price"]);
	//array_push($mainoutput, $outp);

//$outp2 = array("records" => $outp);
	
				    
//}

//$outp = json_encode($outp2);
//echo($outp);

if($result->num_rows>0){
while($row=$result->fetch_assoc()){
$mainoutput[]=$row;
  }
}
echo json_encode($mainoutput);


		


?>