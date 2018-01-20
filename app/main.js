// Require electron
const electron = require('electron');
const {
	BrowserWindow,
	app
} = electron;

// Require the touchbar from the `touchbar.js` file
const touchbar = require('./touchbar');

// Let's define a new empty window
let mainWindow;

// Ready function
function ready() {

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
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// On close destroy the window
	mainWindow.on('close', () => {
		mainWindow = null;
	})
};

// Once app is ready
app.on('ready', ready)

// If all windows are all closed
app.on('window-all-closed', () => {
	// Kill the process if the platform is not "macOS / OSX"
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	const windows = BrowserWindow.getAllWindows().length;
	if (windows === 0) ready()
})