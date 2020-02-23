(()=>{
    // global objects are used for debugging purpose. They should not have a name conflicting with other stuff. When saving stuff in a global object I can later stop them (disconnect the observer, remove the did-navigate-in-page listener).
    let secret = {};
    
    /* Yes, I know it is stolen from DevilBro's BDFDB, but I like it and so I added it for me too. Full credits go to DevilBro */
    secret.observer = new MutationObserver(function(mut){
        let pluginList = $(".settings-closed.ui-switch-item");
        for(let i = 0; i < pluginList.length; i++){
            let plugin = pluginList[i];
            var pluginAuthor = plugin.querySelector(".bda-author");
            var pluginDescription = plugin.querySelector(".bda-description");
            if (pluginAuthor != null && pluginDescription != null) {
                if (!pluginAuthor.firstElementChild && !pluginDescription.firstElementChild && (pluginAuthor.innerText==='l0c4lh057')) {
                    var currentUser = BdApi.findModuleByProps(["getCurrentUser"]).getCurrentUser();
                    pluginDescription.style.setProperty('display', 'block', 'important');
                    pluginAuthor.innerHTML = '<a class="anchor-3Z-8Bb da-anchor anchorUnderlineOnHover-2ESHQB da-anchorUnderlineOnHover">l0c4lh057</a>';
                    pluginAuthor.addEventListener('click', () => {
                        if(currentUser.id==="226677096091484160") return;
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
                    pluginLinks.appendChild($(`<a class="bda-link bda-link-donations" href="https://www.patreon.com/l0c4lh057" target="_blank">Patreon</a>`)[0]);
                }
            }
        }
    });
    secret.observer.observe(document.body, {attributes:false,characterData:false,childList:true,subtree:true,attributeOldValue:false,characterDataOldValue:false});
    /* This is the end of the part DevilBro made */
    
    let didShowSupportMessage = BdApi.loadData("l0c4lh057", "didShowSupportMessage") || false;
    secret.onSwitch = ()=>{
        // only do stuff in my support channel
        if(BdApi.findModuleByProps("getChannelId").getChannelId()!=="523549866790617118") return;
        // show information on how to ask for support and also give the option to quickly insert the issue template with some information already inserted
        showInfo = ()=>{
            let { createElement, Component } = BdApi.React;
            let TemplateCreator = class extends Component {
                constructor(props){
                    super(props);
                    this.state = {
                        plugin: ""
                    };
                }
                render(){
                    let plugins = Object.values(bdplugins).filter(pl=>pl.plugin.getAuthor().includes("l0c4lh057")).map(pl=>
                        createElement("option",
                            {
                                value: pl.name,
                                key: pl.name
                            },
                            `${pl.displayName || pl.name} v${pl.plugin.getVersion()}`
                        )
                    );
                    return createElement("div", {style: {marginTop:"20px"}},
                        "Select plugin: ",
                        createElement("select",
                            {
                                onChange: e=>this.setState({plugin: e.target.value})
                            },
                            plugins
                        ),
                        " ",
                        createElement("button",
                            {
                                enabled: !!this.state.plugin,
                                onClick: ()=>{
                                    let template = `**[${this.state.plugin}] Issue: \`short issue description\`**
**Bug description**
\`A clear and concise description of what the bug is.\`

**To reproduce**
Steps to reproduce the behavior:
1. \`Go to '...'\`
2. \`Click on '...'\`
3. \`...\`

**Expected behavior**
\`A clear and concise description of what you expect to happen.\`

**Information**
- OS: ${(os=>os==="win32"?"Windows":os==="darwin"?"MacOS":os==="linux"?"Linux":os)(require("os").platform())}
- Plugin version: ${BdApi.getPlugin(this.state.plugin).getVersion()}
- Discord version: ${BdApi.findModuleByProps("releaseChannel").releaseChannel} ${GLOBAL_ENV.SENTRY_TAGS.buildId}
- Compact mode: ${BdApi.findModuleByProps("customStatus","renderSpoilers","messageDisplayCompact").messageDisplayCompact?"yes":"no"}
- Plugin enabled: ${BdApi.isPluginEnabled(this.state.plugin)?"yes":"no"}
${this.state.plugin==="AccountSwitcher"?`- Encryption enabled: ${BdApi.getPlugin("AccountSwitcher").settings.encrypted?"yes":"no"}\n`:""}
**Additional context**
\`Add any other context about the problem here.\`

**Screenshots**
\`Add screenshots to help explain your problem. Please also check the console by pressing Ctrl+Shift+I and send screenshots of errors (red messages).\``;
                                    let chatbox = (node=>{
                                        /* This function is a slightly modified version of Zerebos' ZeresPluginLibrary.ReactTools.getOwnerInstance function */
                                        if(!node) return null;
                                        let curr = BdApi.getInternalInstance(node);
                                        for(curr = curr && curr.return; curr != null && curr != undefined; curr = curr.return){
                                            if(curr == null || curr == undefined) continue;
                                            const owner = curr.stateNode;
                                            if(owner != null && owner != undefined && !(owner instanceof HTMLElement)) return owner;
                                        }
                                        return null;
                                    })(document.getElementsByClassName(BdApi.findModuleByProps("channelTextArea","chat","title").channelTextArea)[0]);
                                    if(chatbox) chatbox.setState({richValue: BdApi.findModuleByProps("serialize","deserialize").deserialize(template), textValue: template});
                                }
                            },
                            "Insert Template"
                        ),
                        createElement("br", {}),
                        !BdApi.isPluginEnabled(this.state.plugin) && createElement("b", {}, " Note: The selected plugin is not enabled. Try enabling it before submitting an issue.")
                    );
                }
            };
            let el = createElement("div", {},
                createElement("h1", {style: {fontSize: "165%", fontWeight: "bold"}}, "To get the best support you should follow some steps:"),
                createElement("ul", {style: {margin: "10px 0"}},
                    createElement("li", {}, "First reload discord by pressing CTRL+R. That fixes most issues."),
                    createElement("li", {}, "If that does not help please check the last few messages. The issue won't get fixed faster because more people are telling me it is broken."),
                    createElement("li", {}, "If nobody reported the issue yet feel free too do it. Please follow the issue template pinned in this channel. ",
                        createElement("b", {}, "There also is a button to insert the issue template into the chatbox. Just select one of the listed plugins, click on 'Insert Template' and replace all codeblocks with the information.")
                    )
                ),
                createElement("br", {}),
                createElement("b", {}, "If you want to reopen this help modal click the HELP button in the chatbox next to the gift, gif and emoji button."),
                createElement(TemplateCreator, {})
            );
            BdApi.alert("How to ask for support", el);
        };
        // append button in the chatbox when in the support channel
        let module1 = BdApi.findModuleByProps("buttons","textArea","textAreaSlate");
        let module2 = BdApi.findModuleByProps("active","button","buttonWrapper");
        let module3 = BdApi.findModuleByProps("button","colorBrand","lookBlank","grow");
        let module4 = BdApi.findModuleByProps("button","buttonContainer","channelTextArea")
        let buttons = document.getElementsByClassName(module1.buttons)[0];
        let button = document.createElement("button");
        button.classList.add(...module4.buttonContainer.split(" "), ...module3.button.split(" "), ...module3.lookBlank.split(" "), ...module3.colorBrand.split(" "), ...module3.grow.split(" "));
        button.innerHTML = `
                <div class="${module3.contents} ${module2.button} ${module1.button}">
                    <svg width="24" height="24" class="${module2.icon}" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M 1.5999999,1.9999999 C 0.71360003,1.9999999 0,2.7136012 0,3.5999986 V 20.399997 c 0,0.886401 0.71360003,1.600002 1.5999999,1.600002 H 22.399998 c 0.886399,0 1.600001,-0.713601 1.600001,-1.600002 V 3.5999986 c 0,-0.8863974 -0.713602,-1.5999987 -1.600001,-1.5999987 z M 2.4653123,9.1545317 H 3.601953 V 11.397107 H 5.7523433 V 9.1545317 H 6.8812496 V 14.845468 H 5.7523433 V 12.387811 H 3.601953 v 2.457657 H 2.4653123 Z m 5.8137498,0 H 11.765781 V 10.106874 H 9.4157028 v 1.31328 h 1.9967962 v 0.952342 H 9.4157028 v 1.520625 h 2.4345312 v 0.952347 H 8.2790621 Z m 4.7232029,0 h 1.136641 v 4.7385893 h 2.31164 v 0.952347 h -3.448281 z m 4.438984,0 H 19.3075 c 1.25952,0 2.227186,0.4454513 2.227186,1.7894513 0,1.297919 -0.975364,1.881641 -2.196484,1.881641 h -0.760311 v 2.019844 h -1.136642 z m 1.136642,0.9062473 v 1.866251 h 0.683515 c 0.78336,0 1.159686,-0.330255 1.159686,-0.983047 0,-0.66048 -0.414687,-0.883204 -1.198046,-0.883204 z"></path>
                    </svg>
                </div>`;
        button.addEventListener("click", showInfo);
        buttons.appendChild(button);
        // show the user the information the first time they are entering the support channel
        if(didShowSupportMessage) return;
        didShowSupportMessage = true;
        BdApi.saveData("l0c4lh057", "didShowSupportMessage", true);
        showInfo();
    };
    require("electron").remote.getCurrentWebContents().on("did-navigate-in-page", secret.onSwitch);
    
    global.__l0c4lh057s_secret_stuff = secret;
})();
