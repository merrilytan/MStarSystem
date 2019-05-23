<?php 
// $user = (object) [
//     'name' => 'Jane Doe',
//     'email' => 'janedoe@gmail.com',
//     'logged' => true
// ];


?>
<!doctype html>
<html lang="en">
    <head>
        <title>m*system</title>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/client/assets/css/style.css" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
    </head>
    <!-- <script type="text/javascript">
        var STATIC_URL = 'http://localhost/my-app';
        var myApp = {
            user : <?php echo json_encode($user); ?>,
            logged : <?php echo $user->logged; ?>
        };
    </script> -->
    <body>

        <div id="root"></div>

        <script type="text/javascript" src="/client/assets/bundle/main.bundle.js" ></script>
        
    </body>
</html>