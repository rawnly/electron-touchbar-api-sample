import {BrowserWindow, TouchBar} from 'electron';
import isDev from 'electron-is-dev';

const {TouchBarSpacer, TouchBarGroup, TouchBarButton, TouchBarColorPicker, TouchBarLabel} = TouchBar;

// separate it for manipulation in ColorPicker@change
let activeColor = new TouchBarLabel({
	label: '<-- Select a color to start.',
	textColor: '#fff'
});

let env = new TouchBarButton({
	label: 'ENVIROMENT: ' + isDev ? 'development' : 'production',
	backgroundColor: isDev ? '#5a00ff' : '#00c4ff'
});

let activeSpace = new TouchBarSpacer({size: 'flexible'});

// create a new touchbar object
let touchbar = new TouchBar([
	new TouchBarColorPicker({
		change(color) {
			activeColor.label = color.toString();
			activeColor.textColor = color.toString();
			activeSpace.size = 'flexible';
			console.log(activeSpace.size);

			BrowserWindow.getFocusedWindow().webContents.send('color-input', {color});
		}
	}),
	activeSpace,
	activeColor,
	new TouchBarSpacer({size: 'flexible'}),
	new TouchBarGroup({
		label: 'Window',
		items: [
			// Some gimmicks
			env,
			new TouchBarButton({
				label: 'Minimize',
				backgroundColor: '#FFcf11',
				click() {
					BrowserWindow.getFocusedWindow().minimize();
				}
			}),
			new TouchBarButton({
				label: 'Quit',
				backgroundColor: '#FF3377',
				click() {
					BrowserWindow.getFocusedWindow().close();
				}
			})
		]
	})
]);

module.exports = touchbar;