'use strict';
// // Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let waitBeforeClose = true;
let mainWindow
const devMode = /electron/.test(path.basename(app.getPath('exe'), '.exe'));

if (devMode) {
	// Set appname and userData to indicate development environment
	app.name = app.name + '-dev';
	app.setPath('userData', app.getPath('userData') + '-dev');

	// Temporary fix for Electron 'reload' issue
	app.allowRendererProcessReuse = false;

	// Setup reload
	require('electron-reload')(path.join(__dirname, 'dist'), {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	});
}

let createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		show: false,
    width: 1200,
    height: 800,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		}
	});
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	});

	// mainWindow.maximize();

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

	// Open the DevTools.
	if (devMode && process.argv.indexOf('--noDevTools') === -1) {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});

// function createWindow () {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   })

//   mainWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, `/dist/index.html`),
//       protocol: "file:",
//       slashes: true
//     })
//   );
//   // Open the DevTools.
//   mainWindow.webContents.openDevTools()

//   mainWindow.on('closed', function () {
//     mainWindow = null
//   });
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// });

// app.on('activate', function () {
//   if (mainWindow === null) createWindow()
// });