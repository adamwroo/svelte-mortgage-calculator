<script>
	import { mortgageBase, alternatives } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';

	$: mortgage = getMortgage($mortgageBase);
</script>

<main>
	<MortgageBase bind:mortgageBase={$mortgageBase} />
	<MortgageCost {mortgage} />
	<Alternatives bind:alternatives={$alternatives} {mortgage} />
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
</style>