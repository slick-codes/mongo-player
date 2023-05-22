import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { createAudio } from './audio'


export const musicList = writable([])
export const progressState = writable({
  progressBar: 0,
  currentTime: "00:00",
  duration: "00:00"
})


if(browser)
	window.onkeydown = function(event){
		event.preventDefault()
		const { currentTime, duration }  = createAudio.audio

		if(event.code.toLowerCase() === 'space')
			document.querySelector(".play_button").click()
		else if (event.code.toLowerCase() === 'keym')
			document.querySelector('.icon').click()
		else if(event.code.toLowerCase() === 'pageup')
			document.querySelector('.next__audio').click()
		else if(event.code.toLowerCase() === 'pagedown')
			document.querySelector('.previous__audio').click()
		else if(event.code.toLowerCase() === "arrowdown" && createAudio.audio.volume >= 0 )
			createAudio.setVolume(createAudio.audio.volume - 0.1 < 0? 0 : createAudio.audio.volume - 0.1)
		else if(event.code.toLowerCase() === "arrowup")
			createAudio.setVolume(createAudio.audio.volume + 0.1 > 1? 1 : createAudio.audio.volume + 0.1)
		else if(event.code.toLowerCase() === "arrowleft" && event.shiftKey)
			createAudio.updateCurrentTime(currentTime - 10 < 0? 0 : currentTime  - 10)
		else if(event.code.toLowerCase() === "arrowleft")
			createAudio.updateCurrentTime(currentTime - 5 < 0? 0 : currentTime - 5)
		else if(event.code.toLowerCase() === "arrowright" && event.shiftKey)
			createAudio.updateCurrentTime(currentTime + 10 > duration? duration : currentTime + 10)
		else if(event.code.toLowerCase() === "arrowright")
			createAudio.updateCurrentTime(currentTime + 5 > duration? duration : currentTime + 5)

	}


export const trackData = writable({index: 0})
export const playState = writable({
    repeat: true,
    random: true,
    toggleRepeat(){
      playState.update(state => ({...state, repeat: !state.repeat }))
    },
    toggleRandom(){
      playState.update(state => ({...state, random: !state.random}))
    }
})

export const showPlayingAudio = function(){
	if(browser){
		const isPlaying = document.querySelector('.is_playing')
		console.log(isPlaying)
	}
}

export const loaderData = writable({ title: "", index: "", isShowing: false })
export const toBeRemoved = writable(null)
export const playlist = writable([])


if(browser){
	(function(){
	    // fetch all audio data
	      window.api.onFetchAudio( data =>{
	        createAudio.addPlaylist(data)
	        playlist.update(value => [...value, data])
	      })

	      // Check if audio/s have been added to directories
	      window.api.onAddAudio( data => {
	      	createAudio.playlist.unshift(data.file)
	      	playlist.update(value => [data.file, ...value])

	      	loaderData.set({
	      		title: `<strong style="background:green; padding:0px .5em; color:white;">Added</strong> ${data.file.filename} `,
	      		index: 1,
	      		isShowing: true
	      	})

			setTimeout(()=> loaderData.update( value => ({...value, isShowing: false})), 1500)

	      	
	      	if(createAudio.audio.src){
	      		createAudio.index += 1
	      		// update the playIndexArray to capture the previewly played audio
	      		createAudio.playedIndexArray = createAudio.playedIndexArray.filter( index => index < createAudio.playedIndexArray.length && index !== data.index )
	      		createAudio.playedIndexArray = createAudio.playedIndexArray.map( index => index + 1 )
	      	}


	        console.log(data.file.filename, "Added")
	      } )

	      // check if audios have been updated to directories
	      window.api.onUnlinkedAudio( data => {
	          // console.log("Deleted!", data)
	      	if(createAudio.index === data.index && createAudio.audio.src)
	      		return toBeRemoved.update(value => data)

	      	createAudio.playlist .forEach(audio => {
	      		if(audio.file !== data.filePath){
			      	loaderData.set({
			      		title: `<strong style="background:red; padding:0px .5em; color:white;">Deleted</strong> ${audio.filename}`,
			      		index: 1,
			      		isShowing: true
			      	})

					setTimeout(()=> loaderData.update( value => ({...value, isShowing: false})), 1500)
				}
	      	})

	      	createAudio.playlist = createAudio.playlist.filter( audio => audio.file !== data.filePath)
	      	playlist.update(value => value.filter(audio => audio.file !== data.filePath))


	      	// decreate the index of the current playling audio if item was deleted from the top
	      	if(createAudio.index > data.index && createAudio.audio.src){
	      		createAudio.index--
	      	}
	      	// update the playIndexArray to capture the previewly played audio
	      	createAudio.playedIndexArray = createAudio.playedIndexArray.filter( index => index < createAudio.playedIndexArray.length && index !== data.index )
	      	createAudio.playedIndexArray = createAudio.playedIndexArray.map( index => index < data.index? index - 1 : index )

	      	console.log("file removed!")
	      })
	})()
}




export function formatTimestampToDate(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000); // Convert milliseconds to seconds
  const minutesDiff = Math.floor(secondsDiff / 60); // Convert seconds to minutes
  const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
  const daysDiff = Math.floor(hoursDiff / 24); // Convert hours to days
  const weeksDiff = Math.floor(daysDiff / 7); // Convert days to weeks
  const monthsDiff = Math.floor(daysDiff / 30); // Approximate months (considering 30 days per month)
  const yearsDiff = Math.floor(daysDiff / 365); // Approximate years (considering 365 days per year)

  if (minutesDiff <= 0) {
    return 'Just now';
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
  } else if (daysDiff === 1) {
    return 'Yesterday';
  } else if (daysDiff < 7) {
    return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
  } else if (weeksDiff < 4) {
    return `${weeksDiff} week${weeksDiff === 1 ? '' : 's'} ago`;
  } else if (monthsDiff < 12) {
    return `${monthsDiff} month${monthsDiff === 1 ? '' : 's'} ago`;
  } else if (yearsDiff >= 1) {
    const formattedDate = targetDate.toISOString().split('T')[0];
    return formattedDate;
  }

  return "Unknown";
}



export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
