<script>
    import Dialog from '../Dialog.svelte';
    import AlternativeForm from './AlternativeForm.svelte';

    export let alternative;
    export let mortgage;
    export let isEditing = false;
</script>

<Dialog on:cancel>
    <AlternativeForm {alternative} {mortgage} {isEditing} on:cancel on:discard on:add on:save />
</Dialog>