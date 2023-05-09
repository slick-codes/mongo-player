<script lang="ts">
	import RightPanel from './RightPanel.svelte';
	import SideBar from './../components/SideBar.svelte';
</script>

<div class="top-content">
	<SideBar />
	<RightPanel />
</div>

<style lang="scss">
	.top-content {
		height: calc(100% - 10em);
		display: flex;
	}
</style>
