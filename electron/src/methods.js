const { ipcMain, remote } = require("electron")
const path = require("path")
const os = require("os")
const NodeID3 = require("node-id3")
const { exec } = require('child_process')
const fs = require('fs') 
const getMp3Duration = require('get-mp3-duration')



module.exports = function(window){


    const methods =  {
            // acceptable directories
            directories: [
                path.join(os.homedir(), "Music"),
                // path.join(os.homedir(), "Documents"),
                // path.join(os.homedir(), "Downloads"),
                // path.join(os.homedir(), "Desktop")
            ],
            // list of acceptable audio files
            acceptedFileType: [".mp3", ".ogg", ".wav"],
            // convert Binary to URL string
            createUrlFromBinary(binaryData, mimeType){
              const base64Data = Buffer.from(binaryData, 'binary').toString('base64');
              const dataUrl = `data:${mimeType};base64,${base64Data}`;
              return dataUrl;
            },
            getAudioDurationwithFFprobe({filePath, buffer}){
                 return new Promise((resolve, reject) => {
                    const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;
                        exec(command, (error, stdout, stderr) => {
                              if (error) {
                                // console.log(buffer)
                                resolve( getMp3Duration(buffer) );
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
            createAudioObject({filePath, fileExt, fileStat, buffer}){
                const duration =  this.getAudioDurationwithFFprobe({filePath, buffer})
                 let filename = filePath.split('/')[filePath.split('/').length - 1].split('.')
                 filename.pop()
                 filename = filename.join(".")
                const { year, title, image, genre, album, artist } = NodeID3.read(buffer)
                
                // manage image
                // let defaultImage = '/2a392148d9f25cb269d39cebcb271179.jpg'
                let defaultImage;
                if(image?.imageBuffer !== undefined){
                    defaultImage = this.createUrlFromBinary(image.imageBuffer, image.mime)
                }

                let defaultValue = "Unknown"

                return {
                    file: `file://${filePath}`,
                    ext: filename,
                    filename: filename,
                    year: year ?? defaultValue, 
                    title: title , 
                    genre: genre ?? defaultValue, 
                    album: album?? filename , 
                    artist: artist ?? defaultValue,
                    image: defaultImage,
                    duration: duration,
                    birthtime: fileStat.birthtime
                }
            },

            scanForAudio(){
                let index = 0;
                const fetchAudio = (directories) => {
                    let arrayOfAudio = [];

                    for( let directory of directories){
                        fs.readdirSync(directory).forEach(  file => {
                            const filePath = path.join(directory, file)
                            const fileExt = path.extname(file)
                            const fileStat = fs.statSync(filePath)

                            if(fileStat.isDirectory()){
                                arrayOfAudio = [...arrayOfAudio, ...fetchAudio([filePath])]
                            }

                            if(fileStat.isFile() && this.acceptedFileType.includes(fileExt)){
                                const buffer = fs.readFileSync(filePath)    
                                const audioObject =  this.createAudioObject({
                                    filePath, fileExt,fileStat, buffer
                                })
                                index++
                                window.webContents.send("audio-read", {index}) 
                                arrayOfAudio.push(audioObject)
                            }
                        })
                    }
                    return arrayOfAudio
                }           

                const result = fetchAudio(this.directories)
                return result
            },
            scanPcForAudio(){

            }
        }

        
    ipcMain.on("fetch-all-audios", fetchAllAudios )

    function fetchAllAudios(event, arg){
        const audios = methods.scanForAudio()

        Promise.all(audios.map(obj => obj.duration))
        .then((resolvedDurations) => {
            const newAudios = audios.map((obj, index) => ({...obj, duration: resolvedDurations[index]}))
            event.reply("audio-array", newAudios)
            ipcMain.removeListener("fetch-all-audios", () => console.log('ended'))
        })
    }

        // remove event listener
    }
