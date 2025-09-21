var doc = app.activeDocument;
var bookSize = doc.pages.count();
var prefs = doc.documentPreferences;

// Adjustable parameters
var pageNumberMaster = doc.masterSpreads.itemByName("C-PageNumber");
var pageNumberLayer = app.activeDocument.layers.itemByName("Page Numbers");

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

function repositionPageNumbers() {
    var masterPageNumbers = getMasterPageItems();
    try {
        var pageNumbers = pageNumberLayer.allPageItems;
        for (var i = 0; i < pageNumbers.length; i++) {
            var pageNumber = pageNumbers[i];
            var page = pageNumber.parentPage;
            if (page.side === PageSideOptions.LEFT_HAND) {
                masterPageNumber = masterPageNumbers[0];
            }
            else {
                masterPageNumber = masterPageNumbers[1];
            }
            if (pageNumber instanceof TextFrame) {
                pageNumber.geometricBounds = masterPageNumber.geometricBounds;
            }
        }
    } catch (err) {
        alert(err)
    }
}

function main() {
    confirmReposition = confirm("Reposition page numbers?");

    if (confirmReposition) {
        repositionPageNumbers();
    }
}

main();