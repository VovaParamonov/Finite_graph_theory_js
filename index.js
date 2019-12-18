// @flow

const { app, BrowserWindow } = require("electron");
const settings = require("./settings");

const selectedSettings = settings.default;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: selectedSettings.mainWindowBgColor
  });

  mainWindow.loadFile("index.html");

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

process.mainWindow = mainWindow;
