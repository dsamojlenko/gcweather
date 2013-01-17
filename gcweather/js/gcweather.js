function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function setSelected() {
	var gcweather_selected = readCookie("gcweather_province_code") + "," + readCookie("gcweather_city_code");
	jQuery("#gcweather_select").val(gcweather_selected);
}

function gcweather_init() {
	// console.log("huzzah");
	
	
	jQuery("#gcweather-widget ul li").hide();
	jQuery("#gcweather-widget ul li:first").show().addClass('active');
	jQuery("#gcweather-widget").append('<div class="navigation"><span class="prev"><a href="#">Previous</a></span><span class="next"><a href="#">Next</a></span></div>');
	//jQuery("#gcweather-widget").append('<a id="next" href="#">Next</a>');
	jQuery("#gcweather-widget .prev").hide();
	jQuery("#gcweather-form").hide();
	
	jQuery("#gcweather-widget .next").click(function(e) {
		e.preventDefault();
		if (jQuery('#gcweather-widget .active').next().length > 0) {
			var $next = jQuery('#gcweather-widget .active').next();
			jQuery("#gcweather-widget .prev").show();
			$hasPrevButton = true;
		} /*else {
			var $next = jQuery("#gcweather-widget ul li").first();
			jQuery("#prev").hide();
		}*/
		
		jQuery('#gcweather-widget .active').hide("slide", {direction: "left"}, function() {
			jQuery('#gcweather-widget .active').removeClass('active');
			$next.addClass('active');
			$next.show("slide", {direction: "right"});
			if (jQuery("#gcweather-widget ul li").index(jQuery('#gcweather-widget .active')) == jQuery("#gcweather-widget ul li").length - 1) {
				jQuery("#gcweather-widget .next").hide();
				$hasNextButton = false;
			}
		});
		
	});
	
	jQuery("#gcweather-widget .prev").click(function(e){
		e.preventDefault();
		if (jQuery('#gcweather-widget .active').prev().length > 0) {
			var $prev = jQuery('#gcweather-widget .active').prev();
			jQuery("#gcweather-widget .next").show();
			$hasNextButton = true;
		} /*else {
			var $prev = jQuery("#gcweather-widget ul li").last();
			jQuery("#next").hide();
		}*/
		
		jQuery('#gcweather-widget .active').hide("slide", {direction: "right"}, function() {
			jQuery('#gcweather-widget .active').removeClass('active');
			$prev.addClass('active');
			$prev.show("slide", {direction: "left"});
			if (jQuery("#gcweather-widget ul li").index(jQuery('#gcweather-widget .active')) == 0) {
				jQuery("#gcweather-widget .prev").hide();
				$hasPrevButton = false;
			}
		});
		
	});
	
	jQuery("#gcweather-widget .settings").click( function (e) { 
		e.preventDefault();		
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
	console.log(evt);
	console.log(xhr);
	console.log(settings);
	console.log(getParameterByName(settings.data,"_triggering_element_name"));
	var triggering_element = getParameterByName(settings.data,"_triggering_element_name");
	if(triggering_element != 'select_province') {
		gcweather_init();
	}
});

jQuery(document).on("ready", function(){
	gcweather_init();
});

/*
jQuery(function() {
	
	if(readCookie("gcweather_city_code")) {
		setSelected();
	}
	
	jQuery("#gcweather_select").live("change", function() {
		var gcweather_code = jQuery(this).val().split(",");
		createCookie("gcweather_city_code",gcweather_code[1],100);
		createCookie("gcweather_province_code",gcweather_code[0],100);
		jQuery("#gcweather-widget").load(location.href+" #gcweather-widget>*", function() {
			setSelected();
		});		
	});
	
});
*/
