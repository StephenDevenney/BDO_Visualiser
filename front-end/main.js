// // Electron
const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");
// const SQLite = require("better-sqlite3");
// const dbPath = app.getPath('userData') + "\\Local Storage";
// console.log(dbPath);
// const dbFile = path.resolve(dbPath, 'bdo-visualiser.sqlite');
// const db = new SQLite(dbFile); 

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

// exports.DB = db;