<script lang="ts">
	import '../app.postcss';
	import '../app.postcss';
	import { browser } from '$app/environment';

	let about: string = '';
	let title: string = '';

	if (browser) {
		title = window.api.appName;
	}
</script>

<svelte:head>
	<meta name="description" content={about} />
	<title>{title}</title>
	<!-- <meta http-equiv="Content-Security-Policy" content="default-src 'none'" /> -->
	<!-- <meta property="og:title" content="Paul Ezekiel-Hart Portfolio" />
	<meta property="og:description" content={about} />
	<meta property="og:image" content="/images/avatar.png" /> -->
</svelte:head>
<main>
	<slot />
</main>

<style global lang="scss">
	@import url('../assets/scss/main.scss');
</style>
