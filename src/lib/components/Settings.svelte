<script lang="ts">
    import Inputs from "./Inputs.svelte";
    import { createEventDispatcher } from "svelte";

    // Timer settings
    export let workMinutes: number;
    export let breakMinutes: number;
    export let longBreakMinutes: number;
    export let breaksBeforeLong: number;
    export let isWork: boolean;
    export let isLongBreak: boolean;
    export let isRunning: boolean;
    export let totalSeconds: number;

    // Events
    const dispatch = createEventDispatcher<{
        update: {
            key:
                | "workMinutes"
                | "breakMinutes"
                | "longBreakMinutes"
                | "breaksBeforeLong";
            value: number;
        };
        syncPhase: { minutes: number; seconds: number };
    }>();

    // Disable edits while running
    $: controlsDisabled = isRunning || totalSeconds > 0;

    function setWork(v: number) {
        dispatch("update", { key: "workMinutes", value: v });
        if (isWork) dispatch("syncPhase", { minutes: v, seconds: 0 });
    }
    function setBreak(v: number) {
        dispatch("update", { key: "breakMinutes", value: v });
        if (!isWork && !isLongBreak)
            dispatch("syncPhase", { minutes: v, seconds: 0 });
    }
    function setLong(v: number) {
        dispatch("update", { key: "longBreakMinutes", value: v });
        if (!isWork && isLongBreak)
            dispatch("syncPhase", { minutes: v, seconds: 0 });
    }
    function setEvery(v: number) {
        dispatch("update", { key: "breaksBeforeLong", value: v });
    }
</script>

<div class="inputs-row">
    <Inputs
        label="WORK MIN"
        disabled={controlsDisabled}
        value={workMinutes}
        min={1}
        max={90}
        onChange={setWork}
    />
    <Inputs
        label="SHORT BREAK MIN"
        disabled={controlsDisabled}
        value={breakMinutes}
        min={1}
        max={30}
        onChange={setBreak}
    />
    <Inputs
        label="LONG BREAK MIN"
        disabled={controlsDisabled}
        value={longBreakMinutes}
        min={1}
        max={60}
        onChange={setLong}
    />
    <Inputs
        label="LONG BREAK EVERY"
        value={breaksBeforeLong}
        min={1}
        max={10}
        disabled={controlsDisabled}
        onChange={setEvery}
    />
</div>

<style>
    .inputs-row {
        display: grid;
        grid-template-columns: repeat(4, minmax(180px, 1fr));
        gap: var(--gap);
        align-items: start;
        width: 100%;
    }

    @media (max-width: 520px) {
        .inputs-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.8rem;
            width: 100%;
        }
    }
</style>
