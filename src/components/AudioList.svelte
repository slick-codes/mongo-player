<script lang="ts">
	import { browser } from '$app/environment';
	// console.log(audios)

	async function getAudioData() {
		if (browser) {
			const audio = await window.api.getAudio();
			return audio;
		}
	}

	// Promise.resolve(getAudioData()).then(console.log)
</script>

<div class="container__audiolist" />

<style lang="scss">
</style>
