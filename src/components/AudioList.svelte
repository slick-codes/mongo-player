<script lang="ts">
	import { browser } from '$app/environment';
	import { playlist, musicList, formatTimestamp, formatTimestampToDate } from './../store/main';
	import { createAudio } from './../store/audio';


	let audios: any[] = [];
	playlist.subscribe(value => audios = value)

	function playMusic(event: Event, obj) {
		createAudio.playTrack(obj.index);
	}

</script>

<div class="audiolist">
	<div class="audiolist__container">
		<div class="audio">
			<div class="main__title">
				<div class="audio__content title">
					<div>Title</div>
					<div>Artist</div>
					<div>Album</div>
					<div>Added</div>
					<div>Duration</div>
				</div>
			</div>

			<div class="main__audio">
				<div class="element">
					{#each audios as audio, index}
						<div
							class="audio__content" 
							on:click={(event) => playMusic(event, { ...audio, index: index })}
							on:keydown={null}
						>
							<div>{audio.title ?? audio.filename}</div>
							<div>{audio.artist ?? 'Unknown'}</div>
							<div>{audio.album ?? 'Unknown'}</div>
							<div>{ formatTimestampToDate(audio.birthtime) ?? "Unknown"}</div>
								<div>{formatTimestamp(audio.duration)}</div>
						</div>
					{/each}
					<!-- {/await} -->
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import './../assets/scss/config';
	.audiolist {
		// margin-top: -2em;
		text-align: left;
		height: 100%;
		position: relative;

		&__container {
			height: 100%;
		}

		.audio {
			// margin-top: -3em;
			position: relative;
			height: 100%;
			display: flex;
			flex-flow: column;

			&:before{
				content:"";
				width:100%;
				background:blue;
				padding:1em 0;
				position:absolute;
				z-index:4;
				bottom:0;background: rgb(15,20,30);
background: linear-gradient(0deg, rgba(15,20,30,1) 0%, rgba(15,20,30,0.7) 100%);
			}

			&__content {
				display: flex;
				color: white;
				justify-content: space-between;
				text-align: left;
				border-radius: 0.3em;
				white-space: nowrap;
				padding: 0.5em 0.7em;

				&.playing{
					background:blue !important;
				}

				&:not(.title) {
					cursor: pointer;
				}

				&:not(.title):hover {
					background: #1f2631;
				}

				> div {
					width: 100%;
					overflow: hidden;
					margin-right: 1em;
					font-size: 0.8rem;

					&:last-child {
						width: 35%;
					}
				}
			}

			.title {
				padding-bottom: 1em;
				position: sticky;

				> div {
					width: 100%;
					font-weight: bolder;
					font-size: 0.8rem;
					text-align: left;

					&:last-child {
						width: 35%;
					}
				}
			}

			.main__audio {
				overflow-y: auto;
				position: relative;
				height: calc(100%);
				// position: absolute;
				// height: max-content;
				// background: blue;

				& .element {
					padding-left: 1em;
					padding-right: 0.4em;
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
				}
			}
			.main__title {
				padding-left: 1.1em;
				position: relative;
				padding-right: 0.4em;
			}
		}
	}
</style>
