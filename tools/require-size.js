/**
 * Computes the size of the require headers.
 * Useful for figuring out the overhead of require definitions.
 * Useless since the minifier does not use require in any way.
 */

var glob = require('glob');
var fs = require('fs');

glob('src/**/*.js', null, function (er, files) {
	var regex = /define(.|\n)*?{/;
	var sum = 0;

	files.forEach(function (file) {
		if (file.indexOf('goo.js') > -1) { return; }
		if (file.indexOf('pack') > -1) { return; }

		var source = fs.readFileSync(file, 'utf8');
		var match = source.match(regex);

		sum += match[0].length;
	});

	console.log(sum);
});