var doc = app.activeDocument;
var bookSize = doc.pages.count();

// Adjustable parameters
var heightRatio = 1;
var widthRatio = 2;

function getAllParagraphStyles(styleGroup) {
    var allStyles = [];
    var allStylesNames = [];

    for (var i = 0; i < styleGroup.paragraphStyles.length; i++) {
        allStyles.push(styleGroup.paragraphStyles[i]);
        allStylesNames.push(styleGroup.paragraphStyles[i].name);
    }
    
    for (var j = 0; j < styleGroup.paragraphStyleGroups.length; j++) {
        groupParagraphStyles = getAllParagraphStyles(styleGroup.paragraphStyleGroups[j]);
        allStyles = allStyles.concat(groupParagraphStyles[0]);
        allStylesNames = allStylesNames.concat(groupParagraphStyles[1]);
    }
    
    return [allStyles, allStylesNames];
}

function getAllObjectStyles(styleGroup) {
    var allStyles = [];
    var allStylesNames = [];

    for (var i = 0; i < styleGroup.objectStyles.length; i++) {
        allStyles.push(styleGroup.objectStyles[i]);
        allStylesNames.push(styleGroup.objectStyles[i].name);
    }
    
    for (var j = 0; j < styleGroup.objectStyleGroups.length; j++) {
        groupObjectStyles = getAllParagraphStyles(styleGroup.objectStyleGroups[j]);
        allStyles = allStyles.concat(groupObjectStyles[0]);
        allStylesNames = allStylesNames.concat(groupObjectStyles[1]);
    }
    
    return [allStyles, allStylesNames];
}

function applyParagraphStyleToTextFrame(textFrame, paragraphStyle) {
    try {
        if (!paragraphStyle.isValid) {
            alert("Paragraph style does not exist.");
            return;
        }
        textFrame.contents = "A";
        textFrame.paragraphs.everyItem().appliedParagraphStyle = paragraphStyle;
        textFrame.contents = "";
    } catch (e) {
        alert("An error occurred: " + e.message);
    }
}

function makeHorizontalTextFrame(targetStyle, targetLayer) {
    try {
        for (var i = 0; i < bookSize; i++) {
            var page = doc.pages[i];
            app.activeWindow.activePage = page;

            // avoid pass by reference
            var pageItemsOriginal = page.pageItems;
            var pageItems = [];
            for (var j = 0; j < pageItemsOriginal.length; j++) {
                pageItems.push(pageItemsOriginal[j]);
            }
    
            for (var j = 0; j < pageItems.length; j++) {
                var pageItem = pageItems[j];
                var pageElement = pageItem.getElements()[0];
                if (!pageItem.itemLayer.locked && !pageItem.locked && pageElement instanceof TextFrame) {
                    var bounds = pageItem.geometricBounds;
                    var height = bounds[2] - bounds[0];
                    var width = bounds[3] - bounds[1];

                    var heightDiff = ((height * heightRatio) - height) / 2;
                    var widthDiff = ((width * widthRatio) - width) / 2;

                    bounds[0] = bounds[0] - heightDiff;
                    bounds[2] = bounds[2] + heightDiff;
                    bounds[1] = bounds[1] - widthDiff;
                    bounds[3] = bounds[3] + widthDiff;

                    if (targetLayer.isValid) {
                        var textFrame = page.textFrames.add();
                        textFrame.geometricBounds = bounds;
                        textFrame.itemLayer = targetLayer;
                        applyParagraphStyleToTextFrame(textFrame, targetStyle);
                    }
                }
            }
        }
    } catch (err) {
        alert(err)
    }
}

function main() {
    var targetStyle = null;
    var targetLayer = null;

    w = new Window ("dialog", "Choose Paragraph Style and Layer", undefined, {closeButton: true});
    w.orientation = "row";
    w.alignChildren = ["right", "center"];

    w.add("statictext", undefined, "Make text frames with paragraph style");
    var paragraphStyles = getAllParagraphStyles(doc);
    var paragraphStylesNames = paragraphStyles[1];
    var paragraphStyles = paragraphStyles[0];
    paragraphStyle = w.add("dropdownlist", undefined, paragraphStylesNames);
    paragraphStyle.selection = 0;

    w.add("statictext", undefined, "to layer");
    moveToLayer = w.add("dropdownlist", undefined, app.activeDocument.layers.everyItem().name);
    moveToLayer.selection = 0;

    button = w.add ("button", [0,0,96,20], "OK", {name: "Ok"});

    button.onClick = function() {
        targetStyle = paragraphStyles[paragraphStyle.selection.index];
        targetLayer = doc.layers.item(moveToLayer.selection.text);
        exit();
    }
    w.show();

    if (targetStyle && targetLayer) {
        makeHorizontalTextFrame(targetStyle, targetLayer);
    }
}

main();