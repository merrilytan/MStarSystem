<?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "reactdb"; 
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
        $sql = "select * from contacts";
      //}
      //$sql = "select * from contacts".($id?" where id=$id":''); 
      //echo "<script type='text/javascript'>alert('$sql');</script>";
      break;
    case 'POST':
      $name = $_POST["name"];
      $email = $_POST["email"];
      $country = $_POST["country"];
      $city = $_POST["city"];
      $job = $_POST["job"];

      $sql = "insert into contacts (name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')"; 
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
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();