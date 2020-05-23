// In case that any plugin dev wants to get added to this feel free to ask me.
(()=>{
if(global.__l0c4lh057s_secret_stuff && typeof global.__l0c4lh057s_secret_stuff.stopActivity === "function") global.__l0c4lh057s_secret_stuff.stopActivity();
const secret = {};

const SelectedChannelStore = BdApi.findModuleByProps("getChannelId");

const supportChannels = {
	"523549866790617118": ["l0c4lh057"],
	"655486376858615838": ["Strencher"]
};
/*
 * knownIssues[pluginName] = [
 *   {
 *     title: "Issue Title",
 *     solution?: "Solution" or ["step1", "step2", "step3"],
 *     version?: "0.0.0" or /^2\.3\.\d$/
 *   }, ...
 * ]
 */
const knownIssues = {};
const popupLastShownTime = BdApi.loadData("l0c4lh057", "popupLastShownTime") || {};
const librarySettings = Object.assign({
	showHelpButton: true,
	automaticallyShowHelpPopup: true
}, BdApi.loadData("l0c4lh057", "librarySettings")||{});

const stateCache = {};

const classNames = {
	sectionTitle: BdApi.findModuleByProps("clickable", "themed", "title").title,
	input: BdApi.findModuleByProps("error", "inputDefault").inputDefault,
	textArea: BdApi.findModuleByProps("resizeable", "textArea").textArea,
	resizeable: BdApi.findModuleByProps("resizeable", "textArea").resizeable,
	scrollbar: BdApi.findModuleByProps("scrollbar", "scrollbarDefault").scrollbarDefault,
	error: BdApi.findModuleByProps("error", "inputDefault").error,
	colorStandard: BdApi.findModuleByProps("colorBrand", "colorStandard").colorStandard,
	container: BdApi.findModuleByProps("body", "container", "content").container,
	content: BdApi.findModuleByProps("body", "container", "content").content
}

const { React } = BdApi;
const Textbox = BdApi.findModule(m => m.defaultProps && m.defaultProps.type == "text");
const Dropdown = BdApi.findModule(m => m.prototype && !m.prototype.handleClick && m.prototype.render && m.prototype.render.toString().includes("default.select"));
const DeprecatedModal = BdApi.findModuleByDisplayName("DeprecatedModal");
const FormTitle = BdApi.findModuleByDisplayName("FormTitle");
const Button = BdApi.findModuleByProps("Button").Button;
const Modals = BdApi.findModuleByProps("openModal");

const issueOther = {title: "Other"};

const showIssueTemplate = (authors)=>{
	let closeModal = ()=>{};
	
	const SectionTitle = props=>React.createElement(
		"div",
		{className: classNames.sectionTitle},
		props.title
	);
	
	const PluginSelector = props=>React.createElement(
		"div",
		{},
		React.createElement(SectionTitle, {title: "Plugin"}),
		React.createElement(
			Dropdown,
			{
				clearable: false,
				searchable: false,
				options: props.plugins.map(pl=>({label:`${pl.getName()} v${pl.getVersion()}`, value: pl})),
				value: props.selectedPlugin,
				onChange: e=>props.selectPlugin(e.value)
			}
		),
		!BdApi.Plugins.isEnabled(props.selectedPlugin.getName()) && React.createElement("b", {}, "The plugin is not enabled. Please make sure the issue still persists after enabling the plugin!")
	);
	
	const KnownIssueList = props=>props.knownIssues.length > 0 && React.createElement(
		"div",
		{},
		React.createElement(SectionTitle, {title: "Known Issues"}),
		React.createElement(
			Dropdown,
			{
				clearable: false,
				searchable: false,
				options: [...props.knownIssues, issueOther].map(issue=>({label: issue.title, value: issue})),
				value: props.selectedKnownIssue,
				onChange: e=>props.selectKnownIssue(e.value)
			}
		)
	);
	
	const Input = props=>React.createElement(Textbox, {
		value: props.element,
		placeholder: props.getPlaceholder(props.index),
		error: typeof props.isValid === "function" && !props.isValid(props.element),
		onChange: value=>props.onChange(props.index, value)
	});
	
	const InputList = props=>React.createElement(
		"div",
		{},
		React.createElement(SectionTitle, {title: props.name}),
		React.createElement(
			"div",
			{},
			...props.elements.map((element,index) => React.createElement(Input, {element, index, onChange: props.onChange, getPlaceholder: props.getPlaceholder, isValid: props.isValid})),
			React.createElement(Input, {element: "", index: props.elements.length, onChange: props.onChange, getPlaceholder: props.getPlaceholder, isValid: props.isValid})
		)
	);
	
	const OneLineInput = props=>React.createElement(
		"div",
		{},
		React.createElement(SectionTitle, {title: props.name}),
		React.createElement(Textbox, {
			error: props.missing,
			placeholder: props.placeholder,
			value: props.value,
			onChange: props.onChange
		})
	);
	
	const MultiLineInput = props=>React.createElement(
		"div",
		{},
		React.createElement(SectionTitle, {title: props.name}),
		React.createElement("textarea", {
			className: [classNames.input, classNames.textArea, classNames.resizeable, classNames.scrollbar].join(" ") + (props.missing ? " " + classNames.error : ""),
			style: {minWidth: "-webkit-fill-available", maxWidth: "-webkit-fill-available", height: 100, minHeight: 43},
			placeholder: props.placeholder,
			value: props.value,
			onChange: props.onChange
		})
	);
	
	const Alert = class extends React.Component {
		constructor(props){
			super(props);
			const availablePlugins = BdApi.Plugins.getAll().filter(pl=>pl.getAuthor().split(", ").some(plAuthor => props.authors.includes(plAuthor)));
			if(stateCache[props.channelId] && availablePlugins.some(pl=>pl.getName()===stateCache[props.channelId].selectedPlugin.getName())){
				this.state = Object.assign(stateCache[props.channelId], {
					// updating available plugins in case a plugin got installed or removed
					availablePlugins,
					// updating the selected plugin in case it got updated in the meantime
					selectedPlugin: availablePlugins.find(pl=>pl.getName()===stateCache[props.channelId].selectedPlugin.getName())
				});
			}else{
				this.state = {
					authors,
					availablePlugins,
					selectedPlugin: availablePlugins[0],
					knownIssues: (knownIssues[(availablePlugins[0]||{getName:_=>_}).getName()]||[]).filter(i => i.version === undefined || (typeof i.version==="string" ? i.version === availablePlugins[0].getVersion() : i.version.test(availablePlugins[0].getVersion))),
					selectedKnownIssue: issueOther,
					title: "",
					description: "",
					steps: [],
					expectedBehavior: "",
					additionalContext: "",
					screenshots: [],
					descriptionMissing: false,
					titleMissing: false
				};
			}
		}
		render(){
			const hasPlugin = !!this.state.selectedPlugin;
			const issueIsKnown = this.state.selectedKnownIssue.title !== "Other";
			let contentElement;
			if(!hasPlugin){
				contentElement = React.createElement(
					"div",
					{className: classNames.colorStandard},
					React.createElement("b", {}, "You don't have any plugin made by this author")
				);
			}else{
				contentElement = React.createElement(
					"div",
					{
						className: classNames.colorStandard,
						style: {textAlign: "start"}
					},
					React.createElement(PluginSelector, {
						plugins: this.state.availablePlugins,
						selectedPlugin: this.state.selectedPlugin,
						selectPlugin: this.selectPlugin.bind(this)
					}),
					React.createElement(KnownIssueList, {
						knownIssues: this.state.knownIssues,
						selectedKnownIssue: this.state.selectedKnownIssue,
						selectKnownIssue: this.selectKnownIssue.bind(this)
					}),
					!issueIsKnown && React.createElement(OneLineInput, {
						name: "Title",
						placeholder: "Short issue description",
						value: this.state.title,
						missing: this.state.titleMissing,
						onChange: value=>this.setState({title: value, titleMissing: false}, ()=>stateCache[this.props.channelId]=this.state)
					}),
					!issueIsKnown && React.createElement(MultiLineInput, {
						name: "Description",
						placeholder: "A clear and concise description of what the bug is.",
						value: this.state.description,
						missing: this.state.descriptionMissing,
						onChange: e=>this.setState({description: e.target.value, descriptionMissing: false}, ()=>stateCache[this.props.channelId]=this.state)
					}),
					!issueIsKnown && React.createElement(InputList, {
						name: "Steps to reproduce the issue",
						elements: this.state.steps,
						getPlaceholder: i=>`Step ${i+1}`,
						onChange: this.editStep.bind(this)
					}),
					!issueIsKnown && React.createElement(MultiLineInput, {
						name: "Expected behavior",
						placeholder: "A clear and concise description of what you expect to happen.",
						value: this.state.expectedBehavior,
						onChange: e=>this.setState({expectedBehavior: e.target.value}, ()=>stateCache[this.props.channelId]=this.state)
					}),
					React.createElement(MultiLineInput, {
						name: "Additional context",
						placeholder: "Add any other context about the problem here.",
						value: this.state.additionalContext,
						onChange: e=>this.setState({additionalContext: e.target.value}, ()=>stateCache[this.props.channelId]=this.state)
					}),
					React.createElement(InputList, {
						name: "Screenshots",
						elements: this.state.screenshots,
						getPlaceholder: i=>"Link to a screenshot",
						isValid: this.isScreenshotLinkValid.bind(this),
						onChange: this.setScreenshot.bind(this)
					})
				);
			}
			return React.createElement(
				DeprecatedModal,
				{
					size: DeprecatedModal.Sizes.LARGE,
					tag: "form",
					className: classNames.container
				},
				React.createElement(
					DeprecatedModal.Content,
					{
						className: classNames.content
					},
					React.createElement(
						"div",
						{},
						React.createElement(
							FormTitle,
							{tag: "h2"},
							"Submit Issue"
						)
					),
					contentElement
				),
				React.createElement(
					DeprecatedModal.Footer,
					{},
					React.createElement(
						Button,
						{
							onClick: hasPlugin ? this.handleSubmitClick.bind(this) : closeModal
						},
						hasPlugin ? "Submit" : "Close"
					)
				)
			);
		}
		selectPlugin(plugin){
			this.setState({
				selectedPlugin: plugin,
				knownIssues: (knownIssues[plugin.getName()] || []).filter(i => i.version === undefined || (typeof i.version==="string" ? i.version === plugin.getVersion() : i.version.test(plugin.getVersion))),
				selectedKnownIssue: issueOther
			}, ()=>stateCache[this.props.channelId]=this.state);
		}
		selectKnownIssue(issue){
			this.setState({selectedKnownIssue: issue}, ()=>{
				if(issue.solution){
					delete stateCache[this.props.channelId];
					closeModal();
				}else{
					stateCache[this.props.channelId]=this.state
				}
			});
			if(issue.solution){
				let body = !Array.isArray(issue.solution) ? issue.solution : React.createElement(
					"ol",
					{
						style: {
							marginLeft: 20,
							marginTop: 10,
							marginBottom: 10,
							listStyleType: "decimal"
						}
					},
					issue.solution.map(step=>React.createElement("li", {}, step))
				);
				BdApi.alert("Solution", body);
			}
		}
		editStep(index, value){
			let state = this.state;
			state.steps[index] = value;
			state.steps = state.steps.filter(step=>step.length>0)
			this.setState(state, ()=>stateCache[this.props.channelId]=this.state);
		}
		setScreenshot(index, value){
			let state = this.state;
			state.screenshots[index] = value;
			state.screenshots = state.screenshots.filter(link=>link.length>0)
			this.setState(state, ()=>stateCache[this.props.channelId]=this.state);
		}
		isScreenshotLinkValid(link){
			return link===""||/^https?:\/\/[^\.]+\..*[^\.]\/.+/.test(link.trim());
		}
		handleSubmitClick(e){
			let submit = true;
			if(this.state.selectedKnownIssue.title === "Other"){
				if(!this.state.title.trim()){
					submit = false;
					this.setState({titleMissing: true}, ()=>stateCache[this.props.channelId]=this.state);
				}
				if(!this.state.description.trim()){
					submit = false;
					this.setState({descriptionMissing: true}, ()=>stateCache[this.props.channelId]=this.state);
				}	
			}
			if(this.state.screenshots.some(link=>!this.isScreenshotLinkValid(link))){
				submit = false;
			}
			if(submit){
				this.sendMessage();
				delete stateCache[this.props.channelId];
				//console.log("send msg");
			}
		}
		getMessage(){
			return this.getTitle() + this.getDescription() + this.getSteps() + this.getExpectedBehavior() + this.getInformation() + this.getAdditionalContext() + this.getScreenshots();
		}
		sendMessage(){
			// TODO: check for 2000 character limit
			BdApi.findModuleByProps("sendMessage").sendMessage(this.props.channelId, {content: this.getMessage()});
			closeModal();
		}
		getTitle(){
			if(this.state.selectedKnownIssue.title !== "Other") return "**[" + this.state.selectedPlugin.getName() + "] Issue: " + this.state.selectedKnownIssue.title + "**";
			else return "**[" + this.state.selectedPlugin.getName() + "] Issue: " + this.state.title.trim().replace(/ {2,}/g, " ") + "**";
		}
		getDescription(){
			if(this.state.selectedKnownIssue.title !== "Other") return "";
			let description = this.state.description.split("\n").map(l=>l.trim()).join("\n").trim().replace(/\n{3,}/g, "\n\n");
			if(description.length > 0) return "\n\n**Bug description**\n" + description;
			else return "";
		}
		getSteps(){
			if(this.state.selectedKnownIssue.title !== "Other") return "";
			let steps = this.state.steps.map(step=>step.trim()).filter(step=>step);
			if(steps.length > 0) return "\n\n**Steps to reproduce**\n" + steps.map((step,i)=>(i+1)+". "+step).join("\n");
			else return "";
		}
		getExpectedBehavior(){
			if(this.state.selectedKnownIssue.title !== "Other") return "";
			let behavior = this.state.expectedBehavior.split("\n").map(l=>l.trim()).join("\n").trim().replace(/\n{3,}/g, "\n\n");
			if(behavior) return "\n\n**Expected Behavior**\n" + behavior;
			else return "";
		}
		getInformation(){
			return `\n\n**Information**
- Versions:
  * Plugin: ${this.state.selectedPlugin.getVersion()}
  * BBD: ${BdApi.getBDData("version")}
  * ZLibrary: ${(BdApi.Plugins.get("ZeresPluginLibrary")||{getVersion:()=>"not installed"}).getVersion()}
  * Release channel: ${BdApi.findModuleByProps("releaseChannel").releaseChannel}
  * Build ID: ${GLOBAL_ENV.SENTRY_TAGS.buildId}
- OS: ${(os=>os==="win32"?"Windows":os==="darwin"?"MacOS":os==="linux"?"Linux":os)(require("os").platform())}
- Compact mode: ${BdApi.findModuleByProps("customStatus","renderSpoilers","messageDisplayCompact").messageDisplayCompact?"yes":"no"}
- Plugin enabled: ${BdApi.Plugins.isEnabled(this.state.selectedPlugin.getName())?"yes":"no"}`
			+ (this.state.selectedPlugin.getName()==="AccountSwitcher"?`\n- Encryption enabled: ${this.state.selectedPlugin.settings.encrypted?"yes":"no"}`:"");
		}
		getAdditionalContext(){
			let context = this.state.additionalContext.split("\n").map(l=>l.trim()).join("\n").trim().replace(/\n{3,}/g, "\n\n");
			if(context) return "\n\n**Additional context**\n" + context;
			else return "";
		}
		getScreenshots(){
			let screenshots = this.state.screenshots.map(l=>l.trim()).filter(l=>l);
			if(screenshots.length > 0) return "\n\n**Screenshots**\n" + screenshots.map(l=>"- "+l).join("\n");
			return "";
		}
	};
	
	let modalId = Modals.openModal(props => {
		return React.createElement(
			BdApi.findModuleByProps("ModalRoot").ModalRoot,
			{
				size: "large",
				transitionState: props.transitionState
			},
			React.createElement(Alert, {authors, channelId: BdApi.findModuleByProps("getChannelId").getChannelId()})
		);
	});
	closeModal = ()=>Modals.closeModal(modalId);
};



const showGeneralInformation = (authors)=>{
	if(!Array.isArray(authors)) authors = [authors];
	const { React } = BdApi;
	let steps = [
		"Reload discord (CTRL+R) - that will fix most of your problems.",
		"If you have a problem with AccountSwitcher, try removing and then saving the account again.",
		"Check the support channel for related issues. If it already got reported there is no need to write a full report. Just refer to the previous report and give some information and screenshots of the error messages you get.",
		"(Check GitHub for related issues)"
	];
	if(authors.every(author=>author!=="l0c4lh057")||!BdApi.Plugins.get("AccountSwitcher")) steps = steps.filter(step => !step.includes("AccountSwitcher"));
	BdApi.showConfirmationModal(
		"How to ask for support",
		React.createElement(
			"div",
			{
				className: classNames.colorStandard
			},
			"Before asking for support you should make sure that you performed the following steps:",
			React.createElement(
				"ol",
				{
					style:{
						marginLeft: 20,
						marginTop: 10,
						marginBottom: 10,
						listStyleType: "decimal"
					}
				},
				steps.map(step => React.createElement("li", {}, step))
			),
			React.createElement("b", {}, "If you want to reopen this modal later just click the HELP button in the chatbox next to the gif, emoji and gift button.")
		),
		{
			confirmText: "I did all of the above",
			onConfirm: ()=>showIssueTemplate(authors)
		}
	);
}

const onSwitch = ()=>{
	const channelId = SelectedChannelStore.getChannelId();
	const authors = supportChannels[channelId];
	if(authors === undefined) return;
	const showInfo = ()=>{
		popupLastShownTime[channelId] = Date.now();
		BdApi.saveData("l0c4lh057", "popupLastShownTime", popupLastShownTime);
		showGeneralInformation(authors);
	}
	if(librarySettings.showHelpButton){
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
		buttons.insertAdjacentElement("afterbegin", button);
	}
	if(librarySettings.automaticallyShowHelpPopup){
		const lastShown = popupLastShownTime[channelId] || 0;
		if((lastShown + 7*24*60*60*1000) > Date.now()) return;
		showInfo();
	}
};
require("electron").remote.getCurrentWebContents().on("did-navigate-in-page", onSwitch);
onSwitch();

const patches = [];
const allAuthors = Object.values(supportChannels).flat();
const libSettings = (()=>{
	const panel = document.createElement("div");
	const createSwitch = (name, description, checked, onChange) => {
		const s = document.createElement("div");
		s.className = "plugin-input-container";
		s.innerHTML = `
				<div class="flex-1xMQg5 flex-1O1GKY da-flex da-flex vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;">
					<div class="flex-1xMQg5 flex-1O1GKY da-flex da-flex horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;">
						<div class="flexChild-faoVW3 da-flexChild" style="flex: 1 1 auto;">
							<label for="uid_120" class="titleDefault-a8-ZSr title-31JmR4 da-titleDefault da-title">
								${name}
							</label>
						</div>
						<div class="flexChild-faoVW3 da-flexChild switchEnabled-V2WDBB switch-3wwwcV da-switchEnabled da-switch ${checked ? "valueChecked-m-4IJZ" : "valueUnchecked-2lU_20"} value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" tabindex="0" style="flex: 0 0 auto;">
							<input id="uid_120" class="checkboxEnabled-CtinEn checkbox-2tyjJg da-checkboxEnabled da-checkbox" type="checkbox" tabindex="-1" ${checked ? "checked" : ""}>
						</div>
					</div>
					<div class="colorStandard-2KCXvj size14-e6ZScH description-3_Ncsb formText-3fs7AJ da-description da-formText note-1V3kyJ da-note modeDefault-3a2Ph1 da-modeDefault" style="flex: 1 1 auto;">
						${description}
					</div>
					<div class="divider-3573oO da-divider dividerDefault-3rvLe- da-dividerDefault"></div>
				</div>
		`;
		s.querySelector("input").addEventListener("change", e=>{
			if(e.target.checked){
				e.target.parentElement.className = "flexChild-faoVW3 da-flexChild switchEnabled-V2WDBB switch-3wwwcV da-switchEnabled da-switch valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";
			}else{
				e.target.parentElement.className = "flexChild-faoVW3 da-flexChild switchEnabled-V2WDBB switch-3wwwcV da-switchEnabled da-switch valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";
			}
			onChange(e.target.checked);
		});
		return s;
	};
	panel.insertAdjacentHTML("beforeend", `<h2 class="h5-18_1nd title-3sZWYQ da-h5 da-title defaultMarginh5-2mL-bP da-defaultMarginh5 defaultColor-1_ajX0 da-defaultColor" style="font-size:15px;">Support Helper Settings (does not have to do with the plugin)</h2>`);
	panel.insertAdjacentElement("beforeend", createSwitch("Show help button", "Shows a help button in the chatbox of certain channels to help you create bug reports", librarySettings.showHelpButton, checked=>{
		librarySettings.showHelpButton = checked;
		BdApi.saveData("l0c4lh057", "librarySettings", librarySettings);
	}));
	panel.insertAdjacentElement("beforeend", createSwitch("Automatically show help popup", "Shows the help popup automatically every 7 days when entering a channel that has the help button", librarySettings.automaticallyShowHelpPopup, checked=>{
		librarySettings.automaticallyShowHelpPopup = checked;
		BdApi.saveData("l0c4lh057", "librarySettings", librarySettings);
	}));
	return panel;
})();
secret.patchPlugin = plugin=>{
	if(typeof plugin.getSettingsPanel !== "function"){
		plugin.getSettingsPanel = ()=>libSettings;
		patches.push(()=>plugin.getSettingsPanel = undefined);
	}else{
		const getSettingsPanel = plugin.getSettingsPanel.bind(plugin);
		plugin.getSettingsPanel = ()=>{
			const panel = getSettingsPanel();
			panel.insertAdjacentElement("beforeend", libSettings);
			return panel;
		};
		patches.push(()=>plugin.getSettingsPanel = getSettingsPanel);
	}
}
BdApi.Plugins.getAll()
		.filter(plugin => plugin.getAuthor().split(",").map(author => author.trim()).some(author => allAuthors.includes(author)))
		.forEach(secret.patchPlugin);

secret.stopActivity = ()=>{
	require("electron").remote.getCurrentWebContents().off("did-navigate-in-page", onSwitch);
	patches.forEach(unpatch => unpatch());
}
global.__l0c4lh057s_secret_stuff = secret;
})()
