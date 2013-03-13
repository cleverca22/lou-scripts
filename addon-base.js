(function outer() {
	function createEverything() {
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
			},members:{
				handleError: function (err) {
					console.log(err);
				}
			}
		});
	}
	function checkQx() {
		try {
			if (typeof qx != 'undefined') {
				var a = qx.core.Init.getApplication();
				var c = a.cityInfoView;
				var ch = a.chat;
				var wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					createEverything();
					dsislou.main.getInstance();
				} else window.setTimeout(checkQx,1000);
			} else {
				window.setTimeout(checkQx,1000);
			}
		} catch (e) {
			console.log(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain)) window.setTimeout(checkQx,1000);
})();
