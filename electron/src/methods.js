const { ipcMain, remote } = require("electron")
const path = require("path")
const os = require("os")
const NodeID3 = require("node-id3")
const { exec } = require('child_process')
const fs = require('fs')
const getMp3Duration = require('get-mp3-duration')
const chokidar = require('chokidar')



module.exports = function (window) {

    const methods = {
        // acceptable directories
        directories: [
            path.join(os.homedir(), "Music"),
            // path.join(os.homedir(), "Documents"),
            path.join(os.homedir(), "Downloads"),
            path.join(os.homedir(), "Desktop")
        ],
        // list of acceptable audio files
        acceptedFileType: [".mp3", ".ogg", ".wav"],
        // convert Binary to URL string
        createUrlFromBinary(binaryData, mimeType) {
            const base64Data = Buffer.from(binaryData, 'binary').toString('base64');
            const dataUrl = `data:${mimeType};base64,${base64Data}`;
            return dataUrl;
        },
        // get  Duration using the FFprobe command line application
        getAudioDurationwithFFprobe({ filePath, buffer }) {
            return new Promise((resolve, reject) => {
                const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        // console.log(buffer)
                        resolve(getMp3Duration(buffer));
                        // reject(error);
                        // Handle the error condition
                    } else {
                        const duration = parseFloat(stdout);
                        // Handle the duration value
                        resolve(duration);
                    }
                });
            });
        },
        // create Audio Object
        async createAudioObject({ filePath, fileExt, fileStat, buffer }) {
            const duration = await this.getAudioDurationwithFFprobe({ filePath, buffer })
            let filename = filePath.split('/')[filePath.split('/').length - 1].split('.')
            filename.pop()
            filename = filename.join(".")
            const { year, title, image, genre, album, artist } = NodeID3.read(buffer)

            // manage image
            // let defaultImage = '/2a392148d9f25cb269d39cebcb271179.jpg'
            let defaultImage;
            if (image?.imageBuffer !== undefined) {
                defaultImage = this.createUrlFromBinary(image.imageBuffer, image.mime)
            }

            let defaultValue = "Unknown"

            return {
                file: `file://${filePath}`,
                ext: filename,
                filename: filename,
                year: year ?? defaultValue,
                title: title,
                genre: genre ?? defaultValue,
                album: album ?? filename,
                artist: artist ?? defaultValue,
                image: defaultImage,
                duration: duration,
                birthtime: fileStat.birthtime
            }
        },
        playlist: [],

        async scanForAudio(event) {
            let index = 0;
            const fetchAudio = async (directories) => {
                let arrayOfAudio = [];

                for (let directory of directories) {
                    const files = await fs.promises.readdir(directory)
                    // add files to this.playlist

                    for (let file of files) {
                        const filePath = path.join(directory, file)
                        const fileExt = path.extname(file)
                        const fileStat = await fs.promises.stat(filePath)

                        if (fileStat.isDirectory()) {
                            await fetchAudio([filePath])
                        }

                        if (fileStat.isFile() && this.acceptedFileType.includes(fileExt)) {
                            this.playlist = [...this.playlist, filePath]
                            const buffer = await fs.promises.readFile(filePath)

                            const audioObject = await this.createAudioObject({
                                filePath, fileExt, fileStat, buffer
                            })
                            index++
                            // send the index to be logged on the UI
                            window.webContents.send("audio-read", { index, audio: audioObject })
                            // ssend audio to preloader
                            event.reply("audio-array", audioObject)
                        }

                    }
                }

            }
            await fetchAudio(this.directories)
        },
        scanPcForAudio() {

        },
        async waitForFolderChanges(event, directories) {

            const watcher = chokidar.watch(directories, {
                ignored: /\.(?!mp3$|wav$|flac$|ogg$)[^.]+$/i,
                persistent: true,
                ignoreInitial: true
            })

            watcher.on("add", async (filePath) => {
                // this is going to send newly added

                let fileStat = await fs.promises.stat(filePath)
                let fileExt = path.extname(filePath)
                let buffer = await fs.promises.readFile(filePath)

                const file = await this.createAudioObject({ filePath, fileStat, fileExt, buffer })
                event.reply("dir-add-audio", { filePath: `file://${filePath}`, file, action: "add", index: 0 })

                this.playlist.unshift(filePath)
                console.log(file.filename, "added!")
            })

            watcher.on("change", (filePath) => {
                console.log("file just changed")
            })

            watcher.on("unlink", (filePath) => {

                event.reply("dir-delete-audio", {
                    filePath: `file://${filePath}`,
                    file: null,
                    index: this.playlist.indexOf(filePath),
                    action: "deleted"
                })
                this.playlist = this.playlist.filter(path => path !== filePath)
            })

            watcher.on("error", (error) => {
                console.log(error)
            })


        }
    }



    ipcMain.on("fetch-all-audios", fetchAllAudios)

    async function fetchAllAudios(event, arg) {
        await methods.scanForAudio(event)
        await methods.waitForFolderChanges(event, methods.directories)
        // remove this event once it has been used
        // ipcMain.removeListener("fetch-all-audios", () => console.log('ended'))
    }
}