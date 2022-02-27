<script>
	import { Router, Link, Route } from "svelte-routing";
	import { onMount } from 'svelte';
	import { mortgageBase, alternatives, showAlternatives } from './stores';
	import { getMortgage } from './calculations';
	import About from './components/About.svelte';
	import Icon from './components/Icon.svelte';
	import MortgageBase from './components/MortgageBase.svelte';
	import MortgageCost from './components/MortgageCost.svelte';
	import Alternatives from './components/Alternatives.svelte';
	import Schedule from './components/Schedule.svelte';
	import AlternativeScheduleSwitch from './components/AlternativeScheduleSwitch.svelte';

	onMount(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches)
			window.document.body.classList.toggle('dark-mode');
	})

	$: mortgage = getMortgage($mortgageBase);
</script>

<Router>
	<nav>
		<Link to="/">
			<div class="nav-icon">
				<Icon />
			</div>
		</Link>
		<Link to="about">
			<span class="nav-text">Informacje</span>
		</Link>
	</nav>
	<div>
		<Route path="/">
			<main class="with-sidebar">
				<div class="sidebar">
					<div class="sticky">
						<MortgageBase bind:mortgageBase={$mortgageBase} />
						<MortgageCost {mortgage} />
						<AlternativeScheduleSwitch bind:showAlternatives={$showAlternatives} />
					</div>
				</div>
				<div class="not-sidebar">
					{#if $showAlternatives}
					<Alternatives bind:alternatives={$alternatives} {mortgage} />
					{:else}
					<Schedule {mortgage} />
					{/if}
				</div>
			</main>
		</Route>
		<Route path="about" component="{About}" />
	</div>
</Router>

<style>
	* {
		--main-padding: 1em;
		--nav-height: 2.5rem;
		--nav-padding: 0.5rem;
	}

	nav {
		display: flex;
		height: var(--nav-height);
		justify-content: left;
		align-items: center;
		gap: 1rem;
		padding: var(--nav-padding);
		border-bottom: 1px solid #ccc;
	}

	.nav-icon {
		width: calc(var(--nav-height) - calc(var(--nav-padding) * 2));
		height: calc(var(--nav-height) - calc(var(--nav-padding) * 2));
	}

	.nav-text {
		font-size: 1.25rem;
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