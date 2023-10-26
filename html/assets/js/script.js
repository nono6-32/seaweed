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
	
		function PageTopAnime() {
			var scroll = $(window).scrollTop();
	
			if (scroll >= 200) {
				$topBtn.removeClass('DownMove').addClass('UpMove');
			} else {
				if ($topBtn.hasClass('UpMove')) {
					$topBtn.removeClass('UpMove').addClass('DownMove');
				}
			}
	
			var wH = window.innerHeight;
			var footerPos = $footer.offset().top;
	
			if (scroll + wH >= footerPos + 10) {
				var pos = scroll + wH - footerPos - 50;
				$topBtn.css('bottom', pos);
			} else {
				if ($topBtn.hasClass('UpMove')) {
					$topBtn.css('bottom', '30px');
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
	
		// 画面をスクロールしたら動かす
		$(window).scroll(function () {
			PageTopAnime();
		});
	
		// ページが読み込まれたらすぐに動かす
		$(window).on('load', function () {
			PageTopAnime();
			startAnimation(); // アニメーションを開始
	
			// 一定時間が経過したらアニメーションを停止
			setTimeout(function () {
				clearInterval(animationInterval);
			}, animationDuration);
		});
	
		function PageTopAnime() {
			var scroll = $(window).scrollTop();
			var $main = $('main'); 
			
			if (scroll >= 200) {
				$main.find('.top_btn').removeClass('DownMove').addClass('UpMove');
			} else {
				if ($main.find('.top_btn').hasClass('UpMove')) {
					$main.find('.top_btn').removeClass('UpMove').addClass('DownMove');
				}
			}
	
			var wH = window.innerHeight;
			var $footer = $main.find('.footer');
			var footerPos = $footer.offset().top;
	
			if (scroll + wH >= footerPos + 10) {
				var pos = scroll + wH - footerPos - 50;
				$main.find('.top_btn').css('bottom', pos);
			} else {
				if ($main.find('.top_btn').hasClass('UpMove')) {
					$main.find('.top_btn').css('bottom', '30px');
				}
			}
		}
	});
	
	

	//水面のアニメーション
    $(".ripples").ripples({
        dropRadius: 20,
        perturbance: 0.01,
        resolution: 1000,
        interactive: true,
        crossOrigin: ""
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