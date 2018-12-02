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
	console.log(vars);
</script>

Test content