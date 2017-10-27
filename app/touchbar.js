// Require the 'TouchBar' module from electron
const { app, TouchBar, BrowserWindow } = require('electron');

// Require all the types of touchbar inputs (group, picker, slide, button, label etc..)
const { TouchBarButton, TouchBarGroup, TouchBarColorPicker, TouchBarSpacer, TouchBarLabel, TouchBarPopover, TouchBarSegmentedControl, TouchBarScrubber, TouchBarSlider } = TouchBar;

// Shorthand for spacer
let spacer = (size = 'flexible') => {
	return new TouchBarSpacer({size});
}

// Generate a new touchbar object
const touchbar = new TouchBar([
	new TouchBarLabel({
		label: app.getName(),
		textColor: '#FFF'
	}),
	spacer(),
	new TouchBarGroup({
		items: [new TouchBarButton({
			label: "Restore defaults.",
			// You can also define an action with click() method
			click() {
				let mainWindow = BrowserWindow.getFocusedWindow();
				mainWindow.webContents.send('restore');
			}
		}),
		new TouchBarPopover({
			label: "Options",
			items: new TouchBar([
				spacer(),
				new TouchBarSlider({
					label: 'Slider',
					value: 36,
					maxValue: 50,
					minValue: 18,
					// on change value
					change: (newValue) => {
						let mainWindow = BrowserWindow.getFocusedWindow();
						mainWindow.webContents.send('slider',  newValue);
					}
				}),
				new TouchBarScrubber({
					// A scrubber object is like the default emoji scrubber on macOS
					select: (selectedIndex) => {
						// Called when the user taps any item
						// `selectedIndex` - The index of the item the user touched
						let items = [
							'first',
							'second',
							'third',
							'fourth'						
						];
	
						let mainWindow = BrowserWindow.getFocusedWindow();
						mainWindow.webContents.send('pressed', 'You have selected ' + items[selectedIndex] + ' scrubber item');			
					},
					overlayStyle: 'outline',
					items: [{
						label: '0'
					}, {
						label: '1'
					}, {
						label: '2'
					}, {
						label: '3'
					}]
				})
			])
		}),
		new TouchBarColorPicker({
			change: (color) => {
				let mainWindow = BrowserWindow.getFocusedWindow();
				mainWindow.webContents.send('color', color)
			}
		})]
	}),
	spacer(),
	new TouchBarSegmentedControl({
		mode: 'single',
		segments: [{
			label: 'ON'
		}, {
			label: 'OFF'
		}],
		change(index, isSelected) {
			let mainWindow = BrowserWindow.getFocusedWindow();
			mainWindow.webContents.send('segment', {index, isSelected});
		}
	}),
	spacer()
]);

module.exports = touchbar;