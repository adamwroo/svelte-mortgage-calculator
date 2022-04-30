<script>
	import { mortgageBase, alternatives, showSchedule, overpayments, decreaseInstallmentAfterOverpayment, highlightRowWithOverpay } from './stores';
	import { getMortgage } from './calculations';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';
	import Schedule from './components/Schedule.svelte';
	import ToggleSwitch from './components/shared/ToggleSwitch.svelte';

	// // todo: extract to a component
	// onMount(() => {
	// 	if (window.matchMedia('(prefers-color-scheme: dark)').matches)
	// 		window.document.body.classList.toggle('dark-mode');
	// })

	$: mortgage = getMortgage($mortgageBase);
</script>

<main>
	<div class="not-sidebar">
		<div class="sticky">
			<MortgageBase bind:mortgageBase={$mortgageBase} />
			<MortgageCost {mortgage} />
		</div>
	</div>
	<div class="sidebar">
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
		--sidebar-max-width: 20em;
	}

	main {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		text-align: center;
		padding: var(--main-padding);
		justify-content: center;
	}

	/* parent for .sticky */
	.not-sidebar {
		padding-inline: 2em;
	}

	.sticky {
		position: sticky;
		top: var(--main-padding);
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.sidebar {
		max-width: 100%;
		flex-grow: 1;
	}
</style>