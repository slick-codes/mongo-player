<script lang="ts">
	import { isDarkMode } from './../store/main';
	import '../app.postcss';
	import '../app.postcss';
	let darkmode: boolean;
</script>

<svelte:head>
	<title>Paul Ezekiel-Hart Portfolio Website</title>
	<!-- <meta name="theme-color" content={darkmode ? '#191627' : '#eeeeee'} />
	<meta name="description" content={about} />

	<meta property="og:title" content="Paul Ezekiel-Hart Portfolio" />
	<meta property="og:description" content={about} />
	<meta property="og:image" content="/images/avatar.png" /> -->
</svelte:head>
<main>
	<slot />
</main>

<style global lang="scss">
	@import url("../assets/scss/main.scss")
</style>
