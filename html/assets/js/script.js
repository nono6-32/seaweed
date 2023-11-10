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
	$(".hamburger").click(function () {//ボタンがクリックされたら
		$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
		$(".g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
		$(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
	});

	$(".g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
		$(".hamburger").removeClass('active');//ボタンの activeクラスを除去し
		$(".g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
		$(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
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
	
    //アコーディオンをクリックした時の動作
	$('.title').on('click', function() {//タイトル要素をクリックしたら
		$('.box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
		
		var findElm = $(this).next(".mobile-info");//タイトル直後のアコーディオンを行うエリアを取得
		
		if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
			$(this).removeClass('close');//クラス名を除去    
		}else{//それ以外は
			$('.close').removeClass('close'); //クラス名closeを全て除去した後
			$(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
			$(findElm).slideDown(500);//アコーディオンを開く
		}
	});

	//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
	$(window).on('load', function(){
		$('.zoo_box:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
		$(".open").each(function(index, element){	//openクラスを取得
			var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
			$(Title).addClass('close');				///タイトルにクラス名closeを付与し
			var Box =$(element).children('.mobile-info');	//openクラスの子要素boxクラスを取得
			$(Box).slideDown(500);					//アコーディオンを開く
		});
	});

	$(document).ready(function () {
		$('.zoo_box').click(function () {
		  // クリックされた画像以外の画像をフェードアウト
			$('.zoo_box').not(this).animate({ opacity: 0.5 }, 300);
	
		  // クリックされた画像をフェードイン
			$(this).animate({ opacity: 1 }, 300);
		});
	});
	$('.title').on('click', function() {
    var findElm = $(this).next(".mobile-info");
		if (!findElm.hasClass('active')) {
			$('.mobile-info.active').slideUp(500).removeClass('active'); // 開かれている mobile-info を閉じる
			findElm.addClass('active').slideDown(500); // クリックされた mobile-info を表示
		}
	});
	$('.title').on('click', function() {
		$('.box').removeClass('active'); // すべての mobile-info の表示を非アクティブにする

		var findElm = $(this).next(".mobile-info");

		if ($(this).hasClass('close')) {
			$(this).removeClass('close');
		} else {
			$('.close').removeClass('close');
			$(this).addClass('close');
			findElm.addClass('active'); // クリックされた mobile-info をアクティブにする
		}
	});

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
			$('.top_btn').css('bottom',pos);	//.top_btnに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
		}else{//それ以外は
			if($('.top_btn').hasClass('UpMove')){//UpMoveというクラス名がついていたら
				$('.top_btn').css('bottom','40px');// 下から10pxの位置にページリンクを指定
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

	// #page-topをクリックした際の設定
	$('.top_btn').click(function () {
	$('body,html').animate({
		scrollTop: 0//ページトップまでスクロール
	}, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
		return false;//リンク自体の無効化
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
});