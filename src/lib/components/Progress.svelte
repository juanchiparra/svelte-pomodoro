<script lang="ts">
    // Initial value for the progress percentage (0-100)
    export let percent: number = 0;
    // Total number of blocks in the progress bar
    export let blocks: number = 30;
    // Label displayed next to the bar
    export let label: string = "PROGRESS";
    // Show numeric percentage next to the bar
    export let showPercent: boolean = true;
    // Hide bar on mobile devices if true
    export let hideOnMobile: boolean = true;

    // Ensure the percentage is a whole number between 0 and 100
    $: clamped = Math.max(0, Math.min(100, Math.round(percent)));
    // Calculate filled blocks based on percentage
    $: filledBlocks = Math.round((clamped / 100) * blocks);
    // Boolean array for rendering each block (true = filled)
    $: barBlocks = Array.from({ length: blocks }, (_, i) => i < filledBlocks);
</script>

<div class="bar {hideOnMobile ? 'hide-mobile' : ''}" aria-label={label}>
    <div class="bar-label">{label}</div>
    <div
        class="bar-blocks"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={clamped}
    >
        {#each barBlocks as filled}
            <div class="bar-block {filled ? 'filled' : ''}"></div>
        {/each}
    </div>
    {#if showPercent}
        <div class="bar-percent">{clamped}%</div>
    {/if}
    <slot />
</div>

<style>
    .bar {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin: 0.7rem 0;
    }
    .bar-label {
        color: var(--primary-1);
        font-size: 0.95rem;
        letter-spacing: 1px;
        border: 2px solid var(--primary-1);
        border-radius: 3px;
        padding: 0.1rem 0.5rem;
        background-color: var(--secondary-1);
    }
    .bar-blocks {
        display: flex;
        gap: 2px;
        align-items: center;
    }
    .bar-block {
        width: 12px;
        height: 24px;
        background-color: var(--secondary-2);
        border: 2px solid var(--primary-1);
        border-radius: 2px;
        transition:
            background 0.2s,
            border 0.2s;
    }
    .bar-block.filled {
        background-color: var(--primary-1);
        border: 2px solid var(--primary-1);
    }
    .bar-percent {
        color: var(--primary-1);
        font-size: 1.35rem;
        letter-spacing: 2px;
        margin-left: 1.2rem;
    }

    @media (max-width: 520px) {
        .bar.hide-mobile {
            display: none;
        }
    }
</style>
