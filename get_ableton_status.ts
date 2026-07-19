import { defineTool, tool } from "eve/tools";
import { Server } from "node-osc";

/**
 * This sets up a persistent OSC server to listen for status updates from Ableton Live.
 * The LiveOSC script in Ableton should be configured to send feedback to this port (e.g., 9001).
 */

// --- In-memory store for Ableton's state ---
interface AbletonStatus {
    isPlaying: boolean;
    tempo: number;
    lastUpdated: number | null;
}

const status: AbletonStatus = {
    isPlaying: false,
    tempo: 120.0,
    lastUpdated: null,
};

// --- OSC Server Setup ---
try {
    const oscServer = new Server(9001, "127.0.0.1", () => {
        console.log("OSC Server listening on port 9001 for Ableton status updates.");
    });

    // Listen for tempo updates
    oscServer.on("/live/tempo", (msg) => {
        if (typeof msg[1] === 'number') {
            status.tempo = parseFloat(msg[1].toFixed(2));
            status.lastUpdated = Date.now();
            // console.log(`Received /live/tempo: ${status.tempo}`);
        }
    });

    // Listen for playback state updates
    oscServer.on("/live/play", (msg) => {
        if (typeof msg[1] === 'number') {
            status.isPlaying = msg[1] === 1;
            status.lastUpdated = Date.now();
            // console.log(`Received /live/play: ${status.isPlaying}`);
        }
    });

    oscServer.on('error', (err) => {
        console.error('OSC Server Error:', err);
    });

} catch (e) {
    console.error("Could not start OSC server on port 9001. It might already be in use.", e);
}


export default defineTool({
    description: "Gets the current status from Ableton Live, including BPM and playback state.",
    // No input is needed for this tool.
    inputSchema: undefined,

    async execute() {
        // Check if we've received any status update recently.
        const fiveSecondsAgo = Date.now() - 5000;
        if (!status.lastUpdated || status.lastUpdated < fiveSecondsAgo) {
            return tool.text(
                "Status unknown. I am not receiving a signal from Ableton Live. " +
                "Please ensure Ableton is running and the LiveOSC script is configured to send feedback to port 9001."
            );
        }

        const playingState = status.isPlaying ? "Playing" : "Stopped";

        // Return the status in a clear, readable format.
        return tool.text(
            `Ableton Live Status:
- Playback: ${playingState}
- Tempo: ${status.tempo} BPM`
        );
    },
});