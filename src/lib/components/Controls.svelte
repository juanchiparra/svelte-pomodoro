<script lang="ts">
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    // Controls
    export let isRunning: boolean;

    const dispatch = createEventDispatcher<{
        start: void;
        pause: void;
        reset: void;
    }>();

    function start() {
        if (!isRunning) dispatch("start");
    }
    function pause() {
        if (isRunning) dispatch("pause");
    }
    function reset() {
        dispatch("reset");
    }
</script>

<div class="action">
    <Button
        label="START"
        variant={!isRunning ? "primary" : "default"}
        size="md"
        onClick={start}
        disabled={isRunning}
        ariaLabel="Start"
    />
    <Button
        label="PAUSE"
        variant={isRunning ? "primary" : "default"}
        size="md"
        onClick={pause}
        disabled={!isRunning}
        ariaLabel="Pause"
    />
    <Button label="RESET" size="md" onClick={reset} ariaLabel="Reset" />
</div>

<style>
    .action {
        display: inline-flex;
        gap: 0.6rem;
        justify-content: center;
        align-items: center;
        margin-top: 0.7rem;
        flex-wrap: nowrap;
    }
    @media (max-width: 520px) {
        .action {
            display: inline-flex;
            gap: 0.6rem;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 0.4rem;
        }
    }
</style>
