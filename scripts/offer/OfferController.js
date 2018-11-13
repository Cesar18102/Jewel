let prices = [];
let offeredModel = document.location.href.split('=')[1];
let cityCodesArr = {};
let cityNewPostInput, addressNewPostInput, cityInput, addressInput;
$("#checkedPostWay").change(function(){
	switch(this.selectedIndex){
		case 0: 
			toggleDeliverWay(false);
			getDeliveryCost(document.getElementById('clientCityNewPost').value, parseInt(document.getElementById('checkedCount').value), this, document.getElementById('deliveryCost'));
			break;//УкрПочта
		case 1:
			toggleDeliverWay(true);
			getDeliveryCost(document.getElementById('clientCityNewPost').value, parseInt(document.getElementById('checkedCount').value), this, document.getElementById('deliveryCost'));
			break;//НоваяПочта
	}
});
$('#infoForm').submit(function(){
	let lastPrice = '' + getPrice(prices[document.getElementById('checkedMaterial').selectedIndex][0], document.getElementById('checkedCount').value);
	let offerId = createProductID(lastPrice);
	let infoFormSerialized = myFormSerialize(this);
	infoForm.hidden = true;
	sendMail('offer', infoFormSerialized + '&clientModel=' + offeredModel + '&price=' + lastPrice  + '&offerId=' + offerId + '&clientComment=' + document.getElementById('clientComment').value);
    document.location = "../php/afterOffer.php";
    /*this.hidden = true;
	if(!document.getElementById('24pay')){
		/*let payButton = document.createElement('button');
		payButton.id = '24pay';
		$(payButton).addClass('pay24But');

		let butIMG = document.createElement('img');
		butIMG.src = "../imgs/api_logo_1.jpg";
		payButton.appendChild(butIMG);

		payButton.onclick = function () {
			let id = getId();
			let requestData =   '<oper>cmt</oper>\n' +
								'<wait>0</wait>\n' +
							    '<test>0</test>\n' +
							    '<payment id="' + offerId + '">\n' +
				 				'    <prop name="b_card_or_acc" value="5168757332988916" />\n' +
								'    <prop name="amt" value="' + lastPrice + '" />\n' +
								'    <prop name="ccy" value="UAH" />\n' +
								'    <prop name="details" value="' + offeredModel + '" />\n' +
							    '</payment>';
			$.post("../php/getSign.php", "data=" + requestData, function (response) {
				let request = '<?xml version="1.0" encoding="UTF-8"?>\n' +
							  '<request version="1.0">\n' +
							  '    <merchant>\n' +
							  '        <id>' + getId() + '</id>\n' +
							  '        <signature>' + response + '</signature>\n' +
							  '    </merchant>\n' +
						      '    <data>\n' +
							  '        <oper>cmt</oper>\n' +
							  '        <wait>0</wait>\n' +
							  '        <test>0</test>\n' +
							  '        <payment id="' + offerId + '">\n' +
							  '            <prop name="b_card_or_acc" value="5168757332988916" />\n' +
							  '            <prop name="amt" value="' + lastPrice + '" />\n' +
							  '            <prop name="ccy" value="UAH" />\n' +
							  '            <prop name="details" value="' + offeredModel + '" />\n' +
							  '        </payment>\n' +
							  '    </data>\n' +
            				  '</request>';

                $.ajax({
					url : "https://api.privatbank.ua/p24api/pay_pb",
					method : 'POST',
					crossDomain : true,
					dataTyoe : 'text/xml',
					data : request,
					headers : 'Content-Type:application/xml, Origin:http://jewelfilter.zzz.com.ua',
					success : function(data) {
                        id = data;
                    }
                });*/

                /*var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
				let req = new XHR();

                //req.responseURL = "../php/parse24ans.php";
                req.open("POST", "https://api.privatbank.ua/p24api/pay_pb");
                req.setRequestHeader('Content-Type', 'application/xml');
                //req.setRequestHeader('Access-Control-Allow-Origin', 'jewelfilter.zzz.com.ua');
				req.send(request);*/

				/*$.post("https://api.privatbank.ua/p24api/pay_pb", "request=" + request, function (respData) {
					$.post("../php/parse24ans.php", respData);
                });
            });
        }
        document.getElementById('offerDiv').appendChild(payButton);
        //document.getElementById('offerDiv')
		let pay24form = new pay24Form({
				action : "https://api.privatbank.ua/p24api/ishop",
				method : "POST",
				id : '24pay',
				butClass : 'pay24But',
			}, [	{
						type : 'hidden',
						name : "amt",
						value : lastPrice
				}, {
						type : 'hidden',
						name : "ccy",
						value : "UAH"
				}, {
					type : 'hidden',
					name : "merchant",
					value : "HTGgetId()HTG"
				}, {
					type : 'hidden',
					name : "order",
					value : offerId
				}, {
					type : "hidden",
					name : "details",
					value : offeredModel 
				}, {
					type : "hidden",
					name : "ext_details",
					value : "description"
				}, {
					type : 'hidden',
					name : "pay_way",
					value : "privat24"
				}, {
					type : 'hidden',
					name : "return_url",
					value : "http://www.jewelfilter.zzz.com.ua/php/afterOffer.php"
				}, {
					type : 'hidden',
					name : "server_url",
					value : "http://www.jewelfilter.zzz.com.ua/php/parse24ans.php"
				}, {
					type : 'hidden',
					name : "state",
					value : "ок"
				}
			], {
				type : "submit",
			}, {
				src : "../imgs/api_logo_1.jpg",
				border : "0"
			}
		);
	}*/
	return false;
});
$(document).ready(function(){
    createNewPostInputs();
    createUkrPostInputs();
    document.getElementById('cityCell').appendChild(cityInput);
    document.getElementById('addressCell').appendChild(addressInput);
    $.post('../php/getModelInfo.php', 'id=' + offeredModel, function(data){
	let checkedMaterial = document.getElementById('checkedMaterial');
        let checkedCount = document.getElementById('checkedCount');
        let cost = document.getElementById('cost');
	let parsedData = data.split('&');
        let materials = parsedData[1].split('; ');
        document.getElementById('checkedModel').textContent = parsedData[0];
		for(let i of materials){
			prices.push(i.match(/\d+.?\d*/g));
			checkedMaterial.options.add(new Option(i.replace('-', ': ') + ' грн'));
		}
        checkedMaterial.onchange = function(){
			cost.textContent = getPrice(prices[this.selectedIndex][0], parseInt(checkedCount.value)) + ' грн';
		};
		checkedCount.onchange = function(){
			cost.textContent = getPrice(prices[checkedMaterial.selectedIndex][0], parseInt(this.value)) + ' грн';
			getDeliveryCost(document.getElementById('clientCityNewPost').value, parseInt(document.getElementById('checkedCount').value), document.getElementById('checkedPostWay'), document.getElementById('deliveryCost'));
		};
        checkedCount.onkeydown = function(event){
            if(!(/\d/.test(event.key)) && event.key != 'Backspace' && event.key != 'ArrowRight' && event.key != 'ArrowLeft')
                return false;
		};
		checkedCount.onkeyup = function(){
			cost.textContent = getPrice(prices[checkedMaterial.selectedIndex][0], parseInt(this.value)) + ' грн';
			getDeliveryCost(document.getElementById('clientCityNewPost').value, parseInt(document.getElementById('checkedCount').value), document.getElementById('checkedPostWay'), document.getElementById('deliveryCost'));
		};
        cost.textContent = getPrice(prices[checkedMaterial.selectedIndex][0], parseInt(checkedCount.value)) + ' грн';
    });
});
function getPrice(price, count){
	if(count && /^\d+$/.test(count))
		return (new infoForm(price, count))._price;
	return 0;
}
function sendMail(subject, mailTextObj){
	$.post('../php/mailSender.php', 'subject=' + subject + '&' + mailTextObj);
}
function toggleDeliverWay(isNewPost){
	toggleVisibility(document.getElementById('addressPrevText'));
	toggleVisibility(document.getElementById('newPostSectionPrevText'));
        let cityCell = document.getElementById('cityCell');
        let addressCell = document.getElementById('addressCell');
        cityCell.removeChild(cityCell.children[0]);
        cityCell.appendChild(isNewPost? cityNewPostInput : cityInput);
        addressCell.removeChild(addressCell.children[0]);
        addressCell.appendChild(isNewPost? addressNewPostInput : addressInput);
     
}
function toggleVisibility(elem){
	elem.hidden = !elem.hidden;
}
function loadNewPostSections(cityName, newPostSectionsList){
	$.post('https://api.novaposhta.ua/v2.0/xml/', 
		`<?xml version="1.0" encoding="UTF-8" ?>
		<root>
		<modelName>AddressGeneral</modelName>
		<calledMethod>getWarehouses</calledMethod>
		<methodProperties>
		<Language>ru</Language>
		<CityName>` + cityName + `</CityName>
		</methodProperties>
		<apiKey>dd241a084bf7aac40afb045e818cfd96</apiKey>
		</root>`, 
		function(data){
			let info = data.children[0].children[1].children;
			newPostSectionsList.innerHTML = '';
			for(let i = 0; i < info.length; i++)
				newPostSectionsList.options.add(new Option(info[i].innerHTML.match(/<Description>.+<\/Description>/)[0].replace('<Description>', "").replace('</Description>', "")));
		}
	);
}
function myFormSerialize(formElem){
	let info = "";
	let infoChildren = $(formElem).find('.inputText');
	for(let i of infoChildren)
		info += i.name + "=" + i.value + "&";
	return info.substring(0, info.length - 1);
}
function getDeliveryCost(cityTo, count, deliveryWay, deliveryCostLabel){
	if(count && /^\d+$/.test(count)){
		if(deliveryWay.selectedIndex == 1)
			$.post('https://api.novaposhta.ua/v2.0/xml/',
				`<?xml version="1.0" encoding="UTF-8" ?>
				 <root>
				 <modelName>InternetDocument</modelName>
				 <calledMethod>getDocumentPrice</calledMethod>
				 <methodProperties>
				 <CitySender>db5c88e0-391c-11dd-90d9-001a92567626</CitySender>
				 <CityRecipient>` + cityCodesArr[cityTo] + `</CityRecipient>
				 <Weight>` + 1 * count + `</Weight>
				 <ServiceType>WarehouseWarehouse</ServiceType>
				 <Cost>0</Cost>
				 <CargoType>Cargo</CargoType>
				 <SeatsAmount>1</SeatsAmount>
				 </methodProperties>
				 <apiKey>dd241a084bf7aac40afb045e818cfd96</apiKey>
				 </root>`, function(data){
					 deliveryCostLabel.textContent = data.children[0].children[1].children[0].children[1].innerHTML + " грн";
			});
		if(deliveryWay.selectedIndex == 0)
			deliveryCostLabel.textContent = (10 + 0.2 * (200 * count / 100)) * 1.2 + ' грн';//(базовая цена + цена за 100 г * (вес пакета * количество / 100 г)) * ПДВ
	}
	else
		deliveryCostLabel.textContent = '0 грн';
}	
function createNewPostInputs(){
   cityNewPostInput = createInFormElem('select', 'clientCityNewPost', 'clientCityNewPost', '', 'inputText', '2');
   addressNewPostInput = createInFormElem('select', 'clientNewPostSection', 'clientNewPostSection', '', 'inputText', '3');

   $.post('https://api.novaposhta.ua/v2.0/xml/', 
		`<?xml version="1.0" encoding="utf-8"?>
		<file>
		<apiKey>dd241a084bf7aac40afb045e818cfd96</apiKey>
		<modelName>Address</modelName>
		<calledMethod>getCities</calledMethod>
		</file>`, 
		function(data){
			let info = data.children[0].children[1].children;
			for(let i = 0; i < info.length; i++){
				let cityName = info[i].innerHTML.match(/<Description>.+<\/Description>/)[0].replace('<Description>', "").replace('</Description>', "");
				cityNewPostInput .options.add(new Option(cityName));
				cityCodesArr[cityName] = info[i].innerHTML.match(/<Ref>.+<\/Ref>/)[0].replace('<Ref>', "").replace('</Ref>', "");
			}
			loadNewPostSections(cityNewPostInput.value, addressNewPostInput);
			$(cityNewPostInput).change(function(){
				loadNewPostSections(cityNewPostInput.value, addressNewPostInput);
				getDeliveryCost(cityNewPostInput.value, parseInt(document.getElementById('checkedCount').value), document.getElementById('checkedPostWay'), document.getElementById('deliveryCost'));
			});
		}
	);
}
function createUkrPostInputs(){
   cityInput = createInFormElem('input', 'clientCity', 'clientCity', 'Харьков', 'inputText', '2');
   addressInput = createInFormElem('input', 'clientPost', 'clientPost', 'ул. Вишневая, д. 56А, кв. 16', 'inputText', '3');
}
function createInFormElem(tag, id, name, placeholder, className, tabindex){
   let elem = document.createElement(tag);
   elem.id = id;
   elem.name = name;
   elem.placeholder = placeholder;
   elem.tabindex = tabindex;
   elem.required = true;
   $(elem).addClass(className);
   return elem;
}