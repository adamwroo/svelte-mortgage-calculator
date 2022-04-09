<script>
	import { onMount } from 'svelte';
	import { mortgageBase, alternatives, showSchedule, overpayments, decreaseInstallmentAfterOverpayment, highlightRowWithOverpay } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';
	import Schedule from './components/Schedule.svelte';
	import ToggleSwitch from './components/shared/ToggleSwitch.svelte';

	onMount(() => {
		// todo: extract to a component
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
		<h2>
			<ToggleSwitch bind:checked={$showSchedule} textFalse="Alternatywy" textTrue="Harmonogram" />
		</h2>
		{#if $showSchedule}
			<Schedule {mortgage}
				bind:overpayments={$overpayments}
				bind:decreaseInstallmentAfterOverpayment={$decreaseInstallmentAfterOverpayment}
				bind:highlightRowWithOverpay={$highlightRowWithOverpay}
			/>
		{:else}
			<Alternatives bind:alternatives={$alternatives} {mortgage} />
		{/if}
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
	}

	.with-sidebar {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.sidebar {
		flex-grow: 1;
		min-width: min(100%, 25rem);
	}

	.sticky {
		position: -webkit-sticky;
		position: sticky;
		top: var(--main-padding);
	}

	.not-sidebar {
		flex-basis: 0;
		flex-grow: 999;
		max-width: 100%;
	}

	h2 {
		padding: 0 0.5rem 0.5rem 0.5rem;
	}
</style>