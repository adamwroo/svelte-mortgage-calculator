<script>
    /**
     * component created so values (especially max) can always by displayed with 2 decimal places
     * and actual value is kept internally
     */
    import { selectOnFocus } from '../../actions';
    import { round } from '../../calculations';

    export let value;
    export let min;
    export let max;
    export let ariaLabel = '';

    $: displayValue = round(value);
    $: safeMax = round(max);
    $: updateAfterMaxChange(max);

    const updateAfterMaxChange = () => {
        handleChange();
    }

    const handleChange = () => {
        if (displayValue < min) {
            displayValue = min;
            value = min;
        }
        if (displayValue >= max || displayValue >= safeMax) {
            displayValue = safeMax;
            value = max;
        } else {
            value = displayValue;
        }
    }
</script>

<input
    bind:value={displayValue}
    type="number"
    min={min}
    max={safeMax}
    on:change={handleChange}
    use:selectOnFocus
    autocomplete="off"
    aria-label={ariaLabel}
>