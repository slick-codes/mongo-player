<script lang="ts">
	import { browser } from '$app/environment';
    import audios from './../store/audio.json';
    // console.log(audios)

    
    async function getAudioData(){
        if( browser ){
            const audio = await window.api.getAudio()
            return audio
        }
    }

    // Promise.resolve(getAudioData()).then(console.log)
    
</script>

<div class="container__audiolist">
</div>

<style lang="scss">

</style>