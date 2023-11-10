/* script.js */

$(function () {

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
});

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