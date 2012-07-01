$(function(){
	brito = new $.britorize({
		el: $('h1'),
		konami: true
	});
	
	
	checkTime = function(){
		var d = new Date();
		var t = (d.getHours() < 10 ? d.getHours() + '0' : d.getHours()) + ':' + (d.getMinutes() < 10 ? d.getMinutes() + '0' : d.getMinutes());
		if (({'12:00':1, '13:00':1})[t] )
			brito.init('boatarde');
		if (({'18:00':1})[t] )
			brito.init('feito');
		
		setTimeout(checkTime,60000);
	}
	checkTime();
});