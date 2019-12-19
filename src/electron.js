// @flow
const remote = require("electron").remote;
const { BrowserWindow } = remote;
const settings = require("../settings");

const selectedSettings = settings.default;

let allWindows = BrowserWindow.getAllWindows();

class Window {
  // The path must be absolute
  constructor(options, htmlPath) {
    options = Object.assign(
      {
        backgroundColor: selectedSettings.defaultWindowBgColor,
        show: false,
        modal: true,
        frame: false,
        parent: allWindows[0],
        webPreferences: {
          nodeIntegration: true
        }
      },
      options
    );

    this.window = new BrowserWindow(options);

    this.window.loadFile(htmlPath);

    allWindows.push(this.window);

    // this.window.webContents.openDevTools();

    this.window.once("ready-to-show", () => {
      this.window.show();
    });

    this.window.on("close", () => {
      allWindows = allWindows.filter(w => w !== this.window);
    });
  }
}

module.exports = { Window, allWindows };
