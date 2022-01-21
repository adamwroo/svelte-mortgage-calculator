<script>
    import AlternativeDialog from './alternatives/AlternativeDialog.svelte';
    import Alternative from './alternatives/Alternative.svelte';

    export let alternatives = [];
    export let mortgage;

    let showModal = false;

    const getNewId = () => alternatives.length > 0 ? Math.max(...alternatives.map(t => t.id)) + 1 : 1;
    const resetAlternative = () => ( {
        id: getNewId(),
        overpayment: 0,
        interestRateChange: 0,
        adjustType: 'adjust-number-of-payments' // 'adjust-number-of-payments' or 'adjust-installment'
    } );
    let currentAlternative = resetAlternative();

    const cancelDialog = () => {
        showModal = false;
    }

    const discardDialog = () => {
        showModal = false;
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

    const removeAlternative = e => {
        let id = e.detail;
        alternatives = alternatives.filter(a => a.id !== id);
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
        on:cancel={cancelDialog}
        on:discard={discardDialog}
        on:add={addAlternative}
    />
{/if}

{#each alternatives as alternative (alternative.id)}
    <Alternative {alternative} {mortgage} on:remove={removeAlternative} />
{/each}