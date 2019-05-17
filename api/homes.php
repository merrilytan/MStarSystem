<?php

// Create Connection  ---------------------------------------------------------------------
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "mss"; 
$id = "";

$con = mysqli_connect($host, $user, $password, $dbname);

if (!$con) {
  // echo "<script type='text/javascript'>alert('ahhhh');</script>";
} else {
  // echo "<script type='text/javascript'>alert('yay');</script>";
}


// Deconstruct Request  ---------------------------------------------------------------------
$method = $_SERVER['REQUEST_METHOD'];
$request = trim($_SERVER['REQUEST_URI'],'/');
$pos = strrpos($request, '/');
$request_id = $pos === false ? $request : substr($request, $pos +1);


// Create SQL Statement  ---------------------------------------------------------------------
if ($method == 'GET' && $request_id == 'homeData') {
  $sql = "select * from homes";

} elseif ($method == 'GET' && $request_id != 'homeData') {
  $sql = "select * from homes where id=$request_id";

} elseif ($method == 'POST' && $request_id == 'homeData') {
  $home_name = $_POST["home_name"];
  $primary_first_name = $_POST["primary_first_name"];
  $primary_last_name = $_POST["primary_last_name"];
  $sql = "insert into homes (home_name, primary_first_name, primary_last_name) values ('$home_name', '$primary_first_name', '$primary_last_name')"; 

} elseif ($method == 'POST' && $request_id != 'homeData') {
  $update='';
  $count = 0;

  foreach($_POST as $key => $value) {
    if($count == 0){
      $update = "$key = '$value'";
    } else {
      $update = "$update, $key = '$value'";
    }
    $count++;
  }
  $sql = "update homes set $update where id=$request_id";
}


// run SQL statement ---------------------------------------------------------------------
$result = mysqli_query($con,$sql);


// die if SQL statement failed ---------------------------------------------------------------------
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}


// Return ---------------------------------------------------------------------
if ($method == 'GET' && $request_id == 'homeData') {
    echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    echo ']';

} elseif ($method == 'GET' && $request_id != 'homeData') {
  echo json_encode(mysqli_fetch_object($result));

} elseif ($method == 'POST' && $request_id == 'homeData') {
  $last_insert_id = $con->insert_id;
  $sql = "select * from homes where id=" . $last_insert_id;
  $newresult = mysqli_query($con,$sql);
    
  echo json_encode(mysqli_fetch_object($newresult));

} elseif ($method == 'POST' && $request_id != 'homeData') {
  $sql = "select * from homes where id=$request_id";
  $newresult = mysqli_query($con,$sql);
    
  echo json_encode(mysqli_fetch_object($newresult));

} else {
  echo mysqli_affected_rows($con);
}


// Close Connection ---------------------------------------------------------------------
$con->close();