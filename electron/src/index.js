const { app, BrowserWindow } = require('electron')
const path = require('path')

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
            sandbox: false,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            contextIsolation: true
        },
    })


    // this is only for development purpose
    window.setPosition(1618, 180)
    window.on("ready-to-show", window.show)

    window.loadURL("http://localhost:5173")

})