import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { createAudio } from './audio'


export const musicList = writable([])
export const progressState = writable({
  progressBar: 0,
  currentTime: "00:00",
  duration: "00:00"
})

export const trackData = writable({})


export let playlist = writable([])

// fetch audio from 
export  const getAudioData = async function() {
    if (browser) {
      window.api.onFetchAudio( function(data){
          createAudio.pushToPlaylist(data)
          playlist.update(value => ([...value, data]))
          console.log(data)
      })
    }
}

getAudioData()




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
