import { phraseCreator } from './phraseCreator';

export var moreAnimations = (function() {

	function animateWordsOnto($placement) {

		let delay = 2;
		const initialCount = 8;
		let count = initialCount;
		let amount = 2;

		let gen = setInterval(function() {
				$placement.attr('data-before', phraseCreator.getNextInDictionary());
				$placement.attr('data-after', phraseCreator.getNextInDictionary());
				if (delay > 0) {
					delay--;
				} else {
					count--;
					if (count === -1) {
						clearInterval(gen);
						$placement.removeAttr('data-before');
						$placement.removeAttr('data-after');
					}
				}
			},
			1000);
	};

	function animateSubtitle($subtitle){
		let animationDelay = 4200;
		setTimeout(()=>{
			$subtitle.addClass('subtitleAnimation');
		},animationDelay);
	};

	function animateButton($button) {
		var text = '';
		var buttonAnimation = setInterval(function() {
			let currentValueLength = $button.text().length;
			let completeValueLength = 3;

			if (currentValueLength < completeValueLength) {
				text += '.';
			} else {
				text = '.';
			}
			$button.html(text);
		}, 700);

		return buttonAnimation;
	};

	return {
		animateWordsOnto: animateWordsOnto,
		animateButton: animateButton,
		animateSubtitle: animateSubtitle
	}
})();