<script>
    import Dialog from '../Dialog.svelte';
    import AlternativeForm from './AlternativeForm.svelte';

    export let alternative;
    export let mortgage;
    export let isEditing = false; // todo: decide if remove and if dialog should be aware that it's editing
    export let send;
    export let receive;
</script>

<Dialog on:cancel {send} {receive} key={alternative.id}>
    <AlternativeForm {alternative} {mortgage} {isEditing} on:cancel on:discard on:add on:save />
</Dialog>