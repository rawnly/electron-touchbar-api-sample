const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;


let app = new Vue({
	el: '#root',
	data: {
		color: 'Pick a color',
		style: 'background-color: #292944'
	}
});


ipc.on('color-input', (info, data) => {
	app.style = 'background-color: ' + data.color;
	app.color = data.color;
});