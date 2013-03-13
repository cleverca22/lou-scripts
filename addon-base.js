// @version 1
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
			},members:{
				handleError: function (err) {
					if (err.classname == 'qx.core.WindowError') {
						console.log(err.stack); // stack points to qx.core.WindowError.construct, its useless
						console.log(err.toString()); // failMessage passed to construct
						console.log(err.getUri()); // uri passed to construct
						console.log(err.getLineNumber()); // line# passed to construct
					} else if (err.classname == 'qx.core.GlobalError') {
						try {
							var exception = err.getSourceException();
							var msg = exception.toString();
							var file = exception.fileName;
							var line = exception.lineNumber;
							var stack = exception.stack;
							unsafeDebug(msg+'\n'+file+':'+line+'\n'+stack);
						} catch (e) {
							console.log(e);
						}
					} else {
						console.log(err);
					}
				}
			}
		});
	if (/lordofultima\.com/i.test(document.domain)) dsislou.main.getInstance();
})();
