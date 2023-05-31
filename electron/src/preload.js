/* eslint-disable */
const { contextBridge, ipcRenderer } = require('electron')
const NodeID3 = require('node-id3')
// const {getAudio, directories} = require('./utils.js')




contextBridge.exposeInMainWorld("api", {
    appName: "mongo-player",
    getMetaData: (metaData) => (metaData.map(value => ({ path: value, ...NodeID3.read(value) }))),
    // 
    onFetchAudio: (callback) => {
        // tell the main file to fetch the audios
        ipcRenderer.send("fetch-all-audios")
        // interact with the main file response
        ipcRenderer.on("audio-array", (event, arg) => { callback(arg) })
    },
    //
    onAudioLoading: callback => {
        ipcRenderer.on("audio-read", (event, arg) => { callback(arg) })
    },
    onAddAudio: callback => { ipcRenderer.on("dir-add-audio", (event, arg) => callback(arg)) },
    onUnlinkedAudio: callback => { ipcRenderer.on("dir-delete-audio", (event, arg) => callback(arg)) },
    onChangeAudio: callback => { ipcRenderer.on("dir-change-audio", (event, arg) => callback(arg)) }
})

