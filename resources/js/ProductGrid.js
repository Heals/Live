/**
 * @fileoverview Venda.Widget.ProductGrid
 *
 * @requires /venda-support/js/Venda/Widget/invt_popup.js
 * @author Arunee Keyurawong <mayk@venda.com>
 */

//create namespace
Venda.namespace("Widget.ProductGrid");

//declare the variables 
Venda.Widget.ProductGrid.config = {
    att1Id : 'att1',
    att2Id : 'att2',
    att3Id : 'att3',
    att4Id : 'att4',
    exValue : 'co_disp-shopc',
    currsym : '',
    sell : '',
    was : '',
    msrp : '',
    save : '',    
    priceLabel : '',
    wasLabel :'',
    msrpLabel: '',
    savingLabel: '',
    priceDiv: '',
    wasDiv: '',
    msrpDiv: '',
    savingDiv: '',
    atrWas :'',
    atrSave:'',
    atrMsrp:''
};

/**
* Sets the values  
* Text strings for currency symbols, default sell text, was text, etc
*/
Venda.Widget.ProductGrid.setConfig = function (config) {
   for (eachProp in config) {
         Venda.Widget.ProductGrid.config[eachProp] = config[eachProp];
    }
};

/**
* Change attribute price, (price, was, msrp and save ) when mouse over on the attribute
* @param {string} sellatr this is the sell price 
* @param {string} wasatr this is the was price 
* @param {string} msrpatr this is the msrp price 
* @param {string}sevingatr this is the save price 
*/
Venda.Widget.ProductGrid.changeAtrPrice = function(sellatr,wasatr,msrpatr,savingatr) {

	if ((sellatr != '0.00') && (sellatr != '')) {	
        document.getElementById(Venda.Widget.ProductGrid.config.priceDiv).innerHTML = Venda.Widget.ProductGrid.config.currsym + sellatr;
    }
    if((wasatr !='0.00') && (wasatr !='')){
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrWas).style.display = 'block';
    	    document.getElementById(Venda.Widget.ProductGrid.config.wasDivLabel).innerHTML = Venda.Widget.ProductGrid.config.wasLabel;
    	    document.getElementById(Venda.Widget.ProductGrid.config.wasDiv).innerHTML = Venda.Widget.ProductGrid.config.currsym + wasatr;
    }else{
    	    document.getElementById(Venda.Widget.ProductGrid.config.wasDivLabel).innerHTML = '';
    	    document.getElementById(Venda.Widget.ProductGrid.config.wasDiv).innerHTML = '';
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrWas).style.display = 'none';
    }
    if((msrpatr !='0.00') && (msrpatr !='')){
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrMsrp).style.display = 'block';
    	    document.getElementById(Venda.Widget.ProductGrid.config.msrpDivLabel).innerHTML = Venda.Widget.ProductGrid.config.msrpLabel;
    	    document.getElementById(Venda.Widget.ProductGrid.config.msrpDiv).innerHTML = Venda.Widget.ProductGrid.config.currsym + msrpatr;
    }else{
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrMsrp).style.display = 'none';
    }
    if((savingatr !='0.00') && (savingatr !='')){
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrSave).style.display = 'block';
    	    document.getElementById(Venda.Widget.ProductGrid.config.savingDivLabel).innerHTML = Venda.Widget.ProductGrid.config.savingLabel;
    	    document.getElementById(Venda.Widget.ProductGrid.config.savingDiv).innerHTML = Venda.Widget.ProductGrid.config.currsym + savingatr;

    }else{
    	    document.getElementById(Venda.Widget.ProductGrid.config.atrSave).style.display = 'none';
    }
};
/**
* Change to default price
*/
Venda.Widget.ProductGrid.changeDefaultPrice = function() {

    document.getElementById(Venda.Widget.ProductGrid.config.priceDiv).innerHTML = Venda.Widget.ProductGrid.config.sell;

	document.getElementById(Venda.Widget.ProductGrid.config.wasDivLabel).innerHTML  = Venda.Widget.ProductGrid.config.wasLabel;
	document.getElementById(Venda.Widget.ProductGrid.config.wasDiv).innerHTML = Venda.Widget.ProductGrid.config.was;

	document.getElementById(Venda.Widget.ProductGrid.config.msrpDivLabel).innerHTML  = '';
	document.getElementById(Venda.Widget.ProductGrid.config.msrpDiv).innerHTML  = Venda.Widget.ProductGrid.config.msrp;

    document.getElementById(Venda.Widget.ProductGrid.config.savingDivLabel).innerHTML  = '';
    document.getElementById(Venda.Widget.ProductGrid.config.savingDiv).innerHTML  = Venda.Widget.ProductGrid.config.save;
};

/**
* Popup EMWBIS of each attribute
*/
Venda.Widget.ProductGrid.emailMePopup = function (){
	var oAllID = new Array();
	var j = 0;
	var oLinks2 = document.getElementById("grid").getElementsByTagName("a");
	for (var i = 0; i < oLinks2.length; i++) {
		if (oLinks2[i].id.indexOf("ln") == 0 && oLinks2[i].id.length > 2) {
			oAllID[j] = oLinks2[i].id;
			j++;
			
		}
	}
    Venda.Widget.Features.create(oAllID, 
    	{
    		drag: true, modal: false
      	}, 
      	{
    	  	loadmessage: 	document.getElementById('tag-loadmessage').innerHTML
    });

};

/**
* Set attribute value which it is selected to add to basket
* @param {string} sttrSku1 this is the value of attribute 1
* @param {string} sttrSku1 this is the value of attribute 2
* @param {string} sttrSku1 this is the value of attribute 3
* @param {string} sttrSku1 this is the value of attribute 4
*/
Venda.Widget.ProductGrid.setProduct = function(attrSku1,attrSku2,attrSku3,attrSku4) {
    document.getElementById(Venda.Widget.ProductGrid.config.att1Id).value = attrSku1;
    if(attrSku2!=""){
        document.getElementById(Venda.Widget.ProductGrid.config.att2Id).value = attrSku2;
    }
    if(attrSku3!=""){
        document.getElementById(Venda.Widget.ProductGrid.config.att3Id).value = attrSku3;
    }
    if(attrSku4!=""){
        document.getElementById(Venda.Widget.ProductGrid.config.att4Id).value = attrSku4;
    }
};

/**
* Add to basket function
* @param {string} qtyattr this is the amount of qty that it is added to basket
*/
Venda.Widget.ProductGrid.addProduct = function(qtyattr) {
    if(qtyattr!=undefined){
         document.form.qty.value=qtyattr;
    }
	
    document.form.ex.value= Venda.Widget.ProductGrid.config.exValue;
    document.form.submit();
};

/**
* Buy now function
* @param {string} qtyattr this is the amount of qty
*/
Venda.Widget.ProductGrid.buyProduct = function(qtyattr) {
    if(qtyattr!=undefined){
         document.form.qty.value = qtyattr;
    }
	document.form.ex.value= "co_wizr-shopcart";
	document.form.bklist.value= "";
	document.form.layout.value= "checkout";
    document.form.submit();
};


