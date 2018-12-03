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
	var gId = vars["g"];
	
	function showStats(){
		var timeSinceLastEdit = new Date().getTime() - lastEdited;
		var g = guildStats[gId];
	}
</script>
<script src="https://l0c4lh057.jg-p.eu/getStats.php" onload="showStats();"></script>