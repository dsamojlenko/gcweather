<?php

function gcweather_get_remote_file($feed) {
	switch($feed) {
		case 'cities':
			$xml = simplexml_load_file("http://dd.weatheroffice.ec.gc.ca/citypage_weather/xml/" . gcweather_settings('cities_list_file'));
			break;
		case 'weather':
			
			$location = explode(",",gcweather_settings('location_code'));
			
			if($xml = simplexml_load_file("http://dd.weatheroffice.ec.gc.ca/citypage_weather/xml/" . $location[0] . "/" . $location[1] . "_" . gcweather_settings('lang') . ".xml")) {
				return $xml;
			} else {
			
				$location = explode(",",gcweather_settings('default_location'));
				if($xml = simplexml_load_file("http://dd.weatheroffice.ec.gc.ca/citypage_weather/xml/" . $location[0] . "/" . $location[1] . "_" . gcweather_settings('lang') . ".xml")) {
					return $xml;
				} else {
					return false;
				}
			}
			break;
		default:
			return false;
	}
	
	return $xml;
}

function gcweather_get_cities_file() {
	if($xml = gcweather_check_file_cache('cities')) {
		return $xml;
	} else {
		// error
		return false;
	}
}

function gcweather_get_weather_file() {	
	
	if($xml = gcweather_check_file_cache('weather')) {
		return $xml;
	} else {
		// dpm('Error 2!');
		return false;
	}
}

function gcweather_check_file_cache($feed) {	
	
	$file = gcweather_settings('cache_path');
	
	switch($feed) {
		case 'cities':
			$cachetime = 2592000;  // cache for 30 days	
			$file .= gcweather_settings('cities_list_file');
			break;
		case 'weather':
			$cachetime = 3600; // cache for one hour
			$location = explode(",",gcweather_settings('location_code'));
			$file .= $location[0] . '_' . $location[1] . '_' . gcweather_settings('lang') . '.xml';
			break;
		default:
			// error - this function has been called incorrectly (shouldn't happen)
	}
	
	$expiration = time() - $cachetime; 	
	
	if(!file_exists($file) || filemtime($file) < $expiration) { // we don't have the file, or it's expired
		// get remote file
		if($xml = gcweather_get_remote_file($feed)) {
			gcweather_save_cache_file($xml,$file);
			return $xml;
		} else {
			// error - there has been an error retrieving this file and we don't have it.
			return false;
		}
	} else {
		// all's good, return from cache
		$xml = simplexml_load_file($file);
		return $xml;
	}
	
}

function gcweather_save_cache_file($xml,$file) {
	file_put_contents($file,$xml->asXML());
}

