<script>
	import TopContent from './../components/TopContent.svelte';
	import Controller from './../components/Controller.svelte';


</script>

<div class="parents-container">
    <TopContent />
    <Controller />
</div>

<style lang="scss">
    .parents-container{
        width: 100%;
        display:flex;
        flex-flow:column;
        height:100%;
    }
</style>