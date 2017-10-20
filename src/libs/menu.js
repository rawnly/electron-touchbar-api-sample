import {app, Menu, BrowserWindow} from 'electron';
import is from 'electron-is';
import isDev from 'electron-is-dev';

const template = [
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'}
		]
	},
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{ 
				label: 'DevTools',
				enabled: isDev,
				click() {
					BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
				}
			},
			{type: 'separator'},
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'}
		]
	},
	{
		role: 'window',
		submenu: [
			{role: 'minimize'},
			{role: 'close'}
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'GitHub',
				click () { require('electron').shell.openExternal('https://github.com/rawnly/electron-touchbar-example'); }
			}, {
				label: 'Someone sad "issues"?',
				click () { require('electron').shell.openExternal('https://github.com/rawnly/electron-touchbar-example/issues'); }
			}, {type: 'separator'}, {
				label: 'Author\'s website',
				click () { require('electron').shell.openExternal('https://federicovitale.me'); }
			}
		]
	}
];

if ( is.macOS() ) {
	template.unshift({
		label: app.getName(),
		submenu: [
			{role: 'about'},
			{type: 'separator'},
			{role: 'services', submenu: []},
			{type: 'separator'},
			{role: 'hide'},
			{role: 'hideothers'},
			{role: 'unhide'},
			{type: 'separator'},
			{role: 'quit'}
		]
	});

	// Edit menu
	template[1].submenu.push(
		{type: 'separator'},
		{
			label: 'Speech',
			submenu: [
				{role: 'startspeaking'},
				{role: 'stopspeaking'}
			]
		}
	);

	// Window menu
	template[3].submenu = [
		{role: 'close'},
		{role: 'minimize'},
		{role: 'zoom'},
		{type: 'separator'},
		{role: 'front'}
	];
}

let menu = Menu.buildFromTemplate(template);

module.exports = menu;