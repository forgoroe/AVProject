import { setupper } from './setupper';
import { contentGrabber } from './contentGrabber';
import { moreAnimations } from './moreAnimations';

export var presentation = (function(){

	const defaultSecondsBeforeNext = 8 * 1000;
	var autoNext;
	var timer;

	function rollPresentation() {
		$('body').empty();
		const initialColumnId = 'main';

		setupper.setUpElements(initialColumnId);

		insertNextSegment();

	};

	function insertNextSegment() {
		//id assignment


		let idOfNext = contentGrabber.getContentGrabbed();

		let nextUp = contentGrabber.giveNext().text;

		let idOfPrevious = idOfNext - 1;

		
		unbindEventFrom($('body'));

		if(contentGrabber.contentIsAvailable()){
			//prevent user from accidentally clicking next more than once
			setTimeout(() => {
				bindEventToContent($('body'))
			}, 1000);

			//normalise autoNext timer
			resetAutoNext(defaultSecondsBeforeNext);
		}
		//removing and re-adding element to restart css animation

		$('#' + idOfPrevious).remove();

		let $contentSelector = setupper.setUpH3($('#main'), idOfNext);

		console.log("Section number: " + contentGrabber.getContentGrabbed());

		$contentSelector.html(nextUp)
			.removeClass()
			.addClass('disable-select')
			.addClass('yourTurn');

		doMoreBasedOn($contentSelector);

	};

	function resetAutoNext(secondsBeforeNext) {
		clearInterval(autoNext);
		if(contentGrabber.contentIsAvailable()){
			autoNext = setInterval(insertNextSegment, secondsBeforeNext);
		}
	};

	function bindEventToContent($nodeToBind) {
		$nodeToBind.addClass('pointerCursor');
		$nodeToBind.on('click', insertNextSegment);
	};

	function unbindEventFrom($nodeToUnbind) {
		$nodeToUnbind.removeClass('pointerCursor');
		$nodeToUnbind.addClass('defaultCursor');
		$nodeToUnbind.unbind('click');
	};


	//using setTimeOut to not overwrite the yourTurn animation or simply animate at a specific time
	function doMoreBasedOn($selector) {
		let timeBeforeNext = defaultSecondsBeforeNext;

		switch ($selector.attr('id')) {

			case '0':

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

				timeBeforeNext = 1 * 1000;
				resetAutoNext(timeBeforeNext);

				break;

			case '10':

				timeBeforeNext = 0.5 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '11':

				timeBeforeNext = 0.5 * 1000;
				resetAutoNext(timeBeforeNext);


				break;

			case '12':

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