var doc = app.activeDocument;
var page = app.activeWindow.activePage;
var bookSize = doc.pages.count();
var prefs = doc.documentPreferences;

// Adjustable parameters
var artImageLayer = app.activeDocument.layers.itemByName("Art");
var startPageNumber = null;
var endPageNumber = null;
var graphicsPercentage = 81;

function getLayerGraphic(page, layer) {
    var pageItems = page.pageItems;
    var graphics = []
    for (var i = 0; i < pageItems.length; i++) {
        if (pageItems[i].allGraphics.length > 0) {
            for (var j = 0; j < pageItems[i].allGraphics.length; j++) {
                var graphic = pageItems[i].allGraphics[j];
                if (!graphic.locked && graphic.itemLayer == layer) {
                    graphics.push(graphic);
                }
            }
        }
    }
    return graphics;
}

function setGraphicsPercentage() {
    if (startPageNumber == null)
        startPageNumber = 1;
    if (endPageNumber == null)
        endPageNumber = bookSize;
    try {
        for (var i = startPageNumber-1; i <= endPageNumber-1; i++) {
            var page = doc.pages[i];
            app.activeWindow.activePage = page;
            images = getLayerGraphic(page, artImageLayer);

            if (images.length > 0) {
                for (var j = 0; j < images.length; j++) {
                    var image = images[j];
                    image.absoluteHorizontalScale = graphicsPercentage;
                    image.absoluteVerticalScale = graphicsPercentage;
                }
            }
        }
    } catch (err) {
        alert(err)
    }
}

function main() {
    confirmSet = confirm("Set all graphics percentage to " + graphicsPercentage + "%?");

    if (confirmSet) {
        setGraphicsPercentage();
    }
}

main();