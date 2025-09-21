var doc = app.activeDocument;
var bookSize = doc.pages.count();
var prefs = doc.documentPreferences;

// Adjustable parameters
var pageNumberLayer = app.activeDocument.layers.itemByName("Page Numbers");
var startPageNumber = 1;
var isPad = false;

function renumberPageNumbers() {
    try {
        var pageNumbers = pageNumberLayer.allPageItems;
        for (var i = 0; i < pageNumbers.length; i++) {
            var pageNumber = pageNumbers[i];
            var page = pageNumber.parentPage;
            if (pageNumber instanceof TextFrame) {
                var pageNumberStr = (bookSize - (page.documentOffset - startPageNumber) - 1).toString();
                if (isPad) {
                    pageNumberStr = ("000" + pageNumberStr).slice(-3);
                }
                pageNumber.contents = pageNumberStr;
            }
        }
    } catch (err) {
        alert(err)
    }
}

function main() {
    confirmRenumber = confirm("Renumber page numbers?");

    if (confirmRenumber) {
        renumberPageNumbers();
    }
}

main();