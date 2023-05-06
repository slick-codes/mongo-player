import { writable } from 'svelte/store'

export const isMenuOpen = writable(false)
export const isDarkMode = writable(true)



export const themeToggler = function () {
    // const rootElement: Element = document.querySelector(':root')

    isDarkMode.update(state => {
        return state = !state
    })
}

export const toggleMenu = function () {
    isMenuOpen.update(state => state = !state)
    console.log("click")
}


