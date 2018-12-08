---
layout: default
published: true
title: l0c4lb0t
description: Guild Stats
---
<style>
	.settings.panel:nth-child(even){
		float: right;
		position: inherit;
		top: -134px;
	}
	.settings.panel{
		border: 2px white solid;
		border-radius: 8px;
		width: calc(50% - 30px);
		padding: 10px;
		margin-top: 10px;
		height: 100px;
	}
	.settings.title{
		font-size: 20px;
		font-weight: bold;
		text-decoration: underline;
	}
	.settings.value{
		font-size: 14px;
		margin-left: 10px;
	}
</style>
<script>
	var editedTimeTimer;
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	var gId = vars["g"];
	var g;
	
	updateStats();
	
	function showStats(){
		if(editedTimeTimer) window.clearInterval(editedTimeTimer);
		g = guildStats[gId];
		
		if(g){
			document.title = "Guild Stats: " + g.guildName + " | l0c4lb0t";
			document.getElementById("page title").innerHTML = escapeHtml(g.guildName);
			document.getElementById("settings container").innerHTML = "";
			$(".settings.container").append(
				$(`<div class="settings panel">
					<div class="settings title">Bot Prefix</div>
					<div class="settings value">${escapeHtml(g.botPrefix) || "="}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">User Count</div>
					<div class="settings value">${Object.keys(g.user).length}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">Has Public Channel</div>
					<div class="settings value">${g.publicChannel ? "Yes" : "No"}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">Sent Message Count</div>
					<div class="settings value">${g.sentMessageCount || "0"}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">Sent Public Message Count</div>
					<div class="settings value">${g.sentPublicMessageCount || "0"}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">Used Command Count</div>
					<div class="settings value">${g.sentCommandCount || "0"}</div>
				</div>`),
				$(`<div class="settings panel">
					<div class="settings title">Used Unknown Command Count</div>
					<div class="settings value">${g.sentUnknownCommandCount || "0"}</div>
				</div>`)
			);
		}else{
			document.title = "Guild not found | l0c4lb0t";
			document.getElementById("settings container").innerHTML = "There are no stats for this guild available.";
			document.getElementById("page title").innerHTML = "Guild not found";
		}
		
		updateUpdateTime();
		editedTimeTimer = window.setInterval(function(){
			updateUpdateTime();
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
	function updateUpdateTime(){
		var t = getSecondsSinceEdit();
		var min = Math.floor(t / 60);
		var sec = t % 60;
		document.getElementById("lastEdited").innerHTML = "Updated " + min + " minutes and " + sec + " seconds ago.";
		if(min > 4 && sec == 4) updateStats();
	}
	function escapeHtml(txt) {
		return txt
			 .replace(/&/g, "&amp;")
			 .replace(/</g, "&lt;")
			 .replace(/>/g, "&gt;")
			 .replace(/"/g, "&quot;")
			 .replace(/'/g, "&#039;");
	 }
</script>
<div id="lastEdited">Stats not loaded yet</div>
<div id="settings container" class="settings container" style="position:relative;">
	<div class="settings panel">
		<div class="settings title">Stats not loaded yet</div>
		<div class="settings value">Stats not loaded yet</div>
	</div>
</div>