function setSelected() {
	var gcweather_selected = readCookie("gcweather_province_code") + "," + readCookie("gcweather_city_code");
	jQuery("#gcweather_select").val(gcweather_selected);
}

function gcweather_init() {
	jQuery("#gcweather-widget ul li").hide();
	jQuery("#gcweather-widget ul li:first").show().addClass('active');
	//jQuery("#gcweather-widget").append('<div class="navigation"><span class="prev"><a href="#">Previous</a></span><span class="next"><a href="#">Next</a></span></div>');
	jQuery("#gcweather-widget .prev").hide();
	jQuery("#gcweather-form").hide();
	
	$link = '<a href="#" class="settings">' + jQuery("#gcweather-settings strong").html() + '</a>';
	jQuery("#gcweather-settings strong").html($link);
	
	jQuery("#gcweather-widget .next").click(function(e) {
		e.preventDefault();
		if (!jQuery("#gcweather-widget ul li").is(":animated")) { //ensures that the sliding is complete before button press is allowed
			if (jQuery('#gcweather-widget .active').next().length > 0) {
				var $next = jQuery('#gcweather-widget .active').next();
				jQuery("#gcweather-widget .prev").show();
			}
			
			jQuery('#gcweather-widget .active').hide("slide", {direction: "left"}, function() {
				jQuery('#gcweather-widget .active').removeClass('active');
				$next.addClass('active');
				$next.show("slide", {direction: "right"});
				if (jQuery("#gcweather-widget ul li").index(jQuery('#gcweather-widget .active')) == jQuery("#gcweather-widget ul li").length - 1) {
					jQuery("#gcweather-widget .next").hide();
				}
			});	
		}
	});
	
	jQuery("#gcweather-widget .prev").click(function(e){
		e.preventDefault();		
		if (!jQuery("#gcweather-widget ul li").is(":animated")) { //ensures that the sliding is complete before button press is allowed
			if (jQuery('#gcweather-widget .active').prev().length > 0) {
				var $prev = jQuery('#gcweather-widget .active').prev();
				jQuery("#gcweather-widget .next").show();
			}
			
			jQuery('#gcweather-widget .active').hide("slide", {direction: "right"}, function() {
				jQuery('#gcweather-widget .active').removeClass('active');
				$prev.addClass('active');
				$prev.show("slide", {direction: "left"});
				if (jQuery("#gcweather-widget ul li").index(jQuery('#gcweather-widget .active')) == 0) {
					jQuery("#gcweather-widget .prev").hide();
				}
			});		
		}		
	});
	
	jQuery("#gcweather-widget .settings").click( function (e) { 
		e.preventDefault();		
		jQuery("#gcweather-widget .container").hide();
		jQuery("#gcweather-widget .next").hide();
		jQuery("#gcweather-widget .prev").hide();
		jQuery("#gcweather-form").show();
		jQuery("#gcweather-form #edit-select-province").focus();		
	});
	
	jQuery("#gcweather-form").submit( function () { 
		jQuery("#gcweather-form").hide("slide", {direction: "up"});
	});
	
}

function getParameterByName(data,name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(data);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

jQuery(document).ajaxComplete(function(evt,xhr,settings){
	var triggering_element = getParameterByName(settings.data,"_triggering_element_name");
	
	if(triggering_element == 'op') {
		gcweather_init();
	}
});

jQuery("#gcweather-widget").ready(function() {
	// console.log("widget ready");
	// jQuery("#gcweather-widget").load("/gcweather/contents #gcweather-widget *", function() {
		// console.log("contents loaded");
		gcweather_init();
	// });
	
});
