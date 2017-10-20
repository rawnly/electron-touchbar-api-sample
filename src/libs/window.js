import {BrowserWindow} from 'electron';

class Window {
	__construct(url = false, local = false) {
		if (url) 
			if (!local) {
				this.url = url;
			} else {
				this.url = 'file://' + __dirname + url;
			}
	}

	generate(settings = {width: 1200, height: 800, titleBarStyle: 'hiddenInset'}) {
		if (!settings) 
			throw new Error('No window settings');

		this.window = new BrowserWindow(settings);
		
		return this.window;
	}

	url() {
		return this.url;
	}

	setTouchBar(touchbar) {
		this.window.setTouchBar(touchbar);
		return;
	}

	destroy() {
		if (this.window) {
			this.window = null;
			return true;
		}

		return false;
	}
}

module.exports = Window;