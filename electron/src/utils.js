const fs = require('fs')
const path = require('path')
const os = require('os')
const NodeID3 = require('node-id3')
const url = require('url')
const getMP3Duration = require('get-mp3-duration')
const { exec } = require('child_process')
const { ipcMain} = require('electron')


function createUrlFromBinary(binaryData, mimeType) {
  const base64Data = Buffer.from(binaryData, 'binary').toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64Data}`;
  return dataUrl;
}



const directories = [
    path.join(os.homedir(), "Music"),
    // path.join(os.homedir(), "Documents"),
    path.join(os.homedir(), "Downloads"),
    path.join(os.homedir(), "Desktop")
] 


const acceptedFileType = [".mp3", ".ogg", ".wav"]


function getAudioDuration(filePath) {
    const result = new Promise((resolve, reject) => {
        const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            const duration = parseFloat(stdout);
            resolve(duration);
        });
    });

    return result
}



const getAudio = function (callback) {

    const fetchAudioFromDirectories =   function(directories){
        directories.forEach(directory => {
            fs.readdirSync(directory).forEach( async  file => {
                const filePath = path.join(directory, file)
                const fileExt = path.extname(file)
                let fileStat = fs.statSync(filePath)

                if (fileStat.isDirectory()) {
                    return fetchAudioFromDirectories([filePath])
                }

                if (fileStat.isFile() && acceptedFileType.includes(fileExt)) {
                    let filename = filePath.split('/')[filePath.split('/').length - 1].split('.')
                    // const buffer = fs.readFileSync(filePath)

                    const duration = await getAudioDuration(`file://${filePath}`)
                    const {year, title, image, genre, album, artist} = NodeID3.read(filePath)
                    
                    let imageString = '/2a392148d9f25cb269d39cebcb271179.jpg';
                    if(image?.imageBuffer !== undefined){
                        imageString = createUrlFromBinary(image?.imageBuffer, image?.mime)
                    }

                    const obj = {
                        file: `file://${filePath}`,
                        ext: filename.pop(),
                        filename: filename.join(),
                        year, title, genre, album, artist,
                        image: imageString,
                        duration: duration,
                        birthtime: fileStat.birthtime
                    }

                    callback(obj)                    
                }
            })
        })
    }

    fetchAudioFromDirectories(directories)
}

module.exports.getAudio = getAudio


