<script>
    import AlternativeDialog from './alternatives/AlternativeDialog.svelte';
    import Alternative from './alternatives/Alternative.svelte';

    export let alternatives = [];
    export let mortgage;

    let showModal = false;
    let isEditing = false;

    const getNewId = () => alternatives.length > 0 ? Math.max(...alternatives.map(t => t.id)) + 1 : 1;
    const resetAlternative = () => ( {
        id: getNewId(), // consider 'undefined' for initial alternative
        overpayment: 0,
        interestRateChange: 0,
        adjustType: 'adjust-number-of-payments' // 'adjust-number-of-payments' or 'adjust-installment'
    } );
    let currentAlternative = resetAlternative();

    const cancelDialog = () => {
        showModal = false;
        isEditing = false;
        currentAlternative = resetAlternative(); // todo: cancel and discard do the same thing
    }

    const discardDialog = () => {
        showModal = false;
        isEditing = false;
        currentAlternative = resetAlternative();
    }

    const addAlternative = e => {
        let alternative = e.detail;
        // prevent double submission
        if (alternatives.findIndex(a => a.id == alternative.id) === -1) {
            alternatives = [...alternatives, alternative];
        }
        discardDialog();
    }

    const saveAlternative = e => {
        let alternative = e.detail;
        console.log('saving:');
        console.log(alternative);

        const i = alternatives.findIndex(a => a.id == alternative.id);
        alternatives[i] = { ...alternative };
        discardDialog();
    }

    const removeAlternative = e => {
        let id = e.detail;
        alternatives = alternatives.filter(a => a.id !== id);
    }

    const editAlternative = e => {
        const alternative = e.detail;
        currentAlternative = alternative;
        isEditing = true;
        showModal = true;
    }

    const removeAllAlternatives = () => {
        alternatives = [];
    }
</script>

<h2>Alternatywy:</h2>
<button on:click={() => (showModal = true)}>Dodaj</button>
<button on:click={removeAllAlternatives}>Usuń wszystkie</button>

{#if showModal}
    <AlternativeDialog
        alternative={currentAlternative}
        {mortgage}
        {isEditing}
        on:cancel={cancelDialog}
        on:discard={discardDialog}
        on:add={addAlternative}
        on:save={saveAlternative}
    />
{/if}

<dvi class="alternatives">
    {#each alternatives as alternative (alternative.id)}
        <Alternative {alternative} {mortgage} on:edit={editAlternative} on:remove={removeAlternative} />
    {/each}
</dvi>

<style>
    .alternatives {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        gap: 1rem;
    }
</style>