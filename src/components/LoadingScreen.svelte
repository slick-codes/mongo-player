
<script>
	import { browser } from '$app/environment'
	import { Loader } from './icons/index'

	let loaderData = {
		title: "",
		index: "",
		isShowing: false
	}
	let timeout = null

	if(browser)
		window.api.onAudioLoading( function(data){
			clearTimeout(timeout)
			loaderData.index = data.index 
			loaderData.title = data.audio.title ?? data.audio.filename
			loaderData.isShowing = true

			timeout = setTimeout(()=> loaderData.isShowing = false, 500)
		} )
</script>

{#if loaderData.isShowing }
	<div class="container" >
		<div class="loading">
			<Loader /> 
			( {loaderData.index} ) 
		</div>
		<div class="output">{ loaderData.title } </div>
	</div>
{/if}

<style lang="scss">
	.container{
		position:absolute;
		bottom:0;
		height:2em;
		width: 100%;
		max-width:50vw;
		overflow:hidden;
		font-size:.7rem;
/*		font-weight:bold;*/
		white-space:nowrap;
		display:flex;
		align-items:center;
		padding-left: 4em;
		padding-bottom:.5em;
		color:#4b4b4b;

		.loading{
			display:flex;
			align-items:center;
			padding-right:.6em;
		}
	}
</style>