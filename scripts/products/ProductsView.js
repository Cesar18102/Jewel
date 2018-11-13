function constructWrapper(productsCount, productsCountInRow, classesObj, attrs, props, productsArrayBuilded){
	let wrapper = creatingObj('div', classesObj['wrapper']);
	let center = creatingObj('center', undefined, wrapper);
	let productsTable = creatingObj('table', undefined, center, attrs['productsTable']);
	for(let i = 0; i < Math.ceil(productsCount / productsCountInRow); i++){
		let row = creatingObj('tr', undefined, productsTable);
		for(let j = 0; j < productsCountInRow && i * productsCountInRow + j < productsCount; j++){
			let cell = creatingObj('td', undefined, row);
			cell.appendChild(productsArrayBuilded[i * productsCountInRow + j]);
		}
	}	
	return wrapper;
}
function cunstructProduct(classesObj, attrs, props, textInfoBuilded){
	let productDiv = creatingObj('div', classesObj['productDiv']);
	let modelInfoDiv = creatingObj('div', classesObj['modelInfoDiv'], productDiv);
	let markersIdDiv = creatingObj('div', classesObj['markersIdDiv'], modelInfoDiv);
	for(let i in props)
                if(!props[i].NotInList)
    		       creatingObj('div', classesObj[i], markersIdDiv, attrs[classesObj[i]], props[i]);//markers&idDiv
        let imgWrapper = creatingObj('div', classesObj['imgWrapper'], modelInfoDiv);
        creatingObj('div', classesObj['buyButtonDiv'], imgWrapper, attrs['buyButtonDiv'], props['buyButtonDiv']);//buyButtonDiv
	creatingObj('img', classesObj['img'], imgWrapper, attrs['img']);//img
	productDiv.appendChild(textInfoBuilded);
	return productDiv;
}
function constructTextList(countOfModels, countOfModelsInCloumn, classesObj, attrs, props){
	textDiv = creatingObj('div', classesObj['textDiv'], undefined, undefined, undefined);
	creatingObj('text', classesObj['textModelCap'], textDiv, undefined, props['textModelCap']);//textModelCap
	let modelsListRow = creatingObj('div', classesObj['modelsListRow'], textDiv, undefined, undefined);
	for(let i = 0; i < Math.ceil(countOfModels / countOfModelsInCloumn); i++){
		let modelsListCell = creatingObj('div', classesObj['modelsListCell'], modelsListRow, undefined, undefined);
		let ulList = creatingObj('ul', classesObj['ulList'], modelsListCell, undefined, undefined);
		for(let j = 0; j < countOfModelsInCloumn && i * countOfModelsInCloumn + j < countOfModels; j++){
			creatingObj('li', classesObj['liList'], ulList, undefined, props['liList'][i * countOfModelsInCloumn + j]);
                        creatingObj('div', 'horText', ulList, undefined, undefined);
                }
	}
	return textDiv;
}
function creatingObj(tag, classNames, parentObj, attrs, props){
	let obj = document.createElement(tag);
	let $obj = $(obj);
	$obj.addClass(classNames);
	for(let i in attrs)
		$obj.attr(i, attrs[i]);
	for(let i in props)
		$obj.prop(i, props[i]);
	if(parentObj)
		parentObj.appendChild(obj);
	return obj;
}
function settingUsefulMarkers(currentMarkersList, exsitingBagMarkers){
	let listOfModels = currentMarkersList.replace(/-\d+\.?\d*/g, '').split('; ');
	let listOfModelsWithPrices = currentMarkersList.split('; ');
	let propsInfo = {};
	for(let i = 0; i < listOfModels.length; i++)
		propsInfo[listOfModels[i]] = {textContent : listOfModelsWithPrices[i].replace('-',': ') + ' грн'};
	let classNProps = [{}, propsInfo];
	for(let i of exsitingBagMarkers)
		if(listOfModels.indexOf(i) != -1){
			let modelMarkerFits = {};
			modelMarkerFits[i] = 'bagMarker ' + i;
			Object.assign(classNProps[0], modelMarkerFits);
		}
	return classNProps;
}