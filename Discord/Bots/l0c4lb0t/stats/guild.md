---
layout: default
published: true
title: l0c4lb0t
description: Guild Stats
---
<script>
	var editedTimeTimer;
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	var gId = vars["g"];
	
	updateStats();
	
	function showStats(){
		if(editedTimeTimer) window.clearInterval(editedTimeTimer);
		var g = guildStats[gId];
		
		if(g){
			document.title = "Guild Stats: " + g.guildName + " | l0c4lb0t";
		}else{
			document.title = "Guild not found | l0c4lb0t";
		}
		
		editedTimeTimer = window.setInterval(function(){
			var t = getSecondsSinceEdit();
			var min = Math.floor(t / 60);
			var sec = t % 60;
			document.getElementById("lastEdited").innerHTML = "Updated " + min + " minutes and " + sec + " seconds ago.";
			if(min > 4 && sec == 4) updateStats();
		}, 1000);
	}
	function getSecondsSinceEdit(){
		return Math.floor((new Date().getTime() - lastEdited) / 1000);
	}
	function getTimeSinceEdit(){
		return new Date().getTime() - lastEdited;
	}
	function updateStats(){
		if(document.getElementById("l0c4lh057 script loadstats")) document.getElementById("l0c4lh057 script loadstats").outerHTML = "";
		var scrip = document.createElement("script");
		scrip.src = "https://l0c4lh057.jg-p.eu/getStats.php";
		scrip.id = "l0c4lh057 script loadstats";
		scrip.onload = function(){showStats();};
		document.head.appendChild(scrip);
	}
</script>