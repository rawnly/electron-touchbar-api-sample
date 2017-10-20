const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;


let app = new Vue({
	el: '#root',
	data: {
		color: 'Pick a color',
		style: 'background-color: #000000'
	},

	methods: {
		setStyle() {
			this.style = "background-color: " + this.color;
		}
	}
});


ipc.on('ready', (info, data) => {
	app.style = 'background-color: ' + data.color;
	app.color = data.color;
});