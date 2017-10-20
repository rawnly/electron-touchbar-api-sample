const path = require('path');
const join = path.join;

let folders = {
	dest: './app',
	source: './src'
};

let files = {
	main: {
		dest: folders.dest,
		source: join(folders.source, 'app.js')
	},
	libs: {
		dest: join(folders.dest, 'libs'),
		source: join(folders.source, 'libs/**/*.js')
	},
	sass: {
		dest: join(folders.dest, 'render/css'),
		source: join(folders.source, 'render/sass/**/*.scss'),		
	},
	js: {
		dest: join(folders.dest, 'render/js'),
		source: join(folders.source, 'render/js/**/*.js')
	},
	html: {
		dest: join(folders.dest, 'render'),
		source: join(folders.source, 'render/*.html')
	}
};

module.exports = files;