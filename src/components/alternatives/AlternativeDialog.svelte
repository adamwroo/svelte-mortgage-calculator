<script>
    import Dialog from '../Dialog.svelte';
    import AlternativeForm from './AlternativeForm.svelte';

    export let alternative;
    export let mortgage;
</script>

<Dialog on:cancel>
    <AlternativeForm {alternative} {mortgage} on:cancel on:discard on:add />
</Dialog>