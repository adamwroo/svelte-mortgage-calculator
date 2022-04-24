<div class="info-grid">
    <slot></slot>
</div>

<style>
    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, auto);
        column-gap: 0.5em;
    }

    :global(.info-grid > *:nth-child(odd)) {
        justify-self: right;
        text-align: right;
    }

    :global(.info-grid > *:nth-child(even)) {
        justify-self: left;
        text-align: left;
    }
</style>