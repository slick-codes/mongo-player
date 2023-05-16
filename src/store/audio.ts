import { progressState,trackData, playState, formatTimestamp } from './main'
import { browser } from '$app/environment'

// console.log(trackData)


class CreateAudio {
  constructor() {
    this.playlist = [];
    this.playedIndexArray = []
    // this.index = 0;

    if (browser)
      this.audio = new Audio();

  }

  addPlaylist(playlist) {
    this.playlist = playlist
  }

  setVolume(volume){
    this.audio.volume = volume
    trackData.update(value => ({...value, volume: volume}))
  }

  updateCurrentTime(time){    
    this.audio.currentTime = time
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
        let playBehavior;
        playState.subscribe(value => playBehavior = value)

       const { currentTime, duration } = this.audio
       // const progress = (currentTime / duration) * 100

       if(currentTime < 10 && playBehavior.random){
        this.nextPlay = this.index
        const randNumb = this.randomIndex()
        let newIndex = this.playedIndexArray.pop()
        this.playTrack(newIndex ?? randNumb)
        return
       }

      if(currentTime < 10 && this.index !== 0 && !playState.random){
        this.playTrack(this.index - 1)

      }else if(this.index === 0)
        this.playTrack(this.index)
      else 
        this.audio.currentTime = 0

        console.log("index", this.index)
      
  }

  next(){
    if(!this.playlist.length) return 
        let playBehavior;
        playState.subscribe(value => playBehavior = value)


      if(playBehavior.random){
        const randomIndex = () => {
         const result =  Math.floor(Math.random() * this.playlist.length)
         if( this.playedIndexArray.includes(result) )
            return randomIndex()

          return result
        }

        if(this.playedIndexArray.length > 1) 
          this.playedIndexArray.shift()

        this.playedIndexArray.push(this.index)

        const randNum = this.randomIndex()

        if(this.nextPlay){
          this.playTrack(this.nextPlay)
          this.nextPlay = undefined
          return
        }else
          this.playTrack(randNum)

      
      }else{
        console.log(this.index , this.playlist.length)
        this.playTrack(this.index >= this.playlist.length -1? 0 : this.index + 1)
      }
      // this.playTrack(this.index + 1)
      this.nextPlay = undefined
  }

  randomIndex = () => {
     const result =  Math.floor(Math.random() * this.playlist.length)
     if( this.playedIndexArray.includes(result) )
        return this.randomIndex()

      console.log(this.playedIndexArray , result)
      return result
  }

  play(){
    this.audio.oncanplay = (event) => {
      event.target.play()
    let playing = this.playlist[this.index]

     trackData.update( value => ({...value, ...playing, volume: this.audio.volume, index: this.index}))
     progressState.update(value => {
        return {
          ...value,
          isPlaying: true
        }
      })


      this.audio.onended = (event) => {
        // this will handles the shuffling, repeat and circle repeat when it's complete 
            if(!this.playlist.length) return 
        let playBehavior;
        playState.subscribe(value => playBehavior = value)

        if(playBehavior.repeat){
          this.repeat()
        }
        else{
        this.next()
      }
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

  repeat(){
    this.audio.src = this.playlist[this.index].file
    this.audio.currentTime = 0
    this.play()
  }
}

export const createAudio = new CreateAudio()
