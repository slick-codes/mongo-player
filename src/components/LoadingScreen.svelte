
<script>
	import { browser } from '$app/environment'
	import { Loader } from './icons/index'
	import { loaderData } from './../store/main'

	let loaderObj;
	loaderData.subscribe(value => loaderObj = value)

	let timeout = null

	if(browser)
		window.api.onAudioLoading( function(data){
			clearTimeout(timeout)
			loaderData.update( value => {
				return {
					index: data.index,
					title: data.audio.title ?? data.audio.filename,
					isShowing: true
				}
			} )

			timeout = setTimeout(()=> loaderData.update( value => ({...value, isShowing: false})), 1500)
		} )

</script>

{#if loaderObj.isShowing }
	<div class="container" >
		<div class="loading">
			<Loader /> 
			( {loaderObj.index} ) 
		</div>
		<div class="output">{ @html loaderObj.title } </div>
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