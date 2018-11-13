class MainView{
	constructor(){
		this.animationStep = function animationStep(now, obj){
			
			let currentParameters = obj.elem.currentAnimation;
			let sectionsValues = currentParameters.values[currentParameters.cssParamsNames.indexOf(obj.prop)];
			let max = Math.max(...sectionsValues), min = Math.min(...sectionsValues);
			if(now > Math.max(...sectionsValues) || now < Math.min(...sectionsValues)){
				now = sectionsValues[0];
				return;
			}
			let info = obj.prop.replace(' ','').split('='), paramName = info[0], paramPattern = info[1].replace('?', now);
			let $elem = $(obj.elem);
			
			if(paramName != 'transform' || !obj.elem.style.transform)
				obj.elem.style[paramName] = paramPattern;
			else{
				let paramsFormed = obj.elem.style[paramName].split(' '), isParamExist = false;
				for(let i = 0; i < paramsFormed.length; i++)
					if(paramsFormed[i].substring(0, paramsFormed[i].indexOf('(')) == (info[1].substring(0, info[1].indexOf('(')))){
						paramsFormed[i] = paramsFormed[i].replace(/-?\d+\.?\d*/g, now);
						isParamExist = true;
						break;
					}
				obj.elem.style.transform = paramsFormed.join(' ') + (isParamExist? '' : ' ' + paramPattern );
			}
			if(currentParameters.attrs)
				for(let i = 0; i < currentParameters.attrs.length; i++){
					let chain = currentParameters.attrs[i].split(',');
					let path = $elem;
					for(let j = 0; j < chain.length - 1; j++)
						path = path[chain[j]];
					let pattern = chain[chain.length - 1].split('=');
					$(path).attr(pattern[0], pattern[1].replace('?', currentParameters.attrsValues[i][obj.options.index]));
				}
		}
	}
	animateFilterImg(animatedObject, animationParamsObj){
		animatedObject.currentAnimation = animationParamsObj;
		let $animatedObject = $(animatedObject);
		let animationOptions = [];
		for(let i = 0; i < animationParamsObj.sectionsCount; i++)
			animationOptions[i] = { step: this.animationStep, 
									duration: animationParamsObj.duration / animationParamsObj.sectionsCount ,
									index: i };
									
		if(animationParamsObj.type == 'deadEnd')//the animation stops on the last frame
			animationOptions[animationOptions.length - 1].complete = function(){animatedObject.activity = false;}
		
		for(let j = 0; j < animationParamsObj.sectionsCount; j++)
			$animatedObject.animate(this.creatingStepOptions(animationParamsObj, j), animationOptions[j]);
		
		switch(animationParamsObj.type){
			case 'reverse':
				animationOptions[0].complete = function(){animatedObject.activity = false;}
				for(let j = animationParamsObj.sectionsCount - 2; j >= 0; j--)
					$animatedObject.animate(this.creatingStepOptions(animationParamsObj, j), animationOptions[j]);
			break;//the animation turns back 

			case 'loop': 
				animationOptions[0].complete = function(){animatedObject.activity = false;}
				$animatedObject.animate(this.creatingStepOptions(animationParamsObj, 0), animationOptions[0]);
			break;//the animation jumps to the first frame 
		}
	}
	creatingStepOptions(currentParametersObject, currentSection){
		let nowStepOptions = new Object();
		for(let i = 0; i < currentParametersObject.cssParamsNames.length; i++)		
				nowStepOptions[currentParametersObject.cssParamsNames[i]] = currentParametersObject.values[i][currentSection];
		return nowStepOptions;
	}
}
