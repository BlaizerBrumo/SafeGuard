import { world } from "@minecraft/server";

/**
 * @minecraft/server 2.10.0-beta rejects writes of custom properties directly onto a Player
 * instance ("'x' is read-only" TypeError) - only the shared Player.prototype default is
 * writable. This module is the replacement: per-player state
 * lives here instead, keyed by player.id. Anything that must survive a reload/restart still
 * belongs in a dynamic property (bans, mutes, warnings, freeze status), not here.
 */

const stateByPlayerId = new Map();

function makeDefaultState() {
	return {
		initialClick: 0,
		finalCps: 0,
		currentCps: 0,
		hitEntities: [],
		registerValidCoords: true,
		isMuted: false,
		lastValidCoords: undefined,
		blocksBroken: 0,
		combatLogTimer: null,
		combatLogWarningDisplayed: false,
		currentGamemode: undefined,
		lastMessage: undefined,
		lastMessageDate: 0,
		scaffoldChecks: 0,
		fovLastAlertTime: 0,
		fovPlacementLastAlertTime: 0,
		totemOffhandPresent: false,
		totemLastPopTick: 0,
		totemPreviousTicksToRetotem: null,
		totemConsistentStreak: 0,
		totemFastSwapStreak: 0,
		totemPopsRecorded: 0,
		totemTicksToRetotemSum: 0,
		totemTicksToRetotemCount: 0,
		lastThrowableUseTime: 0,
		throwableIntervalSum: 0,
		throwableIntervalCount: 0,
		throwableSpamDetections: 0,
		lastEndCrystalItemUseTick: 0,
		autoCrystalStreak: 0,
		lastHitEntityTick: 0,
		lastStartBreakBlockTick: 0,
		lastSwingTick: 0,
		borderPushStreak: 0,
		lastBorderPushTime: 0,
	};
}

/**
 * @param {import("@minecraft/server").Player} player
 * @returns {ReturnType<typeof makeDefaultState>}
 */
export function getPlayerState(player) {
	let state = stateByPlayerId.get(player.id);
	if (!state) {
		state = makeDefaultState();
		stateByPlayerId.set(player.id, state);
	}
	return state;
}

export function clearPlayerState(player) {
	stateByPlayerId.delete(player.id);
}

world.afterEvents.playerLeave.subscribe((data) => {
	stateByPlayerId.delete(data.playerId);
});
