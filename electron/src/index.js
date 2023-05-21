/* eslint-disable */
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const methods = require('./methods')


// disable file access restriction
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('disable-web-security');

app.whenReady().then(function () {

    const window = new BrowserWindow({
        backgroundColor: "#0f141e",
        width: 900,
        height: 600,
        minWidth: 900,
        sandbox: false,
        minHeight: 600,
        show: false,
        transparent: true,
        // frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            webSecurity: false, //prevent file access restriction
            sandbox: false,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            contextIsolation: true
        },
    })


    // this is only for development purpose
    window.on("ready-to-show", window.show)

    if (process.env.DEVELOPMENT) {
        window.setPosition(1618, 180)
        // window.setFullScreen(true);
        window.loadURL("http://localhost:5173")
        window.webContents.openDevTools()
    } else {
        window.loadFile(path.join(__dirname, "../../build/index.html"))
    }


    methods(window)

})
