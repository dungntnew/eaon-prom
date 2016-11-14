<?php
  if (isset($_GET['p'])) {
    $param = $_GET['p'];

    $id = $param;
/*
    $daydiff = (int)( ($id-1) / 40); //基準日からの日数を計算
    $daydiff = '+'. $daydiff. ' day';

    $std_date = strtotime('2016-11-10'); //基準日は11/10
    $date = date('Y年m月d日', strtotime($daydiff, $std_date)); //$daydiff日進めた日付を求める
*/
    
  } ?>
<!DOCTYPE html>
<html lang="ja"><html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Homepage - AEON</title>
<link rel="shortcut icon" href="/favicon.ico">
	<meta property="og:title" content="ハイパーなおみジェネレーター | AEON.com" />
  <meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo 'http://'. $_SERVER['HTTP_HOST']. $_SERVER['REQUEST_URI']; ?>" />
  <meta property="og:image" content="http://ononama.sakura.ne.jp/sample/naomi/<?php print("$id"); ?>.jpg" />
  <meta property="og:site_name" content="ハイパーなおみジェネレーター" />
  <meta property="og:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta property="fb:app_id" content="502744359762778" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ハイパーなおみジェネレーター | AEON.com" />
  <meta name="twitter:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta name="twitter:image:src" content="http://ononama.sakura.ne.jp/sample/naomi/<?php print("$id"); ?>.jpg" />
<link href="https://ean-promotion.firebaseapp.com/static/css/main.ffe6ef20.css" rel="stylesheet">
<script>

if (document.referrer.indexOf('http://ononama.sakura.ne.jp/')==0) {
}
else {
	location.href='http://ononama.sakura.ne.jp/sample/naomi/';
}
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<style>
.btnTweet{
	text-align:center;
	color:#fff;
	padding:15px 0;
	max-width:250px;
	margin:10px auto;
	background:#1da1f2;
	background-size: 30px;
	border-radius:10px;
}
.save{
	text-align:center;
	color:#fff;
	max-width:250px;
	margin:10px auto;
	border-radius:10px;
	background:#ff3399;
	padding:10px 0;
	color:#fff;
}
.btnTweet a,.save a{
	display:block;
	color:#fff;
	font-weight:bold;
}
.gotop{
	text-align:center;
	margin:20px 0;
	padding:0 0 20px 0;
}
.gotop a{
	font-size:18px;
	color:#ff3399;
}
.howto-wrapper{
	max-width:604px;
	margin: 0px auto;
	background-color: white;
}
#preview{
		height:500px;
		width:500px;
	}
@media screen and (max-width:769px) {
	#preview{
		height:250px;
		width:250px;
	}
}

</style>
				<script>
            // this function only use for development
            // remove it when merge code
						/*
            function prepareDummyData() {
                var ITEM_KEY = "AEON_NAOMI_GENERATOR_IMG_DATA";
                localStorage.setItem(ITEM_KEY, dummyData());
            }

            // demo load image when document ready
            function onLoaded() {
                console.log("window loaded.")
                // 1. prepare dummy data
                prepareDummyData();

                // 2. use data in local store demo show image
                showImage();

            }

            // load encoded image data from local storage and show
            function showImage() {
                var ITEM_KEY = "AEON_NAOMI_GENERATOR_IMG_DATA";
                var dataUrl = localStorage.getItem(ITEM_KEY);

                if (dataUrl) {
                    //var img = document.getElementById('preview');
                    //img.src = dataUrl;

                }else {
                    console.error("not found dataUrl with key: " + ITEM_KEY);
                }

            }
						*/
        </script>
<script>
function reSize(){
	minH=$(window).height()-80;
	$('.howto-wrapper').css({'min-height':minH})
}
$(function(){
	reSize();
	$(window).on('resize',function(){
		reSize();
	});
});


</script>
</head>
<body>
<div id="root">
  <div data-reactroot="" class="ui wrapper">
    <div class="ui inverted vertical header segment app-header" style="height: 40px;">
      <div class="logo"><img width="90" height="15" src="https://ean-promotion.firebaseapp.com/static/media/logo_aeon.59e67b0a.png" alt="LOGO"></div>
    </div>
    
    
    
    <div class="howto-wrapper">
      <div class="titleImage"><img class="ui" height="25px" src="http://ononama.sakura.ne.jp/sample/naomi/image/title_naomi_generator_fin.png" alt="GENERATOR"></div>
      <div class="ui hidden divider"></div>
      <div>
        <center>
        <img id="preview" src="http://ononama.sakura.ne.jp/sample/naomi/<?php print("$id"); ?>.jpg" alt="preview image"/>
        </center>
        
      </div>
      <p class="btnTweet"><a href="https://twitter.com/share?url=http%3a%2f%2fononama%2esakura%2ene%2ejp%2fsample%2fnaomi%2fshare.php%3Fp%3D<?php print("$param"); ?>&text=%e3%80%90%e3%83%8f%e3%82%a4%e3%83%91%e3%83%bc%e3%81%aa%e3%81%8a%e3%81%bf%e3%82%b8%e3%82%a7%e3%83%8d%e3%83%ac%e3%83%bc%e3%82%bf%e3%83%bc%e3%80%91%e3%81%a7%e3%83%8f%e3%82%a4%e3%83%91%e3%83%bc%e3%81%aa%e6%b8%a1%e8%be%ba%e7%9b%b4%e7%be%8e%e3%82%92%e4%bd%9c%e3%81%a3%e3%81%a6%e3%81%bf%e3%81%9f%e3%82%88%e2%99%aa&hashtags=aeon" target="_blank">ツイートして応募する</a></p>
      <p class="save"><a href="http://ononama.sakura.ne.jp/sample/naomi/<?php print("$param"); ?>.jpg" download="<?php print("$param"); ?>.jpg" class="btn-dl to" target="_blank" >完成画像を保存する</a></p>
      <p class="gotop"><a href="http://ononama.sakura.ne.jp/sample/naomi/">TOPへ戻る</a></p>
    </div>
    <div class="ui inverted vertical footer segment app-footer" style="height: 40px;">
      <p class="copyright">© 2016 AEON.com Co.,Ltd.</p>
    </div>
  </div>
</div>
</body>
</html>
 

