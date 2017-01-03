<?php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'test';
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
 
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>




 <?php
$servername = "moeza.xyz:3306";
$username = "moeza";
$password = "eW#J;(M(lX49";

// Create connection
$conn = new mysqli("moeza.xyz:3306", "moeza", "eW#J;(M(lX49", "moeza_Dealish");	

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?> 






<?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = mysqli_connect($servername, $username, $password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>