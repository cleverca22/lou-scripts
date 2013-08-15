// ==UserScript==
// @name           Nessus River Guardian Tools
// @namespace      Nessus
// @description    Adds various functionalities to Lord of Ultima
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1
// ==/UserScript==
(function () {

    var MAL_mainFunction = function () {
            window.debugLog = function (data) {

            }

            function initNessusRiverGuardian() {
                var MAL = {};
                qx.Class.define("nessusRiverGuardian.main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    construct: function () {
                        this.app = qx.core.Init.getApplication();
                        this.player = webfrontend.data.Player.getInstance();
                        this.playerName = this.player.getName();
                        this.chat = this.app.chat;
                        this.contextMenu = new nessusRiverGuardian.contextMenu(this);
                        this.createWorldViewEnhancments();

                        _MAL = MAL;

                        window.console.debug("this.options", this.options);
                        this.loadOptions();
                        window.console.debug("this.options", this.options);
                        MAL.options = this.options;
                        MAL.a = this.app;
                        MAL.main = this;

                        // ***** Options button ***** //
                        btn = new qx.ui.form.Button("MAL");
                        btn.set({
                            width: 35,
                            appearance: "button-text-small",
                            toolTipText: "Nessus River Guardian Options"
                        });
                        btn.addListener("click", this.showOptionsPage, this);
                        this.app.serverBar.add(btn, {
                            top: 2,
                            left: 425
                        });

                        //btn = new qx.ui.form.Button("AutoRaid");
                        //btn.addListener("click", this.AutoRaid, this);
                        //if (this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
                        //    this.app.desktop.add(btn, {left: 690, top: 65});
                        //} else {
                        //    this.app.desktop.add(btn, {left: 405, top: 65});
                        //}

                        this.optionsPage = new window.MAL.optionsPage();
                    },
                    members: {
                        //Coord Types
                        CITY: 1,
                        LAWLESS: 2,
                        BOSS: 4,
                        DUNGEON: 8,
                        SHRINE: 16,
                        MOONGATE: 32,
                        SETTLE: 64,
                        EMPTY: 128,
                        ATTACKABLE: 256,
                        ANY: 512,
                        app: null,
                        player: null,
                        playerName: null,
                        chat: null,
                        contextMenu: null,
                        sortMenu: null,
                        worldViewCoord: null,
                        worldViewMinBtn: null,
                        optionsPage: null,

                        AutoRaid: function ()
                        {
                            window.console.debug("autoRaid called");
                            var dungeons = new Array();
                            var dist = 5;//MAL.options.AutoRaidDist;

							var dungeonType = "any";
							var guardianRatio = 0;
							var primary = 0;
							var primaryType = 0;
                            for (var i = 0; i < 13; i++) 
                            {
                                if (webfrontend.data.City.getInstance().units[i] != null) 
                                {
                                    if (MAL.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
                                    {
										if (i == 3 || i == 5) dungeonType = "Mountain Dungeon";
										if (i == 10) dungeonType = "Forest Dungeon";
										if (i == 4) guardianRatio = webfrontend.data.City.getInstance().units[i].count;
										else if (webfrontend.data.City.getInstance().units[i].count > primary) 
										{
											primary = webfrontend.data.City.getInstance().units[i].count;
											primaryType = i;
										}
									}
								}
							}
							if (guardianRatio != 0 && primary != 0) guardianRatio = guardianRatio / (primary + guardianRatio);
							
							window.console.debug("primary " + primaryType, "guard ratio " + guardianRatio, "Dungeons " + dungeons.length);

                            while (dungeons.length < 2 && dist < 10)
                            {
                                 dungeons = this.findClosestDungeon(7, dist, dungeonType);
                                dist++;
                            }
                            var orderCount = 0;
                            if (webfrontend.data.City.getInstance().getUnitOrders() != null)
                            {
                                orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                            }
                            var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                            var sentRaid = true;
                            var primaryLeft = webfrontend.data.City.getInstance().units[primaryType].count;
                            var guardianLeft = 0;
							if (webfrontend.data.City.getInstance().units[4] != null) guardianLeft = webfrontend.data.City.getInstance().units[4].count;
                            while (sentRaid)
                            {
                                sentRaid = false;
                                if (orderLimit > 0)
                                {
                                    for (var index = 0; index < dungeons.length && orderLimit > 0; index++)
                                    {
                                        var dungeonCoord = dungeons[index].coord;
                                        var level = dungeons[index].level;

                                        if (dungeonCoord != null)
                                        {
                                            var loot = MAL.options.DungeonLoot[level];

                                            var primaryUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[primaryType]);
											var guardianUnitsPerRep = 0;
											if (guardianRatio > 0)
											{
												var gCarry = MAL.options.RaidUnitCarry[4] * guardianLeft;
												var pCarry = MAL.options.RaidUnitCarry[primaryType] * primaryLeft;
												var totalCarry = gCarry + pCarry;
												guardianUnitsPerRep = Math.floor(loot / totalCarry * gCarry / MAL.options.RaidUnitCarry[4]);
												primaryUnitsPerRep = Math.floor(loot / totalCarry * pCarry / MAL.options.RaidUnitCarry[primaryType]);
												window.console.debug("gCarry", gCarry, "pCarry", pCarry, "total", totalCarry);
											}

                                            if (primaryLeft >= primaryUnitsPerRep && guardianLeft >= guardianUnitsPerRep)
                                            {
                                                window.console.debug("sending Dungeon: ", dungeonCoord, "level:", level, "dist:", dungeons[index].dist, primaryUnitsPerRep, guardianUnitsPerRep, primaryLeft, guardianLeft);

                                                var unitsToSend = new Array();
                                                var unitString = "" + primaryType;
                                                unitsToSend.push({t: unitString, c: primaryUnitsPerRep});
												if (guardianUnitsPerRep > 0)
												{
													unitsToSend.push({t: "4", c: guardianUnitsPerRep});
												}
                                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
                                                {
                                                        cityid: webfrontend.data.City.getInstance().getId(),
                                                        units: unitsToSend,
                                                        targetPlayer: "",
                                                        targetCity: dungeonCoord,
                                                        order: 8,
                                                        transport: 1,
                                                        iUnitOrderOptions: 0,
                                                        timeReferenceType: 1,
                                                        referenceTimeUTCMillis: 0,
                                                        raidTimeReferenceType: 1,
                                                        raidReferenceTimeUTCMillis: 0,
                                                        createCity: ""
                                                },this,this.onTroopsSent);
                                                sentRaid = true;
                                                orderLimit = orderLimit - 1;
                                                primaryLeft = primaryLeft - primaryUnitsPerRep;
                                                guardianLeft = guardianLeft - guardianUnitsPerRep;
                                            }
                                        }
                                    }
                                }
                            }
                        //this.scheduleSwitchCity();
                        },
                        scheduleSwitchCity: function()
                        {
                            var tempInterval = 1000 + Math.floor(Math.random()*2000);
                            window.console.debug("Switchin to next city at : " + new Date(new Date().getTime() + tempInterval));
                            qx.event.Timer.once(this.switchCity,this,tempInterval);
                        },
                        switchCity: function()
                        {
                            this.app.cityBar.nextButton.execute();
                        },
                        findClosestDungeon: function(minLevel, maxDist, dungeonType)
                        {
                            var dungeons = new Array();
                            var visMain = this.app.worldViewToolTip.getVisMain();
                            var coords = this.convertIdToCoordinatesObject(webfrontend.data.City.getInstance().getId());
                            window.console.debug("findClosestDungeon called", coords.xPos + ":" + coords.yPos, minLevel, maxDist);
                            for (var xCoord = coords.xPos - maxDist; xCoord <= coords.xPos + maxDist; xCoord++) 
                            {
                                for (var yCoord = coords.yPos - maxDist; yCoord <= coords.yPos + maxDist; yCoord++) 
                                {
                                    var xPos = visMain.ScreenPosFromWorldPosX(xCoord * 128 + 64);
                                    var yPos = visMain.ScreenPosFromWorldPosY(yCoord * 80 + 40);
                                    var tooltipText = visMain.GetTooltipText(xPos, yPos);
                                    var level = 0;
									var type = "";
									var progress = 0;
                                    if (tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/))
                                    {
									    type = tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/)[1];
                                        if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
                                        {
                                            level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                        }
										if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
											progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
										}
                                    }
                                    if (level >= minLevel)
                                    {
                                        var diffX = Math.abs(coords.xPos - xCoord);
                                        var diffY = Math.abs(coords.yPos - yCoord);
                                        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
                                        window.console.debug("found Dungeon: ", xCoord + ":" + yCoord, "level:", level, "dist:", dist, "Type:", type);
                                        
                                        if (dungeonType == type || dungeonType == "any")
										{
											dungeons.push({
												coord: xCoord + ":" + yCoord,
												level: level,
												dist: dist
											});
										}
                                    }
                                }
                            }
                            dungeons.sort(this.dungeonSort);
                            return dungeons;
                        },
                        dungeonSort: function(a,b)
                        {
                            if (a.level == b.level)
                            {
                                return a.dist - b.dist;
                            }
                            else
                            {
                                return b.level - a.level;
                            }
                        },
                        convertIdToCoordinatesObject: function(id) {
                            var o = {
                                xPos: (id & 0xFFFF),
                                yPos: (id >> 16),                                                        
                            }
                            o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
                            return o;
                        },
                        showOptionsPage: function () {
                            this.app.switchOverlay(this.optionsPage);
                        },
                        loadOptions: function () {
                            _str = localStorage.getItem("MAL_options");
                            var options;
                            if (_str) {
                                options = qx.lang.Json.parse(_str);
                            }
                            this.options = {
                                "AttackPower": [0, 0, 0, 0, 0, 0, 50, 70, 0, 0, 0, 90, 120, 0, 0, 0, 1200, 12000],
                                "RaidUnitCarry": [0, 0, 0, 10, 20, 10, 10, 5, 0, 15, 20, 15, 10, 0, 0, 1000, 1500, 3000],
                                "DungeonLoot": [0, 160, 750, 2750, 10000, 27500, 68000, 150000, 250000, 400000, 600000],
                                "DungeonLootMax": [0, 375, 2250, 6250, 25000, 80000, 170000, 375000, 625000, 1000000, 1500000],
                                "TargetsX": [0, 0, 0, 0, 0, 0, 0],
                                "TargetsY": [0, 0, 0, 0, 0, 0, 0],
                                "ArriveHour": 0,
                                "ArriveMin": 0,
                                "ArriveSec": 0,
                                "ArriveDay": 0,
								"UseFrigs": false,
                                "AutoRaidLevel": 8,
                                "AutoRaidDist": 3,
								"FakesAsSiege": false
                            };

                            try
                            {
                                this.options.AttackPower = options.AttackPower;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.RaidUnitCarry = options.RaidUnitCarry;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.DungeonLoot = options.DungeonLoot;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.DungeonLootMax = options.DungeonLootMax;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.AutoRaidLevel = options.AutoRaidLevel;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.AutoRaidDist = options.AutoRaidDist;
                            }
                            catch (e)
                            {
                            }

                            this.app.setUserData("MAL_options", this.options);

                            str = qx.lang.Json.stringify(this.options);
                            localStorage.setItem("MAL_options", str);
                        },
                        parseWorldViewCoord: function (xCoord, yCoord) {
                            worldViewCoord = new Object();
                            var worldViewToolTip = this.app.worldViewToolTip;
                            var id = 0;
                            var playerName = null;
                            var allianceName = "";
                            var type = null;
                            var xPos = worldViewToolTip.getVisMain().ScreenPosFromWorldPosX(xCoord * 128);
                            var yPos = worldViewToolTip.getVisMain().ScreenPosFromWorldPosY(yCoord * 80);

                            var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
                            var level = 0;
                            var progress = 0;
							var dungType = 0;
							
                            if (tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                    allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                }
                                type = "City";
                            } else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
                                type = "LawlessCity";
                            } else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
                                type = "Dungeon";
                                if (tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/))
                                {
                                    dungType = tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/)[1];
								}
								if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
                                    progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
                                }
                            } else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
                                type = "Boss";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
                                    playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                window.console.debug("Boss found:", type, level, playerName);
                            } else {
                                type = "FreeSlot";
                            }

                            worldViewCoord.id = (yCoord << 0x10) | xCoord;
                            worldViewCoord.xPos = xCoord;
                            worldViewCoord.yPos = yCoord;
                            worldViewCoord.playerName = playerName;
                            worldViewCoord.allianceName = allianceName;
                            worldViewCoord.type = type;
                            worldViewCoord.dungType = dungType;
							worldViewCoord.level = level;
                            worldViewCoord.progress = progress;
                            return worldViewCoord;
                        },
                        updateWorldViewCoord: function () {
                            if (this.worldViewCoord == null) {
                                this.worldViewCoord = new Object();
                            }
                            var worldViewToolTip = this.app.worldViewToolTip;
                            var id = 0;
                            var playerName = null;
                            var allianceName = "";
                            var type = null;
                            var xPos = worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left;
                            var yPos = worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top;
                            var xCoord = worldViewToolTip.getVisMain().GetXCoordFromViewPosition(xPos);
                            var yCoord = worldViewToolTip.getVisMain().GetYCoordFromViewPosition(yPos);
                            window.console.debug(xPos + ":" + yPos, xCoord + ":" + yCoord);

                            var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
                            var level = 0;
                            var progress = 0;
                            var dungType = 0;
							if (tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                    allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                }
                                type = "City";
                            } else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
                                type = "LawlessCity";
                            } else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
                                type = "Dungeon";
                                if (tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/))
								{
									dungType = tooltipText.match(/<td width="75">Type:<\/td><td>(.+?)<\/td>/)[1];
								}
								if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
                                    progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
                                }
                            } else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
                                type = "Boss";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
                                    playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                window.console.debug("Boss found:", type, level, playerName);
                            } else {
                                type = "FreeSlot";
                            }

                            this.worldViewCoord.id = (yCoord << 0x10) | xCoord;
                            this.worldViewCoord.xPos = xCoord;
                            this.worldViewCoord.yPos = yCoord;
                            this.worldViewCoord.playerName = playerName;
                            this.worldViewCoord.allianceName = allianceName;
                            this.worldViewCoord.type = type;
                            this.worldViewCoord.dungType = dungType;
							this.worldViewCoord.level = level;
                            this.worldViewCoord.progress = progress;
                            return this.worldViewCoord;
                        },
                        getBossLevel: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Boss") {
                                return coord.level;
                            }
                            return 0;
                        },
                        getBossName: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Boss") {
                                return coord.playerName;
                            }
                            return 0;
                        },
                        getDungeonLevel: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Dungeon") {
                                return coord.level;
                            }
                            return 0;
                        },
                        getDungeonType: function () 
						{
							var coord = this.worldViewCoord;
							if (coord.type == "Dungeon") 
							{
								return coord.dungType;
							}
							return 0;
						},
						checkCoordType: function (types) {
                            var coord = this.worldViewCoord;
                            if (types & this.CITY && coord.type == "City") {
                                return true;
                            } else if (types & this.LAWLESS && coord.type == "LawlessCity") {
                                return true;
                            } else if (types & this.BOSS && coord.type == "Boss") {
                                return true;
                            } else if (types & this.DUNGEON && coord.type == "Dungeon") {
                                return true;
                            } else if (types & this.SHRINE && coord.type == "Shrine") {
                                return true;
                            } else if (types & this.MOONGATE && coord.type == "Moongate") {
                                return true;
                            } else if (types & this.SETTLE && coord.type == "Settle") {
                                return true;
                            } else if (types & this.EMPTY && coord.type == "FreeSlot") {
                                return true;
                            } else if (types & this.ATTACKABLE && (coord.type == "City" || coord.type == "Boss" || coord.type == "Dungeon" || coord.type == "LawlessCity")) {
                                return true;
                            } else if (types & this.ANY) {
                                return true;
                            }
                            return false;
                        },
                        selectCity: function (options) {
                            var cityID = 0;
                            if (!isNaN(parseFloat(options)) && isFinite(options)) {
                                cityID = options;
                            } else if (options.cityId) {
                                cityID = options.cityId;
                            } else if (options.cityX && options.cityY) {
                                for (var i in this.player.cities) {
                                    if (options.cityX == this.player.cities[i].xPos && options.cityY == this.player.cities[i].yPos) {
                                        cityID = i;
                                        break;
                                    }
                                }
                            } else if (options.cityName) {
                                for (var i in this.player.cities) {
                                    if (options.cityName == this.player.cities[i].name) {
                                        cityID = i;
                                        break;
                                    }
                                }
                            }

                            if (cityID) {
                                for (var i in this.player.cities) {
                                    if (cityID == i) {
                                        if (!options.cityIsMine) {
                                            webfrontend.data.City.getInstance().setRequestId(i);
                                        }
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        sendToChat: function (msg, overWrite) {
                            var str = "";
                            if (!overWrite && this.chat && this.chat.chatLine.getValue()) {
                                str = this.chat.chatLine.getValue();
                                str = str.substr(0, this.chat.chatLine.getTextSelectionStart()) + msg + str.substr(this.chat.chatLine.getTextSelectionEnd());
                                msg = "";
                            }
                            this.chat.chatLine.setValue(str + msg);
                        },
                        sendToMail: function (msg, overWrite) {
                            var str = "";
                            if (!overWrite && this.app.sendMail && this.app.sendMail.message.getValue()) {
                                str = this.app.sendMail.message.getValue();
                                str = str.substr(0, this.app.sendMail.message.getTextSelectionStart()) + msg + str.substr(this.app.sendMail.message.getTextSelectionEnd());
                                msg = "";
                            }
                            this.app.sendMail.message.setValue(str + msg);
                        },
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
                        createWorldViewEnhancments: function () {
                            this.worldViewMinBtn = new webfrontend.ui.SoundButton("").set({
                                icon: "webfrontend/ui/icons/icon_chat_resize_smaller.png",
                                padding: 4,
                                minWidth: 10,
                                width: 29
                            });
                            this.worldViewMinBtn.setLayoutProperties({
                                top: 3,
                                right: 9
                            });
                            this.worldViewMinBtn.addListener("execute", function (e) {
                                if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
                                    this.app.worldMapConfig.setLayoutProperties({
                                        top: null,
                                        height: 4
                                    });
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                                } else {
                                    this.app.worldMapConfig.setLayoutProperties({
                                        top: 187,
                                        height: null
                                    });
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                                }
                            }, this);
                            this.worldViewMinBtn.addListener("appear", function (e) {
                                if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                                } else {
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                                }
                            }, this);
                            if (this.app.worldMapConfig == null) {
                                this.app.worldMapConfig = new webfrontend.gui.WorldMapConfig().set({
                                    width: 400
                                });
                                this.app.worldMapConfig.setLayoutProperties({
                                    top: 187,
                                    left: 0,
                                    bottom: 0
                                });
                            }
                            this.app.worldMapConfig.setMinHeight(0);
                            this.app.worldMapConfig.add(this.worldViewMinBtn);
                            debugLog("HTK World View Enhancments Initialized.");
                        }
                    }
                });

                qx.Class.define("MAL.optionsPage", {
                    extend: webfrontend.gui.OverlayWidget,
                    construct: function () {
                        window.console.log("MAL.optionsPage construct");
                        webfrontend.gui.OverlayWidget.call(this);

                        this.app = qx.core.Init.getApplication();
						this.clientArea.setLayout(new qx.ui.layout.Canvas());
                        this.setTitle("Malice Toolkit Options Options");
                        this.tabView = new qx.ui.tabview.TabView().set({
                            contentPaddingLeft: 15,
                            contentPaddingRight: 10,
                            contentPaddingTop: 10,
                            contentPaddingBottom: 10
                        });
                        this.tabPages = [{
                            name: "General",
                            page: null,
                            vbox: null
                        }, {
                            name: "Attack",
                            page: null,
                            vbox: null
                        }, ];
                        for (i = 0; i < this.tabPages.length; i++) {
                            page = new qx.ui.tabview.Page(this.tabPages[i].name);
                            page.setLayout(new qx.ui.layout.Canvas());
                            vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
                            scroll = new qx.ui.container.Scroll(vbox);
                            page.add(scroll, {
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            });
                            this.tabPages[i].vbox = vbox;
                            this.tabPages[i].page = page;
                        }

                        // ----- Page 1
                        {
                            // ----- Boss attack power
                            lab = new qx.ui.basic.Label("Unit Stats");
                            this.tabPages[0].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(12, 3);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);
                            bTypesLabels = ["Beserker", "Mage", "Knight", "Warlock", "Ranger", "Templar", "Xbow", "Paladin", "Guardian", "Frig", "Sloop", "War Galleon"];
                            bTypesIndex = [6, 7, 11, 12, 3, 5, 9, 10, 4, 15, 16, 17];

                            lab = new qx.ui.basic.Label("Unit");
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            lab = new qx.ui.basic.Label("Attack Power");
                            cont.add(lab, {
                                row: 0,
                                column: 1
                            });
                            lab = new qx.ui.basic.Label("Loot Carry");
                            cont.add(lab, {
                                row: 0,
                                column: 2
                            });

                            for (i = 1; i <= 12; i++) {
                                lab = new qx.ui.basic.Label(bTypesLabels[i - 1]);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });
                                sp = new webfrontend.ui.SpinnerInt(0, MAL.options.AttackPower[bTypesIndex[i - 1]], 24000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    MAL.options.AttackPower[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: bTypesIndex[i - 1]
                                });
                                MAL.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 1
                                });
                                sp = new webfrontend.ui.SpinnerInt(0, MAL.options.RaidUnitCarry[bTypesIndex[i - 1]], 3000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    MAL.options.RaidUnitCarry[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: bTypesIndex[i - 1]
                                });
                                MAL.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 2
                                });
                            }
                            this.tabPages[0].vbox.add(cont);
                            this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

                            // ----- Dungeon Raid Limit
                            lab = new qx.ui.basic.Label("Dungeon Raids");
                            this.tabPages[0].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(10, 3);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnMinWidth(1, 90);
                            gr.setColumnMinWidth(2, 90);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);

                            lab = new qx.ui.basic.Label("Dungeon Level");
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            lab = new qx.ui.basic.Label("Min Loot");
                            cont.add(lab, {
                                row: 0,
                                column: 1
                            });
                            lab = new qx.ui.basic.Label("Max Loot");
                            cont.add(lab, {
                                row: 0,
                                column: 2
                            });

                            for (i = 1; i <= 10; i++) {
                                lab = new qx.ui.basic.Label("Level " + i);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });

                                sp = new webfrontend.ui.SpinnerInt(0, MAL.options.DungeonLoot[i], 3000000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    MAL.options.DungeonLoot[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: i
                                });
                                MAL.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 1
                                });

                                sp = new webfrontend.ui.SpinnerInt(0, MAL.options.DungeonLootMax[i], 3000000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    MAL.options.DungeonLootMax[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: i
                                });
                                MAL.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 2
                                });
                            }
                            this.tabPages[0].vbox.add(cont);
                            this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

                        }
                        // ----- Page 2
                        {
                            lab = new qx.ui.basic.Label("*** BETA ***");
                            this.tabPages[1].vbox.add(lab);
                            lab = new qx.ui.basic.Label("Don't blame me if Llamas kill your armies!");
                            this.tabPages[1].vbox.add(lab);

                            lab = new qx.ui.basic.Label("Targets");
                            this.tabPages[1].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(7, 3);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);
                            targetLabels = ["Real", "Fake 1", "Fake 2", "Fake 3", "Fake 4", "Fake 5", "Fake 6"];

                            for (i = 0; i < 7; i++) {
                                lab = new qx.ui.basic.Label(targetLabels[i]);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });
                                this.TargetsX[i] = new qx.ui.form.TextField(MAL.options.TargetsX[i].toString());
                                this.TargetsX[i].setLiveUpdate(true);
                                cont.add(this.TargetsX[i], {
                                    row: i,
                                    column: 1
                                });
                                this.TargetsY[i] = new qx.ui.form.TextField(MAL.options.TargetsY[i].toString());
                                this.TargetsY[i].setLiveUpdate(true);
                                cont.add(this.TargetsY[i], {
                                    row: i,
                                    column: 2
                                });
                            }

                            this.tabPages[1].vbox.add(cont);
                            this.tabPages[1].vbox.add(new qx.ui.core.Spacer(0, 10));


                            lab = new qx.ui.basic.Label("Arrival time:");
                            this.tabPages[1].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(4, 4);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);

                            lab = new qx.ui.basic.Label("H:M:S");
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            this.ArriveHour = new qx.ui.form.TextField(MAL.options.ArriveHour.toString());
                            this.ArriveHour.setLiveUpdate(true);
                            cont.add(this.ArriveHour, {
                                row: 0,
                                column: 1
                            });
                            this.ArriveMin = new qx.ui.form.TextField(MAL.options.ArriveMin.toString());
                            this.ArriveMin.setLiveUpdate(true);
                            cont.add(this.ArriveMin, {
                                row: 0,
                                column: 2
                            });
                            this.ArriveSec = new qx.ui.form.TextField(MAL.options.ArriveSec.toString());
                            this.ArriveSec.setLiveUpdate(true);
                            cont.add(this.ArriveSec, {
                                row: 0,
                                column: 3
                            });

                            lab = new qx.ui.basic.Label("Day");
                            cont.add(lab, {
                                row: 1,
                                column: 0
                            });
                            this.ArriveDay = new qx.ui.form.TextField(MAL.options.ArriveDay.toString());
                            cont.add(this.ArriveDay, {
                                row: 1,
                                column: 1
                            });
                            this.ArriveDay.setLiveUpdate(true);

							cb = new qx.ui.form.CheckBox("Use Frigs");
							if (MAL.options.UseFrigs)
								cb.setValue(true);
							cb.addListener("click", function() { MAL.options.UseFrigs = this.getValue() ? true : false; }, cb);
                            cont.add(cb, {
                                row: 2,
                                column: 0
                            });

							cb = new qx.ui.form.CheckBox("Fakes as siege");
							if (MAL.options.FakesAsSiege)
								cb.setValue(true);
							cb.addListener("click", function() { MAL.options.FakesAsSiege = this.getValue() ? true : false; }, cb);
                            cont.add(cb, {
                                row: 3,
                                column: 0
                            });
				
				            this.tabPages[1].vbox.add(cont);
                            this.tabPages[1].vbox.add(new qx.ui.core.Spacer(0, 10));

                            btn = new qx.ui.form.Button("Assault").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.sendAssault, this);
                            this.tabPages[1].vbox.add(btn);

                            btn = new qx.ui.form.Button("Siege").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.sendSiege, this);
                            this.tabPages[1].vbox.add(btn);

                            btn = new qx.ui.form.Button("Once");
							btn.set({
								width: 40,
								appearance: "button-text-small",
								toolTipText: "Set Raids to Once"
							});
							btn.addListener("click", this.raidOnce, this);
							this.app.serverBar.add(btn, {
								top: 2,
								left: 465
							});
							btn = new qx.ui.form.Button("Complete");
							btn.set({
								width: 60,
								appearance: "button-text-small",
								toolTipText: "Set Raids to Complete"
							});
							btn.addListener("click", this.raidComplete, this);
							this.app.serverBar.add(btn, {
								top: 2,
                                left: 510
							});
                            btn = new qx.ui.form.Button("Cancel Plunders");
							btn.set({
								width: 100,
								appearance: "button-text-small",
								toolTipText: "Cancel all Plunders"
							});
							btn.addListener("click", this.cancelPlunders, this);
							this.app.serverBar.add(btn, {
								top: 2,
                                left: 575
							});
							btn = new qx.ui.form.Button("Unit Queue");
							btn.set({
								width: 70,
								appearance: "button-text-small",
								toolTipText: "Test"
							});
							btn.addListener("click", this.queueUnits, this);
							this.app.serverBar.add(btn, {
								top: 2,
                                left: 680
							});
							//btn = new qx.ui.form.Button("Set all raids to: Until time").set({
                            //    width: 90,
                            //    marginLeft: 30
                            //});
                            //btn.addListener("click", this.raidUtilTime, this);
                            //this.tabPages[1].vbox.add(btn);
                        }
						
                        {

                            // ----- Save Button
                            cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                            btn = new qx.ui.form.Button("Save").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.saveOptions, this);
                            cont.add(btn);

                            // ----- Add pages to tabview
                            for (i = 0; i < this.tabPages.length; i++) {
                                this.tabView.add(this.tabPages[i].page);
                            }

                            this.clientArea.add(this.tabView, {
                                top: 0,
                                right: 3,
                                bottom: 30,
                                left: 3
                            });
                            this.clientArea.add(cont, {
                                right: 3,
                                bottom: 3,
                                left: 3
                            });
                        }
                    },
                    members: {
                        tabView: null,
                        tabPages: null,
                        clrSel: null,
                        expImpWin: null,
                        TargetsX: [null, null, null, null, null, null, null],
                        TargetsY: [null, null, null, null, null, null, null],
                        ArriveHour: null,
                        ArriveMin: null,
                        ArriveSec: null,
                        ArriveDay: null,
                        UseFrigs: null,
                        saveOptions: function () {
                            str = qx.lang.Json.stringify(MAL.options);
                            localStorage.setItem("MAL_options", str);
                        },
                        GetArrivalTime: function (day, hour, min, sec) {
                            var hM = webfrontend.Util.getCurrentTime();
                            var hA = 0;
                            var ie = webfrontend.data.ServerTime.getInstance();
                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                hM.setHours(hM.getHours() + hM.getTimezoneOffset() / 60);
                                hA += hM.getTimezoneOffset() / 60;
                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) hA += ie.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) hA += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            }

                            var ic = new Date(hM.getTime());
                            ic.setDate(ic.getDate() + day);
                            ic.setHours(hour - hA);
                            ic.setMinutes(min);
                            ic.setSeconds(sec);
                            ic.setMilliseconds(500);
                            if (webfrontend.config.Config.getInstance().getTimeZone() == 0) ic = new Date(ic.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
                            return ic.getTime();
                        },
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
						raidOnce: function() {
							this.stopRaids(webfrontend.base.GameObjects.eRecurringType.Once);
						},
						raidComplete: function() {
							this.stopRaids(webfrontend.base.GameObjects.eRecurringType.UntilDepletion);
						},
						raidUntilTime: function() {
							this.stopRaids(webfrontend.base.GameObjects.eRecurringType.UntilReturnTime);
						},
						cancelPlunders: function() {
							this.stopPlunders(webfrontend.base.GameObjects.eRecurringType.Canceled);
						},
                        stopRaids: function (recurringType) {
                            var orders = webfrontend.data.City.getInstance().unitOrders;
                            var hour = parseInt(this.ArriveHour.getValue(),10);
							var day = parseInt(this.ArriveDay.getValue(),10);
							var min = parseInt(this.ArriveMin.getValue(),10);
							var sec = parseInt(this.ArriveSec.getValue(),10);
							var time = this.GetArrivalTime(day, hour, min, sec);

                            for (var i in orders) {
                                if (orders[i].type == 8) 
								{
                                    webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
                                        cityid: webfrontend.data.City.getInstance().getId(),
                                        id: orders[i].id,
                                        isDelayed: orders[i].isDelayed,
                                        recurringType: recurringType,
                                        recurringEndStep: time
                                    }, this, this.onTroopsSent);
                                }
                            }
                        },
                        stopPlunders: function(recurringType) {
                            var orders = webfrontend.data.City.getInstance().unitOrders;
                            
                            for (var i in orders) {
                                if (orders[i].type == 2) 
								{
                                    webfrontend.net.CommandManager.getInstance().sendCommand("CancelUnitOrder", {
                                        cityid: webfrontend.data.City.getInstance().getId(),
                                        id: orders[i].id,
                                        isDelayed: true,
									},this, this.onTroopsSent);
                                }
                            }
                        },
						queueUnits: function() { // Queues Catapults unless rangers or xbows are detected, then queues those instead.  This will help conserve wood for upgrades.
                            var item = new Array();
							var a = webfrontend.data.City.getInstance().getId(); // city ID 
							var b = 14; // unit to train (rangers or xbows usually)
							var e = 160; // TS to recruit
							var f = webfrontend.data.City.getInstance().$$user_unitLimit - webfrontend.data.City.getInstance().$$user_unitCount - webfrontend.data.City.getInstance().$$user_unitsInQueue; // Available recruitment
							if (e * 10 > f)
							{
								e = Math.floor(f / 10);
							}	
							var d = "false"; // is Paid?
							if (webfrontend.data.City.getInstance().units[3] != null)
							{
								b = "" + 3;
								e = 315;
								if (e > f)
								{
									e = f;
								}	
							}	
							if (webfrontend.data.City.getInstance().units[9] != null)
							{
								b = "" + 9;
								e = 355;
								if (e * 2 > f)
								{
									e = Math.floor(f / 2);
								}	
							}	
							item.push({t: b, c: e});
							webfrontend.net.CommandManager.getInstance().sendCommand("StartUnitProduction", {
                                cityid: a,
                                units: (e = 0 ? 0 : item),
								isPaid: d
                            })
                        },
						sendAssault: function () {
							if (MAL.options.FakesAsSiege)
							{
	                            this.sendAttack(webfrontend.base.GameObjects.eUnitOrderType.Attack, webfrontend.base.GameObjects.eUnitOrderType.Siege);
							}
							else
							{
		                        this.sendAttack(webfrontend.base.GameObjects.eUnitOrderType.Attack, webfrontend.base.GameObjects.eUnitOrderType.Plunder);
							}
                        },
                        sendSiege: function () {
                            this.sendAttack(webfrontend.base.GameObjects.eUnitOrderType.Siege, webfrontend.base.GameObjects.eUnitOrderType.Siege);
                        },
                        sendAttack: function (realAttack, fakeAttack) {
                            // unit types
                            // 0 - cg
                            // 1 - baron?
                            // 2 - ballista
                            // 3 - ranger
                            // 4 - guardian
                            // 5 - templar
                            // 6 - zerk
                            // 7 - mage
                            // 8 - scout
                            // 9 - xbow
                            // 10 - paladin
                            // 11 - knight
                            // 12 - warlock
                            // 13 - ram
                            // 14 - cat
                            // 15 - frigate
                            // 16 - sloop
                            // 17 - WG
                            var TS = [1, 1, 300, 3000, 3000, 3000, 3000, 3000, 1500, 1500, 1500, 1500, 1500, 300, 300, 6, 6, 8];
                            var TSboat = [1, 1, 250, 2500, 2500, 2500, 2500, 2500, 1250, 1250, 1250, 1250, 1250, 250, 250, 6, 6, 8];
                            var unitsToSendReal = new Array();
                            var unitsToSendFake = new Array();
                            var fakeIndex = 0;
                            var fakeCount = 0;
                            var transport = 1;
                            var numFrigates = 0;
							window.console.debug("MAL: Attempting to send attack, UseFrigs=", MAL.options.UseFrigs);

                            for (var i = 0; i < 18; i++) {
                                if (webfrontend.data.City.getInstance().units[i] != null) {
                                    var total = webfrontend.data.City.getInstance().units[i].total;
                                    if (total > 0) {
                                        if (total > fakeCount) {
                                            fakeCount = total;
                                            fakeIndex = i;
                                        }
                                        if (i == 15 || i == 16 || i == 17) {
											if (MAL.options.UseFrigs)
											{
												transport = 2;
											}
                                        }
                                        if (i == 15) {
                                            numFrigates = total;
                                        }
                                    }
                                }
                            }

                            var numFakes = 0;
                            for (var i = 1; i < 6; i++) {
                                if (parseInt(this.TargetsX[i].getValue(),10) != 0 && parseInt(this.TargetsY[i].getValue(),10) != 0) {
                                    numFakes = numFakes + 1;
                                }
                            }
                            if (numFrigates > 0 && MAL.options.UseFrigs) {
                                unitsToSendFake.push({
                                    t: fakeIndex,
                                    c: TSboat[fakeIndex]
                                });
                                unitsToSendFake.push({
                                    t: 15,
                                    c: 5
                                });
                            } else {
                                unitsToSendFake.push({
                                    t: fakeIndex,
                                    c: TS[fakeIndex]
                                });
                            }
                            for (var i = 0; i < 18; i++) {
                                if (webfrontend.data.City.getInstance().units[i] != null) {
                                    var total = webfrontend.data.City.getInstance().units[i].total;
                                    if (total > 0) {
                                        if (i == fakeIndex) {
                                            if (numFrigates > 0 && MAL.options.UseFrigs) {
                                                total = total - TSboat[i] * numFakes;
                                                if (total > 500 * (numFrigates - numFakes * 5)) {
                                                    total = 500 * (numFrigates - numFakes * 5);
                                                }
                                                unitsToSendReal.push({
                                                    t: 15,
                                                    c: numFrigates - numFakes * 5
                                                });

                                            } else {
                                                total = total - TS[i] * numFakes;
                                            }
                                        }
                                        if (i != 15) {
                                            unitsToSendReal.push({
                                                t: i,
                                                c: total
                                            });
                                        }
                                    }
                                }
                            }
                            var time = this.GetArrivalTime(parseInt(this.ArriveDay.getValue(),10), parseInt(this.ArriveHour.getValue(),10), parseInt(this.ArriveMin.getValue(),10), parseInt(this.ArriveSec.getValue(),10));
                            for (var i = 0; i < 6; i++) {
                                if (parseInt(this.TargetsX[i].getValue(),10) != 0 && parseInt(this.TargetsY[i].getValue(),10) != 0) {
                                    var troops = unitsToSendFake;
                                    var order = fakeAttack;
                                    if (i == 0) {
                                        troops = unitsToSendReal;
                                        order = realAttack;
										window.console.debug("    ", "real target:", parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
                                    }
									else
									{
										window.console.debug("    ", "fake target:", parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
									}
									window.console.debug("    ", "troops:", troops);
                                    coord = MAL.main.parseWorldViewCoord(parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
                                    webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
                                        cityid: webfrontend.data.City.getInstance().getId(),
                                        units: troops,
                                        targetPlayer: coord.playerName,
                                        targetCity: coord.xPos + ":" + coord.yPos,
                                        order: order,
                                        transport: transport,
                                        iUnitOrderOptions: 0,
                                        timeReferenceType: 3,
                                        referenceTimeUTCMillis: time,
                                        raidTimeReferenceType: 0,
                                        raidReferenceTimeUTCMillis: 0,
                                        createCity: ""
                                    }, this, this.onTroopsSent);
                                }
                            }
                        }
                    }
                });

                qx.Class.define("nessusRiverGuardian.contextMenu", {
                    type: "singleton",
                    extend: qx.core.Object,
                    construct: function (main) {
                        this.main = main;
                        this.worldContext = new qx.ui.menu.Menu();
                        this.worldContext.setIconColumnWidth(0);
                        this.copyMenu = new qx.ui.menu.Menu();
                        this.copyMenu.setIconColumnWidth(0);
                        this.infoMenu = new qx.ui.menu.Menu();
                        this.infoMenu.setIconColumnWidth(0);
                        this.selectCityBtn = new qx.ui.menu.Button("Switch to City");
                        this.viewReportsBtn = new qx.ui.menu.Button("View Reports");
                        this.killBossBtn = new qx.ui.menu.Button("Kill Boss");
                        this.raidPiratesBtn = new qx.ui.menu.Button("Raid Pirates");
						this.raidDungeonBtn = new qx.ui.menu.Button("Raid Dungeon");
                        this.raidDungeonResetBtn = new qx.ui.menu.Button("Reset Raids");
						this.settleBtn = new qx.ui.menu.Button("Settle");
						this.raidDungeonReserveBtn = new qx.ui.menu.Button("Raid Dungeon saving 1 Command Slot");
						this.raidZerksBtn = new qx.ui.menu.Button("ZERK ONLY Raid");
                        this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
                        this.plunderBtn = new qx.ui.menu.Button("Plunder Once");
                        this.plunderRepeatBtn = new qx.ui.menu.Button("Plunder Repeated");
						this.scoutBtn = new qx.ui.menu.Button("Scout");
                        this.copyBtn = new qx.ui.menu.Button("Copy to Chat");
                        this.copyBtnSub = new qx.ui.menu.Button("Copy to Chat", null, null, this.copyMenu);
                        this.copyCoordBtn = new qx.ui.menu.Button("Coordinates");
                        this.copyPlayerBtn = new qx.ui.menu.Button("Player");
                        this.copyAllianceBtn = new qx.ui.menu.Button("Alliance");
                        this.copyToMail = new qx.ui.menu.Button("Copy to Mail", null, null, this.copyMenu);
                        this.sendResBtn = new qx.ui.menu.Button("Send Resources");
                        this.infoBtn = new qx.ui.menu.Button("Info", null, null, this.infoMenu);
                        this.infoPlayerBtn = new qx.ui.menu.Button("Player");
                        this.infoAllianceBtn = new qx.ui.menu.Button("Alliance");
                        this.whisperBtn = new qx.ui.menu.Button("Whisper");
                        this.worldContext.add(this.selectCityBtn);
                        this.worldContext.add(this.killBossBtn);
                        this.worldContext.add(this.raidDungeonReserveBtn);
						this.worldContext.add(this.raidDungeonBtn);
                        this.worldContext.add(this.raidDungeonResetBtn);
						this.worldContext.add(this.settleBtn);
						this.worldContext.add(this.raidPiratesBtn);
						this.worldContext.add(this.raidZerksBtn);
                        this.worldContext.add(this.sendArmyBtn);
                        this.worldContext.add(this.plunderBtn);
                        this.worldContext.add(this.plunderRepeatBtn);
						this.worldContext.add(this.scoutBtn);
                        this.worldContext.add(this.sendResBtn);
                        this.worldContext.add(this.viewReportsBtn);
                        this.worldContext.add(this.infoBtn);
                        this.worldContext.add(this.whisperBtn);
                        this.worldContext.add(this.copyBtn);
                        this.worldContext.add(this.copyBtnSub);
                        this.worldContext.add(this.copyToMail);
                        this.copyMenu.add(this.copyCoordBtn);
                        this.copyMenu.add(this.copyPlayerBtn);
                        this.copyMenu.add(this.copyAllianceBtn);
                        this.infoMenu.add(this.infoPlayerBtn);
                        this.infoMenu.add(this.infoAllianceBtn);
                        this.main.app.worldView.setContextMenu(this.worldContext);
                        this.main.app.worldView.addListener("beforeContextmenuOpen", function () {
                            this.updateWorldViewContext();
                        }, this);
                        this.selectCityBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName) {
                                this.main.selectCity({
                                    "cityX": coord.xPos,
                                    "cityY": coord.yPos
                                });
                            }
                        }, this);
                        this.viewReportsBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                this.main.app.showInfoPage(this.main.app.getCityInfoPage(), {
                                    "id": coord.id
                                });
                            }
                        }, this);
                        this.killBossBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                // unit types
                                // 0 - cg
                                // 1 - baron?
                                // 2 - ballista
                                // 3 - ranger
                                // 4 - guardian
                                // 5 - templar
                                // 6 - zerk
                                // 7 - mage
                                // 8 - scout
                                // 9 - xbow
                                // 10 - paladin
                                // 11 - knight
                                // 12 - warlock
                                // 13 - ram
                                // 14 - cat
                                // 15 - frigate
                                // 16 - sloop
                                // 17 - WG
                                var bossStrLike = [420, 2500, 17000, 33000, 83000, 125000, 187500, 250000, 375000];
                                var bossStrUnlike = [625, 3750, 25000, 50000, 125000, 187500, 250000, 375000, 562500];
                                var unitBossMatch = ["", "", "", "Hydra", "", "Hydra", "Hydra", "Moloch", "", "Dragon", "Dragon", "Dragon", "Moloch", "", "", "Octopus", "Octopus", "Octopus"];
                                var bossLevel = this.main.getBossLevel();
                                var trans = 1;
                                if (bossLevel > 0) {
                                    var countNeeded = 0;
                                    var unitType = 0;
                                    for (var i = 0; i < 18; i++) {
                                        if (MAL.options.AttackPower[i] > 0 && webfrontend.data.City.getInstance().units[i] != null) {
                                            if (this.main.getBossName() == unitBossMatch[i]) {
                                                countNeeded = bossStrLike[bossLevel - 1] * 4 / MAL.options.AttackPower[i];
                                            } else {
                                                countNeeded = bossStrUnlike[bossLevel - 1] * 4 / MAL.options.AttackPower[i];
                                            }
                                            window.console.debug("Attackable: ", i, countNeeded, webfrontend.data.City.getInstance().units[i].count);
                                            if (countNeeded > 0 && countNeeded <= webfrontend.data.City.getInstance().units[i].count) {
                                                unitType = i;
                                                if (i > 14) {
                                                    trans = 2;
                                                } else {
                                                    trans = 1;
                                                }
                                                break;
                                            } else {
                                                countNeeded = 0;
                                            }
                                        }
                                    }
                                    if (countNeeded > 0) {
                                        var unitsToSend = new Array();

                                        unitsToSend.push({
                                            t: unitType,
                                            c: Math.floor(countNeeded)
                                        });
                                        webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
                                            cityid: webfrontend.data.City.getInstance().getId(),
                                            units: unitsToSend,
                                            targetPlayer: "",
                                            targetCity: coord.xPos + ":" + coord.yPos,
                                            order: 8,
                                            transport: trans,
                                            timeReferenceType: 1,
                                            referenceTimeUTCMillis: 0,
                                            raidTimeReferenceType: 0,
                                            raidReferenceTimeUTCMillis: 0
                                        }, this, this.onTroopsSent);
                                    }
                                }
                            }
                        }, this);
                        this.raidZerksBtn.addListener("execute", function (e)
						{
							var coord = this.main.worldViewCoord;
							if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) 
							{
								var level = this.main.getDungeonLevel();
								var lootMin = MAL.options.DungeonLoot[level];
								var lootMax = MAL.options.DungeonLootMax[level];
								var loot = (lootMin + (lootMin * ((coord.progress / 10) * .15)));
								if (Math.floor(loot) > lootMax)
								{
									loot = lootMax;
								}
								var unitType = -1;
								var orderCount = 0;
								if (webfrontend.data.City.getInstance().getUnitOrders() != null)
								{
									orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
								}
								var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
								var zerkCount = webfrontend.data.City.getInstance().units[6].count;
								if (zerkCount > 0) 
								{
									if (MAL.options.RaidUnitCarry[6] > 0) 
									{
										var numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[6]);
										var maxReps2 = 0;
										var maxReps = (zerkCount / numUnitsPerRep );
										if (Math.ceil(maxReps) - maxReps < .26)
										{
											maxReps2 = Math.ceil(maxReps);
											if (maxReps2 > orderLimit)
											{
												maxReps2 = orderLimit;
											}	
											numUnitsPerRep = Math.floor(zerkCount / maxReps2);
										}	
										if (Math.ceil(maxReps) - maxReps > .25)
										{
											maxReps2 = Math.floor(maxReps);
											if (maxReps2 > orderLimit)
											{
												maxReps2 = orderLimit;
											}	
											if (maxReps2 < 1)
											{
												maxReps2 = 1;
											}	
											numUnitsPerRep = Math.floor(zerkCount / maxReps2);
										}
										for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
										{
											var unitsToSend = new Array();
											var unitString = "" + 6;
											var trans = 1;
											
											unitsToSend.push({t: unitString, c: numUnitsPerRep});
											webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
											{
													cityid: webfrontend.data.City.getInstance().getId(),
													units: unitsToSend,
													targetPlayer: "",
													targetCity: coord.xPos + ":" + coord.yPos,
													order: 8,
													transport: trans,
													iUnitOrderOptions: 0,
													timeReferenceType: 1,
													referenceTimeUTCMillis: 0,
													raidTimeReferenceType: 1,
													raidReferenceTimeUTCMillis: 0,
													createCity: ""
											}, this, this.onTroopsSent);
											orderLimit = orderLimit - 1;
										}
									}
								}
							}
						}, this);
						this.raidDungeonBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0) {
                                var level = this.main.getDungeonLevel();
                                var lootMin = MAL.options.DungeonLoot[level];
                                var lootMax = MAL.options.DungeonLootMax[level];
                                var loot = (lootMin + (lootMin * ((coord.progress / 10) * .15)));
                                if (Math.floor(loot) > lootMax)
								{
									loot = lootMax;
								}
								var unitType = -1;
                                var orderCount = 0;
                                if (webfrontend.data.City.getInstance().getUnitOrders() != null) {
                                    orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                                }
                                var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                                for (var i = 0; i < 15 && orderLimit > 0; i++) {
                                    if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (MAL.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) {
                                            var maxReps = 0;
											var maxReps2 = 0;
											var numUnitsPerRep = 0;
											var totalCount = 0;
											var lootCap = 0;
											var rangCount = 0;
											var guardCount = 0;
											var zerkCount = 0;
											var percRang = 0;
											var percGuard = 0;
											var percZerk = 0;
											var numUnitsPerRepR = 0;
											var numUnitsPerRepG = 0;
											var numUnitsPerRepZ = 0;
                                            
											if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[4] != null )
											{ //Ranger/Guardian
												rangCount = webfrontend.data.City.getInstance().units[3].count;
												guardCount = webfrontend.data.City.getInstance().units[4].count;
												totalCount = rangCount + guardCount;
												percRang = ( rangCount / totalCount );
												percGuard = ( guardCount / totalCount );
												lootCap = ( rangCount * MAL.options.RaidUnitCarry[3] + guardCount * MAL.options.RaidUnitCarry[4] );
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringR = "" + 3;
													var unitStringG = "" + 4;
													var trans = 1;
													
													unitsToSend.push({t: unitStringR, c: numUnitsPerRepR},{t: unitStringG, c: numUnitsPerRepG});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: 1,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
											if ( webfrontend.data.City.getInstance().units[4] != null && webfrontend.data.City.getInstance().units[6] != null )
											{ //Zerk/Guardian
												zerkCount = webfrontend.data.City.getInstance().units[6].count;
												guardCount = webfrontend.data.City.getInstance().units[4].count;
												totalCount = zerkCount + guardCount;
												percZerk = ( zerkCount / totalCount );
												percGuard = ( guardCount / totalCount );
												lootCap = ( zerkCount * MAL.options.RaidUnitCarry[6] + guardCount * MAL.options.RaidUnitCarry[4] );
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringZ = "" + 6;
													var unitStringG = "" + 4;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringG, c: numUnitsPerRepG});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
											if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[6] != null )
											{ //Zerk/Ranger
												zerkCount = webfrontend.data.City.getInstance().units[6].count;
												rangCount = webfrontend.data.City.getInstance().units[3].count;
												totalCount = zerkCount + rangCount;
												percZerk = ( zerkCount / totalCount );
												percRang = ( rangCount / totalCount );
												lootCap = ((zerkCount * MAL.options.RaidUnitCarry[6]) + (rangCount * MAL.options.RaidUnitCarry[3]));
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .25)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
												}	
												if (Math.ceil(maxReps) - maxReps >= .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringZ = "" + 6;
													var unitStringR = "" + 3;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringR, c: numUnitsPerRepR});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
												}
											}
											if ( webfrontend.data.City.getInstance().units[i].count > 10 )
											{
												numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[i]);
												maxReps = ( webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRep = Math.floor( webfrontend.data.City.getInstance().units[i].count / maxReps2 );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRep = Math.floor( webfrontend.data.City.getInstance().units[i].count / maxReps2 );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitString = "" + i;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitString, c: numUnitsPerRep});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
										}
									}
								}
							}
						}, this);
                        this.raidDungeonResetBtn.addListener("execute", function (e) {
                           	var orders = webfrontend.data.City.getInstance().unitOrders;
                            for (var i in orders) {
                                if (orders[i].type == 8) 
								{
                                    webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
                                        cityid: webfrontend.data.City.getInstance().getId(),
                                        id: orders[i].id,
                                        isDelayed: orders[i].isDelayed,
                                        recurringType: 0,
                                        recurringEndStep: 0
                                    }, this, this.onTroopsSent);
                                }
                            }
							var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0) {
                                var level = this.main.getDungeonLevel();
                                var lootMin = MAL.options.DungeonLoot[level];
                                var lootMax = MAL.options.DungeonLootMax[level];
                                var loot = (lootMin + (lootMin * ((coord.progress / 10) * .15)));
                                if (Math.floor(loot) > lootMax)
								{
									loot = lootMax;
								}
								var unitType = -1;
                                var orderCount = 0;
                                if (webfrontend.data.City.getInstance().getUnitOrders() != null) {
                                    orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                                }
                                var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                                var army = 0; // which army out of town is the raider (attack type 8)
								var latestReturn = 0; // raiding army with latest return time
								var returnTime = 0; // current raid return time
								
								for (var z = 0; z < orderCount; z++)
								{
									if (webfrontend.data.City.getInstance().unitOrders[z].type == 8) 
									{
										army = z; // Found the raid
										returnTime = webfrontend.data.City.getInstance().unitOrders[z].end // if on the way back home already
										if (webfrontend.data.City.getInstance().unitOrders[z].state == 1) // if on the way to the dungeon still
										{
											returnTime = (webfrontend.data.City.getInstance().unitOrders[z].end - webfrontend.data.City.getInstance().unitOrders[z].start) + webfrontend.data.City.getInstance().unitOrders[z].end;
											army = z; // raid return time
										}	
									}
									if (returnTime > latestReturn)
									{
										latestReturn = returnTime;
										army = z; // raid with the latest return time
									}
								}	
								var serverStartUTC = webfrontend.data.ServerTime.getInstance().refTime; // in UTC millis
								var d = (serverStartUTC + (latestReturn * 1000) + 7000); // departure time 7 sec after latest raid return
								var sentYet = 0;
								for (var i = 0; i < 18; i++) {
                                    if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (MAL.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].total > 0) {
                                            var maxReps = 0;
											var maxReps2 = 0;
											var numUnitsPerRep = 0;
											var totalCount = 0;
											var lootCap = 0;
											var rangCount = 0;
											var guardCount = 0;
											var zerkCount = 0;
											var percRang = 0;
											var percGuard = 0;
											var percZerk = 0;
											var numUnitsPerRepR = 0;
											var numUnitsPerRepG = 0;
											var numUnitsPerRepZ = 0;
                                            if (i == 3 || i == 4)
											{
												if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[4] != null && sentYet == 0)
												{ //Ranger/Guardian
													
													sentYet = 1;
													rangCount = webfrontend.data.City.getInstance().units[3].total;
													guardCount = webfrontend.data.City.getInstance().units[4].total;
													totalCount = rangCount + guardCount;
													percRang = ( rangCount / totalCount );
													percGuard = ( guardCount / totalCount );
													lootCap = ( rangCount * MAL.options.RaidUnitCarry[3] + guardCount * MAL.options.RaidUnitCarry[4] );
													maxReps = ( lootCap / loot );
													if (Math.ceil(maxReps) - maxReps < .26)
													{
														maxReps2 = Math.ceil(maxReps);
														if (maxReps2 > orderLimit)
														{
															alert("Not enough command slots.  Cancel and reset manually");
															break;
														}	
														numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
														numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
													}	
													if (Math.ceil(maxReps) - maxReps > .25)
													{
														maxReps2 = Math.floor(maxReps);
														if (maxReps2 < 1)
														{
															maxReps2 = 1;
														}	
														if (maxReps2 > orderLimit)
														{
															maxReps2 = orderLimit;
														}	
														numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
														numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
														if ((numUnitsPerRepZ * MAL.options.RaidUnitCarry[6] + numUnitsPerRepR * MAL.options.RaidUnitCarry[3]) > lootMax)
														{
															maxReps2 = maxReps2 + 1;
															numUnitsPerRepG = Math.floor( webfrontend.data.City.getInstance().units[4].total / maxReps2 );
															numUnitsPerRepR = Math.floor( webfrontend.data.City.getInstance().units[3].total / maxReps2 );
														}
													}
													for (var x = 0; x < maxReps2; x++)
													{
														var unitsToSend = new Array();
														var unitStringR = "" + 3;
														var unitStringG = "" + 4;
														var trans = 1;
														
														unitsToSend.push({t: unitStringR, c: numUnitsPerRepR},{t: unitStringG, c: numUnitsPerRepG});
														webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
														{
															cityid: webfrontend.data.City.getInstance().getId(),
															units: unitsToSend,
															targetPlayer: "",
															targetCity: coord.xPos + ":" + coord.yPos,
															order: 8,
															transport: 1,
															iUnitOrderOptions: 0,
															timeReferenceType: 2,
															referenceTimeUTCMillis: d,
															raidTimeReferenceType: 1,
															raidReferenceTimeUTCMillis: 0,
															createCity: ""
														}, this, this.onTroopsSent);
													}
												}
											}
											if (i == 4 || i == 6)
											{
												if ( webfrontend.data.City.getInstance().units[4] != null && webfrontend.data.City.getInstance().units[6] != null && sentYet == 0)
												{ //Zerk/Guardian
													sentYet = 1;
													zerkCount = webfrontend.data.City.getInstance().units[6].total;
													guardCount = webfrontend.data.City.getInstance().units[4].total;
													totalCount = zerkCount + guardCount;
													percZerk = ( zerkCount / totalCount );
													percGuard = ( guardCount / totalCount );
													lootCap = ( zerkCount * MAL.options.RaidUnitCarry[6] + guardCount * MAL.options.RaidUnitCarry[4] );
													maxReps = ( lootCap / loot );
													if (Math.ceil(maxReps) - maxReps < .26)
													{
														maxReps2 = Math.ceil(maxReps);
														if (maxReps2 > orderLimit)
														{
															alert("Not enough command slots.  Cancel and reset manually");
															break;
														}	
														numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
														numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
													}	
													if (Math.ceil(maxReps) - maxReps > .25)
													{
														maxReps2 = Math.floor(maxReps);
														if (maxReps2 < 1)
														{
															maxReps2 = 1;
														}	
														if (maxReps2 > orderLimit)
														{
															maxReps2 = orderLimit;
														}	
														numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
														numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
														if ((numUnitsPerRepZ * MAL.options.RaidUnitCarry[6] + numUnitsPerRepG * MAL.options.RaidUnitCarry[4]) > lootMax)
														{
															maxReps2 = maxReps2 + 1;
															numUnitsPerRepZ = Math.floor( webfrontend.data.City.getInstance().units[6].total / maxReps2 );
															numUnitsPerRepG = Math.floor( webfrontend.data.City.getInstance().units[4].total / maxReps2 );
														}
													}
													for (var x = 0; x < maxReps2; x++)
													{
														var unitsToSend = new Array();
														var unitStringZ = "" + 6;
														var unitStringG = "" + 4;
														var trans = 1;
														if (i > 14) 
														{
															trans = 2;
														}
														unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringG, c: numUnitsPerRepG});
														webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
														{
															cityid: webfrontend.data.City.getInstance().getId(),
															units: unitsToSend,
															targetPlayer: "",
															targetCity: coord.xPos + ":" + coord.yPos,
															order: 8,
															transport: trans,
															iUnitOrderOptions: 0,
															timeReferenceType: 2,
															referenceTimeUTCMillis: d,
															raidTimeReferenceType: 1,
															raidReferenceTimeUTCMillis: 0,
															createCity: ""
														}, this, this.onTroopsSent);
													}
												}
											}
											if (i == 3 || i == 6)
											{
												if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[6] != null && sentYet == 0)
												{ //Zerk/Ranger
													sentYet = 1;
													zerkCount = webfrontend.data.City.getInstance().units[6].total;
													rangCount = webfrontend.data.City.getInstance().units[3].total;
													totalCount = zerkCount + rangCount;
													percZerk = ( zerkCount / totalCount );
													percRang = ( rangCount / totalCount );
													lootCap = ((zerkCount * MAL.options.RaidUnitCarry[6]) + (rangCount * MAL.options.RaidUnitCarry[3]));
													maxReps = ( lootCap / loot );
													if (Math.ceil(maxReps) - maxReps < .25)
													{
														maxReps2 = Math.ceil(maxReps);
														if (maxReps2 > orderLimit)
														{
															alert("Not enough command slots.  Cancel and reset manually");
															break;
														}	
														numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
														numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
													}	
													if (Math.ceil(maxReps) - maxReps >= .25)
													{
														maxReps2 = Math.floor(maxReps);
														if (maxReps2 > orderLimit)
														{
															maxReps2 = orderLimit;
														}	
														if (maxReps2 < 1)
														{
															maxReps2 = 1;
														}	
														numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
														numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
														if ((numUnitsPerRepZ * MAL.options.RaidUnitCarry[6] + numUnitsPerRepR * MAL.options.RaidUnitCarry[3]) > lootMax)
														{
															maxReps2 = maxReps2 + 1;
															numUnitsPerRepZ = Math.floor( webfrontend.data.City.getInstance().units[6].total / maxReps2 );
															numUnitsPerRepR = Math.floor( webfrontend.data.City.getInstance().units[3].total / maxReps2 );
														}
													}
													for (var x = 0; x < maxReps2; x++)
													{
														var unitsToSend = new Array();
														var unitStringZ = "" + 6;
														var unitStringR = "" + 3;
														var trans = 1;
														if (i > 14) 
														{
															trans = 2;
														}
														unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringR, c: numUnitsPerRepR});
														webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
														{
															cityid: webfrontend.data.City.getInstance().getId(),
															units: unitsToSend,
															targetPlayer: "",
															targetCity: coord.xPos + ":" + coord.yPos,
															order: 8,
															transport: trans,
															iUnitOrderOptions: 1,
															timeReferenceType: 2,
															referenceTimeUTCMillis: d,
															raidTimeReferenceType: 1,
															raidReferenceTimeUTCMillis: 0,
															createCity: ""
														}, this, this.onTroopsSent);
													}
												}
											}
											if ( webfrontend.data.City.getInstance().units[i].total > 14 && sentYet == 0)
											{
												sentYet = 1;
												numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[i]);
												maxReps = ( webfrontend.data.City.getInstance().units[i].total / numUnitsPerRep );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														alert("Not enough command slots.  Cancel and reset manually");
														break;
													}	
													numUnitsPerRep = Math.floor( webfrontend.data.City.getInstance().units[i].total / maxReps2 );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRep = Math.floor( webfrontend.data.City.getInstance().units[i].total / maxReps2 );
													if (numUnitsPerRep * MAL.options.RaidUnitCarry[i] > lootMax)
													{
														maxReps2 = maxReps2 + 1;
														numUnitsPerRep = Math.floor( webfrontend.data.City.getInstance().units[i].total / maxReps2 );
													}	
												}
												for (var x = 0; x < maxReps2; x++)
												{
													var unitsToSend = new Array();
													var unitString = "" + i;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitString, c: numUnitsPerRep});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 2,
														referenceTimeUTCMillis: d,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
												}
											}
										}
									}
								}
							}
						}, this);
						this.raidDungeonReserveBtn.addListener("execute", function (e)
						{
							var coord = this.main.worldViewCoord;
							if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) 
							{
								var level = this.main.getDungeonLevel();
								var lootMin = MAL.options.DungeonLoot[level];
								var lootMax = MAL.options.DungeonLootMax[level];
								var loot = (lootMin + (lootMin * ((coord.progress / 10) * .15)));
								if (Math.floor(loot) > lootMax)
								{
									loot = lootMax;
								}
								var unitType = -1;
								var orderCount = 0;
								if (webfrontend.data.City.getInstance().getUnitOrders() != null)
								{
									orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
								}
								var orderLimit = (webfrontend.data.City.getInstance().getOrderLimit() - orderCount) -1;
								
								for (var i = 0; i < 15; i++) 
								{
									if (webfrontend.data.City.getInstance().units[i] != null) 
									{
										if (MAL.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
										{
											var maxReps = 0;
											var maxReps2 = 0;
											var numUnitsPerRep = 0;
											var totalCount = 0;
											var lootCap = 0;
											var rangCount = 0;
											var guardCount = 0;
											var zerkCount = 0;
											var percRang = 0;
											var percGuard = 0;
											var percZerk = 0;
											var numUnitsPerRepR = 0;
											var numUnitsPerRepG = 0;
											var numUnitsPerRepZ = 0;
											
											if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[4] != null )
											{
												rangCount = webfrontend.data.City.getInstance().units[3].count;
												guardCount = webfrontend.data.City.getInstance().units[4].count;
												totalCount = rangCount + guardCount;
												percRang = ( rangCount / totalCount );
												percGuard = ( guardCount / totalCount );
												lootCap = ( rangCount * MAL.options.RaidUnitCarry[3] + guardCount * MAL.options.RaidUnitCarry[4] );
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringR = "" + 3;
													var unitStringG = "" + 4;
													var trans = 1;
													
													unitsToSend.push({t: unitStringR, c: numUnitsPerRepR},{t: unitStringG, c: numUnitsPerRepG});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: 1,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
											if ( webfrontend.data.City.getInstance().units[4] != null && webfrontend.data.City.getInstance().units[6] != null )
											{
												zerkCount = webfrontend.data.City.getInstance().units[6].count;
												guardCount = webfrontend.data.City.getInstance().units[4].count;
												totalCount = zerkCount + guardCount;
												percZerk = ( zerkCount / totalCount );
												percGuard = ( guardCount / totalCount );
												lootCap = ( zerkCount * MAL.options.RaidUnitCarry[6] + guardCount * MAL.options.RaidUnitCarry[4] );
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepG = Math.floor(( totalCount / maxReps2 ) * percGuard );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringZ = "" + 6;
													var unitStringG = "" + 4;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringG, c: numUnitsPerRepG});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
											if ( webfrontend.data.City.getInstance().units[3] != null && webfrontend.data.City.getInstance().units[6] != null )
											{
												zerkCount = webfrontend.data.City.getInstance().units[6].count;
												rangCount = webfrontend.data.City.getInstance().units[3].count;
												totalCount = zerkCount + rangCount;
												percZerk = ( zerkCount / totalCount );
												percRang = ( rangCount / totalCount );
												lootCap = ( zerkCount * MAL.options.RaidUnitCarry[6] + rangCount * MAL.options.RaidUnitCarry[3] );
												maxReps = ( lootCap / loot );
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													numUnitsPerRepZ = Math.floor(( totalCount / maxReps2 ) * percZerk );
													numUnitsPerRepR = Math.floor(( totalCount / maxReps2 ) * percRang );
												}
												for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
												{
													var unitsToSend = new Array();
													var unitStringZ = "" + 6;
													var unitStringR = "" + 3;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitStringZ, c: numUnitsPerRepZ},{t: unitStringR, c: numUnitsPerRepR});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
												}
											}
											if ( webfrontend.data.City.getInstance().units[i].count > 10 )
											{
												lootCap = (MAL.options.RaidUnitCarry[i] * webfrontend.data.City.getInstance().units[i].count);
												maxReps = Math.floor(lootCap / loot);
												if (Math.ceil(maxReps) - maxReps < .26)
												{
													maxReps2 = Math.ceil(maxReps);
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[i]);
												}	
												if (Math.ceil(maxReps) - maxReps > .25)
												{
													maxReps2 = Math.floor(maxReps);
													if (maxReps2 < 1)
													{
														maxReps2 = 1;
													}	
													if (maxReps2 > orderLimit)
													{
														maxReps2 = orderLimit;
													}	
													numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[i]);
												}
												for (var x = 0; x < maxReps2; x++)
												{
													var unitsToSend = new Array();
													var unitString = "" + i;
													var trans = 1;
													if (i > 14) 
													{
														trans = 2;
													}
													unitsToSend.push({t: unitString, c: numUnitsPerRep});
													webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
													{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
												}
											}
										}
									}
								}
							}
						}, this);
						this.raidPiratesBtn.addListener("execute", function (e)
						{
							var coord = this.main.worldViewCoord;
							if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) 
							{
								var level = this.main.getDungeonLevel();
								var lootMin = MAL.options.DungeonLoot[level];
								var lootMax = MAL.options.DungeonLootMax[level];
								var loot = (lootMin + (lootMin * ((coord.progress / 10) * .15)));
								if (Math.floor(loot) > lootMax)
								{
									loot = lootMax;
								}
								var unitType = -1;
								var orderCount = 0;
								if (webfrontend.data.City.getInstance().getUnitOrders() != null)
								{
									orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
								}
								var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
								for (var i = 15; i < 18 && orderLimit > 0; i++) 
								{
									if (webfrontend.data.City.getInstance().units[i] != null) 
									{
										if (MAL.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
										{
											var numUnitsPerRep = Math.floor(loot / MAL.options.RaidUnitCarry[i]);
											var maxReps2 = 0;
											var maxReps = (webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep );
											if (Math.ceil(maxReps) - maxReps < .25)
											{
												maxReps2 = Math.ceil(maxReps);
												if (maxReps2 > orderLimit)
												{
													maxReps2 = orderLimit;
												}	
												if (maxReps2 > 3 && i == 16)
												{
													maxReps2 = 3;
												}
												if (maxReps2 < 1)
												{
													maxReps2 = 1;
												}	
												numUnitsPerRep = Math.floor(webfrontend.data.City.getInstance().units[i].count / maxReps2);
											}	
											if (Math.ceil(maxReps) - maxReps >= .25)
											{
												maxReps2 = Math.floor(maxReps);
												if (maxReps2 > orderLimit)
												{
													maxReps2 = orderLimit;
												}	
												if (maxReps2 > 3 && i == 16)
												{
													maxReps2 = 3;
												}
												if (maxReps2 < 1)
												{
													maxReps2 = 1;
												}	
												numUnitsPerRep = Math.floor(webfrontend.data.City.getInstance().units[i].count / maxReps2);
											}
											
											for (var x = 0; x < maxReps2 && orderLimit > 0; x++)
											{
												var unitsToSend = new Array();
												var unitString = "" + i;
												var trans = 1;
												if (i > 14) 
												{
													trans = 2;
												}
												unitsToSend.push({t: unitString, c: numUnitsPerRep});
												webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
												{
														cityid: webfrontend.data.City.getInstance().getId(),
														units: unitsToSend,
														targetPlayer: "",
														targetCity: coord.xPos + ":" + coord.yPos,
														order: 8,
														transport: trans,
														iUnitOrderOptions: 0,
														timeReferenceType: 1,
														referenceTimeUTCMillis: 0,
														raidTimeReferenceType: 1,
														raidReferenceTimeUTCMillis: 0,
														createCity: ""
													}, this, this.onTroopsSent);
													orderLimit = orderLimit - 1;
											}
										}
									}
								}
							}
						}, this);
                        this.sendArmyBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                this.main.app.showSendArmy(coord.xPos, coord.yPos);
                            }
                        }, this);
                        this.plunderRepeatBtn.addListener("execute", function (e) { //Uses all but 1 command slot to schedule continuous plunders on a target.
                            var multiple = 0;
							var type1 = 0;
							var type2 = 0;
							var type3 = 0;
							var amount1 = 0;
							var amount2 = 0;
							var amount3 = 0;
							var army = 0; // which army out of town is the plunder (attack type 2)
							var orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
							for (var z = 0; z < orderCount; z++)
							{
								if (webfrontend.data.City.getInstance().unitOrders[z].type == 2) //looks for a current plunder and asumes you want to repeat this one.
								{
									army = z; // Found the plunder
									if (webfrontend.data.City.getInstance().unitOrders[z].units[0] != null)
									{
										type1 = webfrontend.data.City.getInstance().unitOrders[z].units[0].type;
										amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count * .97);
										multiple = 0;
										if (webfrontend.data.City.getInstance().unitOrders[z].state == 2) //looks to see if current plunder is on it's way back home.
										{
											amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count + webfrontend.data.City.getInstance().units[type1].count); // increases future plunders by the returning TS PLUS any additional in town that have trained
										}	
									}
									if (webfrontend.data.City.getInstance().unitOrders[z].units[1] != null)
									{
										type1 = webfrontend.data.City.getInstance().unitOrders[z].units[0].type;
										type2 = webfrontend.data.City.getInstance().unitOrders[z].units[1].type;
										amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count * .97);
										amount2 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[1].count * .97);
										multiple = 1;
										if (webfrontend.data.City.getInstance().unitOrders[z].state == 2)
										{
											amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count + webfrontend.data.City.getInstance().units[type1].count);
											amount2 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[1].count + webfrontend.data.City.getInstance().units[type2].count);
										}
									}
									if (webfrontend.data.City.getInstance().unitOrders[z].units[2] != null)
									{
										type1 = webfrontend.data.City.getInstance().unitOrders[z].units[0].type;
										type2 = webfrontend.data.City.getInstance().unitOrders[z].units[1].type;
										type3 = webfrontend.data.City.getInstance().unitOrders[z].units[2].type;
										amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count * .97);
										amount2 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[1].count * .97);
										amount3 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[2].count * .97);
										multiple = 2;
										if (webfrontend.data.City.getInstance().unitOrders[z].state == 2)
										{
											amount1 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[0].count + webfrontend.data.City.getInstance().units[type1].count);
											amount2 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[1].count + webfrontend.data.City.getInstance().units[type2].count);
											amount2 = Math.floor(webfrontend.data.City.getInstance().unitOrders[z].units[2].count + webfrontend.data.City.getInstance().units[type3].count);
										}
									}
								}
							}
							var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
							var timeStart = webfrontend.data.City.getInstance().unitOrders[army].start; // in Server Age seconds
							var timeEnd = webfrontend.data.City.getInstance().unitOrders[army].end; // in Server Age seconds
							var roundTrip = (timeEnd - timeStart) * 2 * 1000; // in UTC millis if repeat is set right after initial plunder
							var timeNow = new Date().getTime(); // in UTC millis
							var serverStartUTC = webfrontend.data.ServerTime.getInstance().refTime; // in UTC millis
							for (var j = 1; j < orderLimit; j++)
							{
								var coord = this.main.worldViewCoord;
								var d = 0; // departure time	
								var dfr = 0; // departure time for future plunders after the 2nd, if initial is on its way back already when you click repeat.
								var timeRef = 1;
								if (webfrontend.data.City.getInstance().unitOrders != null)
								{
									timeRef = 2;
									d = (timeNow + (roundTrip * j)) + (7000 * j); // 7 second delay for lag.
									if (webfrontend.data.City.getInstance().unitOrders[army].state == 2) // if plundering army is already returning home when you click repeat.
									{
										d = (serverStartUTC + (timeEnd * 1000) + (7000 * j));
										if (j > 1 && j < orderLimit)
										{
											dfr = (serverStartUTC + (timeEnd * 1000) + (7000 * j - 1)) + (roundTrip * (j - 1)) + (7000 * (j - 1));
											d = dfr;
										}	
									}	
								}	
								if (coord && this.main.checkCoordType(this.main.CITY) || this.main.checkCoordType(this.main.LAWLESS)) 
								{
									var unitsToSend1 = new Array();
									var unitsToSend2 = new Array();
									var unitsToSend3 = new Array();
									if (webfrontend.data.City.getInstance().units[type1] != null) 
									{
										if (webfrontend.data.City.getInstance().units[type1].total > 0) 
										{
											var unitString1 = "" + type1;
											var unitString2 = "" + type2;
											var unitString3 = "" + type3;
											var trans = 1;
											if (type1 == 15 || type1 == 16 || type1 == 17)
											{
												trans = 2;
											}	
											// 3% buffer allowed for losses, any more than that and the subsequent plunders stop.
											unitsToSend1.push({t: unitString1, c: Math.floor(amount1)});
											unitsToSend2.push({t: unitString1, c: Math.floor(amount1)},{t: unitString2, c: Math.floor(amount2)});
											unitsToSend3.push({t: unitString1, c: Math.floor(amount1)},{t: unitString2, c: Math.floor(amount2)},{t: unitString3, c: Math.floor(amount3)});
											webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
												cityid: webfrontend.data.City.getInstance().getId(),
												units: (multiple == 2 ? unitsToSend3 : multiple == 1 ? unitsToSend2 : unitsToSend1),
												targetPlayer: coord.playerName,
												targetCity: coord.xPos + ":" + coord.yPos,
												order: 2,
												transport: trans,
												iUnitOrderOptions: 1, // unchecks the attack ally box
												timeReferenceType: timeRef,
												referenceTimeUTCMillis: d,
												raidTimeReferenceType: 0,
												raidReferenceTimeUTCMillis: 0,
												createCity: ""
											}, this, this.onTroopsSent);
										}
									}
								}
							}
						}, this);
                        this.plunderBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY) || this.main.checkCoordType(this.main.LAWLESS)) {
                                var unitsToSend = new Array();
                                for (var i = 0; i < 18; i++) {
                                    if (i == 8)
									{
										continue;
									}	
									if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (webfrontend.data.City.getInstance().units[i].count > 0) {
                                            var unitString = "" + i;
                                            var trans = 1;
											if (i == 15 || i == 16 || i == 17)
											{
												trans = 2;
											}	
											unitsToSend.push({t: unitString, c: webfrontend.data.City.getInstance().units[i].count});
											webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
												cityid: webfrontend.data.City.getInstance().getId(),
												units: unitsToSend,
												targetPlayer: coord.playerName,
												targetCity: coord.xPos + ":" + coord.yPos,
												order: 2,
												transport: trans,
												iUnitOrderOptions: 1,
												timeReferenceType: 1,
												referenceTimeUTCMillis: 0,
												raidTimeReferenceType: 0,
												raidReferenceTimeUTCMillis: 0,
												createCity: ""
											}, this, this.onTroopsSent);
										}
									}
								}
							}
						}, this);
						this.scoutBtn.addListener("execute", function (e)
						{
							var coord = this.main.worldViewCoord;
							if (coord && this.main.checkCoordType(this.main.CITY) || this.main.checkCoordType(this.main.LAWLESS))
							{
								var unitsToSend = new Array();
								var numUnitsPerRep = 0;
								var unitString = "" + 8;
								var b1 = webfrontend.data.Player.getInstance().$$user_barons;
								var b2 = webfrontend.data.Player.getInstance().$$user_baronsIdle;
								var b3 = webfrontend.data.Player.getInstance().$$user_baronsQueue;
								var bT = b1+b2+b3;								
								var unitLimit = webfrontend.data.City.getInstance().getUnitLimit();
								var unitCount = webfrontend.data.City.getInstance().units[8].count;
								var orderCount = 0;
								if (webfrontend.data.City.getInstance().getUnitOrders() != null)
								{
									orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
								}
								var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
								var maxUnitsPerRep = Math.floor( unitCount / orderLimit );
								if (unitLimit >= 0 && unitLimit < 20000)
								{
									numUnitsPerRep = 1;
								}
								if (unitLimit >= 20001 && unitLimit < 40000)
								{
									numUnitsPerRep = 10;
								}
								if (unitLimit >= 40000 && unitLimit < 60000)
								{
									numUnitsPerRep = 100;
								}
								if (unitLimit >= 60000 && unitLimit < 80000)
								{
									numUnitsPerRep = 250;
								}
								if (unitLimit >= 80000 && unitLimit < 100000)
								{
									numUnitsPerRep = 400;
								}
								if (unitLimit >= 100000 && unitLimit < 120000)
								{
									numUnitsPerRep = 500;
								}
								if ((unitLimit >= 100000 && unitLimit < 120000) || (bT >= 50 && bT <= 99))
								{
									numUnitsPerRep = 600;
								}
								if (unitLimit >= 120000 && unitLimit < 160000)
								{
									numUnitsPerRep = 800;
								}
								if (unitLimit >= 160000 && unitLimit < 200000)
								{
									numUnitsPerRep = 1000;
								}
								if (unitLimit >= 200000 && unitLimit < 240000)
								{
									numUnitsPerRep = 1250;
								}
								if (unitLimit >= 240000)
								{
									numUnitsPerRep = 1500;
								}
								if (maxUnitsPerRep > numUnitsPerRep)
								{
									numUnitsPerRep = maxUnitsPerRep;
								}	
								
								unitsToSend.push({t: unitString, c: numUnitsPerRep});
								webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
								{
									cityid: webfrontend.data.City.getInstance().getId(),
									units: unitsToSend,
									targetPlayer: "",
									targetCity: coord.xPos + ":" + coord.yPos,
									order: 1,
									transport: 1,
									iUnitOrderOptions: 1,
									timeReferenceType: 1,
									referenceTimeUTCMillis: 0,
									raidTimeReferenceType: 1,
									raidReferenceTimeUTCMillis: 0,
									createCity: ""
								}, this, this.onTroopsSent);
							}
						}, this);
                        this.settleBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            var unitsToSend = new Array();
                            if (webfrontend.data.City.getInstance().units[19] == null)
							{
								alert("NO AVAILABLE BARON !!!");
							}	
							var unitString = "" + 19;
                            var trans = 1;
							unitsToSend.push({t: unitString, c: 1});
							webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", 
							{
								cityid: webfrontend.data.City.getInstance().getId(),
								units: unitsToSend,
								targetPlayer: coord.playerName,
								targetCity: coord.xPos + ":" + coord.yPos,
								order: 9,
								transport: trans,
								iUnitOrderOptions: 1,
								timeReferenceType: 1,
								referenceTimeUTCMillis: 0,
								raidTimeReferenceType: 0,
								raidReferenceTimeUTCMillis: 0,
								createCity: "new city"
							}, this, this.onTroopsSent);
						}, this);
						this.copyBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.copyBtnSub.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.copyCoordBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                                } else {
                                    this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                                }
                            }
                        }, this);
                        this.copyPlayerBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY | this.main.LAWLESS)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[player]" + coord.playerName + "[/player]");
                                } else {
                                    this.main.sendToChat("[player]" + coord.playerName + "[/player]");
                                }
                            }
                        }, this);
                        this.copyAllianceBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[alliance]" + coord.allianceName + "[/alliance]");
                                } else {
                                    this.main.sendToChat("[alliance]" + coord.allianceName + "[/alliance]");
                                }
                            }
                        }, this);
                        this.copyToMail.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.sendResBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showTrade(coord.xPos, coord.yPos);
                            }
                        }, this);
                        this.infoPlayerBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showInfoPage(this.main.app.getPlayerInfoPage(), {
                                    "name": coord.playerName
                                });
                            }
                        }, this);
                        this.infoAllianceBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showInfoPage(this.main.app.getAllianceInfoPage(), {
                                    "name": coord.allianceName
                                });
                            }
                        }, this);
                        this.whisperBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.sendToChat("/whisper " + coord.playerName + " ", true);
                            }
                        }, this);
                        debugLog("HTK Context Menu Initialized.");
                    },
                    members: {
                        main: null,
                        worldContext: null,
                        copyMenu: null,
                        infoMenu: null,
                        selectCityBtn: null,
                        viewReportsBtn: null,
                        killBossBtn: null,
                        raidDungeonBtn: null,
						raidDungeonResetBtn: null,
						settleBtn: null,
                        raidDungeonReserveBtn: null,
						raidZerksBtn: null,
                        raidPiratesBtn: null,
						sendArmyBtn: null,
                        plunderBtn: null,
                        plunderRepeatBtn: null,
						scoutBtn: null,
                        sendResBtn: null,
                        copyBtn: null,
                        copyBtnSub: null,
                        copyCoordBtn: null,
                        copyPlayerBtn: null,
                        copyAllianceBtn: null,
                        copyToMail: null,
                        infoBtn: null,
                        infoPlayerBtn: null,
                        infoAllianceBtn: null,
                        whisperBtn: null,

                        func: function (obj) {},
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
                        updateWorldViewContext: function () {
                            this.selectCityBtn.setVisibility("excluded");
                            this.viewReportsBtn.setVisibility("excluded");
                            this.killBossBtn.setVisibility("excluded");
                            this.raidDungeonBtn.setVisibility("excluded");
							this.raidDungeonResetBtn.setVisibility("excluded");
							this.settleBtn.setVisibility("excluded");
                            this.raidDungeonReserveBtn.setVisibility("excluded");
							this.raidZerksBtn.setVisibility("excluded");
							this.raidPiratesBtn.setVisibility("excluded");
                            this.sendArmyBtn.setVisibility("excluded");
                            this.plunderBtn.setVisibility("excluded");
                            this.plunderRepeatBtn.setVisibility("excluded");
							this.scoutBtn.setVisibility("excluded");
                            this.sendResBtn.setVisibility("excluded");
                            this.copyBtn.setVisibility("excluded");
                            this.copyBtnSub.setVisibility("excluded");
                            this.copyToMail.setVisibility("excluded");
                            this.infoBtn.setVisibility("excluded");
                            this.whisperBtn.setVisibility("excluded");
                            if (this.main.app.visMain.mapmode == "r" || this.main.app.visMain.mapmode == "w") {
                                var coord = this.main.updateWorldViewCoord();
                                if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName && this.main.selectCity({
                                    "cityX": coord.xPos,
                                    "cityY": coord.yPos,
                                    "cityIsMine": true
                                })) {
                                    this.selectCityBtn.setVisibility("visible");
                                    this.sendArmyBtn.setVisibility("visible");
                                    this.viewReportsBtn.setVisibility("visible");
                                    this.copyBtnSub.setVisibility("visible");
                                    this.sendResBtn.setVisibility("visible");
                                    this.infoBtn.setVisibility("visible");
                                    if (this.main.app.sendMail && this.main.app.sendMail.isSeeable()) {
                                        this.copyToMail.setVisibility("visible");
                                    }
                                } else if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                    this.viewReportsBtn.setVisibility("visible");
                                    this.sendArmyBtn.setVisibility("visible");
                                    this.plunderBtn.setVisibility("visible");
									this.plunderRepeatBtn.setVisibility("visible");
									if (this.main.getBossLevel() > 0) {
                                        this.killBossBtn.setVisibility("visible");
                                    }
                                    if (this.main.getDungeonLevel() > 0 && this.main.getDungeonType() != "Sea Encounter") {
										this.raidDungeonBtn.setVisibility("visible");
										this.raidDungeonResetBtn.setVisibility("visible");
										this.raidDungeonReserveBtn.setVisibility("visible");
										this.raidZerksBtn.setVisibility("visible");
									}
									if (this.main.checkCoordType(this.main.LAWLESS) || this.main.checkCoordType(this.main.EMPTY)) {
										this.settleBtn.setVisibility("visible");
									}
									if (this.main.getDungeonLevel() > 0 && this.main.getDungeonType() == "Sea Encounter") {
										this.raidPiratesBtn.setVisibility("visible");
									}
                                    if (this.main.checkCoordType(this.main.CITY)) {
                                        this.plunderBtn.setVisibility("visible");
                                        this.plunderRepeatBtn.setVisibility("visible");
										this.scoutBtn.setVisibility("visible");
                                        this.copyBtnSub.setVisibility("visible");
                                        this.sendResBtn.setVisibility("visible");
                                        this.infoBtn.setVisibility("visible");
                                        this.whisperBtn.setVisibility("visible");
                                        if (this.main.app.sendMail && this.main.app.sendMail.isSeeable()) {
                                            this.copyToMail.setVisibility("visible");
                                        }
                                    } else {
                                        this.copyBtn.setVisibility("visible");
                                    }
                                } else if (coord && this.main.checkCoordType(this.main.ANY)) {
                                    this.copyBtn.setVisibility("visible");
									this.settleBtn.setVisibility("visible");
								}
                            }
                        }
                    }
                });

                window.htk = new nessusRiverGuardian.main();
            }

            function checkLoad() {
                try {
                    if (typeof qx != 'undefined') {
                        var app = qx.core.Init.getApplication();
                        var cityInfo = app.cityInfoView;
                        var chat = app.chat;
                        var startTime = webfrontend.data.ServerTime.getInstance().refTime;
                        if (app && cityInfo && chat && startTime) {
                            debugLog("HTK Load Complete.");
                            initNessusRiverGuardian();
                        } else {
                            window.setTimeout(checkLoad, 1000);
                        }
                    } else {
                        window.setTimeout(checkLoad, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') console.log(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/lordofultima\.com/i.test(document.domain)) {
                debugLog("HTK Loading...");
                window.setTimeout(checkLoad, 1000);
            }
        }

        // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var MALScript = document.createElement("script");
    txt = MAL_mainFunction.toString();
    if (window.opera != undefined) txt = txt.replace(/</g, "&lt;"); // rofl Opera
    MALScript.innerHTML = "(" + txt + ")();";
    MALScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(MALScript);

})();
