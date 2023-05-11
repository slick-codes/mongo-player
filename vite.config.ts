import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: []
	},
	optimizeDeps: {
		include: []
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', "electron/src/*.{js,ts}"]
	}
};

export default config;
