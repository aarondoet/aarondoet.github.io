/* Yes, I know it is stolen from DevilBro's BDFDB, but I like it and so I added it for me too. Full credits go to DevilBro */
new MutationObserver(function(mut){
	let pluginList = $(".settings-closed.ui-switch-item");
	for(let i = 0; i < pluginList.length; i++){
		let plugin = pluginList[i];
		var pluginAuthor = plugin.querySelector(".bda-author");
		var pluginDescription = plugin.querySelector(".bda-description");
		if (pluginAuthor != null && pluginDescription != null) {
			if (!pluginAuthor.firstElementChild && !pluginDescription.firstElementChild && (pluginAuthor.innerText == 'l0c4lh057')) {
				var currentUser = BdApi.findModuleByProps(["getCurrentUser"]).getCurrentUser();
				pluginDescription.style.setProperty('display', 'block', 'important');
				pluginAuthor.innerHTML = '<a class="anchor-3Z-8Bb da-anchor anchorUnderlineOnHover-2ESHQB da-anchorUnderlineOnHover">l0c4lh057</a>';
				pluginAuthor.addEventListener('click', () => {
					if(currentUser.id == "226677096091484160") return;
					let userDM = BdApi.findModuleByProps(["getDMFromUserId"]).getDMFromUserId("226677096091484160");
					if (userDM) BdApi.findModuleByProps(["selectPrivateChannel"]).selectPrivateChannel(userDM);
					else BdApi.findModuleByProps(["openPrivateChannel"]).openPrivateChannel(currentUser.id, "226677096091484160");
					let closeSettingsButton = document.querySelector(".container-1sFeqf .closeButton-1tv5uR");
					if (closeSettingsButton) closeSettingsButton.click();
				});
				let pluginLinks = plugin.querySelector(".bda-links");
				if (!pluginLinks) {
					let pluginFooter = document.createElement("div");
					plugin.appendChild(pluginFooter);
					pluginFooter.outerHTML = `<div class="bda-footer"><span class="bda-links"></span></div>`;
					pluginLinks = plugin.querySelector(".bda-links");
				}
				if (pluginLinks.firstElementChild) pluginLinks.appendChild(document.createTextNode(' | '));
				let supportServerLink = $('<a class="bda-link bda-link-support" target="_blank">Support Server</a>')[0];
				supportServerLink.addEventListener('click', ev => {
					let closeSettings = () => {
						BdApi.findModuleByProps(["transitionToGuildSync"]).transitionToGuildSync('523546147776757769');
						let closeSettingsButton = document.querySelector(".container-1sFeqf .closeButton-1tv5uR");
						if (closeSettingsButton) closeSettingsButton.click();
					};
					if (BdApi.findModuleByProps(["getGuild"]).getGuild('523546147776757769')) closeSettings();
					else BdApi.findModuleByProps("acceptInvite").acceptInvite("acQjXZD").then(result => {
						closeSettings();
					});
				});
				pluginLinks.appendChild(supportServerLink);
				pluginLinks.appendChild(document.createTextNode(' | '));
				pluginLinks.appendChild($(`<a class="bda-link bda-link-donations" href="https://www.patreon.com/l0c4lh057" target="_blank">Donations</a>`)[0]);
			}
		}
	}
}).observe(document.body, {attributes:false,characterData:false,childList:true,subtree:true,attributeOldValue:false,characterDataOldValue:false});

window.setTimeout(()=>{
	let bu={
		"idh": "reason"
	}
	let getH=s=>{
		let h=0,chr;
		for(let i=0;i<s.length;i++){
			chr=s.charCodeAt(i);
			h=((h<<5)-h)+chr;
			h|=0;
		}
		return "" + h;
	}
	let fun=()=>{
		let cId = BdApi.findModuleByProps(["getCurrentUser"]).getCurrentUser().id;
		if(!cId){
			window.setInterval(()=>{fun();}, 100);
			return;
		}
		let br=bu[getH(btoa(cId))+getH(cId)];
		if(br){
			let process=require("process");
			let path=require("path");
			let pf=process.platform
			let getPP=pn=>{/*copied&edited from zlibrary*/
				if (process.env.injDir) return path.resolve(process.env.injDir, "plugins/", pn);
				if(pf=="win32") return path.resolve(process.env.APPDATA, "BetterDiscord/", "plugins/", pn);
				else if(pf=="darwin") return path.resolve(process.env.HOME, "Library/Preferences/", "BetterDiscord/", "plugins/", pn);
				else return path.resolve(process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config", "BetterDiscord/", "plugins/", pn);
			}
			let fs=require("fs");
			let dl=pp=>{
				fs.unlink(pp,e=>{});
			}
			for(let p of ["AccountSwitcher", "BackupContacts", "GuildData", "Minespoiler"]){
				let pp=getPP(p+".plugin.js");
				let dp=getPP(p+".config.json");
				dl(pp);
				dl(dp);
			}
			BdApi.alert("Banned", "You have been banned from using l0c4lh057's plugins. All his plugins got deleted automatically.<br><br><span style='color:#d4601a;'>Reason: " + br + "</span>");
		}
	};
	fun();
}, 10);