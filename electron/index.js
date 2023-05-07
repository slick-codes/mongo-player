const { app, BrowserWindow } = require('electron')
const path = require('path')

app.whenReady().then(function () {

    const window = new BrowserWindow({
        backgroundColor: "#0f141e",
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        transparent: true,
        // frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // window.webContents.openDevTools()
    window.setMaximumSize(900, 700)
    // window.loadFile(path.join(__dirname, "./../build/index.html"))
    window.loadURL("http://localhost:5173")
})