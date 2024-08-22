var doc = app.activeDocument;
var page = app.activeWindow.activePage;
var bookSize = doc.pages.count();
var prefs = doc.documentPreferences;

// Adjustable parameters
var pageNumberMaster = doc.masterSpreads.itemByName("C-PageNumber");
var pageNumberLayer = app.activeDocument.layers.itemByName("Page Numbers");
var startPageNumber = 1;

function getMasterPageItems() {
    var pageItems = pageNumberMaster.allPageItems;
    var masterPageNumbers = [null, null]

    for (var i = 0; i < pageItems.length; i++) {
        var pageItem = pageItems[i];
        var pageElement = pageItem.getElements()[0]
        if (pageElement instanceof TextFrame && pageItem.itemLayer == pageNumberLayer) {
            if (pageItem.parentPage.side === PageSideOptions.LEFT_HAND) {
                masterPageNumbers[0] = pageItem;
            }
            else {
                masterPageNumbers[1] = pageItem;
            }
        }
    }

    return masterPageNumbers;
}

function main() {
    try {
        if (pageNumberLayer.isValid) {
            var masterPageNumbers = getMasterPageItems();
            var pageNumberItem;

            if (page.side === PageSideOptions.LEFT_HAND) {
                pageNumberItem = masterPageNumbers[0];
            }
            else {
                pageNumberItem = masterPageNumbers[1];
            }
            newPageNumberItem = pageNumberItem.duplicate(page);
            pageNumberStr = (bookSize - (page.documentOffset - startPageNumber) - 1).toString();
            newPageNumberItem.contents = pageNumberStr;
        }
    } catch (err) {
        alert(err)
    }
}

main();