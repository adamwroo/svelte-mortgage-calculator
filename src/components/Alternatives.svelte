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
        alternatives = [...alternatives, alternative];
        discardDialog();
    }

    const removeAlternative = e => {
        let id = e.detail;
        console.log(id)
        alternatives = alternatives.filter(a => a.id !== id);
    }
</script>

<h2>Alternatywy:</h2>
<button on:click={() => (showModal = true)}>Dodaj</button>

{#if showModal}
    <AlternativeDialog
        alternative={currentAlternative}
        {mortgage}
        on:cancel={cancelDialog}
        on:discard={discardDialog}
        on:add={addAlternative}
    />
{/if}

{#each alternatives as alternative}
    <Alternative {alternative} {mortgage} on:remove={removeAlternative} />
{/each}