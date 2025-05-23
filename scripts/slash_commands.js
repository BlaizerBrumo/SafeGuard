import * as Minecraft from '@minecraft/server';
import { logDebug, getPlayerByName, sendMessageToAllAdmins } from './assets/util.js';
import * as config from './config.js';

const world = Minecraft.world;

// Function to get player display name or server name for logging/messages
function getCommandExecutorName(origin) {
    if (origin instanceof Minecraft.Player) {
        return origin.name;
    }
    return "Server"; // Or any placeholder for console/command blocks
}

if (Minecraft.world.commands) {
    // Existing /sg:offlineunban command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:offlineunban",
            description: "Removes a player from the global ban list (offline).",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [{
                name: "playerName",
                type: Minecraft.CustomCommandParamType.String,
                description: "The exact name of the player to remove from the offline ban list."
            }],
            optionalParameters: []
        }, (origin, args) => {
            const targetName = args.playerName;
            const gbanListString = world.getDynamicProperty("safeguard:gbanList");
            let gbanList = [];
            if (typeof gbanListString === 'string') {
                try {
                    gbanList = JSON.parse(gbanListString);
                    if (!Array.isArray(gbanList)) gbanList = [];
                } catch (e) {
                    logDebug("Failed to parse dynamic global ban list for /sg:offlineunban:", e);
                    gbanList = [];
                }
            }
            const playerIndex = gbanList.findIndex(entry => 
                (typeof entry === 'string' && entry === targetName) || 
                (typeof entry === 'object' && entry.name === targetName)
            );
            if (playerIndex === -1) {
                const message = `§cPlayer ${targetName} is not on the offline ban list.`;
                if (origin instanceof Minecraft.Player) origin.sendMessage(message); else console.warn(message.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }
            gbanList.splice(playerIndex, 1);
            world.setDynamicProperty("safeguard:gbanList", JSON.stringify(gbanList));
            const successMessage = `§aPlayer ${targetName} has been removed from the offline ban list.`;
            if (origin instanceof Minecraft.Player) origin.sendMessage(successMessage); else console.warn(successMessage.replace(/§[0-9a-fk-or]/g, ''));
            const adminName = getCommandExecutorName(origin);
            logDebug(`[OfflineUnban] ${adminName} removed ${targetName} from the offline ban list via slash command.`);
        });
        logDebug("[SafeGuard] Registered /sg:offlineunban command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:offlineunban command:", e);
    }

    // Existing /sg:ban command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:ban",
            description: "Permanently bans an online player, optionally specifying a reason.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [{
                name: "targetPlayerName",
                type: Minecraft.CustomCommandParamType.Player, 
                description: "Name of the player to ban."
            }],
            optionalParameters: [{
                name: "reason",
                type: Minecraft.CustomCommandParamType.String,
                description: "Reason for the ban."
            }]
        }, (origin, args) => {
            const adminPlayer = (origin instanceof Minecraft.Player) ? origin : null;
            const targetPlayers = args.targetPlayerName;
            if (!targetPlayers || targetPlayers.length === 0) {
                if (adminPlayer) adminPlayer.sendMessage("§cTarget player not found or specified.");
                else console.warn("Target player not found or specified for /sg:ban.");
                return;
            }
            const targetPlayer = targetPlayers[0];
            let reason = args.reason ? args.reason.trim() : "No reason provided.";
            const adminName = getCommandExecutorName(origin);
            if (adminPlayer && targetPlayer.name === adminPlayer.name) {
                adminPlayer.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);
                return;
            }
            if (adminPlayer) {
                adminPlayer.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}§f for: ${reason}`);
            } else { 
                console.warn(`[SafeGuard] Successfully banned ${targetPlayer.name} for: ${reason} (executed by ${adminName})`);
            }
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${adminName}§f banned §e${targetPlayer.name}§f for: ${reason}!`, true, adminPlayer);
            try {
                 world.getDimension(targetPlayer.dimension.id).runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason}\n§4Banned by: §c${adminName}`);
            } catch(err) {
                logDebug(`[SafeGuard] Failed to kick ${targetPlayer.name} during ban: ${err}`);
            }
            targetPlayer.ban(reason, true, adminName); 
            logDebug(`[SafeGuard] ${adminName} banned ${targetPlayer.name} via /sg:ban. Reason: ${reason}`);
        });
        logDebug("[SafeGuard] Registered /sg:ban command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:ban command:", e);
    }
    
    // Existing /sg:version command
     try {
        Minecraft.world.commands.registerCommand({
            name: "sg:version",
            description: "Displays the current version of the SafeGuard pack.",
            permissionLevel: Minecraft.CommandPermissionLevel.Any,
            mandatoryParameters: [],
            optionalParameters: []
        }, (origin, args) => {
            const versionMessage = `§r§6[§eSafeGuard§6]§f Version: §ev${config.default.version}`;
            if (origin instanceof Minecraft.Player) {
                origin.sendMessage(versionMessage);
            } else {
                console.warn(versionMessage.replace(/§[0-9a-fk-or]/g, '')); 
            }
        });
        logDebug("[SafeGuard] Registered /sg:version command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:version command:", e);
    }

    // Existing /sg:offlineban command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:offlineban",
            description: "Adds a player to the global ban list (offline). They will be banned on next join.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin, 
            mandatoryParameters: [{
                name: "playerName",
                type: Minecraft.CustomCommandParamType.String, 
                description: "The exact name of the player to offline ban."
            }],
            optionalParameters: [{
                name: "reason",
                type: Minecraft.CustomCommandParamType.String,
                description: "Reason for the offline ban (stored with the ban)."
            }]
        }, (origin, args) => {
            const targetName = args.playerName;
            const reason = args.reason || "No reason provided";
            const adminName = getCommandExecutorName(origin);
            const gbanListString = world.getDynamicProperty("safeguard:gbanList");
            let gbanList = [];
            if (typeof gbanListString === 'string') {
                try {
                    gbanList = JSON.parse(gbanListString);
                    if (!Array.isArray(gbanList)) gbanList = [];
                } catch (e) {
                    logDebug("Failed to parse dynamic global ban list for /sg:offlineban:", e);
                    gbanList = [];
                }
            }
            const isAlreadyBanned = gbanList.some(entry => 
                (typeof entry === 'string' && entry === targetName) || 
                (typeof entry === 'object' && entry.name === targetName)
            );
            if (isAlreadyBanned) {
                const message = `§cPlayer ${targetName} is already on the offline ban list.`;
                if (origin instanceof Minecraft.Player) origin.sendMessage(message); else console.warn(message.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }
            gbanList.push({ name: targetName, reason: reason, bannedBy: adminName, date: Date.now() });
            world.setDynamicProperty("safeguard:gbanList", JSON.stringify(gbanList));
            const successMessage = `§aPlayer ${targetName} has been added to the offline ban list. Reason: ${reason}`;
            if (origin instanceof Minecraft.Player) origin.sendMessage(successMessage); else console.warn(successMessage.replace(/§[0-9a-fk-or]/g, ''));
            logDebug(`[OfflineBan] ${adminName} added ${targetName} to the offline ban list via slash command. Reason: ${reason}`);
        });
        logDebug("[SafeGuard] Registered /sg:offlineban command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:offlineban command:", e);
    }

    // Existing /sg:setrank command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:setrank",
            description: "<playerName> <rankId> - Sets a player's rank.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [
                { name: "targetPlayerName", type: Minecraft.CustomCommandParamType.Player, description: "Player to set rank for." },
                { name: "rankId", type: Minecraft.CustomCommandParamType.String, description: "ID of the rank (e.g., owner, admin, member)." }
            ],
            optionalParameters: []
        }, (origin, args) => {
            const targetPlayers = args.targetPlayerName; // Array of Player objects
            const rankIdInput = args.rankId.toLowerCase();
            const executorName = getCommandExecutorName(origin);

            if (!targetPlayers || targetPlayers.length === 0) {
                const msg = "§cTarget player not found or specified for /sg:setrank.";
                if (origin instanceof Minecraft.Player) origin.sendMessage(msg);
                else console.warn(msg.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }
            const targetPlayer = targetPlayers[0]; // Use the first player found

            const validRankIds = Object.keys(config.default.ranks);
            if (!validRankIds.includes(rankIdInput)) {
                const msg = `§cInvalid rankId "${rankIdInput}". Valid ranks are: ${validRankIds.join(", ")}.`;
                if (origin instanceof Minecraft.Player) origin.sendMessage(msg);
                else console.warn(msg.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }

            targetPlayer.setDynamicProperty("safeguard:rankId", rankIdInput);
            const rankName = config.default.ranks[rankIdInput]?.name || rankIdInput;

            const successMsgToOrigin = `§aSuccessfully set ${targetPlayer.name}'s rank to ${rankName}.`;
            if (origin instanceof Minecraft.Player) origin.sendMessage(successMsgToOrigin);
            else console.warn(successMsgToOrigin.replace(/§[0-9a-fk-or]/g, ''));
            
            targetPlayer.sendMessage(`§aYour rank has been set to ${rankName} by ${executorName}.`);
            logDebug(`[SetRank] ${executorName} set ${targetPlayer.name}'s rank to ${rankIdInput} (${rankName}) via /sg:setrank.`);
        });
        logDebug("[SafeGuard] Registered /sg:setrank command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:setrank command:", e);
    }

    // Existing /sg:clearbanlogs command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:clearbanlogs",
            description: "Clears all ban logs stored by SafeGuard.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [],
            optionalParameters: []
        }, (origin, args) => {
            world.setDynamicProperty("safeguard:banLogs", undefined);
            
            const feedbackMessage = "§6[§eSafeGuard§6]§f The ban logs were successfully cleared";
            if (origin instanceof Minecraft.Player) {
                origin.sendMessage(feedbackMessage);
            } else {
                console.warn(feedbackMessage.replace(/§[0-9a-fk-or]/g, ''));
            }
            const executorName = getCommandExecutorName(origin);
            logDebug(`[ClearBanLogs] ${executorName} cleared all ban logs via /sg:clearbanlogs.`);
        });
        logDebug("[SafeGuard] Registered /sg:clearbanlogs command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:clearbanlogs command:", e);
    }

    // Existing /sg:clearchat command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:clearchat",
            description: "Clears the chat for all players.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [],
            optionalParameters: []
        }, (origin, args) => {
            const executorName = getCommandExecutorName(origin);
            try {
                if (origin instanceof Minecraft.Player) {
                    origin.runCommandAsync("function admin_cmds/clearchat");
                } else {
                    world.getDimension("overworld").runCommandAsync("function admin_cmds/clearchat");
                }
                logDebug(`[ClearChat] ${executorName} cleared the chat via /sg:clearchat.`);
            } catch (runCmdError) {
                logDebug(`[ClearChat] Failed to execute clear chat function for ${executorName}: ${runCmdError}`);
                if (origin instanceof Minecraft.Player) {
                    origin.sendMessage("§cError trying to clear chat.");
                } else {
                    console.warn("Error trying to clear chat via server console.");
                }
            }
        });
        logDebug("[SafeGuard] Registered /sg:clearchat command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:clearchat command:", e);
    }

    // New /sg:clearwarn command
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:clearwarn",
            description: "Clears a player's warnings.",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [
                { name: "targetPlayerName", type: Minecraft.CustomCommandParamType.Player, description: "Player whose warnings to clear." }
            ],
            optionalParameters: []
        }, (origin, args) => {
            const adminPlayer = (origin instanceof Minecraft.Player) ? origin : null;
            const targetPlayers = args.targetPlayerName; // Array of Player objects

            if (!targetPlayers || targetPlayers.length === 0) {
                const msg = "§cTarget player not found or specified for /sg:clearwarn.";
                if (adminPlayer) adminPlayer.sendMessage(msg);
                else console.warn(msg.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }
            const targetPlayer = targetPlayers[0]; // Use the first player found

            // Check if targetPlayer.hasAdmin() exists and if it's true
            if (typeof targetPlayer.hasAdmin === 'function' && targetPlayer.hasAdmin()) {
                 const msg = "§cCan't clear warnings of an admin.";
                 if (adminPlayer) adminPlayer.sendMessage(msg);
                 else console.warn(msg.replace(/§[0-9a-fk-or]/g, ''));
                 return;
            }

            // Assuming targetPlayer.clearWarnings() is a custom method
            if (typeof targetPlayer.clearWarnings === 'function') {
                targetPlayer.clearWarnings();
            } else {
                logDebug(`[ClearWarn] targetPlayer.clearWarnings is not a function for ${targetPlayer.name}. Attempting to set dynamic property safeguard:warnings to undefined.`);
                targetPlayer.setDynamicProperty("safeguard:warnings", undefined); 
            }
            
            const executorName = getCommandExecutorName(origin);
            const successMsgToAdmins = `§6[§eSafeGuard Notify§6]§e ${executorName} §fcleared the warnings of the player§e ${targetPlayer.name}! §r`;
            sendMessageToAllAdmins(successMsgToAdmins, true, adminPlayer);

            const successMsgToOrigin = `§6[§eSafeGuard§6]§f Successfully cleared warnings for ${targetPlayer.name}`;
            if (adminPlayer) {
                adminPlayer.sendMessage(successMsgToOrigin);
            } else {
                console.warn(successMsgToOrigin.replace(/§[0-9a-fk-or]/g, '') + ` (executed by ${executorName})`);
            }
            logDebug(`[ClearWarn] ${executorName} cleared warnings for ${targetPlayer.name} via /sg:clearwarn.`);
        });
        logDebug("[SafeGuard] Registered /sg:clearwarn command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:clearwarn command:", e);
    }

} else {
    logDebug("[SafeGuard] CustomCommandRegistry not available, skipping all slash command registrations.");
}
