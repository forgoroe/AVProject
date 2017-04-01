import { content } from './content';

export var contentGrabber = (function(){
	var contentGrabbed = 0;
	
	function giveNext(id) {
		if (id && id < content.length) {
			return content.find((item) => item.id == id);
		} else {
			if (contentGrabbed < content.length - 1) {
				return content[++contentGrabbed];
			}
		}
	};
	function getContentLength(){
		return content.length -1;
	};

	function getContentGrabbed(){
		return contentGrabbed;
	}

	function contentIsAvailable(){
		return getContentGrabbed() < getContentLength();
	}

	return {
		giveNext: giveNext,
		getContentLength: getContentLength,
		getContentGrabbed: getContentGrabbed,
		contentIsAvailable: contentIsAvailable

	};
})();