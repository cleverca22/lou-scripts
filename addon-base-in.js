		qx.Class.define("dsislou.addon",{
			extend: qx.core.Object,
			construct: function () {
				this.base(arguments);
				this.app = qx.core.Init.getApplication();
			},
			members:{
				initialize: function () {
				}
			}
		});
		qx.Class.define("dsislou.main",{
			extend: dsislou.addon,
			type: "singleton",
			construct: function () {
				this.base(arguments);
				console.log('dsislou.main loaded');
				qx.event.GlobalError.setErrorHandler(this.handleError,this);
				var container = this.app.title.reportButton.getLayoutParent();
				this.label = new qx.ui.form.Button("loading");
				//container._add(this.label,{row:0,column:13});
				this.lastcount = 0;
				this.lastprofile = {};
				//webfrontend.base.Timer.getInstance().addListener("uiTick", this.tick,this);
				this.menu = new qx.ui.menu.Menu().set({iconColumnWidth:0});
				var mainMenu = new qx.ui.form.MenuButton("Main Menu",null,this.menu);
				this.app.desktop.add(mainMenu,{right:0,bottom:'50%'});
				if (dsisLouBridge === undefined) {
					this.addChatMessage("you need to <a href='http://loudb.angeldsis.com' target='_blank'>upgrade</a> the extension");
				} else {
					//this.addChatMessage('<a href="javascript:dsislou.main.getInstance().openScriptList()">script list</a>');
					var scriptList = new qx.ui.menu.Button("Script List");
					scriptList.addListener("execute",this.openScriptList,this);
					this.menu.add(scriptList);
					var sourceList = new qx.ui.menu.Button("Source List");
					sourceList.addListener("execute",this.openSourceList,this);
					this.menu.add(sourceList);
				}
			},members:{
				getMainMenu: function () {
					return this.menu;
				},
				tick: function () {
					var foo = qx.core.ObjectRegistry.getRegistry();
					var y = 0;
					for (x in foo) y++;
					this.label.setLabel(y);
					var diff = y - this.lastcount;
					//if (diff != 0) console.log('count went up '+diff);
					this.lastcount = y;
				},
				getProfile: function () {
					var list = {};
					var reg = qx.core.ObjectRegistry.getRegistry();
					for (x in reg) {
						var clazz = reg[x].classname;
						if (!list[clazz]) list[clazz] = 1;
						else list[clazz]++;
					}
					var list2 = [];
					for (x in list) {
						if (list[x] < 10) list[x] = undefined;
						else {
							var oldcount;
							if (this.lastprofile[x]) oldcount = this.lastprofile[x];
							else oldcount = 0;
							if (list[x] > oldcount) console.log((list[x] - oldcount)+' '+x+' made');
							else if (list[x] < oldcount) console.log((list[x] - oldcount)+' '+x+' deleted');
							list2.push({clazz:x,count:list[x]});
						}
					}
					this.lastprofile = list;
					return list2.sort(function (a,b) {
						if (a.count > b.count) return -1;
						else if (a.count < b.count) return 1;
						return 0;
					});
				},
				handleError: function (err) {
					this.lastError = err;
					try {
						var obj;
						if (err.classname == 'qx.core.WindowError') {
							console.log(err.stack); // stack points to qx.core.WindowError.construct, its useless
							console.log(err.toString()); // failMessage passed to construct
							console.log(err.getUri()); // uri passed to construct
							console.log(err.getLineNumber()); // line# passed to construct
							obj = {};
							obj.stack = err.stack;
							obj.msg = err.toString();
							obj.uri == err.getUri();
							obj.line = err.getLineNumber();
							obj.type = "WindowError";
							obj.longmsg = obj.msg;
						} else if (err.classname == 'qx.core.GlobalError') {
							var exception = err.getSourceException();
							obj = {};
							obj.msg = exception.toString();
							obj.uri = exception.fileName;
							obj.line = exception.lineNumber;
							obj.stack = exception.stack;
							obj.type = "GlobalError";
							obj.longmsg = obj.msg+'\n'+obj.uri+':'+obj.line+'\n'+obj.stack;
						} else {
							console.log(err);
						}
						if (obj) {
							if ((dsisLouBridge !== undefined) && dsisLouBridge.reportError) {
								dsisLouBridge.reportError(obj);
							} else this.addChatMessage(obj.longmsg);
						}
					} catch (e) {
						console.log(e);
					}
				},getLastError: function () {
					return this.lastError;
				},openScriptList: function () {
					//dsisLouBridge.openScriptList();
					qx.event.GlobalError.observeMethod(function () {
						dsislou.MainWindow.openAndSetup()
					})();
				},openSourceList: function () {
					qx.event.GlobalError.observeMethod(function () {
						var win = new dsislou.ScriptSources();
						win.open();
						win.moveTo(30,30);
					})();
				},addChatMessage: function(msg) {
					var eV = webfrontend.config.Config.getInstance().getChat(),
						eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + msg + '</font>',
						eO, eU;
					if (eV.getTimeStamp()) {
						eO = webfrontend.data.ServerTime.getInstance();
						eU = eO.getServerStep();
						if (eU) eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
					}
					qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
				}
			}
		});
	if (/lordofultima\.com/i.test(document.domain)) {
		try {
			dsislou.main.getInstance();
		} catch (e) {
			alert(e);
		}
	}
})();
