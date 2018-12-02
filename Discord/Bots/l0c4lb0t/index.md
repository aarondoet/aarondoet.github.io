---
layout: default
published: true
title: GuildData
description: test desc
---

<script>
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	var uId = vars["user"];
	var gId = vars["guild"];
	var userStats;
	var guildStats;
	$.get("https://l0c4lh057.jg-p.eu/uploads/usersettings.json.txt", function(response){
		userStats = JSON.parse(response);
		if(guildStats) showStats();
	})
	$.get("https://l0c4lh057.jg-p.eu/uploads/guildsettings.json.txt", function(response){
		guildStats = JSON.parse(response);
		if(userStats) showStats();
	})
	
	function showStats(){
		console.log(userStats);
		console.log(guildStats);
	}
</script>

Test content