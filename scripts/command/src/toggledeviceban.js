import { PlatformType, world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"toggledeviceban",
    description:"<device name | Desktop | Console | Mobile | View> Toggles a device ban",
    run: (data) => {
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
        if (!Object.keys(devices).includes(setDeviceBan)) return player.sendMessage(`§6[§eSafeGuard§6]§f Supported devices: §eDesktop, Console, Mobile`);

        const deviceTarget = devices[setDeviceBan];
        let bannedDevices = world.safeguardDeviceBan;

        if(deviceTarget === "view"){
            return player.sendMessage(`§6[§eSafeGuard§6]§f These devices are currently banned: §e${bannedDevices.join(',')}`);
        }

        if(bannedDevices.includes(deviceTarget)){
            bannedDevices.splice(bannedDevices.indexOf(deviceTarget), 1);
            player.sendMessage(`§6[§eSafeGuard§6]§f Successfully removed device §e${deviceTarget}§f from the device bans`);
            world.safeguardDeviceBan = bannedDevices;
            world.setDynamicProperty("safeguard:deviceBan",world.safeguardDeviceBan.join(","));
            return;
        }
        else{
            world.safeguardDeviceBan.push(deviceTarget);
            player.sendMessage(`§6[§eSafeGuard§6]§f Successfully added device §e${deviceTarget}§f to the device bans`);
            player.sendMessage(`§6[§eSafeGuard§6] §4Warning!§c You just banned this device from joining, there is §lno whitelist for players§r§c, if you'd like to unban the device run this command again with the same device type.`);
            world.setDynamicProperty("safeguard:deviceBan",world.safeguardDeviceBan.join(','));
            return;
        }
    }
})