var webdriver = require('selenium-webdriver')
,	fs = require('fs')
,	os = require('os')
,	path = require('path')
,   program = require('commander')
,   async = require('async')
,   coffeescript = require('coffee-script')
,   toc = require(__dirname + '/../../visual-test/toc')
,   mkdirp = require('mkdirp')
,   ScreenShooter = require('./ScreenShooter')

program
  .version('0.0.0')
  .option('-u, --url [url]', 			'URL of the visual test folder')
  .option('-w, --wait [milliseconds]',  'Number of milliseconds to wait for the test to run before taking a screenshot.')
  .parse(process.argv);


program.url = program.url || 'http://localhost:3000/visual-tests';

var shooter = new ScreenShooter({
	script : ScreenShooter.removeGooStuffScript,
	wait :   program.wait || 0
});

shooter.on("shoot",function(evt){
	console.log('Took a screenshot!');
	console.log('    URL:  ' + evt.url);
	console.log('    Path: ' + evt.path+'\n');
})

// Get all visual test files
toc.getFiles(function(err,files){
	if(err) throw err;

	var screenshotsPath = path.join(__dirname,'screenshots');

	var urlToPathMap = {};
	for(var i=0; i<files.length; i++){
		var file = files[i];
		file = file.replace('visual-test/','');
		basename = path.basename(file);
		dirname = path.dirname(file);
		var pngPath = path.join(screenshotsPath,dirname,basename.replace("html","png"));

		var url = program.url+"/"+file;
		urlToPathMap[url] = pngPath;
	}

	shooter.takeScreenshots(urlToPathMap, function(err){
		if(err) throw err;
		shooter.shutdown();
	});
});