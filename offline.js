var config = require('./config-view-and-data');
var Lmv = require('view-and-data');
var lmv = new Lmv(config);
var urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6b3B1c3RlY2hfdGVtcC8lRTYlOTUlQjQlRTYlQTMlOUYucnZ0';
var localPth = 'download/整棟';

function onError(error) {
  done(error);
}

function onInitialized(response) {

  // downloads package to target directory,
  // creates recursively if not exists
  lmv.download(urn, localPth).then(
    onDataDownloaded,
    onError
  );
}

function onDataDownloaded(items) {

  console.log('Model downloaded successfully');

  var path3d = items.filter(function(item){
    return item.type === '3d';
  });

  console.log('3D Viewable path:');
  console.log(path3d);

  var path2d = items.filter(function(item){
    return item.type === '2d';
  });

  console.log('2D Viewable path:');
  console.log(path2d);
}

//start the test
lmv.initialize().then(onInitialized, onError);