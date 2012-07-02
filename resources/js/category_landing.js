$(document).ready(function(){
$('.acc_accordion_area').hide();
$('.acc_trigger:nth-child(1),.acc_trigger:eq(1),.acc_trigger:eq(2)').addClass('active').next().show();
$('.acc_trigger,.acc_trigger_gift').click(function(){
	if( $(this).next().is(':hidden') ) {
		$('.acc_trigger,.acc_trigger_gift').removeClass('active').next().slideUp();
		$(this).toggleClass('active').next().slideDown();
	}
	return false;
});
});

$(document).ready(function() {
	$(".slider_tab").show();
	$(".slider_tab a:first").addClass("active");
	var imageWidth = $(".window").width();
	var imageSum = $(".slider_carousel").size();
	var imageReelWidth = imageWidth * imageSum;
	$(".slider_carousel").css({'width' : imageReelWidth});
	rotate = function(){	
		var triggerID = $active.attr("rel") - 1;
		var image_reelPosition = triggerID * imageWidth;
		$(".slider_tab a").removeClass('active');
		$active.addClass('active');
		$(".slider_carousel").animate({ 
			left: -image_reelPosition
		}, 1000 );
	};
	rotateSwitch = function(){		
		play = setInterval(function(){
			$active = $('.slider_tab a.active').next();
			if ( $active.length === 0) { //If paging reaches the end...
				$active = $('.slider_tab a:first'); //go back to first
			}
			rotate(); //Trigger the paging and slider function
		}, 10000); //Timer speed in milliseconds (3 seconds)
	};
	rotateSwitch(); //Run function on launch
	$(".slider_carousel").hover(function() {
		clearInterval(play); //Stop the rotation
	}, function() {
		rotateSwitch(); //Resume rotation
	});	
	$(".slider_tab a").click(function() {	
		$active = $(this);
		clearInterval(play); //Stop the rotation
		rotate(); //Trigger rotation immediately
		rotateSwitch(); // Resume rotation
		return false; //Prevent browser jump to link anchor
	});
});

function setEqualHeight(columns)
 {
 var tallestcolumn = 0;
 columns.each(
 function()
 {
 currentHeight = $(this).height();
 if(currentHeight > tallestcolumn)
 {
 tallestcolumn  = currentHeight;
 }
 }
 );
 columns.height(tallestcolumn);
 }
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row1"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row2"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row3"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row4"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row5"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row6"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row7"));
});
$(document).ready(function() {
 setEqualHeight($(".sub_category_grid_sbb  > .sub_category_sub_headings_sbb_row8"));
});