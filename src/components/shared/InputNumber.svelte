<script>
    import { selectOnFocus } from '../../actions';

    export let value;
    export let min;
    export let max;
    export let id = null;
    export let step = null;
    export let decimalPlaces = -1; // -1 = unset

    $: number = value;

    let inputEl;

    const handleInput = () => {
        if (number < min) return; // allow but don't update value (allows user to continue typing and fixes, if necessary, in on:change)

        if (number > max) {
            number = max; // set to max
            value = number;
            return;
        }

        let inputElValue = inputEl.value;
        let index = Math.max(inputElValue.indexOf(','), inputElValue.indexOf('.'));
        if (index > -1 && inputElValue.length - index - 1 > decimalPlaces) {
            number = value; // too many decimal places, use previous value
            return;
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

        // clean up formatting
        inputEl.value = number.toString();

        if (value === number) {
            return; // skip to avoid unnecessary assignment
        }

        value = number;
    }

    const handleKeydown = (e) => {
        if (decimalPlaces == 0 && (e.key == ',' || e.key == '.')) e.preventDefault();
    }
</script>

<input
    bind:this={inputEl}
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