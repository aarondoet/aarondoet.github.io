---
layout: default
published: true
title: l0c4lb0t
description: User Stats
iconUrl: ../assets/pb.jpg
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
	var uId = vars["u"];
	var gId = vars["g"];
	var u, g, gu;
	
	updateStats();
	
	function showStats(){
		if(editedTimeTimer) window.clearInterval(editedTimeTimer);
		u = userStats[uId];
		g = guildStats[gId];
		if(g) gu = g["user"][uId]; else gu = undefined;
		
		if(g){
			if(gu && u){
				document.title = "User Stats: " + u.username + " - " + g.guildName + " | l0c4lb0t";
				document.getElementById("page title").innerHTML = escapeHtml(u.username);
				document.getElementById("settings container title guild").innerHTML = "Settings for guild \"" + escapeHtml(g.guildName) + "\"";
				document.getElementById("settings container guild").innerHTML = "";
				$(".settings.container.guild").append(
					$(`<div class="settings panel">
						<div class="settings title">Guild Name</div>
						<div class="settings value">${escapeHtml(gu.guildName)}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Sent Message Count</div>
						<div class="settings value">${gu.sentMessageCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Sent Public Message Count</div>
						<div class="settings value">${gu.sentPublicMessageCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Used Command Count</div>
						<div class="settings value">${gu.sentCommandCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Used Unknown Command Count</div>
						<div class="settings value">${gu.sentUnknownCommandCount || "0"}</div>
					</div>`)
				);
				document.getElementById("settings container general").innerHTML = "";
				$(".settings.container.general").append(
					$(`<div class="settings panel">
						<div class="settings title">User Name</div>
						<div class="settings value">${escapeHtml(u.username)}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Sent Message Count</div>
						<div class="settings value">${u.sentMessageCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Sent Public Message Count</div>
						<div class="settings value">${u.sentPublicMessageCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Used Command Count</div>
						<div class="settings value">${u.sentCommandCount || "0"}</div>
					</div>`),
					$(`<div class="settings panel">
						<div class="settings title">Used Unknown Command Count</div>
						<div class="settings value">${u.sentUnknownCommandCount || "0"}</div>
					</div>`)
				);
			}else{
				document.title = "User not found | l0c4lb0t";
			}
		}else{
			document.title = "Guild not found | l0c4lb0t";
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
<h1 id="settings container title guild" style="margin-top:20px;">Stats not loaded yet</h1>
<div id="settings container guild" class="settings container guild" style="position:relative;">
	<div class="settings panel">
		<div class="settings title">Stats not loaded yet</div>
		<div class="settings value">Stats not loaded yet</div>
	</div>
</div>
<h1 id="settings container title general" style="margin-top:30px;">General stats</h1>
<div id="settings container general" class="settings container general" style="position:relative;">
	<div class="settings panel">
		<div class="settings title">Stats not loaded yet</div>
		<div class="settings value">Stats not loaded yet</div>
	</div>
</div>