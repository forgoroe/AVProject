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
		window.scrollTo(0,0);

		insertSegment();
		
	};
	/**
	 * Start a timer at the beginning of each segment
	 * @return {undefined}
	 */
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
		let idOfPrevious; 
		let nextUp;
		
		idOfNext = contentGrabber.getContentGrabbed();
		idOfPrevious = idOfNext - 1;
		nextUp = contentGrabber.giveNext().text;
	
		preventAccident(idOfPrevious, idOfNext);

		//normalise autoNext timer
		resetAutoNext(defaultSecondsBeforeNext);
		
		//removing and re-adding element to restart css animation

		$('#' + idOfPrevious).removeClass('spaceMaker');

		let $contentSelector = setupper.setUpH3($('#main'), idOfNext);

		console.log("Section number: " + idOfNext);
	
		if ($contentSelector.attr('id') == 0) {
			$contentSelector.html(nextUp)
				.removeClass()
				.addClass('disable-select')
				.addClass('spaceMaker')
				.addClass('firstTurn');
		} else {
			$contentSelector.html(nextUp)
				.removeClass()
				.addClass('disable-select')
				.addClass('spaceMaker')
				.addClass('yourTurn');
		}

		if(document.getElementById(idOfNext)){ 
      		document.getElementById(idOfNext).scrollIntoView(); 
    	} 
	
		doMoreBasedOn($contentSelector);


	};

	function stop(){
		clearInterval(autoNext);
	};

	/**
	 * Prevents user from accidentally clicking next more than once; reload page if no more content available.
	 * @return {undefined}
	 */
	function preventAccident(idOfPrevious, idOfNext){
		unbindEventFrom($('#'+idOfPrevious));
		if(contentGrabber.contentIsAvailable()){
				setTimeout(()=>{
					bindEventToContent($('#'+idOfNext));
				},1800);
		} else {
			setTimeout(()=>{
				location.reload(false);
			}, defaultSecondsBeforeNext);
			
		}
	};

	/**
	 * Sets interval timer to call insertSegment sooner or later than default
	 * @param  {time in milliseconds}
	 * @return {[type]}
	 */
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
		$nodeToUnbind.off('click');
		$nodeToUnbind.off('keyup');
		
	};


	/** 
	 * Accepts a jQuery DOM element to regulate animations/timing based on its ID
	 * @param  {$selector}
	 * @return {[type]}
	 */
	function doMoreBasedOn($selector) {
		let timeBeforeNext = defaultSecondsBeforeNext;
		let stillAnimating;
		
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
						.css('animation-fill-mode', 'none');
				}, 4000);

				timeBeforeNext = 8 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '4':

				$selector.removeClass('spaceMaker');

				let $row = setupper.setUpRow($('.container'))
				let $col = setupper.setUpCol($row, 'secondary');
				let $h3 = setupper.setUpH3($col, 'extra');

				$h3.addClass('spaceMaker');
				moreAnimations.animateWordsOnto($h3);


				break;

			case '5':

				$selector.removeClass('spaceMaker');

				timeBeforeNext = 10 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '6':


				break;

			case '7':

				stop();
				setTimeout(rollPresentation, 1.7*1000);

				break;
			case '8':

				setTimeout(() => {
				   $selector.addClass('animated')
							.addClass('pulse')
							.css('animation-duration', '2s');
					}, 400);

				timeBeforeNext = 5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '9':

				timeBeforeNext = 1 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '10':

				timeBeforeNext = 1 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '11':

				timeBeforeNext = 1 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '12':

				timeBeforeNext = 1.5 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '13':

				timeBeforeNext = 3 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '14':

				timeBeforeNext = 4 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '15':

				timeBeforeNext = 5 * 1000;
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

			case '26':

			$selector.css('font-family', 'PT Serif, serif')
					 .css('font-style', 'italic');

			break;

			case '27':
			
				stop();
				rollPresentation();
				
			break;

			case '28':

			case '29':

			timeBeforeNext = 5 * 1000;
			resetAutoNext(timeBeforeNext);

			break;

		}
	};

	return {
		rollPresentation: rollPresentation
	};
})();