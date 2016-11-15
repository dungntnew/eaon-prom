<?php
   // 有効な定数名
   define('ABS_TOP_PATH', 'http://re-vue.biz/aeon/');
   define('ABS_UPLOAD_PATH', 'http://re-vue.biz/aeon/uploads/');
   define('ABS_SHARE_PATH', 'http://re-vue.biz/aeon/share.php');
   define('IMG_EXT', 'jpeg');


  if (isset($_GET['p'])) {
    $param = $_GET['p'];
    $id = $param;

    $text = "【ハイパーなおみジェネレーター】でハイパーな渡辺直美を作ってみたよ♪";
    $hashtags = "aeon";
    $shareimage = ABS_UPLOAD_PATH. "$id.".IMG_EXT;
    $shareurl = ABS_SHARE_PATH;

    $shareurl .= "?p=".urlencode($id);
    $shareurl .= "&text=".urlencode($text);
    $shareurl .= "&hashtags=".urlencode($hashtags);

    $tweetUrl = "https://twitter.com/share?url=";
    $tweetUrl .= rawurlencode($shareurl);
  }
?>

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
  <meta property="og:image" content="<?php echo $shareimage ?>" />
  <meta property="og:site_name" content="ハイパーなおみジェネレーター" />
  <meta property="og:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta property="fb:app_id" content="502744359762778" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ハイパーなおみジェネレーター | AEON.com" />
  <meta name="twitter:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta name="twitter:image:src" content="<?php echo $shareimage ?>" />
  <link href="https://ean-promotion.firebaseapp.com/static/css/main.ffe6ef20.css" rel="stylesheet">
<script>

// if (document.referrer.indexOf('http://ononama.sakura.ne.jp/')==0) {
// }
// else {
//   location.href='http://ononama.sakura.ne.jp/sample/naomi/';
// }

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
.check{
  max-width:250px;
  margin:10px auto;
  padding:10px;
  color:#666;
  border-radius:10px;
  background:#eee;
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
function reSize(){
  minH=$(window).height()-80;
  $('.howto-wrapper').css({'min-height':minH})
}
$(function(){


  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  $('.check').html('保存ボタンを押して、次の画面の画像を長押しで保存してください');
}else{
  $('.check').html('画像が自動保存できない場合は画像をドラッグ、または右クリックで「画像を保存」を選択してください');
}


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
      <div id="gene3">
        <div class="titleImage"><img class="ui" height="25px" src="http://ononama.sakura.ne.jp/sample/naomi/image/title_naomi_generator_fin.png" alt="GENERATOR"></div>
        <div class="ui hidden divider"></div>
        <div>
          <center>
          <img id="preview" src="<?php echo $shareimage ?>" alt="preview image"/>
          </center>

        </div>
        <p class="btnTweet"><a href="<?php echo $tweetUrl ?>" target="_blank">ツイートして応募する</a></p>
        <p class="save"><a href="<?php echo $shareimage ?>" download="<?php print("$param"); ?>.jpg" class="btn-dl to" target="_blank" >完成画像を保存する</a></p>
        <p class="check"></p>
        <p class="gotop"><a href="http://ononama.sakura.ne.jp/sample/naomi/">TOPへ戻る</a></p>
      </div>
      <div id="gene4">
      </div>
    </div>
    <div class="ui inverted vertical footer segment app-footer" style="height: 40px;">
      <p class="copyright">© 2016 AEON.com Co.,Ltd.</p>
    </div>
  </div>
</div>
</body>
</html>












<?php
   // 有効な定数名
   define('ABS_TOP_PATH', 'http://re-vue.biz/aeon/');
   define('ABS_UPLOAD_PATH', 'http://re-vue.biz/aeon/uploads/');
   define('ABS_SHARE_PATH', 'http://re-vue.biz/aeon/share.php');
   define('IMG_EXT', 'jpeg');


  if (isset($_GET['p'])) {
    $param = $_GET['p'];
    $id = $param;

    $text = "【ハイパーなおみジェネレーター】でハイパーな渡辺直美を作ってみたよ♪";
    $hashtags = "aeon";
    $shareimage = ABS_UPLOAD_PATH. "$id.".IMG_EXT;
    $shareurl = ABS_SHARE_PATH;

    $shareurl .= "?p=".urlencode($id);
    $shareurl .= "&text=".urlencode($text);
    $shareurl .= "&hashtags=".urlencode($hashtags);

    $tweetUrl = "https://twitter.com/share?url=";
    $tweetUrl .= rawurlencode($shareurl);
  }
?>

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
  <meta property="og:image" content="<?php echo $shareimage ?>" />
  <meta property="og:site_name" content="ハイパーなおみジェネレーター" />
  <meta property="og:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta property="fb:app_id" content="502744359762778" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ハイパーなおみジェネレーター | AEON.com" />
  <meta name="twitter:description" content="ハイパーなおみジェネレーター。サイバーウィークを盛り上げる、ハイパーな渡辺直美をいろんなパーツを組合せて自分好みに作れちゃうジェネレーターです！ハイパーな渡辺直美をつくって豪華プレゼントをゲットしよう！" />
  <meta name="twitter:image:src" content="<?php echo $shareimage ?>" />
  <link href="https://ean-promotion.firebaseapp.com/static/css/main.ffe6ef20.css" rel="stylesheet">
<script>

// if (document.referrer.indexOf('http://ononama.sakura.ne.jp/')==0) {
// }
// else {
//   location.href='http://ononama.sakura.ne.jp/sample/naomi/';
// }

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
.check{
	max-width:250px;
	margin:10px auto;
	padding:10px;
	color:#666;
	border-radius:10px;
	background:#eee;
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
.last{
	background: url(gene_img/bg1.gif);
}
#preview{
		height:500px;
		width:500px;
	}
#gene4{
	display:none;
	padding:0 0 30px 0;
}
.sTwiBtn{
	width:100%;
	margin:0 auto 60px auto;
	max-width:100%;
	text-align:center;
	background: url(gene_img/sns_twitter.png) no-repeat 5% #1da1f2;
	background-size: 30px;
	border-radius:10px;
}
.sTwiBtn a{
	line-height:20px;
	box-sizing:border-box;
	display:block;	
	padding:20px 15px;
	color:#fff;
	font-size:16px;
	font-weight:bold;
	background: url(gene_img/icon_btn.png) no-repeat 95%;
	background-size: 20px;
	max-width:100%;
	margin:0 auto;
}
.lastNaomi{
	margin:0 auto;
	width:100%;
	text-align:center;
	max-width:500px;
	vertical-align:baseline;
	padding:0;
}
.lastNaomi img{
	margin:0 auto;
	max-width:100%;
	display: block;
}
.lastBox{
	padding:30px 30px 30px 30px;
	box-sizing:border-box;
	background:#fff;
	margin:0 auto 0 auto;
	width:100%;
	max-width:500px;
}
@media screen and (max-width:769px) {
	#preview{
		height:250px;
		width:250px;
	}
	.lastNaomi{
		margin:0 auto;
		width:100%;
		text-align:center;
		max-width:250px;
	}
	.lastBox{
		max-width:300px;
	}
}

</style>

<script>
function reSize(){
	minH=$(window).height()-80;
	$('.howto-wrapper').css({'min-height':minH})
}
$(function(){
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	$('.check').html('保存ボタンを押して、次の画面の画像を長押しで保存してください');
}else{
	$('.check').html('画像が自動保存できない場合は画像をドラッグ、または右クリックで「画像を保存」を選択してください');
}

	
	reSize();
	$(window).on('resize',function(){
		reSize();
	});
	
	$('.btnTweet').on('click',function(){
		
		setTimeout(function(){
			$('#gene3').hide();
			$('#gene4').show();
			$('.howto-wrapper').addClass('last');
			$('#root').css({'background-color':'#fff'})
		},1000);
		
		
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
      <div id="gene3">
        <div class="titleImage"><img class="ui" height="25px" src="http://ononama.sakura.ne.jp/sample/naomi/image/title_naomi_generator_fin.png" alt="GENERATOR"></div>
        <div class="ui hidden divider"></div>
        <div>
          <center>
          <img id="preview" src="<?php echo $shareimage ?>" alt="preview image"/>
          </center>

        </div>
        <p class="btnTweet"><a href="<?php echo $tweetUrl ?>" target="_blank">ツイートして応募する</a></p>
        <p class="save"><a href="<?php echo $shareimage ?>" download="<?php print("$param"); ?>.jpg" class="btn-dl to" target="_blank" >完成画像を保存する</a></p>
        <p class="check"></p>
        <p class="gotop"><a href="http://ononama.sakura.ne.jp/sample/naomi/">TOPへ戻る</a></p>
      </div>
      <div id="gene4">
      	<div class="titleImage"><img class="ui" height="50px" src="gene_img/title_naomi_generator_twi.png" alt="twitterフォロー"></div>
        <div class="ui hidden divider"></div>
        <div class="lastNaomi"><img src="gene_img/naomi.png" alt="naomi"></div>
        <div class="lastBox">
        <p class="sTwiBtn mt20"><a href="https://twitter.com/aeon_japan?lang=ja" target="_blank">イオン公式Twitter<br class="spD">ページはこちら</a></p>
        <p class="gotop"><a href="http://ononama.sakura.ne.jp/sample/naomi/">TOPへ戻る</a></p>
        </div>
      </div>
    </div>
    <div class="ui inverted vertical footer segment app-footer" style="height: 40px;">
      <p class="copyright">© 2016 AEON.com Co.,Ltd.</p>
    </div>
  </div>
</div>
</body>
</html>





