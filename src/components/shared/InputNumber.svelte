<script>
    import { selectOnFocus } from '../../actions';

    export let value;
    export let min;
    export let max;
    export let id = null;
    export let step = null;
    export let decimalPlaces = -1; // -1 = unset

    $: number = value;

    const handleInput = () => {
        if (number < min) return; // allow but don't update value

        if (number > max) {
            number = value; // use previous value
            return;
        }

        if (decimalPlaces != -1) {
            const significantDigits = number * (10 ** decimalPlaces);
            const allowedSignificantDigits = Math.floor(significantDigits);

            if (significantDigits != allowedSignificantDigits) {
                number = allowedSignificantDigits / (10 ** decimalPlaces);
            }
        }

        value = number;
    }

    const handleChange = () => {
        // set to min or max if necessary
        if (number < min) {
            number = min;
        } else if (number > max) {
            number = max;
        }

        value = number;
    }

    const handleKeyDown = (e) => {
        if (decimalPlaces == 0 && (e.key == ',' || e.key == '.')) e.preventDefault();
    }
</script>

<input
    type="number"
    id={id}
    bind:value={number}
    on:input={handleInput}
    on:change={handleChange}
    on:keydown={handleKeyDown}
    min={min}
    max={max}
    step={step}
    use:selectOnFocus
    autocomplete="off"
>