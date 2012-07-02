/**
 * @fileoverview Venda.Widget.LightBox - Create an inpage popup using an iframe.
 *
 * The information displayed in a div element which is retrieved using AJAX. This information can
 * be a flash movie or a static image.
 * 
 * @requires /venda-support/js/external/yui/build/yahoo-dom-event/yahoo-dom-event.js  
 * @requires /venda-support/js/external/yui/build/dragdrop/dragdrop-min.js
 * @requires /venda-support/js/external/yui/build/container/container-min.js
 * @requires /venda-support/js/external/yui/build/connection/connection-min.js
 * @requires /venda-support/js/ajax.js
 * @requires /venda-support/js/external/swfobject.js
 * @requries resources/css/external/yui/container-skin.css
 * @author Aron San <asan@venda.com>
 */

//create LightBox namespace
Venda.namespace('Widget.Lightbox');

/**
 * Stub function is used to support JSDoc.
 * @class Venda.Widget.Lightbox
 * @constructor
 */
Venda.Widget.Lightbox = function(){
this.create = function(zoomHook, largeImgHook, settingstags) {
	this.settingstags = settingstags;
	this.zoomHook = zoomHook;
	this.largeImgHook = largeImgHook;
	//register listener for objects in 'ids' array
	YAHOO.util.Event.addListener(this.zoomHook,     "click", Venda.Widget.Lightbox.showImageware,this.settingstags);
	YAHOO.util.Event.addListener(this.largeImgHook, "click", Venda.Widget.Lightbox.showLargeImg,this.settingstags);

	//window onload events
	YAHOO.util.Event.addListener(window, "load", Venda.Widget.Lightbox.loadingPanel,this.settingstags);
};

};

/**
 * Temporary container to hold lightbox content - used to get lightbox content dimensions before displaying
 */
Venda.Widget.Lightbox.tempContainer = 'tempLightbox';

/**
 * Create a new lightbox object
 * @param {array} 	zoomHook specify which anchors will trigger a flash lightbox
 * @param {array} 	largeImgHook specify which anchors will trigger a image lightbox
 * @param {object} 	settings set settings for lightbox:
 *		- panel settings - draggable:boolean, modal:boolean, fixedCenter: boolean, fade: duration (in a whole or decimial number) 
 * 		- flash settings - flSource:string (url), flContainer:element which will hold the flash, flWidth:String, flHeight:String, flVer:Int , flBgColour:String (hexadecimal)
 * @tags {object} 	tags pass venda tags into js functions (invtname:string, redirect:string, loadmessage:string)
 */	


/**
 * Render flash movie using a flash detection script
 * @param {string} redirectTo a URL to redirect the user to if flash has not been detected successfully
 * @param {string} targetElem a target HTML element for the flash to be placed in
 */
Venda.Widget.Lightbox.renderFlash = function(objSettings) {
	var flSettings = objSettings;	
	var flParams = { wmode: 'opaque', bgcolor: flSettings.flBgColour };
	var flVars = { width: flSettings.flWidth, height: flSettings.flHeight, loop: false, quality: 'autohigh'};
	var flAttributes = { id: flSettings.flId };
	swfobject.embedSWF(flSettings.flSource, flSettings.flContainer, flSettings.flWidth, flSettings.flHeight, flSettings.flVer, false, flVars, flParams, flAttributes);	
};

/**
 * Show flash movie
 * A flash movie is displayed in a lightbox where the source of the movie is retrieved using AJAX 
 * @param {event} e used to suppress default link behaviour
 */
Venda.Widget.Lightbox.showImageware = function(e,objSettings) {
	YAHOO.util.Event.preventDefault(e); 	// suppress default link behaviour
	Venda.Widget.Lightbox.wait.show();
	ajaxFunction(this.href + '&layout=lightbox', Venda.Widget.Lightbox.tempContainer, undefined, function() {
		Venda.Widget.Lightbox.renderFlash(objSettings);
		Venda.Widget.Lightbox.popupContent = document.getElementById(Venda.Widget.Lightbox.tempContainer).innerHTML;
		
		//clear content of tempLightbox so that initial positioning of lightbox is not affected
		document.getElementById(Venda.Widget.Lightbox.tempContainer).innerHTML = "";
		
		//calling popupInvtContent() more than onces removes panel settings e.g. draggable 
		if (!Venda.Widget.Lightbox.imagePanel) {
			Venda.Widget.Lightbox.popupInvtContent(objSettings);
		} else {
			Venda.Widget.Lightbox.imagePanel.setHeader('<div class="tl"></div><span>'+ objSettings.invtname +'</span><div class="tr"></div>');
			Venda.Widget.Lightbox.imagePanel.setBody('<div class="lightBoxContent" class="lightBoxContentExtra">'+Venda.Widget.Lightbox.popupContent+'</div>');
		}
			
		//set dimensions - this is required for the lightbox header to appear correctly on IE
		var lightBoxElem = document.getElementById('lightboxcontent_panel');
		Venda.Widget.Lightbox.setContentDimensions(lightBoxElem);
		Venda.Widget.Lightbox.wait.hide();
		Venda.Widget.Lightbox.imagePanel.show();
		YAHOO.util.Event.addListener('closelightbox', 'click', Venda.Widget.Lightbox.lightboxHide, Venda.Widget.Lightbox.imagePanel, true);
	});
};

/**
 * Show image in lightbox
 * A image is displayed in a lightbox where the source of the image is retrieved using AJAX 
 * @param {event} e used to suppress default link behaviour
 */
Venda.Widget.Lightbox.showLargeImg = function(e,objSettings) {
	YAHOO.util.Event.preventDefault(e); // suppress default link behaviour
	Venda.Widget.Lightbox.wait.show();
	
	ajaxFunction(this.href + '&layout=lightbox', Venda.Widget.Lightbox.tempContainer, undefined, function () {
		var tempLb = document.getElementById(Venda.Widget.Lightbox.tempContainer);
		Venda.Widget.Lightbox.popupContent = tempLb.innerHTML;
		//clear content of tempLightbox so that initial positioning of lightbox is not affected
		tempLb.innerHTML = "";
		
		//calling popupInvtContent() more than onces removes panel settings e.g. draggable 
		if (!Venda.Widget.Lightbox.imagePanel) {
			Venda.Widget.Lightbox.popupInvtContent(objSettings);
		} else {
			Venda.Widget.Lightbox.imagePanel.setHeader('<div class="tl"></div><span>'+ objSettings.invtname +'</span><div class="tr"></div>');
			Venda.Widget.Lightbox.imagePanel.setBody('<div class="lightBoxContent" class="lightBoxContentExtra">'+Venda.Widget.Lightbox.popupContent+'</div>');
		}
	
		//set dimensions - this is required for the lightbox header to appear correctly on IE
		var lightBoxElem = document.getElementById('lightboxcontent_panel');
		Venda.Widget.Lightbox.setContentDimensions(lightBoxElem);
	
		Venda.Widget.Lightbox.wait.hide();
		Venda.Widget.Lightbox.imagePanel.show();
		YAHOO.util.Event.addListener('closelightbox', 'click', Venda.Widget.Lightbox.lightboxHide, Venda.Widget.Lightbox.imagePanel, true);
	});
};

/**
 * Initialise lightbox loading panel
 * Creates a div container which will display a loading message 
 */
Venda.Widget.Lightbox.loadingPanel = function (e,objSetting) {
	waitPanel = new YAHOO.widget.Panel("wait_panel", { fixedcenter: true, close: false, draggable: false, modal: true, visible: false, effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration: objSetting.fade} } );  
	waitPanel.setHeader('<div class="tl"></div><span>'+objSetting.loadmessage+'</span><div class="tr"></div>');
	waitPanel.setBody('<span id="loadPanelImg" class="loadPanelImgExtra"></span>');
	waitPanel.render(document.body);
	Venda.Widget.Lightbox.wait = waitPanel; //assign so it can be used within the namespace
};

/**
 * Initialise lightbox panel
 * Creates div containers which will display the lightbox contents and renders the lightbox
 */
Venda.Widget.Lightbox.popupInvtContent = function(objSettings) {
	var panelSettings = objSettings;
 	//alert(objTags);
	//create lightbox_holder - this needs to be a direct decendent of the body tag for modal option to work in IE
	var lightboxDiv = document.createElement("div");
	lightboxDiv.setAttribute('id','lightbox_holder');
	document.body.appendChild(lightboxDiv);
	
	// Instantiate a Panel from script
	var imagePanel = new YAHOO.widget.Panel("lightboxcontent_panel", { draggable: panelSettings.drag, modal: panelSettings.modal, fixedcenter: panelSettings.fixedCenter, constraintoviewport:true, visible: false, close: true,  effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration: objSettings.fade} } );
	imagePanel.setHeader('<div class="tl"></div><span>'+ objSettings.invtname +'</span><div class="tr"></div>');
	imagePanel.setBody('<div class="lightBoxContent" class="lightBoxContentExtra">'+Venda.Widget.Lightbox.popupContent+'</div>');
	imagePanel.render("lightbox_holder");
	imagePanel.hideEvent.subscribe(Venda.Widget.Lightbox.cleanUp);
		
	Venda.Widget.Lightbox.imagePanel = imagePanel; //assign so it can be used within the namespace
};

/**
 * Get content dimensions and set CSS style width and height properties accordingly
 * @param {String} lightBoxId	the id of element to get dimensions from
 * @returns {object} dimensions containing width and height
 */
Venda.Widget.Lightbox.setContentDimensions = function(lightBoxId) {
	var dimensions = { cWidth: lightBoxId.offsetWidth, cHeight: lightBoxId.offsetHeight }	;
	lightBoxId.style.width = dimensions.cWidth;
	lightBoxId.style.height = dimensions.cHeight;
	return dimensions;
};

/**
 * Hide lightbox popup and clean up
 */
Venda.Widget.Lightbox.lightboxHide = function(e) {
	YAHOO.util.Event.preventDefault(e); // suppress default link behaviour
	Venda.Widget.Lightbox.imagePanel.hide();
	Venda.Widget.Lightbox.cleanUp();
};

/**
 * Clean up
 * Remove eventListener and other clean up tasks
 */
Venda.Widget.Lightbox.cleanUp = function() {
	YAHOO.util.Event.removeListener('closelightbox', 'click');
	// hide flash - issue with swfobject detection script
	// var iw = document.getElementById(Venda.Widget.Lightbox.settings.flId);
	// if (iw){ iw.style.visibility = 'hidden'; }
};