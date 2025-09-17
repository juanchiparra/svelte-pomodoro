// Generates simple beeps using the Web Audio API for app events. No assets required
// Usage: play("start" | "pause" | "work" | "shortBreak" | "longBreak" | "end")

type SoundKind =
    | "start"
    | "pause"
    | "work"
    | "shortBreak"
    | "longBreak"
    | "end";

let ctx: AudioContext | null = null;

function getCtx() {
    if (typeof window === "undefined") return null;
    if (!ctx)
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctx;
}

function tone(
    context: AudioContext,
    freq: number,
    durationMs: number,
    {
        type = "sine",
        gain = 0.06,
    }: { type?: OscillatorType; gain?: number } = {}
) {
    const osc = context.createOscillator();
    const g = context.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g).connect(context.destination);
    osc.start();
    const stopAt = context.currentTime + durationMs / 1000;
    osc.stop(stopAt);
}

export async function play(kind: SoundKind) {
    const context = getCtx();
    if (!context) return;
    if (context.state === "suspended") {
        try {
            await context.resume();
        } catch {
            // Browsers require a user gesture to start audio. The resume error is ignored
        }
    }

    // Define simple patterns
    switch (kind) {
        case "start": {
            // quick up-chirp
            tone(context, 660, 90, { type: "triangle" });
            setTimeout(() => tone(context, 880, 90, { type: "triangle" }), 90);
            break;
        }
        case "pause": {
            // soft down beep
            tone(context, 520, 120, { type: "sine" });
            break;
        }
        case "work": {
            // confident double beep
            tone(context, 740, 80, { type: "square", gain: 0.05 });
            setTimeout(
                () => tone(context, 740, 80, { type: "square", gain: 0.05 }),
                110
            );
            break;
        }
        case "shortBreak": {
            // relaxed lower beep
            tone(context, 440, 120, { type: "triangle", gain: 0.05 });
            break;
        }
        case "longBreak": {
            // two relaxed beeps
            tone(context, 400, 110, { type: "triangle", gain: 0.05 });
            setTimeout(
                () => tone(context, 400, 110, { type: "triangle", gain: 0.05 }),
                140
            );
            break;
        }
        case "end": {
            // end-of-phase triple
            tone(context, 620, 80, { type: "sine" });
            setTimeout(() => tone(context, 520, 80, { type: "sine" }), 100);
            setTimeout(() => tone(context, 420, 120, { type: "sine" }), 200);
            break;
        }
    }
}
