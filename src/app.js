import path from 'path';
import {app, Menu, BrowserWindow} from 'electron';
import touchbar from './libs/touchbar';
import menu from './libs/menu';

app.on('ready', () => {
	mainWindow(touchbar, menu);
});

function mainWindow(touchbar = false, menu = false) {
	let thisWindow = new BrowserWindow({
		width: 800,
		height: 800,
		resizable: true,
		titleBarStyle: "hiddenInset"
	});

	thisWindow.loadURL('file://' + path.join(__dirname, 'render', 'index.html'));
	
	if (touchbar) 
		thisWindow.setTouchBar(touchbar);

	if (menu)
		Menu.setApplicationMenu(menu);

	return thisWindow;
}