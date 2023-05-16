<script lang="ts">
	import { browser } from '$app/environment';
	import { playlist, musicList, formatTimestamp, formatTimestampToDate } from './../store/main';
	import { createAudio } from './../store/audio';
	import { trackData } from './../store/main'


	let audios: any[] = [];
	playlist.subscribe(value => audios = value)

	let track;
	trackData.subscribe(value => track = value)

	function playMusic(event: Event, obj) {
		createAudio.playTrack(obj.index);
	}

</script>

<div class="audiolist">
	<div class="audiolist__container">
		<div class="audio">
			<div class="shadow" />
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
							class:is_playing={track.index === index}
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
		padding: 0px 1em;

		&__container {
			height: 100%;
		}

		.audio {
			// margin-top: -3em;
			position: relative;
			height: 100%;
			display: flex;
			flex-flow: column;
			overflow:hidden;
			justify-content:center;

			& .shadow{
				content:"";
				width:100%;
				margin: 0 auto;
				justify-self: center;
				padding:1em 0;
				position:absolute;
				bottom:-3em;
				display:flex;
				align-items:center;
				justify-content:center;

				&:before{
					content:"";
					width:90%;
					z-index: 4;
	   				box-shadow:0px -20px 110px 56px #0f141e;
				}
			}

			&__content {
				display: flex;
				color: white;
				justify-content: center;
				align-items:center;
				text-align: left;
				border-radius: 0.3em;
				white-space: nowrap;
				padding: 0.5em 0.7em;
				padding-top:.6em;
				border: dotted 1px transparent;



				&.is_playing{
					border: dotted 1px #a3a3a3;
					font-weight:bolder;
					color:white;
					background:linear-gradient(0deg, rgb(6 1 27 / 62%) 4%, rgba(15, 20, 30, 0.4458158263) 100%);
				}

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
				padding-top:1em;

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
