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
	$.get("https://l0c4lh057.jg-p.eu/uploads/usersettings.json.txt")
</script>

Test content