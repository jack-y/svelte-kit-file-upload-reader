import nodeAdapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: nodeAdapter(),
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
    },
};

export default config;
