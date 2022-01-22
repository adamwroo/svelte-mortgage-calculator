<script>
	import { mortgageBase, alternatives } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';

	$: mortgage = getMortgage($mortgageBase);
</script>

<main class="with-sidebar">
	<div class="sidebar">
		<MortgageBase bind:mortgageBase={$mortgageBase} />
		<MortgageCost {mortgage} />
	</div>
	<div class="not-sidebar">
		<Alternatives bind:alternatives={$alternatives} {mortgage} />
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.with-sidebar {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.sidebar {
		flex-grow: 1;
	}

	.not-sidebar {
		flex-basis: 0;
		flex-grow: 999;
	}
</style>