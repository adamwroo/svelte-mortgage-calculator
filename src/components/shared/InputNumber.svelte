<script>
    import { selectOnFocus } from '../../actions';

    export let value;
    export let min;
    export let max;
    export let id = null;
    export let step = null;
    export let decimalPlaces = -1; // -1 = unset

    $: internalValue = value;

    let inputEl;

    const handleInput = () => {
        if (internalValue < min) return; // allow but don't update value (allows user to continue typing and fixes, if necessary, in on:change)

        if (internalValue > max) {
            internalValue = max; // set to max
            value = internalValue;
            return;
        }

        if (decimalPlaces > -1) {
            // get internalValue as string
            let inputElValue = inputEl.value;
            // get decimal separator's index
            let index = Math.max(inputElValue.indexOf(','), inputElValue.indexOf('.'));
            // get number of digits after decimal separator
            let decimalPlacesLength = index > -1 ? inputElValue.length - index - 1 : 0;
            if (decimalPlacesLength > decimalPlaces) {
                internalValue = value; // too many decimal places, use previous value
                inputEl.value = value.toFixed(decimalPlaces); // clean up formatting
                return;
            }
        }

        value = internalValue;
    }

    const handleChange = () => {
        // set to min or max if necessary
        if (internalValue < min) {
            internalValue = min;
        } else if (internalValue > max) {
            internalValue = max;
        }

        // clean up formatting
        inputEl.value = internalValue.toString();

        if (value === internalValue) {
            return; // skip to avoid unnecessary assignments
        }

        value = internalValue;
    }

    const handleKeydown = (e) => {
        // prevent decimal separator
        if (decimalPlaces == 0 && (e.key == ',' || e.key == '.')) e.preventDefault();
    }
</script>

<input
    bind:this={inputEl}
    type="number"
    id={id}
    bind:value={internalValue}
    on:input={handleInput}
    on:change={handleChange}
    on:keydown={handleKeydown}
    min={min}
    max={max}
    step={step}
    use:selectOnFocus
    autocomplete="off"
>