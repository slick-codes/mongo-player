<script lang="ts">
	import {  progressState } from '../store/main';
	import { createAudio } from '../store/audio';
	import { Pause , Play, Previous,VolumeUp,VolumeOff, Next, RandomIcon, ArrowRepeatOnce, ArrowRepeat} from './icons/index'
	import { trackData, playState } from './../store/main'



	let track;
	trackData.subscribe(value => track = value)

	let playType;
	playState.subscribe(value => playType = value)

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

	function progressBar(event){
			const audioDuration = createAudio.audio.duration
			const elemWidth = event.target.offsetWidth
			const calculatedTime = event.offsetX / elemWidth * audioDuration
			createAudio.updateCurrentTime(calculatedTime)
	}



	function updateProgressBar(e){
		     progressBar(e)
		e.target.onmousedown = function(e){
			e.target.onmousemove = progressBar
		}
		e.target.onmouseup = function(e){
			e.target.onmousemove = null
			// e.target.onmousedown = null
		}
		e.target.onmouseout = function(e){
			e.target.onmousemove = null
			// e.target.onmousedown = null
		}
	}

	const updateVol = function(event){
		const offsetX = event.offsetX
		const elemWidth = event.target.offsetWidth

		let volume = (offsetX) / (elemWidth) * 100
		// update volume with this value

		if(volume > 100)
			volume = 100
		else if(volume < 0)
			volume = 0

		createAudio.setVolume( (volume * .1) * .1)
	}
	function updateVolume(e){
		updateVol(e)
		e.target.onmousedown = function(e){
			e.target.onmousemove = updateVol
		}

		e.target.onmouseup = function(e){
			e.target.onmousemove = null
			// e.target.onmousedown = null
		}
		e.target.onmouseout = function(e){
			e.target.onmousemove = null
			// e.target.onmousedown = null
		}
	}

	function random(){
		console.log(playType)
	}

	let isAudioMuted:boolean = true

	function toggleVolumeState(event){
		isAudioMuted = createAudio.audio.volume === 0
		 createAudio.setVolume(!isAudioMuted? 0 : 1)			 
	}
</script>

<div class="controller">
	<div class="controller__content">
		<div class="controller__button_container" >
			<div class="shuffle">
				<div class="shuffle__container">
				<div class="shffle__button">
					<div 
						on:click={() => playType.toggleRandom()}
						on:keydown={null}
						class:active={ playType.random }
					>
						<RandomIcon />
					</div>
				</div>
				<div class="repeat__button">
					<div on:click={ () => playType.toggleRepeat()} on:keydown={null}>
						{#if !playType.repeat}
							<ArrowRepeat />
						{:else}
						    <ArrowRepeatOnce />
						{/if}
					</div>
				</div>
				</div>
			</div>
			<div class="control">
				<div class="button previous" on:click={ () => createAudio.previous() } on:keydown={null}>
					<Previous />
				</div>
				<div class="button previous" on:click={ togglePlay }  on:keydown={null} >
					 {#if progress.isPlaying}
						<Pause />
					 {:else}
					 	<Play />
					 {/if}
					</div>
				<div class="button previous" on:click={ () => createAudio.next()} on:keydown={null}>
					<Next />
				</div>
			</div>
			<div class="volume">
				<div class="content">
					<div class="icon" on:click={ toggleVolumeState } on:keydown={null}>
					 {#if isAudioMuted <= 0}
					 	<VolumeOff />
					 {:else}
						<VolumeUp />
					{/if}
					</div>
				<div on:mousedown={ updateVolume }>
					<div class="volume__container">
						<div class="volume__bar" 
						style={`width:${track.volume * 100 }%`}></div>
					</div>
				</div>
					
				</div>
			</div>
		</div>
		<div class="controller__progresssbar-container">
			<div class="controller__bar" on:mousedown={ updateProgressBar }>
				<div class="progressbar" >
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
		padding: $side-padding calc($side-padding + 1em);
		padding-bottom:0;
		padding-top: 0;
		z-index: 22;
		position:relative;

		.controller__button_container{
			display:flex;
			justify-content:space-between;
			align-items:center;

			.shuffle{
				display:flex;
				align-items:center;
				justify-content:center;
				font-size:1em;
				position:relative;

				> div{
					display:flex;
					align-items:center;
					justify-content:center;
					position:absolute;
					left:0;

					> div{
						padding: .2em;
						display:inherit;
						align-items:inherit;
						justify-content:inherit;
						height:1.5em;
						cursor:pointer;
						left: 0;
					}

					&:first-child{
						padding-right:.3em;
					}

					&:last-child{
						padding-left:.3em;
					}
				}

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
				padding:1em 0;
				position:relative;
				display:flex;
				align-items:center;
				justify-content:center;

				.content{
					display:flex;
					align-items:center;
					justify-content:center;
					position: absolute;
					right:-10px;
					cursor:pointer;

				.icon{
					display:flex;
					align-items:center;
					justify-self: center;
					padding:0;
				}

					> div:last-child{
						padding:.5em 10px;

						&:hover .volume__container{
							height: .5em;
						}
					}
				}

				&__container{
					right:0;
					background:#1f2631;
					width:7em;
					border-radius:59em;
					display:flex;
					flex-flow:column;
					justify-self: center;
					cursor:pointer;
					pointer-events:none;
				}

				&__bar{
					background:#a3a3a3;
					padding:.1em 0;
					// width:50%;
					height:inherit;
					border-radius:59em;
					pointer-events:none;
				}
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
			cursor:pointer;
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
				pointer-events:none;
				cursor:pointer;


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
