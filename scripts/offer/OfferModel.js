function getId(){
	let id;
	$.ajax({ url : '../php/getId.php', method : 'POST', success : function(data){
		id = data;
	}, async : false });
	return id;
}
function createProductID(price){
	return price.replace(/\./g, '') + document.getElementById('checkedCount').value + Date.now();
}
class infoForm{
	constructor(count, cost){
		this._count = count;
		this._cost = cost;
	}
	get _cost(){
		return this.cost;
	}
	set _cost(val){
		this.cost = val;
	}
	get _count(){
		return this.count;
	}
	set _count(val){
		this.count= val;
	}
	get _price(){
		return this._cost * this._count;
	}
	set _price(val){
		return false;
	}
}