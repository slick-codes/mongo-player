const { contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')
const NodeID3 = require('node-id3')
const url = require('url')



const directories = [
    path.join(os.homedir(), "Music"),
    // path.join(os.homedir(), "Documents"),
    path.join(os.homedir(), "Downloads"),
    path.join(os.homedir(), "Desktop")
]


const acceptedFileType = [".mp3", ".ogg", ".wav"]

let mp3Files = [];

const getAudio = async function (directories) {
    //

    directories.forEach(directory => {
        fs.readdirSync(directory).forEach(async file => {
            const filePath = path.join(directory, file)
            const fileExt = path.extname(file)
            let fileStat = fs.statSync(filePath)

            if (fileStat.isDirectory()) {
                const result = await getAudio([filePath])
                mp3Files = [...mp3Files, ...result]
            }

            if (fileStat.isFile() && acceptedFileType.includes(fileExt)) {
                let filename = filePath.split('/')[filePath.split('/').length - 1].split('.')

                mp3Files.push({
                    file: filePath,
                    ext: filename.pop(),
                    filename: filename.join(),
                    ...NodeID3.read(filePath)
                })
            }
        })
    })

    return mp3Files
}




contextBridge.exposeInMainWorld("api", {
    getAudio: () => getAudio(directories),
    appName: "mongo player",
    getMetaData: (metaData) => (metaData.map(value => ({ path: value, ...NodeID3.read(value) })))
})



