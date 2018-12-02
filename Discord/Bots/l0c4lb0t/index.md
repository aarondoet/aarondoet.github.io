---
layout: default
published: true
title: GuildData
description: test desc
---

<script>
	function httpGet(theUrl){
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				return xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", theUrl, false );
		xmlhttp.send();
	}
	
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	var uId = vars["user"];
	var gId = vars["guild"];
	var userStats = Json.parse(httpGet("https://l0c4lh057.jg-p.eu/uploads/usersettings.json.txt"));
	console.log(userStats);
</script>

Test content