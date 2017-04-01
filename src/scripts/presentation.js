import { setupper } from './setupper';
import { contentGrabber } from './contentGrabber';
import { moreAnimations } from './moreAnimations';

export var presentation = (function(){

	const defaultSecondsBeforeNext = 8 * 1000;
	var autoNext;
	var timer;
	var nineThroughTwelve = '';

	function rollPresentation() {
		$('body').empty();
		const initialColumnId = 'main';

		setupper.setUpElements(initialColumnId);

		insertSegment();
	};

	function startTimer(){
		clearInterval(timer);
		let secondsPassed = 0;
		timer = setInterval(()=> console.log(++secondsPassed + " seconds"), 1000);
	};

	/**
	 * Inserts next segment.
	 * @param {Number} nextOrPrevious
	 * @return {undefined}
	 */
	function insertSegment() {
		
		startTimer();
		
		let idOfNext;
		let idOfPreviousToRemove; 
		let nextUp;
		
		idOfNext = contentGrabber.getContentGrabbed();
		idOfPreviousToRemove = idOfNext - 1;
		nextUp = contentGrabber.giveNext().text;
	
		//normalise autoNext timer
		resetAutoNext(defaultSecondsBeforeNext);
		
		unbindEventFrom($('body'));

		
		//removing and re-adding element to restart css animation
		$('#' + idOfPreviousToRemove).remove();

		let $contentSelector = setupper.setUpH3($('#main'), idOfNext);

		console.log("Section number: " + idOfNext);

		if ($contentSelector.attr('id') == 0) {
			$contentSelector.html(nextUp)
				.removeClass()
				.addClass('disable-select')
				.addClass('firstTurn');
		} else {
			$contentSelector.html(nextUp)
				.removeClass()
				.addClass('disable-select')
				.addClass('yourTurn');
		}
        window.scrollTo(0,(document.body.scrollHeight)*0.5);

		
		doMoreBasedOn($contentSelector);

		accidentPreventer();

	};

	function insertPrevious(){
		
	

	};

	function accidentPreventer(){
		//prevent user from accidentally clicking next more than once; reload page if no more content available.
		if(contentGrabber.contentIsAvailable()){
			setTimeout(() => {
				bindEventToContent($('body'))
			}, 1000);
		} else {
			setTimeout(()=>{
				location.reload(false);
			}, defaultSecondsBeforeNext);
			
		}
	};


	function resetAutoNext(secondsBeforeNext) {
		clearInterval(autoNext);
		autoNext = setInterval(insertSegment, secondsBeforeNext);
	};

	function bindEventToContent($nodeToBind) {
		$nodeToBind.addClass('pointerCursor');
		$nodeToBind.on('click', insertSegment);
		$nodeToBind.on('keyup', insertSegment);
	};

	function unbindEventFrom($nodeToUnbind) {
		$nodeToUnbind.removeClass('pointerCursor');
		$nodeToUnbind.addClass('defaultCursor');
		$nodeToUnbind.unbind('click');
		$nodeToUnbind.unbind('keyup');
		
	};


	//using setTimeOut to not overwrite the yourTurn animation or simply animate at a specific time
	function doMoreBasedOn($selector) {
		let timeBeforeNext = defaultSecondsBeforeNext;
		

		switch ($selector.attr('id')) {

			case '0':

				$('html').addClass('neutralBackground');
				$('body').addClass('neutralBackground');

				break;

			case '1':

				setTimeout(() => {
					$selector.addClass('animated')
						.addClass('bounce')
						.css('animation-duration', '3s')
				}, 2200);

				break;

			case '2':

				setTimeout(() => {
					$selector.addClass('animated')
						.addClass('shake')
						.css('animation-duration', '1.5s')
				}, 2000);


				resetAutoNext(timeBeforeNext);

				break;

			case '3':

				setTimeout(() => {
					$selector.addClass('animated')
						.addClass('fadeOutDown')
						.css('animation-duration', '4s')
				}, 4000);

				timeBeforeNext = 8 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '4':

				let $row = setupper.setUpRow($('.container'))
				let $col = setupper.setUpCol($row, 'secondary');
				let $h3 = setupper.setUpH3($col, 'extra');


				moreAnimations.animateWordsOnto($h3);


				break;

			case '5':

				timeBeforeNext = 10 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '6':



				break;

			case '7':

				timeBeforeNext = 3 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '8':

				setTimeout(() => {
					$selector.addClass('animated')
						.addClass('pulse')
						.css('animation-duration', '2s')
				}, 400);

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '9':

				nineThroughTwelve += $selector.html() + ' ';
				$selector.html(nineThroughTwelve)
						 .removeClass()
						 .addClass('disable-select')
						 .addClass('yourTurn');

				timeBeforeNext = 0.6 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '10':

				nineThroughTwelve += $selector.html() + ' ';
				$selector.html(nineThroughTwelve)
						 .removeClass()
						 .addClass('disable-select')

				timeBeforeNext = 0.6 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '11':

				nineThroughTwelve += $selector.html() + ' ';
				$selector.html(nineThroughTwelve)
						 .removeClass()
						 .addClass('disable-select')

				timeBeforeNext = 0.6 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '12':

				nineThroughTwelve += $selector.html() + ' ';
					$selector.html(nineThroughTwelve)
							 .removeClass()
							 .addClass('disable-select')

				timeBeforeNext = 1.5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '13':

				timeBeforeNext = 4 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '14':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '15':

				timeBeforeNext = 6 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '16':

				timeBeforeNext = 6 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '17':

				timeBeforeNext = 6 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '18':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '19':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '20':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '21':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '22':

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

		}
	};

	return {
		rollPresentation: rollPresentation
	};
})();