
 <?php  
 //insert.php  
 //$connect = mysqli_connect("localhost", "root", "", "testing"); 
 $conn = new mysqli("localhost:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish"); 
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {  
      $first_name = mysqli_real_escape_string($connect, $data->email);       
      $last_name = mysqli_real_escape_string($connect, $data->password);  
      $query = "INSERT INTO tbl_user(email, password) VALUES ('$email', '$password')";  
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error';  
      }  
 }  
 ?> 