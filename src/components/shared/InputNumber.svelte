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

        // todo: probably safer to manipulate input.value
        if (decimalPlaces > 0) {
            const significantDigits = Math.round(number * (10 ** (1 + +decimalPlaces)));
            const allowedSignificantDigits = Math.round(Math.round(number * (10 ** +decimalPlaces)) * 10);

            if (significantDigits != allowedSignificantDigits) {
                number = value; // use previous value
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

    const handleKeydown = (e) => {
        if (decimalPlaces == 0 && (e.key == ',' || e.key == '.')) e.preventDefault();
    }
</script>

<input
    type="number"
    id={id}
    bind:value={number}
    on:input={handleInput}
    on:change={handleChange}
    on:keydown={handleKeydown}
    min={min}
    max={max}
    step={step}
    use:selectOnFocus
    autocomplete="off"
>