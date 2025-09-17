<script lang="ts">
    export let label: string;
    export let variant: "default" | "primary" = "default";
    export let disabled: boolean = false;
    export let ariaLabel: string | undefined;
    export let size: "sm" | "md" | "lg" = "md";
    export let onClick: (() => void) | undefined;

    // Handles the button click event, executing the onClick function if not disabled
    function handleClick() {
        if (!disabled && onClick) onClick();
    }
</script>

<button
    class="btn {variant} {size}"
    on:click={handleClick}
    {disabled}
    aria-label={ariaLabel ?? label}
>
    <span class="btn-text">{label}</span>
    <slot />
</button>

<style>
    .btn {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1rem;
        background-color: var(--dark);
        color: var(--light);
        font-family: "Tiny5", monospace;
        letter-spacing: 2px;
        cursor: pointer;
        image-rendering: pixelated;
        position: relative;
        box-shadow: none;
        transition:
            transform 0.05s ease-out,
            filter 0.1s;
        border: 2px solid var(--primary-1);
        border-radius: 4px;
    }

    .btn.sm {
        width: 56px;
        height: 56px;
    }

    .btn.md {
        width: 68px;
        height: 68px;
    }

    .btn.lg {
        width: 80px;
        height: 80px;
    }

    .btn.primary {
        outline: 2px solid var(--secondary-3);
        outline-offset: -4px;
    }

    .btn:focus-visible {
        outline: 2px dashed var(--secondary-3);
        outline-offset: 2px;
    }

    .btn:disabled {
        background-color: var(--disabled-bg);
        color: color-mix(in srgb, var(--disabled-fg) 85%, transparent);
        opacity: 0.8;
        cursor: not-allowed;
        filter: none;
    }

    .btn:active:not(:disabled) {
        transform: translate(1px, 1px);
    }

    .btn-text {
        font-size: 0.95rem;
    }

    @media (max-width: 520px) {
        .btn {
            width: 64px;
            height: 64px;
        }
    }
</style>
