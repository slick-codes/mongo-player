<script lang="ts">
	import { browser } from '$app/environment';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import FolderSearchOutline from 'svelte-material-icons/FolderSearchOutline.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';

	const playlist = ['Pure Fire!', 'Fire Base', 'Soul'];

	let isPlaylistOpen: boolean = true;
	let isLibraryOpen: boolean = true;

	const browseFile = function (event: Event) {
		// create input element
		const fileInput: HTMLElement = document.createElement('input');
		// @ts-ignore
		fileInput.type = 'file';
		// @ts-ignore
		fileInput.accept = 'audio/*';
		// @ts-ignore
		fileInput.multiple = 'multiple';
		// accepte folder
		// fileInput.webkitdirectory = 'true';

		// trigger a click on the input element
		fileInput.click();
		fileInput.oninput = function (event: Event) {
			// @ts-ignore
			const fileObj: any[] = event.target.files;
			const fileList: any[] = [];
			let index: number = 0;

			for (let file of Object.values(fileObj)) fileList.push(file);

			if (browser) {
				const musics = fileList.map((value) => value.path);
				const value = window.api.getMetaData(musics);
				console.log(value);
			}
		};
	};

	const toggleDropdown = function (event: Event) {
		// @ts-ignore
		const dropdown = event.target.parentElement.querySelector('.dropdown-content');
		// @ts-ignore
		const dataName = event.target.getAttribute('data-name');
		const elements = dropdown.querySelectorAll('li');

		if (dataName === 'playlist') isPlaylistOpen = !isPlaylistOpen;
		else if (dataName === 'library') isLibraryOpen = !isLibraryOpen;
	};
</script>

<div class="menu">
	<div class="content">
		<li class="title" on:click={browseFile} on:keydown={null}>
			<FolderSearchOutline /> <span>Browse</span>
		</li>
		<div class="library dropdown">
			<li class="title" data-name="library" on:click={toggleDropdown} on:keydown={null}>
				<span>Library</span>
				<i class:rotateChevron={isLibraryOpen}><ChevronRight /></i>
			</li>
			<div class="library-content dropdown-content" class:hide={!isLibraryOpen}>
				<li>All Music</li>
				<li>Artist</li>
				<li>Genere</li>
				<li>Year</li>
			</div>
		</div>
		<div class="menu__playlists dropdown">
			<li class="title" data-name="playlist" on:click={toggleDropdown} on:keydown={null}>
				<span>Playlists</span> <i class:rotateChevron={isPlaylistOpen}><ChevronRight /></i>
			</li>
			<div class="playlist-content dropdown-content" class:hide={!isPlaylistOpen}>
				{#each playlist as item}
					<li>{item}</li>
				{/each}
			</div>
		</div>

		<!-- <li class="title">
			<Plus /> <span>New Playlist</span>
		</li> -->
	</div>
</div>

<style lang="scss">
	@import './../assets/scss/config';

	:global(.menu li svg) {
		font-size: 1.3em;
		transform: rotate(4em);
		position: relative;
		color: rgb(73, 73, 73) !important;
	}
	.menu {
		padding: $side-padding;
		padding-right: $side-padding;
		width: 17em;

		.content > .title > span {
			padding: 0px 0.4em;
		}

		li {
			display: flex;
			font-size: 0.9rem;
			font-weight: bolder;
			line-height: 1.9em;
			cursor: pointer;
			align-items: center;
			// color: rgb(167, 167, 167);
			color: white;
			// transition: 1s;
			transform-origin: left;

			.rotateChevron {
				transform: rotate(90deg);
			}

			i {
				transition: 0.3s;
			}

			&.scaleout {
				// transform: scale(0);
				color: blue;
			}

			> * {
				pointer-events: none;
			}

			// &:not(.title){
			//     font-size:1rem;
			// }
		}

		.dropdown {
			padding-top: 0.5em;
			color: white;
		}

		.title {
			font-size: 1.1rem;
			font-weight: bolder;

			// &:last-child{
			//     margin-top:1em;
			//     padding:.4em;
			//     display:none;
			//     background:gray;
			//     border-radius:5em;
			//     display:flex;
			// }
			span {
				font-weight: bolder;
				color: rgb(73, 73, 73) !important;
			}
		}
	}
</style>
