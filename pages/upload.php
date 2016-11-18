<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dir = __DIR__;
        $uploaddir = $dir."/../uploads/";
        $fileid = uniqid();

        $filename = $fileid.'.png';
        $filepath = $uploaddir.$filename;

        $twfileid = 'tw_'.$fileid;
        $twfilename = $twfileid.'.png';
        $twfilepath = $uploaddir.$twfilename;

        $file = $_POST['file'];
        $twfile = $_POST['twfile'];
        $img = str_replace('data:image/png;base64,', '', $file);
        $twimg = str_replace('data:image/png;base64,', '', $twfile);

        file_put_contents($filepath, base64_decode($img));
        file_put_contents($twfilepath, base64_decode($twimg));

        $json = array('filename' => $filename, 'fileid' => $fileid, 'twfileid' => $twfileid);
        echo json_encode($json);
    }
    else {
      $json = array('filename' => "bad day!");
      echo json_encode($json);
    }
?>
