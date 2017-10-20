import {BrowserWindow, TouchBar} from 'electron';
const {TouchBarSpacer, TouchBarGroup, TouchBarButton, TouchBarColorPicker, TouchBarLabel} = TouchBar;

let activeColor = new TouchBarLabel({
	label: 'Active Color',
	backgroundColor: '#000'
});

let touchbar = new TouchBar([
	new TouchBarColorPicker({
		change(color) {
			activeColor.label = 'Selected: ' + color.toString();
			activeColor.textColor = color.toString();
			BrowserWindow.getFocusedWindow().webContents.send('ready', {color});
		}
	}),
	new TouchBarSpacer({size: 'flexible'}),
	activeColor,
	new TouchBarSpacer({size: 'flexible'}),
	new TouchBarGroup({
		label: 'Window',
		items: [
			new TouchBarButton({
				label: 'Quit',
				backgroundColor: '#FF3377',
				click() {
					BrowserWindow.getFocusedWindow().close();
				}
			}),
			new TouchBarButton({
				label: 'Minimize',
				backgroundColor: '#FFcf11',
				click() {
					BrowserWindow.getFocusedWindow().minimize();
				}
			}),
			new TouchBarButton({
				label: 'Full Screen',
				backgroundColor: '#33cf66',
				click() {
					BrowserWindow.getFocusedWindow().maximize();
				}
			})
		]
	})
]);

module.exports = touchbar;