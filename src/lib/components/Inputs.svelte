<script lang="ts">
    export let label: string;
    export let value: number;
    export let min: number = 1;
    export let max: number = 60;
    export let disabled: boolean = false;
    export let onChange: (v: number) => void;

    function clamp(n: number) {
        return Math.max(min, Math.min(max, n));
    }
    function dec() {
        if (!disabled) onChange(clamp(value - 1));
    }
    function inc() {
        if (!disabled) onChange(clamp(value + 1));
    }
    function handleInput(e: Event) {
        if (disabled) return;
        const el = e.target as HTMLInputElement | null;
        const v = clamp(Number(el?.value ?? min));
        onChange(v);
    }
</script>

<div class="input-content">
    <div class="input-label">{label}</div>
    <div class="input-block">
        <button
            class="input-btn"
            on:click={dec}
            aria-label="Menos"
            tabindex="-1"
            disabled={disabled || value <= min}>-</button
        >
        <input
            type="number"
            class="input-value"
            {min}
            {max}
            {value}
            on:input={handleInput}
            {disabled}
        />
        <button
            class="input-btn"
            on:click={inc}
            aria-label="Más"
            tabindex="-1"
            disabled={disabled || value >= max}>+</button
        >
    </div>
</div>

<style>
    .input-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
    }

    .input-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.4rem;
    }

    .input-label {
        color: var(--primary-1);
        background-color: var(--secondary-1);
        border: 2px solid var(--primary-1);
        border-radius: 4px;
        padding: 0.2rem 1rem;
    }

    .input-value {
        width: 64px;
        height: 40px;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        border: 2px solid var(--primary-1);
        background-color: var(--secondary-2);
        color: var(--primary-1);
        font-size: 1.35rem;
        text-align: center;
        margin: 0 0.2rem;
        outline: none;
        transition: border 0.2s;
        box-sizing: border-box;
        box-shadow: none;
        font-family: "Tiny5", monospace;
        font-weight: 500;
    }

    .input-value::-webkit-outer-spin-button,
    .input-value::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .input-value:focus {
        border: 2px solid var(--primary-1);
        box-shadow: inset 0 0 0 2px var(--primary-3);
    }

    .input-btn {
        width: 40px;
        height: 40px;
        padding: 0;
        border-radius: 4px;
        border: 2px solid var(--primary-1);
        background-color: var(--dark);
        color: var(--light);
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        transition:
            background 0.2s,
            color 0.2s,
            filter 0.15s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .input-btn:disabled {
        background-color: var(--disabled-bg);
        color: color-mix(in srgb, var(--disabled-fg) 85%, transparent);
        opacity: 0.8;
        cursor: not-allowed;
    }

    .input-btn:not(:disabled):hover {
        background-color: var(--light);
        color: var(--dark);
    }

    .input-btn:focus-visible {
        outline: 2px dashed var(--secondary-3);
        outline-offset: 2px;
    }

    @media (max-width: 520px) {
        .input-value {
            width: 72px;
            height: 48px;
            font-size: 1.25rem;
        }
        .input-btn {
            width: 48px;
            height: 48px;
            font-size: 1.6rem;
        }
    }
</style>
