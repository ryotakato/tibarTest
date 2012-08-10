var simulator = {
    classType: "ZBarReaderController", // ZBarReaderViewController, ZBarReaderController
    sourceType: "Album", // Library(C), Camera(VC), Album(C)
    cameraMode: "Default", // Default, Sampling, Sequence
    config:{
        "showsCameraControls":true, // (VC)
        "showsZBarControls":true,
        "tracksSymbols":true, // the tracking rectangle that highlights barcodes
        "enableCache":true,
        "showsHelpOnFail":true,
        "takesPicture":false
    },
    custom:{ // not implemented yet
        "scanCrop":'',
        "CFG_X_DENSITY":'',
        "CFG_Y_DENSITY":'',
        "continuous":''
    },
    symbol:{
        "QR-Code":true,
        "CODE-128":false,
        "CODE-39":false,
        "I25":false,
        "DataBar":false,
        "DataBar-Exp":false,
        "EAN-13":false,
        "EAN-8":false,
        "UPC-A":false,
        "UPC-E":false,
        "ISBN-13":false,
        "ISBN-10":false,
        "PDF417":false
    }
};

var real = {
            classType: "ZBarReaderViewController",
            sourceType: "Camera",
            cameraMode: "Default", // Default, Sampling, Sequence
            config:{
                "showsCameraControls":true, // (VC)
                "showsZBarControls":true,
                "tracksSymbols":true, // the tracking rectangle that highlights barcodes
                "enableCache":true,
                "showsHelpOnFail":true,
                "takesPicture":false
            },
       };


var win = Titanium.UI.createWindow({
    title:'TiBar Test App',
    backgroundColor:'#fff'
});
 
var TiBar = require('tibar');
var label = Titanium.UI.createLabel({
    text:'TiBar App',
    textAlign:'center',
    width:'auto'
});
 
var realButton = Ti.UI.createButton({
    title: "Scan barcode at real",
    height:50,
    width:250,
    bottom:100
});

var simulatorButton = Ti.UI.createButton({
    title: "Scan barcode at simulator",
    height:50,
    width:250,
    bottom:20
});

var makeScan = function(config){

return function(){
    TiBar.scan({
        configure: config,
 
        success:function(data){
            Ti.API.info('TiBar success callback!');
            if(data && data.barcode){
                Ti.UI.createAlertDialog({
                    title: "Scan result",
                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
                }).show();
            }
        },
        cancel:function(){
            Ti.API.info('TiBar cancel callback!');
        },
        error:function(){
            Ti.API.info('TiBar error callback!');
        }
    });
}
}


realButton.addEventListener('click', makeScan(real));
simulatorButton.addEventListener('click', makeScan(simulator));
win.add(label);
win.add(realButton);
win.add(simulatorButton);
 
win.open();