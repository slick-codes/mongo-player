<script lang="ts">
	import { isDarkMode } from './../store/main';
	import '../app.postcss';
	import '../app.postcss';
	let darkmode: boolean;

	isDarkMode.subscribe((value: boolean) => (darkmode = value));
	let about = ` Hello, my name is Paul Ezekiel-Hart and I am an experienced MEVN stack developer, Brand Identity, and Product Designer with ${
		new Date().getFullYear() - 2018 + 1
	} years of working experience, as a freelancer and a Software Engineer at Technoville. I am open to freelancing, remote jobs, and collaboration.`;
</script>

<svelte:head>
	<title>Paul Ezekiel-Hart Portfolio Website</title>
	<meta name="theme-color" content={darkmode ? '#191627' : '#eeeeee'} />
	<meta name="description" content={about} />

	<meta property="og:title" content="Paul Ezekiel-Hart Portfolio" />
	<meta property="og:description" content={about} />
	<meta property="og:image" content="/images/avatar.png" />
</svelte:head>
<main>
	<slot />
</main>

<style global lang="scss">
</style>
