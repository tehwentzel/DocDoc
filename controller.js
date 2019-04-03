$(document).ready(function(){
	console.log('loaded');
	
	$('.accountIcon').on('click', function(){
		if(this.id == 'plusIcon'){
			return;
		}
		var selected = this;
		var topPos = $('.accountIcon:first-child').css('top');
		console.log(top);
		$('.accountIcon').each(function(){
			if(this !==  selected){
				var toClear = this;
				$(this).animate({
					opacity: 0
				}, 200, function(){
						$(toClear).css('display', 'none');
				});
			}
		});
		$('.accountInfo').css('display', 'flex');
		$(this).css('cursor', 'default');
		$('#backArrowLeft').css({
			visibility: 'visible',
			cursor: 'pointer'
		});
	});
	
	$('#backArrowLeft').on('click', function(){
		$('.accountInfo').css('display', 'none');
		$('.accountIcon').animate({
			opacity: 1,
		}, 200, function(){
			$(this).css('display', 'flex');
			$(this).css('cursor', 'pointer');
		})
		$('#backArrowLeft').css({
			visibility: 'hidden',
			cursor: 'default'
		});
	});
	
	$('.tabButton').on('click', function(){
		$('.tabButton').toggleClass('activeTab', false);
		$(this).toggleClass('activeTab', true);
	});
});