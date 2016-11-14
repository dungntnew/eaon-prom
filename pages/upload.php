<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dir = __DIR__;
        $uploaddir = $dir."/uploads/";
        $fileid = md5(date('Y-m-d H:i:s:u'));
        $filename = $fileid.'.jpeg';
        $filepath = $uploaddir.$filename;
        $file = $_POST['file'];
        $img = str_replace('data:image/jpeg;base64,', '', $file);

        file_put_contents($filepath, base64_decode($img));

        $json = array('filename' => $filename, 'fileid' => $fileid);
        echo json_encode($json);
    }
    else {
      $json = array('filename' => "bad day!");
      echo json_encode($json);
    }
?>
