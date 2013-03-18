// @version 0.0.30
var com_senocular_LoUDefiant_pageScript = function(){
	
function debug(msg){ 
	msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
	if (console) console.log("LoU TDK: " + msg);
}

// const
{
var EXTENSION_VERSION = "0.0.28";


var INIT_ATTEMPT_INTERVAL = 2000;
var COMMAND_QUEUE_INTERVAL = 800;
var STATUS_AUTOHIDE_DELAY = 3000;
var EVENT_PRIORITY_DEFER_DELAY = 250;

var FAITH_BY_ID = ["Compassion","Honesty","Honor","Humility","Justice","Sacrafice","Spirituality","Valor"];
var STORAGE_PREFIX = "senocular_tdk_";
var NOTE_REGISTRY_STATE_ID = "note_registry_state";
var TRADE_LIST_STATE_ID = "trade_list_state";
var CITY_FILTER_STATE_ID = "city_filter_state";
var PREFERENCES_DATA_ID = "pref_data";

var CITY_GUARD_UNIT_ID = "1";
var RAM_UNIT_ID = "13";
var CATAPULT_UNIT_ID = "14";
var BALLISTA_UNIT_ID = "15";
var BARON_UNIT_ID = "19";
var DO_NOT_ATTACK_UNITS = {};
	DO_NOT_ATTACK_UNITS[BARON_UNIT_ID] = 1;
	DO_NOT_ATTACK_UNITS[CITY_GUARD_UNIT_ID] = 1;
var DO_NOT_PLUNDER_UNITS = {};
	DO_NOT_PLUNDER_UNITS[RAM_UNIT_ID] = 1;
	DO_NOT_PLUNDER_UNITS[CATAPULT_UNIT_ID] = 1;
	DO_NOT_PLUNDER_UNITS[BALLISTA_UNIT_ID] = 1;
	
var BUILDING_TYPE_BY_RES_TYPE = [28,29,27,30]; // stone,wood,iron,lake
var TOWN_HALL_BUILDING_ID = 12;
var CITY_WALL_BUILDING_ID = 23; // id=57,getType()=23
var CASTLE_BUILDING_ID = 21;
var PALACE_BUILDING_ID = 21;
var CANNOT_DEMOLISH_BUILDINGS = {}
	CANNOT_DEMOLISH_BUILDINGS[TOWN_HALL_BUILDING_ID] = 1;
	CANNOT_DEMOLISH_BUILDINGS[CITY_WALL_BUILDING_ID] = 1;
	CANNOT_DEMOLISH_BUILDINGS[CASTLE_BUILDING_ID] = 1;
var CITY_BUILDING_IDS = [ // single clicking; correlates to UI organization
	47, 4,20,
	48, 9,38,
	50,15,41,
	49,14,16,
	13, 5,43,
	 7,17,40,
	10,36,44,
	 8,21,37,
	42,45,51,
	11,18,39,
	22,19,46
];
	
var BUILDING_COST = {};
	BUILDING_COST.PRODUCER = [[50,0],[200,0],[400,200],[1400,600],[3500,1500],[6000,3000],[10000,5000],[16000,8000],[25000,13000],[38000,20000]];
	BUILDING_COST.PROCESSOR = [[60,60],[150,150],[350,350],[1100,1100],[2700,2700],[500,5000],[8500,8500],[13500,13500],[21500,21500],[33000,33000]];
	BUILDING_COST.STONE_TOWER = [[0,100],[0,200],[0,400],[0,1000],[0,3000],[0,7000],[0,14000],[0,24000],[0,38000],[0,58000]];
	BUILDING_COST.WOOD_STONE_TOWER = [[30,90],[60,180],[110,330],[280,840],[830,2490],[1930,5790],[3850,11550],[6600,19800],[10500,31500],[16000,48000]];

	BUILDING_COST[12] = [[0,0],[200,0],[500,100],[1000,300],[3000,1500],[8000,4000],[15000,10000],[30000,25000],[60000,60000],[120000,120000]];

	BUILDING_COST[47] = BUILDING_COST.PRODUCER;
	BUILDING_COST[ 4] = [[0,50],[0,200],[0,600],[0,1000],[0,1500],[0,2200],[0,3500],[0,4500],[0,6000],[0,8000]];
	BUILDING_COST[20] = [[60,0],[150,0],[250,50],[500,150],[1600,400],[3000,1000],[6000,2000],[9600,4800],[15000,9000],[20000,13000]];

	BUILDING_COST[48] = BUILDING_COST.PRODUCER;
	BUILDING_COST[ 9] = [[0,50],[0,200],[0,600],[0,1000],[0,1500],[0,2200],[0,3500],[0,4500],[0,6000],[0,8000]];
	BUILDING_COST[38] = [[0,200],[0,400],[0,600],[0,1000],[0,1500],[0,2200],[0,3500],[0,5000],[0,7000],[0,10000]];

	BUILDING_COST[50] = BUILDING_COST.PRODUCER;
	BUILDING_COST[15] = [[15,30],[30,60],[55,110],[140,280],[400,800],[1000,2000],[1900,3800],[3200,6400],[5100,10200],[8000,16000]];
	BUILDING_COST[41] = BUILDING_COST.STONE_TOWER;

	BUILDING_COST[49] = BUILDING_COST.PRODUCER;
	BUILDING_COST[14] = [[0,50],[0,150],[0,300],[0,600],[0,120],[0,2500],[0,4000],[0,7000],[0,11500],[0,17500]];
	BUILDING_COST[16] = [[20,40],[40,80],[80,160],[200,400],[600,1200],[1400,2800],[2800,5600],[4800,9600],[7500,15000],[11500,23000]];

	BUILDING_COST[13] = [[0,100],[0,300],[0,600],[0,2000],[1000,4000],[2000,7000],[3500,11500],[7000,17000],[14000,24000],[29000,29000]];
	BUILDING_COST[ 5] = [[40,20],[80,40],[160,80],[400,200],[1200,600],[1800,1400],[5600,2800],[9600,4800],[15200,7600],[23200,11600]];
	BUILDING_COST[43] = BUILDING_COST.WOOD_STONE_TOWER;

	BUILDING_COST[ 7] = BUILDING_COST.PROCESSOR;
	BUILDING_COST[17] = [[25,50],[55,110],[110,220],[275,550],[800.1600],[1900,3800],[3750,7500],[6500,13000],[10200,20400],[15500,31000]];
	BUILDING_COST[40] = BUILDING_COST.STONE_TOWER;

	BUILDING_COST[10] = BUILDING_COST.PROCESSOR;
	BUILDING_COST[36] = [[30,60],[60,120],[120,240],[300,600],[900,1800],[2100,4200],[4200,8400],[7200,14400],[11400,22800],[17400,34800]];
	BUILDING_COST[44] = [[30,90],[60,180],[110,330],[280,840],[830,2490],[1930,5790],[3850,11550],[6600,19800],[10500,31500],[16000,48000]];

	BUILDING_COST[ 8] = BUILDING_COST.PROCESSOR;
	BUILDING_COST[37] = [[35,70],[70,140],[135,270],[335,670],[1000,2000],[2350,4700],[4650,9300],[8000,16000],[12700,25400],[19500,39000]];

	BUILDING_COST[42] = BUILDING_COST.STONE_TOWER;
	BUILDING_COST[45] = BUILDING_COST.WOOD_STONE_TOWER;

	BUILDING_COST[11] = BUILDING_COST.PROCESSOR;
	BUILDING_COST[18] = [[40,80],[75,150],[150,300],[370,740],[1100,2200],[2600,5200],[5200,10400],[8900,17800],[14000,28000],[21500,43000]];
	BUILDING_COST[39] = BUILDING_COST.STONE_TOWER;

	BUILDING_COST[22] = [[80,40],[160,80],[320,160],[800,400],[2400,1200],[5600,2800],[11200,5600],[19200,96],[30400,15200],[46400,23200]];
	BUILDING_COST[19] = BUILDING_COST.WOOD_STONE_TOWER;
	BUILDING_COST[46] = [[50,100],[100,200],[200,400],[500,1000],[1500,3000],[3500,7000],[7000,14000],[12000,24000],[19000,38000],[29000,58000]];

var PLUNDER_ORDER_ID = 2;
var ATTACK_ORDER_ID = 3;
var SUPPORT_ORDER_ID = 4;
var SIEGE_ORDER_ID = 5;
var MAX_NOTEPAD_TITLE_SIZE = 80;

var LINK_STYLE = "color:#2d5395;text-decoration:none;"
}
// END const

function init(){
debug('in init');
	
	// dependencies; these should exist before init can complete
	// if they don't, an error is thrown and a poller will continue
	// to attempt to init() until all dependencies are available
	(function (){
		var app = qx.core.Init.getApplication();
		var	dependencies = [
			app.serverBar,
			//app.cityDetailView.actionArea, not sure why this breaks it, but it does
			app.cityInfoView.buildingQueue,
			app.chat,
			webfrontend.data.City.getInstance(),
			webfrontend.config.Config.getInstance().getChat()
		];
		var i = dependencies.length;
		while(i--){
			if (!dependencies[i])
				throw new Error("Dependency not available");
		}
	})();
	
	
	function create(){
		var extension = senocular.tdk.TDKExtension.getInstance();
		extension.loadPreferences();
		extension.rebuildFeatures();
		debug("created");
	}
	
	// initialize
	
	// =============== TOOLS ===============
	
	qx.Class.define("senocular.tdk.TDKExtension", {
		extend: qx.core.Object,
		type: "singleton",
		construct: function () {
			this.prefs = {
				extensionButtonsPosition:"BCH",
				extensionButtonsShowTDK:true,
				extensionButtonsShowTools:false,
				extensionButtonsShowNotes:true,
				extensionButtonsShowTrades:true,
				extensionButtonsShowCities:true,
				extensionButtonsShowAbout:false,
				enableAttackCityButtons:true,
				attackCityButtonsPosition:1,
				enableSendCityButtons:true,
				sendCityButtonsPosition:3,
				sendCityButtonsPercentCarts:100,
				enableBuildingCounts:true,
				enableCityDemoToggle:true,
				cityDemoToggleFlash:false,
				cityDemoToggleAutoOff:true,
				cityDemoOptions: new_Array(35,true), // filled array, 33 build types + 2 for demolish, upgrade
				enableChatCommander:true,
				enableNotepadButtons:true,
				enableChatNotifications:false,
				chatNotificationsWhenMinimized:true,
				chatNotificationsPrivate:true,
				chatNotificationsName:true,
				chatNotificationsTextMatches:"glory",
				enableDailyFreeRewardNotifications:true,
				notificationAutoDismiss:0,
				notificationsSound:true
			};
		},
		members:{
			prefs:null,
			contextOptions:null,
			uiButtons:null,
			eggs:null,
			loadPreferences: function(){
				var savedPrefs = loadSavedData(PREFERENCES_DATA_ID);
				if (savedPrefs){
					for (var p in this.prefs){
						if (savedPrefs.hasOwnProperty(p)){
							this.prefs[p] = savedPrefs[p];
						}
					}
				}
			},
			savePreferences: function(){
				saveData(PREFERENCES_DATA_ID, this.prefs);
			},
			rebuildFeatures: function(){
				
				var instance;
				
				try {
					// always there
					if (this.contextOptions == null){
						this.contextOptions = senocular.tdk.OptionsPageInContext.getInstance();
						this.contextOptions.init();
					}
				}catch(e){ debug(e); }
				
				
				try {
					if (this.uiButtons == null)
						this.uiButtons = senocular.tdk.UIButtons.getInstance();
					
					this.uiButtons.positionInView();
				}catch(e){ debug(e); }
				
				
				try {
					instance = senocular.tdk.CityAttackOptions.getInstance();
					instance.setEnable( Boolean(this.prefs.enableAttackCityButtons) );
					if (instance.enabled)
						instance.positionInStack(this.prefs.attackCityButtonsPosition);

				}catch(e){ debug(e); }
				
				
				try {
					instance = senocular.tdk.SendPalaceResourcesOptions.getInstance();
					instance.setEnable( Boolean(this.prefs.enableSendCityButtons) );
					if (instance.enabled)
						instance.positionInStack(this.prefs.sendCityButtonsPosition);
					
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.CityBuildingCounts.getInstance().setEnable(
						Boolean(this.prefs.enableBuildingCounts)
					);
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.ChatCommander.getInstance().setEnable(
						Boolean(this.prefs.enableChatCommander)
					);
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.NotepadButtons.getInstance().setEnable(
						Boolean(this.prefs.enableNotepadButtons)
					);
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.ChatNotifications.getInstance().setEnable(
						Boolean(this.prefs.enableChatNotifications)
					);
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.DailyRewardNotifications.getInstance().setEnable(
						Boolean(this.prefs.enableDailyFreeRewardNotifications)
					);
				}catch(e){ debug(e); }
				
				
				try {
					senocular.tdk.CitySingleClickOperations.getInstance().setEnable(
						Boolean(this.prefs.enableCityDemoToggle)
					);
					
					if (this.prefs.enableCityDemoToggle){
						senocular.tdk.CitySingleClickOperations.getInstance().rebuildOptions(this.prefs.cityDemoOptions);
					}
				}catch(e){ debug(e); }
				
				
				
				try {
					if (this.eggs == null){
						this.eggs = senocular.tdk.HappyEaster.getInstance();
						this.eggs.init();
					}
				}catch(e){ debug(e); }
				
			}
		}
	});
	// END TDKExtension
	
	qx.Class.define("senocular.tdk.UIButtons", {
		type:"singleton",
		extend: qx.ui.container.Composite,
		construct: function(){
			this.base(arguments, new qx.ui.layout.VBox(0));
			this.buildUI();
		},
		members:{
			vLayout:null,
			decor:null,
			headSpace:null,
			footSpace:null,
			hLayout:null,
			viewPosition:null,
			buttonWrapper:null,
			buttonList:null,
			buttonsVisible:true,
			tdkLabel:null,
			toolsButton:null,
			notesButton:null,
			tradesButton:null,
			citiesButton:null,
			aboutButton:null,
			buildUI:function(){
				
				// create elements
				this.vLayout = new qx.ui.layout.VBox(0);
				this.decor = new qx.ui.decoration.Single().set({backgroundColor:"#282924", width:1, color:"#7B5930"});
				this.headSpace = new qx.ui.core.Spacer();
				this.footSpace = new qx.ui.core.Spacer();
				this.hLayout = new qx.ui.layout.HBox(0);
				
				this.buttonWrapper = new qx.ui.container.Composite( this.hLayout );
				
				this.tdkLabel = new qx.ui.basic.Label("TDK").set({textColor:"#F3D298", paddingLeft:2, paddingRight:2, alignX:"center", alignY:"middle"});
				this.tdkLabel.addListener("click", this.toggleButtonsVisible, this);
				
				this.toolsButton = new qx.ui.form.Button("Tools");
				this.toolsButton.set({appearance:"button-text-small", toolTipText:"Open TDK Tools window"});
				this.toolsButton.addListener("execute", this.showToolsWindow, this);
				
				this.notesButton = new qx.ui.form.Button("Notes");
				this.notesButton.set({appearance:"button-text-small", toolTipText:"Open notes"});
				this.notesButton.addListener("execute", this.showNotesWindow, this);
				
				this.tradesButton = new qx.ui.form.Button("Trades");
				this.tradesButton.set({appearance:"button-text-small", toolTipText:"Open trades"});
				this.tradesButton.addListener("execute", this.showTradesWindow, this);
				
				this.citiesButton = new qx.ui.form.Button("Cities");
				this.citiesButton.set({appearance:"button-text-small", toolTipText:"Open cities list"});
				this.citiesButton.addListener("execute", this.showCitiesDialog, this);
				
				var optionsMenu = new qx.ui.menu.Button("TDK - Options");
				optionsMenu.addListener("execute", this.showOptionsWindow, this);
				dsislou.main.getInstance().getMainMenu().add(optionsMenu);
				
				this.aboutButton = new qx.ui.form.Button("About");
				this.aboutButton.set({appearance:"button-text-small", toolTipText:"Open about page"});
				this.aboutButton.addListener("execute", this.showAboutWindow, this);
				
				this.buttonList = [this.toolsButton, this.notesButton, this.tradesButton, this.citiesButton, this.aboutButton];
				
				// add elements
				this.add(this.buttonWrapper);
			},
			toggleButtonsVisible:function(){
				this.buttonsVisible = !this.buttonsVisible;
				var vis = (this.buttonsVisible) ? "visible" : "excluded";
				
				var i = this.buttonList.length;
				while(i--){
					this.buttonList[i].setVisibility(vis);
				}
				
			},
			positionInView:function(){
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				
				
				// No display
				if (prefs.extensionButtonsPosition == "hidden"){
					var parent = this.getLayoutParent();
					if (parent)
						parent.remove(this);
					
					return;
				}
				
				
				// What to display
				this.buttonWrapper.removeAll();
				if (prefs.extensionButtonsShowTDK){
					this.buttonWrapper.add(this.tdkLabel);
				}else{
					// with no toggle, we need to make sure other buttons aren't hidden
					if (this.buttonsVisible == false)
						this.toggleButtonsVisible();
				}
				if (prefs.extensionButtonsShowTools)
					this.buttonWrapper.add(this.toolsButton);
				
				if (prefs.extensionButtonsShowNotes)
					this.buttonWrapper.add(this.notesButton);
				
				if (prefs.extensionButtonsShowTrades)
					this.buttonWrapper.add(this.tradesButton);
				
				if (prefs.extensionButtonsShowCities)
					this.buttonWrapper.add(this.citiesButton);
				
				if (prefs.extensionButtonsShowAbout)
					this.buttonWrapper.add(this.aboutButton);
				
				
				// Where to display
				var position = prefs.extensionButtonsPosition;
				if (position == this.viewPosition)
					return;
					
				var app = qx.core.Init.getApplication();
				switch (position){
					
					// Y positioning - X positioning - Horizontal or Vertical
					case "MLV":{
						this.goVertical(1,1);
						app.desktop.add(this, {
							left:app.infoWidth + app.borderWidth, 
							top:app.titleHeight + app.borderHeight, 
							bottom:app.serverHeight + app.borderHeight,
							right:null
						});
						break;
					}
					
					case "MRV":{
						this.goVertical(1,1);
						app.desktop.add(this, {
							left:null,
							top:app.titleHeight + app.borderHeight, 
							bottom:app.serverHeight + app.borderHeight, 
							right:0 // app.borderWidth // <- there really isn't any right border; 0 docks better
						});
						break;
					}
					
					case "BRV":{
						this.goVertical(1,0);
						app.desktop.add(this, {
							left:null,
							top:app.titleHeight + app.borderHeight, 
							bottom:app.serverHeight + app.borderHeight, 
							right:0 
						});
						break;
					}
					
					case "BRH":{
						this.goHorizontal(1);
						app.desktop.add(this, {
							left:null,
							top:null,
							bottom:app.serverHeight + app.borderHeight, 
							right:0 
						});
						break;
					}
					
					case "TCH":{
						this.goHorizontal();
						app.title.add(this, {
							left:995,
							top:37,
							bottom:null,
							right:null
						});
						break;
					}
					
					case "BCH":
					default:{
						this.goHorizontal();
						app.serverBar.add(this, {
							left:425,
							top:2, 
							bottom:null,
							right:null
						});
						break;
					}
				}
				
				this.viewPosition = position;
			},
			goHorizontal:function(useDecor){
				this.buttonWrapper.set({
					layout:this.hLayout,
					padding:(useDecor ? 2 : 0),
					decorator:(useDecor ? this.decor : null) 
				});
				
				if (this.headSpace.getLayoutParent() == this)
					this.remove(this.headSpace);
				if (this.footSpace.getLayoutParent() == this)
					this.remove(this.footSpace);
			},
			goVertical:function(head, foot){
				this.buttonWrapper.set({
					layout:this.vLayout, 
					padding:2,
					decorator:this.decor
				});
				
				if (head)
					this.addAt(this.headSpace, 0, {flex:1});
				if (foot)
					this.add(this.footSpace, {flex:1});
			},
			showToolsWindow: function(){
				try {
					senocular.tdk.ToolsWindow.getInstance().toggleVisible();
				}catch(e){ debug(e); }
			},
			showNotesWindow: function(){
				try {
				senocular.tdk.ToolsWindow.getInstance().toggleTab("Notes");
				}catch(e){ debug(e); }
			},
			showTradesWindow: function(){
				try {
				senocular.tdk.ToolsWindow.getInstance().toggleTab("Trades");
				}catch(e){ debug(e); }
			},
			showOptionsWindow: function(){
				senocular.tdk.ToolsWindow.getInstance().toggleTab("Options");
			},
			showAboutWindow: function(){
				try{
				senocular.tdk.ToolsWindow.getInstance().toggleTab("About");
				}catch(e){ debug(e); }
			},
			showCitiesDialog: function(){
				try{
				senocular.tdk.CityList.getInstance().display();
				}catch(e){ debug(e); }
			}
		}
	});
	// END UIButtons
		
	qx.Class.define("senocular.tdk.ToolsWindow", {
		type: "singleton",
		extend: webfrontend.gui.OverlayWidget,
		construct: function() {
			this.base(arguments);
			this.buildUI();
		},
		members: {
			windowTabs:null,
			buildUI:function(){
				this.setTitle("TDK Tools");
				this.clientArea.setLayout( new qx.ui.layout.VBox(3) );
				
				// create elements
				this.windowTabs = new qx.ui.tabview.TabView();
				var versionText = new qx.ui.basic.Label("version: " + EXTENSION_VERSION).set({marginLeft:8}); 
				
				// add elements
				this.clientArea.add( this.windowTabs, {flex: 1} );
				this.windowTabs.add( senocular.tdk.NotesPage.getInstance() );
				this.windowTabs.add( senocular.tdk.PalaceTradesPage.getInstance() );
				this.windowTabs.add( senocular.tdk.OptionsPage.getInstance() );
				this.windowTabs.add( senocular.tdk.AboutPage.getInstance() );
				this.clientArea.add( versionText );
			},
			toggleVisible: function(forceVisible){
				var app = qx.core.Init.getApplication();
				if (app.getCurrentOverlay() == this && !forceVisible){
					app.switchOverlay(null);
					return false;
				}
				
				app.switchOverlay( this );
				return true;
			},
			toggleTab: function(name){
				var selectedName = this.windowTabs.getSelection()[0].getLabel();
				if (selectedName == name){
					this.toggleVisible();
				}else{
					this.toggleVisible(true);
					senocular.tdk.WidgetUtils.selectTabPageByName(this.windowTabs, name);
				}
			}
		}
	});
	// END ToolsWindow
		
	qx.Class.define("senocular.tdk.NotesPage", {
		type: "singleton",
		extend: qx.ui.tabview.Page,
		construct: function() {
			this.base(arguments, "Notes");
			this.buildUI();
			
			var reg = senocular.tdk.NotepadRegistry.getInstance();
			reg.addListener("registryChanged", this.registryChanged, this);
			this.updateFromRegistry();
		},
		members: {
			notesList:null,
			notesTableData:null,
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(8) );
				this.set({padding:2});
				
				this.notesTableData = new webfrontend.data.SimpleColFormattingDataModel();
				this.notesTableData.setColFormat(1,"<div style=\"cursor:pointer;color:#2d5395\">","</div>");
				this.notesTableData.setColumns(["","Subject","Record"],["sel","sub","record"]);
				
				this.notesTable = new webfrontend.ui.CustomTable(this.notesTableData);
				this.notesTable.set({statusBarVisible:false, columnVisibilityButtonVisible:false});
				this.notesTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
				this.notesTable.addListener("cellClick", this.selectNote, this);
				
				var columnModel = this.notesTable.getTableColumnModel();
				columnModel.setDataCellRenderer(0,new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(1,new qx.ui.table.cellrenderer.Html());
				columnModel.setColumnVisible(2,false);
				columnModel.setColumnWidth(0, 32);
				columnModel.setColumnWidth(1, 400);
				
				var buttonRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				var selectAllCheck = new qx.ui.form.CheckBox("Select All").set({font:"bold", marginLeft:2});
				selectAllCheck.addListener("execute", this.selectAll, this);
				var buttonRowSpacerL = new qx.ui.core.Spacer();
				
				var exportButton = new qx.ui.form.Button("Export...");
				exportButton.set({toolTipText:"Export notes data so it can be imported from another computer"});
				exportButton.addListener("execute", this.exportNotes, this);
				var importButton = new qx.ui.form.Button("Import...");
				exportButton.set({toolTipText:"Import notes from an email sent from the export operation"});
				importButton.addListener("execute", this.importNotes, this);
				
				var buttonRowSpacerR = new qx.ui.core.Spacer();
				var deleteSelectedButton = new qx.ui.form.Button("Delete");
				deleteSelectedButton.addListener("execute", this.deleteNotes, this);
				
				var newNoteButton = new qx.ui.form.Button("New Note", "webfrontend/ui/icon_city_notes.png");
				newNoteButton.set({marginLeft:20, marginRight:20, marginTop:5, marginBottom:5});
				newNoteButton.addListener("execute", this.newNote, this);
				
				this.add( newNoteButton );
				this.add( this.notesTable, {flex:1} );
				this.add( buttonRow );
				buttonRow.add( selectAllCheck );
				buttonRow.add( buttonRowSpacerL, {flex:1} );
				buttonRow.add( exportButton );
				buttonRow.add( importButton );
				buttonRow.add( buttonRowSpacerR, {flex:1} );
				buttonRow.add( deleteSelectedButton );
				
			},
			updateFromRegistry:function(){
				
				var mapArray = [];
				var record;
				
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				var i, n = reg.registry.length;
				for (i=0; i<n; i++){
					record = reg.registry[i];
					mapArray.push({
						sel:false, 
						sub:this.getRecordSubject(record),
						record:record
					});
				}
				
				this.notesTableData.setDataAsMapArray(mapArray);
			},
			registryChanged:function(){
				try {
					
				this.updateFromRegistry();
					
				}catch(e){ debug(e); }
			},
			getRecordSubject: function(record){
				if (!record)
					return "(Unknown)";
					
				var text = qx.lang.String.trim( record.sourceText || "" );
				
				var eolIndex = -1;
				var tempIndex;
				
				tempIndex = text.indexOf("\n");
				if (tempIndex != -1)
					eolIndex = tempIndex;
				tempIndex = text.indexOf("\r");
				if (tempIndex != -1 && tempIndex < eolIndex)
					eolIndex = tempIndex;
				if (eolIndex != -1){
					text = text.substr(0, eolIndex);
				}
				
				text = senocular.tdk.Notepad.getRenderedText( text );
				text = qx.lang.String.stripTags(text);
				text = text.substr(0, MAX_NOTEPAD_TITLE_SIZE); // max subject size
				if (!text)
					text = "(None)";
				
				return text;
			},
			newNote: function(){
				try {
					
				senocular.tdk.Notepad.create(null, false);
				
				}catch(e){ debug(e); }
			},
			selectAll: function(event){
				try {
					
				var selectValue = event.getCurrentTarget().getValue();
				var i, n = this.notesTableData.getRowCount();
				for (i=0; i<n; i++){
					this.notesTableData.setValueById("sel", i, selectValue );
				}
					
				}catch(e){ debug(e); }
			},
			deleteNotes: function(){
				try {
					
				var invalid = false;
				var record;
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				var i, n = this.notesTableData.getRowCount();
				for (i=0; i<n; i++){
					if (this.notesTableData.getValueById("sel", i )){
						
						record = this.notesTableData.getValueById("record", i);
						if (record && reg.removeRecord( this.notesTableData.getValueById("record", i) )){
							if(record.note)
								record.note.setSaved(false);
							invalid = true;
						}
					}
				}
				
				if (invalid)
					reg.commit(); // fires event to update view
				
				}catch(e){ debug(e); }
			},
			selectNote: function(event){
				try{
					
				var clickRow = event.getRow();
				var clickCol = event.getColumn();
					
				var id = this.notesTableData.getColumnId(clickCol);
				switch (id) {
					case "sel":{
						this.notesTableData.setValueById(id, clickRow, !this.notesTableData.getValueById(id, clickRow) );
						break;
					}
					case "sub":{
						var reg = senocular.tdk.NotepadRegistry.getInstance();
						var record = this.notesTableData.getValueById("record", clickRow);
						reg.openRecord(record);
						break;
					}
				}
				
				}catch(e){ debug(e); }
			},
			exportNotes:function(){
				try{
					
				var notesData = [];
				var record;
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				var i, n = this.notesTableData.getRowCount();
				for (i=0; i<n; i++){
					if (this.notesTableData.getValueById("sel", i )){
						record = this.notesTableData.getValueById("record", i);
						notesData.push( record.sourceText );
					}
				}
				
				if (notesData.length){
					var exportWindow = senocular.tdk.GenericPageImportExportWindow.getInstance();
					exportWindow.display( "Export", qx.util.Json.stringify(notesData) );
				}else{
					alert("Please select the notes you wish to export.");
				}
					
				}catch(e){ debug(e); }
			},
			importNotes:function(){
				try{
					var importWindow = senocular.tdk.GenericPageImportExportWindow.getInstance();
					importWindow.setImportCallback(this, this.importHandler);
					importWindow.display("Import");
				}catch(e){ debug(e); }
			},
			importHandler:function(data){
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				reg.addRegistryData(data);
				reg.commit();
			}
		}
	});
	// END NotesPage
		
	qx.Class.define("senocular.tdk.PalaceTradesPage", {
		type: "singleton",
		extend: qx.ui.tabview.Page,
		construct: function() {
			this.base(arguments, "Trades");
			
			this.tradesList = loadSavedData(TRADE_LIST_STATE_ID);
			if (this.tradesList instanceof Array == false)
				this.tradesList = [];
			
			this.buildUI();
			this.updateTableData();
		},
		members: {
			tradesList:null,
			tradesTableData:null,
			statusText:null,
			currTradeItem:null,
			savedCityid:-1,
			statusHideDefer:-1,
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(8) );
				this.set({padding:2});
				
				var newTradeButton = new qx.ui.form.Button("New Trade Route",  "resource/webfrontend/ui/icons/icon_trade_cart_16.png");
				newTradeButton.set({marginLeft:20, marginRight:20, marginTop:5, marginBottom:5});
				newTradeButton.addListener("execute", this.newTrade, this);
				
				this.tradesTableData = new webfrontend.data.SimpleColFormattingDataModel();
				this.tradesTableData.setColumns(
					["HIDDEN_DATA",	"",		"Edit",	"From",	"To",	"Send"],
					["__data__",		"sel",	"edit",	"from",	"to",	"send"]);
				this.tradesTableData.setColFormat(2,"<div style=\"cursor:pointer;color:#2d5395;font-weight:bold\">","</div>"); // edit
				this.tradesTableData.setColFormat(3,"<div style=\"cursor:pointer;color:#2d5395\">","</div>"); // from
				this.tradesTableData.setColFormat(4,"<div style=\"cursor:pointer;color:#2d5395\">","</div>"); // to
				this.tradesTableData.setColFormat(5,"<div style=\"cursor:pointer;color:#2d5395;font-weight:bold\">","</div>"); // send
				
				this.tradesTable = new webfrontend.ui.CustomTable(this.tradesTableData);
				this.tradesTable.set({statusBarVisible:false, columnVisibilityButtonVisible:false});
				this.tradesTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
				this.tradesTable.addListener("cellClick", this.tradeCellClick, this);
				
				var columnModel = this.tradesTable.getTableColumnModel();
				columnModel.setDataCellRenderer(1,new qx.ui.table.cellrenderer.Boolean()); // selected
				columnModel.setDataCellRenderer(2,new qx.ui.table.cellrenderer.Html()); // edit
				columnModel.setDataCellRenderer(3,new qx.ui.table.cellrenderer.Html()); // from
				columnModel.setDataCellRenderer(4,new qx.ui.table.cellrenderer.Html()); // to
				columnModel.setDataCellRenderer(5,new qx.ui.table.cellrenderer.Html()); // send
				columnModel.setColumnVisible(0,false); // data
				columnModel.setColumnWidth(1, 32); // selected
				columnModel.setColumnWidth(2, 60); // edit
				columnModel.setColumnWidth(3, 140); // from
				columnModel.setColumnWidth(4, 210); // to
				columnModel.setColumnWidth(5, 60); // send
				
				this.statusText = new qx.ui.basic.Label();
				
				var buttonRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				var selectAllCheck = new qx.ui.form.CheckBox("Select All").set({font:"bold", marginLeft:2});
				selectAllCheck.addListener("execute", this.selectAll, this);
				var buttonRowSpacerL = new qx.ui.core.Spacer();
				
				var exportButton = new qx.ui.form.Button("Export...");
				exportButton.set({toolTipText:"Export trade data so it can be imported from another computer"});
				exportButton.addListener("execute", this.exportTrades, this);
				var importButton = new qx.ui.form.Button("Import...");
				exportButton.set({toolTipText:"Import trades from text generated by the export operation"});
				importButton.addListener("execute", this.importTrades, this);
				
				var buttonRowSpacerR = new qx.ui.core.Spacer();
				var deleteSelectedButton = new qx.ui.form.Button("Delete");
				deleteSelectedButton.addListener("execute", this.deleteTrades, this);
				
				this.add( newTradeButton );
				this.add( this.tradesTable, {flex:1} );
				this.add( this.statusText );
				this.add( buttonRow );
				buttonRow.add( selectAllCheck );
				buttonRow.add( buttonRowSpacerL, {flex:1} );
				buttonRow.add( exportButton );
				buttonRow.add( importButton );
				buttonRow.add( buttonRowSpacerR, {flex:1} );
				buttonRow.add( deleteSelectedButton );
				
			},
			createNewTradeItem:function(fromSelection){
				if (fromSelection == undefined){
					fromSelection = true;
				}
				
				var item = {
					resourcePercent: senocular.tdk.TDKExtension.getInstance().sendCityButtonsPercentCarts,
					cityid: "",
					targetPlayer:  "",
					targetCityid: "",
					
					// generated:
					cityName: "",
					targetCityName: ""
				};
				
				if (fromSelection){
					
					var activeCity = webfrontend.data.City.getInstance();
					item.cityid = activeCity.getId();
					
					var selectedCity = qx.core.Init.getApplication().cityDetailView.city;
					if (selectedCity){
						item.targetCityid = selectedCity.get_Coordinates();
					}
				}
				
				return item;
			},
			newTrade: function(fromSelection){
				try {
					
				var item = this.createNewTradeItem( fromSelection );
				this.openTradeEditWindow( item );
				
				}catch(e){ debug(e); }
			},
			addOrUpdateTradeItem:function(item){
				if (!item) return;
				
				if (this.tradesList.indexOf(item) == -1)
					this.tradesList.push( item );
				
				this.updateTableData();
			},
			updateTableData:function(){
				try {
					
				var mapArray = [];
				var item;
				var i, n = this.tradesList.length;
				for (i=0; i<n; i++){
					item = this.tradesList[i];
					mapArray.push({
						__data__:item,
						sel:false, 
						edit:"Edit",
						from: senocular.tdk.CityUtils.idToString3x3( item.cityid ) +" "+ item.cityName,
						to: senocular.tdk.CityUtils.idToString3x3( item.targetCityid ) +" "+ item.targetCityName + " (" + item.targetPlayer + ")",
						send:"Send"
					});
				}
				
				this.tradesTableData.setDataAsMapArray(mapArray);
				this.saveTrades();
				
				}catch(e){ debug(e); }
			},
			saveTrades:function(){
				saveData(TRADE_LIST_STATE_ID, this.tradesList);
			},
			selectAll: function(event){
				try {
					
				var selectValue = event.getCurrentTarget().getValue();
				var i, n = this.tradesTableData.getRowCount();
				for (i=0; i<n; i++){
					this.tradesTableData.setValueById("sel", i, selectValue );
				}
					
				}catch(e){ debug(e); }
			},
			deleteTrades: function(){
				try {
					
				var item, index;
				var invalid = false;
				var i, n = this.tradesTableData.getRowCount();
				for (i=0; i<n; i++){
					if (this.tradesTableData.getValueById("sel", i )){
						item = this.tradesTableData.getValueById("__data__", i);
						index = this.tradesList.indexOf(item);
						if (index != -1){
							this.tradesList.splice(index, 1);
							invalid = true;
						}
					}
				}
				
				if (invalid)
					this.updateTableData();
				
				}catch(e){ debug(e); }
			},
			tradeCellClick: function(event){
				try{
					
				var clickRow = event.getRow();
				var clickCol = event.getColumn();
					
				var item = this.tradesTableData.getValueById("__data__", clickRow);
				var id = this.tradesTableData.getColumnId(clickCol);
				switch (id) {
					case "sel":{
						this.tradesTableData.setValueById(id, clickRow, !this.tradesTableData.getValueById(id, clickRow) );
						break;
					}
					case "edit":{
						this.openTradeEditWindow(item);
						break;
					}
					case "from":{
						this.openFromLink(item);
						break;
					}
					case "to":{
						this.openToLink(item);
						break;
					}
					case "send":{
						this.sendTrade(item);
						break;
					}
				}
				
				}catch(e){ debug(e); }
			},
			exportTrades:function(){
				try {
					
				var tradesData = [];
				var item;
				var i, n = this.tradesTableData.getRowCount();
				for (i=0; i<n; i++){
					if (this.tradesTableData.getValueById("sel", i )){
						item = this.tradesTableData.getValueById("__data__", i);
						tradesData.push( item );
					}
				}
				if (tradesData.length){ 
					var exportWindow = senocular.tdk.GenericPageImportExportWindow.getInstance();
					exportWindow.display( "Export", qx.util.Json.stringify(tradesData) );
				}else{
					alert("Please select the trades you wish to export.");
				}
				
				}catch(e){ debug(e); }
			},
			importTrades:function(){
				try{
					
				var importWindow = senocular.tdk.GenericPageImportExportWindow.getInstance();
				importWindow.setImportCallback(this, this.importHandler);
				importWindow.display("Import");
					
				}catch(e){ debug(e); }
			},
			importHandler:function(data){
				if (data instanceof Array){
					this.tradesList = data;
					this.updateTableData();
				}
			},
			openTradeEditWindow:function(item){
				var tradeWindow = senocular.tdk.NewPalaceTradeWindow.getInstance();
				tradeWindow.center();
				tradeWindow.open();	
				tradeWindow.setData(item);
			},
			openFromLink:function(item){
				var pos = senocular.tdk.CityUtils.idToPosition(item.cityid);
				webfrontend.gui.Util.showPos(pos[0], pos[1]);
			},
			openToLink:function(item){
				var pos = senocular.tdk.CityUtils.idToPosition(item.targetCityid);
				webfrontend.gui.Util.showPos(pos[0], pos[1]);
			},
			sendTrade:function(item){
				try {
					
				if (this.currTradeItem){
					this.setStatus("Error: Please wait for previous trade to complete.", true);
					return;
				}
				
				this.setStatus("Calling all carts...");
				
				var activeCity = webfrontend.data.City.getInstance();
				this.currTradeItem = item;
				this.savedCityid = activeCity.getId();
					
				if (this.savedCityid == this.currTradeItem.cityid){
					this.sendTradeForSelectedCity();
				}else{
					activeCity.addListener("changeVersion", this.onCitySelected, this);
					activeCity.setRequestId( this.currTradeItem.cityid );
				}
				
				}catch(e){ debug(e); }
			},
			onCitySelected:function(){
				try {
					
				var activeCity = webfrontend.data.City.getInstance();
				activeCity.removeListener("changeVersion", this.onCitySelected, this);
					
				if (activeCity.getId() != this.currTradeItem.cityid){
					// user might have changed. Do not return to saved city
					this.completed("Aborting trade: Unexpected city change", false);
					return;
				}
				
				this.sendTradeForSelectedCity();
				
				}catch(e){ debug(e); }
			},
			sendTradeForSelectedCity:function(){
				try {
					
				var cityidMap = webfrontend.data.Player.getInstance().cities;
				var activeCity = webfrontend.data.City.getInstance();
				var resOptions = senocular.tdk.SendPalaceResourcesOptions.getInstance();
				var resourcesSent = resOptions.getResourcesToSend(activeCity, this.currTradeItem.resourcePercent, true, true);
					
				if (resourcesSent == null){
					this.completed("Request Denied: No carts available");
					return;
				}
				
				if (resourcesSent.length == 0){
					this.completed("Request Denied: No resources available");
					return;
				}
				
				var request = {
					res: resourcesSent,
					cityid: this.currTradeItem.cityid,
					targetPlayer:  this.currTradeItem.targetPlayer,
					targetCity: senocular.tdk.CityUtils.idToString3x3( this.currTradeItem.targetCityid ),
					tradeTransportType: 1, // carts for now
					palaceSupport: true // assume always palace trade
				};
				
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("TradeDirect", request, this, this.onTradeSent);
				
				}catch(e){ debug(e); }
			},
			onTradeSent:function(ok, errorCode){
				try {
				
				if (errorCode == 0){
					this.completed(this.currTradeItem.cityName + " -> " + this.currTradeItem.targetCityName + ": Palace resources en route!");
				}else{
					this.completed("Your defiant carts refused to leave! ("+errorCode+")");
				}
				
				}catch(e){ debug(e); }
			},
			completed:function(status, restoreState){
				if (restoreState == undefined) restoreState = true;
				
				this.setStatus(status, true);
				this.currTradeItem = null; // used to detect existing trades
				
				if (restoreState){
					var activeCity = webfrontend.data.City.getInstance();
					if (this.savedCityid != -1 && this.savedCityid != activeCity.getId()){
						webfrontend.data.City.getInstance().setRequestId(this.savedCityid);
					}
				}
			},
			setStatus:function(status, autoRemove){
				window.clearTimeout( this.statusHideDefer );
				this.statusText.setValue( status );
				if (autoRemove){
					this.statusHideDefer = defer(this.setStatus, this, STATUS_AUTOHIDE_DELAY, [""]);
				}
			},
		}
	});
	// END PalaceTradesPage

	qx.Class.define("senocular.tdk.NewPalaceTradeWindow", {
		type: "singleton",
		extend: qx.ui.window.Window,
		construct: function() {
			this.base(arguments, "New Palace Trade");
			this.buildUI();
		},
		members: {
			currItem:null,
			citySelect:null,
			resourceSelect:null,
			xCoord:null,
			yCoord:null,
			cityNameInfoText:null,
			playerNameInfoText:null,
			percentCartsSpinner:null,
			errorText:null,
			infoQueueID:-1,
			isRequestingInfo:false,
			errorHideDefer:-1,
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(10) );
				this.set({
					width:400,minWidth:100,maxWidth:1000,height:280,minHeight:100,maxHeight:800,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,showClose:false,resizeSensitivity:7,contentPadding:5,useMoveFrame:true
				});
					
				webfrontend.gui.Util.formatWinClose(this);	
				var app = qx.core.Init.getApplication();
				
				var targetLabel = new qx.ui.basic.Label("Target:").set({font:"font_subheadline_2nd_serif_bold",textColor:"headline-serif-dark"});
				
				var targetCitiesGrid = new qx.ui.container.Composite( new qx.ui.layout.Grid(3, 3) );
				
				var toLabel = new qx.ui.basic.Label("To:");
				var toRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				var xLabel = new qx.ui.basic.Label("X:");
				var yLabel = new qx.ui.basic.Label("Y:");
				this.xCoord = new qx.ui.form.TextField("");
				this.xCoord.addListener("focusout", this.getAndUpdateToCityInfo, this);
				app.setElementModalInput(this.xCoord);
				this.yCoord = new qx.ui.form.TextField("");
				this.yCoord.addListener("focusout", this.getAndUpdateToCityInfo, this);
				app.setElementModalInput(this.yCoord);
				var centerButton = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_buildings_centerview.png");
				centerButton.set( {padding:2, toolTipText:"Focus on city"} );
				centerButton.addListener("execute", this.onCenterTarget, this);
				var captureButton = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_playerinfo_townicon_civil_land.png");
				captureButton.set( {padding:2, toolTipText:"Grab coordinates from selected city"} );
				captureButton.addListener("execute", this.onCaptureTarget, this);
				
				var infoRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				var playerNameLabel = new qx.ui.basic.Label("Player:");
				this.playerNameInfoText = new qx.ui.basic.Label("");
				var cityNameLabel = new qx.ui.basic.Label("City:");
				this.cityNameInfoText = new qx.ui.basic.Label("");
				
				
				var fromLabel = new qx.ui.basic.Label("From:");
				this.citySelect = new qx.ui.form.SelectBox();
				this.buildCitiesSelect();
					
				var resourcesLabel = new qx.ui.basic.Label("Resources:").set({font:"font_subheadline_2nd_serif_bold",textColor:"headline-serif-dark"});
				
				var sendSpinnerRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				this.percentCartsSpinner = new qx.ui.form.Spinner(0, 100, 100);
				app.setElementModalInput(this.percentCartsSpinner);
				var sendPercentLabel = new qx.ui.basic.Label("% of carts to send (sending Wood and Stone)");
				
				var vSpace = new qx.ui.core.Spacer();
				
				this.errorText = new qx.ui.basic.Label("");
				
				var actionsRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
				var toggleTradesButton = new qx.ui.form.Button("Toggle Trades");
				toggleTradesButton.addListener("execute", this.toggleTrades, this);
				var actionSpace = new qx.ui.core.Spacer();
				var cancelButton = new qx.ui.form.Button("Cancel");
				cancelButton.addListener("execute", this.cancel, this);
				var saveButton = new qx.ui.form.Button("Save");
				saveButton.addListener("execute", this.save, this);
				

				this.add( targetLabel );
				
				this.add( targetCitiesGrid );
				targetCitiesGrid.add( toLabel, {column:0, row:0} );
				targetCitiesGrid.add( toRow, {column:1, row:0} );
				toRow.add(xLabel);
				toRow.add(this.xCoord);
				toRow.add(yLabel);
				toRow.add(this.yCoord);
				toRow.add(centerButton);
				toRow.add(captureButton);
				
				targetCitiesGrid.add( infoRow, {column:1, row:1} );
				infoRow.add( playerNameLabel, {flex: 1} );
				infoRow.add( this.playerNameInfoText, {flex: 1} );
				infoRow.add( cityNameLabel, {flex: 1} );
				infoRow.add( this.cityNameInfoText, {flex: 1} );
				
				targetCitiesGrid.add( fromLabel, {column:0, row:2} );
				targetCitiesGrid.add( this.citySelect, {column:1, row:2} );
				
				this.add( resourcesLabel );
				
				this.add( sendSpinnerRow );
				sendSpinnerRow.add( this.percentCartsSpinner );
				sendSpinnerRow.add( sendPercentLabel );
				
				
				this.add( vSpace, {flex: 1} );
				
				this.add( this.errorText, {flex: 1} );
				this.add( actionsRow );
				actionsRow.add( toggleTradesButton );
				actionsRow.add( actionSpace, {flex: 1} );
				actionsRow.add( cancelButton );
				actionsRow.add( saveButton );
					
			},
			buildCitiesSelect:function(){
				this.citySelect.removeAll();
				this.citySelect.add( new qx.ui.form.ListItem("Select city", null, "__CITY__") );
				var cityidMap = webfrontend.data.Player.getInstance().cities;
				var cityid, city, ref;
				for (cityid in cityidMap){
					city = cityidMap[cityid];
					ref = city.reference;
					ref = (ref) ? " [" + ref + "]" : "";
					this.citySelect.add( new qx.ui.form.ListItem(city.name + ref, null, cityid) );
				}
			},
			setData:function(item){
				this.item = item;
				if (item == null) return;
				
				this.buildCitiesSelect();
				this.updateControls();
			},
			updateControls:function(){
				if (this.item.targetCityid){
					var toPos = senocular.tdk.CityUtils.idToPosition(this.item.targetCityid, true);
					this.xCoord.setValue( toPos[0] );
					this.yCoord.setValue( toPos[1] );
				}else{
					this.xCoord.setValue("");
					this.yCoord.setValue("");
				}
				
				if (this.item.cityid){
					senocular.tdk.WidgetUtils.setSelectByModel( this.citySelect, this.item.cityid );
				}
				
				this.percentCartsSpinner.setValue( this.item.resourcePercent == undefined ? 100 : this.item.resourcePercent );
				
				this.getAndUpdateToCityInfo();
			},
			getTargetPos:function(){
				var x = this.xCoord.getValue();
				var y = this.yCoord.getValue();
				if (!x || !y) return null;
				var xn = Number(x);
				var yn = Number(y);
				if (isNaN(xn) || isNaN(yn)) return null;
				return [xn, yn];
			},
			getAndUpdateToCityInfo:function(){
				try {
				
				var targetPos = this.getTargetPos();
				if (targetPos){
					var targetCityid = senocular.tdk.CityUtils.string3x3ToID(targetPos[0] + ":" + targetPos[1]);
					this.requestCityInfoFor(targetCityid);
				}
				
				}catch(e){ debug(e); }
			},
			requestCityInfoFor:function(id){
				if (!this.isRequestingInfo){
					this.isRequestingInfo = true;
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("GetPublicCityInfo", {id:id}, this, this.onCityInfo);
				}else{
					this.infoQueueID = id;
				}
			},
			onCityInfo:function(ok, event){
				try {
					
				this.isRequestingInfo = false;
					
				if (ok && event && event.pn && event.n){
					this.playerNameInfoText.setValue( event.pn );
					this.cityNameInfoText.setValue( event.n );
				}else{
					this.playerNameInfoText.setValue("");
					this.cityNameInfoText.setValue("");
				}
					
				if (this.infoQueueID != -1){
					var id = this.infoQueueID;
					this.infoQueueID = -1;
					this.requestCityInfoFor(id);
				}
				
				}catch(e){ debug(e); }
			},
			onCenterTarget:function(){
				try {
				
				var targetPos = this.getTargetPos();
				if (targetPos){
					webfrontend.gui.Util.showPos(targetPos[0], targetPos[1]);
				}
				
				}catch(e){ debug(e); }
			},
			onCaptureTarget:function(ok, event){
				try {
				
				var selectedCity = qx.core.Init.getApplication().cityDetailView.city;
				if (selectedCity){
					this.item.targetCityid = selectedCity.get_Coordinates();
					this.updateControls();
				}
				
				}catch(e){ debug(e); }
			},
			toggleTrades:function(){
				try {
				senocular.tdk.ToolsWindow.getInstance().toggleTab("Trades");
				}catch(e){ debug(e); }	
			},
			save:function(){
				try {
					
				if (this.item == null){
					this.close();
					return;
				}
				
				var targetPos = this.getTargetPos();
				var playerInfoName = this.playerNameInfoText.getValue();
				if (!targetPos || !playerInfoName){
					this.errorMessage("Error: Invalid target city");
					return;
				}
				this.item.targetCityid = senocular.tdk.CityUtils.positionToID( [this.xCoord.getValue(), this.yCoord.getValue()] );
				this.item.targetPlayer = playerInfoName;
				this.item.targetCityName = this.cityNameInfoText.getValue();
				
				var cityidMap = webfrontend.data.Player.getInstance().cities;
				sourceCityid = this.citySelect.getSelection()[0].getModel(); // get value from selection
				if (sourceCityid == "__CITY__" || !cityidMap[sourceCityid]){
					this.errorMessage("Error: Invalid source city");
					return;
				}
				this.item.cityid = sourceCityid;
				this.item.cityName = cityidMap[sourceCityid].name;
				
				var resourcePercent = Number( this.percentCartsSpinner.getValue() );
				if (isNaN(resourcePercent)){
					resourcePercent = 100;
				}
				this.item.resourcePercent = resourcePercent;
				
				var tradesPage = senocular.tdk.PalaceTradesPage.getInstance();
				tradesPage.addOrUpdateTradeItem( this.item );
				
				this.close();
				
				}catch(e){ debug(e); }
			},
			errorMessage:function(msg){
				window.clearTimeout( this.errorHideDefer );
				this.errorText.setValue( msg );
				this.errorHideDefer = defer(this.errorMessage, this, STATUS_AUTOHIDE_DELAY, [""]);
			},
			cancel:function(){
				try {
					
				this.close();
				
				}catch(e){ debug(e); }
			}
		}
	});
	// END GenericPageImportExportWindow
	
	qx.Class.define("senocular.tdk.GenericPageImportExportWindow", {
		type: "singleton",
		extend: qx.ui.window.Window,
		construct: function() {
			this.base(arguments, "Import/Export");
			this.buildUI();
		},
		members: {
			descriptionLabel:null,
			contentText:null,
			contentTextFirstClick:true,
			importButton:null,
			importCallback:null,
			importCallbackTarget:null,
			exportDesc:"Save this text, then use it later with the Import option to restore your data:",
			importDesc:"Provide text supplied by the Export option to restore your data:",
			setContent:function(content){
				this.contentText.setValue(content);
			},
			getContent:function(){
				return this.contentText.getValue();
			},
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(5) );
				this.set({width:450,minWidth:100,maxWidth:1000,height:300,minHeight:100,maxHeight:800,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,showClose:false,resizeSensitivity:7,contentPadding:5,useMoveFrame:true});
					
				webfrontend.gui.Util.formatWinClose(this);
				
				this.descriptionLabel = new qx.ui.basic.Label().set({rich:true});
				
				this.contentText = new qx.ui.form.TextArea("");
				this.contentText.addListener("click", this.contentTextClick, this);
				qx.core.Init.getApplication().setElementModalInput(this.contentText);
				
				this.importButton = new qx.ui.form.Button("Import").set({allowGrowX:false});
				this.importButton.addListener("execute", this.importData, this);
				
				var buttonRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5).set({alignX:"right"}) );
				var closeButton = new qx.ui.form.Button("Close").set({allowGrowX:false});
				closeButton.addListener("execute", this.close, this);
				
				
				this.add( this.descriptionLabel );
				this.add( this.contentText, {flex:1} );
				this.add( buttonRow );
				buttonRow.add( this.importButton );
				buttonRow.add( closeButton );
				
			},
			contentTextClick:function(){
				if (this.contentTextFirstClick){
					this.contentTextFirstClick = false;
					this.contentText.setTextSelection(0);
				}
			},
			setImportCallback:function(scope, callback){
				this.importCallbackTarget = scope;
				this.importCallback = callback
			},
			importData:function(){
				try {
					
				var dataStr = this.getContent();
				if (!dataStr)
					return;
				
				var data
				try {
					
					data = qx.util.Json.parse( dataStr );
					if (data instanceof Object == false)
						throw new Error("Invalid data type");
					
				}catch(err){
					alert("Error: Import text was improperly formatted.");
					return;
				}
				
				if (data && this.importCallback != null){
					
					this.importCallback.call(this.importCallbackTarget, data);
					this.importCallback = null;
					this.importCallbackTarget = null;
					this.close();
				}
				
				
				}catch(e){ debug(e); }
			},
			display:function(type, content){
				// defaults
				this.importButton.setVisibility("excluded");
				this.descriptionLabel.setValue(null);
				
				if (type == "Export"){
					this.setCaption("Export");
					this.descriptionLabel.setValue(this.exportDesc);
				}else if (type == "Import"){
					this.descriptionLabel.setValue(this.importDesc);
					this.importButton.setVisibility("visible");
				}
				
				this.setCaption(type);
				this.setContent(content || "");
				this.contentTextFirstClick = true;
				
				this.set({width:450,height:300});
				this.center();
				this.open();
			}
		}
	});
	// END GenericPageImportExportWindow
	
	qx.Class.define("senocular.tdk.OptionsPage", {
		type: "singleton",
		extend: qx.ui.tabview.Page,
		construct: function() {
			this.base(arguments, "Options");
			this.buildUI();
			this.updateOptionsFromPrefs();
		},
		members: {
			extensionButtonsPositionSelect:null,
			extensionButtonsShowTDKCheck:null,
			extensionButtonsShowToolsCheck:null,
			extensionButtonsShowNotesCheck:null,
			extensionButtonsShowTradesCheck:null,
			extensionButtonsShowCitiesCheck:null,
			extensionButtonsShowAboutCheck:null,
			enableAttackCityButtonsCheck:null,
			attackCityButtonsPositionSpinner:null,
			enableSendCityButtonsCheck:null,
			sendCityButtonsPositionSpinner:null,
			sendCityButtonsPercentCartsSpinner:null,
			enableBuildingCountsCheck:null,
			enableCityDemoToggleCheck:null,
			cityDemoToggleFlashCheck:null,
			cityDemoToggleAutoOffCheck:null,
			cityDemoOptionsChecks:null,
			enableChatCommanderCheck:null,
			enableChatNotificationsCheck:null,
			chatNotificationsWhenMinimizedCheck:null,
			chatNotificationsPrivateCheck:null,
			chatNotificationsNameCheck:null,
			chatNotificationsTextMatchesText:null,
			enableDailyFreeRewardNotificationsCheck:null,
			notificationAutoDismissSpinner:null,
			notificationsSoundCheck:null,
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(5) );
				
				var app = qx.core.Init.getApplication();
				
				// create elements
				var tttp = "<div style=\"width:200px;\">";
				var ttts = "</div>";
				var contentScroller = new qx.ui.container.Scroll();
				var content = new qx.ui.container.Composite( new qx.ui.layout.VBox(2) );
				
				
				var extensionButtonsGroup = senocular.tdk.WidgetUtils.createTitle("Extension Access Buttons:",
					"Adds buttons to the main interface to allow quick access"
					+" to the extension features.");
				
				var extensionButtonsPositionRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:8});
				this.extensionButtonsPositionSelect = new qx.ui.form.SelectBox().set({width:170, height:26});
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Bottom", null, "BCH") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Top", null, "TCH") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Left", null, "MLV") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Right", null, "MRV") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Bottom Right (Vertical)", null, "BRV") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Bottom Right (Horizontal)", null, "BRH") );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem(null, "webfrontend/ui/msc_dropdown_divider.png", null).set({appearance:"listitem_separator"}) );
				this.extensionButtonsPositionSelect.add( new qx.ui.form.ListItem("Hide", null, "hide") ); 
				this.extensionButtonsPositionSelect.addListener("changeSelection", this.extensionButtonsPositionChange, this);
				
				var extensionButtonsPositionLabel = new qx.ui.basic.Label("Location in the interface");
				
				var extensionButtonsShowGrid = new qx.ui.container.Composite( new qx.ui.layout.Grid() );
				
				var extensionButtonsShowLabel = new qx.ui.basic.Label("Show:").set({marginLeft:8, marginTop:8});
				this.extensionButtonsShowTDKCheck = new qx.ui.form.CheckBox("TDK (Heading)").set({marginLeft:16});
				this.extensionButtonsShowToolsCheck = new qx.ui.form.CheckBox("Tools").set({marginLeft:16});
				this.extensionButtonsShowNotesCheck = new qx.ui.form.CheckBox("Notes").set({marginLeft:16});
				this.extensionButtonsShowTradesCheck = new qx.ui.form.CheckBox("Trades").set({marginLeft:16});
				this.extensionButtonsShowCitiesCheck = new qx.ui.form.CheckBox("Cities").set({marginLeft:16});
				this.extensionButtonsShowAboutCheck = new qx.ui.form.CheckBox("About").set({marginLeft:16});
				
				var cityButtonsGroup = senocular.tdk.WidgetUtils.createTitle("Selected City Buttons:",
					"Adds buttons to the left information pane for a"
					+" selected city when in Region view.");
				
				this.enableAttackCityButtonsCheck = new qx.ui.form.CheckBox("Enable 'Attack!' city buttons")
				this.enableAttackCityButtonsCheck.set({marginLeft:8, toolTipText:"Buttons to send units to selected cities"});
				var attackSpinnerRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:16});
				this.attackCityButtonsPositionSpinner = new qx.ui.form.Spinner(0, 1, 10);
				app.setElementModalInput(this.attackCityButtonsPositionSpinner);
				this.enableAttackCityButtonsCheck.bind("value", this.attackCityButtonsPositionSpinner, "enabled");
				var attackStackLabel = new qx.ui.basic.Label("Position in button stack");
				
				this.enableSendCityButtonsCheck = new qx.ui.form.CheckBox("Enable 'Send!' city buttons").set({marginLeft:8, marginTop:8});
				this.enableSendCityButtonsCheck.set({toolTipText:"Buttons to send resources to selected cities"});
				
				var sendSpinnerRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:16});
				this.sendCityButtonsPositionSpinner = new qx.ui.form.Spinner(0, 2, 10);
				app.setElementModalInput(this.sendCityButtonsPositionSpinner);
				this.enableSendCityButtonsCheck.bind("value", this.sendCityButtonsPositionSpinner, "enabled");
				var sendStackLabel = new qx.ui.basic.Label("Position in button stack");
				
				var sendSpinnerRow2 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:16});
				this.sendCityButtonsPercentCartsSpinner = new qx.ui.form.Spinner(0, 100, 100);
				app.setElementModalInput(this.sendCityButtonsPercentCartsSpinner);
				this.enableSendCityButtonsCheck.bind("value", this.sendCityButtonsPercentCartsSpinner, "enabled");
				var sendPercentLabel = new qx.ui.basic.Label("% of carts to send");
				
				
				var notificationsGroup = senocular.tdk.WidgetUtils.createTitle("Notifications:",
					"Options for custom notification windows that appear in the bottom right of the screen for various game events.");
				
				this.enableChatNotificationsCheck = new qx.ui.form.CheckBox("Enable chat notifications").set({marginLeft:8});
				this.enableChatNotificationsCheck.set({toolTipText:"Enable notifications from chat"});
				this.chatNotificationsWhenMinimizedCheck = new qx.ui.form.CheckBox("Notifications only when chat is minimized").set({marginLeft:16});
				this.enableChatNotificationsCheck.bind("value", this.chatNotificationsWhenMinimizedCheck, "enabled");
				this.chatNotificationsPrivateCheck = new qx.ui.form.CheckBox("Get notified for private messages").set({marginLeft:16});
				this.enableChatNotificationsCheck.bind("value", this.chatNotificationsPrivateCheck, "enabled");
				this.chatNotificationsNameCheck = new qx.ui.form.CheckBox("Get notified for name mentions").set({marginLeft:16});
				this.enableChatNotificationsCheck.bind("value", this.chatNotificationsNameCheck, "enabled");
				
				var chatTextMatchesLabel = new qx.ui.basic.Label("Get notified for the following text in chat:<br/><i>(comma separated words or phrases, case insensitive)</i>");
				chatTextMatchesLabel.set({rich:true, marginLeft:16});
				this.chatNotificationsTextMatchesText = new qx.ui.form.TextField("").set({marginLeft:16, width:200, allowGrowX:false});
				this.enableChatNotificationsCheck.bind("value", this.chatNotificationsTextMatchesText, "enabled");
				app.setElementModalInput(this.chatNotificationsTextMatchesText);
				
				this.enableDailyFreeRewardNotificationsCheck = new qx.ui.form.CheckBox("Enable Daily Free Reward notifications").set({marginLeft:8, marginTop:8});
				this.enableDailyFreeRewardNotificationsCheck.set({toolTipText:"Enable notifications for the Daily Free Reward dialog"});
				
				this.notificationsSoundCheck = new qx.ui.form.CheckBox("Notification sound").set({marginLeft:8, marginTop:8});
				
				var notificationSpinnerRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:8});
				this.notificationAutoDismissSpinner = new qx.ui.form.Spinner(0, 0, 60);
				var notifcationsDismissLabel = new qx.ui.basic.Label("Seconds before notification windows automatically dismiss themselves");
				
				
				var buildingGroup = senocular.tdk.WidgetUtils.createTitle("City Building:",
					"Options for features enabled in city view.");
				
				this.enableBuildingCountsCheck = new qx.ui.form.CheckBox("Enable City Detail Building Counts");
				this.enableBuildingCountsCheck.set({marginLeft:8, 
					toolTipText:tttp+"Creates a panel in the information pane in City view detailing"
								+" building and combined level counts for the active city."+ttts});
								
				this.enableCityDemoToggleCheck = new qx.ui.form.CheckBox("Enable Single Click actions for city building");
				this.enableCityDemoToggleCheck.set({marginLeft:8, marginTop:8, 
					toolTipText:tttp+"Adds an option in the information pane in City view allowing"
								+" for the ability to instantly build or demolish city objects when clicking on the map."+ttts});
				this.cityDemoToggleFlashCheck = new qx.ui.form.CheckBox("Enable screen flashes after clicks").set({marginLeft:16});
				this.enableCityDemoToggleCheck.bind("value", this.cityDemoToggleFlashCheck, "enabled");
				this.cityDemoToggleAutoOffCheck = new qx.ui.form.CheckBox("Automatically turn off when switching between cities").set({marginLeft:16});
				this.enableCityDemoToggleCheck.bind("value", this.cityDemoToggleAutoOffCheck, "enabled");
				
				// Items in click options
				var cityDemoOptionsLabel = new qx.ui.basic.Label("Show:").set({marginLeft:16});
				var cityDemoOptionsGrid = new qx.ui.container.Composite( new qx.ui.layout.Grid(3,3) ).set({marginLeft:24});
				this.addCityDemoOptionsChecks(cityDemoOptionsGrid, 4);
				
				var miscellaneousGroup = senocular.tdk.WidgetUtils.createTitle("Miscellaneous:",
					"Options for other assorted features.");
				
				this.enableChatCommanderCheck = new qx.ui.form.CheckBox("Enable Extended Chat Commands");
				this.enableChatCommanderCheck.set({marginLeft:8, 
					toolTipText:tttp+"Add recognition for additional commands in chat. Type /tdkhelp in chat for more info."+ttts});
				
				this.enableNotepadButtonsCheck = new qx.ui.form.CheckBox("Enable Integrated Open in Notepad Buttons");
				this.enableNotepadButtonsCheck.set({marginLeft:8, 
					toolTipText:tttp+"Adds Open in Notepad buttons to forum thread and email dialogs."+ttts});
				
				var citiesButton = new qx.ui.form.Button("Citiy List").set({allowGrowX:false, marginLeft:8, 
					toolTipText:tttp+"Show a compact list of your cities in a floating window"+ttts});
				citiesButton.addListener("execute", this.showCitiesDialog, this);
				var dfrButton = new qx.ui.form.Button("Check Daily Free Reward").set({allowGrowX:false, marginLeft:8, 
					toolTipText:tttp+"Check to see if to see if the Daily Free Reward dialog is hidden"+ttts});
				dfrButton.addListener("execute", this.showDailyReward, this);
					
				// Options page buttons'
				var rowLayout = new qx.ui.layout.HBox(5);
				var buttonRow = new qx.ui.container.Composite( rowLayout );
				var spacer = new qx.ui.core.Spacer();
				var restoreButton = new qx.ui.form.Button("Undo Changes");
				restoreButton.addListener("execute", this.restoreOptions, this);
				var applyButton = new qx.ui.form.Button("Apply Changes").set({marginRight:40});
				applyButton.addListener("execute", this.applyOptions, this);
				
				
				// add elements
				this.add( contentScroller, {flex:1} );
				contentScroller.add( content );
				
				content.add( extensionButtonsGroup );
				content.add( extensionButtonsPositionRow );
				extensionButtonsPositionRow.add( this.extensionButtonsPositionSelect );
				extensionButtonsPositionRow.add( extensionButtonsPositionLabel );
				
				content.add( extensionButtonsShowLabel );
				content.add( extensionButtonsShowGrid );
				extensionButtonsShowGrid.add( this.extensionButtonsShowTDKCheck, {column:0, row:0} );
				extensionButtonsShowGrid.add( this.extensionButtonsShowToolsCheck, {column:1, row:0} );
				extensionButtonsShowGrid.add( this.extensionButtonsShowNotesCheck, {column:2, row:0} );
				extensionButtonsShowGrid.add( this.extensionButtonsShowTradesCheck, {column:0, row:1} );
				extensionButtonsShowGrid.add( this.extensionButtonsShowCitiesCheck, {column:1, row:1} );
				extensionButtonsShowGrid.add( this.extensionButtonsShowAboutCheck, {column:0, row:2} );
				
				
				content.add( cityButtonsGroup );
				
				content.add( this.enableAttackCityButtonsCheck );
				content.add( attackSpinnerRow );
				attackSpinnerRow.add( this.attackCityButtonsPositionSpinner );
				attackSpinnerRow.add( attackStackLabel );
				
				content.add( this.enableSendCityButtonsCheck );
				content.add( sendSpinnerRow );
				sendSpinnerRow.add( this.sendCityButtonsPositionSpinner );
				sendSpinnerRow.add( sendStackLabel );
				content.add( sendSpinnerRow2 );
				sendSpinnerRow2.add( this.sendCityButtonsPercentCartsSpinner );
				sendSpinnerRow2.add( sendPercentLabel );
				
				
				content.add( notificationsGroup );
				
				content.add( this.enableChatNotificationsCheck );
				content.add( this.chatNotificationsWhenMinimizedCheck );
				content.add( this.chatNotificationsPrivateCheck );
				content.add( this.chatNotificationsNameCheck );
				content.add( chatTextMatchesLabel );
				content.add( this.chatNotificationsTextMatchesText );
				
				content.add( this.enableDailyFreeRewardNotificationsCheck );
				
				content.add( this.notificationsSoundCheck );
				content.add( notificationSpinnerRow );
				notificationSpinnerRow.add( this.notificationAutoDismissSpinner );
				notificationSpinnerRow.add( notifcationsDismissLabel );
				
				
				content.add( buildingGroup );
				
				content.add( this.enableBuildingCountsCheck );
				content.add( this.enableCityDemoToggleCheck );
				content.add( this.cityDemoToggleFlashCheck );
				content.add( this.cityDemoToggleAutoOffCheck );
				content.add( cityDemoOptionsLabel );
				content.add( cityDemoOptionsGrid );
				
				
				content.add( miscellaneousGroup );
				
				content.add( this.enableChatCommanderCheck );
				content.add( this.enableNotepadButtonsCheck );

				content.add( citiesButton );
				content.add( dfrButton );
				
				this.add( buttonRow );
				buttonRow.add( spacer, {flex:1} );
				buttonRow.add( restoreButton );
				buttonRow.add( applyButton );
			},
			addCityDemoOptionsChecks: function(grid, xCount){
				if (xCount == undefined) 
					xCount = 1;
				
				this.cityDemoOptionsChecks = [];
				var i, n = CITY_BUILDING_IDS.length;
				
				var buildings = webfrontend.res.Main.getInstance().buildings;
				var id, name, check;
				
				// demolish and upgrade added to end of building indicies
				// but first in list
				check = new qx.ui.form.CheckBox("Demolish");
				this.cityDemoOptionsChecks[n] = check;
				grid.add( check, {row:0, column:0} );
				
				check = new qx.ui.form.CheckBox("Upgrade");
				this.cityDemoOptionsChecks[n+1] = check;
				grid.add( check, {row:0, column:1} );
				
				var index = 2; // keeps track of grid placement
				// offset by demolish and upgrade
				
				for (i=0; i<n; i++){
					id = CITY_BUILDING_IDS[i];
					if (id == CASTLE_BUILDING_ID || id == PALACE_BUILDING_ID)
						continue;
					
					name = buildings[id].dn;
					check = new qx.ui.form.CheckBox(name);
					
					this.cityDemoOptionsChecks[i] = check;
					grid.add( check, {row: Math.floor(index/xCount), column: index%xCount} );
					index++;
				}
			},
			getCityDemoOptions: function(){
				var options = [];
				var i = this.cityDemoOptionsChecks.length;
				while (i--){
					options[i] = this.cityDemoOptionsChecks[i] ? this.cityDemoOptionsChecks[i].getValue() : false;
				}
				return options;
			},
			setCityDemoOptions: function(prefOptions){
				var i = this.cityDemoOptionsChecks.length;
				while (i--){
					if (this.cityDemoOptionsChecks[i])
						this.cityDemoOptionsChecks[i].setValue( Boolean(prefOptions[i]) );
				}
			},
			applyOptions: function(){
				try {
					
				var extension = senocular.tdk.TDKExtension.getInstance();
				var prefs = extension.prefs;
					
				prefs.extensionButtonsPosition = this.extensionButtonsPositionSelect.getSelection()[0].getModel();
				prefs.extensionButtonsShowTDK = this.extensionButtonsShowTDKCheck.getValue();
				prefs.extensionButtonsShowTools = this.extensionButtonsShowToolsCheck.getValue();
				prefs.extensionButtonsShowNotes = this.extensionButtonsShowNotesCheck.getValue();
				prefs.extensionButtonsShowTrades = this.extensionButtonsShowTradesCheck.getValue();
				prefs.extensionButtonsShowCities = this.extensionButtonsShowCitiesCheck.getValue();
				prefs.extensionButtonsShowAbout = this.extensionButtonsShowAboutCheck.getValue();
					
				prefs.enableAttackCityButtons = this.enableAttackCityButtonsCheck.getValue();
				prefs.attackCityButtonsPosition = this.attackCityButtonsPositionSpinner.getValue();
					
				prefs.enableSendCityButtons = this.enableSendCityButtonsCheck.getValue();
				prefs.sendCityButtonsPosition = this.sendCityButtonsPositionSpinner.getValue();
				prefs.sendCityButtonsPercentCarts = this.sendCityButtonsPercentCartsSpinner.getValue();
					
				prefs.enableChatNotifications = this.enableChatNotificationsCheck.getValue();
				prefs.chatNotificationsWhenMinimized = this.chatNotificationsWhenMinimizedCheck.getValue();
				prefs.chatNotificationsPrivate = this.chatNotificationsPrivateCheck.getValue();
				prefs.chatNotificationsName = this.chatNotificationsNameCheck.getValue();
				prefs.chatNotificationsTextMatches = this.chatNotificationsTextMatchesText.getValue();
				
				prefs.enableDailyFreeRewardNotifications = this.enableDailyFreeRewardNotificationsCheck.getValue();
				
				prefs.notificationAutoDismiss = this.notificationAutoDismissSpinner.getValue();
				prefs.notificationsSound = this.notificationsSoundCheck.getValue();
					
				prefs.enableBuildingCounts = this.enableBuildingCountsCheck.getValue();
				prefs.enableCityDemoToggle = this.enableCityDemoToggleCheck.getValue();
				prefs.cityDemoToggleFlash = this.cityDemoToggleFlashCheck.getValue();
				prefs.cityDemoToggleAutoOff = this.cityDemoToggleAutoOffCheck.getValue();
				prefs.cityDemoOptions = this.getCityDemoOptions();

				prefs.enableChatCommander = this.enableChatCommanderCheck.getValue();
				prefs.enableNotepadButtons = this.enableNotepadButtonsCheck.getValue();
				
				extension.savePreferences();
				extension.rebuildFeatures();
					
				}catch(e){ debug(e); }
			},
			restoreOptions: function(){
				try {
					
				var extension = senocular.tdk.TDKExtension.getInstance();
				extension.loadPreferences();
				extension.rebuildFeatures();
				this.updateOptionsFromPrefs();
				
				}catch(e){ debug(e); }
			},
			updateOptionsFromPrefs: function(){
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				
				senocular.tdk.WidgetUtils.setSelectByModel(this.extensionButtonsPositionSelect, prefs.extensionButtonsPosition);
				this.extensionButtonsShowTDKCheck.setValue( prefs.extensionButtonsShowTDK );
				this.extensionButtonsShowToolsCheck.setValue( prefs.extensionButtonsShowTools );
				this.extensionButtonsShowNotesCheck.setValue( prefs.extensionButtonsShowNotes );
				this.extensionButtonsShowTradesCheck.setValue( prefs.extensionButtonsShowTrades );
				this.extensionButtonsShowCitiesCheck.setValue( prefs.extensionButtonsShowCities );
				this.extensionButtonsShowAboutCheck.setValue( prefs.extensionButtonsShowAbout );
				
				this.enableAttackCityButtonsCheck.setValue( prefs.enableAttackCityButtons );
				this.attackCityButtonsPositionSpinner.setValue( prefs.attackCityButtonsPosition );
				
				this.enableSendCityButtonsCheck.setValue( prefs.enableSendCityButtons );
				this.sendCityButtonsPositionSpinner.setValue( prefs.sendCityButtonsPosition );
				this.sendCityButtonsPercentCartsSpinner.setValue( prefs.sendCityButtonsPercentCarts );
				
				this.enableChatNotificationsCheck.setValue( prefs.enableChatNotifications );
				this.chatNotificationsWhenMinimizedCheck.setValue( prefs.chatNotificationsWhenMinimized );
				this.chatNotificationsPrivateCheck.setValue( prefs.chatNotificationsPrivate );
				this.chatNotificationsNameCheck.setValue( prefs.chatNotificationsName );
				this.chatNotificationsTextMatchesText.setValue( prefs.chatNotificationsTextMatches );
				
				this.enableDailyFreeRewardNotificationsCheck.setValue( prefs.enableDailyFreeRewardNotifications );
				
				this.notificationAutoDismissSpinner.setValue( prefs.notificationAutoDismiss );
				this.notificationsSoundCheck.setValue( prefs.notificationsSound );
				
				this.enableBuildingCountsCheck.setValue( prefs.enableBuildingCounts );
				this.enableCityDemoToggleCheck.setValue( prefs.enableCityDemoToggle );
				this.cityDemoToggleFlashCheck.setValue( prefs.cityDemoToggleFlash );
				this.cityDemoToggleAutoOffCheck.setValue( prefs.cityDemoToggleAutoOff );
				this.setCityDemoOptions( prefs.cityDemoOptions );
				
				this.enableChatCommanderCheck.setValue( prefs.enableChatCommander );
				this.enableNotepadButtonsCheck.setValue( prefs.enableNotepadButtons );
			},			
			extensionButtonsPositionChange: function(evt){
				if (evt.getData()[0].getModel() == null)
					evt.getCurrentTarget().setSelection(evt.getOldData());
			},
			showCitiesDialog: function(){
				try{
				senocular.tdk.CityList.getInstance().display();
				}catch(e){ debug(e); }
			},
			showDailyReward:function(){
				try{
				if (senocular.tdk.DailyRewardNotifications.getInstance().showDailyReward() == false)
					alert("Daily Free Reward dialog not found.");
					
				}catch(e){ debug(e); }
			}
		}
	});
	// END OptionsPage
		
	qx.Class.define("senocular.tdk.AboutPage", {
		type: "singleton",
		extend: qx.ui.tabview.Page,
		construct: function() {
			this.base(arguments, "About");
			this.buildUI();
		},
		members: {
			initAddress:"http://www.senocular.com/chrome/extensions/lou/LoUDefiant_about.html",
			buildUI: function(){
				this.setLayout( new qx.ui.layout.VBox(5) );
				this.set({padding:2});
				
				// create elements
				var viewingLabel = new qx.ui.basic.Label('Viewing: <a href="'+this.initAddress+'" style="'+LINK_STYLE+'" target="_blank">'+this.initAddress+'</a>');
				viewingLabel.set({rich:true});
				
				var iFrameWrapper = new qx.ui.core.Widget();
				iFrameWrapper.getContentElement().useMarkup('<iframe id="senocular_tdk_aboutbrowser" src="'+this.initAddress
					+'" style="background-color:white; width:100%; height:100%;" frameborder="0"></iframe>');
				
				// add elements
				this.add( viewingLabel );
				this.add( iFrameWrapper, {flex:1} );
			}
		}
	});
	// END AboutPage
		
	qx.Class.define("senocular.tdk.OptionsPageInContext", {
		type: "singleton",
		extend: qx.ui.tabview.Page,
		construct: function() {
			this.base(arguments, "TDK");
			this.buildUI();
		},
		members: {
			init: function(){
				var app = qx.core.Init.getApplication();
				var optionsTabs = senocular.tdk.WidgetUtils.findChildByType(
					app.getOptionsPage().clientArea,
					qx.ui.tabview.TabView
				);
				if (optionsTabs)
					optionsTabs.add( this );
			},
			buildUI: function(){
				this.setLayout(new qx.ui.layout.VBox(5));
				
				// create elements
				var descLabel = new qx.ui.basic.Label("TDK Extension (One Defiant Extension) Options are available in the TDK Tools window.");
				var openButton = new qx.ui.form.Button("Open TDK Options").set({allowGrowX:false});
				openButton.addListener("execute", this.openOptions, this);
				
				// add elements
				this.add(descLabel);
				this.add(openButton);
			},
			openOptions: function(){
				try{
				senocular.tdk.ToolsWindow.getInstance().toggleTab("Options");
				}catch(e){ debug(e); }
			}
		}
	});
	// END OptionsPageInContext
		
	qx.Class.define("senocular.tdk.ButtonGroupWithStatus", {
		type:"singleton",
		extend: qx.ui.container.Composite,
		construct: function(layout){
			if (!layout){
				layout = new qx.ui.layout.VBox(2).set( {alignX:"center"} );
			}
			this.base(arguments, layout);
			this.buildUI();
			this.targetContainer = qx.core.Init.getApplication().cityDetailView.actionArea; // default
		},
		members:{
			enabled:null,
			targetContainer:null,
			buttonRow:null,
			statusLabel:null,
			clicked:null,
			operationInProgress:false,
			setEnable:function(enabled){
				if (this.enabled == enabled)
					return;
				
				if (enabled){
					
					this.targetContainer.add( this );
					
				}else{
					
					var parent = this.getLayoutParent();
					if (parent)
						parent.remove(this);
				}
				
				this.enabled = enabled;
			},
			positionInStack: function(position){
				var currPos = this.targetContainer.indexOf(this);
				var maxPos = this.targetContainer.getChildren().length;
				if (currPos != -1)
					maxPos--;
				var newPos = Math.min(position, maxPos);
				if (newPos != currPos)
					this.targetContainer.addAt( this, newPos );
			},
			buildUI: function(){
				this.set({marginRight:14});
				
				// create elements
				var buttonLayout = new qx.ui.layout.HBox(3).set( {alignX:"center"} );
				this.buttonRow = new qx.ui.container.Composite( buttonLayout ).set({maxWidth:306});
				
				this.statusLabel = new qx.ui.basic.Label("");
				
				// add elements
				this.add( this.buttonRow );
			},
			completed: function(message){
				this.clicked = null;
				if (message != undefined)
					this.setStatus(message);
				
				defer(this.setStatus, this, STATUS_AUTOHIDE_DELAY, [""]);
			},
			setStatus: function(status){
				if (status){
					this.statusLabel.setValue(status);
					if (this.indexOf(this.statusLabel) == -1){
						this.add(this.statusLabel);
					}
				}else if (this.indexOf(this.statusLabel) != -1){
					this.statusLabel.setValue("");
					this.remove(this.statusLabel);
				}
			}
		}
	});
	// END ButtonGroupWithStatus
		
	qx.Class.define("senocular.tdk.ButtonWithIDAndText", {
		extend: qx.ui.form.Button,
		construct: function(label, buttonID, buttonText){
			this.base(arguments, label);
			if (buttonID)
				this.buttonID = buttonID;
			if (buttonText)
				this.buttonText = buttonText
		},
		members:{
			buttonID:0,
			buttonText:"attacking"
		}
	});
	// END ButtonWithIDAndText
		
	qx.Class.define("senocular.tdk.CityAttackOptions", {
		type:"singleton",
		extend: senocular.tdk.ButtonGroupWithStatus,
		construct: function(layout){
			this.base(arguments, layout);
		},
		members:{
			buildUI: function(){
				this.base(arguments);
				
				// create elements
				var assaultButton = new senocular.tdk.ButtonWithIDAndText("ATTACK!!!", ATTACK_ORDER_ID, "assaulting");
				assaultButton.setToolTipText("Assault selected city with all available units");
				assaultButton.addListener("execute", this.dispatchTroops, this);
				
				var plunderButton = new senocular.tdk.ButtonWithIDAndText("Plunder!", PLUNDER_ORDER_ID, "pludering");
				plunderButton.setToolTipText("Plunder selected city with all available units");
				plunderButton.addListener("execute", this.dispatchTroops, this);
				
				var siegeButton = new senocular.tdk.ButtonWithIDAndText("Siege!", SIEGE_ORDER_ID, "sieging");
				siegeButton.setToolTipText("Siege selected city with all available units");
				siegeButton.addListener("execute", this.dispatchTroops, this);
				
				var supportButton = new senocular.tdk.ButtonWithIDAndText("Support!", SUPPORT_ORDER_ID, "supporting");
				supportButton.setToolTipText("Support selected city with all available units");
				supportButton.addListener("execute", this.dispatchTroops, this);
				
				// add elements
				this.buttonRow.add( assaultButton, {flex:1} );
				this.buttonRow.add( plunderButton, {flex:1} );
				this.buttonRow.add( siegeButton, {flex:1} );
				this.buttonRow.add( supportButton, {flex:1} );
			},
			dispatchTroops: function(event){
				try {
				
				if (this.clicked != null)
					return;
				
				try {
					this.clicked = event.getCurrentTarget();
					
					var activeCity = webfrontend.data.City.getInstance();
					var selectedCity = qx.core.Init.getApplication().cityDetailView.city;
					
					// convert city unit list into order unit list
					var units = activeCity.units;
					var unitsOrdered = []; // {"t":"11","c":555}]
					for (var u in units){
						
						if (DO_NOT_ATTACK_UNITS[u])
							continue;
						
						if (this.clicked.buttonID == PLUNDER_ORDER_ID && DO_NOT_PLUNDER_UNITS[u])
							continue;
						
						if (units[u].count > 0)
							unitsOrdered.push({t:u, c:units[u].count});
					}
					
					var request = {
						cityid: activeCity.getId(),
						units: unitsOrdered, // all units
						targetPlayer: selectedCity.get_PlayerName(), // player name
						targetCity: senocular.tdk.CityUtils.idToString3x3( selectedCity.get_Coordinates() ), // city string coords
						order: this.clicked.buttonID,
						transport:1,
						timeReferenceType:1,
						referenceTimeUTCMillis:0,
						raidTimeReferenceType:0,
						raidReferenceTimeUTCMillis:0
					};
					
					this.setStatus("Dispatching troops...");
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("OrderUnits", request, this, this.onTroopsSent);
					
				}catch(err){
					this.clicked = null;
					this.completed("Your confounded troops could not assemble!");
					debug(String(err));
				}
				
				}catch(e){ debug(e); }
			},
			onTroopsSent: function(ok, errorCode){
				try {
					
				if (this.clicked == null)
					return;
				
				if (errorCode == 0){
					this.completed("Troops are " +this.clicked.buttonText+ "!"); 
				}else{
					this.completed("Your defiant troops refused to leave!");
				}
				
				}catch(e){ debug(e); }
			}
		}
	});
	// END CityAttackOptions
		
	qx.Class.define("senocular.tdk.SendPalaceResourcesOptions", {
		type:"singleton",
		extend: senocular.tdk.ButtonGroupWithStatus,
		statics:{
			SEND_WOOD:1,
			SEND_STONE:2,
			SEND_BOTH:3
		},
		construct: function(layout){
			this.base(arguments, layout);
		},
		members:{
			isPalaceTrade:false,
			buildUI: function(){
				this.base(arguments);
				
				// create elements
				var sendBothButton = new senocular.tdk.ButtonWithIDAndText("Send W&S", this.self(arguments).SEND_BOTH);
				sendBothButton.setToolTipText("Send all available wood and stone to palace");
				sendBothButton.addListener("execute", this.sendResources, this);
				
				var sendWoodButton = new senocular.tdk.ButtonWithIDAndText("Send W", this.self(arguments).SEND_WOOD);
				sendWoodButton.setToolTipText("Send all available wood to palace");
				sendWoodButton.addListener("execute", this.sendResources, this);
				
				var sendStoneButton = new senocular.tdk.ButtonWithIDAndText("Send S", this.self(arguments).SEND_STONE);
				sendStoneButton.setToolTipText("Send all available wood to palace");
				sendStoneButton.addListener("execute", this.sendResources, this);
				
				var newTradeButton = new qx.ui.form.Button("+ Trade");
				newTradeButton.setToolTipText("Define a palace trade route");
				newTradeButton.addListener("execute", this.createTrade, this);
				
				// add elements
				this.buttonRow.add( sendBothButton, {flex:1} );
				this.buttonRow.add( sendWoodButton, {flex:1} );
				this.buttonRow.add( sendStoneButton, {flex:1} );
				this.buttonRow.add( newTradeButton, {flex:1} );
			},
			sendResources: function(event){
				try {
				
				if (this.clicked != null)
					return;
				
				try {
					
					var activeCity = webfrontend.data.City.getInstance();
					var selectedCity = qx.core.Init.getApplication().cityDetailView.city;

					var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
					var percentCarts = prefs.sendCityButtonsPercentCarts;

					this.clicked = event.getCurrentTarget();
					var willSendWood = this.clicked.buttonID & this.self(arguments).SEND_WOOD;
					var willSendStone = this.clicked.buttonID & this.self(arguments).SEND_STONE;
					var resourcesSent = this.getResourcesToSend(activeCity, percentCarts, willSendWood, willSendStone);
					
					if (resourcesSent == null){
						this.completed("Request Denied: No carts available");
						return;
					}

					if (resourcesSent.length == 0){
						this.completed("Request Denied: No resources available");
						return;
					}
					
					this.isPalaceTrade = selectedCity.get_IsEnlighted();
					var request = {
						res: resourcesSent,
						cityid: activeCity.getId(),
						targetPlayer: selectedCity.get_PlayerName(), // player name
						targetCity: senocular.tdk.CityUtils.idToString3x3( selectedCity.get_Coordinates() ), // city string coords
						tradeTransportType: 1,
						palaceSupport: this.isPalaceTrade
					};
					
					this.setStatus("Calling all carts...");
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("TradeDirect", request, this, this.onResourcesSent);
					
				}catch(err){
					this.completed("Resources could not go out!");
					debug(String(err));
				}
				
				}catch(e){ debug(e); }
			},
			getResourcesToSend:function(resCity, percentCarts, willSendWood, willSendStone){
				percentCarts /= 100;
				var carts = Math.floor(resCity.traders[1].count * percentCarts);
				var server = webfrontend.data.Server.getInstance();
				var resCanSend = carts * server.getTradeLandCapacity();
				
				if (resCanSend == 0){
					return null;
				}
				
				var availWoodRes = willSendWood ? Math.floor(resCity.getResourceCount(1)) : 0;
				var availStoneRes = willSendStone ? Math.floor(resCity.getResourceCount(2)) : 0;
				
				var woodSent = Math.min(availWoodRes, resCanSend);
				var stoneSent = Math.min(availStoneRes, resCanSend);
				
				if (willSendWood && willSendStone){
					// evenly divide wood and stone between carts
					var halfCanSend = Math.floor(resCanSend/2);
					
					if (woodSent < halfCanSend){
						stoneSent = Math.min(availStoneRes, resCanSend - woodSent);
					}else if (stoneSent < halfCanSend){
						woodSent = Math.min(availWoodRes, resCanSend - stoneSent);
					}else{
						stoneSent = halfCanSend;
						woodSent = halfCanSend;
					}
				}
				
				var resourcesSent = [];
				
				if (woodSent)
					resourcesSent.push({t:1, c:woodSent});
					
				if (stoneSent)
					resourcesSent.push({t:2, c:stoneSent});
				
				return resourcesSent;
			},
			onResourcesSent: function(ok, errorCode){
				try {
					
				if (this.clicked == null)
					return;
				
				if (errorCode == 0){
					var type = (this.isPalaceTrade) ? "Palace" : "Trade";
					this.completed(type + " resources en route!");
				}else{
					this.completed("Your defiant carts refused to leave! ("+errorCode+")");
				}
				
				}catch(e){ debug(e); }
			},
			createTrade: function(){
				try {
					
				senocular.tdk.PalaceTradesPage.getInstance().newTrade(true);
			
				}catch(e){ debug(e); }
			}
		}
	});
	// END SendPalaceResourcesOptions
		
	qx.Class.define("senocular.tdk.CityBuildingCounts", {
		type:"singleton",
		extend: qx.ui.container.Composite,
		statics:{
			INVALID_BUILDING_TYPES:{
				23:1, // wall
				27:1, // resources (4)
				28:1,
				29:1,
				30:1
			}
		},
		construct: function(){
			var layout = new qx.ui.layout.VBox();
			this.base(arguments, layout);
			this.buildUI();
		},
		members:{
			decor:null,
			cityEvents:null,
			visMainEvents:null,
			enabled:null,
			setEnable:function(enabled){
				if (this.enabled == enabled)
					return;
				
				var parent;
				if (enabled){
					var app = qx.core.Init.getApplication();
					
					this.cityEvents = webfrontend.data.City.getInstance();
					this.cityEvents.addListener("changeVersion", this.onCityChange, this);
					
					this.visMainEvents = app.visMain;
					this.visMainEvents.addListener("changeMapLoaded", this.onMapChange, this);
					
					var buildingQueue = app.cityInfoView.buildingQueue;
					parent = buildingQueue.getLayoutParent();
					if (parent)
						parent.addBefore(this, buildingQueue);
					
					this.refreshCounts();
					
				}else{
					
					parent = this.getLayoutParent();
					if (parent)
						parent.remove(this);
					
					if (this.cityEvents){
						this.cityEvents.removeListener("changeVersion", this.onCityChange, this);
						this.cityEvents = null;
					}
					if (this.visMainEvents){
						this.visMainEvents.removeListener("changeMapLoaded", this.onMapChange, this);
						this.visMainEvents = null;
					}
				}
				
				this.enabled = enabled;
			},
			buildUI: function(){
				this.set({marginLeft:1, marginRight:8, marginTop:5, marginBottom:5});
				this.decor = new qx.ui.decoration.Single().set({backgroundColor:"#E1D0B0", width:1, color:"#7B5930"});
			},
			onCityChange: function(){
				try {
					
				// KLUDGE: though city version changes map to changes in the city buildings
				// this event seems to happen before actual data is set, so we delay the update
				defer(this.refreshCounts, this, EVENT_PRIORITY_DEFER_DELAY);
				
				}catch(e){ debug(e); }
			},
			onMapChange: function(){
				try {
					
				this.refreshCounts();
					
				}catch(e){ debug(e); }
			},
			refreshCounts: function(){
				try {
					
				this.removeAll();
				
				// no building details are shown when not in city view
				// some city details depend on city view
				if (qx.core.Init.getApplication().visMain.mapmode != "c"){
					return;
				}
				
				var content = new qx.ui.container.Composite( new qx.ui.layout.Flow(7) ).set({padding:3, decorator:this.decor});
				this.add( content );
					
				var building, text;
				var buildings = this.getBuildingMap();
				if (buildings){
					for (var b in buildings){
						if (!this.self(arguments).INVALID_BUILDING_TYPES[b]){ // !invalid
							building = buildings[b];
							
							text = building.level
							if (building.level == building.count * 10)
								text = "<b>" + text + "</b>";
							text += " (" + building.count + ")";
							
							content.add( new senocular.tdk.CityBuildingCountsItem(building.img, text, building.name) );
						}
					}
				}
				
				}catch(e){ debug(e); }
			},
			getBuildingMap: function(){
				var list = {};
				var found = false;
				var app = qx.core.Init.getApplication();
					
				var cell, entity, cityItem, itemInfo, type;
				var info = webfrontend.res.Main.getInstance();
				var cells = app.visMain.cells;
				
				for (cell in cells){ 
					for (entity in cells[cell].entities){
						
						try {
							
							cityItem = cells[cell].entities[entity];
							if (cityItem.getType){
								type = cityItem.getType();
								itemInfo = info.buildings[type];
								if (list[type] == undefined){
									list[type] = {
										name: itemInfo.dn,
										count: 1,
										level: cityItem.level || 0,
										img: info.imageFiles[itemInfo.mimg]
									}
								}else{
									list[type].count++;
									list[type].level += cityItem.level;
								}
							}
							
						}catch(ignore){ }
						
						found = true;
					}
				}
				
				return found ? list : null;
			}
		}
	});
	// END CityBuildingCounts
		
	qx.Class.define("senocular.tdk.CityBuildingCountsItem", {
		extend: qx.ui.container.Composite,
		construct: function(img, text, toolTipText){
			var layout = new qx.ui.layout.VBox(2).set({alignX:"center"});
			this.base(arguments, layout);
			if (img)
				this.img = img;
			this.text = text || "-";
			this.toolTipText = toolTipText + "<br />Level (Count)" || "Building<br />Level (Count)";
			
			this.buildUI();
		},
		members:{
			img:null,
			text:null,
			toolTipText:null,
			buildUI: function(){
				var imgPath = webfrontend.config.Config.getInstance().getImagePath(this.img);
				var buildingImage = new qx.ui.basic.Image(imgPath).set({width:38, height:38, scale:true});
				buildingImage.setToolTipText(this.toolTipText);
				
				var buildingText = new qx.ui.basic.Label(this.text).set({rich:true});
				buildingText.toolTipText = "Level (Count)";
				
				this.add( buildingImage );
				this.add( buildingText );
			}
		}
	});
	// END CityBuildingCountsItem
		
	qx.Class.define("senocular.tdk.NotepadRegistry", {
		type:"singleton",
		extend: qx.core.Object,
		events:{
			registryChanged: "qx.event.type.Event"
		},
		construct: function(){
			this.base(arguments);
			
			this.registry = loadSavedData(NOTE_REGISTRY_STATE_ID);
			if (this.registry instanceof Array == false)
				this.registry = [];
		},
		members:{
			registry:null,
			addNoteToRegistry: function(note, sourceText){
				if (!note && !sourceText)
					return false;
				
				var record;
				if (note)
					record = this.getRecordByValue("note", note);
				
				// if already exists, update rather than add
				if (record){
					this.updateRecord(record, note);
				}else{
					this.registry.push({
						note:note,
						sourceText: sourceText || note.getSourceText()
					});
				}
				
				return true;
			},
			addRegistryData:function(noteSourceArray){
				if (noteSourceArray instanceof Array == false)
					return;
				
				var i, n = noteSourceArray.length;
				for (i=0; i<n; i++){
					this.registry.push({
						note:null,
						sourceText: noteSourceArray[i] || ""
					});
				}
			},
			getRecordByValue: function(key, value){
				var i = this.registry.length;
				while(i--){
					if (this.registry[i][key] == value){
						return this.registry[i];
					}
				}
				return null;
			},
			getRecordByMeta: function(value){
				value = "[" + value + "]";
				var i = this.registry.length;
				while(i--){
					if (this.registry[i].sourceText.indexOf(value) == 0){
						return this.registry[i];
					}
				}
				return null;
			},
			openRecord: function(record){
				if (!record)
					return;
				
				if (record.note){
					record.note.open();
				}else{
					record.note = senocular.tdk.Notepad.create(record.sourceText, true);
				}
			},
			updateRecord: function(record, note){
				if (!note)
					return;
				
				if (record.note != note)
					record.note = note;
				record.sourceText = note.getSourceText();
			},
			removeNoteFromRegistry: function(note){
				if (!note)
					return false; 
				
				var record = this.getRecordByValue(note);
				if (record){
					note.setSaved(false);
					this.removeRecord(record);
					return true;
				}
				return false;
			},
			removeRecord:function(record){
				var i = this.registry.length;
				while(i--){
					if (this.registry[i] == record){
						this.registry.splice(i, 1);
						return true;
					}
				}
				return false;
			},
			saveRegistry:function(){
				// don't save note object references
				var cleanRegistry = [];
				var i = this.registry.length;
				while(i--){
					cleanRegistry[i] = {
						sourceText: this.registry[i].sourceText,
						note:null
					};
				}
				saveData(NOTE_REGISTRY_STATE_ID, cleanRegistry);
			},
			commit:function(){
				this.saveRegistry();
				this.fireNonBubblingEvent("registryChanged");
			}
		}
	});
	// END NotepadRegistry
		
	qx.Class.define("senocular.tdk.Notepad", {
		extend: qx.ui.window.Window,
		statics: {
			getRenderedText: function(sourceText){
				return webfrontend.gui.Util.convertBBCode(webfrontend.gui.Util.generateBBCode( sourceText ));
			},
			create: function(sourceText, isSaved){
				var note = new senocular.tdk.Notepad(sourceText, Boolean(isSaved));
				note.center();
				note.open();
				
				return note;
			}
		},
		construct: function(sourceText, saved){
			this.base(arguments, "Notepad");
			this.buildUI();
			this.addListener("close", this.windowClosed, this);
			
			if (sourceText){
				this.setSourceText(sourceText);
				this.setState(this.displayRendered);
			}else{
				this.setState(this.displayEdit);
			}
			
			this.rememberCheck.setValue(Boolean(saved));
		},
		members:{
			state:null,
			displayContainer:null,
			displayRendered:null,
			displayEdit:null,
			renderedText:null,
			rememberCheck:null,
			toggleEditButton:null,
			buildUI: function(){
				var app = qx.core.Init.getApplication();
				
				// modeled mostly after city notes settings
				this.set({width:300,minWidth:100,maxWidth:1000,height:300,minHeight:100,maxHeight:800,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,showClose:false,resizeSensitivity:7,contentPadding:5,useMoveFrame:true});
					
				this.setLayout( new qx.ui.layout.VBox(2) );
				this.moveTo(406,64);
				webfrontend.gui.Util.formatWinClose(this);
				
				// create elements
				this.displayContainer = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
					
				this.displayRendered = new qx.ui.container.Scroll();
				var renderedTextContainer = new qx.ui.container.Composite( new qx.ui.layout.Grow() );
					
				this.renderedText = new qx.ui.basic.Label("").set({rich:true, selectable:true});
				
				var buttonRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(2) );
				this.rememberCheck = new qx.ui.form.CheckBox("Save");
				this.rememberCheck.addListener("execute", this.rememberNote, this);
				var buttonSpacer = new qx.ui.core.Spacer();
				this.toggleEditButton = new qx.ui.form.Button("Edit");
				this.toggleEditButton.addListener("execute", this.toggleEdit, this);
				
				this.displayEdit = new qx.ui.form.TextArea("");
				app.setElementModalInput(this.displayEdit);
				
				// add elements
				this.displayRendered.add( renderedTextContainer );
				renderedTextContainer.add( this.renderedText );
				
				this.add( this.displayContainer, {flex:1} );
				this.add( buttonRow );
				buttonRow.add( this.rememberCheck );
				buttonRow.add( buttonSpacer, {flex:1} );
				buttonRow.add( this.toggleEditButton );
			},
			getSaved: function(){
				return this.rememberCheck.getValue();
			},
			setSaved: function(value){
				this.rememberCheck.setValue(value);
			},
			getSourceText: function(){
				return this.displayEdit.getValue();
			},
			setState: function(content){
				if (this.state == content)
					return;
			
				this.displayContainer.removeAll();
				this.displayContainer.add(content, {flex:1});
				this.state = content;
				
				var editStr = "";
				switch (this.state){
					case this.displayRendered:{
						editStr = "Edit";
						break;
					}
					case this.displayEdit:{
						editStr = "Done";
						break;
					}
				}
				this.toggleEditButton.setLabel(editStr);
			},
			setSourceText: function(sourceText){
				if (!sourceText){
					this.displayText.setValue("");
					this.editText.setValue("");
				}else{
					this.displayEdit.setValue( sourceText );
					this.updateRenderedText();
				}
			},
			updateRenderedText: function(){
				var renderedStr = this.displayEdit.getValue();
				renderedStr = this.self(arguments).getRenderedText( renderedStr );
				this.renderedText.setValue( renderedStr );
			},
			toggleEdit: function(){
				try{
					
				if (this.state == this.displayRendered){
					this.setState(this.displayEdit);
				}else{
					this.updateRenderedText();
					this.setState(this.displayRendered);
					this.updateRegistry();
				}
				
				}catch(e){ debug(e); }
			},
			rememberNote:function(){
				try{
					
				if (this.getSaved())
					this.updateRenderedText();
				
				this.updateRegistry();
				
				}catch(e){ debug(e); }
			},
			updateRegistry:function(){
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				if (this.getSaved()){
					if (reg.addNoteToRegistry(this))
						reg.commit();
				}else{
					if (reg.removeNoteFromRegistry(this))
						reg.commit();
				}
			},
			windowClosed:function(){
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				var record = reg.getRecordByValue("note", this);
				if (record){
					record.note = null;
					record.sourceText = this.getSourceText();
					reg.commit();
				}else{
					if (this.getSaved()){
						reg.addNoteToRegistry(this);
						reg.commit();
					}
				}
			}
		}
	});
	// END Notepad
	
	qx.Class.define("senocular.tdk.NotepadButtons", {
		type:"singleton",
		extend: qx.core.Object,
		statics: {
			createButton: function(){
				var button = new qx.ui.form.Button(null, "webfrontend/ui/icon_city_notes.png");
				button.set({padding:1, toolTipText:"Open in Notepad"});
				return button;
			}
		},
		construct: function(){
			this.base(arguments);
		},
		members:{
			enabled:false,
			openMailButton:null,
			openThreadButton:null,
			openThreadWrapper:null,
			openChatButton:null,
			openSelectedCityWrapper:null,
			openSelectedCityButton:null,
			setEnable: function(enabled){
				if (this.enabled == enabled)
					return;
				
				var app = qx.core.Init.getApplication();
				
				if (enabled){
					if (this.openMailButton == null){
						this.openMailButton = this.self(arguments).createButton();
						this.openMailButton.addListener("execute", this.openMail, this);
					}
					if (this.openThreadButton == null){
						this.openThreadWrapper = new qx.ui.container.Composite( new qx.ui.layout.Canvas() );
						this.openThreadWrapper.set({maxHeight:0});
						this.openThreadWrapper.getContentElement().setStyle("overflow", "visible");
						this.openThreadButton = this.self(arguments).createButton();
						this.openThreadButton.addListener("execute", this.openThread, this);
						this.openThreadWrapper.add(this.openThreadButton, {top:0, right:0});
					}
					if (this.openChatButton == null){
						this.openChatButton = this.self(arguments).createButton().set({height:29});
						this.openChatButton.addListener("execute", this.openChat, this);
					}
					if (this.openSelectedCityButton == null){
						this.openSelectedCityWrapper = new qx.ui.container.Composite( new qx.ui.layout.Canvas() );
						this.openSelectedCityWrapper.set({maxHeight:0});
						this.openSelectedCityWrapper.getContentElement().setStyle("overflow", "visible");
						this.openSelectedCityButton = this.self(arguments).createButton().set({allowGrowX:false, alignX:"right"});
						this.openSelectedCityButton.addListener("execute", this.openSelectedCity, this);
						this.openSelectedCityWrapper.add(this.openSelectedCityButton, {top:0, right:0});
					}
					
					this.addControlTo(this.openMailButton, app.getMailPage(), {top:0, right:0});
					this.addControlTo(this.openThreadWrapper, app.getForumPostPage());
					this.addControlTo(this.openChatButton, app.chat, {top:5, right:218});
					this.addControlTo(this.openSelectedCityWrapper, app.cityDetailView.container, {top:0, right:0});
					webfrontend.Util.attachNetEvent(
						ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange,
						this,this.onRegionSelectionChange
					);
					senocular.tdk.NotepadRegistry.getInstance().addListener("registryChanged", this.registryChanged, this);
				}else{
					this.removeControlFrom(this.openMailButton, app.getMailPage());
					this.removeControlFrom(this.openThreadWrapper, app.getForumPostPage());
					this.removeControlFrom(this.openChatButton, app.chat);
					this.removeControlFrom(this.openSelectedCityWrapper, app.cityDetailView.container);
					webfrontend.Util.detachNetEvent(
						ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange,
						this, this.onRegionSelectionChange
					);
					senocular.tdk.NotepadRegistry.getInstance().removeListener("registryChanged", this.registryChanged, this);
				}
				this.enabled = enabled;
			},
			addControlTo: function(widget, container, map){
				if (widget.getLayoutParent() != container)
					container.addAt(widget, 0, map);
			},
			removeControlFrom: function(widget, container){
				if (widget != null && widget.getLayoutParent() == container)
					container.remove(widget);
			},
			openMail: function(){
				try {
					
				senocular.tdk.Notepad.create( this.getCurrentMailSourceText() );
					
				}catch(e) { debug(e); }
			},
			getCurrentMailSourceText: function(){
				var text = "";
				// KLUDGE: intercepts calls to another API that passes
				// in the desired data.  Once intercepted, remove the
				// interception to allow normal operation
				
				var app = qx.core.Init.getApplication();
				// override to hijack parameters
				app.showSendMail = function(mailto, mailcc, unused, subject, body, datetime, kind){
					text = "[b]Email:[/b] " + subject 
						+ "\n[b]From:[/b] " + mailto
						+ "\n\n" + body;
				}
				app.switchOverlay = function(){} // also called in onReply; override to do nothing
				var mailPage = app.getMailPage();
				mailPage._onReply(); // calls app.showSendMail; may break if callback gets obfuscated
				delete app.showSendMail;
				delete app.switchOverlay;
				return text;
			},
			openThread: function(){
				try {
					
				senocular.tdk.Notepad.create( this.getCurrentThreadSourceText() );
					
				}catch(e) { debug(e); }
			},
			getCurrentThreadSourceText: function(){
				var app = qx.core.Init.getApplication();
				var page = app.getForumPostPage();
				var divider = "\n[hr]\n";
				var sourceText = "[b]Thread:[/b] " + page.lblThreadTitle.getValue();
				var posts = page.postListContainer.getChildren();
				var i, n = posts.length;
				for (i=0; i<n; i++){
					sourceText += divider + this.getCustomTextFromPost( posts[i] );
				}
				return sourceText;
			},
			getCustomTextFromPost: function(widget){
				var text = "";
				// KLUDGE: try to find content text within
				// the text properties on the widget
				// There should only be one for the post text
				// that matches the conditions below
				for (var prop in widget) {
					if (widget.hasOwnProperty(prop) 
					&&  prop.indexOf("$$") != 0 // hidden properties
					&&  (typeof widget[prop]) == "string"
					&&  widget[prop] != "widget"){ // string known to exist
						text = widget[prop];
					}
				}
				return text;
			},
			openChat: function(){
				try {
					
				var chatText = this.getChatText();
				if (chatText) // release notes not supported, returns empty string
					senocular.tdk.Notepad.create( chatText );
					
				}catch(e) { debug(e); }
			},
			getChatText:function(){
				var str = "";
				var chat = qx.core.Init.getApplication().chat;
				var tabIndex = chat.tabView.indexOf(chat.tabView.getSelection()[0]);
				var chatContainer = chat.chatViewComposite[tabIndex];
				if (chatContainer){
					var messages = chatContainer.getChildren();
					var i, n = messages.length;
					for (i=0; i<n; i++){
						// Chat source is lost by the time it makes it into chat
						// we can only get the final text which we must remove
						// the generated HTML tags from
						str += qx.lang.String.trim( qx.lang.String.stripTags(messages[i].getValue()) ) + "\n";
					}
				}
				
				return str;
			},
			openSelectedCity: function(){
				try {
					
				var selectedCity = qx.core.Init.getApplication().cityDetailView.city;
				var cityPos = senocular.tdk.CityUtils.idToString3x3( selectedCity.get_Coordinates() );
					
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				var record = reg.getRecordByMeta(cityPos);
				if (record){
					reg.openRecord(record);
				}else{
					var cityName = selectedCity.get_Name();
					var cityPlayerName = "[player]" + selectedCity.get_PlayerName() + "[/player]";
					var cityAllianceName = selectedCity.get_AllianceName();
					if (cityAllianceName)
						cityAllianceName = " ([alliance]" + cityAllianceName + "[/alliance])";
					
					var note = senocular.tdk.Notepad.create(null, false);
					// source is set after to leave in edit mode for more notes
					note.setSourceText("[" + cityPos + "] " + cityName + " by " + cityPlayerName + cityAllianceName + "\n");
				}
				
				}catch(e) { debug(e); }
			},
			onRegionSelectionChange: function(from, to){
				try {
					
				// KLUDGE: This same event is used to set the city value
				// for the selection so we have to defer for that event
				// action to take place before we act on it
				defer(this.newCitySelected, this, EVENT_PRIORITY_DEFER_DELAY);
					
				}catch(e) { debug(e); }	
			},
			newCitySelected: function(){
				try {
					
				this.updateNoteExists();
					
				}catch(e) { debug(e); }	
			},
			registryChanged: function(){
				try {
					
				this.updateNoteExists();
					
				}catch(e) { debug(e); }	
			},
			updateNoteExists:function(){
				var record = null;
				var selectedCity = qx.core.Init.getApplication().cityDetailView.city;
				if (selectedCity){
					var cityPos = senocular.tdk.CityUtils.idToString3x3( selectedCity.get_Coordinates() );
					var reg = senocular.tdk.NotepadRegistry.getInstance();
					record = reg.getRecordByMeta(cityPos);
				}
				this.openSelectedCityButton.setLabel( (record == null) ? null : "*" );
			}
		}
	});
	// END NotepadButtons
	
	qx.Class.define("senocular.tdk.ChatCommander", {
		type:"singleton",
		extend: qx.core.Object,
		construct: function(enabled){
			this.base(arguments);
			if (enabled != undefined)
				this.setEnable(enabled);
			// duplicate lookup for alternate command with a "?" character
			this["command_tdk?"] = this.command_tdkhelp;
		},
		members:{
			enabled:false,
			setEnable:function(enabled){
				if (this.enabled == enabled)
					return;
				
				if (enabled){
					qx.core.Init.getApplication().chat.sendCurrent = this.sendCurrentIntercept;
				}else{
					delete qx.core.Init.getApplication().chat.sendCurrent; // original is prototyped
				}
				this.enabled = enabled;
			},
			sendCurrentIntercept: function (){
				try {
					
				try {
					var hijacker = senocular.tdk.ChatCommander.getInstance();
					var line = this.chatLine.getValue();
					
					if (!line || !webfrontend.gui.Util.stringIsVisible(line)) 
						return null;
					
					line = qx.lang.String.trim(line);
					
					var commandParts = line.match(/^[\/]([a-zA-Z?]+)(.*)$/);					
					if (commandParts && commandParts.length == 3){
						
						var originalCommand = commandParts[1].toLowerCase();
						var command = "command_" + originalCommand;
						if (hijacker[command] != null){
							
							// valid chat input interception
							try {
								// save original (trimmed) to command buffer
								this.buffer.unshift(line);
								
								// call command
								var data = qx.lang.String.trim(commandParts[2]); // trimming input
								hijacker[command](data);
								
							}catch(erro){
								hijacker.addChatMessage(
									"Sorry, but there was an error carrying out your "+originalCommand+" command."
								);
								debug(erro);
							}finally{
								// error or not, we exit to prevent
								// the chat command from being
								// handled normally (sent to the server)
								this.chatLine.setValue("");
								return;
							}
						}
					}
				}catch(err){
					// we did something wrong; fallback to default
					debug(err);
				}
				
				// no interception made; call the original method
				this.__proto__.sendCurrent.call(this);
				
				}catch(e){ debug(e); }
			},
			addChatMessage: function(message){
				qx.core.Init.getApplication().chat._outputMsg(
					'<font color="#FFFFFF"><b>TDK:</b> '+message+'</font>', "SYSTEM", 7
				);
			},
			command_tdkhelp:function(input){
				this.addChatMessage("Chat Commander Information"
					+"<br/><br/><b>Commands</b>:"
					+"<br/>/tdkhelp or /tdk? = Display this help text"
					+"<br/><br/>/cls = Clears the chat window"
					+"<br/><br/>/mail or /email [<i>to</i> [,<i>subject</i> [,<i>message</i>]]]"
					+" = Displays the write email dialog or if all three comma (,) separated fields are"
					+" present sends an email. If sending to multiple users, separate their name with a semicolon (;)"
					+"<br/><br/>/show <i>what-to-show</i> = Displays or hides (if already visible) a game window"
					+"<br/><br/>/goto [<i>cXX</i> or <i>XXX:XXX</i>] = Goes to a continent or coordinate"
					+"<br/><br/>/whois <i>player-name</i> = Displays the info dialog for a player"
					+"<br/><br/>/whoare <i>alliance-name-or-abbreviation</i> = Displays the info dialog for an alliance"
					+"<br/><br/>/whatis or /reports <i>XXX:XXX</i> = Displays city info dialog (reports) for the city at the coordinates"
					+"<br/><br/>/eval <i>javascript-expression</i> = Evaulates a javascript expression in the context of the game"
					+"<br/><br/>/version = Displays the current TDK extension version in the chat window"
					+"<br/><br/>/note <i>note-text</i> = Saves a note to the Notes page with the specified text"
					+"<br/><br/>/activity <i>user-in-your-alliance</i> = Shows the last login date of the user specified"
				);
			},
			command_cls:function(input){
				var chat = qx.core.Init.getApplication().chat;
				var chats = chat.chatViewComposite;
				var i, n = chats.length;
				for (i=0; i<n; i++){
					chats[i].removeAll();
					chat.numberOfMsg[i] = 0;
				}
			},
			command_email: function(input){
				this.command_mail(input);
			},
			data_mail_lastRequest:null,
			command_mail: function(input){
				var mailParts = input.split(",");
				
				if (mailParts.length >= 3){
					// enough to send the message now
					
					var target = mailParts.shift();
					var request = {
						subject: mailParts.shift(),
						body: mailParts.join(",")
					};
					
					var command;
					if (target.indexOf(";") != -1){
						command = "IGMBulkSendMsg";
						request.targets = target;
					}else{
						command = "IGMSendMsg";
						request.target = target;
					}
					
					this.data_mail_lastRequest = request;
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand(command, request, this, this.method_mail_onMailSent);

				}else{
					// not enough to send, just show the dialog
					mailParts.length = 2;
					qx.core.Init.getApplication().showSendMail(mailParts.shift(), "", null, mailParts.shift());
				}
			},
			method_mail_onMailSent:function(ok,success){
				var message;
				if (ok && success){
					message = "Your mail has been sent.";
				}else{
					message = "There was an error when sending your mail; please try sending manually.";
					if (this.data_mail_lastRequest){
						qx.core.Init.getApplication().showSendMail(
							this.data_mail_lastRequest.target || this.data_mail_lastRequest.targets,
							"", null,
							this.data_mail_lastRequest.subject,
							this.data_mail_lastRequest.body
						);
					}else{
						qx.core.Init.getApplication().showSendMail("", "", null, "");
					}
				}
				
				this.addChatMessage(message);
			},
			command_whois: function(input){
				var app = qx.core.Init.getApplication();
				app.showInfoPage(app.getPlayerInfoPage(),{name:input});
			},
			command_whoare: function(input){
				var app = qx.core.Init.getApplication();
				app.showInfoPage(app.getAllianceInfoPage(),{name:input});
			},
			command_reports: function(input){
				this.command_whatis(input);
			},
			command_whatis: function(input){
				var pos = senocular.tdk.CityUtils.string3x3ToPosition(input);
				webfrontend.gui.Util.openCityProfile(pos[0], pos[1]);
			},
			command_show: function(input){
				if (!input)
					return;
				
				var inputParts = input.match(/^([a-zA-Z?]+)(.*)$/);
				if (!inputParts)
					return;
				
				var app = qx.core.Init.getApplication();
				switch (inputParts[1].toLowerCase()){
					case "tdk":{
						senocular.tdk.ToolsWindow.getInstance().toggleVisible();
						break;
					}
					// Buttons from title bar
					case "reports":{
						app.title.onReport();
						break;
					}
					case "quests":{
						app.title.onQuest();
						break;
					}
					case "research":{
						app.title.onResearch();
						break;
					}
					case "overviews":{
						app.title.onOverviews();
						break;
					}
					case "rankings":{
						app.title.onStatistics();
						break;
					}
					case "email":
					case "mail":{
						app.title.onMail();
						if (inputParts[2]){
							var mailParts = inputParts[2].split(",");
							if (mailParts.length < 3)
								mailParts.length = 3;
							app.showSendMail(mailParts.shift(), "", null, mailParts.shift(), mailParts.join(","));
						}
						break;
					}
					case "alliance":{
						app.title.onAlliance();
						break;
					}
					case "social":{
						app.title.onSocial();
						break;
					}
					case "items":{
						app.title.onItems();
						break;
					}
					case "shop":{
						app.title.onShop();
						break;
					}
					case "profile":{
						var allianceID = webfrontend.data.Alliance.getInstance().getId();
						if (allianceID){
							app.showInfoPage(app.getAllianceInfoPage(),{id:allianceID});
						}
						break;
					}
					case "attacks":{
						app.showAllianceAttacksWidget();
						break;
					}
					case "virtues":{
						app.showAllianceVirtuesWidget();
						break;
					}
					case "supporter":{
						app.showAllianceSupporterRankingsWidget();
						break;
					}
					// Alliance tabs
					case "overview":{
						this.showAllianceTab(0);
						break;
					}
					case "diplomacy":{
						this.showAllianceTab(1);
						break;
					}
					case "members":{
						this.showAllianceTab(2);
						break;
					}
					case "forum":
					case "forums":{
						this.showAllianceTab(3);
						break;
					}
					case "dfr":
					case "dailyreward":
					case "dailyfreereward":{
						var found = senocular.tdk.DailyRewardNotifications.getInstance().toggleDailyReward();
						if (!found)
							this.addChatMessage( "Daily Free Reward dialog not found" );
						break;
					}
					default:{
						// do nothing
						break;
					}
				}
			},
			showAllianceTab:function(index){
				var app = qx.core.Init.getApplication();
				// ensure alliance panel visible
				if (!app.title.alliance || app.getCurrentSelectionOverlay() != app.title.alliance){
					app.title.onAlliance();
				}
				
				var tabs = senocular.tdk.WidgetUtils.findChildByType(
					app.title.alliance.clientArea,
					qx.ui.tabview.TabView
				);
				if (tabs){
					tabs.setSelection([ tabs.getSelectables()[index] ]);
				}
			},
			command_goto:function(input){
				input = input.toLowerCase();
				
				var x, y;
				// continent
				if (input.indexOf("c") == 0){
					x = Number(input.charAt(2));
					if (isNaN(x)) x = 0;
					y = Number(input.charAt(1));
					if (isNaN(y)) y = 0;
					webfrontend.gui.Util.showMapModeViewPos("w", 0, 50+x*100, 50+y*100);
					
				// continent shorthand
				}else if (input.length <= 2 && isNaN(Number(input)) == false){
					
					if (input.length < 2){
						x = Number(input);
						y = 0;
					}else{
						x = Number(input.charAt(1));
						y = Number(input.charAt(0));
					}
					webfrontend.gui.Util.showMapModeViewPos("w", 0, 50+x*100, 50+y*100);
					
				// coordinate
				}else if (input.indexOf(":") != -1){
					var pos = senocular.tdk.CityUtils.string3x3ToPosition(input);
					webfrontend.gui.Util.showPos(pos[0], pos[1]);
				}
			},
			command_eval:function(input){
				try {
					var result;
					
					// create a new object context
					// for the scope of the eval
					(function(){
						result = eval(input);
					}).call({});
					
					if (result !== undefined)
						this.addChatMessage( String(result) );
					
				}catch(e){
					this.addChatMessage( String(e) );
				}
			},
			command_version:function(input){
				this.addChatMessage( EXTENSION_VERSION );
			},
			command_note:function(input){
				var reg = senocular.tdk.NotepadRegistry.getInstance();
				reg.addNoteToRegistry(null, input);
				reg.commit();
				this.addChatMessage( "Note saved" );
			},
			command_activity:function(input){
				if (input){
					this.data_activity_user = input;
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("AllianceGetMemberInfos", {}, this, this.method_activity_onAllianceInfo);
				}
			},
			data_activity_user:null,
			method_activity_onAllianceInfo:function(ok, response){
				try {
					
				if (ok){
					
					var lastLogin;
					var i = response.length;
					while(i--){
						if (response[i].n == this.data_activity_user){
							lastLogin = response[i].l;
							break;
						}
					}
					
					if (lastLogin){
						this.addChatMessage( "Last login for <b>" + this.data_activity_user + "</b>: " +lastLogin );
					}else{
						this.addChatMessage( "Error: User could not be found. Only alliance members are supported." );
					}
					
				}else{
					this.addChatMessage( "Error: Server communication failure." );
				}
				
				}catch(e){ 
					this.addChatMessage( "Error: Server response invalid." );
					debug(e); 
				}
			}
		}
	});
	// END ChatCommander
	
	qx.Class.define("senocular.tdk.NotificationWindow", {
		extend: qx.ui.window.Window,
		statics:{
			windowMap:{},
			create:function(message, windowID, autoDismiss){
				var win;
				// use a map to allow reuse of windows by a named id
				// this can help prevent spamming of notifications
				// if for example the same notification occurs frequently
				// and repeatedly
				if (this.windowMap[windowID] instanceof senocular.tdk.NotificationWindow){
					win = this.windowMap[windowID];
					win.setMessage(message);
				}else{
					win = new senocular.tdk.NotificationWindow(message);
					if (windowID)
						this.windowMap[windowID] = win;
				}
				
				// no open to prevent focus stealing
				// call non-focus commands of open manually
				//win.open();
				win.show();
				win.setActive(true);
				
				win.moveToNotificationArea();
				win.topOfTheStack();
				win.ding();
				
				if (autoDismiss)
					defer(win.close, win, Number(autoDismiss)*1000);
				
				return win;
			}
		},
		construct: function(message){
			this.base(arguments, "Notification", "resource/webfrontend/ui/icons/icon_autotrade_info.png"); 
			this.buildUI();
			this.setMessage(message);
		},
		members:{
			statusBarOffset:30,
			messageLabel:null,
			buildUI:function(){
				this.setLayout( new qx.ui.layout.VBox(2).set({alignX:"center"}) );
				this.set({width:200,minWidth:100,maxWidth:1000,height:125,minHeight:100,maxHeight:800,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,resizeSensitivity:7,contentPadding:10,useMoveFrame:true});
				
				// create elements
				var dismissButton = new qx.ui.form.Button("Dismiss").set({allowGrowX:false});
				dismissButton.addListener("execute", this.close, this);
				
				this.messageLabel = new qx.ui.basic.Label().set({rich:true, textAlign:"center"});

				// add elements
				this.add(new qx.ui.core.Spacer(), {flex:1});
				this.add(this.messageLabel);
				this.add(new qx.ui.core.Spacer(), {flex:1});
				this.add(dismissButton);
			},
			setMessage:function(message){
				this.messageLabel.setValue(message);
			},
			moveToNotificationArea:function(){
				var parent = this.getLayoutParent();
				if (!parent)
					return;
				
				var bounds = parent.getBounds();
				var size = this.getSizeHint();
				
				var left = Math.max(0, bounds.width - size.width);
				var top = Math.max(0, bounds.height - size.height - this.statusBarOffset);

				this.moveTo(left,top);
			},
			topOfTheStack:function(){
				this.setAlwaysOnTop(true);
				var parent = this.getLayoutParent();
				parent.addAt(this, parent.getChildren().length - 1);
			},
			ding:function(){
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				if (prefs.notificationsSound)
					ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/ui_popup");
			}
		}
	});
	// END NotificationWindow
	
	qx.Class.define("senocular.tdk.ChatNotifications", {
		type:"singleton",
		extend: qx.core.Object,
		statics:{
			showNote:function(message){
				message = unescape(message);
				message = message.replace(/\\'/g, "'");
				senocular.tdk.Notepad.create(message);
			}
		},
		construct: function(){
			this.base(arguments);
		},
		members:{
			enabled:false,
			setEnable: function(enabled){
				if (this.enabled == enabled)
					return;
				
				if (enabled){
					webfrontend.data.Chat.getInstance().addListener("newMessage", this.newChatMessage, this);
				}else{
					webfrontend.data.Chat.getInstance().removeListener("newMessage", this.newChatMessage, this);
				}
				
				this.enabled = enabled;
			},
			newChatMessage: function(evt){
				try {
					
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				var chatIsMin = qx.core.Init.getApplication().chat.chatMimimizedButton.getUserData("Shown");
					
				
				// only allow notifications when chat window is minimized
				if (chatIsMin || !prefs.chatNotificationsWhenMinimized){
					
					var data = evt.getData();
					var chatMessage = data.m;
					var playerName = webfrontend.data.Player.getInstance().getName();
					var message = null;
					
					// no notifications for own messages
					if (data.c == "privateout")
						return;
					
					// private message notification
					if (prefs.chatNotificationsPrivate && data.c == "privatein"){
						message = "You have received a private "+this.getMessageLink(data)+" from <b>"+data.s+"</b>";
						
					// your name was said in chat notification
					}else if (prefs.chatNotificationsName && chatMessage.toLowerCase().indexOf(playerName.toLowerCase()) != -1){
						
						message = "<b>"+data.s+"</b> has mentioned your name in "+this.getChatKind(data)+" "+this.getMessageLink(data);
						
					// text matches
					}else{
						
						if (prefs.chatNotificationsTextMatches){
							var chatText = chatMessage.toLowerCase();
							var matches = prefs.chatNotificationsTextMatches.toLowerCase().split(",");
							
							var i, n = matches.length;
							for (i=0;i<n;i++){
								if (chatText.indexOf(matches[i]) != -1){
									message = "'<b>"+matches[i]+"</b>' was mentioned in "+this.getChatKind(data)+" "+this.getMessageLink(data);
									break;
								}
							}
						}
					}
					
					if (message)
						senocular.tdk.NotificationWindow.create(message, "ChatNotifications", prefs.notificationAutoDismiss);
					
				}
				
				}catch(e){ debug(e); }
			},
			getChatKind:function(eventData){
				switch(eventData.c){
					case "@C":{
						return "an <b>All</b> chat";
						break;
					}
					case "_a":{
						return "an <b>Alliance</b> chat";
						break;
					}
				}
				return "a chat";
			},
			getMessageLink:function(eventData){
				var servTime = webfrontend.data.ServerTime.getInstance();
				var step = servTime.getServerStep();
				var time = webfrontend.Util.getDateTimeString(servTime.getStepTime(step),false,true);
				var messageMod = (eventData.c == "privatein") ? " (Private)" : "";
				chatMessage = "[b]From:[/b] [player]" + eventData.s + "[/player]<br />"
					+"[b]Time:[/b] " + time + "<br />"
					+"[b]Message" + messageMod + ":[/b] " + eventData.m.replace(/'/g, "\\'"); // need to escape ' used to contain message string in link
				return "<a href=\"#\" style=\""+LINK_STYLE+"\" onclick=\"senocular.tdk.ChatNotifications.showNote('" + escape(chatMessage) + "');\">message</a>";
			}
		}
	});
	// END ChatNotifications
	
	qx.Class.define("senocular.tdk.DailyRewardNotifications", {
		type:"singleton",
		extend: qx.core.Object,
		construct: function(){
			this.base(arguments);
		},
		members:{
			enabled:false,
			setEnable: function(enabled){
				if (this.enabled == enabled)
					return;
				
				if (enabled){
					webfrontend.data.Quest.getInstance().addListener("changeVersion", this.questChange, this);
				}else{
					webfrontend.data.Quest.getInstance().removeListener("changeVersion", this.questChange, this);
				}
				
				this.enabled = enabled;
			},
			questChange: function(evt){
				// dfr window added in this event, we need to
				// make sure to check for it after its own
				// call stack completes
				defer(this.checkForDailyReward, this, 500);
			},
			checkForDailyReward: function(){
				try {
					
				var dfr = this.getDailyReward();
				if (dfr)
					this.showNotification();
					
				}catch(e){ debug(e); }
			},
			getDailyReward:function(){
				var app = qx.core.Init.getApplication();
				var dailyRewardWindow;
				
				// find dfr window; prop name obfuscated
				for (var p in app){
					if (app[p] instanceof webfrontend.gui.DailyRewardWidget){
						dailyRewardWindow = app[p];
						break;
					}
				}
				// if not in application, check the root child list
				if (!dailyRewardWindow){
					var children = app.getRoot().getChildren();
					for (var i=0, n=children.length; i<n; i++){
						if (children[i] instanceof webfrontend.gui.DailyRewardWidget){
							dailyRewardWindow = children[i];
							break;
						}
					}
				}
				
				return dailyRewardWindow;
			},
			hideDailyReward:function(){
				return this.toggleDailyReward(false);
			},
			showDailyReward:function(){
				return this.toggleDailyReward(true);
			},
			toggleDailyReward:function(forceVisible){
				var dfr = this.getDailyReward();
				if (dfr){
					var parent = dfr.getLayoutParent();
					
					if (forceVisible == undefined)
						forceVisible = Boolean(parent == null);
					
					var app = qx.core.Init.getApplication();
					
					if (forceVisible){
						
						if (parent != app.desktop)
							app.desktop.add(dfr);
						
						this.showNotification();
						return true;
						
					}else{
						
						if (parent){
							parent.remove(dfr);
							return true;
						}
					}
				}
				return false;
			},
			showNotification:function(){
				// prefs also checked here (not just enable) in case another
				// process causes the dialog to appear
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				if (prefs.enableDailyFreeRewardNotifications){
					var message = "<b>Daily Free Reward</b> dialog detected.<br />"
						+"<a href=\"#\" style=\"" + LINK_STYLE + "\" onclick=\"senocular.tdk.DailyRewardNotifications.getInstance().hideDailyReward();\">Hide</a>"
						+" or <a href=\"#\" style=\"" + LINK_STYLE + "\" onclick=\"senocular.tdk.DailyRewardNotifications.getInstance().showDailyReward();\">Show</a>";
					senocular.tdk.NotificationWindow.create(message, "DailyRewardNotifications", 0);
				}
			}
		}
	});
	// END DailyRewardNotifications
		
	qx.Class.define("senocular.tdk.CitySingleClickOperations", {
		type:"singleton",
		extend: qx.ui.container.Composite,
		construct: function(){
			this.base(arguments, new qx.ui.layout.HBox(3) );
			this.buildUI();
			this.commandQueue = new senocular.tdk.CommandQueue();
			this.setState("off");
		},
		members:{
			enabled:null,
			state:null,
			flash:null,
			commandQueue:null,
			visMainEvents:null,
			operationSelect:null,
			toggleButton:null,
			setEnable: function(enabled){
				if (this.enabled == enabled)
					return;
				
				var parent;
				
				if (enabled){
					
					var buildingQueue = qx.core.Init.getApplication().cityInfoView.buildingQueue;
					parent = buildingQueue.getLayoutParent();
					if (parent)
						parent.addBefore(this, buildingQueue);
					
					this.visMainEvents = qx.core.Init.getApplication().visMain;
					this.visMainEvents.addListener("changeMapLoaded", this.onMapChange, this);
					
				}else{
					
					parent = this.getLayoutParent();
					if (parent)
						parent.remove(this);
					
					this.turnOff();
					
					if (this.visMainEvents){
						this.visMainEvents.removeListener("changeMapLoaded", this.onMapChange, this);
						this.visMainEvents = null;
					}
				}
				
				this.enabled = enabled;
			},
			buildUI:function(){
				this.set({marginLeft:1, marginRight:8, marginTop:4, marginBottom:6});
				
				var descLabel = new qx.ui.basic.Label("Single Click to: ").set({alignY:"middle"});
				
				this.operationSelect = new qx.ui.form.SelectBox();
				this.operationSelect.addListener("changeSelection", this.operationSelected, this);
				// filled dynamically by rebuildOptions()
				
				this.toggleButton = new qx.ui.form.Button("Off"); // would use ToggleButton but not skinned properly
				this.toggleButton.addListener("execute", this.toggleState, this);
				
				this.flash = new qx.ui.container.Composite();
				this.flash.setDecorator( new qx.ui.decoration.Single().set({backgroundColor:"#9F2211"}) );
				
				
				this.add( descLabel );
				this.add( this.operationSelect, {flex:1} );
				this.add( this.toggleButton );
			},
			rebuildOptions:function(prefOptions){
				this.operationSelect.removeAll();
				
				var i, n = CITY_BUILDING_IDS.length;
				
				// "fake" indices at the end of the build ids list for demolish and upgrade
				// though in the list itself, these come first
				if (prefOptions[n])
					this.operationSelect.add( new qx.ui.form.ListItem("Demolish", null, "demolish") );
				if (prefOptions[n+1])
					this.operationSelect.add( new qx.ui.form.ListItem("Upgrade", null, "upgrade") );
				
				var buildings = webfrontend.res.Main.getInstance().buildings;
				var id, name, item;
				for (i=0; i<n; i++){
					id = CITY_BUILDING_IDS[i];
					if (id == CASTLE_BUILDING_ID || id == PALACE_BUILDING_ID)
						continue;
					
					if (prefOptions[i]){
						name = buildings[id].dn;
						item = new qx.ui.form.ListItem(name, null, "build:"+id);
						this.operationSelect.add( item );
					}
				}
				this.turnOff();
			},
			toggleState:function(){
				this.setState( (this.state == "off") ? "on" : "off" );
			},
			setState:function(state){
				if (this.state == state)
					return;
				
				switch(state){
					case "on":{
						this.toggleButton.set({label:"On",
							icon:"resource/webfrontend/ui/icons/overviews/header_warnings.png",
							toolTipText:"ACTIVE. Click to turn off"
						});
						if (this.visMainEvents)
							this.visMainEvents.addListener("changeSelection", this.selectionClick, this);
						break;
					}
					case "off":{
						this.toggleButton.set({label:"Off",
							icon:null,
							toolTipText:"Inactive. Click to turn on"
						});
						if (this.visMainEvents)
							this.visMainEvents.removeListener("changeSelection", this.selectionClick, this);
						break;
					}
					default:{
						// unsupported state
						return;
					}
				}
				this.state = state;
			},
			operationSelected:function(evt) {
				try {
					this.setState("on");
					
				}catch(e){ debug(e); }
			},
			selectionClick:function(evt){
				try {
					
				if (this.state != "on")
					return;
				
				var buildQueueMax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
				var buildQueue = webfrontend.data.City.getInstance().buildQueue;
				if (buildQueue && buildQueue.length >= buildQueueMax)
					return;
					
				var opSelection = this.operationSelect.getSelection();
				if (!opSelection || !opSelection.length)
					return;
				
				var selected = evt.getData();
				var command = null;
				var op = opSelection[0].getModel();
				var levelData = this.getBuildLevel(selected);
			
				if (this.canPayFor(op, selected, levelData)){
					this.performAction(op, selected, levelData.level, true);
				}else if (webfrontend.data.Player.getInstance().getMinisterBuildPresent()){
					this.performAction(op, selected, levelData.level, false);
				}
				
				}catch(e){ debug(e); }
			},
			canPayFor:function(op, selected, levelData){
				if (op == "demolish")
					return true;
				
				var city = webfrontend.data.City.getInstance();
				var cost = null;
				
				if (selected instanceof webfrontend.vis.CityBuilding){
				
					if (levelData.isPaid == false)
						return false;
				
					cost = BUILDING_COST[ selected.getType() ][ levelData.level ];
					
				}else if (selected instanceof webfrontend.vis.CityBuildingPlace){
					
					var opType = this.getBuildID(op);
					if (opType)
						cost = BUILDING_COST[ opType ][ 0 ];
					
				}
				
				if (cost && cost[0] <= city.getResourceCount(1) // wood
				&&  cost[1] <= city.getResourceCount(2)){ // stone
					return true;
				}
				
				return false;
			},
			getBuildLevel:function(selected){
				var levelData = {
					level:0,
					isPaid:true
				};
				
				if (selected instanceof webfrontend.vis.CityBuilding == false)
					return levelData;
				
				var selectedID = selected.getId();
				levelData.level = selected.getLevel();
				
				var buildQueue = webfrontend.data.City.getInstance().buildQueue;
				if (buildQueue){
					var i = buildQueue.length;
					while(i--){
						if (buildQueue[i].building == selectedID
						&& buildQueue[i].level > levelData.level){
							levelData.level = buildQueue[i].level;
							levelData.isPaid = buildQueue[i].isPaid;
						}
					}
				}
				
				return levelData;
			},
			performAction:function(op, selected, level, isPaid){
				var city = webfrontend.data.City.getInstance();
				var command = null;
				
				switch(op){					
					case "demolish":{
						command = this.getDemoCommand(selected);
						break;
					}
					case "upgrade":{
						command = this.getUpgradeCommand(selected, level, isPaid);
						break;
					}
					default:{
						command = this.getBuildCommand(op, selected, level, isPaid);
						break;
					}
				}
							
				if (command){
					var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
					
					this.commandQueue.addCommand(command.target, command.data);
					if (!this.commandQueue.isRunning)
						this.commandQueue.send();
					
					if (prefs.cityDemoToggleFlash)
						this.showFlash();
				}
			},
			getDemoCommand:function(selected){
				if (selected instanceof webfrontend.vis.CityResField){
					return {
						target:"UpgradeBuilding", // resources upgrade to demolish
						data:{
							cityid: webfrontend.data.City.getInstance().getId(),
							buildingid: selected.visId,
							buildingtype: BUILDING_TYPE_BY_RES_TYPE[selected.getResType()],
							isPaid: true
						}
					};
				}else if (selected instanceof webfrontend.vis.CityBuilding){
					
					if (CANNOT_DEMOLISH_BUILDINGS[selected.getType()])
						return null;
					
					return {
						target:"DemolishBuilding",
						data: {
							cityid: webfrontend.data.City.getInstance().getId(),
							buildingid: selected.visId
						}
					};
				}
				
				return null;
			},
			getUpgradeCommand: function(selected, level, isPaid){
				if (selected instanceof webfrontend.vis.CityBuilding
				&& level < 10){
					return {
						target:"UpgradeBuilding",
						data: {
							cityid: webfrontend.data.City.getInstance().getId(),
							buildingid: selected.visId,
							buildingType: selected.getType(),
							isPaid: isPaid
						}
					};
				}
				
				return null;
			},
			getBuildCommand: function(op, selected, level, isPaid){
				var opType = this.getBuildID(op);
				if (!opType)
					return;
				
				if (selected instanceof webfrontend.vis.CityBuildingPlace
				|| (selected instanceof webfrontend.vis.CityBuilding && level < 10 && String(selected.getType()) == opType)){ 
					// TODO: [future] more validation for building? (is plot valid for type?)
					// For now we'll assume the user won't try otherwise
					return {
						target:"UpgradeBuilding",
						data: {
							cityid: webfrontend.data.City.getInstance().getId(),
							buildingid: selected.visId,
							buildingType: opType,
							isPaid:isPaid
						}
					};
				}
				
				return null;
			},
			getBuildID:function(op){
				var opParts = op.split(":"); // expect "build:XX" where XX is building type
				if (opParts[0] != "build")
					return "";
				return opParts[1];
			},
			showFlash:function(){
				qx.core.Init.getApplication().getDesktop().add(this.flash, {top:0, left:0, right:0, bottom:0});
				defer(this.removeFlash, this, 100);
			},
			removeFlash:function(){
				var parent = this.flash.getLayoutParent();
				if (parent)
					parent.remove(this.flash);
			},
			onMapChange:function(){
				var prefs = senocular.tdk.TDKExtension.getInstance().prefs;
				
				if (prefs.cityDemoToggleAutoOff)
					this.turnOff();
			},
			turnOff:function(){
				this.removeFlash();
				this.commandQueue.cancel();
				this.setState("off");
			}
		}
	});
	// END CitySingleClickOperations
	
	qx.Class.define("senocular.tdk.CityList", {
		type:"singleton",
		extend: qx.ui.window.Window,
		construct: function(){
			this.base(arguments, "City List");
			this.buildUI();
			this.refresh();
		},
		members:{
			cityContainer:null,
			viewSelect:null,
			display: function(){
				if (this.getMode() != "minimized")
					return;
				
				this.open();
				return this;
			},
			buildUI: function(){
				
				// modeled mostly after city notes settings
				this.set({width:525,minWidth:100,height:400,minHeight:100,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,showClose:false,resizeSensitivity:7,contentPadding:5,useMoveFrame:true});
				this.center();
					
				this.setLayout( new qx.ui.layout.VBox(5) );
				webfrontend.gui.Util.formatWinClose(this);
				
				this.viewSelect = new qx.ui.form.SelectBox().set({allowGrowX:false, minWidth:20});
				this.viewSelect.add( new qx.ui.form.ListItem("Default", null, "view:Default") );
				this.viewSelect.add( new qx.ui.form.ListItem(null, "webfrontend/ui/msc_dropdown_divider.png", null).set({appearance:"listitem_separator"}) );
				//this.viewSelect.add( new qx.ui.form.ListItem("Modify...", null,  "filter") );
				this.viewSelect.add( new qx.ui.form.ListItem("Refresh", null, "refresh") );
				this.viewSelect.addListener("changeSelection", this.viewSelected, this);
					
				// create elements
				var cityScroller = new qx.ui.container.Scroll();
				this.cityContainer = new qx.ui.container.Composite( new qx.ui.layout.Flow().set({spacingX:1, spacingY:1}) );
				
				// add elements

				
				this.add( this.viewSelect );
				this.add( cityScroller, {flex:1} );
				cityScroller.add(this.cityContainer);
			},
			viewSelected: function(evt){
				try{
				var selection = evt.getData()[0];
				var model = selection.getModel();
				
				switch(model){
					case "filter":{
						this.openFilterWindow();
						model = null;
						break;
					}
					case "refresh":{
						this.refresh();
						model = null;
						break;
					}
				}
				
				if (model){
					var view = model.substr(5); // removes "view:" model prefix
					// TODO: switch to view
				}
				
				if (model == null){
					evt.getCurrentTarget().setSelection(evt.getOldData());
					return;
				}
				
				}catch(e){ debug(e); }
			},
			openFilterWindow:function(){
					
				senocular.tdk.CityListFilter.getInstance().display();
					
			},
			refresh:function(){
				try{
					
				// TODO: just use internal .cities reference?
				this.cityContainer.removeAll();
				this.cityContainer.add( new qx.ui.basic.Label("<i>Loading...</i>").set({rich:true, margin:5}) );
				var playerID = webfrontend.data.Player.getInstance().getId();
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("GetPublicPlayerInfo", {id:playerID}, this, this.onPlayerUpdate);
					
				}catch(e){ debug(e); }
			},
			onPlayerUpdate:function(ok, response){
				try{
				
				if (!ok)
					return;
				
				this.cityContainer.removeAll();
				var cities = response.c;
				var text;
				var i, n = cities.length;
				for(i=0; i<n; i++){
					text = "<a href=\"#\" style=\""+LINK_STYLE+"\" onclick=\"webfrontend.gui.Util.showPos("+cities[i].x+","+cities[i].y+");\">" + cities[i].n + "</a>";
					this.cityContainer.add( new qx.ui.basic.Label(text).set({rich:true, padding:1, width:80}) );
				}
				
				}catch(e){ debug(e); }
			},
			openInNotepad:function(){
				try{
					
				var text = "";
				senocular.tdk.Notepad.create(text);
					
				}catch(e){ debug(e); }
			}
		}
	});
	// END CityList
	
	qx.Class.define("senocular.tdk.CityListFilter", {
		type:"singleton",
		extend: qx.ui.window.Window,
		construct: function(){
			this.base(arguments, "City List Options");
			this.buildUI();
		},
		members:{
			directionSelect:null,
			
			filterWaterAccessCheck:null,
			filterLandlockedCheck:null,
			filterCitiesCheck:null,
			filterCastlesCheck:null,
			filterPalacesCheck:null,
			filterNameCheck:null,
			filterNameMatchSelect:null,
			filterNameMatchText:null,
			filterReferenceCheck:null,
			filterReferenceMatchSelect:null,
			filterReferenceMatchText:null,
			filterScoreCheck:null,
			filterScoreMatchSelect:null,
			filterScoreMatchSpinner:null,
			filterContinentCheck:null,
			filterContinentSelect:null,
			filterTSCheck:null,
			filterTSMatchSelect:null,
			filterTSMatchSpinner:null,
			filterBaronsCheck:null,
			filterBaronsMatchSelect:null,
			filterBaronsMatchSpinner:null,
			
			actionMapViewCheck:null,
			actionMapViewSelect:null,
			actionMoveCheck:null,
			actionSwitchCheck:null,
			actionShowInfoCheck:null,
			
			display: function(){
				if (this.getMode() != "minimized")
					return;
				
				this.open();
				
				return this;
			},
			buildUI: function(){
				var app = qx.core.Init.getApplication();
				
				// modeled mostly after city notes settings
				this.set({width:525,minWidth:100,height:400,minHeight:100,
					allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
					showStatusbar:false,showClose:false,resizeSensitivity:7,contentPadding:10,useMoveFrame:true});
				this.center();
				
				this.setLayout( new qx.ui.layout.VBox(15) );
				webfrontend.gui.Util.formatWinClose(this);
					
				
				// create elements
				var contentScroller = new qx.ui.container.Scroll();
				var content = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
					
				var viewLabel = senocular.tdk.WidgetUtils.createTitle("View:",
					"Control how the city list is displayed");
				viewLabel.set({marginTop:5});
				
				var viewGrid = new qx.ui.container.Composite( new qx.ui.layout.Grid(8,3) );
				viewGrid.set({marginLeft:8});
				
				var viewDisplayLabel = new qx.ui.basic.Label("<b>Display</b>").set({rich:true});
				var viewSortLabel = new qx.ui.basic.Label("<b>Sort</b>").set({rich:true});
				var viewGroupLabel = new qx.ui.basic.Label("<b>Group</b>").set({rich:true});
				
				var viewTypeLabel = new qx.ui.basic.Label("Type");
				var viewNameLabel = new qx.ui.basic.Label("Name");
				var viewReferenceLabel = new qx.ui.basic.Label("Reference");
				var viewScoreLabel = new qx.ui.basic.Label("Score");
				var viewCoordsLabel = new qx.ui.basic.Label("Coords");
				var viewContinentLabel = new qx.ui.basic.Label("Continent");
				var viewTSLabel = new qx.ui.basic.Label("TS");
				var viewBaronsLabel = new qx.ui.basic.Label("Barons");
				
				
				var directionLabel = senocular.tdk.WidgetUtils.createTitle("Direction:",
					"Determine what direction cities are listed in the list");
				
				this.directionSelect = senocular.tdk.WidgetUtils.createSelect(["Horizontal", "Vertical"]);
				this.directionSelect.set({marginLeft:8, allowGrowX:false});
				
				
				var filterLabel = senocular.tdk.WidgetUtils.createTitle("Filter:",
					"Determine what cities are listed and what are not");
				
				var filterGridLayout = new qx.ui.layout.Grid(3,3);
				var filterGrid = new qx.ui.container.Composite( filterGridLayout );
				filterGrid.set({marginLeft:8});
				
				this.filterWaterAccessCheck = new qx.ui.form.CheckBox("Water access");
				this.filterLandlockedCheck = new qx.ui.form.CheckBox("Landlocked");
				
				this.filterCitiesCheck = new qx.ui.form.CheckBox("Cities");
				this.filterCastlesCheck = new qx.ui.form.CheckBox("Castles");
				this.filterPalacesCheck = new qx.ui.form.CheckBox("Palaces");
				
				this.filterNameCheck = new qx.ui.form.CheckBox("Name:");
				this.filterNameMatchSelect = senocular.tdk.WidgetUtils.createSelect(["is","is not","contains","contains not"]);
				this.filterNameMatchText = new qx.ui.form.TextField("");
				app.setElementModalInput(this.filterNameMatchText);
			
				this.filterReferenceCheck = new qx.ui.form.CheckBox("Reference:");
				this.filterReferenceMatchSelect = senocular.tdk.WidgetUtils.createSelect(["is","is not","contains","contains not"]);
				this.filterReferenceMatchText = new qx.ui.form.TextField("");
				app.setElementModalInput(this.filterReferenceMatchText);
				
				this.filterScoreCheck = new qx.ui.form.CheckBox("Score:");
				this.filterScoreMatchSelect = senocular.tdk.WidgetUtils.createSelect([">",">=","==","<=","<"]).set({width:80});
				this.filterScoreMatchSpinner = new qx.ui.form.Spinner(0, 1, 50000);
				app.setElementModalInput(this.filterScoreMatchSpinner);
				
				this.filterContinentCheck = new qx.ui.form.CheckBox("Continent is:");
				this.filterContinentSelect = senocular.tdk.WidgetUtils.createSelect( this.createContinentList() ).set({width:80});
				
				this.filterTSCheck = new qx.ui.form.CheckBox("TS:");
				this.filterTSMatchSelect = senocular.tdk.WidgetUtils.createSelect([">",">=","==","<=","<"]).set({width:80});
				this.filterTSMatchSpinner = new qx.ui.form.Spinner(0, 1, 10000000);
				app.setElementModalInput(this.filterTSMatchSpinner);
				
				this.filterBaronsCheck = new qx.ui.form.CheckBox("Barons:");
				this.filterBaronsMatchSelect = senocular.tdk.WidgetUtils.createSelect([">",">=","==","<=","<"]).set({width:80});
				this.filterBaronsMatchSpinner = new qx.ui.form.Spinner(0, 1, 10);
				app.setElementModalInput(this.filterBaronsMatchSpinner);
				
				
				var actionLabel = senocular.tdk.WidgetUtils.createTitle("Click Action:",
					"Determine what happens when you click on a city in the list");
				
				var actionMapViewRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({marginLeft:8}); 
				this.actionMapViewCheck = new qx.ui.form.CheckBox("Set map view");
				this.actionMapViewSelect = senocular.tdk.WidgetUtils.createSelect([["City View", null, "c"],["Region View", null, "r"],["World View", null, "w"]]);
					
				this.actionMoveCheck = new qx.ui.form.CheckBox("Move to city").set({marginLeft:8});
				this.actionSwitchCheck = new qx.ui.form.CheckBox("Switch to city").set({marginLeft:8});
				this.actionShowInfoCheck = new qx.ui.form.CheckBox("Show city info").set({marginLeft:8});
				
				
				var commitRow = new qx.ui.container.Composite( new qx.ui.layout.HBox(3) );
				
				var applyButton = new qx.ui.form.Button("Apply Changes");
				applyButton.addListener("execute", this.applyFilter, this);
				var resetButton = new qx.ui.form.Button("Undo Changes");
				resetButton.addListener("execute", this.restoreFilter, this);
				var commitSpacer = new qx.ui.core.Spacer();
				var okButton = new qx.ui.form.Button("OK");
				okButton.addListener("execute", this.ok, this);
				var cancelButton = new qx.ui.form.Button("Cancel");
				cancelButton.addListener("execute", this.cancel, this);
				// TODO: figure out naming/layout here
				
				
				// TODO: load/save/update gui
				
				// add elements
				this.add( contentScroller, {flex:1} );
				contentScroller.add( content );
				
				content.add( viewLabel );
				content.add( viewGrid );
				
				viewGrid.add( viewDisplayLabel, {row:0, column:1} );
				viewGrid.add( viewSortLabel, {row:0, column:2} );
				viewGrid.add( viewGroupLabel, {row:0, column:3} );
				
				viewGrid.add( viewTypeLabel, {row:1, column:0} );
				viewGrid.add( viewNameLabel, {row:2, column:0} );
				viewGrid.add( viewReferenceLabel, {row:3, column:0} );
				viewGrid.add( viewScoreLabel, {row:4, column:0} );
				viewGrid.add( viewCoordsLabel, {row:5, column:0} );
				viewGrid.add( viewContinentLabel, {row:6, column:0} );
				viewGrid.add( viewTSLabel, {row:7, column:0} );
				viewGrid.add( viewBaronsLabel, {row:8, column:0} );
				
				
				
				
				// DEBUG: testing check boxes and stuff TODO: remove/enhance
				// TODO: elements to members
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:1, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:2, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:3, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:4, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:5, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:6, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:7, column:1} );
				viewGrid.add( new  qx.ui.form.CheckBox(null), {row:8, column:1} );
				
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:1, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:2, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:3, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:4, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:5, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:6, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:7, column:2} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:8, column:2} );
				
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:1, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:2, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:3, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:4, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:5, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:6, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:7, column:3} );
				viewGrid.add( new  qx.ui.form.RadioButton(null), {row:8, column:3} );
				
				
				
				
				
				
				content.add( directionLabel );
				content.add( this.directionSelect );
				
				
				content.add( filterLabel );
				content.add( filterGrid );
				
				filterGrid.add( this.filterWaterAccessCheck, {row:0, column:0} );
				filterGrid.add( this.filterLandlockedCheck, {row:0, column:1} );
				
				filterGrid.add( this.filterCitiesCheck, {row:1, column:0} );
				filterGrid.add( this.filterCastlesCheck, {row:1, column:1} );
				filterGrid.add( this.filterPalacesCheck, {row:1, column:2} );
				
				filterGrid.add( this.filterNameCheck, {row:2, column:0} );
				filterGrid.add( this.filterNameMatchSelect, {row:2, column:1} );
				filterGrid.add( this.filterNameMatchText, {row:2, column:2} );
				
				filterGrid.add( this.filterReferenceCheck, {row:3, column:0} );
				filterGrid.add( this.filterReferenceMatchSelect, {row:3, column:1} );
				filterGrid.add( this.filterReferenceMatchText, {row:3, column:2} );
				
				filterGrid.add( this.filterScoreCheck, {row:4, column:0} );
				filterGrid.add( this.filterScoreMatchSelect, {row:4, column:1} );
				filterGrid.add( this.filterScoreMatchSpinner, {row:4, column:2} );
				
				filterGrid.add( this.filterContinentCheck, {row:5, column:0} );
				filterGrid.add( this.filterContinentSelect, {row:5, column:1} );
				
				filterGrid.add( this.filterTSCheck, {row:6, column:0} );
				filterGrid.add( this.filterTSMatchSelect, {row:6, column:1} );
				filterGrid.add( this.filterTSMatchSpinner, {row:6, column:2} );
				
				filterGrid.add( this.filterBaronsCheck, {row:7, column:0} );
				filterGrid.add( this.filterBaronsMatchSelect, {row:7, column:1} );
				filterGrid.add( this.filterBaronsMatchSpinner, {row:7, column:2} );
				
				
				content.add( actionLabel );
				
				content.add( actionMapViewRow );
				actionMapViewRow.add( this.actionMapViewCheck );
				actionMapViewRow.add( this.actionMapViewSelect );
				content.add( this.actionMoveCheck );
				content.add( this.actionSwitchCheck );
				content.add( this.actionShowInfoCheck );
				
				
				this.add( commitRow );
				commitRow.add( resetButton );
				commitRow.add( applyButton );
				commitRow.add( commitSpacer, {flex:1} );
				commitRow.add( okButton );
				commitRow.add( cancelButton );
			},
			createContinentList: function(){
				var cont, list = [];
				var i, n = 36;
				for (i=0; i<n; i++){
					list.push( "C" + String(Math.floor(i/6)) + String(i%6) );
				}
				return list;
			},
			saveState: function(){
				var state = {};
				// TODO: define state (see prefs)
				
				saveData(CITY_FILTER_STATE_ID, state);
			},
			loadState: function(){
				var state = loadSavedData(CITY_FILTER_STATE_ID);
				if (!state)
					return; // TODO: load default?
				
				// TODO: consume state
				//~ this.shrineListText.setValue(state.shrines);
				//~ this.allianceOnlyCheck.setValue(state.allianceOnlyCheckValue);			
			},
			updateOptionsFromState: function(){
				
			},
			sendStateToList: function(){
				
			},
			applyFilter: function(){
				try{
				
				this.sendStateToList();
					
				}catch(e){ debug(e); }
			},
			restoreFilter: function(){
				try{
				
				this.loadState();
				this.updateOptionsFromState();
				
				}catch(e){ debug(e); }
			},
			cancel: function(){
				try{
					
				this.restoreFilter();
				this.close();
					
				}catch(e){ debug(e); }
			},
			ok: function(){
				this.applyFilter();
				this.close();
			}
		}
	});
	// END CityListFilter
	
	qx.Class.define("senocular.tdk.HappyEaster", {
		type:"singleton",
		extend: qx.core.Object,
		construct: function(){
			this.base(arguments);
		},
		members:{
			konamiInput:"",
			konamiMatch:"3838404037393739666513",
			keyCaseMap:{
				"97":65,
				"98":66
			},
			konamiEgg:null,
			init: function(){
				qx.core.Init.getApplication().getRoot().addListener("keypress", this.keyDownHandler, this);
			},
			keyDownHandler: function(evt){
				this.checkKonami(evt.getKeyCode());
			},
			checkKonami:function(key){
				key = String(key);
				
				if (key.length != 2) 
					return;
				
				if (this.keyCaseMap.hasOwnProperty(key))
					key = String(this.keyCaseMap[key]);
				
				this.konamiInput += key;
				var diff = this.konamiInput.length - this.konamiMatch.length;
				if (diff > 0)
					this.konamiInput = this.konamiInput.substring(diff);
				
				if (this.konamiInput == this.konamiMatch){
					debug("Happy Easter!");
					
					// lets not overdo it, though the 3-horned experience is superior
					//senocular.tdk.Konamicorn.create(70);
					//defer(senocular.tdk.Konamicorn.create, senocular.tdk.Konamicorn, 750, [260]);
					//defer(senocular.tdk.Konamicorn.create, senocular.tdk.Konamicorn, 1500, [450]);
					
					senocular.tdk.Konamicorn.create(260);
				}
			}
		}
	});
	// END HappyEaster
	
	qx.Class.define("senocular.tdk.Konamicorn", {
		extend: qx.ui.basic.Image,
		statics:{
			create: function(y){
				var kc = new senocular.tdk.Konamicorn();
				kc.display(-kc.srcWidth, y);
				return kc;
			}
		},
		construct: function(){
			this.base(arguments, "http://senocular.com/chrome/extensions/lou/images/tdk/runningunicorn.gif");
		},
		members:{
			xSpeed:20,
			updateSpeed:50,
			srcWidth:241,
			srcHeight:169,
			display:function(x, y){
				qx.core.Init.getApplication().getRoot().add(this, {left:x, top:y});
				this.runUnicornRUN();
			},
			runUnicornRUN:function(){
				var parent = this.getLayoutParent();
				if (!parent)
					return;
				
				var bounds = parent.getBounds();
				var prop = this.getLayoutProperties();
				if (prop.left - this.srcWidth > bounds.width){
					parent.remove(this);
					this.setSource(null);
					this.dispose();
					return;
				}
				
				this.setLayoutProperties({left: prop.left + this.xSpeed});
				defer(this.runUnicornRUN, this, this.updateSpeed);
			}
		}
	});
	// END Konamicorn
	
	// =============== UTILS ===============
	
	// define
	qx.Class.define("senocular.tdk.CommandQueue", {
		extend: qx.core.Object,
		construct: function () {
			this.base(arguments);
			this.commands = [];
		},
		members:{
			commands:null,
			interval:COMMAND_QUEUE_INTERVAL,
			results:null,
			nextTimerID:-1,
			isRunning:false,
			lastRequestTime:0,
			
			onCompleteTarget:null,
			onComplete:null,
			onUpdateTarget:null,
			onUpdate:null,
			
			addCommand:function(target, data){
				this.commands.push([target, data]);
			},
			getCommandCount:function(){
				return this.commands.length;
			},
			send:function(onCompleteTarget, onComplete, onUpdateTarget, onUpdate){
				this.onCompleteTarget = onCompleteTarget;
				this.onComplete = onComplete;
				this.onUpdateTarget = onUpdateTarget;
				this.onUpdate = onUpdate;
				
				this.clearTimer();
				this.isRunning = true;
				this.results = [];
				
				this.nextCommand();
			},
			nextCommand:function(){
				if (this.commands.length){
					
					this.lastRequestTime = new Date().getTime();
					var commandManager = webfrontend.net.CommandManager.getInstance();
					var args = this.commands.shift().concat(this, this.onCommandResponse);
					commandManager.sendCommand.apply(commandManager, args);
					
				}else{
					this.complete();
				}
			},
			onCommandResponse: function(ok, response){
				try {
				this.results.push(response);
				
				if (this.onUpdate != null){
					if (this.onUpdateTarget){
						this.onUpdate.call(this.onUpdateTarget);
					}else{
						this.onUpdate();
					}
				}
				
				if (this.commands.length){
					var delay = this.interval - (new Date().getTime() - this.lastRequestTime);
					if (delay <= 0){
						this.nextCommand();
					}else{
						var timer = qx.util.TimerManager.getInstance();
						this.nextTimerID = timer.start(this.nextCommand, 0, this, null, delay);
					}
				}else{
					this.complete();
				}
				}catch(e){ debug(e); }
			},
			complete:function(){
				this.clearTimer();
				this.isRunning = false;
				var callbackTarget = this.onCompleteTarget;
				var callback = this.onComplete;
				this.onCompleteTarget = null;
				this.onComplete = null;
				this.onUpdateTarget = null;
				this.onUpdate = null;
				
				if (callback != null){
					if (callbackTarget){
						callback.call(callbackTarget);
					}else{
						callback();
					}
				}
			},
			clear:function(){
				this.commands.length = 0;
			},
			clearTimer:function(){
				if (this.nextTimerID != -1){
					var timer = qx.util.TimerManager.getInstance();
					timer.stop(this.nextTimerID);
					this.nextTimerID = -1;
				}
			},
			cancel:function(){
				this.clearTimer();
				this.isRunning = false;
				this.onCompleteTarget = null;
				this.onComplete = null;
				this.clear();
			}
		}
	});
	// END CommandQueue
	
	qx.Class.define("senocular.tdk.WidgetUtils", {
		extend: Object,
		statics: {
			createTitle: function(titleText, toolTipText){
				var title = new qx.ui.basic.Label(titleText);
				title.set({textColor:"subheadline-serif",font:"font_subheadline_serif_plain",marginTop:20,marginBottom:5});
				if (toolTipText)
					title.setToolTipText("<div style=\"width:200px;\">" + toolTipText + "</div>");
				return title;
			},
			createSelect: function(itemArray){
				var select = new qx.ui.form.SelectBox();
				var i, n = itemArray.length;
				for (i=0; i<n; i++){
					if (itemArray[i] instanceof Array){
						if (itemArray[i].length < 3)
							itemArray[i][2] = itemArray[i][0];
						select.add( new qx.ui.form.ListItem(itemArray[i][0], itemArray[i][1], itemArray[i][2]) );
					}else{
						select.add( new qx.ui.form.ListItem(itemArray[i], null, itemArray[i]) );
					}
				}
				
				return select;
			},
			findTabPageByName: function(tabView, name){
				var childPages = tabView.getSelectables();
				var i = childPages.length;
				while(i--){
					if (childPages[i] instanceof qx.ui.tabview.Page && childPages[i].getLabel() == name){
						return childPages[i];
					}
				}
				return null;
			},
			selectTabPageByName: function(tabView, name){
				var page = this.findTabPageByName(tabView, name);
				if (page)
					tabView.setSelection([page]);
			},
			findChildByType: function(owner, type){
				var foundChild = null;
				var children = owner.getChildren();
				var i = children.length;
				while(i--){
					if (children[i] instanceof type){
						foundChild = children[i];
						break;
					}
				}
				
				return foundChild;
			},
			setSelectByModel: function(select, model){
				var selectables = select.getSelectables();
				var i = selectables.length;
				while(i--){
					if (selectables[i].getModel() == model){
						select.setSelection([selectables[i]]);
						return;
					}
				}
			}
		}
	});
	// END WidgetUtils
	
	qx.Class.define("senocular.tdk.CityUtils", {
		extend: Object,
		statics: {
			positionToContinent:function(point){
				var x = Number(point[0]);
				var y = Number(point[1]);
				if (isNaN(x)) x = 0;
				if (isNaN(y)) y = 0;
				return String(Math.floor(y/100)) + String(Math.floor(x/100));
			},
			positionToID:function(point){
				var x = Number(point[0]);
				var y = Number(point[1]);
				if (isNaN(x)) x = 0;
				if (isNaN(y)) y = 0;
				return (y << 16) | x;
			},
			positionToString3x3:function(point){
				var x = Number(point[0]);
				var y = Number(point[1]);
				x = (isNaN(x)) ? "0" : String(x);
				y = (isNaN(y)) ? "0" : String(y);
				while (x.length < 3) x = "0" + x;
				while (y.length < 3) y = "0" + y;
				return x + ":" + y;
			},
			idToPosition:function(id, asString){
				var x = id & 0xFFFF;
				var y = (id >> 16) & 0xFFFF;
				if (asString){
					var xs = String(x);
					while(xs.length < 3) xs = "0" + xs;
					var ys = String(y);
					while(ys.length < 3) ys = "0" + ys;
					return [xs, ys];
				}
				return [x, y];
			},
			idToString3x3:function(id){
				return this.positionToString3x3( this.idToPosition(id) );
			},
			string3x3ToPosition:function(str){
				var pos = str.split(":");
				pos[0] = parseInt(pos[0], 10);
				if (isNaN(pos[0])) pos[0] = 0;
				pos[1] = parseInt(pos[1]), 10;
				if (isNaN(pos[1])) pos[1] = 0;
				return pos;
			},
			string3x3ToID:function(str){
				return this.positionToID( this.string3x3ToPosition(str) );
			}
		}
	});
	// END CityUtils

	
	// =============== EXTENSIONS ===============
	
	
	qx.Class.define("senocular.tdk.ui.layout.LineSizeIteratorV", {
		extend : Object,
		construct : function(children, spacing) {
			this.__children = children;
			this.__spacing = spacing;
			this.__hasMoreLines = children.length > 0;
			this.__childIndex = 0;
		},
		members : {
			__children : null,
			__spacing : null,
			__hasMoreLines : null,
			__childIndex : null,
			computeNextLine : function(availHeight) {
				var availHeight = availHeight || Infinity;
				if (!this.__hasMoreLines) throw new Error("No more lines to compute");
				var children = this.__children;
				var lineHeight = 0;
				var lineWidth = 0;
				var lineChildren = [];
				var gapsBefore = [];
				for (var i=this.__childIndex; i<children.length; i++){
					var child = children[i];
					var size = child.getSizeHint();
					var gapBefore = this.__computeGapBeforeChild(i);
					var childHeight = size.height + gapBefore;
					var isFirstChild = i == this.__childIndex;
					if (!isFirstChild && lineHeight + childHeight > availHeight){
						this.__childIndex = i;
						break;
					}
					var childWidth = size.width + child.getMarginLeft() + child.getMarginRight();
					lineChildren.push(child);
					gapsBefore.push(gapBefore);
					lineHeight += childHeight;
					lineWidth = Math.max(lineWidth, childWidth);
					if (child.getLayoutProperties().lineBreak) {
						this.__childIndex = i+1;
						break;
					}
				}
				if (i >= children.length) this.__hasMoreLines = false;
				return { height: lineHeight, width: lineWidth, children: lineChildren, gapsBefore : gapsBefore };
			},
			__computeGapBeforeChild : function(childIndex){
				var isFirstInLine = (childIndex == this.__childIndex);
				if (isFirstInLine) return this.__children[childIndex].getMarginTop();
				return Math.max( this.__children[childIndex-1].getMarginBottom(), this.__children[childIndex].getMarginTop(), this.__spacing );
			},
			hasMoreLines : function() { return this.__hasMoreLines; }
		}
	});
	// END LineSizeIteratorV
	
	qx.Class.define("senocular.tdk.ui.layout.FlowV", {
		extend : qx.ui.layout.Abstract,
		construct : function(spacingX, spacingY, alignY){
			this.base(arguments);
			if (spacingX) this.setSpacingX(spacingX);
			if (spacingY) this.setSpacingY(spacingY);
			if (alignY) this.setAlignX(alignY);
		},
		properties : {
			alignX : { check : [ "left", "center", "right" ], init : "left", apply : "_applyLayoutChange" },
			alignY : { check : [ "top", "middle", "bottom"], init : "top", apply : "_applyLayoutChange" },
			spacingX : { check : "Integer", init : 0, apply : "_applyLayoutChange" },
			spacingY : { check : "Integer", init : 0, apply : "_applyLayoutChange" },
			reversed : { check : "Boolean", init : false, apply : "_applyLayoutChange" }
		},
		members : {
			verifyLayoutProperty : qx.core.Environment.select("qx.debug", {
				"true" : function(item, name, value) {
					this.assertEquals("lineBreak", name, "The property '"+name+"' is not supported by the flow layout!" );
				},
				"false" : null
			}),
			connectToWidget : function(widget){
				this.base(arguments, widget);
				widget.setAllowShrinkX(false);
			},
			renderLayout : function(availWidth, availHeight){
				var children = this._getLayoutChildren();
				if (this.getReversed()) children = children.concat().reverse();
				var lineCalculator = new senocular.tdk.ui.layout.LineSizeIteratorV( children, this.getSpacingY() );
				var lineLeft = 0;
				while (lineCalculator.hasMoreLines()){
					var line = lineCalculator.computeNextLine(availHeight);
					this.__renderLine(line, lineLeft, availHeight);
					lineLeft += line.width + this.getSpacingX();
				}
			},
			__renderLine : function(line, lineLeft, availHeight){
				var util = qx.ui.layout.Util;
				var top = 0;
				if (this.getAlignY() != "top"){
					top = availHeight - line.height;
					if (this.getAlignY() == "middle") top = Math.round(top / 2);
				}
				for (var i=0; i<line.children.length; i++){
					var child = line.children[i];
					var size = child.getSizeHint();
					var marginLeft = child.getMarginLeft();
					var marginRight = child.getMarginRight();
					var left = util.computeHorizontalAlignOffset( child.getAlignX() || this.getAlignX(), marginLeft + size.width + marginRight, line.width, marginLeft, marginRight );
					child.renderLayout( lineLeft + left, top + line.gapsBefore[i], size.width, size.height );
					top += line.gapsBefore[i] + size.height;
				}
			},
			_computeSizeHint : function(){ return this.__computeSize(Infinity); },
			__computeSize : function(availHeight){
				var lineCalculator = new senocular.tdk.ui.layout.LineSizeIteratorV( this._getLayoutChildren(), this.getSpacingY() );
				var height = 0;
				var width = 0;
				var lineCount = 0;
				while (lineCalculator.hasMoreLines()){
					var line = lineCalculator.computeNextLine(availHeight);
					lineCount += 1;
					height = Math.max(height, line.height);
					width += line.width;
				}
				return { width : width + this.getSpacingX() * (lineCount-1), height : height };
			}
		}
	});
	// END FlowV


	// instantiate
	create();
}
// END init

// generic utils
function invertValue(value){ 
	return !value;
}
function new_Array(length, fill){ 
	var arr = new Array(length);
	while(length--)
		arr[length] = fill;
	return arr;
}

function saveData(name, value){
	try {
		
		window.localStorage[STORAGE_PREFIX + name] = qx.util.Json.stringify(value);
		
	}catch(e){ 
		debug(e); 
		return false;
	}
	return true;
}

function loadSavedData(name){
	try {
		var savedData = window.localStorage[STORAGE_PREFIX + name];
		if (savedData)
			return qx.util.Json.parse( savedData );
		
	}catch(e){ debug(e); }
	
	return null;
}

function defer(method, target, time, argsArray){
	return window.setTimeout(function(){
		try {
			method.apply(target, argsArray);
		}catch(ignore){}
	}, time);
}


function pollForInitComplete() {
	try {
		init();
	}catch(err){
		// errors here are expected when starting
		// the app as dependencies are found (or not)
		debug("init: " + err);
		
		window.setTimeout(pollForInitComplete, INIT_ATTEMPT_INTERVAL);
	}
}

pollForInitComplete();
} // END pageScript
com_senocular_LoUDefiant_pageScript();
