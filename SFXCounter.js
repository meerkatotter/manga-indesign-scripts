// Adjustable parameters
var sfxLayerName = "SFX"

var sfxLayer = app.activeDocument.layers.itemByName(sfxLayerName);
var myCount = sfxLayer.pageItems.length;
alert(myCount);