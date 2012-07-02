//create namespace
Venda.namespace("Ebiz");

//Description: Returns the value of a specified URL parameter
//Parameters:
//1. currURL = this is the URL which you wish to get the URL parameter value from
//2. urlParam = this is the name of the URL parameter you want to get the value for
//Returns: value for parameter specified urlParam.


Venda.Ebiz.setTrclass = function(){

	var fl = document.getElementsByTagName('tr');
	var a; var sw=0;
	for(a=0;a<fl.length;a++){
		if(fl[a].className=='firstline'){
		    fl[a].className='';
			if(sw==0){sw=1; fl[a].id='firstline';}
			}
		}
};

/**
 * Split a string so it can be displayed on multiple lines so it does not break display layout - used on order confirmation and order receipt page
 * @param {string} strToSplit string that needs to be split 
 * @param {Integer} rowLen length of row which will hold the string
 * @param {string} displayElem the html container which will display the splitted string
 */
Venda.Ebiz.splitString = function(strToSplit, rowLen, dispElem) {
	var stringlist = new Array();
	while (strToSplit.length > rowLen) {
	   stringlist.push( strToSplit.slice(0,rowLen));
	   strToSplit=strToSplit.substr(rowLen);
	}
	if (strToSplit.length) {
		stringlist.push(strToSplit);
	}
	document.getElementById(dispElem).innerHTML = stringlist.join('<br>');
};

 /**
 * A skeleton function for validating user extened fields - needs to be amended by the build team
 * @param {object} frmObj HTML form containing user extended field elements
 */
Venda.Ebiz.validateUserExtendedFields = function(frmObj) {
/*	if(frmObj) {
		if ( (frmObj.usxtexample1.checked==false) && (frmObj.usxtexample2.checked==false) && (frmObj.usxtexample3.checked==false))  {	
			alert("Please tick at least one checkbox");
			return false;
		}			
		return true;		
	} 
	return false;
*/
	if(frmObj){
			if(frmObj.usxthowhearus.value==""){
			alert("Please choose : Where did you hear about us?");
			frmObj.usxthowhearus.focus();
			return false;
			}
	
	}
	return true;
	
};