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
		// padding-right:3em;
		// background:purple;
	}
</style>
