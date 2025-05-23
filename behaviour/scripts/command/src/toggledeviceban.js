import { PlatformType, world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"toggledeviceban",
    description:"<device name | Desktop | Console | Mobile | View> Toggles a device ban",
    run: (data) => {
        try {
            const {player,args} = data;
            
            const setDeviceBan = args.slice(1).join(" ").trim().toLowerCase();
            
            const devices = {
                "pc": PlatformType.Desktop,
                "desktop": PlatformType.Desktop,
                "computer": PlatformType.Desktop,
                "console": PlatformType.Console,
                "phone": PlatformType.Mobile,
                "mobile": PlatformType.Mobile,
                "view": "view"
            }
            if (!Object.keys(devices).includes(setDeviceBan)) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Supported devices: §eDesktop, Console, Mobile`);
                return;
            }

            const deviceTarget = devices[setDeviceBan];
            let bannedDevices = world.safeguardDeviceBan; // This is already an array due to initialization changes

            if(deviceTarget === "view"){
                // PlatformType values are numbers, map them to human-readable names for display
                const platformTypeNames = {
                    [PlatformType.Desktop]: "Desktop",
                    [PlatformType.Console]: "Console",
                    [PlatformType.Mobile]: "Mobile",
                    [PlatformType.Unknown]: "Unknown" 
                };
                const displayNames = bannedDevices.map(id => platformTypeNames[id] || id.toString());
                player.sendMessage(`§6[§eSafeGuard§6]§f These devices are currently banned: §e${displayNames.join(', ')}`);
                return;
            }

            const deviceIndex = bannedDevices.indexOf(deviceTarget);

            if(deviceIndex > -1){ // Device is currently banned, so unban it
                bannedDevices.splice(deviceIndex, 1);
                player.sendMessage(`§6[§eSafeGuard§6]§f Successfully removed device §e${setDeviceBan}§f from the device bans`);
            }
            else{ // Device is not banned, so ban it
                bannedDevices.push(deviceTarget);
                player.sendMessage(`§6[§eSafeGuard§6]§f Successfully added device §e${setDeviceBan}§f to the device bans`);
                player.sendMessage(`§6[§eSafeGuard§6] §4Warning!§c You just banned this device from joining, there is §lno whitelist for players§r§c, if you'd like to unban the device run this command again with the same device type.`);
            }
            
            world.safeguardDeviceBan = bannedDevices; // Update the global variable
            world.setDynamicProperty("safeguard:deviceBan", JSON.stringify(world.safeguardDeviceBan)); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][toggledeviceban]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to toggle device ban. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][toggledeviceban] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})