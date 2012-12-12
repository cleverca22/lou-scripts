// ==UserScript==
// @name           Dave LoU Winter
// @description    LoU Winter disable
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.1.1
// ==/UserScript==

(function() {

    var inject = function davelouwinter() {
        var h;
        var j;
        if (!window.webfrontend || !webfrontend.config || !window.ClientLib
            || !webfrontend.config.Config || !(h=webfrontend.config.Config.getInstance())
            || !ClientLib.File.FileManager || !(j=ClientLib.File.FileManager.GetInstance())
            || !j.VJ.l[0]
            ) {
            window.setTimeout(davelouwinter, 50);
            return;
        }
        
        try {
            h.setImageSource("http://prodcdngame.lordofultima.com/cdn/363511/resource/webfrontend/");
            j.VJ.l[0].XF="http://prodcdngame.lordofultima.com/cdn/363511/resource/webfrontend/";
        } catch (e) {
            console.error(e)
        }
    } // end of inject

    console.info("dave.lou.winter inject");
    var script = document.createElement("script");
    script.innerHTML = "(" + inject.toString() + ")();";
    script.type = "text/javascript";
    script.title = "dave.lou.winter";
    document.getElementsByTagName("head")[0].appendChild(script);

})();



