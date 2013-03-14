// @version 4
(function outer() {
		qx.Class.define("dsislou.addon",{
			extend: qx.core.Object,
			construct: function () {
				this.app = qx.core.Init.getApplication();
			},
			members:{
				initialize: function () {
				}
			}
		});
		qx.Class.define("dsislou.main",{
			extend: qx.core.Object,
			type: "singleton",
			construct: function () {
				console.log('dsislou.main loaded');
				qx.event.GlobalError.setErrorHandler(this.handleError,this);
				if (dsisLouBridge === undefined) {
					this.addChatMessage("you need to <a href='http://loudb.angeldsis.com' target='_blank'>upgrade</a> the extension");
				} else {
					this.addChatMessage('<a href="javascript:dsislou.main.getInstance().openScriptList()">script list</a>');
				}
			},members:{
				handleError: function (err) {
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
				},openScriptList: function () {
					dsisLouBridge.openScriptList();
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
	if (/lordofultima\.com/i.test(document.domain)) dsislou.main.getInstance();
})();
