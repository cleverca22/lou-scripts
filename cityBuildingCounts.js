// @version 1
// city building counts stuff, extracted from TDK

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
			if (this.enabled == enabled) return;
			
			var parent;
			if (enabled){
				var app = qx.core.Init.getApplication();
				
				this.cityEvents = webfrontend.data.City.getInstance();
				this.cityEvents.addListener("changeVersion", this.onCityChange, this);
				
				this.visMainEvents = app.visMain;
				this.visMainEvents.addListener("changeMapLoaded", this.onMapChange, this);
				
				var buildingQueue = app.cityInfoView.buildingQueue;
				parent = buildingQueue.getLayoutParent();
				if (parent) parent.addBefore(this, buildingQueue);
				
				this.refreshCounts();
			}else{
				parent = this.getLayoutParent();
				if (parent) parent.remove(this);
				
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
						if (cityItem.getType) {
							type = cityItem.getType();
							itemInfo = info.buildings[type];
							if (list[type] == undefined) {
								list[type] = {
									name: itemInfo.dn,
									count: 1,
									level: cityItem.level || 0,
									img: info.imageFiles[itemInfo.mimg]
								}
							} else {
								list[type].count++;
								list[type].level += cityItem.level;
							}
						}
					} catch(ignore){ }
					found = true;
				}
			}
			return found ? list : null;
		}
	}
});
qx.Class.define("senocular.tdk.CityBuildingCountsItem", {
	extend: qx.ui.container.Composite,
	construct: function(img, text, toolTipText){
		var layout = new qx.ui.layout.VBox(2).set({alignX:"center"});
		this.base(arguments, layout);
		if (img) this.img = img;
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

senocular.tdk.CityBuildingCounts.getInstance().setEnable(true);

