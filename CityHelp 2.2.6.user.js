// ==UserScript==
// @name           CityHelp GUI
// @namespace      CityHelpGUI
// @version        2.2.6
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(
    function () {

        var CH_mainfunction = function () {

            function createCtTweak() {
                qx.Class.define("CityHelper.main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    statics: {
                        node: { "28": 0, "900": 0, "29": 1, "901": 1, "27": 2, "902": 2, "30": 3, "903": 3, "23": 4, "1": 5, "2": 6, "3": 7, "4": 8, "5": 9, "6": 10, "7": 11, "8": 12, "9": 13, "10": 14, "11": 15, "12": 16, "13": 17, "14": 18, "15": 19, "16": 20, "17": 21, "18": 22, "19": 23, "20": 24, "21": 25, "22": 26, "36": 27, "37": 28, "38": 29, "39": 30, "40": 31, "41": 32, "42": 33, "43": 34, "44": 35, "45": 36, "46": 37, "98": 38, "99": 39, "-2": 40, "-1": 41, "97": 46, "47": 42, "48": 43, "49": 45, "50": 44, "52": 38, "53": 38, "54": 38, "55": 38, "56": 38, "57": 38, "58": 38, "59": 38, "904": 0, "61": 0, "905": 1, "62": 1, "906": 2, "60": 2, "907": 3, "63": 3 },
                        louCityP: [":", ".", ",", ";", "#", "W", "Q", "F", "C", "P", "I", "L", "M", "H", "A", "D", "T", "U", "B", "K", "G", "E", "Y", "V", "S", "X", "R", "J", "Z", "#", "#", "#", "#", "#", "#", "#", "#", "#", "-", "#", "#", "#", "2", "3", "1", "4", "_"],
                        louFCityP: ["B", "A", "C", "D", "", "F", "G", "I", "O", "J", "H", "K", "N", "1", "L", "M", "0", "E", "P", "S", "Q", "U", "V", "Y", "Z", "X", "T", "R", "W", "", "", "", "", "", "", "", "", "", "0", "", "0", "", "2", "3", "5", "4", "0"],
                        fcpToSs: { "B": ":", "A": ".", "C": ",", "D": ";", "E": "U", "F": "W", "G": "Q", "H": "I", "I": "F", "J": "P", "K": "L", "L": "A", "M": "D", "N": "M", "O": "C", "P": "B", "Q": "G", "R": "J", "S": "K", "T": "R", "U": "E", "V": "Y", "W": "Z", "X": "X", "Y": "V", "Z": "S", "1": "H", "0": "-", "2": "2", "3": "3", "4": "4", "5": "1" },
                        ssToId: { "2": 47, "3": 48, "1": 50, "C": 4, "P": 5, "4": 49, "L": 7, "M": 8, "H": 9, "A": 10, "D": 11, "T": 12, "U": 13, "B": 14, "K": 15, "G": 16, "E": 17, "Y": 18, "V": 19, "S": 20, "X": 21, "R": 22, "J": 36, "Z": 37, "-": 98 },
                        land: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
                        water: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################"
                    },
                    members: {
                        testarray: null,

                        app: null,
                        srvBar: null,
                        buildCount: null,
                        buildEmpty: null,
                        buildOccupied: null,
                        buildUnused: null,
                        buildings: null,
                        timer: null,
                        Updatetimer: null,
                        timerSD: null,
                        timerBR: null,
                        timerBRS: null,
                        timerGC: null,
                        sendCommandBuffer: null,
                        sendCommandBusy: null,
                        sendCommandWaitForReply: null,

                        sendMapCommandBuffer: null,
                        sendMapCommandBusy: null,
                        sendMapCommandWaitForReply: null,

                        layout: null,
                        lastUpdate: null,
                        distCID: null,
                        distUpdating: null,
                        allRatio: null,
                        buildRoundActive: null,
                        buildRoundStartCity: null,
                        somethingbuilt: null,
                        doingBuildround: null,
                        lastBuildround: null,

                        landcap: null,
                        watercap: null,

                        btnCHO: null,
                        btnWC: null,
                        btnBuild: null,
                        btnTrade: null,
                        btnName: null,
                        btnLB: null,
                        btnLM: null,
                        btnLDB: null,
                        btnLDR: null,
                        btnLW: null,
                        btnNB: null,
                        btnFB: null,
                        btnSD: null,
                        btnFPB: null,
                        btnCO: null,
                        btnBR: null,
                        btnSDDO: null,
                        btnSBDO: null,
                        activeButton: null,

                        expImpWin: null,

                        COActive: null,
                        COTable: null,
                        COTableModel: null,
                        COlayout: null,

                        WCWindow: null,

                        WC: null,

                        cipher: null,

                        bosslist: null,
                        sbBoss: null,

                        lawlesslist: null,
                        sbLawless: null,

                        dungeonlist: null,
                        sbDungeon: null,

                        freelist: null,
                        sbFree: null,

                        citylist: null,
                        playerlist: null,
                        alliancelist: null,

                        doGlobal: null,

                        sbType: null,
                        sbLevel: null,
                        sbRatio: null,

                        bossAtk: new Array(0, 2500, 15000, 100000, 200000, 500000, 750000, 1000000, 1500000, 2250000, 3000000),
                        bossAtkAff: new Array(0, 1680, 10000, 68000, 132000, 332000, 500000, 680000, 1000000, 1500000, 2000000),

                        SrvTech: null,
                        Tech: null,

                        options: null,

                        WORLDConsumer: null,

                        troopList: null,
                        contList:null,

                        BRWaitTime: null,


                        ToolTimer: null,

                        mapInfo: null,

                        initialize: function () {
                            this.app = qx.core.Init.getApplication();
                            this.srvBar = this.app.serverBar;
                            this.loadOptions(false);
                            this.options.ministers = {
                                build: webfrontend.data.Player.getInstance().getMinisterBuildPresent(),
                                defence: webfrontend.data.Player.getInstance().getMinisterDefencePresent(),
                                military: webfrontend.data.Player.getInstance().getMinisterMilitaryPresent(),
                                trade: webfrontend.data.Player.getInstance().getMinisterTradePresent()

                            };
                            this.lastBuildround = webfrontend.Util.getCurrentTime();

                            this.expImpWin = this.createExpImpWindow();

                            this.troopList = {};
                            this.contList = {};
                            
                            this.mapInfo = {};

                            this.SrvTech = webfrontend.data.Tech.getInstance();

                            this.WC = CityHelper.WeaponsControl.getInstance();
                            this.WC.initialize();

                            this.distCID = 0;
                            this.distUpdating = true;

                            this.timer = qx.util.TimerManager.getInstance();
                            this.Updatetimer = qx.util.TimerManager.getInstance();
                            this.timerSD = qx.util.TimerManager.getInstance();
                            this.timerBR = qx.util.TimerManager.getInstance();
                            this.timerBRS = qx.util.TimerManager.getInstance();
                            this.timerGC = qx.util.TimerManager.getInstance();
                            this.ToolTimer = qx.util.TimerManager.getInstance();
                            this.lastUpdate = 0,
                            this.sendCommandBuffer = new Array();
                            this.sendCommandBusy = false;
                            this.sendCommandWaitForReply = false;

                            this.sendMapCommandBuffer = new Array();
                            this.sendMapCommandBusy = false;
                            this.sendMapCommandWaitForReply = false;

                            this.doGlobal = false;

                            this.activeButton = new Array(true, true, true, false, false, false, false, false);

                            this.buildRoundActive = false;
                            this.buildRoundStartCity = 0;
                            this.COActive = false;

                            this.somethingbuilt = false;
                            this.doingBuildround = false;

                            this.bosslist = [];
                            this.lawlesslist = [];
                            this.dungeonlist = [];
                            this.freelist = [];
                            this.citylist = [];
                            this.playerlist = [];
                            this.alliancelist = [];

                            this.cipher = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', ' ', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '\''];

                            this.layout = {
                                cityId: 0,
                                cc: null,
                                ss: null,
                                bql: null,
                                bc: null,
                                cv: null,
                                city: null
                            };
                            this.COlayout = {
                                cityId: 0,
                                cc: null,
                                ss: null,
                                bql: null,
                                bc: null,
                                cv: null
                            };
                            this.createButton();
                            //this.update();
                            webfrontend.base.Timer.getInstance().addListener("uiTick", this.update, this);
                            //webfrontend.data.City.getInstance().addListener("changeVersion", this.update, this);

                            this.sbType.add(new qx.ui.form.ListItem("Auto", null, 0));
                            this.sbType.add(new qx.ui.form.ListItem("Land", null, 1));
                            this.sbType.add(new qx.ui.form.ListItem("Water", null, 2));

                            this.sbLevel.add(new qx.ui.form.ListItem(">=1", null, 1));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=2", null, 2));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=3", null, 3));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=4", null, 4));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=5", null, 5));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=6", null, 6));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=7", null, 7));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=8", null, 8));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=9", null, 9));
                            this.sbLevel.add(new qx.ui.form.ListItem(">=10", null, 10));
                            this.sbLevel.setModelSelection([this.options.raiding.minimumLevel]);


                            this.sbRatio.add(new qx.ui.form.ListItem("All Ratio", null, 0));
                            this.sbRatio.add(new qx.ui.form.ListItem(this.options.raiding.allRatio + "<=ratio<=5", null, 1));
                            this.sbRatio.add(new qx.ui.form.ListItem(this.options.raiding.allRatio + "<=ratio<=15", null, 2));
                            this.sbRatio.add(new qx.ui.form.ListItem(this.options.raiding.allRatio + "<=ratio<=freecommands", null, 3));

                            ratSel = [this.options.raiding.defaultRatio];
                            this.sbRatio.setModelSelection(ratSel);

                            this.COTableModel = new qx.ui.table.model.Simple();
                            this.COTableModel.setColumns(["Building", "In City", "Layout"]);

                            this.COTable = new qx.ui.table.Table(this.COTableModel).set({
                                decorator: null,
                                height: 500,
                                width: 300
                            });


                            this.app.desktop.add(this.COTable, { right: 0, top: 165 });
                            this.COTable.exclude();

                            this.distUpdating = false;
                        },
                        loadOptions: function (reset) {
                            forceSave = false;
                            if (reset == true) {
                                localStorage.removeItem("CH_options");
                                console.log("loadOptions: resetting options");

                            };
                            _str = localStorage.getItem("CH_options");
                            if ((_str) && (reset == false)) {
                                console.log("loadOptions: load options");
                                this.options = qx.lang.Json.parse(_str);
                            }
                            else {
                                this.options = {
                                    "raiding": {
                                        "lootlevel": {
                                            0: 0,
                                            1: 320,
                                            2: 2000,
                                            3: 6000,
                                            4: 31000,
                                            5: 80000,
                                            6: 150000,
                                            7: 350000,
                                            8: 540000,
                                            9: 900000,
                                            10: 1400000
                                        }, //lootlevel
                                        "allRatio": 0.65,
                                        "defaultRatio": 3
                                    }, //raiding
                                    "worldmap": {
                                        "cellsPrCommand": 10
                                    }, //worldmap
                                    "building": {
                                        "buildspeed": 2500
                                    },
                                    "WeaponsControl": {
                                        "stopRaidsHBefore": 4,
                                        "defaultFakeTs": 3000,
                                        "defaultAffinity": 0
                                    }, //weaponscontrol
                                    "towers": {
                                        /*
                                        Towers:
                                        lookout tower "38"
                                        ballista tower "39"
                                        guardian tower "40" 
                                        ranger tower "41" 
                                        templar tower "42" 
                                        pitfall trap "43" 
                                        barricade  "44"
                                        arcane trap "45"
                                        camouflage trap "46"
                                        */
                                        towersTemplate: { /*Stardard with no tag*/
                                            /*top inner*/132617: { x: 9, y: 6, buildingType: 39 }, 132621: { x: 13, y: 6, buildingType: 38 },
                                            /*left inner*/133382: { x: 6, y: 9, buildingType: 39 }, 134406: { x: 6, y: 13, buildingType: 39 },
                                            /*right inner*/134416: { x: 16, y: 13, buildingType: 38 }, 133392: { x: 16, y: 9, buildingType: 38 },
                                            /*bottom inner*/135177: { x: 9, y: 16, buildingType: 40 }, 135181: { x: 13, y: 16, buildingType: 38 },
                                            /*top outer*/131332: { x: 4, y: 1, buildingType: 43 }, 131336: { x: 8, y: 1, buildingType: 43 }, 131342: { x: 14, y: 1, buildingType: 42 }, 131346: { x: 18, y: 1, buildingType: 42 },
                                            /*left outer*/132097: { x: 1, y: 4, buildingType: 44 }, 133121: { x: 1, y: 8, buildingType: 44 }, 134657: { x: 1, y: 14, buildingType: 45 }, 135681: { x: 1, y: 18, buildingType: 45 },
                                            /*right outer*/132117: { x: 21, y: 4, buildingType: 42 }, 133141: { x: 21, y: 8, buildingType: 41 }, 134677: { x: 21, y: 14, buildingType: 41 }, 135701: { x: 21, y: 18, buildingType: 41 },
                                            /*bottom outer*/136452: { x: 4, y: 21, buildingType: 46 }, 136456: { x: 8, y: 21, buildingType: 46 }, 136462: { x: 14, y: 21, buildingType: 40 }, 136466: { x: 18, y: 21, buildingType: 40 }
                                        },
                                        towersTemplateC1: { /*Standard with *C* tag */
                                            /*top inner*/132617: { x: 9, y: 6, buildingType: 39 }, 132621: { x: 13, y: 6, buildingType: 38 },
                                            /*left inner*/133382: { x: 6, y: 9, buildingType: 39 }, 134406: { x: 6, y: 13, buildingType: 39 },
                                            /*right inner*/134416: { x: 16, y: 13, buildingType: 38 }, 133392: { x: 16, y: 9, buildingType: 38 },
                                            /*bottom inner*/135177: { x: 9, y: 16, buildingType: 39 }, 135181: { x: 13, y: 16, buildingType: 38 },
                                            /*top outer*/131332: { x: 4, y: 1, buildingType: 40 }, 131336: { x: 8, y: 1, buildingType: 40 }, 131342: { x: 14, y: 1, buildingType: 40 }, 131346: { x: 18, y: 1, buildingType: 40 },
                                            /*left outer*/132097: { x: 1, y: 4, buildingType: 42 }, 133121: { x: 1, y: 8, buildingType: 42 }, 134657: { x: 1, y: 14, buildingType: 42 }, 135681: { x: 1, y: 18, buildingType: 42 },
                                            /*right outer*/132117: { x: 21, y: 4, buildingType: 41 }, 133141: { x: 21, y: 8, buildingType: 41 }, 134677: { x: 21, y: 14, buildingType: 41 }, 135701: { x: 21, y: 18, buildingType: 41 },
                                            /*bottom outer*/136452: { x: 4, y: 21, buildingType: 46 }, 136456: { x: 8, y: 21, buildingType: 46 }, 136462: { x: 14, y: 21, buildingType: 46 }, 136466: { x: 18, y: 21, buildingType: 46 }
                                        },
                                        towersTemplateC2: {
                                            /*top inner*/132617: { x: 9, y: 6, buildingType: 39 }, 132621: { x: 13, y: 6, buildingType: 38 },
                                            /*left inner*/133382: { x: 6, y: 9, buildingType: 39 }, 134406: { x: 6, y: 13, buildingType: 39 },
                                            /*right inner*/134416: { x: 16, y: 13, buildingType: 38 }, 133392: { x: 16, y: 9, buildingType: 38 },
                                            /*bottom inner*/135177: { x: 9, y: 16, buildingType: 39 }, 135181: { x: 13, y: 16, buildingType: 38 },
                                            /*top outer*/131332: { x: 4, y: 1, buildingType: 40 }, 131336: { x: 8, y: 1, buildingType: 40 }, 131342: { x: 14, y: 1, buildingType: 40 }, 131346: { x: 18, y: 1, buildingType: 40 },
                                            /*left outer*/132097: { x: 1, y: 4, buildingType: 46 }, 133121: { x: 1, y: 8, buildingType: 46 }, 134657: { x: 1, y: 14, buildingType: 46 }, 135681: { x: 1, y: 18, buildingType: 46 },
                                            /*right outer*/132117: { x: 21, y: 4, buildingType: 41 }, 133141: { x: 21, y: 8, buildingType: 41 }, 134677: { x: 21, y: 14, buildingType: 41 }, 135701: { x: 21, y: 18, buildingType: 41 },
                                            /*bottom outer*/136452: { x: 4, y: 21, buildingType: 46 }, 136456: { x: 8, y: 21, buildingType: 46 }, 136462: { x: 14, y: 21, buildingType: 46 }, 136466: { x: 18, y: 21, buildingType: 46 }
                                        },
                                        towersTemplateP: { /*Standard with *P* tag (precedes *C* tag) */
                                            /*top inner*/132617: { x: 9, y: 6, buildingType: 39 }, 132621: { x: 13, y: 6, buildingType: 38 },
                                            /*left inner*/133382: { x: 6, y: 9, buildingType: 39 }, 134406: { x: 6, y: 13, buildingType: 39 },
                                            /*right inner*/134416: { x: 16, y: 13, buildingType: 38 }, 133392: { x: 16, y: 9, buildingType: 38 },
                                            /*bottom inner*/135177: { x: 9, y: 16, buildingType: 39 }, 135181: { x: 13, y: 16, buildingType: 38 },
                                            /*top outer*/131332: { x: 4, y: 1, buildingType: 46 }, 131336: { x: 8, y: 1, buildingType: 46 }, 131342: { x: 14, y: 1, buildingType: 46 }, 131346: { x: 18, y: 1, buildingType: 46 },
                                            /*left outer*/132097: { x: 1, y: 4, buildingType: 46 }, 133121: { x: 1, y: 8, buildingType: 46 }, 134657: { x: 1, y: 14, buildingType: 46 }, 135681: { x: 1, y: 18, buildingType: 46 },
                                            /*right outer*/132117: { x: 21, y: 4, buildingType: 46 }, 133141: { x: 21, y: 8, buildingType: 46 }, 134677: { x: 21, y: 14, buildingType: 46 }, 135701: { x: 21, y: 18, buildingType: 46 },
                                            /*bottom outer*/136452: { x: 4, y: 21, buildingType: 46 }, 136456: { x: 8, y: 21, buildingType: 46 }, 136462: { x: 14, y: 21, buildingType: 46 }, 136466: { x: 18, y: 21, buildingType: 46 }
                                        },
                                        towersTemplateR: { /*Standard with *R* tag */
                                            /*top inner*/132617: { x: 9, y: 6, buildingType: 39 }, 132621: { x: 13, y: 6, buildingType: 38 },
                                            /*left inner*/133382: { x: 6, y: 9, buildingType: 39 }, 134406: { x: 6, y: 13, buildingType: 39 },
                                            /*right inner*/134416: { x: 16, y: 13, buildingType: 38 }, 133392: { x: 16, y: 9, buildingType: 38 },
                                            /*bottom inner*/135177: { x: 9, y: 16, buildingType: 40 }, 135181: { x: 13, y: 16, buildingType: 38 },
                                            /*top outer*/131332: { x: 4, y: 1, buildingType: 43 }, 131336: { x: 8, y: 1, buildingType: 43 }, 131342: { x: 14, y: 1, buildingType: 43 }, 131346: { x: 18, y: 1, buildingType: 43 },
                                            /*left outer*/132097: { x: 1, y: 4, buildingType: 44 }, 133121: { x: 1, y: 8, buildingType: 44 }, 134657: { x: 1, y: 14, buildingType: 44 }, 135681: { x: 1, y: 18, buildingType: 44 },
                                            /*right outer*/132117: { x: 21, y: 4, buildingType: 44 }, 133141: { x: 21, y: 8, buildingType: 44 }, 134677: { x: 21, y: 14, buildingType: 44 }, 135701: { x: 21, y: 18, buildingType: 44 },
                                            /*bottom outer*/136452: { x: 4, y: 21, buildingType: 43 }, 136456: { x: 8, y: 21, buildingType: 43 }, 136462: { x: 14, y: 21, buildingType: 43 }, 136466: { x: 18, y: 21, buildingType: 43 }
                                        }
                                    } //towers
                                };
                            }
                            // 
                            //if (!this.options.hasOwnProperty("newoption")) this.options.newoption = 999;

                            // 1.8.6
                            if (!this.options.hasOwnProperty("WeaponsControl")) {
                                this.options.WeaponsControl = {
                                    "stopRaidsHBefore": 4,
                                    "defaultFakeTs": 3000
                                };
                                console.log("Adding WeaponsControl to options");
                            };

                            // 2.0.1
                            if (!this.options.WeaponsControl.hasOwnProperty("DungeonControl")) {
                                this.options.WeaponsControl.DungeonControl = {
                                    "Dungeons": {
                                        "Ranger": false,
                                        "Guardian": false,
                                        "Templar": false,
                                        "Scout": false,
                                        "Crossbow": false,
                                        "Paladin": false,
                                        "Ballista": false,
                                        "Sloop": false,
                                        "Frigate": false,
                                        "Beserker": false,
                                        "Mage": false,
                                        "Knight": false,
                                        "Warlock": false,
                                        "Ram": false,
                                        "Catapult": false,
                                        "WarGalleon": false
                                    },
                                    "Bosses": {
                                        "Ranger": false,
                                        "Guardian": false,
                                        "Templar": false,
                                        "Scout": false,
                                        "Crossbow": false,
                                        "Paladin": false,
                                        "Ballista": false,
                                        "Sloop": false,
                                        "Frigate": false,
                                        "Beserker": false,
                                        "Mage": false,
                                        "Knight": false,
                                        "Warlock": false,
                                        "Ram": false,
                                        "Catapult": false,
                                        "WarGalleon": false
                                    }
                                };
                                console.log("Adding DungeonControl to options");
                            };

                            // 2.0.6
                            if (!this.options.building.hasOwnProperty("autoBuildWalls")) {
                                this.options.building.autoBuildWalls = false;
                                console.log("Adding autoBuildWalls to options");
                            };

                            // 2.0.16
                            if (!this.options.raiding.hasOwnProperty("minimumLevel")) {
                                this.options.raiding.minimumLevel = 0;
                                console.log("Adding raid minimumLevel to options");
                            };

                            // 2.1.13
                            if (!this.options.WeaponsControl.hasOwnProperty("defaultAffinity")) {
                                this.options.WeaponsControl.defaultAffinity =  0;
                                console.log("Adding defaultAffinity to options");
                            };

                            this.app.setUserData("CH_options", this.options);
                            //                            if (forceSave) {
                            //                                str = qx.lang.Json.stringify(this.options);
                            //                                localStorage.setItem("CH_options", str);
                            //                            }
                        },
                        createExpImpWindow: function () {
                            win = new qx.ui.window.Window("");
                            win.setLayout(new qx.ui.layout.VBox(10));
                            win.set({ showMaximize: false, showMinimize: false, allowMaximize: false });
                            win.setWidth(450);
                            win.setHeight(200);
                            //win.open();
                            this.app.getRoot().add(win, { left: 250, top: 200 });

                            lab = new qx.ui.basic.Label("");
                            win.add(lab);
                            win.setUserData("lab", lab);


                            //ta = new qx.ui.form.TextArea(qx.lang.Json.stringify(this.options));
                            ta = new qx.ui.form.TextArea("");
                            //ta.addListener("click", function () { this.selectAllText(); });
                            win.add(ta, { height: 65 });
                            win.setUserData("ta", ta);
                            btn = new qx.ui.form.Button("OK").set({ maxWidth: 50, alignX: "center" });
                            btn.addListener("click", function () {
                                id = this.getUserData("id");
                                if (id == 1) {
                                    txt = this.getUserData("ta").getValue();
                                    try {
                                        obj = qx.lang.Json.parse(txt);
                                    } catch (e) { obj = "error"; }
                                    if (typeof obj == "object" && obj != null) {
                                        CH = CityHelper.main.getInstance();
                                        CH.options = qx.lang.Json.parse(txt);

                                        localStorage.setItem("CH_options", txt);
                                        this.close();
                                    } else {
                                        alert("Invalid options");
                                    }
                                } else if (id == 2) {
                                    this.close();
                                }
                            }, win);
                            win.add(btn);
                            return win;
                        },
                        CHO: function (reset) {
                            if (reset == true) {
                                this.loadOptions(true);
                            };

                            //                        btn.addListener("click", function(){
                            this.expImpWin.setCaption("CityHelper Options");
                            this.expImpWin.setUserData("id", 1);
                            this.expImpWin.getUserData("lab").setValue("CityHelper Options");
                            this.expImpWin.getUserData("ta").setValue(qx.lang.Json.stringify(this.options));
                            this.expImpWin.open();
                        },
                        CHOSave: function () {
                            this.app.setUserData("CH_options", this.options);
                            str = qx.lang.Json.stringify(this.options);
                            localStorage.setItem("CH_options", str);
                        },
                        _onSendDone: function (isOk, errorCode, context) {
                            try {
                                this.sendCommandWaitForReply = false;
                                console.log("_onSendDone: result:",isOk,"errorcode:",errorCode);
                                this.sendCmd();
                                if (isOk == false || errorCode == null) {
                                    //comm error			
                                } else {
                                }
                            } catch (e) {
                            }
                        },
                        _onSendBossDone: function (isOk, errorCode, context) {
                            try {
                                console.log("_onSendBossDone:: result", isOk, "errorcode:", errorCode, "context:", context);
                                this.sendCommandWaitForReply = false;
                                this.sendCmd();
                                //this.sendBossesWork();

                                if (isOk == false || errorCode == null) {
                                    //comm error			
                                } else {
                                }
                            } catch (e) {
                            }
                        },
                        _onSendMapDone: function (isOk, errorCode, context) {
                            try {
                                this.sendMapCommandWaitForReply = false;
                                this.sendMapCmd();
                                if (isOk == false || errorCode == null) {
                                    //comm error			
                                } else {
                                }
                            } catch (e) {
                            }
                        },
                        _onPollDone: function (isOk, errorCode, context) {
                            try {

                                if (isOk == false || errorCode == null) {
                                    //comm error			
                                } else {
                                    //                                    console.log(context);
                                    //                          
                                }
                            } catch (e) {
                            }
                        },
                        createButton: function () {
                            CHmenu = new qx.ui.menu.Menu();

                            var btnCHOp = new qx.ui.menu.Button("Options", null);
                            btnCHOp.addListener("execute", function (event) { CityHelper.main.getInstance().CHO(false) });
                            var btnCHOpRes = new qx.ui.menu.Button("Reset Options", null);
                            btnCHOpRes.addListener("execute", function (event) { CityHelper.main.getInstance().CHO(true) });
                            var btnCHWC = new qx.ui.menu.Button("Weapons Control", null);
                            btnCHWC.addListener("execute", function (event) { CityHelper.main.getInstance().WCOpen() });
                            var btnCHCO = new qx.ui.menu.Button("Toggle City overview", null);
                            btnCHCO.addListener("execute", function (event) { CityHelper.main.getInstance().toggleCO() });

                            CHmenu.add(btnCHOpRes);
                            CHmenu.addSeparator();
                            CHmenu.add(btnCHOp);
                            CHmenu.addSeparator();
                            CHmenu.add(btnCHCO);
                            CHmenu.add(btnCHWC);

                            var LBmenu = new qx.ui.menu.Menu();

                            var btnBuild1 = new qx.ui.menu.Button("Force 1 building", null);
                            btnBuild1.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("A", 1) });
                            var btnBuild2 = new qx.ui.menu.Button("Force 2 building", null);
                            btnBuild2.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("A", 2) });
                            var btnBuild4 = new qx.ui.menu.Button("Force 4 buildings", null);
                            btnBuild4.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("A", 4) });
                            var btnBuild8 = new qx.ui.menu.Button("Force 8 buildings", null);
                            btnBuild8.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("A", 8) });
                            var btnBuild16 = new qx.ui.menu.Button("Force 16 building", null);
                            btnBuild16.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("A", 16) });

                            var btnBuild1C = new qx.ui.menu.Button("Force 1 cottage", null);
                            btnBuild1C.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("C", 1) });
                            var btnBuild4C = new qx.ui.menu.Button("Force 4 cottages", null);
                            btnBuild4C.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("C", 4) });
                            var btnBuild8C = new qx.ui.menu.Button("Force 8 cottages", null);
                            btnBuild8C.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("C", 8) });
                            var btnBuild16C = new qx.ui.menu.Button("Force 16 cottages", null);
                            btnBuild16C.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("C", 16) });
                            var btnBuildAllC = new qx.ui.menu.Button("Force All cottages", null);
                            btnBuildAllC.addListener("execute", function (event) { CityHelper.main.getInstance().buildMenuStuff("C", -1) });

                            var btnBuildCUp10 = new qx.ui.menu.Button("Build up to 10 cottage", null);
                            btnBuildCUp10.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(10) });
                            var btnBuildCUp20 = new qx.ui.menu.Button("Build up to 20 cottages", null);
                            btnBuildCUp20.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(20) });
                            var btnBuildCUp30 = new qx.ui.menu.Button("Build up to 30 cottages", null);
                            btnBuildCUp30.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(30) });
                            var btnBuildCUp40 = new qx.ui.menu.Button("Build up to 40  cottage", null);
                            btnBuildCUp40.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(40) });
                            var btnBuildCUp50 = new qx.ui.menu.Button("Build up to 50  cottage", null);
                            btnBuildCUp50.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(50) });
                            var btnBuildCUp60 = new qx.ui.menu.Button("Build up to 60  cottage", null);
                            btnBuildCUp60.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(60) });
                            var btnBuildCUp70 = new qx.ui.menu.Button("Build up to 70  cottage", null);
                            btnBuildCUp70.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(70) });
                            var btnBuildCUp80 = new qx.ui.menu.Button("Build up to 80  cottage", null);
                            btnBuildCUp80.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(80) });
                            var btnBuildCUp90 = new qx.ui.menu.Button("Build up to 90  cottage", null);
                            btnBuildCUp90.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(90) });
                            var btnBuildCUp100 = new qx.ui.menu.Button("Build up to 100  cottage", null);
                            btnBuildCUp100.addListener("execute", function (event) { CityHelper.main.getInstance().buildCottage(100) });



                            LBmenu.add(btnBuildCUp100);
                            LBmenu.add(btnBuildCUp90);
                            LBmenu.add(btnBuildCUp80);
                            LBmenu.add(btnBuildCUp70);
                            LBmenu.add(btnBuildCUp60);
                            LBmenu.add(btnBuildCUp50);
                            LBmenu.add(btnBuildCUp40);
                            LBmenu.add(btnBuildCUp30);
                            LBmenu.add(btnBuildCUp20);
                            LBmenu.add(btnBuildCUp10);

                            LBmenu.addSeparator();
                            LBmenu.add(btnBuildAllC);
                            LBmenu.add(btnBuild16C);
                            LBmenu.add(btnBuild8C);
                            LBmenu.add(btnBuild4C);
                            LBmenu.add(btnBuild1C);
                            LBmenu.addSeparator();
                            LBmenu.add(btnBuild16);
                            LBmenu.add(btnBuild8);
                            LBmenu.add(btnBuild4);
                            LBmenu.add(btnBuild2);
                            LBmenu.add(btnBuild1);

                            var LDBmenu = new qx.ui.menu.Menu();

                            var btnRemove1 = new qx.ui.menu.Button("Remove 1 building", null);
                            btnRemove1.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("A", 1) });
                            var btnRemove2 = new qx.ui.menu.Button("Remove 2 building", null);
                            btnRemove2.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("A", 2) });
                            var btnRemove4 = new qx.ui.menu.Button("Remove 4 buildings", null);
                            btnRemove4.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("A", 4) });
                            var btnRemove8 = new qx.ui.menu.Button("Remove 8 buildings", null);
                            btnRemove8.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("A", 8) });
                            var btnRemove16 = new qx.ui.menu.Button("Remove 16 building", null);
                            btnRemove16.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("A", 16) });

                            var btnRemove1C = new qx.ui.menu.Button("Remove 1 cottage", null);
                            btnRemove1C.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("C", 1) });
                            var btnRemove4C = new qx.ui.menu.Button("Remove 4 cottages", null);
                            btnRemove4C.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("C", 4) });
                            var btnRemove8C = new qx.ui.menu.Button("Remove 8 cottages", null);
                            btnRemove8C.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("C", 8) });
                            var btnRemove16C = new qx.ui.menu.Button("Remove 16 cottages", null);
                            btnRemove16C.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("C", 16) });
                            var btnRemoveAllC = new qx.ui.menu.Button("Remove All cottages", null);
                            btnRemoveAllC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("C", -1) });

                            var btnRemove1NC = new qx.ui.menu.Button("Remove 1 NON cottage", null);
                            btnRemove1NC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("NC", 1) });
                            var btnRemove4NC = new qx.ui.menu.Button("Remove 4 NON cottages", null);
                            btnRemove4NC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("NC", 4) });
                            var btnRemove8NC = new qx.ui.menu.Button("Remove 8 NON cottages", null);
                            btnRemove8NC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("NC", 8) });
                            var btnRemove16NC = new qx.ui.menu.Button("Remove 16 NON cottages", null);
                            btnRemove16NC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("NC", 16) });
                            var btnRemoveAllNC = new qx.ui.menu.Button("Remove All NON cottages", null);
                            btnRemoveAllNC.addListener("execute", function (event) { CityHelper.main.getInstance().destroyBuilding("NC", -1) });

                            LDBmenu.add(btnRemoveAllNC);
                            LDBmenu.add(btnRemove16NC);
                            LDBmenu.add(btnRemove8NC);
                            LDBmenu.add(btnRemove4NC);
                            LDBmenu.add(btnRemove1NC);
                            LDBmenu.addSeparator();
                            LDBmenu.add(btnRemoveAllC);
                            LDBmenu.add(btnRemove16C);
                            LDBmenu.add(btnRemove8C);
                            LDBmenu.add(btnRemove4C);
                            LDBmenu.add(btnRemove1C);
                            LDBmenu.addSeparator();
                            LDBmenu.add(btnRemove16);
                            LDBmenu.add(btnRemove8);
                            LDBmenu.add(btnRemove4);
                            LDBmenu.add(btnRemove2);
                            LDBmenu.add(btnRemove1);

                            var LDRmenu = new qx.ui.menu.Menu();

                            var btnResRemove1 = new qx.ui.menu.Button("Remove 1 resource node", null);
                            btnResRemove1.addListener("execute", function (event) { CityHelper.main.getInstance().destroyStuffMenu(1) });
                            var btnResRemove4 = new qx.ui.menu.Button("Remove 4 resource nodes", null);
                            btnResRemove4.addListener("execute", function (event) { CityHelper.main.getInstance().destroyStuffMenu(4) });
                            var btnResRemove8 = new qx.ui.menu.Button("Remove 8 resource nodes", null);
                            btnResRemove8.addListener("execute", function (event) { CityHelper.main.getInstance().destroyStuffMenu(8) });
                            var btnResRemove16 = new qx.ui.menu.Button("Remove 16 resource node", null);
                            btnResRemove16.addListener("execute", function (event) { CityHelper.main.getInstance().destroyStuffMenu(16) });

                            LDRmenu.add(btnResRemove16);
                            LDRmenu.add(btnResRemove8);
                            LDRmenu.add(btnResRemove4);
                            LDRmenu.add(btnResRemove1);


                            var Bmenu = new qx.ui.menu.Menu();

                            var btnBuildOption1 = new qx.ui.menu.Button("Cottage only", null);
                            btnBuildOption1.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(true, false, false, false, false, false, false, false) });
                            var btnBuildOption2 = new qx.ui.menu.Button("Cottage, warehouse and others", null);
                            btnBuildOption2.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(true, true, false, false, false, true, false, false) });
                            var btnBuildOption3 = new qx.ui.menu.Button("All but cottages", null);
                            btnBuildOption3.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(false, true, true, true, true, true, true, true) });
                            var btnBuildOption4 = new qx.ui.menu.Button("All but walls and towers", null);
                            btnBuildOption4.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(true, true, true, true, true, true, false, false) });
                            var btnBuildOption5 = new qx.ui.menu.Button("All but walls and towers and cottages", null);
                            btnBuildOption5.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(false, true, true, true, true, true, false, false) });
                            var btnBuildOption6 = new qx.ui.menu.Button("Off", null);
                            btnBuildOption6.addListener("execute", function (event) { CityHelper.main.getInstance().cityBuild(false, false, false, false, false, false, false, false) });

                            Bmenu.add(btnBuildOption6);
                            Bmenu.add(btnBuildOption5);
                            Bmenu.add(btnBuildOption4);
                            Bmenu.add(btnBuildOption3);
                            Bmenu.add(btnBuildOption2);
                            Bmenu.add(btnBuildOption1);

                            var LWMenu = new qx.ui.menu.Menu();

                            var btwLWOption1 = new qx.ui.menu.Button("Default (4 scout, 3 each tower, 2 each trap)", null);
                            btwLWOption1.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall("D",28) });
                            var btwLWOption2 = new qx.ui.menu.Button("Castle 1 (*C* tag default) (4 scout, 4 each tower, 4 camo)", null);
                            btwLWOption2.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall("C1", 28) });
                            var btwLWOption3 = new qx.ui.menu.Button("Castle 2 (4 scout, 4 ball, 4 ranger, 4 guardian, 8 camo)", null);
                            btwLWOption3.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall("C2", 28) });
                            var btwLWOption4 = new qx.ui.menu.Button("Palace (*P* tag default) (4 scout, 4 ball, 16 camo)", null);
                            btwLWOption4.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall("P", 28) });
                            var btwLWOption5 = new qx.ui.menu.Button("Resource (*R* tag default) (4 scout, 4 ball, 8 pitfall, 8 barricade)", null);
                            btwLWOption5.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall("R", 28) });
                            //                            var btwLWOption6 = new qx.ui.menu.Button("", null);
                            //                            btwLWOption6.addListener("execute", function (event) { CityHelper.main.getInstance().buildWall() });

                            //                            LWMenu.add(btwLWOption6);
                            LWMenu.add(btwLWOption5);
                            LWMenu.add(btwLWOption4);
                            LWMenu.add(btwLWOption3);
                            LWMenu.add(btwLWOption2);
                            LWMenu.add(btwLWOption1);


                            i = 420;
                            btn = new qx.ui.form.MenuButton("CH");
                            btn.set({ width: 25, appearance: "button-text-small" }); //, toolTipText: "CityHelper Menu"
                            btn.setMenu(CHmenu);
                            //btn.setContextMenu(Bmenu);
                            this.btnCHO = btn;
                            this.srvBar.add(this.btnCHO, { top: 2, left: i });
                            i = i + 25;
                        
                            btn = new qx.ui.form.Button("B");
                            btn.set({ width: 15, appearance: "button-text-small", toolTipText: "Set Autobuild" });
                            btn.addListener("click", this.cityBuildButton, this);
                            btn.setContextMenu(Bmenu);
                            this.btnBuild = btn;
                            this.srvBar.add(this.btnBuild, { top: 2, left: i });
                            i = i + 15;
                            btn = new qx.ui.form.Button("T");
                            btn.set({ width: 15, appearance: "button-text-small", toolTipText: "Set Trade" });
                            btn.addListener("click", this.findTrade, this);
                            this.btnTrade = btn;
                            this.srvBar.add(this.btnTrade, { top: 2, left: i });
                            i = i + 15;
                            btn = new qx.ui.form.Button("N");
                            btn.set({ width: 17, appearance: "button-text-small", toolTipText: "Set Name" });
                            btn.addListener("click", this.setName, this);
                            this.btnName = btn;
                            this.srvBar.add(this.btnName, { top: 2, left: i });
                            i = i + 17;

                            btn = new qx.ui.form.Button("LB");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Layout Build Empty spaces" });
                            btn.addListener("click", this.buildStuff, this);
                            btn.setContextMenu(LBmenu);
                            this.btnLB = btn;
                            this.srvBar.add(this.btnLB, { top: 2, left: i });
                            i = i + 25;
                            btn = new qx.ui.form.Button("LM");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Layout Move Buildings to Empty spaces" });
                            btn.addListener("click", this.moveStuff, this);
                            this.btnLM = btn;
                            this.srvBar.add(this.btnLM, { top: 2, left: i });
                            i = i + 25;
                            btn = new qx.ui.form.Button("LDB");
                            btn.set({ width: 30, appearance: "button-text-small", toolTipText: "Layout Destroy Buildings" });
                            btn.addListener("click", this.destroyBuildingDefault, this);
                            btn.setContextMenu(LDBmenu);
                            this.btnLDB = btn;
                            this.srvBar.add(this.btnLDB, { top: 2, left: i });
                            i = i + 30;
                            btn = new qx.ui.form.Button("LDR");
                            btn.set({ width: 30, appearance: "button-text-small", toolTipText: "Layout Destroy Resnodes" });
                            btn.addListener("click", this.destroyStuff, this);
                            btn.setContextMenu(LDRmenu);
                            this.btnLDR = btn;
                            this.srvBar.add(this.btnLDR, { top: 2, left: i });
                            i = i + 30;

                            btn = new qx.ui.form.Button("LW");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Layout BuildWall and Tower template" });
                            btn.addListener("click", this.buildWallAuto, this);
                            btn.setContextMenu(LWMenu);
                            this.btnLW = btn;
                            this.srvBar.add(this.btnLW, { top: 2, left: i });
                            i = i + 25;

                            btn = new qx.ui.form.Button("FB");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Find Bosses" });
                            btn.addListener("click", this.findBosses, this);
                            this.btnFB = btn;
                            this.srvBar.add(this.btnFB, { top: 2, left: i });
                            i = i + 25;

                            btn = new qx.ui.form.Button("NB");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Next Boss" });
                            btn.addListener("click", this.nextBoss, this);
                            this.btnNB = btn;
                            this.srvBar.add(this.btnNB, { top: 2, left: i });
                            i = i + 25;

                            btn = new qx.ui.form.Button("SD");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Send Dungeon" });
                            btn.addListener("click", this.sendDungeon, this);
                            this.btnSD = btn;
                            this.srvBar.add(this.btnSD, { top: 2, left: i });
                            i = i + 25;

                            btn = new qx.ui.form.Button("FP");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Fill and pay buildqueue" });
                            btn.addListener("click", this.fillPayBuildQueue, this);
                            this.btnFPB = btn;
                            this.srvBar.add(this.btnFPB, { top: 2, left: i });
                            i = i + 25;

                            btn = new qx.ui.form.Button("BR");
                            btn.set({ width: 25, appearance: "button-text-small", toolTipText: "Buildround" });
                            btn.addListener("click", this.buildRound, this);
                            this.btnBR = btn;
                            this.srvBar.add(this.btnBR, { top: 2, left: i });
                            i = i + 25;


                            //btn = new qx.ui.form.Button("X");
                            //btn.set({ width: 30, appearance: "button-text-small", toolTipText: "test - dont touch or you might break something!" });
                            //btn.addListener("click", this.testFnc, this);
                            //btn.addListener("contextmenu", this.testFnc2, this);
                            //this.srvBar.add(btn, { top: 2, left: i });
                            //i = i + 35;



                            this.sbBoss = new qx.ui.form.SelectBox().set({
                                width: 140,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Nearest boss mobs, rightclick to hide"
                            });
                            this.sbBoss.addListener("click", function () { this.bossSelect() }, this);
                            this.sbBoss.addListener("changeSelection", function () { this.bossSelect() }, this);
                            this.sbBoss.addListener("contextmenu", function () { this.bossSelectHide() }, this);
                            this.app.desktop.add(this.sbBoss, { left: 405, top: 145 });
                            this.sbBoss.exclude();

                            this.sbLawless = new qx.ui.form.SelectBox().set({
                                width: 80,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Nearest lawless cities, rightclick to hide"
                            });
                            this.sbLawless.addListener("click", function () { this.lawlessSelect() }, this);
                            this.sbLawless.addListener("changeSelection", function () { this.lawlessSelect() }, this);
                            this.sbLawless.addListener("contextmenu", function () { this.lawlessSelectHide() }, this);
                            this.app.desktop.add(this.sbLawless, { left: 550, top: 145 });
                            this.sbLawless.exclude();

                            this.sbDungeon = new qx.ui.form.SelectBox().set({
                                width: 270,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Nearest dungeon, rightclick to hide"
                            });
                            this.sbDungeon.addListener("click", function () { this.dungeonSelect() }, this);
                            this.sbDungeon.addListener("changeSelection", function () { this.dungeonSelect() }, this);
                            this.sbDungeon.addListener("contextmenu", function () { this.dungeonSelectHide() }, this);
                            this.app.desktop.add(this.sbDungeon, { left: 635, top: 145 });
                            this.sbDungeon.exclude();

                            this.sbType = new qx.ui.form.SelectBox().set({
                                width: 60,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Limit boss and dungeon type, rightclick to hide"
                            });
                            this.sbType.addListener("changeSelection", function () { this.typeSelect() }, this);
                            this.sbType.addListener("contextmenu", function () { this.typeSelectHide() }, this);
                            this.app.desktop.add(this.sbType, { left: 405, top: 180 });
                            this.sbType.exclude();

                            this.sbLevel = new qx.ui.form.SelectBox().set({
                                width: 60,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Limit boss and dungeon level to at least.., rightclick to hide"
                            });
                            this.sbLevel.addListener("changeSelection", function () { this.levelSelect() }, this);
                            this.sbLevel.addListener("contextmenu", function () { this.levelSelectHide() }, this);
                            this.app.desktop.add(this.sbLevel, { left: 470, top: 180 });
                            this.sbLevel.exclude();

                            this.sbRatio = new qx.ui.form.SelectBox().set({
                                width: 90,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Limit dungeon ratio to sendable for cities or castles.., rightclick to hide"
                            });
                            this.sbRatio.addListener("changeSelection", function () { this.ratioSelect() }, this);
                            this.sbRatio.addListener("contextmenu", function () { this.ratioSelectHide() }, this);
                            this.app.desktop.add(this.sbRatio, { left: 535, top: 180 });
                            this.sbRatio.exclude();


                            btn = new qx.ui.form.Button("S");
                            btn.set({ width: 15, appearance: "button-text-small", toolTipText: "Send Dungeon" });
                            btn.addListener("click", this.sendDungeon, this);
                            this.btnSDDO = btn;

                            this.app.desktop.add(this.btnSDDO, { left: 390, top: 370 });
                            this.btnSDDO.exclude();

                            btn = new qx.ui.form.Button("B");
                            btn.set({ width: 15, appearance: "button-text-small", toolTipText: "Send Boss" });
                            btn.addListener("click", this.sendBosses, this);
                            this.btnSBDO = btn;

                            this.app.desktop.add(this.btnSBDO, { left: 390, top: 450 });
                            this.btnSBDO.exclude();

                        },
                        testFnc: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };
                            this.ToolTimer.start(this.Tool, null, this, null, 30000);

                        },
                        testFnc2: function (e) {
                            console.log("TestFnc2");
                            this.WC.updateReqSupList();

                        },
                        Tool: function () {
                            //curcityId = webfrontend.data.City.getInstance().getId()
                            curcityId = curcityId = webfrontend.data.City.getInstance().getId()

                            settle = {
                                cityid: curcityId,
                                units: [{ "t": "19", "c": 1 }],
                                targetPlayer: "",
                                targetCity: "482:156",
                                order: 9,
                                transport: 1,
                                createCity: "482156",
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: 0,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, this._onToolDone, settle);

                        },
                        _onToolDone: function (isOk, errorCode, context) {
                            try {
                                //this.sendCommandWaitForReply = false;
                                console.log("_onSendDone: result:", isOk, "errorcode:", errorCode);
                                //this.sendCmd();
                                if (errorCode.hasOwnProperty("r0")) {
                                    if (errorCode["r0"] == 0) {

                                        //all ok
                                        return;
                                    } else {
                                        this.ToolTimer.start(this.Tool, null, this, null, 30000);

                                    };
                                    //comm error			
                                } else {
                                }
                            } catch (e) {
                            }
                        },
                        getTroops: function () {
                            um = webfrontend.net.UpdateManager.getInstance();
                            //                            console.log(um);
                            reqid = um.requestCounter;
                            um.requestCounter++;
                            command = { requestid: reqid, requests: "COMO:a" };
                            console.log(command);
                            webfrontend.net.CommandManager.getInstance().sendCommand("poll", command, this, this.getDataResult);
                            this.WC.LastCity = "";
                        },
                        WCOpen: function (e) {
                            //                            y = 328;
                            this.WC.showWC();

                        },
                        validateQueue: function () {
                            console.log("validateQueue: Start");
                            value = false;
                            var curcityId = webfrontend.data.City.getInstance().getId()
                            var cgi = webfrontend.data.City.getInstance();
                            buildQueue = webfrontend.data.City.getInstance().buildQueue;
                            var Player = webfrontend.data.Player.getInstance();
                            if (buildQueue == null) {
                                buildQueue = [];
                            };
                            buildCount = 0;
                            buildings = {};
                            for (bqi = 0; bqi < buildQueue.length; bqi++) {
                                if (buildQueue != null) {
                                    if (buildQueue[bqi].type != undefined) {
                                        if (this.buildings[buildQueue[bqi].building] != undefined && (buildQueue[bqi].state == 1))
                                        {
                                            buildCount++;
                                            buildings[buildQueue[bqi].building] = {};
                                        };
                                        if (this.buildings[buildQueue[bqi].building] != undefined && (buildQueue[bqi].state == 5)) {
                                            value = true;

                                            order = {
                                                bid: buildQueue[bqi].building,
                                                cityid: curcityId,
                                                queueid: buildQueue[bqi].id
                                            };
                                            this.sendCommandBuffer.push({ a: "CancelBuild", act: "cancelBuild", p: order });
                                            //                                        console.log(buildid + " " + building);
                                            if (!this.sendCommandBusy) {
                                                this.sendCommandBusy = true;
                                                this.sendCmd();
                                            };
                                        };
                                    };
                                };
                            };
                            buildlength = 0;
                            for (var i in buildings)
                            {
                                buildlength++;
                            };
                            //console.log("validateQueue:", buildCount, buildings, buildlength, cgi.getBuildingCount() - cgi.getBuildingLimit());
                            if ((buildlength == (cgi.getBuildingCount() - cgi.getBuildingLimit())) && buildCount == Player.getMaxBuildQueueSize()) {
                                //BuildQueue stuck
                                console.log("validateQueue: buildQueue stuck", buildCount, buildings);
                                order = {
                                    bid: buildQueue[0].building,
                                    cityid: curcityId,
                                    queueid: buildQueue[0].id
                                };
                                this.sendCommandBuffer.push({ a: "CancelBuild", act: "cancelBuild", p: order });
                                //                                        console.log(buildid + " " + building);
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                                this.destroyBuilding("A", 1);
                                value = true;

                            };
                            console.log("validateQueue: End", value);

                            return value;
                        },
                        isInQueue: function (buildid) {
                            //console.log("isInQueue: Start");
                            value = false;
                            var curcityId = webfrontend.data.City.getInstance().getId()
                            var cgi = webfrontend.data.City.getInstance();
                            buildQueue = webfrontend.data.City.getInstance().buildQueue;
                            var Player = webfrontend.data.Player.getInstance();
                            if (buildQueue == null) {
                                buildQueue = [];
                            };
                            for (bqi = 0; bqi < buildQueue.length; bqi++) {
                                if (buildQueue != null) {
                                    if (buildQueue[bqi].type != undefined) {
                                        if (this.buildings[buildQueue[bqi].building] == buildid) {
                                            value = true;
                                            console.log("isInQueue: Found", value);
                                            break;
                                        };
                                    };
                                };
                            };
                            //console.log("isInQueue: End", value);
                            return value;
                        },
                        buildRound: function (e) {
                            this.buildRoundInfo = { city: "", THUpgrade: false, MTUpgrade: false, CottageUpgrade: false, WallUpgrade: false, Navy:false, NavyBarracks:false, Count:0 };
                            if (e.getButton() == "right") {
                                this.buildRoundActive = !this.buildRoundActive;
                                if (this.buildRoundActive == true) {
                                    this.buildRoundStartCity = webfrontend.data.City.getInstance().getId()
                                    console.log("Starting at: " + this.buildRoundStartCity + " " + webfrontend.data.City.getInstance().getName());
                                    this.btnBR.set({ toolTipText: "Buildround - Active" });
                                    this.timerBR.start(this.buildRoundNext, null, this, null, 1000);
                                    this.buildRoundStartDo();
                                } else {
                                    this.btnBR.set({ toolTipText: "Buildround" });
                                };
                                return;
                            };
                            this.btnBR.set({ toolTipText: "Buildround" });
                            this.buildRoundActive = false;
                            this.buildRoundStart();

                        },
                        buildRoundStart: function () {
                            if (this.buildRoundActive == true) {
                                console.log("Checking: " + webfrontend.data.City.getInstance().getId() + " " + webfrontend.data.City.getInstance().getName());
                                if (this.buildRoundStartCity == webfrontend.data.City.getInstance().getId()) {
                                    WTime = 1800000 + Math.floor(Math.random() * 3600000);
                                    this.BRWaitTime = Math.floor(WTime / 60000);
                                    //this.timerBR.start(this.buildRoundNext, null, this, null, WTime);
                                    console.log("Through round, waiting " + Math.floor(WTime / 60000) + " minutes");
                                    this.buildRoundWait();
                                } else {
                                    this.timerBR.start(this.buildRoundNext, null, this, null, 1000);
                                };
                            };
                            this.buildRoundStartDo();
                        },
                        buildRoundWait: function () {
                            if (this.buildRoundActive == true) {
                                if (this.BRWaitTime <= 0) {
                                    this.app.setMainView("c", this.buildRoundStartCity, -1, -1);
                                    this.timerBR.start(this.buildRoundNext, null, this, null, 1000);
                                    this.btnBR.set({ toolTipText: "Buildround - Active" });
                                } else {
                                    btntxt = "Buildround - Waiting " + this.BRWaitTime + " minutes";
                                    this.timerBR.start(this.buildRoundWait, null, this, null, 60000);
                                    this.btnBR.set({ toolTipText: btntxt });
                                    this.BRWaitTime = this.BRWaitTime - 1;
                                };
                            };
                        },
                        buildRoundStartDo: function () {
                            CurrentTime = webfrontend.Util.getCurrentTime();
                            buildQueue = webfrontend.data.City.getInstance().buildQueue;
                            if (buildQueue == null) {
                                    buildQueue = [];
                            };
                            var Player = webfrontend.data.Player.getInstance();
                            if ((CurrentTime > (this.lastBuildround + 1000))) {
                                console.log("buildRoundStartDo: Too early call");
                                return;
                                //Too early
                            } else if (buildQueue.length == Player.getMaxBuildQueueSize()) {
                                this.doingBuildround = false;
                                console.log("buildRoundStartDo: BuildQueue full");
                                this.validateQueue()
                                return;
                            } else {
                                this.lastBuildround = CurrentTime;

                                this.doingBuildround = true;
                                this.app.setMainView("c", webfrontend.data.City.getInstance().getId(), -1, -1);

                                var cgi = webfrontend.data.City.getInstance();
                                var cityid = cgi.getId();
                                var cities = Player.cities;

                                
                                if (this.buildRoundInfo.city == cityid && this.buildRoundInfo.next == true) {
                                    console.log("buildRoundStartDo: Next city not ready");
                                    if (this.buildRoundActive == true) {
                                        this.buildRoundInfo.Count++;
                                        if (this.buildRoundInfo.Count > 30) {
                                            console.log("buildRoundStartDo: Stuck for 30 secs, forcing next city");
                                            cBar = this.app.cityBar;
                                            cBar.nextButton.execute();
                                            this.buildRoundInfo.Count = 0;
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);

                                            return;
                                        } else {
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                            return;
                                        };
                                    }
                                    return;

                                };
                                if (this.validateQueue()) {
                                    console.log("buildRoundStartDo: QueueValidated");
                                    this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                    return;

                                };

                                if (this.buildRoundInfo.city != cityid) {
                                    this.buildRoundInfo = { city: cityid, next: false, THUpgrade: false, MTUpgrade: false, CottageUpgrade: false, WallUpgrade: false, Navy: false, NavyBarracks: false, Count: 0 };
                                };
                                if (this.sendCommandBusy == true) {
                                    console.log("buildRoundStartDo: Waiting for sendCmd");
                                    if (this.buildRoundActive == true) {
                                        if (this.buildRoundInfo.Count > 60) {
                                            console.log("buildRoundStartDo: Stuck forcing next city");
                                            this.buildRoundInfo.next = true;
                                            cBar = this.app.cityBar;
                                            cBar.nextButton.execute();
                                            this.buildRoundInfo.next = true;
                                            this.timerBR.start(this.buildRoundNextWait, null, this, null, 4000);
                                            return;

                                        } else {
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                            this.buildRoundInfo.Count++;
                                            return;

                                        }
                                    };
                                    return;
                                };
                                if ((this.layout.cityId != cityid)) {
                                    console.log("buildRoundStartDo: Waiting for city");
                                    if (this.buildRoundActive == true) {
                                        if (this.buildRoundInfo.Count > 60) {
                                            console.log("buildRoundStartDo: Stuck forcing next city");
                                            this.buildRoundInfo.next = true;
                                            cBar = this.app.cityBar;
                                            cBar.nextButton.execute();
                                            this.buildRoundInfo.next = true;
                                            this.timerBR.start(this.buildRoundNextWait, null, this, null, 4000);
                                            return;

                                        } else {
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                            this.buildRoundInfo.Count++;
                                            return;

                                        }
                                    };
                                    return;
                                };
                                if (this.activeButton[4]) {
                                    this.moveStuff()
                                    this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                    return;
                                };
                                if (!(cgi.getAutoBuildOptionDefense()) && !(cgi.getAutoBuildOptionEconomy()) && (cgi.getAutoBuildTypeFlags() == 255)) {
                                    this.cityBuild(true, true, false, false, false, true, false, false);
                                    console.log("buildRoundStartDo: City " + webfrontend.data.City.getInstance().getName() + " was not set to build anything, activated buildminister");
                                    var win = new qx.ui.window.Window("City " + webfrontend.data.City.getInstance().getName() + " was not set to build anything, activated buildminister").set({ height: 10, width: 600 });

                                    this.app.desktop.add(win);
                                    win.open();
                                    win.center();
                                };

                                this.somethingbuilt = false;
                                //console.log("Buildspeed limit " + this.options.building.buildspeed);
                                if ((cgi.getBuildTimePercentMod() > this.options.building.buildspeed) || ((cgi.getAutoBuildTypeFlags() & 2) == 0)) {
                                    if ((cgi.getBuildTimePercentMod() > this.options.building.buildspeed) && ((cgi.getAutoBuildTypeFlags() & 2) == 2)) {
                                        ref = this.parseReference(cities[cityid].reference);
                                        if (ref.isCastle) {
                                            if (!ref.isPalace) {
                                                console.log("stopping cottages");
                                                if (!this.sendCommandBusy) {
                                                    this.cityBuild(false, true, true, true, true, true, true, true);
                                                };
                                            };
                                        } else {
                                            console.log("stopping cottages");
                                            if (!this.sendCommandBusy) {
                                                this.cityBuild(false, true, true, true, true, true, false, false);
                                            };
                                        };
                                    };
                                    if (buildQueue.length < Player.getMaxBuildQueueSize()) {

                                        if ((cgi.getTownhallLevel() < 10) && (cgi.getIsUpgradingTownHall() == false) && (this.buildRoundInfo.THUpgrade == false)) {
                                            console.log("Upgrading from TH " + cgi.getTownhallLevel());
                                            this.buildRoundInfo.THUpgrade = true;
                                            //console.log(this.sendCommandBuffer);
                                            this.upgradeMenuStuff("T", 1, 10); //upgrade townhall
                                        } else if ((cgi.getMageTowerLevel() < 10) && (this.buildRoundInfo.MTUpgrade == false)) { //&& (cgi.getMageTowerLevel() > 0)
                                            this.upgradeMenuStuff("MT", 1, 10); //upgrade magetower
                                            this.buildRoundInfo.MTUpgrade = true;
                                        } else if (this.activeButton[7] && this.options.building.autoBuildWalls && (this.buildRoundInfo.WallUpgrade == false)) {
                                            this.buildRoundInfo.WallUpgrade = true;
                                            this.buildWall("Auto", Player.getMaxBuildQueueSize() - buildQueue.length);
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                            return;
                                        } else if (this.buildRoundInfo.CottageUpgrade == false) {
                                            this.buildRoundInfo.CottageUpgrade = true;
                                            this.upgradeMenuStuff("C", 1, 10); //upgrade in layout cottages
                                        }
                                        if (this.somethingbuilt == true) {
                                            this.timerBRS.start(this.buildRoundStartDo, null, this, null, 3000);
                                            return;
                                        };
                                    };
                                };
                                if (buildQueue.length < Player.getMaxBuildQueueSize()) {

                                    if (!(this.buildCount[19] == undefined) && (this.buildRoundInfo.Navy == false)) {
                                        this.buildRoundInfo.Navy = true;
                                        if ((this.buildCount[19].city < this.buildCount[19].layout) && (cgi.getTownhallLevel() == 10)) {
                                            free = cgi.getBuildingLimit() - cgi.getBuildingCount();
                                            this.buildMenuStuff("N", Math.min(free, this.buildCount[19].layout - this.buildCount[19].city));
                                        };
                                        if (!(this.buildCount[14] == undefined) && (this.buildRoundInfo.NavyBarracks == false)) {
                                            this.buildRoundInfo.NavyBarracks = true;
                                            if ((this.buildCount[14].city < this.buildCount[14].layout)) {
                                                if (cgi.getBuildingCount() < cgi.getBuildingLimit()) {
                                                    free = cgi.getBuildingLimit() - cgi.getBuildingCount();
                                                    this.buildMenuStuff("NB", Math.min(free, 18));
                                                };
                                            };
                                        };
                                    };
                                    if (this.somethingbuilt == true) {
                                        this.timerBRS.start(this.buildRoundStartDo, null, this, null, 3000);
                                    } else {
                                        if (cgi.getBuildingCount() < cgi.getBuildingLimit()) {
                                            this.buildStuffDo()
                                            this.doingBuildround = false;
                                        } else {
                                            var curcityId = webfrontend.data.City.getInstance().getId()
                                            var fill = {
                                                cityid: curcityId
                                            };
                                            if (!this.sendCommandBusy) {
                                                if (this.options.ministers.build) {
                                                    webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", fill, this, this.buildRoundPay);
                                                } else {
                                                    this.upgradeMenuStuff("A", 6, 2);
                                                    this.upgradeMenuStuff("A", 6, 3);
                                                    this.upgradeMenuStuff("A", 6, 4);
                                                    this.upgradeMenuStuff("A", 6, 5);
                                                    this.upgradeMenuStuff("A", 6, 6);
                                                    this.upgradeMenuStuff("A", 6, 7);
                                                    this.upgradeMenuStuff("A", 6, 8);
                                                    this.upgradeMenuStuff("A", 6, 9);
                                                    this.upgradeMenuStuff("A", 6, 10);
                                                    this.buildRoundPay();
                                                };
                                            } else {
                                                this.timerBRS.start(this.buildRoundStartDo, null, this, null, 1000);
                                                return;
                                            };
                                        };
                                    };
                                } else {
                                    this.doingBuildround = false;

                                };
                            };
                        },
                        buildRoundPay: function () {
                            var curcityId = webfrontend.data.City.getInstance().getId()
                            var fill = {
                                cityid: curcityId
                            };
                            if (!this.sendCommandBusy) {
                                if (this.options.ministers.build) {

                                    webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", fill, this, this.buildRoundAdd);
                                } else {
                                    this.buildRoundAdd;
                                };
                            } else {
                                this.timerBRS.start(this.buildRoundPay, null, this, null, 1000);
                            };
                            //                                        console.log(cgi.getBuildingCount() + " " + cgi.getBuildingLimit() + " " + buildQueue.length + " " + this.sendCommandBuffer.length);
                            //  if (buildQueue.length >= Player.getMaxBuildQueueSize()) {

                        },
                        buildRoundAdd: function () {
                            var curcityId = webfrontend.data.City.getInstance().getId()
                            buildQueue = webfrontend.data.City.getInstance().buildQueue;
                            var cgi = webfrontend.data.City.getInstance();
                            Player = webfrontend.data.Player.getInstance();
                            if (buildQueue == null) {
                                buildQueue = [];
                            };
                            if (buildQueue.length < (Player.getMaxBuildQueueSize()-1)) {
                                free = Player.getMaxBuildQueueSize() - buildQueue.length;
                                freeBuild = Math.min(cgi.getBuildingLimit() - cgi.getBuildingCount(), 0);
                                resdcount = 0;
                                for (bqi = 0; bqi < buildQueue.length; bqi++)
                                {
                                    if (buildQueue[bqi].type != undefined) {
                                        if (buildQueue[bqi].type >= 27 && buildQueue[bqi].type <= 30) {
                                            resdcount++;
                                        };
                                    };
                                };
                                if (resdcount > 5) {
                                    maxresd = 0;
                                } else {
                                    maxresd = 6 - resdcount;
                                };

                                if (this.activeButton[6]) {
                                    push = Math.floor(free / 5 * 2);
                                    //free = free - 4*push;
                                    if (push > 0 && (this.activeButton[3] || this.activeButton[5])) {
                                        this.destroyBuilding("A",  push - freeBuild);
                                        this.buildMenuStuff("A",  push);
                                        free = free - (push * 2);
                                    };
                                    this.destroyStuffMenu(Math.min(maxresd, free));
                                } else {
                                    push = Math.floor(free / 2);
                                    if (push > 0 && (this.activeButton[3] || this.activeButton[5])) {
                                        this.destroyBuilding("A", push - freeBuild);
                                        this.buildMenuStuff("A", push);
                                        free = free - (push * 2);
                                    };
                                };
                            };
                            this.doingBuildround = false;
                            //                                        console.log(cgi.getBuildingCount() + " " + cgi.getBuildingLimit() + " " + buildQueue.length + " " + this.sendCommandBuffer.length);
                            //  if (buildQueue.length >= Player.getMaxBuildQueueSize()) {

                        },
                        buildRoundNext: function () {
                            if (this.buildRoundActive == true) {
                                var curcityId = webfrontend.data.City.getInstance().getId()
                                buildQueue = webfrontend.data.City.getInstance().buildQueue;
                                var cgi = webfrontend.data.City.getInstance();
                                Player = webfrontend.data.Player.getInstance();
                                if (buildQueue == null) {
                                    buildQueue = [];
                                };

                                if ((((buildQueue.length == Player.getMaxBuildQueueSize()) || (this.sendCommandBuffer.length == 0)) && (this.buildRoundActive == true)) && this.doingBuildround == false) {
                                    if (webfrontend.data.City.getInstance().buildQueue == null) {
                                        console.log("City " + webfrontend.data.City.getInstance().getName() + " is not building anything");
                                        var win = new qx.ui.window.Window("City " + webfrontend.data.City.getInstance().getName() + " is not building anything").set({ height: 10, width: 400 });
                                        this.app.desktop.add(win);
                                        win.open();
                                        win.center();
                                    } else if ((buildQueue.length < (Player.getMaxBuildQueueSize()-3)) && !(this.activeButton[3]) && !(this.activeButton[4]) && !(this.activeButton[5]) && !(this.activeButton[5])) {
                                        console.log("City " + webfrontend.data.City.getInstance().getName() + " seems to be finished");
                                        var win = new qx.ui.window.Window("City " + webfrontend.data.City.getInstance().getName() + " seems to be finished").set({ height: 10, width: 300 });
                                        this.app.desktop.add(win);
                                        win.open();
                                        win.center();
                                    };
                                    this.timerBR.start(this.buildRoundNextMove, null, this, null, 4000);
                                } else {
                                    this.timerBR.start(this.buildRoundNext, null, this, null, 1000);
                                };
                            };
                        },
                        buildRoundNextMove: function () {
                            cBar = this.app.cityBar;
                            cBar.nextButton.execute();
                            this.buildRoundInfo.next = true;
                            this.timerBR.start(this.buildRoundNextWait, null, this, null, 4000);

                        },
                        buildRoundNextWait: function () {
                            this.buildRoundStart();
                            //this.timerBR.start(this.buildRoundNext, null, this, null, 1000);

                        },
                        toggleCO: function () {
                            //                            if (e.getButton() == "right") {
                            //                                return;
                            //                            };
                            if (this.COActive) {
                                this.COTable.exclude();
                                this.COActive = false;

                            }
                            else {
                                this.COActive = true;

                                this.COTable.show()
                                this.COUpdate();
                            };



                        },
                        COUpdate: function () {
                            if (this.app.visMain.mapmode == "c") {
                                //&& (this.layout.cc != this.COlayout.cc) && (this.layout.ss != this.COlayout.ss) && (this.layout.cityId != this.COlayout.cityId)
                                if (this.COActive) {
                                    this.COlayout.cc = this.layout.cc;
                                    this.COlayout.ss = this.layout.ss;
                                    this.COlayout.cityId = this.layout.cityId;
                                    var resMain = webfrontend.res.Main.getInstance();
                                    // table model
                                    this.COTable.show()

                                    var rowData = [];
                                    //                                console.log(this.buildCount);
                                    for (var id in this.buildCount) {
                                        if (resMain.buildings.hasOwnProperty(id)) {
                                            if (id != 23 && (id < 38 || id > 46) && (id < 27 || id > 30))
                                                rowData.push([resMain.buildings[id].dn, this.buildCount[id].city, this.buildCount[id].layout]);
                                            //                                        console.log(resMain.buildings[id].dn + " " + id);
                                        } else {
                                            if (id == 99) {
                                                rowData.push(["Towers", 24 - this.buildCount[id].city, 24]);
                                                //                                        } else if (id == 900) {
                                                //                                            rowData.push(["Wood", this.buildCount[id].city, this.buildCount[id].layout]);
                                                //                                        } else if (id == 901) {
                                                //                                            rowData.push(["Stone", this.buildCount[id].city, this.buildCount[id].layout]);
                                                //                                        } else if (id == 902) {
                                                //                                            rowData.push(["Iron", this.buildCount[id].city, this.buildCount[id].layout]);
                                                //                                        } else if (id == 903) {
                                                //                                            rowData.push(["Lake", this.buildCount[id].city, this.buildCount[id].layout]);
                                                //                                        } else {
                                                //                                            console.log(id);
                                                //                                            console.log(this.buildCount[id]);
                                            };
                                        };
                                    }
                                    countRes = 0;
                                    countResL = 0;
                                    countBuild = 0;
                                    for (var key in this.buildOccupied) {
                                        if (this.buildOccupied[key].city >= 900 && this.buildOccupied[key].city <= 903) {
                                            countRes++;
                                            if (this.buildOccupied[key].layout != 98) {
                                                countBuild++;
                                            };
                                        } else if (this.buildOccupied[key].city > 30 && this.buildOccupied[key].city < 27) {
                                            countBuild++;
                                        } else if (this.buildOccupied[key].city <= 30 && this.buildOccupied[key].city >= 27) {
                                            countRes++;
                                            countResL++;
                                            if (this.buildOccupied[key].layout != 98) {
                                                countBuild++;
                                            };
                                        };
                                    };
                                    if (countRes > 0) {
                                        rowData.push(["Res undestroyed", countRes, countResL]);
                                    };
                                    if (countBuild > 0) {
                                        rowData.push(["Buildings blocked", countBuild, 0]);
                                    };
                                    rowData.sort(function (a, b) {
                                        return (Math.abs(b[1] - b[2]) - Math.abs(a[1] - a[2]));
                                    });
                                    for (row in rowData) {
                                        if (rowData[row][1] != rowData[row][2]) {
                                            rowData[row][0] = "*" + rowData[row][0];
                                        };
                                    };
                                    this.COTableModel.setData(rowData);
                                    // make second column editable
                                    //                                tableModel.setColumnEditable(1, true);

                                    // table
                                    var tableSize = rowData.length * 23 + 25;
                                    this.COTable.set({ height: tableSize });
                                } else if (this.COActive == false) {
                                    this.COTable.exclude();

                                };
                            } else {
                                this.COTable.exclude();

                            };
                        },
                        fillPayBuildQueue: function (e) {

                            if (e.getButton() == "right") {
                                return;
                            };
                            var curcityId = webfrontend.data.City.getInstance().getId()
                            var fill = {
                                cityid: curcityId
                            };
                            if (this.options.ministers.build) {
                                this.sendCommandBuffer.push({ a: "BuildingQueueFill", act: "fillqueue", p: fill });
                                this.sendCommandBuffer.push({ a: "BuildingQueuePayAll", act: "payqueue", p: fill });
                                //                                        console.log(buildid + " " + building);
                            } else {
                                this.upgradeMenuStuff("A", 6, 2);
                                this.upgradeMenuStuff("A", 6, 3);
                                this.upgradeMenuStuff("A", 6, 4);
                                this.upgradeMenuStuff("A", 6, 5);
                                this.upgradeMenuStuff("A", 6, 6);
                                this.upgradeMenuStuff("A", 6, 7);
                                this.upgradeMenuStuff("A", 6, 8);
                                this.upgradeMenuStuff("A", 6, 9);
                                this.upgradeMenuStuff("A", 6, 10);
                            };
                            if (!this.sendCommandBusy) {
                                this.sendCommandBusy = true;
                                this.sendCmd();
                            }


                        },
                        sendDungeon: function (e) {

                            if (e.getButton() == "right") {
                                return;
                            };
                            this.sendDungeonWork();

                        },
                        sendBosses: function (e) {

                            if (e.getButton() == "right") {
                                return;
                            };
                            this.sendBossesWork();

                        },
                        sendDungeonWork: function () {
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();
                            var curX = (cId & 0xFFFF);
                            var curY = (cId >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);

                            cx = Math.floor(curX / 32);
                            cy = Math.floor(curY / 32);
                            cell = cx + (cy * 32);

                            if (this.doGlobal == false) {
                                cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                            }
                            else {
                                cxmin = 0;
                                cymin = 0;
                                cxmax = 19;
                                cymax = 19;
                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);


                            if (cId == this.distCID) {

                                if (!(this.sbDungeon.getSelection()[0] == undefined)) {
                                    var target = this.sbDungeon.getSelection()[0].getModel();
                                    for (ccy = cymin; ccy <= cymax; ccy++) {

                                        for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                            cell = ccx + (ccy * 32);
                                            if (!(this.dungeonlist[cell] == undefined)) {


                                                for (b = 0; b < this.dungeonlist[cell].length; b++) {
                                                    if (target == this.dungeonlist[cell][b].id) {
                                                        this.sendAll(this.dungeonlist[cell][b].type, this.dungeonlist[cell][b].level, true, this.dungeonlist[cell][b].x, this.dungeonlist[cell][b].y);
                                                        break;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            } else {
                                this.timerSD.start(this.sendDungeonWork, null, this, null, 500);
                                this.updateDistance();
                            };

                        },
                        sendBossesWork: function () {
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();
                            var curX = (cId & 0xFFFF);
                            var curY = (cId >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);

                            cx = Math.floor(curX / 32);
                            cy = Math.floor(curY / 32);
                            cell = cx + (cy * 32);

                            if (this.doGlobal == false) {
                                cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                            }
                            else {
                                cxmin = 0;
                                cymin = 0;
                                cxmax = 19;
                                cymax = 19;
                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);


                            str = ""


                            if (cId == this.distCID) {
                                if (!(this.sbBoss.getSelection()[0] == undefined)) {
                                    var target = this.sbBoss.getSelection()[0].getModel();
                                    //console.log("Target: " + target);
                                    for (ccy = cymin; ccy <= cymax; ccy++) {

                                        for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                            cell = ccx + (ccy * 32);
                                            if (!(this.bosslist[cell] == undefined)) {
                                                for (b = 0; b < this.bosslist[cell].length; b++) {
                                                    if (target == this.bosslist[cell][b].id) {
                                                        this.sendBoss(this.bosslist[cell][b].type, this.bosslist[cell][b].level, true, this.bosslist[cell][b].x, this.bosslist[cell][b].y);
                                                        break;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } else {
                                    this.findBosses('');
                                };
                            } else {
                                //this.timerSD.start(this.sendBossesWork, null, this, null, 500);
                                this.updateDistance();
                            };

                        },
                        sendAll: function (dungeonType, dungeonLevel, sendall, posX, posY) {
                            var resMain = webfrontend.res.Main.getInstance();
                            var count;
                            var city = webfrontend.data.City.getInstance();
                            var units = [];



                            if (dungeonType == 3 || dungeonType == 4 || dungeonType == 5) {
                                var cap = 0;
                                if (city.getUnits() != null) {
                                    for (var key in city.getUnits()) {
                                        if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                            var unit = (city.getUnits())[key];
                                            var thiscap = unit.count * resMain.units[key].c;
                                            cap = cap + thiscap;
                                        }
                                    }
                                    var ratio = (cap / this.options.raiding.lootlevel[dungeonLevel]);
                                    var calcratio = ratio;
                                    var cityunits = {};
                                    for (var key in city.getUnits()) {
                                        var unit = (city.getUnits())[key];
                                        cityunits[key] = { count: unit.count };
                                    };
                                    while (ratio >= this.options.raiding.allRatio) {
                                        units = [];

                                        if ((ratio - Math.floor(ratio)) >= this.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (var key in cityunits) {
                                                if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                                    var unit = (cityunits)[key];
                                                    count = unit.count / ratio;
                                                    count = Math.ceil(count);
                                                    cityunits[key].count = cityunits[key].count - count;
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - 1;
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(units, 1, 1, posX, posY);
                                        }
                                        else if ((ratio - Math.floor(ratio)) < this.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (var key in cityunits) {
                                                if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                                    var unit = (cityunits)[key];
                                                    count = unit.count / Math.floor(ratio);
                                                    count = Math.ceil(count);
                                                    cityunits[key].count = cityunits[key].count - count;
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - (ratio / Math.floor(ratio));
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(units, 1, 1, posX, posY);
                                        }
                                        else if (ratio >= this.options.raiding.allRatio) {
                                            for (var key in cityunits) {
                                                if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                                    var unit = (cityunits)[key];
                                                    count = Math.ceil(unit.count / ratio);
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            ratio = 0;
                                            this.sendRaidDelay(units, 1, 1, posX, posY);
                                        }

                                    }
                                }
                            }
                            else if (dungeonType == 2) {
                                var cap = 0;
                                if (city.getUnits() != null) {
                                    for (var key in city.getUnits()) {
                                        if (key >= 16 && key <= 17) {
                                            var unit = (city.getUnits())[key];
                                            var thiscap = unit.count * resMain.units[key].c;
                                            cap = cap + thiscap;
                                        }
                                    }
                                    var ratio = (cap / this.options.raiding.lootlevel[dungeonLevel]);
                                    var calcratio = ratio;
                                    var cityunits = {};
                                    for (var key in city.getUnits()) {
                                        var unit = (city.getUnits())[key];
                                        cityunits[key] = { count: unit.count };
                                    };
                                    while (ratio >= this.options.raiding.allRatio) {
                                        units = [];

                                        if ((ratio - Math.floor(ratio)) >= this.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (var key in cityunits) {
                                                if (key >= 16 && key <= 17) {
                                                    var unit = (cityunits)[key];
                                                    count = unit.count / ratio;
                                                    count = Math.ceil(count);
                                                    cityunits[key].count = cityunits[key].count - count;
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - 1;
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(units, 2, 1, posX, posY);

                                        }
                                        else if ((ratio - Math.floor(ratio)) < this.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (var key in cityunits) {
                                                if (key >= 16 && key <= 17) {
                                                    var unit = (cityunits)[key];
                                                    count = unit.count / Math.floor(ratio);
                                                    count = Math.ceil(count);
                                                    cityunits[key].count = cityunits[key].count - count;
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - (ratio / Math.floor(ratio));
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(units, 2, 1, posX, posY);

                                        }
                                        else if (ratio >= this.options.raiding.allRatio) {
                                            for (var key in city.getUnits()) {
                                                if (key >= 16 && key <= 17) {
                                                    var unit = (cityunits)[key];
                                                    //                                                    count = unit.count;
                                                    count = Math.ceil(unit.count / ratio);
                                                    if (!(count == 0)) {
                                                        units.push({ t: key, c: count });
                                                    }
                                                }
                                            }
                                            ratio = 0;
                                            this.sendRaidDelay(units, 2, 1, posX, posY);
                                        }
                                    }
                                }
                            }
                            else if ((dungeonType >= 6) && (dungeonType <= 8)) {
                                var atk = 0;
                                if (city.getUnits() != null) {
                                    for (var key in city.getUnits()) {
                                        if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                            var unit = (city.getUnits())[key];
                                            var thisatk = unit.count * resMain.units[key].av * (100 + this.Tech[key]) / 100;
                                            atk = atk + thisatk;
                                        }
                                    }
                                    var ratio = (atk / this.bossAtk[dungeonLevel]);
                                    for (var key in city.getUnits()) {
                                        if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                            var unit = (city.getUnits())[key];
                                            count = unit.count / ratio;
                                            count = Math.ceil(count);
                                            if (!(count == 0)) {
                                                units.push({ t: key, c: count });
                                            }
                                        }
                                    }
                                }
                                this.sendRaid(units, 1, 0, posX, posY);
                            }
                            else if (dungeonType == 12) {
                                var atk = 0;
                                if (city.getUnits() != null) {
                                    for (var key in city.getUnits()) {
                                        if (key == 16 || key == 17) {
                                            var unit = (city.getUnits())[key];
                                            var thisatk = unit.count * resMain.units[key].av * (100 + this.Tech[key]) / 100;
                                            atk = atk + thisatk;
                                        }
                                    }
                                    var ratio = (atk / this.bossAtk[dungeonLevel]);
                                    for (var key in city.getUnits()) {
                                        if (key == 16 || key == 17) {
                                            var unit = (city.getUnits())[key];
                                            count = unit.count / ratio;
                                            count = Math.ceil(count);
                                            if (!(count == 0)) {
                                                units.push({ t: key, c: count });
                                            }
                                        }
                                    }
                                }
                                this.sendRaid(units, 2, 0, posX, posY);
                            }


                        },
                        sendBoss: function (dungeonType, dungeonLevel, sendall, posX, posY) {
                            var resMain = webfrontend.res.Main.getInstance();
                            var count;
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();
                            var curX = (cId & 0xFFFF);
                            var curY = (cId >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);


                            var tempunits = [];

                            if (cgi.getUnits() != null) {
                                for (var unittype in cgi.getUnits()) {
                                    tempunits[unittype] = { count: (cgi.getUnits())[unittype].count };

                                };
                                console.log("tempunits");
                                console.log(tempunits);
                            };

                            this.Tech = [];
                            count = 0;
                            for (var i = 1; i < 18; i++) {
                                this.Tech[i] = this.SrvTech.getBonus("unitDamage", webfrontend.data.Tech.research, i) + this.SrvTech.getBonus("unitDamage", webfrontend.data.Tech.shrine, i);
                            }
                            sent = true;
                            while (sent == true) {
                                var units = [];
                                sent = false;
                                if (dungeonType == 6) { /* forest */
                                    if (tempunits != null) {
                                        for (var unittype in tempunits) {
                                            count = 0;

                                            if (unittype == 9 || unittype == 10 || unittype == 11) {
                                                count = this.bossAtkAff[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            else if ((unittype >= 3 && unittype <= 7) || (unittype >= 9 && unittype <= 12)) {
                                                count = this.bossAtk[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            count = Math.ceil(count);
                                            var unit = (tempunits)[unittype];
                                            if ((unit.count >= count) && (count > 0)) {
                                                (tempunits)[unittype].count = unit.count - count;
                                                units.push({ t: unittype, c: count });
                                                this.sendBossRaid(units, 1, 0, posX, posY);
                                                this.nextBoss();
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if (dungeonType == 7) { /* hill */
                                    if (tempunits != null) {
                                        for (var unittype in tempunits) {
                                            count = 0;

                                            if (unittype == 7 || unittype == 12) {
                                                count = this.bossAtkAff[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            else if ((unittype >= 3 && unittype <= 7) || (unittype >= 9 && unittype <= 12)) {
                                                count = this.bossAtk[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            count = Math.ceil(count);
                                            var unit = (tempunits)[unittype];
                                            if ((unit.count >= count) && (count > 0)) {
                                                (tempunits)[unittype].count = unit.count - count;
                                                units.push({ t: unittype, c: count });
                                                this.sendBossRaid(units, 1, 0, posX, posY);
                                                this.nextBoss();
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if (dungeonType == 8) { /* mountain */
                                    if (tempunits != null) {
                                        for (var unittype in tempunits) {
                                            count = 0;

                                            if (unittype == 3 || unittype == 4 || unittype == 5 || unittype == 6) {
                                                count = this.bossAtkAff[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            else if ((unittype >= 3 && unittype <= 7) || (unittype >= 9 && unittype <= 12)) {
                                                count = this.bossAtk[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            count = Math.ceil(count);
                                            var unit = (tempunits)[unittype];
                                            if ((unit.count >= count) && (count > 0)) {
                                                (tempunits)[unittype].count = unit.count - count;
                                                units.push({ t: unittype, c: count });
                                                this.sendBossRaid(units, 1, 0, posX, posY);
                                                this.nextBoss();
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if (dungeonType == 12) { /* water */
                                    if (tempunits != null) {
                                        for (var unittype in tempunits) {
                                            count = 0;

                                            if (unittype == 16 || unittype == 17) {
                                                count = this.bossAtkAff[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            else {
                                                count = this.bossAtk[dungeonLevel] * 100 / resMain.units[unittype].av / (100 + this.Tech[unittype]);
                                            }
                                            count = Math.ceil(count);
                                            var unit = (tempunits)[unittype];
                                            if ((unit.count >= count) && (count > 0)) {
                                                (tempunits)[unittype].count = unit.count - count;
                                                units.push({ t: unittype, c: count });
                                                this.sendBossRaid(units, 2, 0, posX, posY);
                                                this.nextBoss();
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (sent == true) {
                                    console.log("finding next baron");

                                    cx = Math.floor(curX / 32);
                                    cy = Math.floor(curY / 32);
                                    cell = cx + (cy * 32);

                                    if (this.doGlobal == false) {
                                        cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                        cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                        cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                        cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                                    }
                                    else {
                                        cxmin = 0;
                                        cymin = 0;
                                        cxmax = 19;
                                        cymax = 19;
                                    };
                                    cxmin = Math.max(cxmin, 0);
                                    cymin = Math.max(cymin, 0);
                                    cxmax = Math.min(cxmax, 19);
                                    cymax = Math.min(cymax, 19);


                                    str = ""


                                    if (cId == this.distCID) {
                                        if (!(this.sbBoss.getSelection()[0] == undefined)) {
                                            var target = this.sbBoss.getSelection()[0].getModel();
                                            //console.log("Target: " + target);
                                            for (ccy = cymin; ccy <= cymax; ccy++) {

                                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                                    cell = ccx + (ccy * 32);
                                                    if (!(this.bosslist[cell] == undefined)) {
                                                        for (b = 0; b < this.bosslist[cell].length; b++) {
                                                            if (target == this.bosslist[cell][b].id) {
                                                                dungeonType = this.bosslist[cell][b].type;
                                                                dungeonLevel = this.bosslist[cell][b].level;
                                                                posX = this.bosslist[cell][b].x;
                                                                posY = this.bosslist[cell][b].y;
                                                                console.log("boss found");
                                                                break;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } else {
                                            this.findBosses('');
                                            return;
                                        };
                                    };
                                };
                            }
                        },
                        sendRaid: function (units, transportType, repeat, posX, posY) {
                            var curcityId = webfrontend.data.City.getInstance().getId()

                            var raid = {
                                cityid: curcityId,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.sendCommandBuffer.push({ a: "OrderUnits", act: "raid", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.sendCommandBusy) {
                                this.sendCommandBusy = true;
                                this.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendBossRaid: function (units, transportType, repeat, posX, posY) {
                            var curcityId = webfrontend.data.City.getInstance().getId()

                            var raid = {
                                cityid: curcityId,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.sendCommandBuffer.push({ a: "OrderUnits", act: "boss", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.sendCommandBusy) {
                                this.sendCommandBusy = true;
                                this.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendRaidDelay: function (units, transportType, repeat, posX, posY) {
                            var ServerTime = webfrontend.data.ServerTime.getInstance();

                            var curcityId = webfrontend.data.City.getInstance().getId();

                            var CurrentTime = webfrontend.Util.getCurrentTime();
                            console.log(CurrentTime);

                            var TimeOffset = 0;

                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                //mN.setHours(mN.getHours() + mN.getTimezoneOffset() / 60);
                                TimeOffset += CurrentTime.getTimezoneOffset() / 60;

                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            }
                            //console.log("TO: " + TimeOffset)

                            var UTCMili = new Date(CurrentTime.getTime());
                            UTCMili.setHours(UTCMili.getHours() - TimeOffset);
                            UTCMili.setSeconds(UTCMili.getSeconds() + 5);
                            UTCMili.setMilliseconds(500)
                            console.log(UTCMili);
                            console.log("Mili: " + UTCMili.getTime());

                            var raid = {
                                cityid: curcityId,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 2,
                                referenceTimeUTCMillis: UTCMili.getTime(),
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.sendCommandBuffer.push({ a: "OrderUnits", act: "delayraid", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.sendCommandBusy) {
                                this.sendCommandBusy = true;
                                this.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendAttack: function (cid, units, transportType, referenceType, target, orderType, refH, refM, refS, refD) {
                            var ServerTime = webfrontend.data.ServerTime.getInstance();

                            var curcityId = webfrontend.data.City.getInstance().getId();


                            var CurrentTime = webfrontend.Util.getCurrentTime();
                            console.log(CurrentTime);

                            var TimeOffset = 0;

                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                //mN.setHours(mN.getHours() + mN.getTimezoneOffset() / 60);
                                TimeOffset += CurrentTime.getTimezoneOffset() / 60;

                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            }
                            //console.log("TO: " + TimeOffset)

                            //                            __Ya: function (hX(time), hY(offset), ia(model), ib, ic, ie, ig) {
                            //                                var ii = webfrontend.data.ServerTime.getInstance();
                            //                                var ih = new Date(hX.getTime()); ih.setDate(ih.getDate() + ia); ih.setHours(ib - hY); ih.setMinutes(ic); ih.setSeconds(ie); ih.setMilliseconds(500); if (webfrontend.config.Config.getInstance().getTimeZone() == 0) ih = new Date(ih.getTime() - webfrontend.data.ServerTime.getInstance().getDiff()); return (ig ? ih.getTime() : (ih.getTime() - ii.refTime) / 1000 * ii.getStepsPerSecond());
                            //                            }
                            var raidTime = 0;
                            if (referenceType == 0) {
                                raidTime = 0;
                            }
                            else {
                                var UTCMili = new Date(CurrentTime.getTime());
                                UTCMili.setDate(UTCMili.getDate() + refD);
                                UTCMili.setHours(refH - TimeOffset);
                                UTCMili.setMinutes(refM);
                                UTCMili.setSeconds(refS);
                                UTCMili.setMilliseconds(500)
                                console.log(UTCMili);
                                console.log("Mili: " + UTCMili.getTime());
                                raidTime = UTCMili.getTime();

                            };

                            var raid = {
                                cityid: cid,
                                units: units,
                                targetPlayer: "",
                                targetCity: target,
                                order: orderType,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: referenceType,
                                referenceTimeUTCMillis: raidTime,
                                raidTimeReferenceType: 0,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.sendCommandBuffer.push({ a: "OrderUnits", act: "raid", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.sendCommandBusy) {
                                this.sendCommandBusy = true;
                                this.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        stopRaids: function (stopWhen) {
                            // 0 - once
                            // 1 - repeat
                            // 2 - until time
                            var ServerTime = webfrontend.data.ServerTime.getInstance();

                            var curcityId = webfrontend.data.City.getInstance().getId();
                            var cgi = webfrontend.data.City.getInstance();
                            var CurrentTime = webfrontend.Util.getCurrentTime();
                            var first = true;

                            var TimeOffset = 0;

                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                TimeOffset += CurrentTime.getTimezoneOffset() / 60;

                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            };
                            var raidTime = 0;
                            var UTCMili = new Date(CurrentTime.getTime());
                            UTCMili.setHours(UTCMili.getHours() - TimeOffset);
                            UTCMili.setSeconds(UTCMili.getSeconds() + 60);
                            UTCMili.setMilliseconds(500)
                            console.log(UTCMili);
                            console.log("Mili: " + UTCMili.getTime());
                            raidTime = UTCMili.getTime();

                            UTCMili.setDate(UTCMili.getDate() + 7);

                            stopTime = 0;
                            if (stopWhen == 2) {
                                orders = cgi.unitOrders;
                                console.log(orders);
                                for (var key in orders) {
                                    order = orders[key];
                                    console.log(order.state);
                                    console.log(order);
                                    if ((order.state == 0) && (order.type != 8)) {
                                        if (first == true) {
                                            stopTime = order.start;
                                            console.log(stopTime);
                                            first = false;
                                        } else if (stopTime > order.start) {
                                            stopTime = order.start;
                                            console.log(stopTime);

                                        };
                                    };
                                };
                            };
                            if (first == true && stopWhen == 2) {
                                stopWhen = 0;
                            } else {
                                stopTime = stopTime - (3600 * this.options.WeaponsControl.stopRaidsHBefore);
                                console.log("Final stoptime:" + stopTime);
                            };
                            orders = cgi.unitOrders;
                            console.log(orders);
                            for (var key in orders) {
                                order = orders[key];
                                if (order.type == 8) {
                                    if (stopWhen == 0) {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.id,
                                            isDelayed: false,
                                            recurringEndStep: order.recurringEndStep,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    } else if (stopWhen == 1) {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.id,
                                            isDelayed: false,
                                            recurringEndStep: order.recurringEndStep,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    } else {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.id,
                                            isDelayed: false,
                                            recurringEndStep: stopTime,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    };
                                };
                            };

                        },
                        stopRaidsTarget: function (stopWhen, target, targetorders) {
                            // 0 - once
                            // 1 - repeat
                            // 2 - until time (not possible from trooplist)
                            // This command is for troopslist orders
                            var ServerTime = webfrontend.data.ServerTime.getInstance();
                            console.log("stopRaidsTarget:", stopWhen, target, targetorders);
                            var curcityId = target;
                            if (targetorders == null || targetorders == undefined) {
                                return;
                            };
                            var CurrentTime = webfrontend.Util.getCurrentTime();
                            var first = true;

                            var TimeOffset = 0;

                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                TimeOffset += CurrentTime.getTimezoneOffset() / 60;

                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            };
                            var raidTime = 0;
                            var UTCMili = new Date(CurrentTime.getTime());
                            UTCMili.setHours(UTCMili.getHours() - TimeOffset);
                            UTCMili.setSeconds(UTCMili.getSeconds() + 60);
                            UTCMili.setMilliseconds(500)
                            console.log(UTCMili);
                            console.log("Mili: " + UTCMili.getTime());
                            raidTime = UTCMili.getTime();

                            UTCMili.setDate(UTCMili.getDate() + 7);

                            stopTime = 0;
                            if (stopWhen == 2) {
                                orders = targetorders;
                                console.log(orders);
                                for (var key in orders) {
                                    order = orders[key];
                                    console.log(order.e);
                                    console.log(order);
                                    if ((order.s == 0) && (order.t != 8)) {
                                        if (first == true) {
                                            stopTime = order.e;
                                            console.log(stopTime);
                                            first = false;
                                        } else if (stopTime > order.e) {
                                            stopTime = order.e;
                                            console.log(stopTime);

                                        };
                                    };
                                };
                            };
                            if (first == true && stopWhen == 2) {
                                stopWhen = 0;
                            } else {
                                stopTime = stopTime - (3600 * this.options.WeaponsControl.stopRaidsHBefore);
                                console.log("Final stoptime:" + stopTime);
                            };
                            orders = targetorders;
                            console.log(orders);
                            for (var key in orders) {
                                order = orders[key];
                                if (order.t == 8) {
                                    if (stopWhen == 0) {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.i,
                                            isDelayed: false,
                                            recurringEndStep: 0,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    } else if (stopWhen == 1) {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.i,
                                            isDelayed: false,
                                            recurringEndStep: 0,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    } else {
                                        raid = {
                                            cityid: curcityId,
                                            id: order.i,
                                            isDelayed: false,
                                            recurringEndStep: stopTime,
                                            recurringType: stopWhen
                                        };
                                        this.sendCommandBuffer.push({ a: "UnitOrderSetRecurringOptions", act: "raid", p: raid });
                                        //                                        console.log(buildid + " " + building);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    };
                                };
                            };

                        },
                        findBosses: function (e) {
                            local = false;
                            if (e != '') {
                                if (e.getButton() == "right") {
                                    console.log("right");
                                    this.doGlobal = true;
                                }
                                else {
                                    this.doGlobal = false;
                                };
                            }
                            else {
                                this.doGlobal = false;
                                if (this.watercap == 0) {
                                    local = true;
                                };
                            };

                            //this.checkAndReattachConsumers();
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            x = curX;
                            y = curY;

                            cx = Math.floor(x / 32);
                            cy = Math.floor(y / 32);
                            cell = cx + (cy * 32) + 3072;

                            if (this.doGlobal == false) {
                                if (local == true) {
                                    cxmin = Math.floor((Math.floor(x / 100)) * 100 / 32);
                                    cxmax = Math.floor((Math.floor(x / 100) + 1) * 100 / 32);
                                    cymin = Math.floor((Math.floor(y / 100)) * 100 / 32);
                                    cymax = Math.floor((Math.floor(y / 100) + 1) * 100 / 32);
                                }
                                else {
                                    cxmin = Math.floor((Math.floor(x / 100) - 1) * 100 / 32);
                                    cxmax = Math.floor((Math.floor(x / 100) + 2) * 100 / 32);
                                    cymin = Math.floor((Math.floor(y / 100) - 1) * 100 / 32);
                                    cymax = Math.floor((Math.floor(y / 100) + 2) * 100 / 32);
                                };
                            }
                            else {
                                cxmin = 0;
                                cymin = 0;
                                cxmax = 19;
                                cymax = 19;
                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);


                            str = ""
                            cellcount = 0;
                            encode = ""

                            this.sbBoss.exclude();
                            this.sbLawless.exclude();
                            this.sbDungeon.exclude();


                            for (ccy = cymin; ccy <= cymax; ccy++) {

                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                    cell = ccx + (ccy * 32) + 3072;
                                    while (cell > 0) {
                                        encode = encode + this.cipher[cell % 91];
                                        cell = Math.floor(cell / 91);
                                    };
                                    encode = encode + "-";
                                    cellcount = cellcount + 1;
                                    if (cellcount >= this.options.worldmap.cellsPrCommand) {
                                        cellcount = 0;
                                        this.sendMapCommandBuffer.push({ cell: encode });
                                        console.log(encode);
                                        encode = ""
                                    }
                                    //str = str + encode + "-";
                                    //                                    console.log(encode);
                                };
                            };
                            if (encode != "") {
                                cellcount = 0;
                                this.sendMapCommandBuffer.push({ cell: encode });
                                console.log(encode);
                                encode = ""
                            }

                            //                            this.sbBoss.exclude();
                            //                            this.sbLawless.exclude();
                            //                            this.sbDungeon.exclude();
                            this.btnFB.setEnabled(false);
                            if (!this.sendMapCommandBusy) {
                                this.sendMapCommandBusy = true;
                                this.sendMapCmd();
                            }

                        },
                        nextBoss: function () {
                            var resMain = webfrontend.res.Main.getInstance();
                            var cityid = webfrontend.data.City.getInstance().getId();
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);

                            if (this.sbBoss.getSelection()[0] == undefined) {
                                var e = {};
                                e.getButton = function () {
                                    return "left";
                                };

                                this.findBosses(e);
                                return;
                            };
                            var target = this.sbBoss.getSelection()[0].getModel();
                            this.sbBoss.removeAll();

                            if (this.doGlobal == false) {
                                cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                            }
                            else {
                                cxmin = 0;
                                cymin = 0;
                                cxmax = 19;
                                cymax = 19;
                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);



                            for (ccy = cymin; ccy <= cymax; ccy++) {
                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                    cell = ccx + (ccy * 32);
                                    if (!(this.bosslist[cell] == undefined)) {
                                        for (i = 0; i < this.bosslist[cell].length; i++) {
                                            if (target == this.bosslist[cell][i].id) {
                                                this.bosslist[cell].splice(i, 1);
                                                break;
                                            };
                                        };
                                    };
                                };
                            };
                            this.distCID = 0;
                            this.updateDistance();
                            this.bossSelect()


                        },
                        bossSelect: function () {
                            if (this.distUpdating == true) {
                                return;
                            };
                            if (!(this.sbBoss.getSelection()[0] == undefined)) {
                                var target = this.sbBoss.getSelection()[0].getModel();
                                //                                console.log(target);
                                //this.app.setMainView("c", target, -1, -1);
                                var x = (target % 65536);
                                var y = (Math.floor(target / 65536) % 65536);
                                //                                console.log(x + " " + y);
                                this.app.setMainView('r', 0, x * 128, y * 80);
                                this.sbBoss.show();
                                this.btnSBDO.show();

                            }
                            else {
                                this.sbBoss.exclude();
                                this.btnSBDO.exclude();

                            };
                        },
                        bossSelectHide: function () {
                            this.sbBoss.exclude();
                            this.btnSBDO.exclude();
                            this.bosslist = [];
                        },
                        typeSelect: function () {
                            if ((this.distUpdating == true) || (this.sbType.getSelection()[0] == undefined)) {
                                return;
                            };
                            this.distCID = 0;
                            this.updateDistance();
                        },
                        typeSelectHide: function () {
                            this.sbType.exclude();
                        },
                        levelSelect: function () {
                            if ((this.distUpdating == true) || (this.sbLevel.getSelection()[0] == undefined)) {
                                return;
                            };
                            this.distCID = 0;
                            this.updateDistance();
                        },
                        levelSelectHide: function () {
                            this.sbLevel.exclude();
                        },
                        ratioSelect: function () {
                            if ((this.distUpdating == true) || (this.sbRatio.getSelection()[0] == undefined)) {
                                return;
                            };
                            this.distCID = 0;
                            this.updateDistance();
                        },
                        ratioSelectHide: function () {
                            this.sbRatio.exclude();
                        },
                        lawlessSelect: function () {
                            if (this.distUpdating == true) {
                                return;
                            };
                            if (!(this.sbLawless.getSelection()[0] == undefined)) {
                                var target = this.sbLawless.getSelection()[0].getModel();
                                //                                console.log(target);
                                //this.app.setMainView("c", target, -1, -1);
                                var x = (target % 65536);
                                var y = (Math.floor(target / 65536) % 65536);
                                //                                console.log(x + " " + y);
                                this.app.setMainView('r', 0, x * 128, y * 80);
                                this.sbLawless.show();
                            } else {
                                this.sbLawless.exclude();
                            };
                        },
                        lawlessSelectHide: function () {
                            this.sbLawless.exclude();
                            this.lawlesslist = [];

                        },
                        dungeonSelect: function () {
                            console.log(this.distUpdating);
                            if (this.distUpdating == true) {
                                return;
                            };
                            if (!(this.sbDungeon.getSelection()[0] == undefined)) {
                                var target = this.sbDungeon.getSelection()[0].getModel();
                                var x = (target % 65536);
                                var y = (Math.floor(target / 65536) % 65536);
                                this.app.setMainView('r', 0, x * 128, y * 80);
                                this.sbDungeon.show();
                                this.btnSDDO.show();
                            } else {
                                this.sbDungeon.exclude(); this.btnSDDO.exclude(); ;
                            };
                        },
                        dungeonSelectHide: function () {
                            this.sbDungeon.exclude();
                            this.btnSDDO.exclude(); ;
                            this.dungeonlist = [];

                        },
                        getDataResult: function (response, data) {

                            //console.log(data);
                            //console.log(data[0].D.s);

                            if (data == null) {
                                console.log("Null data returned to getDataResult");
                                this.sendMapCommandWaitForReply = false;
                                this.sendMapCmd();
                                return;
                            };

                            //                            if (data[0].D.s == undefined) {
                            //                                console.log("data[0].D.s is undefined");
                            //                                this.sendMapCommandWaitForReply = false;
                            //                                this.sendMapCmd();
                            //                                return;
                            //                            };


                            //console.log("Data");
                            //console.log(data);

                            //if (this.doGlobal == false) {
                            um = webfrontend.net.UpdateManager.getInstance();
                            for (i = 0; i < data.length; i++) {
                                //console.log("i: " + i);
                                var bm = data[i].C;
                                //console.log(data[i]);
                                if ((bm == "WORLD") && (this.WC.allStep != 0)) {
                                    //Dont do world update
                                } else {
                                    if (um.reciever.hasOwnProperty(bm)) {
                                        var bo = um.reciever[bm];
                                        //console.log(bo);
                                        if (bo.consumer != this) {
                                            switch (bo.t) {
                                                case 1: bo.func.call(bo.obj, data[i].D);
                                                    //console.log("Type1");
                                                    break;
                                                case 2: bo.func.call(bo.obj, bm, data[i].D);
                                                    //console.log("Type2");
                                                    break;
                                            };
                                        };
                                    };
                                };
                                if (bm == "WORLD") {
                                    this.processDataResult(data[i].D);
                                    //this.checkAndReattachConsumers();
                                };
                                if (bm == "COMO") {
                                    this.processCOMODataResult(data[i].D);
                                    //this.checkAndReattachConsumers();
                                };
                            };
                            //}
                        },
                        processCOMODataResult: function (data) {
                            this.troopList = {};
                            this.contList = {};
                            for (s = 0; s < data.length; s++) {
                                if (!(data[s].c == [])) {
                                    x = data[s].i & 0xFFFF;
                                    y = data[s].i >> 16;
                                    cx = Math.floor(x / 100);
                                    cy = Math.floor(y / 100);
                                    cont = cx + 10 * cy;
                                    this.contList[cont] = { cx: cx, cy: cy, x: x, y: y };
                                    this.troopList[data[s].i] = { name: data[s].n, x: x, y: y, cx: cx, cy: cy, ref: data[s].t, water: data[s].w, castle: data[s].s, commands: [], dist: 0 };
                                    for (t = 0; t < data[s].c.length; t++) {
                                        if (data[s].c[t].i == 0) {
                                            //troops in town
                                            this.troopList[data[s].i].units = data[s].c[t].u;
                                            //                                            console.log("Troops in town " + data[s].n + " - " + data[s].t);
                                            //                                            console.log(data[s].c[t].u);
                                        } else {
                                            this.troopList[data[s].i].commands.push(data[s].c[t]);
                                        };
                                    }
                                };
                            }
                            console.log("Finished trooplist:");
                            this.WC.updateContSB();
                            this.WC.LastCity = "";
                            this.WC.checkReqLists();
                            
                            this.distCID = "";
                            this.updateDistance();

                            //                            console.log(this.troopList);
                        },
                        processDataResult: function (data) {
                            var resMain = webfrontend.res.Main.getInstance();
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = webfrontend.data.City.getInstance().getId();
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);
                            var Player = webfrontend.data.Player.getInstance();
                            var playerRank = resMain.playerTitles[Player.getTitle()].r;
                            var minimumBoss = 7;

                            for (i = 1; i <= 10; i++) {
                                dungeonartifact = resMain.dungeonLevels[i].t;
                                playerRankRequired = resMain.playerTitles[dungeonartifact].r;
                                if (playerRank - 1 > playerRankRequired) {
                                    continue; //too low
                                } else {
                                    minimumBoss = i;
                                    break;
                                };
                            }



                            for (s = 0; s < data.s.length; s++) {
                                var WMcell = data.s[s];
                                //                                console.log(WMcell);
                                cellNum = WMcell.i;
                                cx = cellNum % 32;
                                cy = Math.floor(cellNum / 32);
                                coX = cx * 32;
                                coY = cy * 32;
                                //                                console.log(coX + ":" + coY);
                                //console.log("Getting cell: " + cellNum);

                                if (this.bosslist == undefined) {
                                    this.bosslist = [];
                                };

                                this.bosslist[cellNum] = [];

                                if (this.dungeonlist == undefined) {
                                    this.dungeonlist = [];
                                };

                                this.dungeonlist[cellNum] = [];

                                if (this.lawlesslist == undefined) {
                                    this.lawlesslist = [];
                                };
                                this.lawlesslist[cellNum] = [];

                                
                                if (this.citylist == undefined) {
                                    this.citylist = [];
                                };
                                this.citylist[cellNum] = [];

                                
                                if (this.freelist == undefined) {
                                    this.freelist = [];
                                };
                                this.freelist[cellNum] = [];

                                if (this.playerlist == undefined) {
                                    this.playerlist = [];
                                };
                                this.playerlist[cellNum] = [];

                                if (this.alliancelist == undefined) {
                                    this.alliancelist = [];
                                };
                                this.alliancelist[cellNum] = [];

                                for (d = 0; d < WMcell.a.length; d++) { //Process alliance info
                                    var cell = WMcell.a[d];
                                    aInfo = this.decode91AllianceInfo(cell)
                                    aInfo.cell = cell;
                                    this.alliancelist[cellNum].push(aInfo);
                                    continue;
                                };
                                for (d = 0; d < WMcell.p.length; d++) { //Process player info
                                };
                                for (d = 0; d < WMcell.d.length; d++) {
                                    var cell = WMcell.d[d];
                                    typeCoord = this.decode91typeCoord(cell, coX, coY);
                                    switch (typeCoord.type) {
                                        case 0: {//None
                                            console.log("processDataResults: None", typeCoord,cell);
                                            continue;
                                        };
                                        case 1: {//City
                                            //console.log("processDataResults: City", typeCoord);
                                            cInfo = this.decode91CityInfo(cell);
                                            cInfo.dist = 0;
                                            id = typeCoord.id;
                                            cInfo.x = typeCoord.x;
                                            cInfo.y = typeCoord.y;
                                            cInfo.cx = typeCoord.cx;
                                            cInfo.cy = typeCoord.cy;
                                            cInfo.cell = cell;
                                            this.citylist[cellNum].push(cInfo);
                                            continue;
                                        };
                                        case 2: { //Dungeon
                                            dInfo = this.decode91DungeonInfo(cell);
                                            //console.log("processDataResults: Dungeon", dInfo, typeCoord);
                                            if ((dInfo.state == true) && (dInfo.type >= 2) && (dInfo.type <= 5) && (dInfo.level >= 1) && (dInfo.level <= 10)) {
                                                this.dungeonlist[cellNum].push({ dist: 0, active: dInfo.state, percent: dInfo.progress, type: dInfo.type, level: dInfo.level, id: typeCoord.id, x: typeCoord.x, y: typeCoord.y, cx: typeCoord.cx, cy: typeCoord.cy, slot: dInfo.slot });
                                            };
                                            continue;
                                        };
                                        case 3: { //Boss
                                            bInfo = this.decode91BossInfo(cell);
                                            if (bInfo.level < minimumBoss) {
                                                continue;
                                            };
                                            if ((bInfo.state == true)) {
                                                dungeontype = bInfo.type;
                                                //console.log("processDataResults: Boss", bInfo, typeCoord);
                                                this.bosslist[cellNum].push({ dist: 0, active: bInfo.state, type: bInfo.type, level: bInfo.level, id: typeCoord.id, x: typeCoord.x, y: typeCoord.y, cx: typeCoord.cx, cy: typeCoord.cy, slot: bInfo.slot });
                                            };
                                            continue;
                                        };
                                        case 4: {//Moongate
                                            //console.log("processDataResults: Moongate", typeCoord);
                                            continue;
                                        };
                                        case 5: {//Shrine
                                            //console.log("processDataResults: Shrine", typeCoord);
                                            continue;
                                        };
                                        case 6: { //Lawless
                                            lInfo = this.decode91LawlessInfo(cell);
                                            this.lawlesslist[cellNum].push({ dist: 0, score: lInfo.points, castle: lInfo.castle, id: typeCoord.id, x: typeCoord.x, y: typeCoord.y, cx: typeCoord.cx, cy:typeCoord.cy, water: lInfo.water, abandoned:lInfo.abandoned, ruin: lInfo.ruin });
                                            continue;
                                        };
                                        case 7: { //Freeslots
                                            console.log("processDataResults: Freeslot", typeCoord, cell);
                                            continue;
                                        };
                                    };
                                };
                            };
                            this.distCID = 0;

                            this.sendMapCommandWaitForReply = false;
                            this.sendMapCmd();
                        },
                        decode91typeCoord: function (string, coX,coY) {
                            value = {};
                            value.value = this.cipher.indexOf(string[0]) + 91 * this.cipher.indexOf(string[1]);
                            value.x = (value.value & 0x1f) + coX;
                            value.y = ((value.value >> 5) & 0x1f) + coY;
                            value.cx = Math.floor(value.x/100);
                            value.cy = Math.floor(value.y / 100);
                            value.id = value.y * 65536 + value.x;
                            value.type = (value.value >> 10);
                            return value;
                        },
                        decode91BossInfo: function (string) {
                            value = {};
                            value.value = this.cipher.indexOf(string[2]) + 91 * this.cipher.indexOf(string[3]) + 91 * 91 * this.cipher.indexOf(string[4]);
                            value.state = ((value.value & 1) != 0);
                            value.type = ((value.value >> 1) & 15);
                            value.level = ((value.value >> 5) & 15);
                            value.slot = ((value.value >> 9) & 0x1f);
                            var d = 0;
                            var e = 1;
                            value.c = 0;
                            while ((value.c < 5)) {
                                if (string[5 + value.c] == '-') {
                                    value.c++;
                                    break;
                                }
                                d += (e * this.cipher.indexOf(string[5 + value.c]));
                                e *= 0x5b;
                                value.c++;
                            };
                            value.startstep = d;
                            return value;
                        },
                        decode91DungeonInfo: function (string) {
                            value = {};
                            value.value = this.cipher.indexOf(string[2]) + 91 * this.cipher.indexOf(string[3]) + 91 * 91 * this.cipher.indexOf(string[4]) + 91*91 * 91 * this.cipher.indexOf(string[5]);
                            value.state = ((value.value & 1) != 0);
                            value.type = ((value.value >> 1) & 15);
                            value.level = ((value.value >> 5) & 15);
                            value.progress = ((value.value >> 9) & 0x7f);
                            value.slot = ((value.value >> 0x10) & 0x1f);
                            var d = 0;
                            var e = 1;
                            value.c = 0;
                            while ((value.c < 5)) {
                                if (string[5 + value.c] == '-') {
                                    value.c++;
                                    break;
                                }
                                d += (e * this.cipher.indexOf(string[6 + value.c]));
                                e *= 0x5b;
                                value.c++;
                            };
                            value.startstep = d;
                            return value;
                        },
                        decode91LawlessInfo: function (string) {
                            value = {};
                            value.value = this.cipher.indexOf(string[2]) ;
                            value.castle = ((value.value & 1) != 0);
                            value.water = ((value.value & 2) != 0);
                            value.abandoned = ((value.value & 4) != 0);
                            value.ruin = ((value.value & 8) != 0);
                            
                            var d = 0;
                            var e = 1;
                            value.c = 0;
                            while ((value.c < 5)) {
                                if (string[3 + value.c] == '-') {
                                    value.c++;
                                    break;
                                }
                                d += (e * this.cipher.indexOf(string[3 + value.c]));
                                e *= 0x5b;
                                value.c++;
                            };
                            value.points = d;
                            return value;
                        },
                        decode91CityInfo: function (string) {
                            value = {};
                            value.c = 2;
                            rv = this.decode91subString(string, value.c, 4)
                            value.c += rv.count;
                            value.value = rv.value;
                            value.castle = ((value.value & 1) != 0);
                            value.water = ((value.value & 2) != 0);
                            value.Enlighted = ((value.value & 4) != 0);
                            value.PalaceUpgradeing = ((value.value & 8) != 0);
                            value.PalaceLevel = ((value.value >> 7) & 15);
                            value.PalaceType = (((value.Enlighted | value.PalaceUpgradeing) | (value.PalaceLevel > 0)) ? (((value.value >> 11) & 7) + 1) : 0);
                            value.Player = ((value.value >> 14) & 0x3ff);
                            value.c += 4;
                            if (value.Enlighted) {
                                rv = this.decode91subString(string, value.c, 5)
                                value.c += rv.count;
                                value.EnlightmentStep = rv.value;
                            } else {
                                value.EnlightmentStep = 0;
                            }


                            if ((value.value & 0x10) != 0) {
                                rv = this.decode91subString(string, value.c, 5)
                                value.c += rv.count;
                                value.PlunderProtection = rv.value;
                            } else {
                                value.PlunderProtection = 0;
                            }
                            if ((value.value & 0x20) != 0) {
                                rv = this.decode91subString(string, value.c, 2)
                                value.c += rv.count;
                                value.PalaceDamage = rv.value;
                            } else { value.PalaceDamage = 0; }
                            rv = this.decode91subString(string, value.c, 5)
                            value.c += rv.count;
                            value.Points = rv.value;
                            value.Name = string.substr(value.c);
                            return value;
                        },
                        decode91AllianceInfo: function (string) {
                            value = {};
                            value.c = 2;
                            rv = this.decode91subString(string, value.c, 5)
                            value.c += rv.count;
                            value.Id = rv.value;
                            rv = this.decode91subString(string, value.c, 5)
                            value.c += rv.count;
                            value.Points = rv.value;
                            value.Name = string.substr(value.c);
                            return value;
                        },
                        decode91subString: function (string, start, max) {
                            var d = 0;
                            var e = 1;
                            count = 0;
                            while ((count< max)) {
                                if (string[start + count] == '-') {
                                    count++;
                                    return { value: d, count: count };
                                }
                                d += (e * this.cipher.indexOf(string[start + count]));
                                e *= 0x5b;
                                count++;
                            } return { value: d, count: count };
                        },
                        newLayout: function () {
                            this.buildCount = new Object();
                            this.buildEmpty = new Object();
                            this.buildOccupied = new Object();
                            this.buildUnused = new Object();
                            this.buildings = new Object();
                            var ss = this.layout.ss;
                            var c = this.layout.cc;
                            for (i = 0; i < ss.length; i++) {
                                id = this.self(arguments).ssToId[ss.charAt(i)];
                                if (!(id == undefined)) {
                                    if (this.buildCount[id] == undefined) {
                                        this.buildCount[id] = {
                                            city: 0,
                                            layout: 1
                                        };
                                    } else {
                                        this.buildCount[id].layout = this.buildCount[id].layout + 1;
                                    };
                                };
                                if (this.buildCount[c[i][2]] == undefined) {
                                    this.buildCount[c[i][2]] = {
                                        city: 1,
                                        layout: 0
                                    };

                                } else {
                                    this.buildCount[c[i][2]].city = this.buildCount[c[i][2]].city + 1;
                                };
                                if (!/\;|\:|\,|\.|#|\-|\_|W|Q|F|I/.test(ss.charAt(i))) {
                                    if (c[i][2] != id) {
                                        if ((c[i][2] == 98) || (c[i][2] == 97)) {
                                            x = (i % 21) + 1;
                                            y = Math.floor(i / 21) + 1;
                                            buildid = y * 256 + x + 131072;
                                            this.buildEmpty[buildid] = { layout: id };
                                        } else {
                                            x = (i % 21) + 1;
                                            y = Math.floor(i / 21) + 1;
                                            buildid = y * 256 + x + 131072;
                                            this.buildOccupied[buildid] = { city: c[i][2], level: c[i][1], layout: id };

                                        };
                                    } else {
                                        x = (i % 21) + 1;
                                        y = Math.floor(i / 21) + 1;
                                        buildid = y * 256 + x + 65536;
                                        this.buildings[buildid] = { city: c[i][2], level: c[i][1], layout: id };
                                    };
                                } else if (/\-/.test(ss.charAt(i))) {
                                    if (c[i][2] != 98 && c[i][2] != -2 && (c[i][2] < 52 || c[i][2] > 60)) {
                                        x = (i % 21) + 1;
                                        y = Math.floor(i / 21) + 1;
                                        buildid = y * 256 + x + 131072;
                                        this.buildOccupied[buildid] = { city: c[i][2], level: c[i][1], layout: id };
                                    } else if (c[i][2] == 98) {
                                        x = (i % 21) + 1;
                                        y = Math.floor(i / 21) + 1;
                                        buildid = y * 256 + x + 131072;
                                        this.buildUnused[buildid] = { city: c[i][2] };
                                    };
                                } else if (/\_/.test(ss.charAt(i))) {
                                    if (c[i][2] != 97) {
                                        x = (i % 21) + 1;
                                        y = Math.floor(i / 21) + 1;
                                        buildid = y * 256 + x + 131072;
                                        this.buildOccupied[buildid] = { city: c[i][2], level: c[i][1], layout: id };
                                    };
                                }
                            }

                        },
                        update: function () {
                            this.updateButtons();
                            //if (this.buildRoundActive == false) {
                            this.updateDistance();
                            //};
                            this.COUpdate();
                            //this.Updatetimer.start(this.update, null, this, null, 1000);

                        },
                        updateDistance: function () {
                            var resMain = webfrontend.res.Main.getInstance();
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();

                            var ratiolist = [];

                            var dlist = [];
                            var llist = [];
                            var blist = [];

                            if (this.distCID == cityid || this.distUpdating || this.sendMapCommandBusy) {
                                return;
                            };
                            this.distUpdating = true;
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);
                            this.landcap = 0;
                            this.watercap = 0;

                            if (this.sbRatio.getSelection()[0] == undefined) {
                                selectedLevel = 0;
                            }
                            else {
                                selectedRatio = this.sbRatio.getSelection()[0].getModel()
                            };


                            if (curcity.getUnits() != null) {
                                for (var key in curcity.getUnits()) {
                                    if ((key >= 3 && key <= 7) || (key >= 9 && key <= 12)) {
                                        var unit = (curcity.getUnits())[key];
                                        var thiscap = unit.count * resMain.units[key].c;
                                        this.landcap = this.landcap + thiscap;
                                    }
                                    else if ((key >= 16 && key <= 17)) {
                                        var unit = (curcity.getUnits())[key];
                                        var thiscap = unit.count * resMain.units[key].c;
                                        this.watercap = this.watercap + thiscap;
                                    }
                                }

                            }
                            ratiolow = 0;
                            ratiohigh = 11
                            orderlimit = curcity.getOrderLimit();
                            orders = curcity.unitOrders;
                            if (orders == null) {
                            }
                            else {
                                orderlimit = orderlimit - orders.length;
                            };
                            //console.log(orderlimit);
                            //console.log(orders);
                            for (lv = 1; lv <= 10; lv++) {
                                ratiolist[lv] = (Math.round((this.landcap + this.watercap) / this.options.raiding.lootlevel[lv] * 100.0) / 100);
                                if ((ratiolist[lv] < this.options.raiding.allRatio) && (selectedRatio > 0) && ratiohigh == 11) {
                                    ratiohigh = lv;
                                };
                                if (ratiolist[lv] > (5 + this.options.raiding.allRatio - 0.01) && selectedRatio == 1) {
                                    ratiolow = lv;
                                };
                                if (ratiolist[lv] > (15 + this.options.raiding.allRatio - 0.01) && selectedRatio == 2) {
                                    ratiolow = lv;
                                };
                                if (ratiolist[lv] > (orderlimit + this.options.raiding.allRatio - 0.01) && selectedRatio == 3) {
                                    ratiolow = lv;
                                };

                            };
                            //                            console.log(ratiolist);
                            //                            console.log(ratiolow);
                            //                            console.log(ratiohigh);



                            if (this.sbLevel.getSelection()[0] == undefined) {
                                selectedLevel = 0;
                            }
                            else {
                                selectedLevel = this.sbLevel.getSelection()[0].getModel()
                            };
                            if (this.sbType.getSelection()[0] == undefined) {
                                selectedType = 0;
                            }
                            else {
                                selectedType = this.sbType.getSelection()[0].getModel()
                            };
                            console.log("Land: " + this.landcap + " Water: " + this.watercap);
                            if ((this.landcap > 0) && (this.watercap == 0)) {
                                selectedType = 1;
                                console.log("landonly");
                            } else if ((this.landcap == 0) && (this.watercap > 0)) {
                                selectedType = 2;
                                console.log("wateronly");
                            } else if ((this.landcap == 0) && (this.watercap == 0)) {
                                selectedType = 3;
                                console.log("no units");
                            };
                            this.sbBoss.removeAll();
                            this.sbDungeon.removeAll();
                            this.sbLawless.removeAll();


                            if (this.doGlobal == false) {
                                if (selectedType == 1) {
                                    cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                    cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                    cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                    cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);

                                } else {
                                    cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                    cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                    cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                    cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                                }
                            }
                            else {
                                cxmin = 0;
                                cymin = 0;
                                cxmax = 19;
                                cymax = 19;
                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);


                            str = ""

                            for (ccy = cymin; ccy <= cymax; ccy++) {

                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                    cell = ccx + (ccy * 32);
                                    //console.log("Cell: " + cell);
                                    if (!(this.bosslist == undefined) && (selectedType != 3)) {
                                        if (!(this.bosslist[cell] == undefined)) {
                                            for (b = 0; b < this.bosslist[cell].length; b++) {
                                                x = this.bosslist[cell][b].x;
                                                y = this.bosslist[cell][b].y;

                                                var diffX = Math.abs(curX - x);
                                                var diffY = Math.abs(curY - y);
                                                var thisdist = Math.sqrt(diffX * diffX + diffY * diffY);

                                                var num = new Number(thisdist);
                                                this.bosslist[cell][b].dist = num;
                                                blist.push(this.bosslist[cell][b]);

                                            };
                                        };
                                    };

                                    if (!(this.dungeonlist == undefined) && (selectedType != 3)) {
                                        if (!(this.dungeonlist[cell] == undefined)) {
                                            for (b = 0; b < this.dungeonlist[cell].length; b++) {
                                                x = this.dungeonlist[cell][b].x;
                                                y = this.dungeonlist[cell][b].y;

                                                var diffX = Math.abs(curX - x);
                                                var diffY = Math.abs(curY - y);
                                                var thisdist = Math.sqrt(diffX * diffX + diffY * diffY);

                                                percent = this.dungeonlist[cell][b].percent;

                                                num = new Number(thisdist * ((100 + percent) / 100));
                                                this.dungeonlist[cell][b].realdist = Math.round(thisdist * 100.0) / 100
                                                this.dungeonlist[cell][b].dist = num;
                                                dlist.push(this.dungeonlist[cell][b]);

                                            };

                                        };
                                    };
                                    if (!(this.lawlesslist == undefined)) {
                                        if (!(this.lawlesslist[cell] == undefined)) {

                                            for (b = 0; b < this.lawlesslist[cell].length; b++) {
                                                x = this.lawlesslist[cell][b].x;
                                                y = this.lawlesslist[cell][b].y;
                                                var diffX = Math.abs(curX - x);
                                                var diffY = Math.abs(curY - y);
                                                var thisdist = Math.sqrt(diffX * diffX + diffY * diffY);

                                                var num = new Number(thisdist);
                                                this.lawlesslist[cell][b].dist = num;
                                                llist.push(this.lawlesslist[cell][b]);

                                            };


                                        };
                                    };
                                };
                            };

                            blist.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });

                            if (!(blist == undefined)) {
                                for (i = 0; i < blist.length; i++) {
                                    if (!(blist[i] == undefined)) {
                                        if (selectedLevel <= blist[i].level) {
                                            if ((selectedType == 0) || ((selectedType == 1) && ((blist[i].type >= 6) && (blist[i].type <= 8)) && (contx == blist[i].cx) && (conty == blist[i].cy)) || ((selectedType == 2) && (blist[i].type == 12))) {
                                                list = resMain.dungeons[blist[i].type].dn + " lv:" + blist[i].level + " " + blist[i].x + ":" + blist[i].y;
                                                this.sbBoss.add(new qx.ui.form.ListItem(list, null, blist[i].id));
                                            };
                                        };
                                    };
                                };
                            };

                            dlist.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });

                            if (!(dlist == undefined)) {
                                for (i = 0; i < dlist.length; i++) {
                                    if (!(dlist[i] == undefined)) {
                                        if ((selectedLevel <= dlist[i].level) && (ratiolow < dlist[i].level) && (ratiohigh > dlist[i].level)) {
                                            if (((selectedType == 0) && ((contx - 1) <= dlist[i].cx) && ((conty - 1) <= dlist[i].cy) && ((contx + 1) >= dlist[i].cx) && ((conty + 1) >= dlist[i].cy)) || ((selectedType == 1) && ((dlist[i].type >= 3) && (dlist[i].type <= 5)) && (contx == dlist[i].cx) && (conty == dlist[i].cy) && (dlist[i].realdist < 15)) || ((selectedType == 2) && (dlist[i].type == 2) && ((contx - 1) <= dlist[i].cx) && ((conty - 1) <= dlist[i].cy) && ((contx + 1) >= dlist[i].cx) && ((conty + 1) >= dlist[i].cy))) {
                                                //console.log(rt);
                                                list = ratiolist[dlist[i].level] + " " + resMain.dungeons[dlist[i].type].dn + " lv:" + dlist[i].level + " " + dlist[i].percent + "% " + "Dist: " + dlist[i].realdist + " " + dlist[i].x + ":" + dlist[i].y;
                                                this.sbDungeon.add(new qx.ui.form.ListItem(list, null, dlist[i].id));
                                            };
                                        };
                                    };
                                };
                            };

                            llist.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });

                            if (!(llist == undefined)) {
                                for (i = 0; i < llist.length; i++) {
                                    if (!(llist[i] == undefined)) {
                                        if ((contx == llist[i].cx) && (conty == llist[i].cy)) {
                                            var list = llist[i].x + ":" + llist[i].y + " " + llist[i].score + "p";
                                            if (llist[i].castle == 1) {
                                                list = list + " castle";
                                            };
                                            this.sbLawless.add(new qx.ui.form.ListItem(list, null, llist[i].id));
                                        };
                                    };
                                };
                            };

                            if (!(this.sbBoss.getSelection()[0] == undefined)) {
                                this.sbBoss.show();
                                this.btnSBDO.show();

                            } else {
                                this.sbBoss.exclude();
                                this.btnSBDO.exclude();

                            };

                            if (!(this.sbDungeon.getSelection()[0] == undefined)) {
                                this.sbDungeon.show();
                                this.btnSDDO.show();
                            } else {
                                this.sbDungeon.exclude(); this.btnSDDO.exclude(); ;
                            };


                            if (!(this.sbLawless.getSelection()[0] == undefined)) {
                                this.sbLawless.show();
                            } else {
                                this.sbLawless.exclude();
                            };
                            this.distCID = cityid;

                            this.distUpdating = false;
                            //console.log(this.distUpdating);
                            console.log("Done distance updating");
                        },
                        updateButtons: function () {
                            currentTime = new Date().getTime();
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();
                            var cVer = cgi.getVersion();
                            if ((currentTime > (this.lastUpdate + 1000)) || !(this.layout.cityId == cId) || !(cVer == this.layout.cv)) { // 
                                if (this.app.visMain.mapmode == "c") {
                                    var srvName = webfrontend.data.Server.getInstance().getName();
                                    buildQueue = webfrontend.data.City.getInstance().buildQueue;
                                    if (buildQueue == null) {
                                        buildQueue = [];
                                    };
                                    bql = buildQueue.length;
                                    bc = cgi.getBuildingCount();
                                    if ((cVer != this.layout.cv) || (this.layout.cityId != cId))
                                    {
                                        this.getCity();
                                    };
                                    if (!((this.layout.bql == bql) && (this.layout.bc == bc))) {
                                        this.getCity();
                                        this.layout.bql = bql;
                                        this.layout.bc = bc;
                                    };
                                    if (this.layout.cityId == cId) {
                                        //same city
                                        var c;
                                        var ss;
                                        var cequal = true;
                                        if (_LT.main.layoutWindow.cityLayouts[srvName].hasOwnProperty(cId)) {
                                            ss = _LT.main.layoutWindow.cityLayouts[srvName][cId];
                                            c = this.layout.city;
                                            for (i = 0; i < 441; i++) {
                                                if (this.layout.cc == null || c== null) {
                                                    cequal = false;
                                                    break;
                                                }
                                                else {
                                                    if (this.layout.cc[i][2] != c[i][2]) {
                                                        cequal = false;
                                                        break;
                                                    };
                                                };
                                            };
                                        }
                                        else {
                                            ss = null;
                                            c = null;
                                            if (!(this.layout.cc == null)) {
                                                cequal = false;
                                            };
                                        };

                                        if ((this.layout.ss == ss) && (cequal) && (cVer == this.layout.cv)) {
                                            //no change
                                        }
                                        else {
                                            this.layout.ss = ss;
                                            this.layout.cc = c;
                                            this.layout.cv == cVer;
                                            this.COlayout.cityId = 0;
                                            if ((ss == null) || (c == null)) {
                                                //No layout
                                                this.activeButton[3] = false;
                                                this.activeButton[4] = false;
                                                this.activeButton[5] = false;
                                                this.activeButton[6] = false;
                                                this.activeButton[7] = false;
                                            }
                                            else {
                                                this.newLayout();


                                                var beEmpty = true;
                                                for (var be in this.buildEmpty) {
                                                    beEmpty = false;
                                                    break;
                                                };
                                                if (beEmpty) {
                                                    this.activeButton[3] = false;
                                                    this.activeButton[4] = false;
                                                } else {
                                                    this.activeButton[3] = true;
                                                    this.activeButton[4] = false;

                                                    for (var buildid in this.buildEmpty) {
                                                        var building = this.buildEmpty[buildid].layout;

                                                        for (var oBuildId in this.buildOccupied) {
                                                            if (this.buildOccupied[oBuildId].city == building) {
                                                                this.activeButton[4] = true;
                                                                break;
                                                            };
                                                        };
                                                        if (this.activeButton[4] == true) {
                                                            break;
                                                        };

                                                    };
                                                };
                                                this.activeButton[5] = false;
                                                for (var oBuildId in this.buildOccupied) {
                                                    citybuild = this.buildOccupied[oBuildId].city;
                                                    if ((((this.buildOccupied[oBuildId].city >= 1) && (this.buildOccupied[oBuildId].city <= 23)) || ((this.buildOccupied[oBuildId].city >= 36) && (this.buildOccupied[oBuildId].city <= 50))) && (this.buildCount[citybuild].city > this.buildCount[citybuild].layout)) {
                                                        this.activeButton[5] = true;
                                                        break;
                                                    };
                                                };
                                                this.activeButton[6] = false;
                                                for (var oBuildId in this.buildOccupied) {
                                                    if ((this.buildOccupied[oBuildId].city >= 900) && (this.buildOccupied[oBuildId].city <= 903)) {
                                                        this.activeButton[6] = true;
                                                        break;
                                                    };
                                                };
                                                if (!(this.buildCount[99] == undefined) || (cgi.getWallLevel() == 0)) {
                                                    this.activeButton[7] = true;
                                                }
                                                else {
                                                    this.activeButton[7] = false;
                                                };
                                            };
                                        };
                                    } //End same city
                                    else {
                                        //New city
                                        var c;
                                        var ss;
                                        var cequal = true;
                                        this.layout.cityId = cId;
                                        this.activeButton = new Array(true, true, true, false, false, false, false, false);
                                        if (_LT.main.layoutWindow.cityLayouts[srvName].hasOwnProperty(cId)) {
                                            ss = _LT.main.layoutWindow.cityLayouts[srvName][cId];
                                            c = _LT.city;
                                            for (i = 0; i < 441; i++) {
                                                if (this.layout.cc == null) {
                                                    cequal = false;
                                                    break;
                                                }
                                                else {
                                                    if (this.layout.cc[i][2] != c[i][2]) {
                                                        cequal = false;
                                                    };
                                                };
                                            };
                                        }
                                        else {
                                            ss = null;
                                            c = null;
                                            if (!(this.layout.cc == null)) {
                                                cequal = false;
                                            };
                                        };
                                        this.layout.ss = ss;
                                        this.layout.cc = c;
                                        this.layout.cv == cVer;

                                        if ((ss == null) || (c == null)) {
                                            //No layout
                                        }
                                        else {
                                            this.newLayout();


                                            var beEmpty = true;
                                            for (var be in this.buildEmpty) {
                                                beEmpty = false;
                                                break;
                                            };
                                            if (beEmpty) {
                                                this.activeButton[3] = false;
                                                this.activeButton[4] = false;
                                            } else {
                                                this.activeButton[3] = true;
                                                this.activeButton[4] = false;

                                                for (var buildid in this.buildEmpty) {
                                                    var building = this.buildEmpty[buildid].layout;

                                                    for (var oBuildId in this.buildOccupied) {
                                                        if (this.buildOccupied[oBuildId].city == building) {
                                                            this.activeButton[4] = true;
                                                            break;
                                                        };
                                                    };
                                                    if (this.activeButton[4] == true) {
                                                        break;
                                                    };

                                                };
                                            };
                                            this.activeButton[5] = false;
                                            for (var oBuildId in this.buildOccupied) {
                                                citybuild = this.buildOccupied[oBuildId].city;
                                                if ((((this.buildOccupied[oBuildId].city >= 1) && (this.buildOccupied[oBuildId].city <= 23)) || ((this.buildOccupied[oBuildId].city >= 36) && (this.buildOccupied[oBuildId].city <= 50))) && (this.buildCount[citybuild].city > this.buildCount[citybuild].layout)) {
                                                    this.activeButton[5] = true;
                                                    break;
                                                };
                                            };
                                            this.activeButton[6] = false;
                                            for (var oBuildId in this.buildOccupied) {
                                                if ((this.buildOccupied[oBuildId].city >= 900) && (this.buildOccupied[oBuildId].city <= 903)) {
                                                    this.activeButton[6] = true;
                                                    break;
                                                };
                                            };
                                            if (!(this.buildCount[99] == undefined) || (cgi.getWallLevel() == 0)) {
                                                this.activeButton[7] = true;
                                            }
                                            else {
                                                this.activeButton[7] = false;
                                            };

                                        };
                                    }
                                }
                                else {
                                    //Not cityview
                                    this.activeButton[3] = false;
                                    this.activeButton[4] = false;
                                    this.activeButton[5] = false;
                                    this.activeButton[6] = false;
                                    this.activeButton[7] = false;
                                    this.layout.cityId = 0;
                                };
                                if ((cgi.getAutoBuildOptionDefense()) && (cgi.getAutoBuildOptionEconomy()) && (cgi.getAutoBuildTypeFlags() == 255)) {
                                    this.activeButton[0] = true;
                                    this.btnBuild.set({ toolTipText: "Set Autobuild - Build All" });
                                }
                                else {
                                    var flag = cgi.getAutoBuildTypeFlags();

                                    if (flag == 2) {
                                        this.btnBuild.set({ toolTipText: "Set Autobuild - Cottage only" });
                                    }
                                    else
                                        if (flag == 50) {
                                            this.btnBuild.set({ toolTipText: "Set Autobuild - Cottage, warehouses and others" });
                                        }
                                        else
                                            if (flag == 253) {
                                                this.btnBuild.set({ toolTipText: "Set Autobuild - All but cottages" });
                                            }
                                            else
                                                if (flag == 63) {
                                                    this.btnBuild.set({ toolTipText: "Set Autobuild - All but walls and towers" });
                                                }
                                                else
                                                    if (flag == 61) {
                                                        this.btnBuild.set({ toolTipText: "Set Autobuild - All but walls and towers and cottages" });
                                                    }
                                                    else
                                                        if (flag == 0) {
                                                            this.btnBuild.set({ toolTipText: "Set Autobuild - Off" });
                                                        }
                                                        else {
                                                            this.btnBuild.set({ toolTipText: "Set Autobuild - Mixed" });
                                                        };
                                    this.activeButton[0] = true;

                                };
                                this.btnBuild.setEnabled(this.activeButton[0]);
                                this.btnTrade.setEnabled(this.activeButton[1]);
                                this.btnName.setEnabled(this.activeButton[2]);
                                this.btnLB.setEnabled(this.activeButton[3]);
                                this.btnLM.setEnabled(this.activeButton[4]);
                                this.btnLDB.setEnabled(this.activeButton[5]);
                                this.btnLDR.setEnabled(this.activeButton[6]);
                                this.btnLW.setEnabled(this.activeButton[7]);

                                this.lastUpdate = currentTime;
                            };

                        },
                        buildWallAuto: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };
                            this.buildWall("Auto",28);
                        },
                        buildWall: function (wType,count) {
                            localWType = wType;
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();
                            console.log("buildWall: Wtype:",localWType, "Count:", count);
                            this.update();
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {
                                c = this.layout.cc;
                                //if (c[2][1] == 0) 
                                console.log("buildWall: wall is building?:", curcity.getIsBuildingWall(), "wall level", curcity.getWallLevel());
                                if ((curcity.getIsBuildingWall() == false) && (curcity.getWallLevel() == 0)) {
                                    if (!(this.isInQueue(67335))) {
                                        console.log("buildWall: Upgrade wall! Bufferlength:", this.sendCommandBuffer.length);
                                        if (this.options.ministers.build) {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cityid, p: { cityid: cityid, buildingid: 264710, buildingType: 23, isPaid: false } });
                                        } else {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cityid, p: { cityid: cityid, buildingid: 264710, buildingType: 23, isPaid: true } });
                                        }
                                            //                                        console.log(buildid + " " + building);
                                        console.log(this.sendCommandBuffer.length);
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    };
                                }
                                else {
                                    var Player = webfrontend.data.Player.getInstance();
                                    var cities = Player.cities;

                                    if (wType == "Auto") {
                                        ref = this.parseReference(cities[cityid].reference)
                                        if (ref.isPalace) {
                                            localWType = "P"
                                        } else if (ref.isCastle) {
                                            localWType = "C1"
                                        } else if (ref.isRessource) {
                                            localWType = "R"
                                        } else {
                                            localWType = "D"
                                        }
                                    }
                                    switch (localWType) {
                                        case "P":
                                            {
                                                template = this.options.towers.towersTemplateP;
                                                break;
                                            };
                                        case "C1":
                                            {
                                                template = this.options.towers.towersTemplateC1;
                                                break;
                                            };
                                        case "C2":
                                            {
                                                template = this.options.towers.towersTemplateC2;
                                                break;
                                            };
                                        case "R":
                                            {
                                                template = this.options.towers.towersTemplateR;
                                                break;
                                            };
                                        case "D":
                                            {
                                                template = this.options.towers.towersTemplate;
                                                break;
                                            };
                                        default:
                                            {
                                                template = this.options.towers.towersTemplate;
                                                break;
                                            };
                                    };
                                    console.log("buildWall: WType:", localWType, "Template:", template);
                                   
                                    for (var bid in template) {
                                        if (count > 0) {
                                            index = template[bid].x - 1 + (template[bid].y - 1) * 21;
                                            if (c[index][2] == 99) {
                                                count--;
                                                if (this.options.ministers.build) {
                                                    this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: (bid - 131072), buildingType: template[bid].buildingType, isPaid: false } });
                                                } else {
                                                    this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: (bid - 131072), buildingType: template[bid].buildingType, isPaid: true } });
                                                };
                                                if (!this.sendCommandBusy) {
                                                    this.sendCommandBusy = true;
                                                    this.sendCmd();
                                                }
                                            };
                                        };
                                    };
                                };
                            };

                        },
                        destroyBuildingDefault: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };
                            this.destroyBuilding("A", -1)
                        },
                        destroyBuilding: function (bType, bCount) {
                            this.update();
                            console.log("destroyBuilding:", bType, bCount);
                            count = bCount;
                            tempBufferFree = [];
                            tempCBufferOccupy = [];
                            tempCBuffer = [];
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                for (var oBuildId in this.buildOccupied) {
                                    if (count == 0) {
                                        break;
                                    };
                                    citybuild = this.buildOccupied[oBuildId].city;
                                    if ((bType == "A") || ((bType == "C") && (citybuild == 4)) || ((bType == "NC") && (citybuild != 4))) {
                                        if ((this.buildOccupied[oBuildId].city >= 1) && (this.buildOccupied[oBuildId].city <= 50) && (this.buildCount[citybuild].city > this.buildCount[citybuild].layout) && ((this.buildOccupied[oBuildId].city > 30) || (this.buildOccupied[oBuildId].city < 27))) {
                                            this.buildCount[citybuild].city = this.buildCount[citybuild].city - 1;
                                            if (citybuild == 4) {
                                                if (this.buildOccupied[oBuildId].layout == 98) {
                                                    tempCBuffer.push({ a: "DemolishBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 65536) } });
                                                } else {
                                                    tempCBufferOccupy.push({ a: "DemolishBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 65536) } });
                                                };
                                            } else {
                                                if (this.buildOccupied[oBuildId].layout == 98) {
                                                    tempBufferFree.push({ a: "DemolishBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 65536) } });
                                                } else {
                                                    count--;
                                                    this.buildOccupied[oBuildId].city = 98;
                                                    this.sendCommandBuffer.push({ a: "DemolishBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 65536) } });
                                                    //                                        console.log(buildid + " " + building);
                                                };
                                            };
                                        };
                                    };
                                };
                                while ((0 < tempBufferFree.length) && !(count == 0)) {
                                    //console.log("destroyBuilding:",count,tempCBuffer.length,i, tempCBuffer);
                                    count--;
                                    cmd = tempBufferFree.shift();
                                    tempbid = cmd.p.buildingid + 65536;
                                    this.buildOccupied[tempbid].city = 98;
                                    this.sendCommandBuffer.push(cmd);
                                    //this.sendCommandBuffer = this.sendCommandBuffer.concat(tempCBuffer);
                                };
                                while ((0 < tempCBufferOccupy.length) && !(count == 0)) {
                                    //console.log("destroyBuilding:",count,tempCBuffer.length,i, tempCBuffer);
                                    count--;
                                    cmd = tempCBufferOccupy.shift();
                                    tempbid = cmd.p.buildingid + 65536;
                                    this.buildOccupied[tempbid].city = 98;
                                    this.sendCommandBuffer.push(cmd);
                                    //this.sendCommandBuffer = this.sendCommandBuffer.concat(tempCBuffer);
                                };
                                while ((0 < tempCBuffer.length) && !(count == 0)) {
                                    //console.log("destroyBuilding:",count,tempCBuffer.length,i, tempCBuffer);
                                    count--;
                                    cmd = tempCBuffer.shift();
                                    tempbid = cmd.p.buildingid + 65536;
                                    this.buildOccupied[tempbid].city = 98;
                                    this.sendCommandBuffer.push(cmd);
                                    //this.sendCommandBuffer = this.sendCommandBuffer.concat(tempCBuffer);
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                            };
                        },
                        destroyStuff: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };
                            this.destroyStuffMenu(-1);
                        },
                        destroyStuffMenu: function (cCount) {
                            this.update();
                            count = cCount;
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                for (var oBuildId in this.buildOccupied) {
                                    if (count == 0) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        }; return;
                                    };
                                    if ((this.buildOccupied[oBuildId].city >= 900) && (this.buildOccupied[oBuildId].city <= 903) && (this.buildOccupied[oBuildId].layout != 98)) {
                                        count--
                                        this.buildOccupied[oBuildId].city = 98;
                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 131072), buildingType: 27, isPaid: true} });
                                        //                                        console.log(buildid + " " + building);
                                       
                                    };
                                    if (!this.sendCommandBusy) {
                                        this.sendCommandBusy = true;
                                        this.sendCmd();
                                    };
                                };
                                for (var oBuildId in this.buildOccupied) {
                                    if (count == 0) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        }; return;
                                    };
                                    if ((this.buildOccupied[oBuildId].city >= 900) && (this.buildOccupied[oBuildId].city <= 903)) {
                                        count--
                                        this.buildOccupied[oBuildId].city = 98;
                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "destroy", cid: cId, p: { cityid: cId, buildingid: (oBuildId - 131072), buildingType: 27, isPaid: true} });
                                        //                                        console.log(buildid + " " + building);
                                        
                                    };
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                            };

                        },
                        moveStuff: function () {
                            this.update();
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                for (var buildid in this.buildEmpty) {
                                    var building = this.buildEmpty[buildid].layout;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    bId = "";
                                    bLevel = 0;

                                    for (var oBuildId in this.buildOccupied) {
                                        if (this.buildOccupied[oBuildId].city == building) {
                                            if (this.buildOccupied[oBuildId].level >= bLevel) {
                                                bId = oBuildId;
                                                bLevel = this.buildOccupied[oBuildId].level;
                                            };
                                        };
                                    };
                                    if (bId != "" && bLevel != 0) {
                                        console.log("moveStuff:", building, buildid, bId, bLevel, this.buildOccupied, this.buildEmpty);
                                        this.buildOccupied[bId].city = 98;
                                        this.sendCommandBuffer.push({ a: "BuildingRelocate", act: "move", cid: cId, p: { cityid: cId, id0: (bId - 65536), id1: buildid} });
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                    };
                                };
                            };


                        },
                        buildMenuStuff: function (bType, bCount) {
                            count = bCount;
                            this.update();
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                if (bType == "A") {
                                    for (var buildid in this.buildEmpty) { /** MT, WH, Hideout, MP and Cottage first **/
                                        if (count == 0) {
                                            if (!this.sendCommandBusy) {
                                                this.sendCommandBusy = true;
                                                this.sendCmd();
                                            }; return;
                                        };
                                        var building = this.buildEmpty[buildid].layout;
                                        //                                    console.log("Empty: " + buildid + " " + building);
                                        if (building == 0) {
                                            //do nothing
                                        }
                                        else if ((this.buildCount[building].city < this.buildCount[building].layout)) {
                                            if ((building == 21)) {
                                                //                                            console.log("Dont build castle");
                                            } else if ((building == 4) || (building == 5) || (building == 20) || ((building == 36)&&(this.buildCount[building].city ==0))) {
                                                delete this.buildEmpty[buildid];
                                                count--;
                                                this.buildCount[building].city = this.buildCount[building].city + 1;
                                                this.somethingbuilt = true;

                                                if (this.options.ministers.build) {
                                                    this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                                } else {
                                                    this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: true } });
                                                };
                                            };
                                        };
                                    };
                                }
                                for (var buildid in this.buildEmpty) {
                                    if (count == 0) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        }; return;
                                    };
                                    var building = this.buildEmpty[buildid].layout;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if (building == 0) {
                                        //do nothing
                                    }
                                    else if ((this.buildCount[building].city < this.buildCount[building].layout)) {
                                        if ((building == 21)) {
                                            //                                            console.log("Dont build castle");
                                        } else if ((bType == "A") || ((bType == "C") && (building == 4)) || ((bType == "N") && (building == 19)) || ((bType == "NB") && (building == 14) && ((buildid >= 134928 && buildid <= 134931) || (buildid >= 135183 && buildid <= 135188) || (buildid >= 135439 && buildid <= 135444) || (buildid == 135695) || (buildid >= 135951 && buildid <= 135953) || (buildid >= 136208 && buildid <= 136210)))) {
                                            delete this.buildEmpty[buildid];
                                            count--;
                                            this.buildCount[building].city = this.buildCount[building].city + 1;
                                            this.somethingbuilt = true;

                                            if (this.options.ministers.build) {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                            } else {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: true } });
                                            };
                                        };
                                    };
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                            };
                        },
                        upgradeMenuStuff: function (bType, bCount, bLevel) {
                            count = bCount;
                            this.update();
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {
                                buildQueue = webfrontend.data.City.getInstance().buildQueue;
                                var Player = webfrontend.data.Player.getInstance();
                                this.somethingbuilt = false;
                                if (buildQueue == null) {
                                    buildQueue = [];
                                };
                                freeQueue = Player.getMaxBuildQueueSize() - buildQueue.length;

                                for (var buildid in this.buildings) {
                                    if (count <= 0 || freeQueue <= 0) {
                                        return;
                                    };
                                    var building = this.buildings[buildid].city;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if (building == 0) {
                                        //do nothing
                                    }
                                    else if ((this.buildings[buildid].level < 10)) {
                                        if ((building == 21)) {
                                            //                                            console.log("Dont build castle");
                                        } else if ((bType == "A") || ((bType == "C") && (building == 4)) || ((bType == "T") && (building == 12)) || ((bType == "MT") && (building == 36)) || ((bType == "MP") && (building == 5))) {
                                            if (!this.isInQueue(buildid)) {
                                                count--;
                                                while (this.buildings[buildid].level < bLevel && freeQueue > 0) {
                                                    this.somethingbuilt = true;
                                                    freeQueue = freeQueue - 1;
                                                    this.buildings[buildid].level = this.buildings[buildid].level + 1;
                                                    console.log("upgradeMenuStuff buildid:", buildid, "level", this.buildings[buildid].level, "bLevel", bLevel);
                                                    if (this.options.ministers.build) {
                                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                                    } else {
                                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: true } });
                                                    };
                                                    if (!this.sendCommandBusy) {
                                                        this.sendCommandBusy = true;
                                                        this.sendCmd();
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                for (var buildid in this.buildEmpty) {
                                    if (count <= 0 || freeQueue <= 0) {
                                        return;
                                    };
                                    var building = this.buildEmpty[buildid].city;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if (building == 0) {
                                        //do nothing
                                    }
                                    else {
                                        if ((building == 21)) {
                                            //                                            console.log("Dont build castle");
                                        } else if ((bType == "A") || ((bType == "C") && (building == 4)) || ((bType == "T") && (building == 12)) || ((bType == "MT") && (building == 36)) || ((bType == "MP") && (building == 5))) {
                                            if (!this.isInQueue(buildid)) {
                                                count--;
                                                lv = 0;
                                                while (lv < bLevel && freeQueue > 0) {
                                                    this.somethingbuilt = true;
                                                    freeQueue = freeQueue - 1;
                                                    lv = lv + 1;
                                                    console.log("upgradeMenuStuff new buildid:", buildid, "level", this.buildings[buildid].level, "bLevel", bLevel);
                                                    if (this.options.ministers.build) {
                                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                                    } else {
                                                        this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "buildone", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                                    };
                                                    if (!this.sendCommandBusy) {
                                                        this.sendCommandBusy = true;
                                                        this.sendCmd();
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        },
                        buildStuff: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            }
                            this.buildStuffDo();
                        },
                        buildStuffDo: function () {
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();

                            var count = cgi.getBuildingLimit() - cgi.getBuildingCount()

                            this.update();
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                for (var buildid in this.buildEmpty) {
                                    if (count <= 0) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                        return;
                                    };
                                    var building = this.buildEmpty[buildid].layout;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if (building == 0) {
                                        //do nothing
                                    }
                                    else if ((this.buildCount[building].city < this.buildCount[building].layout)) {
                                        if ((building == 21)) {
                                            //                                            console.log("Dont build castle");
                                        } else if ((building == 4) || (building == 5) || (building == 20) || ((building == 36) && (this.buildCount[building].city == 0))) {
                                            delete this.buildEmpty[buildid];
                                            count--;
                                            this.buildCount[building].city = this.buildCount[building].city + 1;
                                            if (this.options.ministers.build) {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                            } else {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                            };
                                        };
                                    };
                                };
                                for (var buildid in this.buildEmpty) {
                                    if (count <= 0) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                        return;
                                    };
                                    var building = this.buildEmpty[buildid].layout;
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if (building == 0) {
                                        //do nothing
                                    }
                                    else if ((this.buildCount[building].city < this.buildCount[building].layout)) {
                                        if ((building == 21)) {
                                            //                                            console.log("Dont build castle");
                                        } else  {
                                            delete this.buildEmpty[buildid];
                                            count--;
                                            this.buildCount[building].city = this.buildCount[building].city + 1;
                                            if (this.options.ministers.build) {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                            } else {
                                                this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: true } });
                                           };
                                        };
                                    };
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                            };
                        },
                        buildCottage: function (amount) {
                            var cgi = webfrontend.data.City.getInstance();
                            var cId = cgi.getId();

                            var count = cgi.getBuildingLimit() - cgi.getBuildingCount()

                            this.update();
                            if (this.buildCount[4] == undefined) {
                                this.buildCount[4] = {
                                    city: 0,
                                    layout: 0
                                };
                            };
                            if (!((this.layout.ss == null) || (this.layout.cc == null)) && this.layout.cityId == webfrontend.data.City.getInstance().getId()) {

                                for (var buildid in this.buildEmpty) {
                                    var building = this.buildEmpty[buildid].layout;
                                    if (count <= 0 && this.buildCount[4].city >= amount) {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        };
                                        return;
                                    };
                                    //                                    console.log("Empty: " + buildid + " " + building);
                                    if ( building == 4 ) {
                                        delete this.buildEmpty[buildid];
                                        count--;
                                        this.buildCount[building].city = this.buildCount[building].city + 1;
                                        if (this.options.ministers.build) {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: false } });
                                        } else {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: building, isPaid: true } });
                                        };

                                                };
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                                console.log("buildCottage: buildunused:",this.buildUnused);
                                if (this.buildCount[4] == undefined) {
                                    this.buildCount[4] = {
                                        city: 0,
                                        layout: 0
                                    };
                                };
                                for (var buildid in this.buildUnused) {
                                    var building = this.buildUnused[buildid].city;
                                    //      
                                    if ((this.buildCount[4].city < amount && count > 0)) {
                                        delete this.buildUnused[buildid];
                                        count--;
                                        this.buildCount[4].city = this.buildCount[4].city + 1;
                                        if (this.options.ministers.build) {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: 4, isPaid: false } });
                                        } else {
                                            this.sendCommandBuffer.push({ a: "UpgradeBuilding", act: "build", cid: cId, p: { cityid: cId, buildingid: buildid, buildingType: 4, isPaid: true } });
                                        };
                                    }
                                    else {
                                        if (!this.sendCommandBusy) {
                                            this.sendCommandBusy = true;
                                            this.sendCmd();
                                        }; return;
                                    };
                                };
                                if (!this.sendCommandBusy) {
                                    this.sendCommandBusy = true;
                                    this.sendCmd();
                                };
                            };

                        },
                        sendCmd: function () {
                            //Minimumtime in ms between send commands
                            waittime = 50;
                            if (this.sendCommandWaitForReply == true) {
                                return;
                            };

                            if (this.sendCommandBuffer.length == 0) {
                                this.sendCommandBusy = false;
                                this.layout.bc = 0;
                                this.update();
                                this.layout.bc = 0;
                                this.timer.start(this.update, null, this, null, 2000);
                                this.WC.LastCity = "";
                                return;
                            };
                            if (this.sendCommandBuffer[0].act == "raid") {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCommandWaitForReply = true;
                                webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                            } else if (this.sendCommandBuffer[0].act == "delayraid") {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCommandWaitForReply = true;
                                ServerTime = webfrontend.data.ServerTime.getInstance();
                                CurrentTime = webfrontend.Util.getCurrentTime();
                                var TimeOffset = 0;

                                if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                    TimeOffset += CurrentTime.getTimezoneOffset() / 60;
                                    if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                    else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                                }
                                UTCMili = new Date(CurrentTime.getTime());
                                UTCMili.setHours(UTCMili.getHours() - TimeOffset);
                                UTCMili.setSeconds(UTCMili.getSeconds() + 2);
                                UTCMili.setMilliseconds(500)
                                console.log("sendCmd: UTCMili:", UTCMili, UTCMili.getTime());
                                cmd.p.referenceTimeUTCMillis = UTCMili.getTime();
                                webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                            } else if (this.sendCommandBuffer[0].act == "boss") {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCommandWaitForReply = true;
                                webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendBossDone, cmd.p);
                            } else if (this.sendCommandBuffer[0].act == "payqueue" || this.sendCommandBuffer[0].act == "fillqueue") {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCommandWaitForReply = true;
                                webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                            } else if (this.sendCommandBuffer[0].act == "cancelBuild") {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCommandWaitForReply = true;
                                webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                            } // End General
                            else if (this.app.visMain.mapmode == "c") {
                                Player = webfrontend.data.Player.getInstance();
                                buildQueue = webfrontend.data.City.getInstance().buildQueue;
                                if (buildQueue == null) {
                                    buildQueue = [];
                                };
                                if (this.sendCommandBuffer[0].act == "build") {
                                    var cgi = webfrontend.data.City.getInstance();
                                    var cId = cgi.getId();
                                    //                                        console.log(cgi.getBuildingCount() + " " + cgi.getBuildingLimit() + " " + buildQueue.length + " " + this.sendCommandBuffer.length);
                                    if ((cgi.getBuildingCount() >= (cgi.getBuildingLimit())) && (this.sendCommandBuffer[0].p.buildingid > 131072) && !(this.sendCommandBuffer[0].p.buildingid == 264710)) {
                                        cmd = this.sendCommandBuffer.shift();
                                        this.sendCmd();
                                        return;
                                    }
                                    else if (buildQueue.length >= Player.getMaxBuildQueueSize()) {
                                        //wait
                                    }
                                    else {
                                        cmd = this.sendCommandBuffer.shift();
                                        //LT.debug(cmd.a + ", " + cmd.p);
                                        if (cmd.cid == cId) {
                                            this.sendCommandWaitForReply = true;
                                            webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                                        } else {
                                            this.sendCmd();
                                            return;
                                        };
                                    };
                                } else if (this.sendCommandBuffer[0].act == "buildone") {
                                    var cgi = webfrontend.data.City.getInstance();
                                    var cId = cgi.getId();
                                    //                                        console.log(cgi.getBuildingCount() + " " + cgi.getBuildingLimit() + " " + buildQueue.length + " " + this.sendCommandBuffer.length);
                                    if (buildQueue.length >= Player.getMaxBuildQueueSize()) {
                                        //wait
                                    }
                                    else {
                                        cmd = this.sendCommandBuffer.shift();
                                        //LT.debug(cmd.a + ", " + cmd.p);
                                        if (cmd.cid == cId) {
                                            this.sendCommandWaitForReply = true;
                                            webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                                        } else {
                                            this.sendCmd();
                                            return;
                                        };
                                    };
                                } else if (this.sendCommandBuffer[0].act == "destroy") {
                                    var cgi = webfrontend.data.City.getInstance();
                                    var cId = cgi.getId();
                                    //                                        console.log(cgi.getBuildingCount() + " " + cgi.getBuildingLimit() + " " + buildQueue.length + " " + this.sendCommandBuffer.length);
                                    if (buildQueue.length >= Player.getMaxBuildQueueSize()) {
                                        //wait
                                    }
                                    else {
                                        cmd = this.sendCommandBuffer.shift();
                                        //LT.debug(cmd.a + ", " + cmd.p);
                                        if (cmd.cid == cId) {
                                            this.sendCommandWaitForReply = true;
                                            webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                                        } else {
                                            this.sendCmd();
                                            return;
                                        };
                                    };
                                } else {
                                    var cgi = webfrontend.data.City.getInstance();
                                    var cId = cgi.getId();
                                    cmd = this.sendCommandBuffer.shift();

                                    this.layout.bc = 0;

                                    if (cmd.cid == cId) {
                                        this.sendCommandWaitForReply = true;
                                        webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, this._onSendDone);
                                    } else {
                                        this.sendCmd();
                                        return;
                                    };
                                };
                                this.timer.start(this.sendCmd, null, this, null, 1000);

                            } //end if cityview
                            else {
                                cmd = this.sendCommandBuffer.shift();
                                this.sendCmd();
                                return;
                            };
                        },
                        sendMapCmd: function () {
                            //Minimumtime in ms between send commands
                            waittime = 50;
                            if (this.sendMapCommandWaitForReply == true) {
                                return;
                            };

                            if (this.sendMapCommandBuffer.length == 0) {
                                this.sendMapCommandBusy = false;
                                this.updateDistance();
                                this.btnFB.setEnabled(true);
                                this.WC.btnRaidControlSend.setEnabled(true);
                                this.WC.btnRaidControlAll.setEnabled(true);
                                this.WC.btnRaidControlMap.setEnabled(true);
                                this.WC.allWait = false;

                                this.sbLevel.show();
                                this.sbType.show();
                                this.sbRatio.show();
                                return;
                            };
                            cmd = this.sendMapCommandBuffer.shift();
                            this.sendMapCommandWaitForReply = true;
                            um = webfrontend.net.UpdateManager.getInstance();
                            //                            console.log(um);
                            reqid = um.requestCounter;
                            um.requestCounter++;
                            command = { requestid: reqid, requests: "WORLD:" + cmd.cell };
                            console.log(command);
                            webfrontend.net.CommandManager.getInstance().sendCommand("poll", command, this, this.getDataResult);
                        },
                        cityBuildButton: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };
                            this.cityBuild(true, true, true, true, true, true, true, true)
                        },
                        cityBuild: function (cottage, warehouse, economy, barracks, military, other, wall, towers) {
                            var flag = barracks + cottage * 2 + economy * 4 + military * 8 + other * 16 + warehouse * 32 + wall * 64 + towers * 128;
                            var defence = wall || towers;
                            var citybuild = cottage || warehouse || economy || barracks || military || other;
                            var city = webfrontend.data.City.getInstance();
                            var autobuild = {
                                cityid: city.getId(),
                                autoBuildOptionDefense: defence,
                                autoBuildOptionEconomy: citybuild,
                                autoBuildTypeFlags: flag
                            };
                            console.log(autobuild);
                            webfrontend.net.CommandManager.getInstance().sendCommand("CityAutoBuildParamsSet", autobuild, this, this._onSendDone, autobuild);
                        },
                        findTrade: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            var cities = Player.cities;
                            var dist = 1000;
                            var target = 0;
                            if (this.parseReference(cities[cityid].reference).isWarehouse) {
                                for (var city in cities) {
                                    if (this.parseReference(cities[city].reference).isHub) {
                                        var thisdist = this.getDistance(curX, curY, cities[city].xPos, cities[city].yPos);
                                        //console.log(cities[city].name + " " + cities[city].reference + " " + cities[city].xPos + " " + cities[city].yPos + " " + thisdist + " " + dist);
                                        if (thisdist < dist) {
                                            dist = thisdist;
                                            target = city;
                                            //console.log("New target: "+ target + " " + dist);
                                        }
                                    }
                                }
                            } else {
                                for (var city in cities) {
                                    if (this.parseReference(cities[city].reference).isWarehouse) {
                                        var thisdist = this.getDistance(curX, curY, cities[city].xPos, cities[city].yPos);
                                        //console.log(cities[city].name + " " + cities[city].reference + " " + cities[city].xPos + " " + cities[city].yPos + " " + thisdist + " " + dist);
                                        if (thisdist < dist) {
                                            dist = thisdist;
                                            target = city;
                                            //console.log("New target: "+ target + " " + dist);
                                        }
                                    }
                                }
                            };
                            if (target != 0) {
                                //console.log("CurCity Ref: " + cities[cityid].reference);
                                var ref = this.parseReference(cities[cityid].reference);
                                if (ref.isHub || ref.isTransport) {
                                    //Do not touch
                                    return;
                                }
                                else if (ref.isWarehouse) {
                                    this.cityTrade(target, 4000000, 4000000, 2000000, 2000000);
                                    return;
                                }
                                else if (ref.isCastle) {
                                    this.cityTrade(target, 200000, 200000, 200000, 575000);
                                    return;
                                }
                                else if (ref.isDefensive || ref.isRaiding) {
                                    this.cityTrade(target, 200000, 200000, 200000, 375000);
                                    return;
                                }
                                else if (ref.isBaron) {
                                    this.cityTrade(target, 200000, 200000, 100000, 100000);
                                    return;
                                }
                                else {
                                    this.cityTrade(target, 200000, 200000, 0, 0);
                                    return;
                                }

                            }

                        },
                        setName: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();
                            var curX = (cityid & 0xFFFF);
                            var curY = (cityid >> 16);
                            var cities = Player.cities;
                            var dist = 1000;
                            var Wname = "";
                            if (this.parseReference(cities[cityid].reference).isWarehouse) {
                                ContX = Math.floor(curX / 100);
                                ContY = Math.floor(curY / 100);
                                Cont = ContX + 6 * ContY;
                                if (Cont < 10) {
                                    Wname = Wname + String.fromCharCode(Cont + 48);
                                } else {
                                    Wname = Wname + String.fromCharCode(Cont + 55);
                                };

                                Xidx = Math.floor((curX % 100) / 20);
                                Yidx = Math.floor((curY % 100) / 20);
                                idx = Xidx + 5 * Yidx;
                                if (idx < 10) {
                                    Wname = Wname + String.fromCharCode(idx + 48);
                                } else {
                                    Wname = Wname + String.fromCharCode(idx + 55);
                                };
                                Wname = Wname + "000";
                            }
                            else {
                                for (var city in cities) {
                                    if (this.parseReference(cities[city].reference).isWarehouse) {
                                        var thisdist = this.getDistance(curX, curY, cities[city].xPos, cities[city].yPos);
                                        //console.log(cities[city].name + " " + cities[city].reference + " " + cities[city].xPos + " " + cities[city].yPos + " " + thisdist + " " + dist);
                                        if (thisdist < dist) {
                                            dist = thisdist;
                                            Wname = cities[city].name;
                                        }
                                    }
                                }
                            }
                            var rename = {
                                cityid: cityid,
                                name: this.findName(Wname)
                            };
                            webfrontend.net.CommandManager.getInstance().sendCommand("RenameCity", rename, this, this._onSendDone, rename);

                        },
                        repPosString: function (baseString, repString, pos) {
                            newString = "";
                            for (i = 0; i < baseString.length; i++) {
                                if (i == pos) {
                                    newString = newString + repString;
                                }
                                else {
                                    newString = newString + baseString[i];
                                };
                            };
                            return newString;
                        },
                        findName: function (baseName) {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var newName = baseName;
                            var curcity = webfrontend.data.City.getInstance();
                            var cityid = curcity.getId();

                            //                            console.log("findName start: " + baseName);
                            newName = this.repPosString(newName, "0", newName.length - 1);
                            //                            console.log("searching from: " + baseName);

                            looking = true;
                            if (this.parseReference(cities[cityid].reference).isWarehouse) {
                                while (looking) {
                                    //                                    console.log("looking: " + newName);

                                    //                                console.log(newName);
                                    looking = false;
                                    for (var city in cities) {

                                        if ((cities[city].name == newName) && !(city == cityid)) {
                                            if (this.parseReference(cities[city].reference).isWarehouse) {
                                                newName = this.repPosString(newName, "0", newName.length - 1);
                                                looking = true;
                                                newName = this.advanceName(newName, newName.length - 2);
                                                break;
                                            };
                                            looking = true;
                                            newName = this.advanceName(newName, newName.length - 1);
                                            break;
                                        };
                                    }
                                };
                            }
                            else {
                                while (looking) {
                                    //                                    console.log("looking: " + newName);

                                    //                                console.log(newName);
                                    looking = false;
                                    for (var city in cities) {
                                        if ((cities[city].name == newName) && !(city == cityid)) {
                                            looking = true;
                                            newName = this.advanceName(newName, newName.length - 1);
                                        }
                                    }

                                };
                            };

                            return newName;
                        },
                        advanceName: function (name, pos) {
                            if (pos == -1) {
                                return ("0" + name)
                            }
                            else {
                                switch (name.charAt(pos)) {
                                    case '9':
                                        {
                                            name = this.repPosString(name, "A", pos);
                                            return name;
                                        };
                                    case 'Z':
                                        {
                                            name = this.repPosString(name, "0", pos);
                                            name = this.advanceName(name, pos - 1);
                                            return name;
                                        };
                                    default:
                                        {
                                            name = this.repPosString(name, String.fromCharCode((name.charCodeAt(pos) + 1)), pos);
                                            return name;
                                        };
                                }
                            }
                        },
                        parseReference: function (ref) {
                            var result = {
                                isCastle: false,
                                isBuildInProgress: false,
                                isWarehouse: false,
                                hasMoonglowTower: false,
                                isGold: false,
                                isDefensive: false,
                                isRaiding: false,
                                isHub: false,
                                isTransport: false,
                                isBaron: false,
                                isPalace: false,
                                isRessource: false,
                                customTypes: new qx.data.Array([])
                            };

                            if (ref == null) {
                                return result;
                            }

                            var insideOptions = false;
                            for (var i = 0; i < ref.length; i++) {
                                var c = ref.charAt(i);
                                if (c == '*') {
                                    insideOptions = !insideOptions;
                                } else if (insideOptions) {
                                    switch (c) {
                                        case 'C':
                                            result.isCastle = true;
                                            break;
                                        case 'P':
                                            result.isPalace = true;
                                            break;
                                        case 'F':
                                            result.isCastle = true;
                                            break;
                                        case 'B':
                                            result.isBuildInProgress = true;
                                            break;
                                        case 'W':
                                            result.isWarehouse = true;
                                            break;
                                        case 'M':
                                            result.hasMoonglowTower = true;
                                            break;
                                        case 'G':
                                            result.isGold = true;
                                            break;
                                        case 'D':
                                            result.isDefensive = true;
                                            break;
                                        case 'I':
                                            result.isRaiding = true;
                                            break;
                                        case 'H':
                                            result.isHub = true;
                                            break;
                                        case 'T':
                                            result.isTransport = true;
                                            break;
                                        case 'X':
                                            result.isBaron = true;
                                            break;
                                        case 'R':
                                            result.isRessource = true;
                                            break;
                                        default:
                                            result.customTypes.push(c);
                                            break;
                                    }
                                }
                            }

                            return result;

                        },
                        cityTrade: function (destId, t1, t2, t3, t4) {
                            var city = webfrontend.data.City.getInstance();

                            var trade = {
                                cityid: city.getId(),
                                autoTradeParams: {
                                    dst: true,
                                    rst: true,
                                    dir: false,
                                    dor: false,
                                    r: [
                                    { t: 1, r: destId, s: 2, d: destId, p: t1 }, { t: 2, r: 0, s: 0, d: 0, p: t2 }, { t: 3, r: 0, s: 0, d: 0, p: t3 }, { t: 4, r: 0, s: 0, d: 0, p: t4}],
                                    ptr: false,
                                    rcr: 0,
                                    rsr: 0
                                }
                            };
                            webfrontend.net.CommandManager.getInstance().sendCommand("CityAutoTradeParamsSet", trade, this, this._onSendDone, trade);
                        },
                        getDistance: function (x1, y1, x2, y2) {
                            var diffX = Math.abs(x1 - x2);
                            var diffY = Math.abs(y1 - y2);
                            return Math.sqrt(diffX * diffX + diffY * diffY);
                        },
                        getDistanceUsingIds: function (id1, id2) {
                            var c1 = this.convertIdToCoodrinates(id1);
                            var c2 = this.convertIdToCoodrinates(id2);
                            return this.getDistance(c1.xPos, c1.yPos, c2.xPos, c2.yPos);
                        },
                        convertIdToCoodrinates: function (id) {
                            var o = this.convertIdToCoordinatesObject(id);
                            return o.xPos + ":" + o.yPos;
                        },
                        convertIdToCoordinatesObject: function (id) {
                            var o = {
                                xPos: (id & 0xFFFF),
                                yPos: (id >> 16)
                            }
                            o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
                            return o;
                        },
                        convertCoordinatesToId: function (xPos, yPos) {
                            var id = (xPos << 16) & yPos;
                            return id;
                        },
                        trimAll: function (sString) {
                            while (sString.substring(0, 1) == ' ') {
                                sString = sString.substring(1, sString.length);
                            };
                            while (sString.substring(sString.length - 1, sString.length) == ' ') {
                                sString = sString.substring(0, sString.length - 1);
                            };
                            return sString;
                        },
                        getCity: function () {
                            if (this.app.visMain.mapmode != "c") return;
                            //console.log("getCity: Start");
                            _cells = this.app.visMain.cells;
                            if (!_cells[0]) {
                                this.layout.cc = null;
                                //this.timerGC.start(this.getCity, null, this, null, 250);
                                return;
                            };
                            _cgi = webfrontend.data.City.getInstance();
                            waterCity = _cgi.getOnWater();

                            _se = new Array();
                            for (var _c in _cells) {
                                _cell = _cells[_c].entities;
                                for (var d in _cell) {
                                    if (_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
                                        if (_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
                                            if (_cell[d].selectNode.getY() < 880) {
                                                _se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
                                            } else {
                                                _se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
                                            }
                                            _se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
                                            _se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
                                            _se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
                                            _se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
                                        } else {
                                            if (_cell[d].getType) {
                                                if (_cell[d].getType() > 51 && _cell[d].getType() < 60) {
                                                    _se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
                                                    _se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
                                                    _se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
                                                }
                                            }
                                            _se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
                                        }
                                    }
                                }
                            }

                            _se.sort(function (a, b) { return a[1] - b[1]; });

                            city = new Array(441);
                            _empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
                            _water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

                            for (i = 0; i < city.length; i++) city[i] = null;

                            for (i = 0; i < _empty.length; i++) city[_empty[i]] = [-1, -1, -1]; // [buildingID/placeID, buildingLvl, buildingType]

                            if (waterCity) {
                                for (i = 0; i < _water.length; i++) city[_water[i]] = [-1, -1, -2];
                            }

                            try {
                                for (i = 0, c = 0; i < _se.length; i++) {
                                    while (city[c] != null) c++;
                                    if (_se[i][0].getResType != undefined)
                                        city[c] = [_se[i][0].getId(), 0, _se[i][0].getResType() + 900]; // resource node
                                    else if (_se[i][0].getType != undefined) {
                                        if (_se[i][0].getLevel != undefined) // building
                                            city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + this.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
                                        else
                                            city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + this.checkBuilding("wall"), _se[i][0].getType()]; // wall
                                    } else if (_se[i][0].getPlaceId != undefined) {
                                        if (_se[i][0].drawNode != null) {
                                            if (_se[i][0].drawNode.image != undefined) {
                                                if (_se[i][0].drawNode.image.indexOf("tower") != -1) {
                                                    city[c] = [_se[i][0].getPlaceId(), 0, 99]; // tower place
                                                } else {
                                                    city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty, can be corn field
                                                }
                                            } else if (_se[i][0].drawNode.basename == "EffectNode") {
                                                city[c] = [_se[i][0].getPlaceId(), 0, 99]; // ??? bottom left tower in water city
                                            }
                                        } else {
                                            if (waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
                                                city[c] = [_se[i][0].getPlaceId(), 0, 97]; // water building place
                                            } else {
                                                city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty
                                            }
                                        }
                                    }
                                }

                                for (i = 0; i < city.length; i++) {
                                    if (city[i] == null) {
                                        city = new Array(441);
                                        //this.timerGC.start(this.getCity, null, this, null, 1000);
                                        return;
                                    }
                                }

                                //LT.main.cityId = _cgi.getId();
                                this.layout.city = city;
                                //console.log("getCity: Done");
                            } catch (e) { console.log(e); }
                        },
                        checkBuilding: function (_buildingId) {
                            try {
                                cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
                                d = 0;
                                if (cBuildQueue != null) {
                                    for (j = 0; j < cBuildQueue.length; j++) {
                                        if (cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5)) return -11; // single downgrade / full demolish
                                        if (cBuildQueue[j].building == _buildingId) d++;
                                        if (cBuildQueue[j].type == 23 && _buildingId == "wall") d++; // is city wall on queue?
                                    }
                                }
                            } catch (e) { console.log(e); }
                            return d;
                        },

                    }
                });
                qx.Class.define("CityHelper.WeaponsControl", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        app: null,
                        window: null,
                        tbView: null,
                        tree: null,
                        cities: null,
                        firstTime: null,
                        started: null,
                        unitTypeToColMap: null,

                        TFAtk: null,
                        CBAtk: null,

                        TFSup: null,
                        CBSup: null,

                        TFReqSup: null,
                        CBReqSup: null,

                        TFReqAtk: null,
                        CBReqAtk: null,

                        TFRaidControl: null,
                        CBRaidControl: null,

                        sbType: null,
                        sbFakeType: null,
                        sbTiming: null,
                        tbH: null,
                        tbM: null,
                        tbS: null,
                        hbTme: null,
                        sbDay: null,

                        sbTimingSup: null,
                        tbHSup: null,
                        tbMSup: null,
                        tbSSup: null,
                        hbTmeSup: null,
                        sbDaySup: null,

                        sbTimingReqSup: null,
                        tbHReqSup: null,
                        tbMReqSup: null,
                        tbSReqSup: null,
                        hbTmeReqSup: null,
                        sbDayReqSup: null,

                        sbTimingReqAtk: null,
                        tbHReqAtk: null,
                        tbMReqAtk: null,
                        tbSReqAtk: null,
                        hbTmeReqAtk: null,
                        sbDayReqAtk: null,
                        sbReqAtkType: null,

                        btnAtkSend: null,
                        btnAtkStopRaid: null,

                        btnSupStopRaid: null,
                        btnSupSend: null,

                        btnReqSupSend: null,
                        btnReqSupUpdate: null,
                        ReqSupList: null,

                        btnReqAtkSend: null,
                        btnReqAtkUpdate: null,
                        ReqAtkList: null,

                        btnRaidControlSend: null,
                        btnRaidControlUpdate: null,
                        btnRaidControlAll: null,
                        btnRaidControlMap: null,
                        RaidControlList: null,
                        RaidControlStatusLabel: null,
                        RaidControlContSB: null,
                        RaidControlAffinitySB: null,
                        RaidControlCitiesQueued: 0,
                        RaidControlRaidsSent: 0,


                        TFReqLAtk: null,
                        CBReqLAtk: null,
                        sbTimingReqLAtk: null,
                        sbFakeTypeReqLAtk: null,
                        tbHReqLAtk: null,
                        tbMReqLAtk: null,
                        tbSReqLAtk: null,
                        hbTimeReqLAtk: null,
                        sbDayReqLAtk: null,
                        sbReqLAtkType: null,
                        btnReqLAtkSend: null,
                        btnReqLAtkUpdate: null,
                        ReqLAtkList: null,

                        LastCity: null,
                        ReqSupUpdateTimer: null,

                        allTimer: null,
                        allStep: null,
                        allWait: true,
                        allCount: 0,
                        allLast:0,

                        lastUpdate: null,

                        raidControlUpdate: null,

                        CH: null,
                        initialize: function () {
                            //                        },
                            //                        dummy:function(){
                            console.log("Weapons Control Initialize");
                            this.app = qx.core.Init.getApplication();
                            var resMain = webfrontend.res.Main.getInstance();
                            this.CH = CityHelper.main.getInstance();

                            this.lastUpdate = 0;

                            this.raidControlUpdate = false;

                            this.started = false;

                            this.LastCity = "";
                            this.ReqSupUpdateTimer = qx.util.TimerManager.getInstance();

                            this.ReqSupUpdateTimer.start(this.checkReqLists, null, this, null, 2000);

                            this.allTimer = qx.util.TimerManager.getInstance();
                            this.allStep = 0;

                            this.TFAtk = {};
                            this.CBAtk = {};
                            this.TFSup = {};
                            this.CBSup = {};
                            this.TFReqSup = {};
                            this.CBReqSup = {};
                            this.TFReqAtk = {};
                            this.CBReqAtk = {};
                            this.TFRaidControl = {};
                            this.CBRaidControl = {};
                            this.TFReqLAtk= {};
                            this.CBReqLAtk = {};
                        

                            this.tbView = new qx.ui.tabview.TabView();

                            this.cities = new Object();

                            var layout = new qx.ui.layout.Grid(9, 6);
                            layout.setColumnAlign(0, "right", "top");
                            layout.setColumnAlign(2, "right", "top");
                            layout.setColumnAlign(4, "right", "top");
                            layout.setColumnWidth(0, 80);
                            layout.setColumnWidth(1, 80);
                            layout.setColumnWidth(2, 80);
                            layout.setColumnWidth(3, 80);
                            layout.setColumnWidth(4, 80);
                            layout.setColumnWidth(5, 80);
                            var pageAtk = new qx.ui.tabview.Page("Attack");
                            //pageAtk.setLayout(new qx.ui.layout.VBox());
                            pageAtk.setLayout(layout);
                            //pageAtk.add(new qx.ui.basic.Label("Attack"));

                            var col = 0;
                            var rownum = 0;
                            lbl = ["Main", "Fake1", "Fake2", "Fake3", "Fake4", "FakeTS", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];

                            for (var i = 0; i < lbl.length; i++) {
                                pageAtk.add(new qx.ui.basic.Label(lbl[i]).set({
                                    allowShrinkX: false,
                                    paddingTop: 3
                                }), { row: rownum, column: col });
                                //console.log(lbl[i]);
                                str = lbl[i];
                                this.TFAtk[str] = new qx.ui.form.TextField("");
                                if (str != "FakeTS") {
                                    this.TFAtk[str].addListener("click", function (e) {
                                        if (e.getButton() == "right") {
                                            //console.log("set coords");
                                            //console.log(e);
                                            app = qx.core.Init.getApplication();
                                            cDetailView = app.getCityDetailView();
                                            if (cDetailView != undefined) {
                                                if (typeof cDetailView.city.get_Coordinates == "undefined") {
                                                    posX = cDetailView.city.getPosX(); posY = cDetailView.city.getPosY();
                                                } else {
                                                    ctid = cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                                };
                                                //console.log(posX + ':' + posY);
                                                e.getTarget().setValue(posX + ':' + posY);
                                            };
                                        }

                                    }, this);
                                };
                                pageAtk.add(this.TFAtk[str], { row: rownum, column: (col + 1) });
                                if (i == 5 || i == 10) {
                                    rownum = 0;
                                    col = col + 2;
                                } else {
                                    rownum = rownum + 1;
                                };
                            };
                            this.TFAtk["FakeTS"].setValue(CityHelper.main.getInstance().options.WeaponsControl.defaultFakeTs.toString());

                            rownum = rownum + 1;
                            this.sbType = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Attack Type" });
                            this.sbType.add(new qx.ui.form.ListItem("Assault", null, 3));
                            this.sbType.add(new qx.ui.form.ListItem("Siege", null, 5));
                            this.sbType.add(new qx.ui.form.ListItem("Scout", null, 1));
                            this.sbType.add(new qx.ui.form.ListItem("Plunder", null, 2));
                            pageAtk.add(this.sbType, { row: rownum, column: 0 });
                            this.sbTiming = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Timing Options" });
                            this.sbTiming.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
                            this.sbTiming.add(new qx.ui.form.ListItem("Departure", null, webfrontend.gui.SendArmyWindow.timings.depart));
                            this.sbTiming.add(new qx.ui.form.ListItem("Arrival", null, webfrontend.gui.SendArmyWindow.timings.arrive));
                            this.sbTiming.setModelSelection([webfrontend.gui.SendArmyWindow.timings.arrive]);
                            this.sbTiming.addListener("changeSelection", this.atkButtons, this);
                            //this.sbTiming.addListener("changeVisibility", function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this); 
                            pageAtk.add(this.sbTiming, { row: rownum, column: 1 });

                            //this.sbTiming.addListener(gK, function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this);
                            this.tbH = this.makeSpinner(23).set({ toolTipText: "h" });
                            this.app.setElementModalInput(this.tbH);
                            this.tbM = this.makeSpinner(59).set({ toolTipText: "m" });
                            this.app.setElementModalInput(this.tbM);
                            this.tbS = this.makeSpinner(59).set({ toolTipText: "s" });
                            this.app.setElementModalInput(this.tbS);

                            this.hbTime = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({ alignY: 'middle' }));
                            this.hbTime.add(this.tbH);
                            this.hbTime.add(new qx.ui.basic.Label(":"));
                            this.hbTime.add(this.tbM);
                            this.hbTime.add(new qx.ui.basic.Label(":"));
                            this.hbTime.add(this.tbS);
                            pageAtk.add(this.hbTime, { row: rownum, column: 2 });

                            this.sbDay = this.daybox();
                            pageAtk.add(this.sbDay, { row: rownum, column: 3 });

                            rownum = rownum + 1;

                            this.btnAtkSend = new qx.ui.form.Button("Send");
                            this.btnAtkSend.set({ toolTipText: "Send Attack" });
                            this.btnAtkSend.addListener("click", this.sendAttack, this);

                            pageAtk.add(this.btnAtkSend, { row: rownum, column: 4 });

                            this.CBAtk['InclAll'] = new qx.ui.form.CheckBox("Include all").set({
                                toolTipText: "Include all units or just those home"
                            });
                            pageAtk.add(this.CBAtk['InclAll'], { row: rownum, column: 1 });

                            this.CBAtk['AllTypes'] = new qx.ui.form.CheckBox("All types").set({
                                toolTipText: "Include all unittypes or just offensive"
                            });
                            pageAtk.add(this.CBAtk['AllTypes'], { row: rownum, column: 2 });

                            this.btnAtkStopRaid = new qx.ui.form.Button("Stop Raids");
                            this.btnAtkStopRaid.set({ toolTipText: "Stop Raids before attack leaves" });
                            this.btnAtkStopRaid.addListener("click", this.stopRaids, this);

                            pageAtk.add(this.btnAtkStopRaid, { row: rownum, column: 3 });

                            this.sbFakeType = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Fake Attack Type" });
                            this.sbFakeType.add(new qx.ui.form.ListItem("Same as main", null, 0));
                            this.sbFakeType.add(new qx.ui.form.ListItem("Assault", null, 3));
                            this.sbFakeType.add(new qx.ui.form.ListItem("Siege", null, 5));
                            this.sbFakeType.add(new qx.ui.form.ListItem("Scout", null, 1));
                            this.sbFakeType.add(new qx.ui.form.ListItem("Plunder", null, 2));
                            pageAtk.add(this.sbFakeType, { row: rownum, column: 0 });


                            this.tbView.add(pageAtk);



                            //****SUPPORT***



                            var layout = new qx.ui.layout.Grid(9, 6);
                            layout.setColumnAlign(0, "right", "top");
                            layout.setColumnAlign(2, "right", "top");
                            layout.setColumnAlign(4, "right", "top");
                            layout.setColumnWidth(0, 50);
                            layout.setColumnWidth(1, 80);
                            layout.setColumnWidth(2, 50);
                            layout.setColumnWidth(3, 80);
                            layout.setColumnWidth(4, 50);
                            layout.setColumnWidth(5, 80);

                            var pageSup = new qx.ui.tabview.Page("Support");
                            //pageAtk.setLayout(new qx.ui.layout.VBox());
                            pageSup.setLayout(layout);

                            col = 0;
                            rownum = 0;
                            for (var i = 1; i <= 15; i++) {
                                pageSup.add(new qx.ui.basic.Label('Target' + i).set({
                                    allowShrinkX: false,
                                    paddingTop: 3
                                }), { row: rownum, column: col });
                                this.TFSup[i] = new qx.ui.form.TextField("");
                                this.TFSup[i].addListener("click", function (e) {
                                    if (e.getButton() == "right") {
                                        //console.log("set coords");
                                        //console.log(e);
                                        app = qx.core.Init.getApplication();
                                        cDetailView = app.getCityDetailView();
                                        if (cDetailView != undefined) {
                                            if (typeof cDetailView.city.get_Coordinates == "undefined") {
                                                posX = cDetailView.city.getPosX(); posY = cDetailView.city.getPosY();
                                            } else {
                                                ctid = cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                            };
                                            //console.log(posX + ':' + posY);
                                            e.getTarget().setValue(posX + ':' + posY);
                                        };
                                    }

                                }, this);
                                pageSup.add(this.TFSup[i], { row: rownum, column: (col + 1) });
                                if (i == 5 || i == 10) {
                                    rownum = 0;
                                    col = col + 2;
                                } else {
                                    rownum = rownum + 1;
                                };
                            };
                            this.sbTimingSup = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Timing Options" });
                            this.sbTimingSup.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
                            this.sbTimingSup.add(new qx.ui.form.ListItem("Departure", null, webfrontend.gui.SendArmyWindow.timings.depart));
                            this.sbTimingSup.add(new qx.ui.form.ListItem("Arrival", null, webfrontend.gui.SendArmyWindow.timings.arrive));
                            this.sbTimingSup.addListener("changeSelection", this.supButtons, this);

                            pageSup.add(this.sbTimingSup, { row: rownum, column: 1 });

                            //this.sbTiming.addListener(gK, function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this);
                            this.tbHSup = this.makeSpinner(23).set({ toolTipText: "h" });
                            this.app.setElementModalInput(this.tbHSup);
                            this.tbMSup = this.makeSpinner(59).set({ toolTipText: "m" });
                            this.app.setElementModalInput(this.tbMSup);
                            this.tbSSup = this.makeSpinner(59).set({ toolTipText: "s" });
                            this.app.setElementModalInput(this.tbSSup);

                            this.hbTimeSup = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({ alignY: 'middle' }));
                            this.hbTimeSup.add(this.tbHSup);
                            this.hbTimeSup.add(new qx.ui.basic.Label(":"));
                            this.hbTimeSup.add(this.tbMSup);
                            this.hbTimeSup.add(new qx.ui.basic.Label(":"));
                            this.hbTimeSup.add(this.tbSSup);

                            pageSup.add(this.hbTimeSup, { row: rownum, column: 2 });

                            this.sbDaySup = this.daybox();

                            pageSup.add(this.sbDaySup, { row: rownum, column: 3 });

                            this.supButtons();

                            rownum = rownum + 1;

                            this.btnSupSend = new qx.ui.form.Button("Send");
                            this.btnSupSend.set({ toolTipText: "Send Support" });
                            this.btnSupSend.addListener("click", this.sendSupport, this);

                            pageSup.add(this.btnSupSend, { row: rownum, column: 4 });

                            this.CBSup['InclAll'] = new qx.ui.form.CheckBox("Include all").set({
                                toolTipText: "Include all units or just those home"
                            });
                            pageSup.add(this.CBSup['InclAll'], { row: rownum, column: 0 });

                            this.CBSup['AllTypes'] = new qx.ui.form.CheckBox("All types").set({
                                toolTipText: "Include all unittypes or just defensive"
                            });
                            pageSup.add(this.CBSup['AllTypes'], { row: rownum, column: 1 });

                            this.btnSupStopRaid = new qx.ui.form.Button("Stop Raids");
                            this.btnSupStopRaid.set({ toolTipText: "Stop Raids before support leaves" });
                            this.btnSupStopRaid.addListener("click", this.stopRaids, this);

                            pageSup.add(this.btnSupStopRaid, { row: rownum, column: 3 });

                            this.tbView.add(pageSup);

                            // ******Request Attack******

                            var rqlayout = new qx.ui.layout.Grid(10, 6);
                            rqlayout.setColumnAlign(0, "right", "top");
                            rqlayout.setColumnAlign(2, "right", "top");
                            rqlayout.setColumnWidth(0, 80);
                            rqlayout.setColumnWidth(1, 80);
                            rqlayout.setColumnWidth(2, 80);
                            rqlayout.setColumnWidth(3, 70);
                            rqlayout.setColumnWidth(4, 80);
                            rqlayout.setColumnWidth(5, 95);

                            var pageReqAtk = new qx.ui.tabview.Page("RequestAttack");
                            //pageAtk.setLayout(new qx.ui.layout.VBox());
                            pageReqAtk.setLayout(rqlayout);

                            this.ReqAtkList = new qx.ui.form.List;
                            this.ReqAtkList.set({ width: 150, selectionMode: "additive" });
                            this.ReqAtkList.setDragSelection(true);


                            rownum = 0;
                            col = 3;

                            dlist = ["Ranger", "Guardian", "Templar", "Scout", "Crossbow", "Paladin", "Ballista", "Sloop", "Frigate"];
                            for (var i = 0; i < dlist.length; i++) {

                                this.CBReqAtk[dlist[i]] = new qx.ui.form.CheckBox(dlist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqAtk[dlist[i]].addListener("changeValue", this.updateReqAtkList, this);
                                pageReqAtk.add(this.CBReqAtk[dlist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            rownum = 0;
                            col = 4;

                            olist = ["Beserker", "Mage", "Knight", "Warlock", "Ram", "Catapult", "WarGalleon"];
                            for (var i = 0; i < olist.length; i++) {

                                this.CBReqAtk[olist[i]] = new qx.ui.form.CheckBox(olist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqAtk[olist[i]].addListener("changeValue", this.updateReqAtkList, this);
                                pageReqAtk.add(this.CBReqAtk[olist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            this.CBReqAtk["SkipScheduled"] = new qx.ui.form.CheckBox("SkipScheduled").set({ toolTipText: "Skip Cities with Scheduled orders" });
                            this.CBReqAtk["SkipScheduled"].setValue(true);
                            this.CBReqAtk["SkipScheduled"].addListener("changeValue", this.updateReqAtkList, this);
                            pageReqAtk.add(this.CBReqAtk["SkipScheduled"], { row: 5, column: 5 });

                            this.CBReqAtk["CancelRaids"] = new qx.ui.form.CheckBox("CancelRaids").set({
                                toolTipText: "Cancel raids in cities you request attack from"
                            });
                            pageReqAtk.add(this.CBReqAtk["CancelRaids"], { row: 4, column: 5 });
                        
                            this.CBReqAtk["IncludeRaiding"] = new qx.ui.form.CheckBox("IncludeRaiding").set({
                                toolTipText: "Include troops out raiding"
                            });
                            this.CBReqAtk["IncludeRaiding"].addListener("changeValue", this.updateReqAtkList, this);
                            pageReqAtk.add(this.CBReqAtk["IncludeRaiding"], { row: 3, column: 5 });

                            pageReqAtk.add(new qx.ui.basic.Label("Target").set({
                                allowShrinkX: false,
                                paddingTop: 3
                            }), { row: 7, column: 4 });

                            this.TFReqAtk["Target"] = new qx.ui.form.TextField("").set({ toolTipText: "Send attack to this target" });
                            pageReqAtk.add(this.TFReqAtk["Target"], { row: 7, column: 5 });
                            
                            this.TFReqAtk["Target"].addListener("click", function (e) {
                                if (e.getButton() == "right") {
                                    //console.log("set coords");
                                    //console.log(e);
                                    app = qx.core.Init.getApplication();
                                    cDetailView = app.getCityDetailView();
                                    if (cDetailView != undefined) {
                                        if (typeof cDetailView.city.get_Coordinates == "undefined") {
                                            posX = cDetailView.city.getPosX(); posY = cDetailView.city.getPosY();
                                        } else {
                                            ctid = cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                        };
                                        //console.log(posX + ':' + posY);
                                        e.getTarget().setValue(posX + ':' + posY);
                                    };
                                }

                            }, this);


                           
                            this.sbReqAtkType = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Attack Type" });
                            this.sbReqAtkType.add(new qx.ui.form.ListItem("Assault", null, 3));
                            this.sbReqAtkType.add(new qx.ui.form.ListItem("Siege", null, 5));
                            this.sbReqAtkType.add(new qx.ui.form.ListItem("Scout", null, 1));
                            this.sbReqAtkType.add(new qx.ui.form.ListItem("Plunder", null, 2));
                            pageReqAtk.add(this.sbReqAtkType, { row: 6, column: 5 });


                            this.btnReqAtkSend = new qx.ui.form.Button("Request");
                            this.btnReqAtkSend.set({ toolTipText: "Request Attack" });
                            this.btnReqAtkSend.addListener("click", this.requestAttack, this);

                            pageReqAtk.add(this.btnReqAtkSend, { row: 8, column: 4 });

                            this.btnReqAtkUpdate = new qx.ui.form.Button("Update");
                            this.btnReqAtkUpdate.set({ toolTipText: "Update List" });
                            this.btnReqAtkUpdate.addListener("click", this.requestUpdate, this);

                            pageReqAtk.add(this.btnReqAtkUpdate, { row: 8, column: 5 });


                            pageReqAtk.add(this.ReqAtkList, { row: 0, column: 0, rowSpan: 10, colSpan: 3 });

                            this.sbTimingReqAtk = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Timing Options" });
                            this.sbTimingReqAtk.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
                            this.sbTimingReqAtk.add(new qx.ui.form.ListItem("Departure", null, webfrontend.gui.SendArmyWindow.timings.depart));
                            this.sbTimingReqAtk.add(new qx.ui.form.ListItem("Arrival", null, webfrontend.gui.SendArmyWindow.timings.arrive));
                            this.sbTimingReqAtk.addListener("changeSelection", this.reqAtkButtons, this);

                            pageReqAtk.add(this.sbTimingReqAtk, { row: 9, column: 3 });

                            //this.sbTiming.addListener(gK, function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this);
                            this.tbHReqAtk = this.makeSpinner(23).set({ toolTipText: "h" });
                            this.app.setElementModalInput(this.tbHReqAtk);
                            this.tbMReqAtk = this.makeSpinner(59).set({ toolTipText: "m" });
                            this.app.setElementModalInput(this.tbMReqAtk);
                            this.tbSReqAtk = this.makeSpinner(59).set({ toolTipText: "s" });
                            this.app.setElementModalInput(this.tbSReqAtk);

                            this.hbTimeReqAtk = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({ alignY: 'middle' }));
                            this.hbTimeReqAtk.add(this.tbHReqAtk);
                            this.hbTimeReqAtk.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqAtk.add(this.tbMReqAtk);
                            this.hbTimeReqAtk.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqAtk.add(this.tbSReqAtk);

                            pageReqAtk.add(this.hbTimeReqAtk, { row: 9, column: 4 });

                            this.sbDayReqAtk = this.daybox();

                            pageReqAtk.add(this.sbDayReqAtk, { row: 9, column: 5 });

                            this.reqAtkButtons();
                            this.tbView.add(pageReqAtk);


                            // ******Request Support******

                            var rqlayout = new qx.ui.layout.Grid(10, 6);
                            rqlayout.setColumnAlign(0, "right", "top");
                            rqlayout.setColumnAlign(2, "right", "top");
                            rqlayout.setColumnWidth(0, 80);
                            rqlayout.setColumnWidth(1, 80);
                            rqlayout.setColumnWidth(2, 80);
                            rqlayout.setColumnWidth(3, 70);
                            rqlayout.setColumnWidth(4, 80);
                            rqlayout.setColumnWidth(5, 95);

                            var pageReqSup = new qx.ui.tabview.Page("RequestSupport");
                            //pageAtk.setLayout(new qx.ui.layout.VBox());
                            pageReqSup.setLayout(rqlayout);

                            this.ReqSupList = new qx.ui.form.List;
                            this.ReqSupList.set({ width: 150, selectionMode: "additive" });
                            this.ReqSupList.setDragSelection(true);


                            rownum = 0;
                            col = 3;

                            dlist = ["Ranger", "Guardian", "Templar", "Scout", "Crossbow", "Paladin", "Ballista", "Sloop", "Frigate"];
                            for (var i = 0; i < dlist.length; i++) {

                                this.CBReqSup[dlist[i]] = new qx.ui.form.CheckBox(dlist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqSup[dlist[i]].addListener("changeValue", this.updateReqSupList, this);
                                pageReqSup.add(this.CBReqSup[dlist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            rownum = 0;
                            col = 4;

                            olist = ["Beserker", "Mage", "Knight", "Warlock", "Ram", "Catapult", "WarGalleon"];
                            for (var i = 0; i < olist.length; i++) {

                                this.CBReqSup[olist[i]] = new qx.ui.form.CheckBox(olist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqSup[olist[i]].addListener("changeValue", this.updateReqSupList, this);
                                pageReqSup.add(this.CBReqSup[olist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };

                            this.CBReqSup["CancelRaids"] = new qx.ui.form.CheckBox("CancelRaids").set({
                                toolTipText: "Cancel raids in cities you request support from"
                            });
                            pageReqSup.add(this.CBReqSup["CancelRaids"], { row: 6, column: 5 });

                            this.CBReqSup["SkipScheduled"] = new qx.ui.form.CheckBox("SkipScheduled").set({
                                toolTipText: "Skip Cities with Scheduled orders"
                            });
                            this.CBReqSup["SkipScheduled"].setValue(true);
                            this.CBReqSup["SkipScheduled"].addListener("changeValue", this.updateReqSupList, this);
                            pageReqSup.add(this.CBReqSup["SkipScheduled"], { row: 5, column: 5 });

                            this.CBReqSup["IncludeRaiding"] = new qx.ui.form.CheckBox("IncludeRaiding").set({
                                toolTipText: "Skip Cities with Scheduled orders"
                            });
                            this.CBReqSup["IncludeRaiding"].addListener("changeValue", this.updateReqSupList, this);
                            pageReqSup.add(this.CBReqSup["IncludeRaiding"], { row: 4, column: 5 });

                            pageReqSup.add(new qx.ui.basic.Label("Target").set({
                                allowShrinkX: false,
                                paddingTop: 3
                            }), { row: 7, column: 4 });

                            this.TFReqSup["Target"] = new qx.ui.form.TextField("").set({ toolTipText: "Current City or this target" });
                            pageReqSup.add(this.TFReqSup["Target"], { row: 7, column: 5 });

                            this.TFReqSup["Target"].addListener("click", function (e) {
                                if (e.getButton() == "right") {
                                    //console.log("set coords");
                                    //console.log(e);
                                    app = qx.core.Init.getApplication();
                                    cDetailView = app.getCityDetailView();
                                    if (cDetailView != undefined) {
                                        if (typeof cDetailView.city.get_Coordinates == "undefined") {
                                            posX = cDetailView.city.getPosX(); posY = cDetailView.city.getPosY();
                                        } else {
                                            ctid = cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                        };
                                        //console.log(posX + ':' + posY);
                                        e.getTarget().setValue(posX + ':' + posY);
                                    };
                                }

                            }, this);

                            this.btnReqSupSend = new qx.ui.form.Button("Request");
                            this.btnReqSupSend.set({ toolTipText: "Request Support" });
                            this.btnReqSupSend.addListener("click", this.requestSupport, this);

                            pageReqSup.add(this.btnReqSupSend, { row: 8, column: 4 });

                            this.btnReqSupUpdate = new qx.ui.form.Button("Update");
                            this.btnReqSupUpdate.set({ toolTipText: "Request Support" });
                            this.btnReqSupUpdate.addListener("click", this.requestUpdate, this);

                            pageReqSup.add(this.btnReqSupUpdate, { row: 8, column: 5 });


                            pageReqSup.add(this.ReqSupList, { row: 0, column: 0, rowSpan: 10, colSpan: 3 });

                            this.sbTimingReqSup = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Timing Options" });
                            this.sbTimingReqSup.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
                            this.sbTimingReqSup.add(new qx.ui.form.ListItem("Departure", null, webfrontend.gui.SendArmyWindow.timings.depart));
                            this.sbTimingReqSup.add(new qx.ui.form.ListItem("Arrival", null, webfrontend.gui.SendArmyWindow.timings.arrive));
                            this.sbTimingReqSup.addListener("changeSelection", this.reqSupButtons, this);

                            pageReqSup.add(this.sbTimingReqSup, { row: 9, column: 3 });

                            //this.sbTiming.addListener(gK, function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this);
                            this.tbHReqSup = this.makeSpinner(23).set({ toolTipText: "h" });
                            this.app.setElementModalInput(this.tbHReqSup);
                            this.tbMReqSup = this.makeSpinner(59).set({ toolTipText: "m" });
                            this.app.setElementModalInput(this.tbMReqSup);
                            this.tbSReqSup = this.makeSpinner(59).set({ toolTipText: "s" });
                            this.app.setElementModalInput(this.tbSReqSup);

                            this.hbTimeReqSup = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({ alignY: 'middle' }));
                            this.hbTimeReqSup.add(this.tbHReqSup);
                            this.hbTimeReqSup.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqSup.add(this.tbMReqSup);
                            this.hbTimeReqSup.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqSup.add(this.tbSReqSup);

                            pageReqSup.add(this.hbTimeReqSup, { row: 9, column: 4 });

                            this.sbDayReqSup = this.daybox();

                            pageReqSup.add(this.sbDayReqSup, { row: 9, column: 5 });

                            this.reqSupButtons();
                            this.tbView.add(pageReqSup);

                            // ****** Request Large Attack ******

                            var layoutrla = new qx.ui.layout.Grid(10, 12);
                            layoutrla.setColumnAlign(0, "right", "top");
                            layoutrla.setColumnAlign(2, "right", "top");
                            layoutrla.setColumnAlign(4, "right", "top");
                            layoutrla.setRowHeight(0, 15);
                            layoutrla.setRowHeight(1, 15);
                            layoutrla.setRowHeight(2, 15);
                            layoutrla.setRowHeight(3, 15);
                            layoutrla.setRowHeight(4, 15);
                            layoutrla.setRowHeight(5, 15);
                            layoutrla.setRowHeight(6, 15);
                            layoutrla.setRowHeight(7, 15);
                            layoutrla.setRowHeight(8, 15);
                            layoutrla.setRowHeight(9, 15);
                            layoutrla.setColumnWidth(0, 80);
                            layoutrla.setColumnWidth(1, 80);
                            layoutrla.setColumnWidth(2, 80);
                            layoutrla.setColumnWidth(3, 80);
                            layoutrla.setColumnWidth(4, 50);
                            layoutrla.setColumnWidth(5, 80);
                            layoutrla.setColumnWidth(6, 80);
                            layoutrla.setColumnWidth(7, 80);
                            layoutrla.setColumnWidth(8, 80);
                            layoutrla.setColumnWidth(9, 70);
                            layoutrla.setColumnWidth(10, 80);
                            layoutrla.setColumnWidth(11, 95);
                            var pageReqLAtk = new qx.ui.tabview.Page("Request Large Attack");
                            //pageAtk.setLayout(new qx.ui.layoutrla.VBox());
                            pageReqLAtk.setLayout(layoutrla);
                            //pageAtk.add(new qx.ui.basic.Label("Attack"));

                            var col = 0;
                            var rownum = 0;
                            lbl = ["Main", "Fake1", "Fake2", "Fake3", "Fake4", "FakeTS", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];

                            for (var i = 0; i < lbl.length; i++) {
                                templabel = new qx.ui.basic.Label(lbl[i]).set({
                                    allowShrinkX: false,
                                    paddingTop: 3
                                });
                                templabel.addListener("click", function (e) {
                                    if (e.getButton() == "right") {
                                        //console.log("set coords");
                                        //console.log(e);
                                        //console.log(e.getTarget());
                                        label = e.getTarget().getValue();
                                        if (label != "Main") {
                                            //console.log(label);
                                            WC = CityHelper.WeaponsControl.getInstance();
                                            main = WC.TFReqLAtk["Main"].getValue();
                                            //console.log("main", main);
                                            fake = WC.TFReqLAtk[label].getValue();
                                            //console.log(label, fake);
                                            WC.TFReqLAtk["Main"].setValue(fake);
                                            WC.TFReqLAtk[label].setValue(main);

                                        };
                                    };

                                }, this);
                                pageReqLAtk.add(templabel, { row: rownum, column: col });
                                //console.log(lbl[i]);
                                str = lbl[i];
                                this.TFReqLAtk[str] = new qx.ui.form.TextField("");
                                if (str != "FakeTS") {
                                    this.TFReqLAtk[str].addListener("click", function (e) {
                                        if (e.getButton() == "right") {
                                            //console.log("set coords");
                                            //console.log(e);
                                            app = qx.core.Init.getApplication();
                                            cDetailView = app.getCityDetailView();
                                            if (cDetailView != undefined) {
                                                if (typeof cDetailView.city.get_Coordinates == "undefined") {
                                                    posX = cDetailView.city.getPosX(); posY = cDetailView.city.getPosY();
                                                } else {
                                                    ctid = cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                                };
                                                //console.log(posX + ':' + posY);
                                                e.getTarget().setValue(posX + ':' + posY);
                                            };
                                        }

                                    }, this);
                                };
                                pageReqLAtk.add(this.TFReqLAtk[str], { row: rownum, column: (col + 1) });
                                if (i == 5 || i == 10) {
                                    rownum = 0;
                                    col = col + 2;
                                } else {
                                    rownum = rownum + 1;
                                };
                            };
                            this.TFReqLAtk["FakeTS"].setValue(CityHelper.main.getInstance().options.WeaponsControl.defaultFakeTs.toString());

                            rownum = rownum + 1;
                            this.sbReqLAtkType = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Attack Type" });
                            this.sbReqLAtkType.add(new qx.ui.form.ListItem("Assault", null, 3));
                            this.sbReqLAtkType.add(new qx.ui.form.ListItem("Siege", null, 5));
                            this.sbReqLAtkType.add(new qx.ui.form.ListItem("Scout", null, 1));
                            this.sbReqLAtkType.add(new qx.ui.form.ListItem("Plunder", null, 2));
                            pageReqLAtk.add(this.sbReqLAtkType, { row: rownum, column: 0 });
                            this.sbTimingReqLAtk = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Timing Options" });
                            this.sbTimingReqLAtk.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
                            this.sbTimingReqLAtk.add(new qx.ui.form.ListItem("Departure", null, webfrontend.gui.SendArmyWindow.timings.depart));
                            this.sbTimingReqLAtk.add(new qx.ui.form.ListItem("Arrival", null, webfrontend.gui.SendArmyWindow.timings.arrive));
                            this.sbTimingReqLAtk.setModelSelection([webfrontend.gui.SendArmyWindow.timings.arrive]);
                            this.sbTimingReqLAtk.addListener("changeSelection", this.reqLAtkButtons, this);
                            //this.sbTimingReqLAtk.addListener("changeVisibility", function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this); 
                            pageReqLAtk.add(this.sbTimingReqLAtk, { row: rownum, column: 1 });

                            //this.sbTimingReqLAtk.addListener(gK, function () { this.__Yl(this.getCurSelExceedings()); this.__baz(); }, this);
                            this.tbHReqLAtk = this.makeSpinner(23).set({ toolTipText: "h" });
                            this.app.setElementModalInput(this.tbHReqLAtk);
                            this.tbMReqLAtk = this.makeSpinner(59).set({ toolTipText: "m" });
                            this.app.setElementModalInput(this.tbMReqLAtk);
                            this.tbSReqLAtk = this.makeSpinner(59).set({ toolTipText: "s" });
                            this.app.setElementModalInput(this.tbSReqLAtk);

                            this.hbTimeReqLAtk = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({ alignY: 'middle' }));
                            this.hbTimeReqLAtk.add(this.tbHReqLAtk);
                            this.hbTimeReqLAtk.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqLAtk.add(this.tbMReqLAtk);
                            this.hbTimeReqLAtk.add(new qx.ui.basic.Label(":"));
                            this.hbTimeReqLAtk.add(this.tbSReqLAtk);
                            pageReqLAtk.add(this.hbTimeReqLAtk, { row: rownum, column: 2 });

                            this.sbDayReqLAtk = this.daybox();
                            pageReqLAtk.add(this.sbDayReqLAtk, { row: rownum, column: 3 });

                            rownum = rownum + 1;

                            this.sbFakeTypeReqLAtk = new qx.ui.form.SelectBox().set({ font: "default", width: 75, height: 25, allowGrowY: false, toolTipText: "Set Fake Attack Type" });
                            this.sbFakeTypeReqLAtk.add(new qx.ui.form.ListItem("Same as main", null, 0));
                            this.sbFakeTypeReqLAtk.add(new qx.ui.form.ListItem("Assault", null, 3));
                            this.sbFakeTypeReqLAtk.add(new qx.ui.form.ListItem("Siege", null, 5));
                            this.sbFakeTypeReqLAtk.add(new qx.ui.form.ListItem("Scout", null, 1));
                            this.sbFakeTypeReqLAtk.add(new qx.ui.form.ListItem("Plunder", null, 2));
                            pageReqLAtk.add(this.sbFakeTypeReqLAtk, { row: rownum, column: 0 });

                            this.btnReqLAtkSend = new qx.ui.form.Button("Send");
                            this.btnReqLAtkSend.set({ toolTipText: "Send Attack" });
                            this.btnReqLAtkSend.addListener("click", this.requestLAttack, this);

                            pageReqLAtk.add(this.btnReqLAtkSend, { row: rownum, column: 3 });


                            this.ReqLAtkList = new qx.ui.form.List;
                            this.ReqLAtkList.set({ width: 150, selectionMode: "additive" });
                            this.ReqLAtkList.setDragSelection(true);
                            pageReqLAtk.add(this.ReqLAtkList, { row: 0, column: 6, rowSpan: 9, colSpan: 3 });


                            rownum = 0;
                            col = 9;

                            dlist = ["Ranger", "Guardian", "Templar", "Scout", "Crossbow", "Paladin", "Ballista", "Sloop", "Frigate"];
                            for (var i = 0; i < dlist.length; i++) {

                                this.CBReqLAtk[dlist[i]] = new qx.ui.form.CheckBox(dlist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqLAtk[dlist[i]].addListener("changeValue", this.updateReqLAtkList, this);
                                pageReqLAtk.add(this.CBReqLAtk[dlist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            rownum = 0;
                            col = 10;

                            olist = ["Beserker", "Mage", "Knight", "Warlock", "Ram", "Catapult", "WarGalleon"];
                            for (var i = 0; i < olist.length; i++) {

                                this.CBReqLAtk[olist[i]] = new qx.ui.form.CheckBox(olist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBReqLAtk[olist[i]].addListener("changeValue", this.updateReqLAtkList, this);
                                pageReqLAtk.add(this.CBReqLAtk[olist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            this.CBReqLAtk["SkipScheduled"] = new qx.ui.form.CheckBox("SkipScheduled").set({ toolTipText: "Skip Cities with Scheduled orders" });
                            this.CBReqLAtk["SkipScheduled"].setValue(true);
                            this.CBReqLAtk["SkipScheduled"].addListener("changeValue", this.updateReqLAtkList, this);
                            pageReqLAtk.add(this.CBReqLAtk["SkipScheduled"], { row: 5, column: 11 });

                            this.CBReqLAtk["CancelRaids"] = new qx.ui.form.CheckBox("CancelRaids").set({
                                toolTipText: "Cancel raids in cities you request attack from"
                            });
                            pageReqLAtk.add(this.CBReqLAtk["CancelRaids"], { row: 4, column: 11 });

                            this.CBReqLAtk["IncludeRaiding"] = new qx.ui.form.CheckBox("IncludeRaiding").set({
                                toolTipText: "Include troops out raiding"
                            });
                            this.CBReqLAtk["IncludeRaiding"].addListener("changeValue", this.updateReqLAtkList, this);
                            pageReqLAtk.add(this.CBReqLAtk["IncludeRaiding"], { row: 3, column: 11 });

                                                        
                            this.btnReqLAtkUpdate = new qx.ui.form.Button("Update");
                            this.btnReqLAtkUpdate.set({ toolTipText: "Update List" });
                            this.btnReqLAtkUpdate.addListener("click", this.requestUpdate, this);

                            pageReqLAtk.add(this.btnReqLAtkUpdate, { row: 8, column: 11 });

                            
                          
                            this.tbView.add(pageReqLAtk);

                            // ******Raid Control******

                            var rqlayout = new qx.ui.layout.Grid(10, 6);
                            rqlayout.setColumnAlign(0, "right", "top");
                            rqlayout.setColumnAlign(2, "right", "top");
                            rqlayout.setColumnWidth(0, 100);
                            rqlayout.setColumnWidth(1, 100);
                            rqlayout.setColumnWidth(2, 100);
                            rqlayout.setColumnWidth(3, 70);
                            rqlayout.setColumnWidth(4, 80);
                            rqlayout.setColumnWidth(5, 95);
                            rqlayout.setRowHeight(0, 15);
                            rqlayout.setRowHeight(1, 15);
                            rqlayout.setRowHeight(2, 15);
                            rqlayout.setRowHeight(3, 15);
                            rqlayout.setRowHeight(4, 15);
                            rqlayout.setRowHeight(5, 15);
                            rqlayout.setRowHeight(6, 15);
                            rqlayout.setRowHeight(7, 15);
                            rqlayout.setRowHeight(8, 15);
                            rqlayout.setRowHeight(9, 15);

                            var pageRaidControl = new qx.ui.tabview.Page("DungeonControl");
                            //pageAtk.setLayout(new qx.ui.layout.VBox());
                            pageRaidControl.setLayout(rqlayout);

                            this.RaidControlList = new qx.ui.form.List;
                            this.RaidControlList.set({ width: 150, selectionMode: "additive" });
                            this.RaidControlList.setDragSelection(true);


                            rownum = 0;
                            col = 3;

                            dlist = ["Ranger", "Guardian", "Templar", "Scout", "Crossbow", "Paladin", "Ballista", "Sloop", "Frigate"];
                            for (var i = 0; i < dlist.length; i++) {

                                this.CBRaidControl[dlist[i]] = new qx.ui.form.CheckBox(dlist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBRaidControl[dlist[i]].addListener("changeValue", this.updateRaidControlList, this);
                                this.CBRaidControl[dlist[i]].addListener("changeValue", function (e) {
                                    if (this.CBRaidControl["Bosses"].getValue() == true) {
                                        this.CH.options.WeaponsControl.DungeonControl.Bosses[e.getTarget().getLabel()] = e.getTarget().getValue();
                                        this.CH.CHOSave()
                                    } else if (this.CBRaidControl["Dungeons"].getValue() == true) {
                                        this.CH.options.WeaponsControl.DungeonControl.Dungeons[e.getTarget().getLabel()] = e.getTarget().getValue();
                                        this.CH.CHOSave()
                                    };
                                }, this);
                                pageRaidControl.add(this.CBRaidControl[dlist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };
                            rownum = 0;
                            col = 4;

                            olist = ["Beserker", "Mage", "Knight", "Warlock", "Ram", "Catapult", "WarGalleon"];
                            for (var i = 0; i < olist.length; i++) {

                                this.CBRaidControl[olist[i]] = new qx.ui.form.CheckBox(olist[i]).set({
                                    toolTipText: "Include these units in list"
                                });
                                this.CBRaidControl[olist[i]].addListener("changeValue", this.updateRaidControlList, this);
                                this.CBRaidControl[olist[i]].addListener("changeValue", function (e) {
                                    if (this.CBRaidControl["Bosses"].getValue() == true) {
                                        this.CH.options.WeaponsControl.DungeonControl.Bosses[e.getTarget().getLabel()] = e.getTarget().getValue();
                                        this.CH.CHOSave()
                                    } else if (this.CBRaidControl["Dungeons"].getValue() == true) {
                                        this.CH.options.WeaponsControl.DungeonControl.Dungeons[e.getTarget().getLabel()] = e.getTarget().getValue();
                                        this.CH.CHOSave()
                                    };
                                }, this);
                                pageRaidControl.add(this.CBRaidControl[olist[i]], { row: rownum, column: col });
                                rownum = rownum + 1;
                            };

                            this.CBRaidControl["SkipScheduled"] = new qx.ui.form.CheckBox("SkipScheduled").set({
                                toolTipText: "Skip Cities with Scheduled orders"
                            });
                            this.CBRaidControl["SkipScheduled"].addListener("changeValue", this.updateRaidControlList, this);
                            this.CBRaidControl["SkipScheduled"].setValue(true);
                            pageRaidControl.add(this.CBRaidControl["SkipScheduled"], { row: rownum - 1, column: col + 1 });


                            this.CBRaidControl["Dungeons"] = new qx.ui.form.CheckBox("Dungeons").set({
                                toolTipText: "Send dungeons"
                            });
                            this.CBRaidControl["Dungeons"].addListener("changeValue", this.updateRaidControlList, this);
                            this.CBRaidControl["Dungeons"].addListener("changeValue", function (e) {
                                if (e.getTarget().getValue() == true) {
                                    this.CBRaidControl["Bosses"].setValue(false);
                                    this.raidControlUpdate = true;
                                    for (key in this.CH.options.WeaponsControl.DungeonControl.Dungeons) {
                                        this.CBRaidControl[key].setValue(this.CH.options.WeaponsControl.DungeonControl.Dungeons[key]);
                                    };
                                    this.raidControlUpdate = false;
                                    this.updateRaidControlList();
                                };
                            }, this);
                            pageRaidControl.add(this.CBRaidControl["Dungeons"], { row: rownum, column: col });


                            this.CBRaidControl["Bosses"] = new qx.ui.form.CheckBox("Bosses").set({
                                toolTipText: "Send Bosses"
                            });
                            this.CBRaidControl["Bosses"].addListener("changeValue", this.updateRaidControlList, this);
                            this.CBRaidControl["Bosses"].addListener("changeValue", function (e) {
                                if (e.getTarget().getValue() == true) {
                                    this.CBRaidControl["Dungeons"].setValue(false);
                                    this.raidControlUpdate = true;
                                    for (key in this.CH.options.WeaponsControl.DungeonControl.Bosses) {
                                        this.CBRaidControl[key].setValue(this.CH.options.WeaponsControl.DungeonControl.Bosses[key]);
                                    };
                                    this.raidControlUpdate = false;
                                    this.updateRaidControlList();
                                };
                            }, this);
                            pageRaidControl.add(this.CBRaidControl["Bosses"], { row: rownum, column: col + 1 });
                            rownum = rownum + 1;
                            this.CBRaidControl["Bosses"].setValue(true);

                            this.RaidControlStatusLabel = new qx.ui.basic.Label("");


                            pageRaidControl.add(this.RaidControlStatusLabel, { row: 9, column: 0, colspan: 2 });


                            this.btnRaidControlSend = new qx.ui.form.Button("Request");
                            this.btnRaidControlSend.set({ toolTipText: "Send Raids" });
                            this.btnRaidControlSend.addListener("click", this.requestRaid, this);

                            pageRaidControl.add(this.btnRaidControlSend, { row: 8, column: 4 });

                            this.btnRaidControlUpdate = new qx.ui.form.Button("Update");
                            this.btnRaidControlUpdate.set({ toolTipText: "Update Troops" });
                            this.btnRaidControlUpdate.addListener("click", this.requestUpdate, this);

                            pageRaidControl.add(this.btnRaidControlUpdate, { row: 8, column: 5 });

                            this.btnRaidControlAll = new qx.ui.form.Button("Request All");
                            this.btnRaidControlAll.set({ toolTipText: "Select and Request All Troops" });
                            this.btnRaidControlAll.addListener("click", this.requestAll, this);
                            
                           

                            pageRaidControl.add(this.btnRaidControlAll, { row: 9, column: 5 });
                            

                            this.btnRaidControlMap = new qx.ui.form.Button("Update Map");
                            this.btnRaidControlMap.set({ toolTipText: "Update Dungeons and Bosses" });
                            this.btnRaidControlMap.addListener("click", this.updateRaidMap, this);

                            pageRaidControl.add(this.btnRaidControlMap, { row: 9, column: 4 });

                            this.RaidControlContSB = new qx.ui.form.SelectBox().set({
                                alignX: "center",
                                toolTipText: "Select continent to send from"
                            });

                            this.RaidControlContSB.add(new qx.ui.form.ListItem("All", null, -1));
                            

                            pageRaidControl.add(this.RaidControlContSB, { row: 9, column: 3 });

                            this.RaidControlAffinitySB = new qx.ui.form.SelectBox().set({
                                alignX: "center",
                                toolTipText: "Select raid affinity to dungeons"
                            });

                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Default", null, 0));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Double affinity", null, 1));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Strict affinity", null, 2));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Forest only", null, 3));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Hill only", null, 4));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Mountain only", null, 5));
                            this.RaidControlAffinitySB.add(new qx.ui.form.ListItem("Water only", null, 6));
                            this.RaidControlAffinitySB.setModelSelection([this.CH.options.WeaponsControl.defaultAffinity]);
                            this.RaidControlAffinitySB.addListener("changeSelection", function (e) {
                                
                                CityHelper.main.getInstance().options.WeaponsControl.defaultAffinity = e.getTarget().getSelection()[0].getModel();
                                CityHelper.main.getInstance().CHOSave();
                            }, this);


                            pageRaidControl.add(this.RaidControlAffinitySB, { row: 0, column: 5 });


                            pageRaidControl.add(this.RaidControlList, { row: 0, column: 0, rowSpan: 8, colSpan: 3 });

                            this.tbView.add(pageRaidControl);


                            this.window = new qx.ui.window.Window("Weapons Control").set({
                                layout: new qx.ui.layout.Grow(),
                                allowClose: true,
                                showMaximize: false,
                                showMinimize: false,
                                contentPadding: 0,
                                height: 355,
                                width: 600
                            });
                            scroller = new qx.ui.container.Scroll();
                            scroller.add(this.tbView);
                            this.window.add(scroller);
                            this.app.desktop.add(this.window);
                            //                            this.window.moveTo(300, 100);
                            //                            this.window.open();
                            this.window.addListener("appear", this.OpenWC);
                            this.window.addListener("disappear", this.CloseWC);

                            console.log("Weapons Control Initialized");

                        
                        },
                        distFromIDs: function (id1, id2) {
                            return Math.floor(100 * Math.sqrt(Math.pow(((id1 & 0xFFFF) - (id2 & 0xFFFF)), 2) + Math.pow(((id1 >> 16) - (id2 >> 16)), 2))) / 100.00;

                        },
                        supButtons: function () {
                            if (this.sbTimingSup.getSelection()[0].getModel() == webfrontend.gui.SendArmyWindow.timings.now) {
                                this.hbTimeSup.exclude();
                                this.sbDaySup.exclude();
                            } else {
                                this.hbTimeSup.show();
                                this.sbDaySup.show();
                            };
                        },
                        reqSupButtons: function () {
                            if (this.sbTimingReqSup.getSelection()[0].getModel() == webfrontend.gui.SendArmyWindow.timings.now) {
                                this.hbTimeReqSup.exclude();
                                this.sbDayReqSup.exclude();
                            } else {
                                this.hbTimeReqSup.show();
                                this.sbDayReqSup.show();
                            };
                        },
                        reqAtkButtons: function () {
                            if (this.sbTimingReqAtk.getSelection()[0].getModel() == webfrontend.gui.SendArmyWindow.timings.now) {
                                this.hbTimeReqAtk.exclude();
                                this.sbDayReqAtk.exclude();
                            } else {
                                this.hbTimeReqAtk.show();
                                this.sbDayReqAtk.show();
                            };
                        },
                        reqLAtkButtons: function () {
                            if (this.sbTimingReqLAtk.getSelection()[0].getModel() == webfrontend.gui.SendArmyWindow.timings.now) {
                                this.hbTimeReqLAtk.exclude();
                                this.sbDayReqLAtk.exclude();
                            } else {
                                this.hbTimeReqLAtk.show();
                                this.sbDayReqLAtk.show();
                            };
                        },
                        atkButtons: function () {
                            if (this.sbTiming.getSelection()[0].getModel() == webfrontend.gui.SendArmyWindow.timings.now) {
                                this.hbTime.exclude();
                                this.sbDay.exclude();
                            } else {
                                this.hbTime.show();
                                this.sbDay.show();
                            };
                        },
                        checkReqLists: function () {
                            if (this.started) {
                                //console.log("checkReqLists");
                                //console.log(this.tbView.getSelection()[0].getLabel());
                                var cgi = webfrontend.data.City.getInstance();
                                var cityid = cgi.getId();
                                var target = "";
                                if (this.tbView.getSelection()[0].getLabel() == "RequestSupport") {
                                    if (this.TFReqSup["Target"].getValue() == "") {
                                        target = cityid;
                                    } else {
                                        target = this.TFReqSup["Target"].getValue();
                                        target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                        console.log(target);
                                    };

                                    if (this.LastCity != target) {
                                        this.updateReqSupList();
                                    };
                                } else if (this.tbView.getSelection()[0].getLabel() == "RequestAttack") {
                                    target = this.TFReqAtk["Target"].getValue();
                                    target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                    console.log(target);

                                    if (this.LastCity != target) {
                                        this.updateReqAtkList();
                                    };
                                } else if (this.tbView.getSelection()[0].getLabel() == "Request Large Attack") {
                                    target = this.TFReqLAtk["Main"].getValue();
                                    fakelist = ["Fake1", "Fake2", "Fake3", "Fake4", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];
                                    for (var i = 0; i < fakelist.length && target == ''; i++) {
                                        if (this.TFReqLAtk[fakelist[i]].getValue() != '') {
                                            target = this.TFReqLAtk[fakelist[i]].getValue();
                                        };
                                    };
                                    target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                    console.log(target);

                                    if (this.LastCity != target) {
                                        this.updateReqLAtkList();
                                    };
                                } else if (this.tbView.getSelection()[0].getLabel() == "DungeonControl") {
                                    target = "DungeonControl";
                                    if (this.LastCity != target) {
                                        this.updateRaidControlList();
                                    };
                                };
                                //console.log("Start timer");
                            };
                            currentTime = new Date().getTime();
                            if (currentTime > (this.lastUpdate + 4000)) {
                                this.ReqSupUpdateTimer.start(this.checkReqLists, null, this, null, 5000);
                                this.lastUpdate = currentTime;

                            };
                        },
                        requestSupport: function () {
                            console.log("Request support");
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var units = [];

                            var target = "";

                            if (this.TFReqSup["Target"].getValue() == "") {
                                target = (cityid & 0xFFFF) + ":" + (cityid >> 16);
                                console.log(target);
                            } else {
                                target = this.TFReqSup["Target"].getValue();
                            };
                            console.log(this.ReqSupList.getSelection());
                            console.log(this.ReqSupList.getSelection().length);
                            for (i = 0; i < this.ReqSupList.getSelection().length; i++) {
                                units = [];
                                cityunits = {};
                                transportType = 0;
                                source = this.ReqSupList.getSelection()[i].getModel();
                                console.log(source);
                                curTCity = this.CH.troopList[source];
                                if ((curTCity.hasOwnProperty("units"))||(this.CBReqSup["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) ) { //* check if it should be added *//
                                    if (curTCity.hasOwnProperty("units")) { //* check if it should be added *//
                                        for (j = 0; j < curTCity.units.length; j++) {
                                            if (objlist.hasOwnProperty(curTCity.units[j].t)) {
                                                if (this.CBReqSup[objlist[curTCity.units[j].t]].getValue() == true && curTCity.units[j].c > 0 && curTCity.dist > 0) {
                                                    //units.push({ t: curTCity.units[j].t, c: curTCity.units[j].c });
                                                    //console.log(units);
                                                    if (cityunits.hasOwnProperty(curTCity.units[j].t)) {
                                                        cityunits[curTCity.units[j].t] = cityunits[curTCity.units[j].t] + curTCity.units[j].c;
                                                    } else {
                                                        cityunits[curTCity.units[j].t] = curTCity.units[j].c;
                                                    };
                                                    if (curTCity.units[j].t >= 15 && curTCity.units[j].t <= 17) {
                                                        transportType = 1;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                
                                    if (this.CBReqSup["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.t == 8)) {
                                                for (j = 0; j < order.u.length; j++) {
                                                    if (objlist.hasOwnProperty(order.u[j].t)) {
                                                        if (this.CBReqSup[objlist[order.u[j].t]].getValue() == true && order.u[j].c > 0) {
                                                            add = true;
                                                            if (cityunits.hasOwnProperty(order.u[j].t)) {
                                                                cityunits[order.u[j].t] = cityunits[order.u[j].t] + order.u[j].c;
                                                            } else {
                                                                cityunits[order.u[j].t] = order.u[j].c;
                                                            };
                                                            if (order.u[j].t >= 15 && order.u[j].t <= 17) {
                                                                transportType = 1;
                                                            };

                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    for (t in cityunits) {
                                        units.push({ t: t, c: cityunits[t] });
                                        //console.log(units);
                                    };
                                    if (units != []) {

                                        CityHelper.main.getInstance().sendAttack(source, units, transportType, this.sbTimingReqSup.getSelection()[0].getModel(), target, 4, this.tbHReqSup.getValue(), this.tbMReqSup.getValue(), this.tbSReqSup.getValue(), this.sbDayReqSup.getSelection()[0].getModel());
                                    };
                                };
                                if (this.CBReqSup["CancelRaids"].getValue() == true) {
                                    console.log("Stopping raids");
                                    CityHelper.main.getInstance().stopRaidsTarget(0, source, curTCity.commands);
                                };
                            };

                            //this.sbTiming.getSelection()[0].getModel()
                        },
                        requestAll: function (e) {
                            if (e.getButton() == "right") {
                                this.allStep = 1;

                                this.allWork();
                            } else {
                                this.allStep = 0;

                                this.RaidControlList.selectAll();
                                this.requestRaid();
                            };
                        },
                        allWork: function () {
                            currentTime = new Date().getTime();
                            if (currentTime < (this.allLast + 500)) {
                                return;
                            };
                            if (this.started == false) {
                                this.allStep = 0;

                                return;
                            }else{
                                switch (this.allStep) {
                                    case 1: {
                                        this.CBRaidControl["Bosses"].setValue(true);
                                        this.allWait = true;
                                        this.requestUpdate();
                                        this.updateRaidMap();
                                        this.allStep = 2;
                                        this.allTimer.start(this.allWork, null, this, null, 500);
                                        break;
                                    };
                                    case 2: {
                                        //console.log("all:", this.allWait, this.allStep);
                                        if (this.allWait == false) {
                                            this.allStep = 3;
                                            this.RaidControlList.selectAll();
                                            this.requestRaid();
                                        };
                                        this.allTimer.start(this.allWork, null, this, null, 500);
                                        break;
                                    };
                                    case 3: {
                                        this.allStep = 4;
                                        this.CBRaidControl["Dungeons"].setValue(true);
                                        this.allTimer.start(this.allWork, null, this, null, 500);
                                        break;
                                    };
                                    case 4: {
                                        this.allStep = 5;
                                        this.RaidControlList.selectAll();
                                        this.requestRaid();
                                        this.allTimer.start(this.allWork, null, this, null, 500);
                                        break;
                                    };
                                    case 5: {
                                            this.allStep = 6;
                                            this.allCount = 30;
                                            this.allTimer.start(this.allWork, null, this, null, 60000);
                                            break;
                                    };
                                    case 6: {
                                        this.allCount--;
                                        if (this.allCount <= 0) {
                                            this.allStep = 1;
                                            this.allTimer.start(this.allWork, null, this, null, 1000);
                                            break;
                                        } else {
                                            this.allTimer.start(this.allWork, null, this, null, 60000);
                                            break;
                                        };
                                    };
                                    default:
                                }
                            }
                        },
                        requestRaid: function () {
                            console.log("Request raid");
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var units = [];
                            var tmpCmd = [];

                            //console.log(this.RaidControlList.getSelection());
                            //console.log(this.RaidControlList.getSelection().length);
                            this.RaidControlRaidsSent = 0;
                            this.RaidControlCitiesQueued = this.RaidControlList.getSelection().length;
                            this.RaidControlUpdateStatus();

                            for (i = 0; i < this.RaidControlList.getSelection().length; i++) {
                                units = [];
                                transportType = 0;
                                var schedunits = {};

                                source = this.RaidControlList.getSelection()[i].getModel();
                                console.log(source);
                                curTCity = this.CH.troopList[source];
                                if (this.CBRaidControl["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                    for (var cmd in curTCity.commands) {
                                        order = curTCity.commands[cmd];
                                        if ((order.s == 0) && (order.t != 8)) {
                                            //Scheduled command
                                            scheduled = true;
                                            for (j = 0; j < order.u.length; j++) {
                                                schedunits[order.u[j].t] = true;
                                            };
                                        };
                                    };
                                };
                                if (curTCity.hasOwnProperty("units")) { //* check if it should be added *//
                                    for (j = 0; j < curTCity.units.length; j++) {
                                        if (objlist.hasOwnProperty(curTCity.units[j].t)) {
                                            if (this.CBRaidControl[objlist[curTCity.units[j].t]].getValue() == true && curTCity.units[j].c > 0 && (!schedunits.hasOwnProperty(curTCity.units[j].t))) {
                                                units.push({ t: curTCity.units[j].t, c: curTCity.units[j].c });
                                                //console.log(units);
                                                if (key >= 15 && key <= 17) {
                                                    transportType = 1;
                                                };
                                            };
                                        };
                                    };
                                    if (units != []) {
                                        tmpCmd.push([source, units]);

                                    };
                                };
                            };
                            console.log("tmpCmd:", tmpCmd);
                            this.RaidControlCitiesQueued = tmpCmd.length;
                            this.RaidControlUpdateStatus();
                            while (tmpCmd.length > 0) {
                                cmd = tmpCmd.shift();
                                this.RaidControlCitiesQueued = tmpCmd.length;
                                this.RaidControlUpdateStatus();
                                if (this.CBRaidControl["Dungeons"].getValue() == true) {
                                    this.sendRequestedRaid(cmd[0], cmd[1]);
                                }
                                else if (this.CBRaidControl["Bosses"].getValue() == true) {
                                    this.sendRequestedBoss(cmd[0], cmd[1]);
                                };
                            };
                            this.ReqSupUpdateTimer.start(this.requestUpdate, null, this, null, 5000);

                        },
                        RaidControlUpdateStatus: function () {
                            txt = "";
                            if (this.RaidControlCitiesQueued > 0) {
                                txt = txt + "Cities Queued: " + this.RaidControlCitiesQueued + " ";
                            };
                            if (this.RaidControlRaidsSent > 0) {
                                txt = txt + "Raids Sent: " + this.RaidControlRaidsSent + " ";
                            };
                            //console.log(txt);
                            this.RaidControlStatusLabel.setValue(txt);
                        },
                        sendRaid: function (units, transportType, repeat, posX, posY, cityId) {
                            this.RaidControlRaidsSent = this.RaidControlRaidsSent + 1;
                            this.RaidControlUpdateStatus();

                            var raid = {
                                cityid: cityId,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.CH.sendCommandBuffer.push({ a: "OrderUnits", act: "raid", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.CH.sendCommandBusy) {
                                this.CH.sendCommandBusy = true;
                                this.CH.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendRaidDelay: function (units, transportType, repeat, posX, posY, cityId) {
                            this.RaidControlRaidsSent = this.RaidControlRaidsSent + 1;
                            this.RaidControlUpdateStatus();
                            var ServerTime = webfrontend.data.ServerTime.getInstance();

                            var CurrentTime = webfrontend.Util.getCurrentTime();
                            console.log(CurrentTime);

                            var TimeOffset = 0;

                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                TimeOffset += CurrentTime.getTimezoneOffset() / 60;
                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) TimeOffset += ServerTime.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) TimeOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            }
                            var UTCMili = new Date(CurrentTime.getTime());
                            UTCMili.setHours(UTCMili.getHours() - TimeOffset);
                            UTCMili.setSeconds(UTCMili.getSeconds() + 5);
                            UTCMili.setMilliseconds(500)
                            console.log(UTCMili);
                            console.log("Mili: " + UTCMili.getTime());

                            var raid = {
                                cityid: cityId,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 2,
                                referenceTimeUTCMillis: UTCMili.getTime(),
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.CH.sendCommandBuffer.push({ a: "OrderUnits", act: "delayraid", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.CH.sendCommandBusy) {
                                this.CH.sendCommandBusy = true;
                                this.CH.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendBossRaid: function (units, transportType, repeat, posX, posY, source) {
                            this.RaidControlRaidsSent = this.RaidControlRaidsSent + 1;
                            this.RaidControlUpdateStatus();

                            var raid = {
                                cityid: source,
                                units: units,
                                targetPlayer: "",
                                targetCity: posX + ":" + posY,
                                order: 8,
                                transport: transportType,
                                createCity: "",
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: repeat,
                                raidReferenceTimeUTCMillis: 0,
                                iUnitOrderOptions: 0
                            };
                            this.CH.sendCommandBuffer.push({ a: "OrderUnits", act: "boss", p: raid });
                            //                                        console.log(buildid + " " + building);
                            if (!this.CH.sendCommandBusy) {
                                this.CH.sendCommandBusy = true;
                                this.CH.sendCmd();
                            }
                            //webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", raid, this, this._onSendDone, raid);
                        },
                        sendRequestedRaid: function (source, units) {
                            //                            console.log(units);
                            var resMain = webfrontend.res.Main.getInstance();
                            var dlist = [];
                            var curX = (source & 0xFFFF);
                            var curY = (source >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);
                            console.log("source coord", curX, curY, contx, conty);
                            landcap = 0;
                            watercap = 0;
                            infantry = 0;
                            cavalery = 0;
                            magic = 0;
                            water = 0;
                            var totalTS = 0;
                            var ratiolist = [];
                            var affinity = this.RaidControlAffinitySB.getSelection()[0].getModel()
                            ratiolow = 0;
                            ratiohigh = 11
                            if (this.CH.troopList[source].castle == 1) {
                                orderlimit = 15;
                            }
                            else {
                                orderlimit = 5;
                            };
                            if (this.CH.sbLevel.getSelection()[0] == undefined) {
                                selectedLevel = 0;
                            }
                            else {
                                selectedLevel = this.CH.sbLevel.getSelection()[0].getModel()
                            };

                            if (this.CH.troopList[source].commands != null) {
                                orderlimit = orderlimit - this.CH.troopList[source].commands.length;
                            };
                            if (orderlimit == 0) {
                                console.log(this.CH.troopList[source].name + ": No free commands")
                                return;
                            };


                            if (units != null) {
                                for (i = 0; i < units.length; i++) {
                                    //                                    console.log("i ", i);
                                    //                                    console.log("units[i].t ", units[i].t);
                                    if ((units[i].t >= 3 && units[i].t <= 6) ) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        infantry = 1;
                                        landcap = landcap + thiscap;
                                        //                                        console.log(thiscap, totalTS, landcap);
                                    }
                                    else if ((units[i].t == 7) || (units[i].t == 12)) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        magicts = 1;
                                        landcap = landcap + thiscap;
                                        //                                        console.log(thiscap, totalTS, landcap);
                                    }
                                    else if ((units[i].t >= 9 && units[i].t <= 11)) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        cavaleryts = 1;
                                        landcap = landcap + thiscap;
                                        //                                        console.log(thiscap, totalTS, landcap);
                                    }
                                    else if ((units[i].t >= 16 && units[i].t <= 17)) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        waterts = 1;
                                        watercap = watercap + thiscap;
                                    };
                                };
                            };
                            for (lv = 1; lv <= 10; lv++) {
                                ratiolist[lv] = (Math.round((landcap + watercap) / this.CH.options.raiding.lootlevel[lv] * 100.0) / 100);
                                if ((ratiolist[lv] <= this.CH.options.raiding.allRatio) && ratiohigh == 11) {
                                    ratiohigh = lv;
                                };
                                if (ratiolist[lv] > (orderlimit + this.CH.options.raiding.allRatio - 0.01) || lv == (selectedLevel-1)) {
                                    ratiolow = lv;
                                };
                            };
                            selectedType = 0;
                            if ((landcap > 0) && (watercap == 0)) {
                                selectedType = 1;
                                console.log("landonly");
                            } else if ((landcap == 0) && (watercap > 0)) {
                                selectedType = 2;
                                console.log("wateronly");
                            } else if ((landcap == 0) && (watercap == 0)) {
                                selectedType = 3;
                                console.log("no units");
                                return;
                            };
                            console.log("Landcap", landcap, "watercap", watercap);
                            //                            if (this.doGlobal == false) {
                            if (selectedType == 1) {
                                cxmin = Math.floor((Math.floor(curX / 100)) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 1) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100)) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 1) * 100 / 32);

                            } else {
                                cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                            };
                            //                            }
                            //                            else {
                            //                                cxmin = 0;
                            //                                cymin = 0;
                            //                                cxmax = 19;
                            //                                cymax = 19;
                            //                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);

                            str = ""
                            console.log("c values", cxmin, cymin, cxmax, cymax);
                            //console.log("DL:", this.CH.dungeonlist);
                            for (ccy = cymin; ccy <= cymax; ccy++) {

                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                    if (!(this.CH.dungeonlist == undefined)) {
                                        cell = ccx + (ccy * 32);

                                        if (!(this.CH.dungeonlist[cell] == undefined)) {
                                            for (b = 0; b < this.CH.dungeonlist[cell].length; b++) {
                                                if ((ratiolow < this.CH.dungeonlist[cell][b].level) && (ratiohigh > this.CH.dungeonlist[cell][b].level)) {
                                                    x = this.CH.dungeonlist[cell][b].x;
                                                    y = this.CH.dungeonlist[cell][b].y;
                                                    //console.log(x, y);
                                                    var diffX = Math.abs(curX - x);
                                                    var diffY = Math.abs(curY - y);
                                                    var thisdist = Math.sqrt(diffX * diffX + diffY * diffY);

                                                    percent = this.CH.dungeonlist[cell][b].percent;

                                                    num = new Number(thisdist * ((100 + percent) / 100));
                                                    if (affinity == 1) {
                                                        switch (this.CH.dungeonlist[cell][b].type) {
                                                            case 2: {
                                                                if (water == 1) {
                                                                    num = num / 2;
                                                                }
                                                                break;
                                                            };
                                                            case 3: {
                                                                if (magic == 1) {
                                                                    num = num / 2;
                                                                }
                                                                break;
                                                            };
                                                            case 4: {
                                                                if (infantry == 1) {
                                                                    num = num / 2;
                                                                }
                                                                break;
                                                            };
                                                            case 5: {
                                                                if (cavalery == 1) {
                                                                    num = num / 2;
                                                                }
                                                                break;
                                                            };
                                                        };
                                                    } else if (affinity == 2) {
                                                        switch (this.CH.dungeonlist[cell][b].type) {
                                                            case 2: {
                                                                if (water == 1) {
                                                                    num = num / 2;
                                                                } else { thisdist = 100 };
                                                                break;
                                                            };
                                                            case 3: {
                                                                if (magic == 1) {
                                                                    num = num / 2;
                                                                } else { thisdist = 100 };
                                                                break;
                                                            };
                                                            case 4: {
                                                                if (infantry == 1) {
                                                                    num = num / 2;
                                                                } else { thisdist = 100 };
                                                                break;
                                                            };
                                                            case 5: {
                                                                if (cavalery == 1) {
                                                                    num = num / 2;
                                                                } else { thisdist = 100 };
                                                                break;
                                                            };
                                                        };
                                                    } else if (affinity == 3) {
                                                        if (this.CH.dungeonlist[cell][b].type == 5) {
                                                            num = num / 2;
                                                        } else { thisdist = 100 };
                                                    } else if (affinity == 4) {
                                                        if (this.CH.dungeonlist[cell][b].type == 3) {
                                                            num = num / 2;
                                                        } else { thisdist = 100 };
                                                    } else if (affinity == 5) {
                                                        if (this.CH.dungeonlist[cell][b].type == 4) {
                                                            num = num / 2;
                                                        } else { thisdist = 100 };
                                                    } else if (affinity == 6) {
                                                        if (this.CH.dungeonlist[cell][b].type == 2) {
                                                            num = num / 2;
                                                        } else { thisdist = 100 };
                                                    }
                                                        

                                                    this.CH.dungeonlist[cell][b].realdist = Math.round(thisdist * 100.0) / 100
                                                    this.CH.dungeonlist[cell][b].dist = num;
                                                    //console.log("Type and info", selectedType, thisdist, this.CH.dungeonlist[cell][b].cx, conty, this.CH.dungeonlist[cell][b].cy);
                                                    if (selectedType == 1 && thisdist < 15 && (contx == this.CH.dungeonlist[cell][b].cx) && (conty == this.CH.dungeonlist[cell][b].cy) && (this.CH.dungeonlist[cell][b].type >= 3) && (this.CH.dungeonlist[cell][b].type <= 5)) {
                                                        dlist.push(this.CH.dungeonlist[cell][b]);
                                                    } else if (selectedType == 2 && ((contx - 1) <= this.CH.dungeonlist[cell][b].cx) && ((conty - 1) <= this.CH.dungeonlist[cell][b].cy) && ((contx + 1) >= this.CH.dungeonlist[cell][b].cx) && ((conty + 1) >= this.CH.dungeonlist[cell][b].cy) && (this.CH.dungeonlist[cell][b].type == 2)) {
                                                        dlist.push(this.CH.dungeonlist[cell][b]);

                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            dlist.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            //                            this.sendAll(this.CH.dungeonlist[cell][b].type, this.CH.dungeonlist[cell][b].level, true, this.CH.dungeonlist[cell][b].x, this.CH.dungeonlist[cell][b].y);
                            console.log("dlist done");
                            if (dlist[0] == undefined) {
                                console.log("No viable targets");
                                return;
                            };
                            console.log("dlist[0]: ", dlist[0]);
                            dungeonType = dlist[0].type;
                            dungeonLevel = dlist[0].level;
                            sendall = true;
                            posX = dlist[0].x;
                            posY = dlist[0].y;

                            if (dungeonType == 3 || dungeonType == 4 || dungeonType == 5) {
                                var cap = 0;
                                if (units != null) {
                                    for (i = 0; i < units.length; i++) {
                                        if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                            var thiscap = units[i].c * resMain.units[units[i].t].c;
                                            cap = cap + thiscap;
                                        }
                                    }
                                    var ratio = (cap / this.CH.options.raiding.lootlevel[dungeonLevel]);
                                    console.log("Ratio", ratio, "cap", cap, "lootlevel", this.CH.options.raiding.lootlevel[dungeonLevel]);
                                    var calcratio = ratio;
                                    while (ratio >= this.CH.options.raiding.allRatio) {
                                        cunits = [];

                                        if ((ratio - Math.floor(ratio)) >= this.CH.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (i = 0; i < units.length; i++) {
                                                if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                    count = Math.ceil(units[i].c / ratio);
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - 1;
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(cunits, 1, 1, posX, posY, source);
                                        }
                                        else if ((ratio - Math.floor(ratio)) < this.CH.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (i = 0; i < units.length; i++) {
                                                if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                    count = Math.ceil(units[i].c / Math.floor(ratio));
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - (ratio / Math.floor(ratio));
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(cunits, 1, 1, posX, posY, source);
                                        }
                                        else if (ratio >= this.CH.options.raiding.allRatio) {
                                            for (i = 0; i < units.length; i++) {
                                                if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                    count = Math.ceil(units[i].c / ratio);
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            ratio = 0;
                                            this.sendRaidDelay(cunits, 1, 1, posX, posY, source);
                                        }

                                    }
                                }
                            }
                            else if (dungeonType == 2) {
                                var cap = 0;
                                if (units != null) {
                                    for (i = 0; i < units.length; i++) {
                                        if (units[i].t >= 16 && units[i].t <= 17) {
                                            var thiscap = units[i].c * resMain.units[units[i].t].c;
                                            cap = cap + thiscap;
                                        }
                                    }
                                    var ratio = (cap / this.CH.options.raiding.lootlevel[dungeonLevel]);
                                    var calcratio = ratio;
                                    while (ratio >= this.CH.options.raiding.allRatio) {
                                        cunits = [];

                                        if ((ratio - Math.floor(ratio)) >= this.CH.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (i = 0; i < units.length; i++) {
                                                if (units[i].t >= 16 && units[i].t <= 17) {
                                                    count = Math.ceil(units[i].c / ratio);
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - 1;
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(cunits, 2, 1, posX, posY, source);
                                        }
                                        else if ((ratio - Math.floor(ratio)) < this.CH.options.raiding.allRatio && (Math.floor(ratio) >= 1)) {
                                            for (i = 0; i < units.length; i++) {
                                                if (units[i].t >= 16 && units[i].t <= 17) {
                                                    count = Math.ceil(units[i].c / Math.floor(ratio));
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            if (sendall) {
                                                ratio = ratio - (ratio / Math.floor(ratio));
                                            } else {
                                                ratio = 0
                                            };
                                            this.sendRaid(cunits, 2, 1, posX, posY, source);

                                        }
                                        else if (ratio >= this.CH.options.raiding.allRatio) {
                                            for (i = 0; i < units.length; i++) {
                                                if (units[i].t >= 16 && units[i].t <= 17) {
                                                    count = Math.ceil(units[i].c / ratio);
                                                    units[i].c = units[i].c - count;
                                                    if (!(count == 0)) {
                                                        cunits.push({ t: units[i].t, c: count });
                                                    }
                                                }
                                            }
                                            ratio = 0;
                                            this.sendRaidDelay(cunits, 2, 1, posX, posY, source);
                                        }
                                    }
                                }
                            };

                        },
                        sendRequestedBoss: function (source, units) {
                            //                            console.log(units);
                            var resMain = webfrontend.res.Main.getInstance();
                            var blist = [];
                            var curX = (source & 0xFFFF);
                            var curY = (source >> 16);
                            var contx = Math.floor(curX / 100);
                            var conty = Math.floor(curY / 100);
                            console.log("source coord", curX, curY, contx, conty);
                            landcap = 0;
                            watercap = 0;
                            var totalTS = 0;
                            var ratiolist = [];
                            var Player = webfrontend.data.Player.getInstance();
                            var playerRank = resMain.playerTitles[Player.getTitle()].r;
                            var minimumBoss = 7;

                            
                            for (i = 1; i <= 10; i++) {
                                dungeonartifact = resMain.dungeonLevels[i].t;
                                playerRankRequired = resMain.playerTitles[dungeonartifact].r;
                                if (playerRank - 1 > playerRankRequired) {
                                    continue; //too low
                                } else {
                                    minimumBoss = i;
                                    break;
                                };
                            }
                            if (this.CH.troopList[source].castle == 1) {
                                orderlimit = 15;
                            }
                            else {
                                orderlimit = 5;
                            };
                            if (this.CH.troopList[source].commands != null) {
                                orderlimit = orderlimit - this.CH.troopList[source].commands.length;
                            };
                            if (orderlimit == 0) {
                                console.log(this.CH.troopList[source].name + ": No free commands")
                                return;
                            };


                            if (units != null) {
                                for (i = 0; i < units.length; i++) {
                                    //                                    console.log("i ", i);
                                    //                                    console.log("units[i].t ", units[i].t);
                                    if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        landcap = landcap + thiscap;
                                        //                                        console.log(thiscap, totalTS, landcap);
                                    }
                                    else if ((units[i].t >= 16 && units[i].t <= 17)) {
                                        thiscap = units[i].c * resMain.units[units[i].t].c;
                                        totalTS = totalTS + units[i].c * resMain.units[units[i].t].uc;
                                        watercap = watercap + thiscap;
                                    };
                                };
                            };

                            selectedType = 0;
                            if ((landcap > 0) && (watercap == 0)) {
                                selectedType = 1;
                                console.log("landonly");
                            } else if ((landcap == 0) && (watercap > 0)) {
                                selectedType = 2;
                                console.log("wateronly");
                            } else if ((landcap == 0) && (watercap == 0)) {
                                selectedType = 3;
                                console.log("no units");
                                return;
                            };
                            console.log("Landcap", landcap, "watercap", watercap);
                            selectedLevel = 0;
                            if (this.CH.sbLevel.getSelection()[0] == undefined) {
                                selectedLevel = 0;
                            }
                            else {
                                selectedLevel = this.CH.sbLevel.getSelection()[0].getModel()
                            };
                            if (selectedLevel > minimumBoss)
                            {
                                minimumBoss = selectedLevel
                            };
                            //                            if (this.doGlobal == false) {
                            if (selectedType == 1) {
                                cxmin = Math.floor((Math.floor(curX / 100)) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 1) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100)) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 1) * 100 / 32);

                            } else {
                                cxmin = Math.floor((Math.floor(curX / 100) - 1) * 100 / 32);
                                cxmax = Math.floor((Math.floor(curX / 100) + 2) * 100 / 32);
                                cymin = Math.floor((Math.floor(curY / 100) - 1) * 100 / 32);
                                cymax = Math.floor((Math.floor(curY / 100) + 2) * 100 / 32);
                            };
                            //                            }
                            //                            else {
                            //                                cxmin = 0;
                            //                                cymin = 0;
                            //                                cxmax = 19;
                            //                                cymax = 19;
                            //                            };
                            cxmin = Math.max(cxmin, 0);
                            cymin = Math.max(cymin, 0);
                            cxmax = Math.min(cxmax, 19);
                            cymax = Math.min(cymax, 19);

                            str = ""
                            console.log("c values", cxmin, cymin, cxmax, cymax);
                            //console.log("DL:", this.CH.dungeonlist);
                            for (ccy = cymin; ccy <= cymax; ccy++) {

                                for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                    if (!(this.CH.bosslist == undefined)) {
                                        cell = ccx + (ccy * 32);

                                        if (!(this.CH.bosslist[cell] == undefined)) {
                                            for (b = 0; b < this.CH.bosslist[cell].length; b++) {
                                                if ((minimumBoss <= this.CH.bosslist[cell][b].level)) {
                                                    x = this.CH.bosslist[cell][b].x;
                                                    y = this.CH.bosslist[cell][b].y;
                                                    //console.log(x, y);
                                                    var diffX = Math.abs(curX - x);
                                                    var diffY = Math.abs(curY - y);
                                                    var thisdist = Math.sqrt(diffX * diffX + diffY * diffY);

                                                    num = new Number(thisdist);
                                                    this.CH.bosslist[cell][b].dist = num;
                                                    //console.log("Type and info", selectedType, thisdist, this.CH.bosslist[cell][b].cx, conty, this.CH.bosslist[cell][b].cy);
                                                    if (selectedType == 1 && (contx == this.CH.bosslist[cell][b].cx) && (conty == this.CH.bosslist[cell][b].cy) && ((this.CH.bosslist[cell][b].type >= 6) && (this.CH.bosslist[cell][b].type <= 8))) {
                                                        blist.push(this.CH.bosslist[cell][b]);
                                                    } else if (selectedType == 2 && (this.CH.bosslist[cell][b].type == 12)) {
                                                        blist.push(this.CH.bosslist[cell][b]);

                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            blist.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            //                            this.sendAll(this.CH.dungeonlist[cell][b].type, this.CH.dungeonlist[cell][b].level, true, this.CH.dungeonlist[cell][b].x, this.CH.dungeonlist[cell][b].y);
                            console.log("blist done");
                            if (blist[0] == undefined) {
                                console.log("No viable targets");
                                return;
                            };
                            console.log("blist[0]: ", blist[0]);
                            Tech = [];
                            count = 0;
                            for (var i = 1; i < 18; i++) {
                                Tech[i] = this.CH.SrvTech.getBonus("unitDamage", webfrontend.data.Tech.research, i) + this.CH.SrvTech.getBonus("unitDamage", webfrontend.data.Tech.shrine, i);
                            }

                            for (boss = 0; boss < blist.length; boss++) {
                                dungeonType = blist[boss].type;
                                dungeonLevel = blist[boss].level;
                                posX = blist[boss].x;
                                posY = blist[boss].y;
                                cunits = [];
                                if (dungeonType == 6) { /* forest */
                                    if (units != null) {
                                        for (i = 0; i < units.length; i++) {
                                            count = 0;
                                            if ((units[i].t == 9) || (units[i].t == 10) || (units[i].t == 11)) {
                                                count = this.CH.bossAtkAff[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            else if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                count = this.CH.bossAtk[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            count = Math.ceil(count);
                                            console.log("Forest:", units[i], count);
                                            if ((units[i].c >= count) && (count > 0)) {
                                                units[i].c = units[i].c - count;
                                                cunits.push({ t: units[i].t, c: count });
                                                this.sendBossRaid(cunits, 1, 0, posX, posY, source);
                                                found = false;
                                                console.log("cleanup");
                                                for (ccy = cymin; ccy <= cymax && found == false; ccy++) {
                                                    for (ccx = cxmin; ccx <= cxmax && found == false; ccx++) {
                                                        cell = ccx + (ccy * 32);
                                                        if (!(this.CH.bosslist[cell] == undefined)) {
                                                            for (i = 0; i < this.CH.bosslist[cell].length && found == false; i++) {
                                                                if (blist[boss].id == this.CH.bosslist[cell][i].id) {
                                                                    this.CH.bosslist[cell].splice(i, 1);
                                                                    found = true;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        };
                                    }
                                } else if (dungeonType == 7) { /* hill */
                                    if (units != null) {
                                        for (i = 0; i < units.length; i++) {
                                            count = 0;
                                            if ((units[i].t == 6) || (units[i].t == 12)) {
                                                count = this.CH.bossAtkAff[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            else if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                count = this.CH.bossAtk[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            count = Math.ceil(count);
                                            if ((units[i].c >= count) && (count > 0)) {
                                                units[i].c = units[i].c - count;
                                                cunits.push({ t: units[i].t, c: count });
                                                this.sendBossRaid(cunits, 1, 0, posX, posY, source);
                                                found = false;
                                                for (ccy = cymin; ccy <= cymax && found == false; ccy++) {
                                                    for (ccx = cxmin; ccx <= cxmax && found == false; ccx++) {
                                                        cell = ccx + (ccy * 32);
                                                        if (!(this.CH.bosslist[cell] == undefined)) {
                                                            for (i = 0; i < this.CH.bosslist[cell].length && found == false; i++) {
                                                                if (blist[boss].id == this.CH.bosslist[cell][i].id) {
                                                                    this.CH.bosslist[cell].splice(i, 1);
                                                                    found = true;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        };
                                    }
                                } else if (dungeonType == 8) { /* mountain */
                                    if (units != null) {
                                        for (i = 0; i < units.length; i++) {
                                            count = 0;
                                            if ((units[i].t == 3) || (units[i].t == 4) || (units[i].t == 5) || (units[i].t == 6)) {
                                                count = this.CH.bossAtkAff[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            else if ((units[i].t >= 3 && units[i].t <= 7) || (units[i].t >= 9 && units[i].t <= 12)) {
                                                count = this.CH.bossAtk[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            count = Math.ceil(count);
                                            if ((units[i].c >= count) && (count > 0)) {
                                                units[i].c = units[i].c - count;
                                                cunits.push({ t: units[i].t, c: count });
                                                this.sendBossRaid(cunits, 1, 0, posX, posY, source);
                                                found = false;
                                                for (ccy = cymin; ccy <= cymax && found == false; ccy++) {
                                                    for (ccx = cxmin; ccx <= cxmax && found == false; ccx++) {
                                                        cell = ccx + (ccy * 32);
                                                        if (!(this.CH.bosslist[cell] == undefined)) {
                                                            for (i = 0; i < this.CH.bosslist[cell].length && found == false; i++) {
                                                                if (blist[boss].id == this.CH.bosslist[cell][i].id) {
                                                                    this.CH.bosslist[cell].splice(i, 1);
                                                                    found = true;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        };
                                    }
                                } else if (dungeonType == 12) { /* water */
                                    if (units != null) {
                                        for (i = 0; i < units.length; i++) {
                                            count = 0;
                                            if ((units[i].t == 16) || (units[i].t == 17)) {
                                                count = this.CH.bossAtkAff[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            else {
                                                count = this.CH.bossAtk[dungeonLevel] * 100 / resMain.units[units[i].t].av / (100 + Tech[units[i].t]);
                                            }
                                            count = Math.ceil(count);
                                            if ((units[i].c >= count) && (count > 0)) {
                                                units[i].c = units[i].c - count;
                                                cunits.push({ t: units[i].t, c: count });
                                                this.sendBossRaid(cunits, 2, 0, posX, posY, source);
                                                found = false;
                                                for (ccy = cymin; ccy <= cymax && found == false; ccy++) {
                                                    for (ccx = cxmin; ccx <= cxmax && found == false; ccx++) {
                                                        cell = ccx + (ccy * 32);
                                                        if (!(this.CH.bosslist[cell] == undefined)) {
                                                            for (i = 0; i < this.CH.bosslist[cell].length && found == false; i++) {
                                                                if (blist[boss].id == this.CH.bosslist[cell][i].id) {
                                                                    this.CH.bosslist[cell].splice(i, 1);
                                                                    found = true;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                console.log("sending");
                                                sent = true;
                                                break;
                                            }
                                        };
                                    }
                                }
                            };
                            this.CH.distCID = 0;
                            this.CH.updateDistance();

                        },
                        requestAttack: function () {
                            console.log("Request attack");
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var units = [];


                            target = this.TFReqAtk["Target"].getValue();
                            if (target != "") {

                                for (i = 0; i < this.ReqAtkList.getSelection().length; i++) {
                                    units = [];
                                    cityunits = {};
                                    transportType = 0;
                                    source = this.ReqAtkList.getSelection()[i].getModel();
                                    console.log("Request attack - source", source, "Number", i + 1, "of", this.ReqAtkList.getSelection().length);
                                    curTCity = this.CH.troopList[source];
                                    if ((curTCity.hasOwnProperty("units"))||(this.CBReqAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands"))) { //* check if it should be added *//
                                        if (curTCity.hasOwnProperty("units")) {
                                            for (j = 0; j < curTCity.units.length; j++) {
                                                if (objlist.hasOwnProperty(curTCity.units[j].t)) {
                                                    if (this.CBReqAtk[objlist[curTCity.units[j].t]].getValue() == true && curTCity.units[j].c > 0 && curTCity.dist > 0) {
                                                        //units.push({ t: curTCity.units[j].t, c: curTCity.units[j].c });
                                                        //console.log(units);
                                                        if (cityunits.hasOwnProperty(curTCity.units[j].t)) {
                                                            cityunits[curTCity.units[j].t] = cityunits[curTCity.units[j].t] + curTCity.units[j].c;
                                                        } else {
                                                            cityunits[curTCity.units[j].t] = curTCity.units[j].c;
                                                        };
                                                        if (curTCity.units[j].t >= 15 && curTCity.units[j].t <= 17) {
                                                            transportType = 1;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        if (this.CBReqAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                            for (var cmd in curTCity.commands) {
                                                order = curTCity.commands[cmd];
                                                if ((order.t == 8)) {
                                                    for (j = 0; j < order.u.length; j++) {
                                                        if (objlist.hasOwnProperty(order.u[j].t)) {
                                                            if (this.CBReqAtk[objlist[order.u[j].t]].getValue() == true && order.u[j].c > 0) {
                                                                add = true;
                                                                if (cityunits.hasOwnProperty(order.u[j].t)) {
                                                                    cityunits[order.u[j].t] = cityunits[order.u[j].t] + order.u[j].c;
                                                                } else {
                                                                    cityunits[order.u[j].t] = order.u[j].c;
                                                                };
                                                                if (order.u[j].t >= 15 && order.u[j].t <= 17) {
                                                                    transportType = 1;
                                                                };

                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        for (t in cityunits) {
                                            units.push({ t: t, c: cityunits[t] });
                                            //console.log(units);
                                        };
                                        if (units != []) {

                                            CityHelper.main.getInstance().sendAttack(source, units, transportType, this.sbTimingReqAtk.getSelection()[0].getModel(), target, this.sbReqAtkType.getSelection()[0].getModel(), this.tbHReqAtk.getValue(), this.tbMReqAtk.getValue(), this.tbSReqAtk.getValue(), this.sbDayReqAtk.getSelection()[0].getModel());
                                        };
                                    };
                                    if (this.CBReqAtk["CancelRaids"].getValue() == true) {
                                        console.log("Stopping raids");
                                        if (curTCity.hasOwnProperty("commands")) {
                                            CityHelper.main.getInstance().stopRaidsTarget(0, source, curTCity.commands);
                                        };
                                    };
                                };
                            };
                        },
                        requestLAttack: function () {
                            console.log("Request large attack");
                            var resMain = webfrontend.res.Main.getInstance();
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var units = [];
                            var tempunits = {};

                            attacks = 0;
                            fakes = 0;
                            fakelist = ["Fake1", "Fake2", "Fake3", "Fake4", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];
                            for (var i = 0; i < fakelist.length; i++) {
                                console.log(this.TFReqLAtk[fakelist[i]].getValue());
                                if (this.TFReqLAtk[fakelist[i]].getValue() != '') {
                                    fakes = fakes + 1;
                                };
                            };
                            //                            console.log(fakes);
                            //                            console.log(this.CBAtk['InclAll'].getValue());
                            //                            console.log(this.CBAtk['AllTypes'].getValue());
                            if (this.TFReqLAtk["FakeTS"].getValue() == '') {
                                this.TFReqLAtk["FakeTS"].setValue('3000');
                            };

                            if (this.TFReqLAtk["Main"].getValue() != '') {
                                attacks = attacks + 1;
                            };

                            target = this.TFReqLAtk["Main"].getValue();
                            for (var i = 0; i < fakelist.length && target ==''; i++) {
                                if (this.TFReqLAtk[fakelist[i]].getValue() != '') {
                                    target = this.TFReqLAtk[fakelist[i]].getValue();
                                };
                            };
                            if (target != "" || fakes>0) {

                                for (i = 0; i < this.ReqLAtkList.getSelection().length; i++) {
                                    units = [];
                                    cityunits = {};
                                    transportType = 0;
                                    source = this.ReqLAtkList.getSelection()[i].getModel();
                                    console.log("Request large attack - source", source, "Number", i + 1, "of", this.ReqLAtkList.getSelection().length);
                                    curTCity = this.CH.troopList[source];
                                    if ((curTCity.hasOwnProperty("units")) || (this.CBReqLAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands"))) { //* check if it should be added *//
                                        if (curTCity.hasOwnProperty("units")) {
                                            for (j = 0; j < curTCity.units.length; j++) {
                                                if (objlist.hasOwnProperty(curTCity.units[j].t)) {
                                                    if (this.CBReqLAtk[objlist[curTCity.units[j].t]].getValue() == true && curTCity.units[j].c > 0 && curTCity.dist > 0) {
                                                        //units.push({ t: curTCity.units[j].t, c: curTCity.units[j].c });
                                                        //console.log(units);
                                                        if (cityunits.hasOwnProperty(curTCity.units[j].t)) {
                                                            cityunits[curTCity.units[j].t] = cityunits[curTCity.units[j].t] + curTCity.units[j].c;
                                                        } else {
                                                            cityunits[curTCity.units[j].t] = curTCity.units[j].c;
                                                        };
                                                        if (curTCity.units[j].t >= 15 && curTCity.units[j].t <= 17) {
                                                            transportType = 1;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        if (this.CBReqLAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                            for (var cmd in curTCity.commands) {
                                                order = curTCity.commands[cmd];
                                                if ((order.t == 8)) {
                                                    for (j = 0; j < order.u.length; j++) {
                                                        if (objlist.hasOwnProperty(order.u[j].t)) {
                                                            if (this.CBReqLAtk[objlist[order.u[j].t]].getValue() == true && order.u[j].c > 0) {
                                                                add = true;
                                                                if (cityunits.hasOwnProperty(order.u[j].t)) {
                                                                    cityunits[order.u[j].t] = cityunits[order.u[j].t] + order.u[j].c;
                                                                } else {
                                                                    cityunits[order.u[j].t] = order.u[j].c;
                                                                };
                                                                if (order.u[j].t >= 15 && order.u[j].t <= 17) {
                                                                    transportType = 1;
                                                                };

                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        var thisTs = 0;
                                        var count = 0;
                                        var tstotal = 0;

                                        for (t in cityunits) {
                                            thisTs = cityunits[t] * resMain.units[t].uc;
                                            tstotal = tstotal + thisTs;
                                            count = count + cityunits[t];
                                            tempunits[t] = {};
                                            tempunits[t].count = cityunits[t];
                                            //units.push({ t: t, c: cityunits[t] });
                                            //console.log(units);
                                        };
                                        console.log("SendAttack: Done part 1: tstotal:", tstotal, "tempunits:", tempunits);
                                        if (tstotal < (fakes + attacks) * this.TFReqLAtk["FakeTS"].getValue()) {
                                            console.log("SendAttack: Not enough units to send", tstotal, "<", (fakes + attacks) * this.TFReqLAtk["FakeTS"].getValue());
                                            continue;
                                        };
                                        fakeType = this.sbReqLAtkType.getSelection()[0].getModel();
                                        if (this.sbFakeTypeReqLAtk.getSelection()[0].getModel() != 0) {
                                            fakeType = this.sbFakeTypeReqLAtk.getSelection()[0].getModel();
                                        };
                                        fakeratio = this.TFReqLAtk["FakeTS"].getValue() / tstotal;
                                        console.log("ratio " + fakeratio);
                                        //Send fakes
                                        transportType = 0;
                                        if (fakes > 0) {
                                            for (var key in tempunits) {

                                                ucount = Math.ceil(tempunits[key].count * fakeratio);
                                                tempunits[key].count = tempunits[key].count - ucount * fakes;
                                                if (!(ucount == 0)) {
                                                    units.push({ t: key, c: ucount });
                                                    if (key >= 15 && key <= 17) {
                                                        transportType = 1;
                                                    };
                                                };

                                            };
                                        };
                                        for (var k = 0; k < fakelist.length; k++) {
                                            console.log(this.TFReqLAtk[fakelist[k]].getValue());
                                            if (this.TFReqLAtk[fakelist[k]].getValue() != '') {
                                                //Send fakes
                                                CityHelper.main.getInstance().sendAttack(source, units, transportType, this.sbTimingReqLAtk.getSelection()[0].getModel(), this.TFReqLAtk[fakelist[k]].getValue(), fakeType, this.tbHReqLAtk.getValue(), this.tbMReqLAtk.getValue(), this.tbSReqLAtk.getValue(), this.sbDayReqLAtk.getSelection()[0].getModel());
                                               
                                            };
                                        };

                                        units = [];
                                        for (var key in tempunits) {
                                            ucount = tempunits[key].count;
                                            tempunits[key].count = tempunits[key].count - ucount;
                                            if (!(ucount == 0)) {
                                                units.push({ t: key, c: ucount });
                                                if (key >= 11 && key <= 14) {
                                                    transportType = 1;
                                                };
                                            }

                                        };

                                        if (attacks != 0) {
                                            CityHelper.main.getInstance().sendAttack(source, units, transportType, this.sbTimingReqLAtk.getSelection()[0].getModel(), target, this.sbReqLAtkType.getSelection()[0].getModel(), this.tbHReqLAtk.getValue(), this.tbMReqLAtk.getValue(), this.tbSReqLAtk.getValue(), this.sbDayReqLAtk.getSelection()[0].getModel());
                                        };
                                    };
                                    if (this.CBReqLAtk["CancelRaids"].getValue() == true) {
                                        console.log("Stopping raids");
                                        if (curTCity.hasOwnProperty("commands")) {
                                            CityHelper.main.getInstance().stopRaidsTarget(0, source, curTCity.commands);
                                        };
                                    };
                                };
                            };
                        },
                        requestUpdate: function () {
                            this.CH.getTroops();
                        },
                        updateReqSupList: function () {
                            //                            console.log("Updating ReqSupList");
                            var resMain = webfrontend.res.Main.getInstance();
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var SrvData = webfrontend.data.Server.getInstance();
                            var SrvTime = webfrontend.data.ServerTime.getInstance();
                            var SrvStep = SrvTime.getServerStep();
                            var SrvTech = webfrontend.data.Tech.getInstance();


                            var tempList = [];
                            var speedList = [];
                            var bonusList = [];
                            for (i = 2; i < 20; i++) {
                                if (i == 18) {
                                    speedList[i] = 0;
                                    bonusList[i] = 0;
                                } else {
                                    bonusList[i] = SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.research, i) + SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, i);
                                    speedList[i] = resMain.units[i].s/ (1+(bonusList[i]/100.00));
                                };
                            };
                            //console.log("ReqSupList", speedList, bonusList);

                            list = [["Ranger", 1], ["Ranger", 3], ["Guardian", 4], ["Templar", 5], ["Scout", 8], ["Crossbow", 9], ["Paladin", 10], ["Ballista", 2], ["Sloop", 16], ["Frigate", 15], ["Beserker", 6], ["Mage", 7], ["Knight", 11], ["Warlock", 12], ["Ram", 13], ["Catapult", 14], ["WarGalleon", 17]];
                            objlist = { 3: "Ranger", 4: "Guardian", 5: "Templar", 8: "Scout", 9: "Crossbow", 10: "Paladin", 2: "Ballista", 16: "Sloop", 15: "Frigate", 6: "Beserker", 7: "Mage", 11: "Knight", 12: "Warlock", 13: "Ram", 14: "Catapult", 17: "WarGalleon" };

                            //console.log(objlist);

                            if (this.TFReqSup["Target"].getValue() == "") {
                                target = cityid;
                            } else {
                                target = this.TFReqSup["Target"].getValue();
                                target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                console.log(target);
                            };
                            this.LastCity = target;
                            for (var tCity in this.CH.troopList) {
                                curTCity = this.CH.troopList[tCity];
                                curTCity.dist = this.distFromIDs(target, tCity);
                            };
                            var add = false;
                            //Make temp list to sort by distance
                            for (var tCity in this.CH.troopList) {
                                curTCity = this.CH.troopList[tCity];
                                if (((curTCity.hasOwnProperty("units")) || curTCity.hasOwnProperty("commands"))) { //* check if it should be added *//
                                    scheduled = false;
                                    if (this.CBReqSup["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.s == 0) && (order.t != 8)) {
                                                //Scheduled command
                                                scheduled = true;
                                                break;
                                            };
                                        };
                                    };
                                    if (scheduled == true) {
                                        continue;
                                    };
                                    add = false;
                                    speed = 0;
                                    units = {};
                                    if (curTCity.hasOwnProperty("units")) {
                                        for (i = 0; i < curTCity.units.length; i++) {
                                            if (objlist.hasOwnProperty(curTCity.units[i].t)) {
                                                //                                            console.log(curTCity.units[i].t);
                                                //                                            console.log(objlist[curTCity.units[i].t]);
                                                //                                            console.log(this.CBReqSup[objlist[curTCity.units[i].t]].getValue());
                                                //                                            console.log(curTCity.units[i].c);
                                                if (this.CBReqSup[objlist[curTCity.units[i].t]].getValue() == true && curTCity.units[i].c > 0 && curTCity.dist > 0) {
                                                    add = true;
                                                    if (units.hasOwnProperty(curTCity.units[i].t)) {
                                                        units[curTCity.units[i].t] = units[curTCity.units[i].t] + curTCity.units[i].c;
                                                    } else {
                                                        units[curTCity.units[i].t] = curTCity.units[i].c;
                                                    };
                                                    if (speed < speedList[curTCity.units[i].t]) {
                                                        speed = speedList[curTCity.units[i].t];
                                                    };
                                                    //                                                console.log([tCity, curTCity.dist]);
                                                    //                                                console.log(tempList);
                                                };
                                            };
                                        };
                                    };
                                    if (this.CBReqSup["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.t == 8)) {
                                                for (i = 0; i < order.u.length; i++) {
                                                    if (objlist.hasOwnProperty(order.u[i].t)) {
                                                        if (this.CBReqSup[objlist[order.u[i].t]].getValue() == true && order.u[i].c > 0) {
                                                            add = true;
                                                            if (units.hasOwnProperty(order.u[i].t)) {
                                                                units[order.u[i].t] = units[order.u[i].t] + order.u[i].c;
                                                            } else {
                                                                units[order.u[i].t] = order.u[i].c;
                                                            };
                                                            if (speed < speedList[order.u[i].t]) {
                                                                speed = speedList[order.u[i].t];
                                                            };

                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    if (add == true) {
                                        //                                            console.log("Adding");
                                        tempList.push([tCity, curTCity.dist * speed, units]);
                                    };

                                };
                            };

                            tempList.sort(function (a, b) { return a[1] - b[1] });

                            //                            console.log(tempList);
                            this.ReqSupList.removeAll();

                            for (i = 0; i < tempList.length; i++) {
                                tCity = tempList[i][0];
                                units = tempList[i][2]
                                curTCity = this.CH.troopList[tCity];
                                ListStr = curTCity.name + " ";
                                if (curTCity.water == 1) {
                                    ListStr = ListStr + "W";
                                };
                                if (curTCity.castle == 1) {
                                    ListStr = ListStr + "C";
                                };
                                if ((curTCity.water == 1) || (curTCity.castle == 1)) {
                                    ListStr = ListStr + " ";
                                };
                                ListStr = ListStr + webfrontend.Util.getDateTimeString(SrvTime.getStepTime(SrvStep + tempList[i][1])) + " ";

                                //if (curTCity.hasOwnProperty("units")) {
                                //    for (t = 0; t < curTCity.units.length; t++) {
                                //        //if (curTCity.units[i] != null) {
                                //        //                                        console.log(curTCity.units);
                                //        if (objlist.hasOwnProperty(curTCity.units[t].t)) {
                                //            //                                            console.log(curTCity.units[t].t);
                                //            if (this.CBReqSup[objlist[curTCity.units[t].t]].getValue() == true) {
                                //                if (curTCity.units[t].c > 0) {
                                //                    ListStr = ListStr + resMain.units[curTCity.units[t].t].n + ":" + curTCity.units[t].c + " ";
                                //                };
                                //            };
                                //            // };
                                //        };
                                //    };
                                for (t in units) {
                                    ListStr = ListStr + resMain.units[t].dn + ":" + units[t] + " ";
                                };
                                item = new qx.ui.form.ListItem(ListStr, null, tCity);
                                this.ReqSupList.add(item);

                            };
                            
                        },
                        updateContSB: function () {
                            if (!(this.RaidControlContSB.getChildren().length == (this.CH.contList.length + 1))) {
                                tempCont = [];
                                for (cont in this.CH.contList) {
                                    tempCont.push(cont);
                                };
                                tempCont.sort(function (a, b) {
                                    return (a - b);
                                });
                                selected = this.RaidControlContSB.getSelection()[0].getModel();
                                this.RaidControlContSB.removeAll();
                                this.RaidControlContSB.add(new qx.ui.form.ListItem("All", null, -1));

                                for (i = 0; i < tempCont.length; i++) {
                                    licont = new qx.ui.form.ListItem(tempCont[i], null, tempCont[i]);
                                    this.RaidControlContSB.add(licont);
                                    if (selected == tempCont[i]) {
                                        this.RaidControlContSB.setSelection([licont]);
                                    };
                                };
                            };
                        },
                        updateRaidMap: function () {
                            tempCell = {};
                            for (cont in this.CH.contList) {
                                cxmin = Math.floor(Math.floor(this.CH.contList[cont].cx - 1) * 100 / 32);
                                cxmax = Math.floor(Math.floor(this.CH.contList[cont].cx + 2) * 100 / 32);
                                cymin = Math.floor(Math.floor(this.CH.contList[cont].cy - 1) * 100 / 32);
                                cymax = Math.floor(Math.floor(this.CH.contList[cont].cy + 2) * 100 / 32);
                                cxmin = Math.max(cxmin, 0);
                                cymin = Math.max(cymin, 0);
                                cxmax = Math.min(cxmax, 19);
                                cymax = Math.min(cymax, 19);
                                for (ccy = cymin; ccy <= cymax; ccy++) {
                                    for (ccx = cxmin; ccx <= cxmax; ccx++) {
                                        cell = ccx + (ccy * 32) + 3072;
                                        tempCell[cell] = "";
                                    };
                                };
                            };
                            cellcount = 0;
                            encode = ""
                            for (cn in tempCell) {
                                cell = cn;
                                while (cell > 0) {
                                    encode = encode + this.CH.cipher[cell % 91];
                                    cell = Math.floor(cell / 91);
                                };
                                encode = encode + "-";
                                cellcount = cellcount + 1;
                                if (cellcount >= this.CH.options.worldmap.cellsPrCommand) {
                                    cellcount = 0;
                                    this.CH.sendMapCommandBuffer.push({ cell: encode });
                                    console.log(encode);
                                    encode = ""
                                }
                            };
                            if (encode != "") {
                                cellcount = 0;
                                this.CH.sendMapCommandBuffer.push({ cell: encode });
                                console.log(encode);
                                encode = ""
                            };
                            this.CH.btnFB.setEnabled(false);
                            this.btnRaidControlSend.setEnabled(false);
                            this.btnRaidControlAll.setEnabled(false);
                            this.btnRaidControlMap.setEnabled(false);
                            if (!this.CH.sendMapCommandBusy) {
                                this.CH.sendMapCommandBusy = true;
                                this.CH.sendMapCmd();
                            };
                        },
                        updateRaidControlList: function () {
                            //                            console.log("Updating RaidControlList");
                            
                            if (this.raidControlUpdate == false) {
                                var resMain = webfrontend.res.Main.getInstance();
                                var cgi = webfrontend.data.City.getInstance();
                                var cityid = cgi.getId();

                                var tempList = [];
                                this.LastCity = "DungeonControl";



                                list = [["Ranger", 1], ["Ranger", 3], ["Guardian", 4], ["Templar", 5], ["Scout", 8], ["Crossbow", 9], ["Paladin", 10], ["Ballista", 2], ["Sloop", 16], ["Frigate", 15], ["Beserker", 6], ["Mage", 7], ["Knight", 11], ["Warlock", 12], ["Ram", 13], ["Catapult", 14], ["WarGalleon", 17]];
                                objlist = { 3: "Ranger", 4: "Guardian", 5: "Templar", 8: "Scout", 9: "Crossbow", 10: "Paladin", 2: "Ballista", 16: "Sloop", 15: "Frigate", 6: "Beserker", 7: "Mage", 11: "Knight", 12: "Warlock", 13: "Ram", 14: "Catapult", 17: "WarGalleon" };

                                //console.log(objlist);

                                //                           for (var tCity in this.CH.troopList) {
                                //                                curTCity = this.CH.troopList[tCity];
                                //                                curTCity.dist = this.distFromIDs(target, tCity);
                                //                            };

                                //Make temp list to sort by distance
                                var ts = 0;
                                var schedunits = {};
                                var scheduled = false;
                                for (var tCity in this.CH.troopList) {
                                    scheduled = false;
                                    curTCity = this.CH.troopList[tCity];
                                    if (this.CBRaidControl["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.s == 0) && (order.t != 8)) {
                                                //Scheduled command
                                                scheduled = true;
                                                for (j = 0; j < order.u.length; j++) {
                                                    schedunits[order.u[j].t] = true;
                                                };
                                            };
                                        };
                                    };
                                    //if (scheduled == true) {
                                    //    continue;
                                    //};
                                    if ((this.RaidControlContSB.getSelection()[0].getModel() == -1) || (this.RaidControlContSB.getSelection()[0].getModel() == (curTCity.cx + curTCity.cy*10))) {
                                        if (curTCity.hasOwnProperty("units")) { //* check if it should be added *//
                                            ts = 0;
                                            for (i = 0; i < curTCity.units.length; i++) {
                                                if (objlist.hasOwnProperty(curTCity.units[i].t)) {
                                                    if (this.CBRaidControl[objlist[curTCity.units[i].t]].getValue() == true && curTCity.units[i].c > 0 && (!schedunits.hasOwnProperty(curTCity.units[i].t))) {
                                                        ts = ts + resMain.units[curTCity.units[i].t].uc * curTCity.units[i].c;
                                                    };
                                                };
                                            };
                                        };
                                        if (ts > 0) {
                                            tempList.push([tCity, ts]);
                                            //console.log([tCity, ts]);

                                        };
                                    };
                                };
                            
                                tempList.sort(function (a, b) { return b[1] - a[1] });

                                this.RaidControlList.removeAll();

                                for (i = 0; i < tempList.length; i++) {
                                    tCity = tempList[i][0];
                                    curTCity = this.CH.troopList[tCity];
                                    ListStr = curTCity.name + " ";
                                    if (curTCity.water == 1) {
                                        ListStr = ListStr + "W";
                                    };
                                    if (curTCity.castle == 1) {
                                        ListStr = ListStr + "C";
                                    };
                                    if ((curTCity.water == 1) || (curTCity.castle == 1)) {
                                        ListStr = ListStr + " ";
                                    };
                                    //ListStr = ListStr + curTCity.dist + " ";
                                    schedunits = {};
                                    if (this.CBRaidControl["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.s == 0) && (order.t != 8)) {
                                                //Scheduled command
                                                scheduled = true;
                                                for (j = 0; j < order.u.length; j++) {
                                                    schedunits[order.u[j].t] = true;
                                                };
                                            };
                                        };
                                    };

                                    if (curTCity.hasOwnProperty("units")) {
                                        for (t = 0; t < curTCity.units.length; t++) {
                                            //if (curTCity.units[i] != null) {
                                            //                                        console.log(curTCity.units);
                                            if (objlist.hasOwnProperty(curTCity.units[t].t)) {
                                                //                                            console.log(curTCity.units[t].t);
                                                if (this.CBRaidControl[objlist[curTCity.units[t].t]].getValue() == true && (!schedunits.hasOwnProperty(curTCity.units[t].t))) {
                                                    if (curTCity.units[t].c > 0) {
                                                        ListStr = ListStr + resMain.units[curTCity.units[t].t].dn + ":" + curTCity.units[t].c + " ";
                                                    };
                                                };
                                                // };
                                            };
                                        };

                                        item = new qx.ui.form.ListItem(ListStr, null, tCity);
                                        this.RaidControlList.add(item);

                                    };
                                };
                            };
                        },
                        updateReqAtkList: function () {
                            //                            console.log("Updating ReqAtkList");
                            var resMain = webfrontend.res.Main.getInstance();
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var SrvData = webfrontend.data.Server.getInstance();
                            var SrvTime = webfrontend.data.ServerTime.getInstance();
                            var SrvStep = SrvTime.getServerStep();
                            var SrvTech = webfrontend.data.Tech.getInstance();


                            var tempList = [];
                            var speedList = [];
                            var bonusList = [];
                            for (i = 2; i < 20; i++) {
                                if (i == 18) {
                                    speedList[i] = 0;
                                    bonusList[i] = 0;
                                } else {
                                    bonusList[i] = SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.research, i) + SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, i);
                                    speedList[i] = resMain.units[i].s / (1 + (bonusList[i] / 100.00));
                                };
                            };

                            list = [["Ranger", 1], ["Ranger", 3], ["Guardian", 4], ["Templar", 5], ["Scout", 8], ["Crossbow", 9], ["Paladin", 10], ["Ballista", 2], ["Sloop", 16], ["Frigate", 15], ["Beserker", 6], ["Mage", 7], ["Knight", 11], ["Warlock", 12], ["Ram", 13], ["Catapult", 14], ["WarGalleon", 17]];
                            objlist = { 3: "Ranger", 4: "Guardian", 5: "Templar", 8: "Scout", 9: "Crossbow", 10: "Paladin", 2: "Ballista", 16: "Sloop", 15: "Frigate", 6: "Beserker", 7: "Mage", 11: "Knight", 12: "Warlock", 13: "Ram", 14: "Catapult", 17: "WarGalleon" };

                            //console.log(objlist);

                            target = this.TFReqAtk["Target"].getValue();
                            if (target == "") {
                                this.ReqAtkList.removeAll();
                            } else {

                                target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                //                                console.log(target);

                                this.LastCity = target;
                                for (var tCity in this.CH.troopList) {
                                    curTCity = this.CH.troopList[tCity];
                                    curTCity.dist = this.distFromIDs(target, tCity);
                                };
                                var add = false;
                                //Make temp list to sort by distance
                                for (var tCity in this.CH.troopList) {
                                    scheduled = false;
                                    curTCity = this.CH.troopList[tCity];
                                    if (this.CBReqAtk["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.s == 0) && (order.t != 8)) {
                                                //Scheduled command
                                                scheduled = true;
                                                break;
                                            };
                                        };
                                    };
                                    if (scheduled == true) {
                                        continue;
                                    };
                                    units = {};
                                    if (((curTCity.hasOwnProperty("units")) || curTCity.hasOwnProperty("commands")) && (curTCity.castle == 1)) { //* check if it should be added *//
                                        add = false;
                                        speed = 0;
                                        if (curTCity.hasOwnProperty("units")) {
                                            for (i = 0; i < curTCity.units.length; i++) {
                                                if (objlist.hasOwnProperty(curTCity.units[i].t)) {
                                                    if (this.CBReqAtk[objlist[curTCity.units[i].t]].getValue() == true && curTCity.units[i].c > 0) {
                                                        add = true;
                                                        if (units.hasOwnProperty(curTCity.units[i].t)) {
                                                            units[curTCity.units[i].t] = units[curTCity.units[i].t] + curTCity.units[i].c;
                                                        } else {
                                                            units[curTCity.units[i].t] = curTCity.units[i].c;
                                                        };
                                                        if (speed < speedList[curTCity.units[i].t]) {
                                                            speed = speedList[curTCity.units[i].t];
                                                        };

                                                    };
                                                };
                                            };
                                        };
                                        if (this.CBReqAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                            for (var cmd in curTCity.commands) {
                                                order = curTCity.commands[cmd];
                                                if ((order.t == 8)) {
                                                    for (i = 0; i < order.u.length; i++) {
                                                        if (objlist.hasOwnProperty(order.u[i].t)) {
                                                            if (this.CBReqAtk[objlist[order.u[i].t]].getValue() == true && order.u[i].c > 0) {
                                                                add = true;
                                                                if (units.hasOwnProperty(order.u[i].t)) {
                                                                    units[order.u[i].t] = units[order.u[i].t] + order.u[i].c;
                                                                } else {
                                                                    units[order.u[i].t] = order.u[i].c;
                                                                };
                                                                if (speed < speedList[order.u[i].t]) {
                                                                    speed = speedList[order.u[i].t];
                                                                };

                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        if (add == true) {
                                            //                                            console.log("Adding");
                                            tempList.push([tCity, curTCity.dist * speed, units]);
                                        };
                                    };
                                };


                                tempList.sort(function (a, b) { return a[1] - b[1] });

                                //                            console.log(tempList);
                                this.ReqAtkList.removeAll();

                                for (i = 0; i < tempList.length; i++) {
                                    tCity = tempList[i][0];
                                    units = tempList[i][2]
                                    curTCity = this.CH.troopList[tCity];
                                    ListStr = curTCity.name + " ";
                                    if (curTCity.water == 1) {
                                        ListStr = ListStr + "W";
                                    };
                                    if (curTCity.castle == 1) {
                                        ListStr = ListStr + "C";
                                    };
                                    if ((curTCity.water == 1) || (curTCity.castle == 1)) {
                                        ListStr = ListStr + " ";
                                    };
                                    ListStr = ListStr + webfrontend.Util.getDateTimeString(SrvTime.getStepTime(SrvStep + tempList[i][1])) + " ";

                                    //if (curTCity.hasOwnProperty("units")) {
                                    //    for (t = 0; t < curTCity.units.length; t++) {
                                    //        //if (curTCity.units[i] != null) {
                                    //        //                                        console.log(curTCity.units);
                                    //        if (objlist.hasOwnProperty(curTCity.units[t].t)) {
                                    //            //                                            console.log(curTCity.units[t].t);
                                    //            if (this.CBReqAtk[objlist[curTCity.units[t].t]].getValue() == true) {
                                    //                if (curTCity.units[t].c > 0) {
                                    //                    ListStr = ListStr + resMain.units[curTCity.units[t].t].dn + ":" + curTCity.units[t].c + " ";
                                    //                };
                                    //            };
                                    //            // };
                                    //        };
                                    //    };
                                    for ( t in units)
                                    {
                                        ListStr = ListStr + resMain.units[t].dn + ":" + units[t] + " ";
                                    };
                                        //               
                                        item = new qx.ui.form.ListItem(ListStr, null, tCity);
                                        this.ReqAtkList.add(item);

                                };
                            };
                        },
                        updateReqLAtkList: function () {
                            //                            console.log("Updating ReqLAtkList");
                            var resMain = webfrontend.res.Main.getInstance();
                            var cgi = webfrontend.data.City.getInstance();
                            var cityid = cgi.getId();

                            var SrvData = webfrontend.data.Server.getInstance();
                            var SrvTime = webfrontend.data.ServerTime.getInstance();
                            var SrvStep = SrvTime.getServerStep();
                            var SrvTech = webfrontend.data.Tech.getInstance();


                            var tempList = [];
                            var speedList = [];
                            var bonusList = [];
                            for (i = 2; i < 20; i++) {
                                if (i == 18) {
                                    speedList[i] = 0;
                                    bonusList[i] = 0;
                                } else {
                                    bonusList[i] = SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.research, i) + SrvTech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, i);
                                    speedList[i] = resMain.units[i].s / (1 + (bonusList[i] / 100.00));
                                };
                            };

                            list = [["Ranger", 1], ["Ranger", 3], ["Guardian", 4], ["Templar", 5], ["Scout", 8], ["Crossbow", 9], ["Paladin", 10], ["Ballista", 2], ["Sloop", 16], ["Frigate", 15], ["Beserker", 6], ["Mage", 7], ["Knight", 11], ["Warlock", 12], ["Ram", 13], ["Catapult", 14], ["WarGalleon", 17]];
                            objlist = { 3: "Ranger", 4: "Guardian", 5: "Templar", 8: "Scout", 9: "Crossbow", 10: "Paladin", 2: "Ballista", 16: "Sloop", 15: "Frigate", 6: "Beserker", 7: "Mage", 11: "Knight", 12: "Warlock", 13: "Ram", 14: "Catapult", 17: "WarGalleon" };
                            fakelist = ["Fake1", "Fake2", "Fake3", "Fake4", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];

                            //console.log(objlist);

                            target = this.TFReqLAtk["Main"].getValue();
                            for (var i = 0; i < fakelist.length && target == ''; i++) {
                                if (this.TFReqLAtk[fakelist[i]].getValue() != '') {
                                    target = this.TFReqLAtk[fakelist[i]].getValue();
                                };
                            };
                            if (target == "") {
                                this.ReqLAtkList.removeAll();
                            } else {

                                target = 65536 * target.split(":")[1] + (target.split(":")[0] * 1);
                                //                                console.log(target);

                                this.LastCity = target;
                                for (var tCity in this.CH.troopList) {
                                    curTCity = this.CH.troopList[tCity];
                                    curTCity.dist = this.distFromIDs(target, tCity);
                                };
                                var add = false;
                                //Make temp list to sort by distance
                                for (var tCity in this.CH.troopList) {
                                    scheduled = false;
                                    curTCity = this.CH.troopList[tCity];
                                    if (this.CBReqLAtk["SkipScheduled"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                        for (var cmd in curTCity.commands) {
                                            order = curTCity.commands[cmd];
                                            if ((order.s == 0) && (order.t != 8)) {
                                                //Scheduled command
                                                scheduled = true;
                                                break;
                                            };
                                        };
                                    };
                                    if (scheduled == true) {
                                        continue;
                                    };
                                    units = {};
                                    if (((curTCity.hasOwnProperty("units")) || curTCity.hasOwnProperty("commands")) && (curTCity.castle == 1)) { //* check if it should be added *//
                                        add = false;
                                        speed = 0;
                                        if (curTCity.hasOwnProperty("units")) {
                                            for (i = 0; i < curTCity.units.length; i++) {
                                                if (objlist.hasOwnProperty(curTCity.units[i].t)) {
                                                    if (this.CBReqLAtk[objlist[curTCity.units[i].t]].getValue() == true && curTCity.units[i].c > 0) {
                                                        add = true;
                                                        if (units.hasOwnProperty(curTCity.units[i].t)) {
                                                            units[curTCity.units[i].t] = units[curTCity.units[i].t] + curTCity.units[i].c;
                                                        } else {
                                                            units[curTCity.units[i].t] = curTCity.units[i].c;
                                                        };
                                                        if (speed < speedList[curTCity.units[i].t]) {
                                                            speed = speedList[curTCity.units[i].t];
                                                        };

                                                    };
                                                };
                                            };
                                        };
                                        if (this.CBReqLAtk["IncludeRaiding"].getValue() == true && curTCity.hasOwnProperty("commands")) {
                                            for (var cmd in curTCity.commands) {
                                                order = curTCity.commands[cmd];
                                                if ((order.t == 8)) {
                                                    for (i = 0; i < order.u.length; i++) {
                                                        if (objlist.hasOwnProperty(order.u[i].t)) {
                                                            if (this.CBReqLAtk[objlist[order.u[i].t]].getValue() == true && order.u[i].c > 0) {
                                                                add = true;
                                                                if (units.hasOwnProperty(order.u[i].t)) {
                                                                    units[order.u[i].t] = units[order.u[i].t] + order.u[i].c;
                                                                } else {
                                                                    units[order.u[i].t] = order.u[i].c;
                                                                };
                                                                if (speed < speedList[order.u[i].t]) {
                                                                    speed = speedList[order.u[i].t];
                                                                };

                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        if (add == true) {
                                            //                                            console.log("Adding");
                                            tempList.push([tCity, curTCity.dist * speed, units]);
                                        };
                                    };
                                };


                                tempList.sort(function (a, b) { return a[1] - b[1] });

                                //                            console.log(tempList);
                                this.ReqLAtkList.removeAll();

                                for (i = 0; i < tempList.length; i++) {
                                    tCity = tempList[i][0];
                                    units = tempList[i][2]
                                    curTCity = this.CH.troopList[tCity];
                                    ListStr = curTCity.name + " ";
                                    if (curTCity.water == 1) {
                                        ListStr = ListStr + "W";
                                    };
                                    if (curTCity.castle == 1) {
                                        ListStr = ListStr + "C";
                                    };
                                    if ((curTCity.water == 1) || (curTCity.castle == 1)) {
                                        ListStr = ListStr + " ";
                                    };
                                    ListStr = ListStr + webfrontend.Util.getDateTimeString(SrvTime.getStepTime(SrvStep + tempList[i][1])) + " ";

                                    //if (curTCity.hasOwnProperty("units")) {
                                    //    for (t = 0; t < curTCity.units.length; t++) {
                                    //        //if (curTCity.units[i] != null) {
                                    //        //                                        console.log(curTCity.units);
                                    //        if (objlist.hasOwnProperty(curTCity.units[t].t)) {
                                    //            //                                            console.log(curTCity.units[t].t);
                                    //            if (this.CBReqLAtk[objlist[curTCity.units[t].t]].getValue() == true) {
                                    //                if (curTCity.units[t].c > 0) {
                                    //                    ListStr = ListStr + resMain.units[curTCity.units[t].t].dn + ":" + curTCity.units[t].c + " ";
                                    //                };
                                    //            };
                                    //            // };
                                    //        };
                                    //    };
                                    for (t in units) {
                                        ListStr = ListStr + resMain.units[t].dn + ":" + units[t] + " ";
                                    };
                                    //               
                                    item = new qx.ui.form.ListItem(ListStr, null, tCity);
                                    this.ReqLAtkList.add(item);

                                };
                            };
                        },
                        stopRaids: function (e) {
                            if (e.getButton() == "right") {
                                CityHelper.main.getInstance().stopRaids(1);
                                return;
                            };

                            CityHelper.main.getInstance().stopRaids(2);
                        },
                        daybox: function () {
                            var kX = new qx.ui.form.SelectBox().set({ font: "default", width: 100, height: 25, allowGrowY: false });
                            kX.add(new qx.ui.form.ListItem("Today", null, 0));
                            kX.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
                            kX.add(new qx.ui.form.ListItem("2 days", null, 2));
                            kX.add(new qx.ui.form.ListItem("3 days", null, 3));
                            kX.add(new qx.ui.form.ListItem("4 days", null, 4));
                            kX.add(new qx.ui.form.ListItem("5 days", null, 5));
                            kX.add(new qx.ui.form.ListItem("6 days", null, 6));
                            kX.add(new qx.ui.form.ListItem("7 days", null, 7));
                            return kX;
                        },
                        makeSpinner: function (kV) {
                            var kW = new webfrontend.ui.SpinnerInt(0, 0, kV).set({ width: 25, height: 25, allowGrowY: false });
                            kW.getChildControl("upbutton").setVisibility("excluded");
                            kW.getChildControl("downbutton").setVisibility("excluded");
                            kW.getChildControl("textfield").setLiveUpdate(true);
                            kW.getChildControl("textfield").setTextAlign('right');
                            kW.getChildControl("textfield").addListener("changeValue", function (e) { if (e.getData().length == 0) this.spinner.setValue(0); }, { spinner: kW });
                            return kW;
                        },
                        sendAttack: function () {
                            var resMain = webfrontend.res.Main.getInstance();
                            var city = webfrontend.data.City.getInstance();
                            var units = [];
                            var tempunits = [];

                            fakes = 0;
                            fakelist = ["Fake1", "Fake2", "Fake3", "Fake4", "Fake5", "Fake6", "Fake7", "Fake8", "Fake9", "Fake10", "Fake11", "Fake12", "Fake13", "Fake14"];
                            for (var i = 0; i < fakelist.length; i++) {
                                console.log(this.TFAtk[fakelist[i]].getValue());
                                if (this.TFAtk[fakelist[i]].getValue() != '') {
                                    fakes = fakes + 1;
                                };
                            };
                            //                            console.log(fakes);
                            //                            console.log(this.CBAtk['InclAll'].getValue());
                            //                            console.log(this.CBAtk['AllTypes'].getValue());
                            if (this.TFAtk["FakeTS"].getValue() == '') {
                                this.TFAtk["FakeTS"].setValue('3000');
                            };

                            //Calc
                            // Off 6,7,11,12,13,14,17
                            // Def 2,3,4,5,9,10,15,16
                            // Scout 8, (15 - frig)
                            var thisTs = 0;
                            var count = 0;
                            var tstotal = 0;
                            //this.sbTiming.getSelection()[0].getModel()
                            //uc for ts
                            //count in city, total...
                            if (city.getUnits() != null) {
                                for (var key in city.getUnits()) {
                                    if (this.sbType.getSelection()[0].getModel() == 1) {
                                        if (key == 8) {
                                            var unit = (city.getUnits())[key];
                                            if (this.CBAtk['InclAll'].getValue()) {
                                                thisTs = unit.total * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.total;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.total;
                                            }
                                            else {
                                                thisTs = unit.count * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.count;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.count;
                                            };
                                        };
                                    } else if (this.CBAtk['AllTypes'].getValue() == true) {
                                        if (key >= 2 && key <= 17) {
                                            var unit = (city.getUnits())[key];
                                            if (this.CBAtk['InclAll'].getValue()) {
                                                thisTs = unit.total * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.total;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.total;
                                            }
                                            else {
                                                thisTs = unit.count * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.count;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.count;
                                            };
                                        };
                                    } else {
                                        if ((key >= 6 && key <= 7) || (key >= 11 && key <= 14) || (key == 17)) {
                                            var unit = (city.getUnits())[key];
                                            if (this.CBAtk['InclAll'].getValue()) {
                                                thisTs = unit.total * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.total;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.total;
                                            }
                                            else {
                                                thisTs = unit.count * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.count;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.count;
                                            };
                                        };
                                    };
                                };
                            };
                            console.log("SendAttack: Done part 1: tstotal:", tstotal, "tempunits:",tempunits);
                            if (tstotal < (fakes + 1) * this.TFAtk["FakeTS"].getValue()) {
                                console.log("SendAttack: Not enough units to send", tstotal, "<", (fakes + 1) * this.TFAtk["FakeTS"].getValue());
                                return;
                            };
                            fakeType = this.sbType.getSelection()[0].getModel();
                            if (this.sbFakeType.getSelection()[0].getModel() != 0) {
                                fakeType = this.sbFakeType.getSelection()[0].getModel();
                            };
                            fakeratio = this.TFAtk["FakeTS"].getValue() / tstotal;
                            console.log("ratio " + fakeratio);
                            //Send fakes
                            transportType = 0;
                            if (fakes > 0) {
                                for (var key in tempunits) {

                                    ucount = Math.ceil(tempunits[key].count * fakeratio);
                                    tempunits[key].count = tempunits[key].count - ucount * fakes;
                                    if (!(ucount == 0)) {
                                        units.push({ t: key, c: ucount });
                                        if (key >= 15 && key <= 17) {
                                            transportType = 1;
                                        };
                                    };

                                };
                            };
                            for (var i = 0; i < fakelist.length; i++) {
                                console.log(this.TFAtk[fakelist[i]].getValue());
                                if (this.TFAtk[fakelist[i]].getValue() != '') {
                                    //Send fakes
                                    CityHelper.main.getInstance().sendAttack(city.getId(), units, transportType, this.sbTiming.getSelection()[0].getModel(), this.TFAtk[fakelist[i]].getValue(), fakeType, this.tbH.getValue(), this.tbM.getValue(), this.tbS.getValue(), this.sbDay.getSelection()[0].getModel());

                                };
                            };
                            units = [];
                            for (var key in tempunits) {
                                ucount = tempunits[key].count;
                                tempunits[key].count = tempunits[key].count - ucount;
                                if (!(ucount == 0)) {
                                    units.push({ t: key, c: ucount });
                                    if (key >= 11 && key <= 14) {
                                        transportType = 1;
                                    };
                                }

                            };
                            //Send attack
                            CityHelper.main.getInstance().sendAttack(city.getId(), units, transportType, this.sbTiming.getSelection()[0].getModel(), this.TFAtk['Main'].getValue(), this.sbType.getSelection()[0].getModel(), this.tbH.getValue(), this.tbM.getValue(), this.tbS.getValue(), this.sbDay.getSelection()[0].getModel());

                        },
                        sendSupport: function () {
                            var resMain = webfrontend.res.Main.getInstance();
                            var city = webfrontend.data.City.getInstance();
                            var units = [];
                            var tempunits = [];

                            targets = 0;
                            for (var i = 1; i <= 15; i++) {
                                console.log(this.TFSup[i].getValue());
                                if (this.TFSup[i].getValue() != '') {
                                    targets = targets + 1;
                                };
                            };
                            console.log(targets);
                            console.log(this.CBSup['InclAll'].getValue());
                            console.log(this.CBSup['AllTypes'].getValue());

                            //Calc
                            // Off 6,7,11,12,13,14,17
                            // Def 2,3,4,5,9,10,15,16
                            // Scout 8, (15 - frig)
                            var thisTs = 0;
                            var count = 0;
                            var tstotal = 0;
                            //this.sbTiming.getSelection()[0].getModel()
                            //uc for ts
                            //count in city, total...
                            if (city.getUnits() != null) {
                                for (var key in city.getUnits()) {
                                    if (this.CBSup['AllTypes'].getValue() == true) {
                                        if (key >= 2 && key <= 17) {
                                            var unit = (city.getUnits())[key];
                                            if (this.CBSup['InclAll'].getValue()) {
                                                thisTs = unit.total * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.total;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.total;
                                            }
                                            else {
                                                thisTs = unit.count * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.count;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.count;
                                            };
                                        };
                                    } else {
                                        if ((key >= 2 && key <= 5) || (key >= 8 && key <= 10) || (key >= 15 && key <= 16)) {
                                            var unit = (city.getUnits())[key];
                                            if (this.CBSup['InclAll'].getValue()) {
                                                thisTs = unit.total * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.total;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.total;
                                            }
                                            else {
                                                thisTs = unit.count * resMain.units[key].uc;
                                                tstotal = tstotal + thisTs;
                                                count = count + unit.count;
                                                tempunits[key] = [];
                                                tempunits[key].count = unit.count;
                                            };
                                        };
                                    };
                                };
                            };
                            console.log("Done part 1");
                            console.log(tempunits);

                            transportType = 0;
                            if (targets > 0) {
                                for (var i = 1; i <= 15; i++) {
                                    console.log(this.TFSup[i].getValue());
                                    if (this.TFSup[i].getValue() != '') {
                                        for (var key in tempunits) {

                                            ucount = Math.ceil(tempunits[key].count / targets);
                                            tempunits[key].count = tempunits[key].count - ucount;
                                            if (!(ucount == 0)) {
                                                units.push({ t: key, c: ucount });
                                                if (key >= 11 && key <= 14) {
                                                    transportType = 1;
                                                };
                                            };

                                        };
                                        targets = targets - 1;
                                        CityHelper.main.getInstance().sendAttack(city.getId(), units, transportType, this.sbTimingSup.getSelection()[0].getModel(), this.TFSup[i].getValue(), 4, this.tbHSup.getValue(), this.tbMSup.getValue(), this.tbSSup.getValue(), this.sbDaySup.getSelection()[0].getModel());
                                        //send support
                                        units = [];
                                    };
                                };
                            };

                        },
                        showWC: function () {
                            console.log("WC ShowWC");
                            this.window.moveTo(500, 200);
                            this.window.open();
                            this.window.setAlwaysOnTop(true);
                            this.window.setModal(true);

                            //console.log(this.window.isActive());


                        },
                        OpenWC: function () {
                            console.log("OpenWC");
                            CityHelper.WeaponsControl.getInstance().started = true;
                            CityHelper.WeaponsControl.getInstance().checkReqLists();
                            CityHelper.main.getInstance().getTroops();
                        },
                        CloseWC: function () {
                            console.log("CloseWC");
                            CityHelper.WeaponsControl.getInstance().started = false;

                        }
                    }
                });
            }

            function CH_checkIfLoaded() {
                try {
                    if (typeof qx != 'undefined') {
                        a = qx.core.Init.getApplication();
                        c = a.cityInfoView;
                        ch = a.chat;
                        wdst = webfrontend.data.ServerTime.getInstance().refTime;
                        if (a && c && ch && wdst) {
                            createCtTweak();
                            window.CityHelper.main.getInstance().initialize();
                        } else
                            window.setTimeout(CH_checkIfLoaded, 1000);
                    } else {
                        window.setTimeout(CH_checkIfLoaded, 1000);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            if (/lordofultima\.com/i.test(document.domain))
                window.setTimeout(CH_checkIfLoaded, 1000);

        }
        // injecting, because there seem to be problems when creating game interface with unsafeWindow
        window.setTimeout(injectDarklightScript, 15000);

        function injectDarklightScript() {
            console.log("Injecting CityHelper GUI");

            var CityHelperScript = document.createElement("script");
            txt = CH_mainfunction.toString();
            if (window.opera != undefined)
                txt = txt.replace(/</g, "&lt;"); // rofl Opera
            CityHelperScript.innerHTML = "(" + txt + ")();";
            CityHelperScript.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(CityHelperScript);
            console.log("CityHelper GUI Injected");

        }

    })();