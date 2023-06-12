<?php
if (isset($_REQUEST['action'])) {
    $action = $_REQUEST['action'];
    require_once 'partials/User.php';
    $obj = new User();

    // Adding user action
    if ($action == 'adduser' && !empty($_POST)) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $photo = $_FILES['photo'];
        $playerid = (!empty($_POST['userId'])) ? $_POST['userId'] : "";
        $imagename = "";

        if (!empty($photo['name'])) {
            $imagename = $obj->uplaodPhoto($photo);
            $playerData = [
                'name' => $name,
                'email' => $email,
                'mobile' => $mobile,
                'photo' => $imagename,
            ];
        }else{
            $playerData = [
                'name' => $name,
                'email' => $email,
                'mobile' => $mobile,
            ];
        }

        ///if the id has then it will update otherwise not 
if($playerid){
    $obj->update($playerData,$playerid);
}else{
    $playerid = $obj->add($playerData);
}
    if (!empty($playerid)) {
            $player = $obj->getRow('id', $playerid);
            echo json_encode($player);
            exit();
        }
    }

    // Get count of users and get all users
    if ($action == 'getallusers') {
        $page = (!empty($_GET['page'])) ? $_GET['page'] : 1;
        $limit = 4;

        $start = ($page - 1) * $limit;
        $users = $obj->getRows($start, $limit);
        $userlist = (!empty($users)) ? $users : [];
        $total = $obj->getCount();
        $userArr = ['count' => $total, 'users' => $userlist];
        echo json_encode($userArr);
        exit();
    }
}

//action to perform eiting
// Action to perform editing
if ($action == "editusersdata") {
    $playerid = (!empty($_GET['id'])) ? $_GET['id'] : '';
    if (!empty($playerid)) {
        $user = $obj->getRow('id', $playerid);
        echo json_encode($user);
        exit();
    }
}
//deleted 
if ($action == 'deleteuser') {
    $userId = (!empty($_GET['id'])) ? $_GET['id'] : '';
    if (!empty($userId)) {
        $isDeleted = $obj->deleteRow($userId);
        if ($isDeleted) {
            $displayMessage = ['delete' => 1];
        } else {
            $displayMessage = ['delete' => 0];
        }
        echo json_encode($displayMessage);
        exit();
    }
}
if ($action == 'searchuser') {
    $queryString = (!empty($_POST['searchQuery'])) ? trim($_POST['searchQuery']) : '';
    $results = $obj->searchuser($queryString);
    echo json_encode($results);
    exit();
}





?>
