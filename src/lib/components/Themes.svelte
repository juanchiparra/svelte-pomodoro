<script lang="ts">
    export let mode: "outside" | "inside" = "outside";

    // Available themes
    const THEMES = [
        { id: "purple", label: "PRP", title: "Purple" },
        { id: "blue", label: "BLU", title: "Blue" },
        { id: "green", label: "GRN", title: "Green" },
        { id: "mono", label: "B/W", title: "Monochrome" },
    ] as const;

    // Default selected theme
    let current = "purple";

    // Change theme and save to localStorage
    function setTheme(id: string) {
        current = id;
        document.documentElement.setAttribute("data-theme", id);
        try {
            localStorage.setItem("theme", id);
        } catch {}
    }

    // On load, retrieve saved theme from localStorage if it exists
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme");
        if (saved) {
            current = saved;
            document.documentElement.setAttribute("data-theme", saved);
        }
    }
</script>

<!-- Theme switcher -->
<div class="theme-switcher {mode}" aria-label="Theme" role="group">
    {#each THEMES as t}
        <button
            class="swatch {current === t.id ? 'active' : ''}"
            title={t.title}
            aria-label={t.title}
            on:click={() => setTheme(t.id)}
            data-id={t.id}>{t.label}</button
        >
    {/each}
    <slot />
</div>

<style>
    .theme-switcher {
        display: inline-flex;
        gap: 6px;
        z-index: 3;
    }
    .theme-switcher.outside {
        position: absolute;
        top: 6px;
        right: 6px;
    }
    .theme-switcher.inside {
        display: none;
        position: static;
    }
    .swatch {
        height: 28px;
        border-radius: 4px;
        border: 2px solid var(--primary-1);
        background: var(--secondary-2);
        color: var(--primary-1);
        font-family: "Tiny5", monospace;
        font-size: 0.8rem;
        letter-spacing: 1px;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
    }
    .swatch.active {
        outline: 2px solid var(--secondary-3);
        outline-offset: -3px;
        opacity: 1;
    }
    .swatch:focus-visible {
        outline: 2px dashed var(--secondary-3);
        outline-offset: 2px;
    }

    /* swatch color hints */
    .swatch[data-id="purple"] {
        filter: none;
    }
    .swatch[data-id="blue"] {
        filter: hue-rotate(210deg) saturate(0.9);
    }
    .swatch[data-id="green"] {
        filter: hue-rotate(110deg) saturate(0.9);
    }
    .swatch[data-id="mono"] {
        filter: grayscale(1) contrast(1.1);
    }

    @media (max-width: 520px) {
        .theme-switcher.outside {
            display: none;
        }
        .theme-switcher.inside {
            display: flex;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 24px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin: 0;
            z-index: 3;
        }
        .swatch {
            width: 44px;
            height: 34px;
        }
    }
</style>
