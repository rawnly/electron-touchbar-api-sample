'use strict';

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _touchbar = require('./libs/touchbar');

var _touchbar2 = _interopRequireDefault(_touchbar);

var _menu = require('./libs/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on('ready', function () {
	mainWindow(_touchbar2.default, _menu2.default);
});

function mainWindow() {
	var touchbar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var menu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var thisWindow = new _electron.BrowserWindow({
		width: 800,
		height: 800,
		resizable: true,
		titleBarStyle: "hiddenInset"
	});

	thisWindow.loadURL('file://' + _path2.default.join(__dirname, 'render', 'index.html'));

	if (touchbar) thisWindow.setTouchBar(touchbar);

	if (menu) _electron.Menu.setApplicationMenu(menu);

	return thisWindow;
}