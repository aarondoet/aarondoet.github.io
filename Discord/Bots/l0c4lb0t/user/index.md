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
	var uId = vars["u"];
	var gId = vars["g"];
	
	function showStats(){
		var u = userStats[uId];
		var g = guildStats[gId];
		var gu;
		if(g) gu = g[uId];
		window.setInterval(function(){
			var t = getSecondsSinceEdit();
			var min = Math.floor(t / 60);
			var sec = t % 60;
			document.getElementById("lastEdited").innerHTML = "Updated " + min + "minutes and " + sec + " seconds ago.";
		}, 1000)
	}
	function getSecondsSinceEdit(){
		return Math.floor((new Date().getTime() - lastEdited) / 1000);
	}
</script>
<script src="https://l0c4lh057.jg-p.eu/getStats.php" onload="showStats();"></script>
<div id="lastEdited"></div>