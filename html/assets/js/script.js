/* script.js */
$(function () {
	$('.top_btn').click(function () {
		$('body,html').animate({
			scrollTop: 0//ページトップまでスクロール
		}, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
		return false;//リンク自体の無効化
	});
	//スクロールするとトップボタンが回転
	var rotate = function(logo, angle) {
		logo.css({
		"transform" : "rotate("+angle+"deg)"
		});
	}
	$(window).scroll(function(){
		rotate($(".top_btn"), $(window).scrollTop()*0.1);
	})

	//スクロールした際の動きを関数でまとめる
	function PageTopAnime() {

		var scroll = $(window).scrollTop(); //スクロール値を取得
		if (scroll >= 200){//200pxスクロールしたら
			$('.top_btn').removeClass('DownMove');		// DownMoveというクラス名を除去して
			$('.top_btn').addClass('UpMove');			// UpMoveというクラス名を追加して出現
		}else{//それ以外は
			if($('.top_btn').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
				$('.top_btn').removeClass('UpMove');	//  UpMoveというクラス名を除去し
				$('.top_btn').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
			}
		}
		
		var wH = window.innerHeight; //画面の高さを取得
		var footerPos =  $('.footer').offset().top; //footerの位置を取得
		if(scroll+wH >= (footerPos+10)) {
			var pos = (scroll+wH) - footerPos-50 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
			$('.top_btn').css('bottom',pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
		}else{//それ以外は
			if($('.top_btn').hasClass('UpMove')){//UpMoveというクラス名がついていたら
				$('.top_btn').css('bottom','30px');// 下から10pxの位置にページリンクを指定
			}
		}
	}

	// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
	});

	// ページが読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
	});

	jQuery(document).ready(function ($) {
		var bArray = [];
		var sArray = [8, 12, 17, 22, 30];
		var animationInterval;
		var animationDuration = 20000; // アニメーションの時間（ミリ秒）
	
		for (var i = 0; i < $('main').width(); i++) {
			bArray.push(i);
		}
	
		function randomValue(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}
	
		function startAnimation() {
			animationInterval = setInterval(function () {
				var size = randomValue(sArray);
				$('main').append(
					'<div class="bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>'
				);
	
				$('.bubble').animate({
					'bottom': '100%',
					'opacity': '-=0.7'
				}, animationDuration, function () {
					$(this).remove();
				});
			}, 350);
		}
	
		startAnimation(); // アニメーションを開始
	
		// 一定時間が経過したらアニメーションを停止
		setTimeout(function () {
			clearInterval(animationInterval);
		}, 20000); // 60秒後に停止（例）
	
	});
	

	//水面のアニメーション
    $(".ripples").ripples({
        dropRadius: 20,
        perturbance: 0.01,
        resolution: 1000,
        interactive: true,
        crossOrigin: ""
    });

	/* 下スクロール・上スクロール切り替え
	----------------------------------------------- */
	var startPos = 0;
	var winScrollTop = 0;
	$(window).on('scroll', function () {
		winScrollTop = $(this).scrollTop();
		if (winScrollTop >= startPos && winScrollTop > 0) {
			$('.g_hd').addClass('hide');
			$('.lang').addClass('hide');
		} else {
			$('.g_hd').removeClass('hide');
			$('.lang').removeClass('hide');
		}
		startPos = winScrollTop;
	});

	/* function:背景コンテンツ
	----------------------------------------------- */
	//背景コンテンツスクロール固定
	function fn_scroll_fix() {
		scrollPosition = $(window).scrollTop();
		$('body').addClass('fixed').css({'top': -scrollPosition});
	}
	//背景コンテンツスクロール固定を解除
	function fn_scroll_move() {
		//$('body').removeClass('fixed').css({'top': 0});
		$('body').removeClass('fixed').css({'top':'' });
		window.scrollTo( 0 , scrollPosition );
	}


	/* SP用メニューgnav
	----------------------------------------------- */
    var scrollPosition;

	$('.g_nav .btn').click(function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.g_nav .panel').addClass('active').fadeIn();
			$('.lang .panel').removeClass('active').fadeOut();
			$('.lang .btn').removeClass('active');
			$("#overlay").fadeIn();
			fn_scroll_fix();
		} else {
			$('.g_nav .panel').removeClass('active').fadeOut();
			$("#overlay").fadeOut();
			fn_scroll_move();
		}
	});


/* PC用サイドメニュー
----------------------------------------------- */
    $('.sub-menu').on({
        'mouseenter': function () {
            $(this).addClass('is-active');
            $('.sub-menu-nav').addClass('sub_is-active');              
        },
        'mouseleave': function () {
            $(this).removeClass('is-active');
            $('.sub-menu-nav').removeClass('sub_is-active');        
        }
    });
    $('.sub-menu .close').on('click', function() {
        $('.sub-menu-nav').removeClass('sub_is-active');
    });  


    /* ftr_nav_sp
    ----------------------------------------------- */
    $("#ftr_nav_sp dt").on("click", function() {
        $(this).next().slideToggle();
        $(this).toggleClass("on");
    });  
    

	/* language
	----------------------------------------------- */
	$('.lang .btn').click(function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.lang .panel').addClass('active').fadeIn();
			$('.g_nav .panel').removeClass('active').fadeOut();
			$('.g_nav .btn').removeClass('active');
			$("#overlay").fadeIn();
		} else {
			$('.lang .panel').removeClass('active').fadeOut();
			$("#overlay").fadeOut();
		}
	});

	/* overlay
	----------------------------------------------- */
	$('#overlay').click(function () {
		
		if ($('.g_nav .btn').hasClass('active')) {
			$('.g_nav .btn').removeClass('active');
			$('.g_nav .panel').removeClass('active').fadeOut();
		}
		if ($('.lang .btn').hasClass('active')) {
			$('.lang .btn').removeClass('active');
			$('.lang .panel').removeClass('active').fadeOut();
		}
		$('.modal_parking').removeClass('active').fadeOut();
		$("#overlay").css({'background':'','z-index':'','opacity':''}).fadeOut();
		fn_scroll_move();
	});


	/* modal_parking
	----------------------------------------------- */
	$('.modal_parking_open').click(function () {
		$('.modal_parking').addClass('active').fadeIn();
		$("#overlay").css({'background':'#02354a','z-index':'1001','opacity':'.5'}).fadeIn('fast');
		if ($('.g_nav .btn').hasClass('active')) {
			$('.g_nav .btn').removeClass('active');
			$('.g_nav .panel').removeClass('active').fadeOut();
		}
	});
	
	//背景固定処理
	$('.g_nav .modal_parking_open').click(function () {
		fn_scroll_move();
	});
	$('.modal_parking_open').not('.g_nav').click(function () {
			fn_scroll_fix();
	});


	//function:モーダル閉じる処理
	function fn_close_modal() {
		$('.modal_parking').removeClass('active').fadeOut();
		$("#overlay").css({'background':'','z-index':'','opacity':''}).fadeOut();
		if ($('.g_nav .btn').not('active') && $('.modal_parking').hasClass('active')) {
			fn_scroll_fix();
		} else if ($('.g_nav .btn').hasClass('active') || $('.modal_parking').hasClass('active')) {
			fn_scroll_fix();
		} else {
			fn_scroll_move();
		}
	}

	$('.modal_parking .btn_close').click(function () {
		fn_close_modal();
	});

	$('.modal_parking .btn_go_map').click(function () {
		fn_close_modal();
    $(window).scrollTop($('#parking').offset().top);
	});


	/* gnav 現在地に.currentを付与
	----------------------------------------------- */
	var pageURL = location.pathname,
		pageURLArr = pageURL.split('/'), //パスを分割して配列化する
		pageURLArrCategory = pageURLArr[1]; //パスから第1階層を取得
		//console.log(pageURLArrCategory);
	$('.g_hd .g_nav .panel .main li a').each(function (i, v) {
		var selfhref = $(v).attr('href'),
			hrefArr = selfhref.split('/'), //href属性の値を分割して配列化する
			hrefArrCategory = hrefArr[1]; //href属性の第1階層を取得
		//パスの第1階層とhref属性の第1階層を比較して同じ値であればcurrentを付与する
				if (pageURLArrCategory === hrefArrCategory) {
			$(v).parent().addClass('current').find('img').attr('src', $(this).find('img').attr('src').replace('_blue', '_white'));;
		}
	});

	/* pagetop
	----------------------------------------------- */
	var pagetopBtn = $('#pagetop');	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			pagetopBtn.addClass('show');
		} else {
			pagetopBtn.removeClass('show');
		}
	});
	pagetopBtn.click(function () {
		$('body,html').animate({scrollTop: 0}, 600 ,'swing');
		return false;
	});
    $('.accordion_trigger').on('click',function(){
        var $self = $(this).closest('.accordion');
        if(!$self.hasClass('on')){
            $self.addClass('on');
            $self.find('.accordion_body').stop().slideDown(300);
        }else{
            $self.removeClass('on');
            $self.find('.accordion_body').stop().slideUp(300);
        }
    });
    
      //初期状態open
    $('.accordion.opened').addClass('on');
    $('.accordion.opened').find('.accordion_body').stop().slideDown(300);
    $('.accordion.opened').removeClass('opened');
});


/* 要素をふわっと表示
----------------------------------------------- */
window.onload = function () {
	scroll_effect();
	$(window).scroll(function () {
		scroll_effect();
	});

	function scroll_effect() {
		$('.effect_fade').each(function () {
			var elemPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > elemPos - windowHeight) {
				$(this).addClass('effect_scroll');
			}
		});
	}
  //matchHeight
    $('.tab_control li.tab .layout').matchHeight();
    $('.tbl_gradation dt').matchHeight();
    $('.box_style01 .cont').matchHeight();

  //Tabクリック時に発火
    $('#tab_control .tab').on('click',function(){
        $('.tbl_gradation dt').matchHeight();
        $('.box_style01 .cont').matchHeight();
    });

  //accordionクリック時に発火
    $('.accordion_trigger').on('click',function(){
        $('.tbl_gradation dt').matchHeight();
    });
};

$(function () {

	//TabPage
	var $tab = $('#tab_control .tab');
	var $tabpage = $('#tab_body .tabpage');
	$tab.on('click', function () {
		var index = $tab.index(this);
		$tab.removeClass('current');
		$tab.eq(index).addClass('current');
		$tabpage.css('display', 'none');
		$tabpage.addClass('transition').fadeOut(300, function () {
			$(this).removeClass('transition current');
		});
		$tabpage.eq(index).fadeIn(300, function () {
			$(this).addClass('current');
		});
	});

	//#以下を取得
	var hash = location.hash;
	//[#tab～]であるか確認
	hash = (hash.match(/^#tab\d+$/) || [])[0];
    tabchange(hash);


		function tabchange(hash){
		var $tab = $('#tab_control .tab');
		var $tabpage = $('#tab_body .tabpage');  
		//初期値を設定
		var tabname = 0
		var tabbar = 0

		//ハッシュタグがある場合
		if (!(hash == null || hash == 'undefined')) {
		//数字部分を割り出し
		tabname = hash.slice(4);
		tabbar = tabname - 1;
		}

		//コンテンツをすべて非表示
		$tabpage.css('display', 'none');
		//指定内容のみ表示
		$tabpage.eq(tabbar).fadeIn();
		//タブをすべてoff
		$tab.removeClass('current');
		//選択したタブのみon
		$tab.eq(tabbar).addClass('current');
	}

	const mySwiper = new Swiper('.swiper', {
		// Optional parameters
		loop: true,
		autoplay: {
			delay: 3000,
		},
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});
	
});