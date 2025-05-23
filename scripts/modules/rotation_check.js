import * as Minecraft from '@minecraft/server';
import * as config from '../config.js';
import { logDebug, sendMessageToAdmins } from '../assets/util.js';

const world = Minecraft.world;
const system = Minecraft.system;

// Stores player.id -> { yaw: number, pitch: number, lastCheckTime: number }
const playerLastRotation = new Map(); 

export function initializeRotationCheck() {
    const rotationConfig = config.default.packetChecks?.invalidHeadRotationCheck;
    if (!rotationConfig || !rotationConfig.enabled) {
        logDebug("[RotationCheck] Disabled by config.");
        return;
    }
    logDebug("[RotationCheck] Initializing...");

    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            const currentRotation = player.getRotation(); // { x: pitch, y: yaw }
            const currentTime = Date.now();

            // Pitch Check
            if (currentRotation.x < rotationConfig.minPitch || currentRotation.x > rotationConfig.maxPitch) {
                handleViolation(player, "Pitch", currentRotation.x.toFixed(2));
                // Optional: force valid pitch (might be jarring)
                // player.teleport(player.location, { rotation: { x: Math.max(rotationConfig.minPitch, Math.min(rotationConfig.maxPitch, currentRotation.x)), y: currentRotation.y }});
            }

            // Yaw Delta Check (Spin Check)
            if (playerLastRotation.has(player.id)) {
                const lastData = playerLastRotation.get(player.id);
                let yawDelta = Math.abs(currentRotation.y - lastData.yaw);
                
                // Normalize yawDelta for wrap-around (e.g., -170 to 170 is a 20 degree change, not 340)
                if (yawDelta > 180) {
                    yawDelta = 360 - yawDelta;
                }

                // const timeDiffSeconds = (currentTime - lastData.lastCheckTime) / 1000;
                // if (timeDiffSeconds > 0) { // Avoid division by zero if interval is very fast
                //    const yawSpeed = yawDelta / timeDiffSeconds; // Degrees per second
                //    if (yawSpeed > rotationConfig.maxYawSpeed) {
                //        handleViolation(player, "Yaw Speed", yawSpeed.toFixed(2));
                //    }
                // }
                // Using maxYawDeltaPerTick is simpler if the interval is consistent (every tick)
                 if (yawDelta > rotationConfig.maxYawDeltaPerTick) {
                     handleViolation(player, "Yaw Delta", yawDelta.toFixed(2) + " per tick");
                 }
            }
            
            playerLastRotation.set(player.id, { yaw: currentRotation.y, pitch: currentRotation.x, lastCheckTime: currentTime });
        }
    }, 1); // Run every tick for responsive checking of delta. Adjust if performance issues arise.
}

function handleViolation(player, type, value) {
    const rotationConfig = config.default.packetChecks.invalidHeadRotationCheck;
    let violations = player.getDynamicProperty("safeguard:rotationViolations") || 0;
    violations++;
    player.setDynamicProperty("safeguard:rotationViolations", violations);

    logDebug(`[RotationCheck] Player ${player.name} ${type} violation. Value: ${value}. Violations: ${violations}`);

    if (violations >= rotationConfig.violationThreshold) {
        player.setDynamicProperty("safeguard:rotationViolations", 0); // Reset violations

        const message = `Player ${player.name} flagged for Invalid Rotation (${type}: ${value}).`;
        sendMessageToAdmins(`§6[§eSafeGuard Notify§6]§c ${message}`);
        
        const action = rotationConfig.action;
        if (action === "customCommand") {
            let command = rotationConfig.customCommand;
            command = command.replace(/{playerName}/g, player.name)
                             .replace(/{type}/g, type)
                             .replace(/{value}/g, String(value));
            try {
                world.overworld.runCommandAsync(command);
                logDebug(`[RotationCheck] Executed custom command for ${player.name}: ${command}`);
            } catch(e) {
                logDebug(`[RotationCheck] Error executing custom command for ${player.name}: ${e}`);
            }
        }
        // Add other actions like "teleportBack" if desired
    }
}
