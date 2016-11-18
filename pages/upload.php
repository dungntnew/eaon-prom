<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dir = __DIR__;
        $uploaddir = $dir."/../uploads/";
        $fileid = uniqid();
        $filename = $fileid.'.png';
        $filepath = $uploaddir.$filename;
        $file = $_POST['file'];
        $img = str_replace('data:image/png;base64,', '', $file);

        file_put_contents($filepath, base64_decode($img));

        $json = array('filename' => $filename, 'fileid' => $fileid);
        echo json_encode($json);
    }
    else {
      $json = array('filename' => "bad day!");
      echo json_encode($json);
    }
?>
