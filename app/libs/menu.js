'use strict';

var _electron = require('electron');

var _electronIs = require('electron-is');

var _electronIs2 = _interopRequireDefault(_electronIs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = [{
	label: 'Edit',
	submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'pasteandmatchstyle' }, { role: 'delete' }, { role: 'selectall' }]
}, {
	label: 'View',
	submenu: [{ role: 'reload' }, { role: 'forcereload' }, { role: 'toggledevtools' }, { type: 'separator' }, { role: 'resetzoom' }, { role: 'zoomin' }, { role: 'zoomout' }, { type: 'separator' }, { role: 'togglefullscreen' }]
}, {
	role: 'window',
	submenu: [{ role: 'minimize' }, { role: 'close' }, {
		label: 'DevTools',
		enabled: !_electronIs2.default.dev(),
		click: function click() {
			_electron.BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
		}
	}]
}, {
	role: 'help',
	submenu: [{
		label: 'Learn More',
		click: function click() {
			require('electron').shell.openExternal('https://electron.atom.io');
		}
	}]
}];

if (_electronIs2.default.macOS()) {
	template.unshift({
		label: _electron.app.getName(),
		submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'services', submenu: [] }, { type: 'separator' }, { role: 'hide' }, { role: 'hideothers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
	});

	// Edit menu
	template[1].submenu.push({ type: 'separator' }, {
		label: 'Speech',
		submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
	});

	// Window menu
	template[3].submenu = [{ role: 'close' }, { role: 'minimize' }, { role: 'zoom' }, { type: 'separator' }, { role: 'front' }];
}

var menu = _electron.Menu.buildFromTemplate(template);

module.exports = menu;