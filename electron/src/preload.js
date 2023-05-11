const { contextBridge, ipcRenderer } = require('electron')
const NodeID3 = require('node-id3')
const {getAudio, directories} = require('./utils.js')




contextBridge.exposeInMainWorld("api", {
    appName: "Mongo Player",
    getMetaData: (metaData) => (metaData.map(value => ({ path: value, ...NodeID3.read(value) }))),
    onFetchAudio: (callback) => {
        ipcRenderer.send("fetch-audios") // tell the main file to fetch the audios
        ipcRenderer.on("audio-array", (event, arg)=> { // interact with the main file response
            callback(arg)
        })
    },
})


