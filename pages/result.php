
<?php
   // 有効な定数名
   // TODO: fix link of top page
   define('ABS_TOP_PATH', 'http://eaon-prom.fabbi.com.vn/');
   define('ABS_UPLOAD_PATH', 'http://dev-php.fabbi.com.vn/eaon-server/uploads/');
   define('ABS_SHARE_PATH', 'http://dev-php.fabbi.com.vn/eaon-server/share.php');
   define('IMG_EXT', 'png');


  if (isset($_GET['p']) && isset($_GET['t'])) {
    $param = $_GET['p'];
    $id = $param;

    $tid = $_GET['t'];

    $text = "【ハイパーなおみジェネレーター】でハイパーな渡辺直美を作ってみたよ♪
#ハイパーなおみジェネレーター http://eaon-prom.fabbi.com.vn/";
    $hashtags = "ハイパーなおみジェネレーター";

    $shareimage = ABS_UPLOAD_PATH. "$tid.".IMG_EXT;
    $downloadimage = ABS_UPLOAD_PATH. "$id.".IMG_EXT;
    $shareurl = ABS_SHARE_PATH;

    $shareurl .= "?p=".$id."&t=".$tid;
    //$shareurl .= "&text=".$text;
    //$shareurl .= "&hashtags=".$hashtags;

    $tweetUrl = "https://twitter.com/intent/tweet";
    $tweetUrl .= "?text=".urlencode($text);
    $tweetUrl .= "&url=".rawurlencode($shareurl);
  }
?>

<!DOCTYPE html>
<html lang="ja"><html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Fabbi ジェネレーター | Fabbi Dev Team </title>
<link rel="shortcut icon" href="/favicon.ico">
  <meta property="og:title" content="Fabbi ジェネレーター | Fabbi Dev Team" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="<?php echo 'http://'. $_SERVER['HTTP_HOST']. $_SERVER['REQUEST_URI']; ?>" />
  <meta property="og:image" content="<?php echo $shareimage ?>" />
  <meta property="og:site_name" content="Fabbi ジェネレーター | Fabbi Dev Team" />
  <meta property="og:description" content="Fabbi ジェネレーター | Fabbi Dev Team！" />
  <meta property="fb:app_id" content="162094920924270" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Fabbi ジェネレーター | Fabbi Dev Team" />
  <meta name="twitter:description" content="Fabbi ジェネレーター | Fabbi Dev Team" />
  <meta name="twitter:image:src" content="<?php echo $shareimage ?>" />
  <link href="http://eaon-prom.fabbi.com.vn/static/css/main.541a2155.css" rel="stylesheet">
<script>


</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<style>

.btnGoGen{
	text-align:center;
	color:#fff;
	max-width:250px;
	margin:10px auto;
	background:#0066cc;
	background-size: 30px;
	border-radius:10px;
}
.btnGoGen a{
  color: white;
  font-weight: bold;
	padding:15px 0;
	display:block;
}
.save{
	text-align:center;
	max-width:250px;
	margin:10px auto;
	border-radius:10px;
	background:#ff3399;
	color:#fff;
}
.save a{
	display:block;
	padding:10px 0;
}
.check{
	max-width:250px;
	margin:10px auto;
	padding:10px;
	color:#666;
	border-radius:10px;
	background:#eee;
}
.snsFun{
	max-width:250px;
	margin:10px auto;
	padding:10px;
	color:#666;
	border-radius:10px;
	background: #ffef00
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
	background: url(image/bg1.gif) !important;
}
#preview{
		height:500px;
		width:500px;
	}
#gene4{
	display:none;
	padding:0 0 30px 0;
}
#gene4{
	font-size:36px;
	background:#fff;
	position:fixed;
	display:none;
	width:84%;
	padding:60px;
	box-sizing:border-box;
	left:8%;
	top:3%;
	z-index:400000;
}


.sTwiBtn{
	width:100%;
	margin:0 auto 60px auto;
	max-width:100%;
	text-align:center;
	background: url(image/sns_twitter.png) no-repeat 5% #1da1f2;
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
	background: url(image/icon_btn.png) no-repeat 95%;
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
.overlay2 {
	content: '';
	visibility: hidden;
	position: fixed;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	background: transparent;
	-webkit-transition: all 0.5s ease;
	transition: all 0.5s ease;
	z-index: 300000;
}
.side-open2.overlay2 {
	visibility: visible;
	cursor: pointer;
	background: rgba(0, 0, 0, 0.8);
}
.close{
	-webkit-transition: all 0.5s ease;
	transition: all 0.5s ease;
  z-index:500000;
  bottom:0;
	opacity:0;
  right:0px;
  position:fixed;
  display:block;
  width:60px;
	height:60px;
  max-width:60px;
	background:#ff3399;
}
.close-trigger,
.close-trigger span {
	display: inline-block;
	transition: all .4s;
	box-sizing: border-box;
}
.close-trigger {
	position: relative;
	width: 60px;
  padding:20px;
	height: 61px;
}
.close-trigger span {
	position: absolute;
	left: 20px;
	width: 20px;
	height: 3px;
	background-color: #fff;
	border-radius: 0px;
}
.close-trigger span:nth-of-type(1) {
	top: 20px;
	-webkit-transform: translateY(9px) rotate(-45deg);
	transform: translateY(9px) rotate(-45deg);
}
.close-trigger span:nth-of-type(2) {
	bottom: 20px;
	-webkit-transform: translateY(-9px) rotate(45deg);
	transform: translateY(-9px) rotate(45deg);
}
.close.on{
	opacity:1;
}
.toContactlink{
    text-align: center;
    margin: 20px 0;
    padding-top: 15px;
    padding-bottom: 15px;
}
.toContactlink a {
    font-size: 10px;
    color: #000;
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
		padding:3%;
		max-width:300px;
	}
	.sTwiBtn{
		margin:0 auto 20px auto;
	}
	#gene4{
	width:94%;
	left:3%;
	padding:10px;
	height:auto;
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
	$('.check').html('「完成画像を保存する」を押して、次の画面で画像を長押しすると保存できます');
}else{
	$('.check').html('画像が自動保存できない場合は画像をドラッグ、または右クリックで「画像を保存」を選択してください');
}


	reSize();
	$(window).on('resize',function(){
		reSize();
	});




	$('#js__overlay2').on('click', function () {
		$('.close').removeClass('on');
		$('#js__overlay2').removeClass('side-open2');
		$('#gene4').removeClass('checks');
		$('#gene4').fadeOut(500);
	});
	$('.close').on('click', function () {
		$('.close').removeClass('on');
		$('#js__overlay2').removeClass('side-open2');
		$('#gene4').removeClass('checks');
		$('#gene4').fadeOut(500);
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
        <div class="titleImage"><img class="ui" height="25px" src="image/title_naomi_generator_fin.png" alt="GENERATOR"></div>
        <div class="ui hidden divider"></div>
        <div>
          <center>
          <img id="preview" src="<?php echo $downloadimage ?>" alt="preview image"/>
          </center>

        </div>
        <p class="btnGoGen"><a href="https://www.aeon.com/content/cyberweek/naomi/?bannerid=ac07_0Xu3Cgy2&exmid=OWN" target="_blank">オリジナルのハイパーなおみを<br/>作ってみる</a></p>
        <p class="save"><a href="<?php echo $downloadimage ?>" download="<?php print("$param"); ?>.jpg" class="btn-dl to" target="_blank" >完成画像を保存する</a></p>
        <p class="snsFun">保存した画像はフェイスブックやインスタグラム、LINEでも使ってね♪</p>
        <p class="check"></p>
        <p class="toContactlink"><a href="https://www.aeon.com/contact/">AEON.comに関するお問い合わせ</a></p>
      </div>
      <div id="gene4">
      	<div class="titleImage"><img class="ui" height="50px" src="image/title_naomi_generator_twi.png" alt="twitterフォロー"></div>
        <div class="ui hidden divider"></div>
        <div class="lastNaomi"><img src="image/naomi.png" alt="naomi"></div>
        <div class="lastBox">
        <p class="sTwiBtn mt20"><a href="https://twitter.com/aeon_japan?lang=ja" target="_blank">イオン公式Twitter<br class="spD">ページはこちら</a></p>
        <p class="gotop"><a href="https://www.aeon.com/content/cyberweek/naomi/?bannerid=ac07_bHKxf94k&exmid=OWN">TOPへ戻る</a></p>
        <p class="toContactlink"><a href="https://www.aeon.com/contact/">AEON.comに関するお問い合わせ</a></p>
        </div>
      </div>
    </div>
    <div class="ui inverted vertical footer segment app-footer" style="height: 40px;">
      <p class="copyright">© 2016 AEON.com Co.,Ltd.</p>
    </div>
  </div>
</div>
<div class="overlay2" id="js__overlay2">
</div>
<p class="close"> <span class="close-trigger" href=""> <span></span> <span></span> </span> </p>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-87809580-1', 'auto');
  ga('send', 'pageview');
</script>

</body>
</html>
