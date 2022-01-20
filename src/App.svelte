<script>
	import { mortgageBase } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';

	import AddAlternative from './components/AddAlternative.svelte';
	import MortgageAlternative from './components/MortgageAlternative.svelte';

	$: mortgage = getMortgage($mortgageBase);
	let alternatives = [];

	// todo: remove
	const getNewAlternativeId = () => alternatives.length > 0 ? Math.max(...alternatives.map(t => t.id)) + 1 : 1
	const handleAlternativeAdded = e => {
		let alternative = { id: getNewAlternativeId(), ...e.detail };
		alternatives = [...alternatives, alternative];
	}
</script>

<main>
	<MortgageBase bind:mortgageBase={$mortgageBase} />
	<MortgageCost {mortgage} />
	<Alternatives bind:alternatives={alternatives} {mortgage} />

	<!-- todo: remove -->
	<!--<hr />
	<AddAlternative mortgageBase={$mortgageBase} on:alternative-added={handleAlternativeAdded}/>
	{#each alternatives as alternative}
		<MortgageAlternative {...alternative} />
	{/each}-->
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