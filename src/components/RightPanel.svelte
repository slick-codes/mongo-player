<script lang="ts">
	import PreviewPanel from './PreviewPanel.svelte';
	import AudioList from './AudioList.svelte';
</script>

<div class="rightpanel">
	<PreviewPanel />
	<AudioList />
</div>

<style lang="scss">
	.rightpanel {
		padding-top: 0em;
		width: 100%;
		// height: 100%;
		position: relative;
		top: 0;
		left: 0;
		// background: red;
		// overflow: hidden;
		display: flex;
		flex-flow: column;
		// justify-content: center;
		// align-items: center;
		// padding-right:3em;
		// background:purple;
	}
</style>
