function copingObject(original){
	let copy = new Object();
	for(let i = 0; i < original.length; i++)
		for(let j in original[i])
			copy[j] = original[i][j];
	return copy;
}
function MainInit(){
	let $filtersPictures = $("#blue,#yellow,#red,#green");//objects to animate
	let $zoomDivs = $(".scaling");//objects to have a feature to scale
	let viewBuf = new MainView();//creating view
	
	let textScalingObj = { 'cssParamsNames' : ['transform=scale(?)'],
						   'attrs' : ['0,children,0,children,0,src=?'],
						   'duration' : 250,
						   'sectionsCount' : 2,
						   'type' : 'deadEnd'};//text scaling parameters
	let textScalingIn = copingObject([	textScalingObj, 
										{ values : [[1, 1.15]], 
										  attrsValues : [['../imgs/zoomin.png', '../imgs/zoomout.png']] }
									 ]);//text scaling in additional parameters
	let textScalingOut = copingObject([	 textScalingObj,
										 { values : [[1.15, 1]],
										   attrsValues : [['../imgs/zoomout.png', '../imgs/zoomin.png']] }
									  ]);//text scaling out additional parameters
						   
	let filterScalingObj = { 'cssParamsNames' : ['transform=scale(?)'],
							 'duration' : 250,
							 'sectionsCount' : 2,
							 'type' : 'deadEnd' };//filter animating parameters
	let filterScalingIn = copingObject([   filterScalingObj,
										   { values : [[1.15, 1.25]] }
									   ]);//filter animating growth additional parameters
	let filterScalingOut = copingObject([   filterScalingObj,
										   { values : [[1.25, 1.15]] }
									    ]);//filter animating getting smaller additional parameters
	
	let animationModel = new MainModel({'filtersScaleIn' : filterScalingIn,
										'filtersScaleOut' : filterScalingOut,
										'textScaleIn' : textScalingIn,
										'textScaleOut' : textScalingOut
									});//model parameters
	
	document.body.onload = function(){
		for(let i of $filtersPictures){
			let currentImg =  $(i);
			currentImg.attr('src', currentImg.attr('src').replace('.png', 'HD.png'));
		}
		$filtersPictures.mouseover(function(){
			if(!this.activity){
				this.activity = true;
				viewBuf.animateFilterImg(this, animationModel.parametersObject.filtersScaleIn);//animated object, name of animation
			}
		});
		$filtersPictures.mouseleave(function(){
				this.activity = true;
				viewBuf.animateFilterImg(this, animationModel.parametersObject.filtersScaleOut);//animated object, name of animation
		});
	}
	
	$zoomDivs.on('click', function(){
		$.post('../php/code.php', 'name=lol&surname=kekovich');
		if(!this.parentNode.activity){
			this.parentNode.activity = true;
			if(!this.zoomed)
				viewBuf.animateFilterImg(this.parentNode, animationModel.parametersObject.textScaleIn);//animated object, name of animation
			else
				viewBuf.animateFilterImg(this.parentNode, animationModel.parametersObject.textScaleOut);//animated object, name of animation
			this.zoomed = (this.zoomed == undefined)? true : !this.zoomed;
		}
	});
}
MainInit();
