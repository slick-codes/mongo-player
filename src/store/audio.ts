import { progressState,trackData, formatTimestamp } from './main'
import { browser } from '$app/environment'



class CreateAudio {
  constructor() {
    this.playlist = [];
    // this.index = 0;

    if (browser)
      this.audio = new Audio();
  }

  addPlaylist(playlist) {
    this.playlist = playlist
  }

  pushToPlaylist(track){
    this.playlist.push(track)
  }

  pause(){
    if(this.audio.paused) return;
    this.audio.pause()

            progressState.update(value => {
          return {
            ...value,
            isPlaying: false
          }
        })

  }

  togglePlay(){
      if(this.audio.paused){
              this.audio.play()
                       progressState.update(value => {
                return {
                  ...value,
                  isPlaying: true
                }
              })
      }
      else 
        this.pause()
  }

  previous(){
     if(!this.playlist.length) return 


       const { currentTime, duration } = this.audio
       const progress = (currentTime / duration) * 100

       if(progress < 5)
        this.playTrack(this.index - 1)
      else if(this.index === 0)
        this.playTrack(this.index)
      else 
        this.audio.currentTime = 0
      
  }

  next(){
    if(!this.playlist.length) return 
      this.playTrack(this.index + 1)
  }

  play(){
    this.audio.oncanplay = (event) => {
      event.target.play()
    let playing = this.playlist[this.index]

     trackData.update( value => ({...value, ...playing}))
     progressState.update(value => {
        return {
          ...value,
          isPlaying: true
        }
      })


      this.audio.onended = (event) => {
        // this will handles the shuffling, repeat and circle repeat when it's complete 
        console.log('audio ended')
        this.playTrack(this.index + 1)


      }

      this.audio.ontimeupdate = function (event: Event) {
        const { currentTime, duration } = event.target

        progressState.update(value => {
          return {
            ...value,
            progressBar: (currentTime / (duration ?? 0) ) * 100,
            currentTime: formatTimestamp(currentTime),
            duration: formatTimestamp( duration || 0 ) 
          }
        })

      }
    }
  }

  playTrack(index) {
    let playing = this.playlist[index]
    this.audio.src = playing.file;

    this.index = index
    this.play()
  }
}

export const createAudio = new CreateAudio()
