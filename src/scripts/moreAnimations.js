import { randomPhraseCreator } from './randomPhraseCreator';

export var moreAnimations = (function() {

	function animateWordsOnto($placement) {

		let delay = 2;
		const initialCount = 8;
		let count = initialCount;
		let amount = 2;

		let gen = setInterval(function() {
				$placement.attr('data-before', randomPhraseCreator.getRandomPhrase(amount));
				$placement.attr('data-after', randomPhraseCreator.getRandomPhrase(amount));
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
		animateButton: animateButton
	}
})();