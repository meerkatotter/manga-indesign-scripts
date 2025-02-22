var doc = app.activeDocument;
var pages = doc.pages;
var bookSize = pages.count();
var prefs = doc.documentPreferences;

function main() {
    confirmReverse = confirm('Reverse pages?');

    if (confirmReverse) {
        if (bookSize % 2 == 1) {
            pages.add(LocationOptions.AT_END);
        }
        doc.pageItems.everyItem().locked = true;
        for (var i = bookSize-1; i >= 0; i--) { 
            pages[i].move(LocationOptions.AT_END);
        }
        doc.pageItems.everyItem().locked = false;
        prefs.pageBinding = prefs.pageBinding == PageBindingOptions.LEFT_TO_RIGHT ? PageBindingOptions.RIGHT_TO_LEFT : PageBindingOptions.LEFT_TO_RIGHT;
    }
}

main();