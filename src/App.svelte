<script>
	import { onMount } from 'svelte';
	import { mortgageBase, alternatives } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';

	onMount(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches)
			window.document.body.classList.toggle('dark-mode');
	})

	$: mortgage = getMortgage($mortgageBase);
</script>

<main class="with-sidebar">
	<div class="sidebar">
		<div class="sticky">
			<MortgageBase bind:mortgageBase={$mortgageBase} />
			<MortgageCost {mortgage} />
		</div>
	</div>
	<div class="not-sidebar">
		<Alternatives bind:alternatives={$alternatives} {mortgage} />
	</div>
</main>

<style>
	* {
		--main-padding: 1em;
	}

	main {
		text-align: center;
		padding: var(--main-padding);
		margin: 0 auto;
		color: var(--color);
		background-color: var(--background-color);
	}

	.with-sidebar {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.sidebar {
		flex-grow: 1;
	}

	.sticky {
		position: -webkit-sticky;
		position: sticky;
		top: var(--main-padding);
	}

	.not-sidebar {
		flex-basis: 0;
		flex-grow: 999;
	}
</style>