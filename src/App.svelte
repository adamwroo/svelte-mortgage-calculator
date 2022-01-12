<script>
	import { mortgageBase } from './stores';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
</script>

<main>
	<h1>Kalkulator hipoteczny</h1>
	<MortgageBase bind:mortgageBase={$mortgageBase} />
	<MortgageCost mortgageBase={$mortgageBase} />
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