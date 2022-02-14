<script>
    import { crossfade, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import AlternativeDialog from './alternatives/AlternativeDialog.svelte';
    import Alternative from './alternatives/Alternative.svelte';

    export let alternatives = [];
    export let mortgage;

    let showingDialog = false;
    let alternativeForDialog;
    let editingId = -1;

    const [send, receive] = crossfade({ duration: 500, fallback: fade });

    const getNewId = () => alternatives.length > 0 ? Math.max(...alternatives.map(t => t.id)) + 1 : 1;
    const getNewAlternative = () => ( {
        id: getNewId(),
        overpayment: 0,
        interestRateChange: 0,
        adjustType: 'adjust-installment' // 'adjust-installment' or 'adjust-number-of-payments'
    } );

    const openDialog = alternative => {
        alternativeForDialog = alternative ? {...alternative} : getNewAlternative();
        editingId = alternativeForDialog.id;
        showingDialog = true;
    }

    const closeDialog = () => {
        showingDialog = false;
        editingId = -1;
    }

    const saveAlternative = alternative => {
        const i = alternatives.findIndex(a => a.id == alternative.id);
        if (i === -1) {
            // adding new
            alternatives = [alternative, ...alternatives];
        } else {
            // saving edited
            alternatives[i] = { ...alternative };
        }

        closeDialog()
    }

    const removeAlternative = id => {
        alternatives = alternatives.filter(a => a.id !== id);
    }

    const removeAllAlternatives = () => {
        alternatives = [];
    }
</script>

<h2>Alternatywy:</h2>
<button on:click={() => openDialog()}>Dodaj</button>
<button on:click={removeAllAlternatives}>Usuń wszystkie</button>

{#if showingDialog}
    <AlternativeDialog
        alternative={alternativeForDialog}
        {mortgage}
        on:cancel={closeDialog}
        on:save={e => saveAlternative(e.detail)}
        {send}
        {receive}
    />
{/if}

<div class="alternatives">
    {#each alternatives as alternative (alternative.id)}
        <div class="alternative" animate:flip|local={{ duration: 500 }}>
            <Alternative {alternative} {mortgage} {send} {receive}
                isEditing={alternative.id === editingId}
                on:edit={e => openDialog(e.detail)}
                on:remove={e => removeAlternative(e.detail)}
            />
        </div>
    {/each}
</div>

<style>
    .alternatives {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .alternative {
        position: relative;
    }

    .alternative {
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 10px;
}
</style>