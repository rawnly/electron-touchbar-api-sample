// Require electron
const electron = require('electron');
const { BrowserWindow, app } = electron;

// Require the touchbar from the `touchbar.js` file
const touchbar = require('./touchbar');

// Let's define a new empty window
let mainWindow;

// Once app is ready
app.on('ready', function() {

	// "Fill" the window
	mainWindow = new BrowserWindow({
		width: 800,
		heihgt: 800,
		resizable: false,
		fullscreenable: false
	})

	// Set the touchbar
	mainWindow.setTouchBar(touchbar);

	// Load the render process
	mainWindow.loadURL('file://' + __dirname + '/index.html')
})

// If all windows are all closed
app.on('window-all-closed', () => {

	// Kill the process if the platform is not "macOS / OSX"
	if (process.platform !== 'darwin') {
		app.quit();
	}

})