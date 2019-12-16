const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Создаем окно браузера.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // и загрузить index.html приложения.
  win.loadFile("index.html");

  win.webContents.openDevTools();

  win.on("closed", () => {
    // Разбирает объект окна, обычно вы можете хранить окна
    // в массиве, если ваше приложение поддерживает несколько окон в это время,
    // тогда вы должны удалить соответствующий элемент.
    win = null;
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
