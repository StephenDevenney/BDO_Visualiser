// // Electron
const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
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
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// // Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var Security = require('./source/routes/securityController');
// var Combat = require('./source/routes/combatController');
// var Shared = require('./source/routes/sharedController');
var appExpress = express();
const cors = require('cors');
appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: false }));
appExpress.use(cookieParser());

var corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

appExpress.use(cors(corsOptions))

// Default
appExpress.get('/', function(req, res) {
  res.send("API listening for requests.");
});

// Routes
// app.use('/visualiser/security/', Security);
// app.use('/visualiser/combat/', Combat);
// app.use('/visualiser/shared/', Shared);

module.exports = appExpress;