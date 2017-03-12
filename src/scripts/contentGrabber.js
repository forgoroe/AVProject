import { content } from './content';

export var contentGrabber = (function(){
	var contentGrabbed = 0;
	
	function giveNext(id){
		if(id){
			return content.find((item)=>item.id == id);
		} else{
			if(contentGrabbed < content.length){
			contentGrabbed++;
			return content[contentGrabbed];
		}
		}
	};

	function getContentLength(){
		return content.length -1;
	};

	return {
		giveNext: giveNext,
		getContentLength: getContentLength

	};
})();