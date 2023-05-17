
<script>
	import { browser } from '$app/environment'

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
		<div class="loading">( {loaderData.index} ) .</div>
		<div class="output">{ loaderData.title } </div>
	</div>
{/if}

<style>
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
	}
</style>