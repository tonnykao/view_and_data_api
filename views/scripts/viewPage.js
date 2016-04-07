var flag = false;

function loadDocument(viewer, documentId) {
    // Find the first 3d geometry and load that.
    Autodesk.Viewing.Document.load(
        documentId, function(doc) {
            var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
                doc.getRootItem(),
                { 'type' : 'geometry', 'role' : '3d' },
                true
            );
            if (geometryItems.length > 0) {
                viewer.load(doc.getViewablePath(geometryItems[0]));
                viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
                    if(!flag){
                        flag = true;
                        setTimeout(function() {
                            viewer.load(doc.getViewablePath(geometryItems[1]));
                        }, 100);
                    }
                });
            }
        },
        function(errorMsg) { // onErrorCallback
            alert("Load Error: " + errorMsg);
        }
    );
}

function loadOffline(viewer, documentId){
    viewer.load(documentId);
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
        if(!flag){
            flag = true;
            setTimeout(function() {
                viewer.load('./testbuilding/Resource/3D___/2F/2F.svf');
            }, 100);
        }
    });
}

function initialize(getToken){
    var options = {
        //'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6b3B1c3RlY2hfdGVtcC9yYWNfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0',
        'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6b3B1c3RlY2hfdGVtcC8lRTYlOTUlQjQlRTYlQTMlOUYucnZ0',
        'env':'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken
    };
    
    var offlineOptions = {
        document: './testbuilding/Resource/3D___/1F/1F.svf',
        env: 'Local'
    };
    var viewerElement = document.getElementById('viewer');
    //var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement, {});
    Autodesk.Viewing.Initializer(offlineOptions,function() {
        viewer.initialize();
        //loadDocument(viewer, options.document);
        loadOffline(viewer, offlineOptions.document);
        viewer.canvas.addEventListener('click', function(event) {
            window.lastClickPos = event;
        });
    });
    window.viewer = viewer;
}
