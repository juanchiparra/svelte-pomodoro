<script lang="ts">
    import { onDestroy } from "svelte";
    import Progress from "$lib/components/Progress.svelte";
    import Controls from "$lib/components/Controls.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import Themes from "$lib/components/Themes.svelte";
    import { play } from "$lib/sounds";
    import "$lib/styles/global.css";
    import "$lib/styles/variables.css";

    // Default Pomodoro settings
    let workMinutes = 25;
    let breakMinutes = 5;
    let longBreakMinutes = 15;
    let breaksBeforeLong = 4;

    // Real-time update
    let minutes = workMinutes;
    let seconds = 0;
    let isRunning = false;
    let isWork = true;
    let isLongBreak = false;
    let shortBreakCount = 0;
    let totalSeconds = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    // Start the timer
    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        play("start");
        if (minutes === 0 && seconds === 0) {
            minutes = isWork
                ? workMinutes
                : isLongBreak
                  ? longBreakMinutes
                  : breakMinutes;
            seconds = 0;
        }
        interval = setInterval(() => {
            totalSeconds++;
            if (seconds === 0) {
                if (minutes === 0) {
                    // phase end
                    play("end");
                    if (isWork) {
                        shortBreakCount++;
                        if (shortBreakCount <= breaksBeforeLong) {
                            isWork = false;
                            isLongBreak = false;
                            minutes = breakMinutes;
                            seconds = 0;
                            play("shortBreak");
                        } else {
                            isWork = false;
                            isLongBreak = true;
                            minutes = longBreakMinutes;
                            seconds = 0;
                            shortBreakCount = 0;
                            play("longBreak");
                        }
                    } else {
                        isWork = true;
                        isLongBreak = false;
                        minutes = workMinutes;
                        seconds = 0;
                        play("work");
                    }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
        }, 1000);
    }

    // Pauses the timer
    function pauseTimer() {
        isRunning = false;
        if (interval) clearInterval(interval);
        play("pause");
    }

    // Resets the timer
    function resetTimer() {
        isRunning = false;
        if (interval) clearInterval(interval);
        isWork = true;
        isLongBreak = false;
        minutes = workMinutes;
        seconds = 0;
        totalSeconds = 0;
        shortBreakCount = 0;
    }

    // Pomodoro status
    $: modeLabel = isWork ? "WORK" : isLongBreak ? "LONG BREAK" : "BREAK";
    $: statusLabel =
        !isRunning && totalSeconds === 0
            ? "READY"
            : isRunning
              ? modeLabel
              : "PAUSE";
    $: controlsDisabled = isRunning || totalSeconds > 0;
    $: cycleProgress = isWork
        ? 1 - (minutes * 60 + seconds) / (workMinutes * 60)
        : isLongBreak
          ? 1 - (minutes * 60 + seconds) / (longBreakMinutes * 60)
          : 1 - (minutes * 60 + seconds) / (breakMinutes * 60);

    // Keyboard shortcuts
    function handleKey(e: KeyboardEvent) {
        if (e.repeat) return;
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName?.toLowerCase?.();
        if (tag === "input" || tag === "textarea" || t?.isContentEditable)
            return;
        if (e.code === "Space") {
            e.preventDefault();
            isRunning ? pauseTimer() : startTimer();
        } else if ((e.key || "").toLowerCase() === "r") {
            resetTimer();
        }
    }

    // Remove the interval
    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<svelte:window on:keydown={handleKey} />

<main class="container">
    <Themes mode="outside" />
    <section class="pomodoro {isRunning ? 'running' : 'paused'}">
        <div class="pomodoro-header">
            <span class="header-title">POMODORO</span>
            <div class="header-status" aria-live="polite">
                <span class="status-label">STATUS |</span>
                <span class="status-value">{statusLabel}</span>
            </div>
        </div>
        <div class="pomodoro-content">
            <div class="timer">
                <div class="content-timer">
                    <div class="main" aria-live="polite" aria-atomic="true">
                        {minutes.toString().padStart(2, "0")}:{seconds
                            .toString()
                            .padStart(2, "0")}
                    </div>
                    <div class="sub">
                        <span class="sub-label">TOTAL</span>
                        <span class="sub-value">
                            {Math.floor(totalSeconds / 60)}:{(totalSeconds % 60)
                                .toString()
                                .padStart(2, "0")}
                        </span>
                    </div>
                </div>
                <Progress percent={cycleProgress * 100} />
            </div>
            <div class="controls">
                <Settings
                    {workMinutes}
                    {breakMinutes}
                    {longBreakMinutes}
                    {breaksBeforeLong}
                    {isWork}
                    {isLongBreak}
                    {isRunning}
                    {totalSeconds}
                    on:update={(e) => {
                        const { key, value } = e.detail;
                        if (key === "workMinutes") workMinutes = value;
                        if (key === "breakMinutes") breakMinutes = value;
                        if (key === "longBreakMinutes")
                            longBreakMinutes = value;
                        if (key === "breaksBeforeLong")
                            breaksBeforeLong = value;
                    }}
                    on:syncPhase={(e) => {
                        minutes = e.detail.minutes;
                        seconds = e.detail.seconds;
                    }}
                />
                <Controls
                    {isRunning}
                    on:start={startTimer}
                    on:pause={pauseTimer}
                    on:reset={resetTimer}
                />
            </div>
        </div>
        <Themes mode="inside" />
    </section>
</main>
