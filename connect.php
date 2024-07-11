<?php
$FirstName = $_POST['firstname'];
$LastName = $_POST['lastname'];
$Email = $_POST['email'];
$Password = $_POST['password'];
$ConfirmPassword = $_POST['confirmpassword'];

//*connect to the database*//
$con = new mysqli('localhost', 'root', '', 'test');
if($con){
    echo"connection successful";
}else{
    $stmt = $con->prepare("INSERT INTO users(firstname, lastname, email, password, confirm passwor)
    values(?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstName, $lastname, $email, $password, $confirmpassword );
    $stmt->execute();
    echo"registration successfully...";
    $stmt->close();
    $con->close();
} 



?>