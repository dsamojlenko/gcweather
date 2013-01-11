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

jQuery(document).ready(function(){
	
	jQuery("#gcweather-widget ul li").hide();
	jQuery("#gcweather-widget ul li:first").show().addClass('active');
	jQuery("#gcweather-widget").prepend('<a id="prev" href="#">Previous</a>');
	jQuery("#gcweather-widget").append('<a id="next" href="#">Next</a>');
	
	jQuery("#next").click(function(e) {
		e.preventDefault();
		var $next = jQuery('#gcweather-widget .active').next().length > 0 ? jQuery('#gcweather-widget .active').next() : jQuery("#gcweather-widget ul li").first();
		jQuery('#gcweather-widget .active').hide("slide", {direction: "left"}, function() {
			jQuery('#gcweather-widget .active').removeClass('active');
			$next.addClass('active');
			$next.show("slide", {direction: "right"});
		});
		
	});
	
	jQuery("#prev").click(function(e){
		e.preventDefault();
		var $prev = jQuery('#gcweather-widget .active').prev().length > 0 ? jQuery('#gcweather-widget .active').prev() : jQuery("#gcweather-widget ul li").last();
		jQuery('#gcweather-widget .active').hide("slide", {direction: "left"}, function() {
			jQuery('#gcweather-widget .active').removeClass('active');
			$prev.addClass('active');
			$prev.show("slide", {direction: "right"});
		});
		
	});
	
	/*
      Drupal.jsAC.prototype.select = function (node) {
        this.input.value = jQuery(node).data('autocompleteValue');
        if(jQuery(this.input).hasClass('auto_submit')){
          this.input.form.submit();
        }
      };
      */
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

