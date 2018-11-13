function setEvents(idHead, idBody, buttonsPagesObj){
	let headerDocument = document.getElementById(idHead).contentDocument;
	let bodyWindow = document.getElementById(idBody).contentWindow;
	for(let i in buttonsPagesObj)
		headerDocument.getElementById(i).onclick = function(){
  		            bodyWindow.location = buttonsPagesObj[i];
		};
}
function mainLoaded(){
	setEvents('headIFrame', 
			  'bodyIFrame',
				 {'about' : '/pages/about.html',
				  'products' : '/pages/products.html',
				  'main' : '/pages/main.html'}
			 );
}