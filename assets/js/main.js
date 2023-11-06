/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$head = $('head'),
		$body = $('body');
	$width = 0;
	// 抓初始頁面的長寬比例_CMM
	rate = $("#originalpage").data("height") / $("#originalpage").data("width")
	function screenSmall() {
		if ($(window).width() > 1850) {
			width = 1850 * .875;
		}
		else {
			width = $(window).width() * .875;
		}
	}

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px'],
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	// Stops animations/transitions until the page has ...

	// ... loaded_CMM.載入的時候設定與長寬與iframe一樣(是針對looker.html_總覽指標)
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
		screenSmall()
		$("#originalpage").width(width);
		$("#originalpage").height(width * rate + 20);
		console.log("here");


	});

	//CMM_顯示更多

	var textContent = '';
	var textContentSub = '';
	var textContent2 = '';
	var textContent2Sub = '';
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
		textContent = $('#textContent').text();
		textContentSub = textContent.substr(0, 100) + '...';
		$('#textContent').text(textContentSub);

		textContent2 = $('#textContent2').text();
		textContent2Sub = textContent2.substr(0, 100) + '...';
		$('#textContent2').text(textContent2Sub);
	});

	// ... stopped resizing.
	var resizeTimeout;

	$window.on('resize', function () {

		// Mark as resizing.
		$body.addClass('is-resizing');

		// Unmark after delay.
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(function () {
			$body.removeClass('is-resizing');
		}, 100);

	});

	// Fixes.

	// Object fit images.
	if (!browser.canUse('object-fit')
		|| browser.name == 'safari')
		$('.image.object').each(function () {

			var $this = $(this),
				$img = $this.children('img');

			// Hide original image.
			$img.css('opacity', '0');

			// Set background.
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
				.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

		});

	// Sidebar.
	var $sidebar = $('#sidebar'),
		$sidebar_inner = $sidebar.children('.inner');

	// Inactive by default on <= large.
	breakpoints.on('<=large', function () {
		$sidebar.addClass('inactive');
	});

	// // 大於 large 則 remove 「隱藏sidebar」_CMM
	// breakpoints.on('>large', function () {
	// 	$sidebar.removeClass('inactive');
	// });

	// 大於 large 則 remove sidebar_CMM 但因為main.css會侷限高度，所以關起來
	breakpoints.on('>large', function () {
		$sidebar.addClass('inactive');
	});

	// Hack: Workaround for Chrome/Android scrollbar position bug.
	if (browser.os == 'android'
		&& browser.name == 'chrome')
		$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
			.appendTo($head);

	// Toggle.
	$('<a href="#sidebar" class="toggle">Toggle</a>')
		.appendTo($sidebar)
		.on('click', function (event) {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Toggle.
			$sidebar.toggleClass('inactive');
		});

	// Events.

	// Link clicks.
	$sidebar.on('click', 'a', function (event) {

		// >large? Bail.
		if (breakpoints.active('>large'))
			return;

		// Vars.
		var $a = $(this),
			href = $a.attr('href'),
			target = $a.attr('target');

		// Prevent default.
		event.preventDefault();
		event.stopPropagation();

		// Check URL.
		if (!href || href == '#' || href == '')
			return;

		// Hide sidebar.
		$sidebar.addClass('inactive');
		// Redirect to href.
		setTimeout(function () {

			if (target == '_blank')
				window.open(href);
			else
				window.location.href = href;

		}, 500);

	});

	// Prevent certain events inside the panel from bubbling.
	$sidebar.on('click touchend touchstart touchmove', function (event) {

		// >large? Bail.
		if (breakpoints.active('>large'))
			return;

		// Prevent propagation.
		event.stopPropagation();

	});

	// Hide panel on body click/tap.
	$body.on('click touchend', function (event) {

		// >large? Bail.
		if (breakpoints.active('>large'))
			return;

		// Deactivate.
		$sidebar.addClass('inactive');
		screenSmall();
		$("#originalpage").width(width);
		$("#originalpage").height(width * rate + 20);
	});

	// Scroll lock.
	// Note: If you do anything to change the height of the sidebar's content, be sure to
	// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

	$window.on('load.sidebar-lock', function () {

		var sh, wh, st;

		// Reset scroll position to 0 if it's 1.
		if ($window.scrollTop() == 1)
			$window.scrollTop(0);

		$window
			.on('scroll.sidebar-lock', function () {

				var x, y;

				// <=large? Bail.
				if (breakpoints.active('<=large')) {

					$sidebar_inner
						.data('locked', 0)
						.css('position', '')
						.css('top', '');

					return;

				}

				// Calculate positions.
				x = Math.max(sh - wh, 0);
				y = Math.max(0, $window.scrollTop() - x);

				// Lock/unlock.
				if ($sidebar_inner.data('locked') == 1) {

					if (y <= 0)
						$sidebar_inner
							.data('locked', 0)
							.css('position', '')
							.css('top', '');
					else
						$sidebar_inner
							.css('top', -1 * x);

				}
				else {

					if (y > 0)
						$sidebar_inner
							.data('locked', 1)
							.css('position', 'fixed')
							.css('top', -1 * x);

				}

			})
			.on('resize.sidebar-lock', function () {

				// Calculate heights.
				wh = $window.height();
				sh = $sidebar_inner.outerHeight() + 30;

				// Trigger scroll.
				$window.trigger('scroll.sidebar-lock');

			})
			.trigger('resize.sidebar-lock');

	});

	// Menu.
	var $menu = $('#menu'),
		$menu_openers = $menu.children('ul').find('.opener');

	// Openers.
	$menu_openers.each(function () {

		var $this = $(this);

		$this.on('click', function (event) {

			// Prevent default.
			event.preventDefault();

			// Toggle.
			$menu_openers.not($this).removeClass('active');
			$this.toggleClass('active');

			// Trigger resize (sidebar lock).
			$window.triggerHandler('resize.sidebar-lock');

		});

	});



	// 获取完整文本_CMM
	let fullText = $('.full-text').text();

	// 默认只显示截断后的文字
	let partialText = fullText.slice(0, 300) + '...';
	$('.full-text').hide().text(fullText);
	$('.partial-text').text(partialText).css('text-overflow', 'ellipsis');

	// 控制显示隐藏
	$('#toggle').click(function () {

		$('.full-text').toggle();
		$('.partial-text').toggle();

		if ($('.full-text').is(':visible')) {
			$(this).text('收起');
		} else {
			$(this).text('显示更多');
		}

	});


	let toggleText = '显示更多';

	$('#toggle').click(function () {

		// 切换元素显示隐藏

		if ($('.full-text').is(':visible')) {
			toggleText = '收起';
		} else {
			toggleText = '显示更多';
		}

		$(this).text(toggleText);

	});



	// CMM 点击链接时显示对应的iframe内容-績效獎金_CMM
	$("#link").click(function () {
		$sidebar.addClass("inactive");
		screenSmall();
		// 抓iframe在google looker studio中的長寬
		rate = 800 / 600;
		height = width * rate;

		$("#content").html('<iframe id="originalpage" width="' + width + '" height="' + width * height + '" src="https://lookerstudio.google.com/embed/reporting/84721898-a5e2-4d5c-94b8-105067527c43/page/YJdcD" frameborder="0" style="border:0" allowfullscreen"></iframe>'

		)
	})

	// CMM 点击链接时显示对应的iframe内容-YOUTUBE_CMM
	$("#link2").click(function () {
		$sidebar.addClass("inactive");
		screenSmall();
		// 抓iframe在google looker studio中的長寬
		rate = 967 / 600;
		height = width * rate;

		$("#content").html('<iframe id="originalpage" width="' + width + '" height="' + width * height + '" src="https://lookerstudio.google.com/embed/reporting/fc223d5d-283b-4128-b1e4-0543fe036d59/page/JgD" frameborder="0" style="border:0" allowfullscreen"></iframe>'

		)
	})


	// $("#test").click(function(){
	// 	console.log($("#test1").data("width"));
	// 	console.log($("#test1").data("height"))
	// 	rate=$("#test1").data("width")/$("#test1").data("height")

	// })

	// 根據不同的 media screen 的時候設定與長寬與iframe一樣(是針對looker.html_總覽指標)
	$window.on('resize', function () {
		screenSmall();
		$("#originalpage").width(width * 1);
		$("#originalpage").height(width * rate + 20);
		// console.log("no");
	});

	$(".toggle").on("click", function () {

		// 0.9? 0.875?
		if ($("#sidebar").hasClass("inactive")) {
			if ($(window).width() > 1850) {
				width = 1850 * .9;
			} else {
				width = $(window).width() * .9;
			}
			$("#originalpage").width(width);

		} else {
			if ($(window).width() > 2230) {
				width = 1850;
				$("#originalpage").width(width * .9);
			} else if ($(window).width() > 1850) {
				width = 1850;
				$("#originalpage").width(width * .675);
			} else if ($(window).width() > 1280) {
				width = $(window).width();
				$("#originalpage").width(width * .656);
			} else {
				width = $(window).width();
				$("#originalpage").width(width * .9);
			}

		}

		// $("#test1").height(width * rate + 20);
		// console.log("yes");
		// console.log(width);
	});


	//以下為顯示大範圍內容方法
	$('.moreButton').on('click', function () {
		$('#content').text(textContent);
		$('#scrollWord').slideDown();

	});
	$('.moreButton2').on('click', function () {
		$('#content').text(textContent2);
		$('#scrollWord').slideDown();

	});
	$('#x').on('click', function () {
		times = 0;
		console.log('close');
		$('#scrollWord').scrollTop(0);
		$('#scrollWord').slideUp();
		setTimeout(() => {
			$('#content').text('');
		}, 1000);
	});



})(jQuery)
