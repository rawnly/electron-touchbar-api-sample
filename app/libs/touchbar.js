'use strict';

var _electron = require('electron');

var TouchBarSpacer = _electron.TouchBar.TouchBarSpacer,
    TouchBarGroup = _electron.TouchBar.TouchBarGroup,
    TouchBarButton = _electron.TouchBar.TouchBarButton,
    TouchBarColorPicker = _electron.TouchBar.TouchBarColorPicker,
    TouchBarLabel = _electron.TouchBar.TouchBarLabel;


var activeColor = new TouchBarLabel({
	label: 'Active Color',
	backgroundColor: '#000'
});

var touchbar = new _electron.TouchBar([new TouchBarColorPicker({
	change: function change(color) {
		activeColor.label = 'Selected: ' + color.toString();
		activeColor.textColor = color.toString();
		_electron.BrowserWindow.getFocusedWindow().webContents.send('ready', { color: color });
	}
}), new TouchBarSpacer({ size: 'flexible' }), activeColor, new TouchBarSpacer({ size: 'flexible' }), new TouchBarGroup({
	label: 'Window',
	items: [new TouchBarButton({
		label: 'Quit',
		backgroundColor: '#FF3377',
		click: function click() {
			_electron.BrowserWindow.getFocusedWindow().close();
		}
	}), new TouchBarButton({
		label: 'Minimize',
		backgroundColor: '#FFcf11',
		click: function click() {
			_electron.BrowserWindow.getFocusedWindow().minimize();
		}
	}), new TouchBarButton({
		label: 'Full Screen',
		backgroundColor: '#33cf66',
		click: function click() {
			_electron.BrowserWindow.getFocusedWindow().maximize();
		}
	})]
})]);

module.exports = touchbar;