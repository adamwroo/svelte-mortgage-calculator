<script>
    import { selectOnFocus } from '../../actions';

    export let value;
    export let min;
    export let max;
    export let id = null;
    export let step = null;
  
    $: number = value;

    const changeNumber = () => {
        if (number < min) {
            number = min;
        } else if (number > max) {
            number = max;
        }

        value = number;
    }
</script>

<input
    type="number"
    id={id}
    bind:value={number}
    on:change={changeNumber}
    min={min}
    max={max}
    step={step}
    use:selectOnFocus
    autocomplete="off"
>