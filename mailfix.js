// @version        2
(function () {
	return;
	var titleWidget = qx.core.Init.getApplication().getTitleWidget();
	titleWidget.mail = new webfrontend.gui.Mail.ListWidget();
	for (x in titleWidget.mail) {
		if (titleWidget.mail.hasOwnProperty(x)) {
			if (titleWidget.mail[x].classname == 'webfrontend.data.MailHeaderDataModel') {
				titleWidget.mail[x].setBlockSize(10);
				console.warn('changed block size');
				return;
			}
		}
	}
	console.warn('couldnt find prop');
})()
