<script lang="ts">
	import {  progressState } from '../store/main';
	import { createAudio } from '../store/audio';
	import { Pause , Play, Previous, Next} from './icons/index'

	let progress: any = {};

	progressState.subscribe((value) => {
		progress = value;
	});

	function togglePlay(){
		// if(createAudio.playlist.length ){
		// 	return
		// }
			if(createAudio.index === undefined)
				createAudio.playTrack(0)

			createAudio.togglePlay()
	}
</script>

<div class="controller">
	<div class="controller__content">
		<div class="controller__button_container" >
			<div class="shuffle"></div>
			<div class="control">
				<div class="button previous" on:click={ () => createAudio.previous() }>
					<Previous />
				</div>
				<div class="button previous" on:click={ togglePlay }>
					 {#if progress.isPlaying}
						<Pause />
					 {:else}
					 	<Play />
					 {/if}
					</div>
				<div class="button previous" on:click={ () => createAudio.next()}>
					<Next />
				</div>
			</div>
			<div class="volume"></div>
		</div>
		<div class="controller__progresssbar-container">
			<div class="controller__bar">
				<div class="progressbar">
					<div class="progressbar__container">
						<div style={`width:${progress.progressBar}%`} />
					</div>
				</div>
			</div>
			<div class="timestamp__container">
				<div>{progress.currentTime}</div>
				<div>{progress.duration}</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import './../assets/scss/config';

	:global(svg){
		color:white;
		width:1.5rem;
	}

	:global(.button:last-child svg, .button:first-child svg){
		width:1.1em;
		color:#8ba1c1;
	}

	.controller {
		height: 10em;
		padding: $side-padding;
		padding-top: 0;

		.controller__button_container{
			display:flex;
			justify-content:space-between;
			align-items:center;

			.shuffle{
				background:blue;
			}

			.control{
				display:flex;
				width:10em;
				justify-content:space-between;

				.button{
					cursor:pointer;
					$size: 2.5em;
					display:flex;
					justify-content:center;
					align-items:center;
					background: #1f2631;
					height:$size;
					font-size:1rem;
					color:white;
					width:$size;
					border-radius:4em;

					&:first-child, &:last-child{
						background:transparent;

					}

				}
			}

			.volume{
				background:purple;
			}
		}

		&__content {
			// background:red;
			height: 100%;
		}

		.controller__button_container {
			padding-top: 1em;
			padding-bottom:.3em;
		}

		.controller__bar {
			.progressbar {
				height:1.5em;
				display:flex;
				justify-content:center;
				align-items:center;
				flex-flow:column;

				&:hover {
					> div{
						height:.4em;
					}
				}

				.progressbar__container{
				width: 100%;
				height: 0.1em;
				background: rgba(255, 255, 255, 0.175);
				overflow: hidden;
				border-radius: 4em;
				transition: transform 0.3s;
				transition: height .3s;


				> div {
					background: rgb(219, 219, 219);
					height: 3em;
					width: 0em;
				}
			}
		}
		}

		.timestamp__container {
			display: flex;
			justify-content: space-between;
			color: white;
			font-size: 0.9rem;
		}
	}
</style>
