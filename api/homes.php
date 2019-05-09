<?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "mss"; 
$id = "";

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['REQUEST_URI'],'/'));


if (!$con) {
   // echo "<script type='text/javascript'>alert('ahhhh');</script>";
} else {
   // echo "<script type='text/javascript'>alert('yay');</script>";
}


switch ($method) {
    case 'GET':
      //$id = $_GET['id'];
      //echo "<script type='text/javascript'>alert('$id');</script>";+
      // if($id){
      //   $sql = "select * from contacts where id=$id"; 
      // } else {
        $sql = "select * from homes";
      //}
      //$sql = "select * from contacts".($id?" where id=$id":''); 
      //echo "<script type='text/javascript'>alert('$sql');</script>";
      break;
    case 'POST':
      $homeName = $_POST["home_name"];
      $primaryFirstName = $_POST["primary_first_name"];
      $primaryLastName = $_POST["primary_last_name"];

      $sql = "insert into homes (home_name, primary_first_name, primary_last_name) values ('$homeName', '$primaryFirstName', '$primaryLastName')"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();