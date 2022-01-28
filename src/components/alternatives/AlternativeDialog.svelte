<script>
    import Dialog from '../Dialog.svelte';
    import AlternativeForm from './AlternativeForm.svelte';

    export let alternative;
    export let mortgage;
    export let send;
    export let receive;
</script>

<Dialog on:cancel {send} {receive} key={alternative.id}>
    <AlternativeForm {alternative} {mortgage} on:cancel on:save />
</Dialog>