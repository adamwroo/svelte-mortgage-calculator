<script>
    import { toYearsAndMonthsHint, toPLN } from '../../utils';

    export let oldValue;
    export let newValue;
    export let type = '';

    $: difference = newValue - oldValue;
    $: textDifference = () => {
        let text = '';

        if (difference > 0) text += '+';

        if (type === '') text += difference;
        else if (type === 'currency') text += toPLN(difference);
        else if (type === 'percent') text += `${difference.toFixed(2)} pp.`;
        else if (type === 'years-and-months') text += toYearsAndMonthsHint(difference);

        return text;
    }
</script>

{#if difference !== 0 }
    (<b class={difference < 0 ? 'better' : 'worse'}>{textDifference()}</b>)
{/if}

<style>
    .better {
        color: var(--text-color-better);
    }

    .worse {
        color: var(--text-color-worse);
    }
</style>