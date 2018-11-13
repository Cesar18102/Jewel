class pay24Form{
	constructor(formParams, inputParamsArr, buttonParams, imgParams){
		let pay24form = this.createElem('form', formParams, document.getElementById('offerDiv'));
		for(let i of inputParamsArr)
			this.createElem('input', i, pay24form);
		let payButton = this.createElem('button', buttonParams, pay24form);
		$(payButton).addClass(buttonParams.butClass);
		this.createElem('img', imgParams, payButton);
	}
	createElem(tag, props, elemParent){
		let elem = document.createElement(tag);
		for(let i in props)
			if(props[i].indexOf('HTG') == -1)
				elem[i] = props[i];
			else
				elem[i] = eval(props[i].replace(/HTG/g, ''));
		if(elemParent)
			elemParent.appendChild(elem);
		return elem;
	}
}