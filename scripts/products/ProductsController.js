document.body.onload = function(){
    $.post('../php/userCounter.php', 'os=' + window.platform.description + '&time=' + (new Date()).toString());
	$.post('../php/code.php', 'name=Oleg&username=admin', function(data){
		let categories = [];
		let categoryArr = data.substring(0, data.length - 1).split('!');
		for(let i of categoryArr){
			   let info = i.substring(0, i.length - 1).split('|');
			   if(info[1] && info[0])
					 categories.push(new category(
									 new bagsCollection(info[1].substring(0, info[1].length - 1).split('#'), '&', ['id', 'markersNprices', 'models']).collection, 
									 info[0]));
		}//parsing data
		for(let i of categories){
			let productsOfCurrentCategoty = [];
			for(let j of i.bagsArray){
				let arrayOfModels = j.models.split('; ');
				let listOfHooverModelsClassesObj = {
					textDiv : 'modelTextDiv',
					textModelCap : 'modelsCap',
					modelsListRow : 'modelListRow',
					modelsListCell : 'modelListCell',
					ulList : 'modelsList',
					liList : 'modelListElement'
				};
				let liListArray = [];
				for(let i of arrayOfModels)
					liListArray.push({textContent : i });
				let listOfHooverModelsProps = {
					textModelCap : {textContent : 'Подходящие модели пылесосов: '},
					liList : liListArray
				};
				let listOfHooverModels = constructTextList(arrayOfModels.length, 7, listOfHooverModelsClassesObj, undefined, listOfHooverModelsProps);
				
				let allMarkers = ['FB', 'FS', 'FF', 'FT', 'Змейка', 'Планка', 'FP_М', 'FP_Б'];
				let usefulMarkers = settingUsefulMarkers(j.markersNprices, allMarkers);
				let usefulMarkersToolTips = ['Одноразовые пылесборники из двухслойной фильтровальной бумаги', 
											 'Синтетические фильтровальные пакеты для одноразового использования', 
											 'Многоразовые пылесборники из двухслойного материала на флизилиновой основе.', 
											 'Многоразовые пылесборники из фильтровальной ткани', 
											 'Змейка', 'Планка', 'FP_М', 'FP_Б']; //fill
				
				let currentProductClasses = Object.assign({
					productDiv : 'product',
					modelInfoDiv : 'modelInfo',
					markersIdDiv : 'markerIdDiv',
					idDiv : 'idMarker',
                                        imgWrapper : 'imgWrapper',
					img : 'modelImg',
                                        buyButtonDiv : 'buyButtonDiv'
				}, usefulMarkers[0]);
				let currentProductProps = Object.assign({
					idDiv : {textContent : 'Модель: ' + j.id},
                                        buyButtonDiv : {textContent: 'Купить', NotInList: true}
				}, usefulMarkers[1]);
				let currentProductAttrs = {
                                        img : {src : '../imgs/server/bagNecks/' + j.id + '.gif',
                                               alt : 'Насадки для фильтровальных пакетов'},
                                        buyButtonDiv : {
                                               onclick : "window.parent.open('http://jewelfilter.zzz.com.ua/pages/offer.html?OfferedModel=" + j.id + "');"
                                        }
				};
				for(let i in usefulMarkers[0]) {
					
					let marker = usefulMarkers[0][i];
					let toolTip = usefulMarkersToolTips[allMarkers.indexOf(marker.split(' ')[1])];
					
					currentProductAttrs[marker] = { 
						
						title : toolTip,
						onclick : "document.location = 'http://jewelfilter.zzz.com.ua/pages/main.html';"
					};
				}
				productsOfCurrentCategoty.push(cunstructProduct(currentProductClasses, currentProductAttrs, currentProductProps, listOfHooverModels));
			}
			let wrapperClasses = {
				wrapper : 'wrapper'
			};
			let wrapperAttrs = {
				productsTable : {
					cellpadding : '0px', 
					cellspacing : '0px'
				}
			};
			let wrapperProps = { };
			let wrapper = constructWrapper(productsOfCurrentCategoty.length, 3, wrapperClasses, wrapperAttrs, wrapperProps, productsOfCurrentCategoty);
			$('#' + i.name).after(wrapper);
		}//building View
	});
}
