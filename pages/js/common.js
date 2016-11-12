

$(function(){
	
	//ie11用
	$(function(){
		if($(window).width()>1080){
		$('div.swiper-wrapper').css({'transform':'translate3d(-1110px, 0px, 0px)'});
		}
	});
	
	$(window).on('resize',function(){
		hPos();
	});
	hPos();
	
	var itemHeight=0;
	var allHeight=0;
	$('.itemArea article').each(function(i) {
    if(2<i){
			$(this).css({'max-height':'0'}).addClass('off');
		}
		
		
  });
	//$('.itemArea').css({'height':itemHeight});
	
	/*ヘッドポジション*/
	function hPos(){
	if($(window).width()>1080){
			headPos=118;
		}else{
			headPos=50;
		}
		
	}
	
	/*クリック*/
	$('.more').on('click',function(){
		$('.itemArea article.off').css({'max-height':'9999px'}).removeClass('off');
		$(this).hide();
	});
	
	$('nav li').on('click',function(){
		cClass=$(this).attr('class');
		$('html,body').animate({scrollTop: $('#'+cClass+'').offset().top-headPos}, 500, 'swing');
	});

	$('.menu').on('click',function(){
		$('nav').toggleClass('on')
	});
	
	/*メニュー*/
	var $body = $('body');
	$('.menu a').on('click', function () {
		$('.menu a').toggleClass('active');
			$body.toggleClass('side-open');
			$('nav').slideToggle();
			
			return false;
	});
	$('#js__overlay').on('click', function () {
			$body.removeClass('side-open');
			$('.menu a').removeClass('active');
			$('nav').slideUp();
	});
	$('#js__close').on('click', function () {
			$body.removeClass('side-open');
			$('.menu a').removeClass('active');
			
			$('nav').slideUp();
	});
	
	/*topbtn*/
	$('.goTop').on('click',function(){
		$('html,body').animate({scrollTop: 0}, 500, 'swing');
	});
	
	/*poricy*/
	$('.pBtn').on('click',function(){
		$('.close').toggleClass('on');
		if($('.policy').hasClass('check')){
			$('.policy').fadeOut(500);
			$('#js__overlay2').removeClass('side-open2');
			$('.policy').removeClass('check');
		}else{
			$('#js__overlay2').addClass('side-open2');
			$('.policy').addClass('check');
			$('.policy').fadeIn(500);
			$('#js__overlay2').fadeIn(500);
		}
		return false;
	});
	$('#js__overlay2').on('click', function () {
		$('.close').removeClass('on');
		$('#js__overlay2').removeClass('side-open2');
		$('.policy').removeClass('check');
		$('.policy').fadeOut(500);
	});
	$('.close').on('click', function () {
		$('.close').removeClass('on');
		$('#js__overlay2').removeClass('side-open2');
		$('.policy').removeClass('check');
		$('.policy').fadeOut(500);
	});
	
	/*poricyCheck*/
	$('#top__Con .btnMain').on('click',function(){
		 if(!$("#checkbox01").prop('checked')) {
			 alert('利用規約に同意してください');
			 return false;
		 }
	});
	$('.playBox .btnMain').on('click',function(){
		 if(!$("#checkbox02").prop('checked')) {
			 alert('利用規約に同意してください');
			 return false;
		 }
	});
	
});


