<script>
	import { mortgageBase } from './stores';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import AddAlternative from './components/AddAlternative.svelte';

	const handleAlternativeAdded = e => {
		console.log("alternative added:");
		console.log(e.detail);
	}
</script>

<main>
	<MortgageBase bind:mortgageBase={$mortgageBase} />
	<MortgageCost mortgageBase={$mortgageBase} />
	<AddAlternative mortgageBase={$mortgageBase} on:alternative-added={handleAlternativeAdded}/>
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