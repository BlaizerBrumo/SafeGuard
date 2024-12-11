import { world } from "@minecraft/server";
import { newCommand } from '../handle';

let devicebanlist = [];
newCommand({
    name: "dtban",
    description: "<ban/unban/list> <device type> Manages device bans",
    run: (data) => {
        const { player } = data;
        const args = data.args.slice(1);

        if (!player.hasTag("admin")) return;

        if (args[0] === "ban") {
            const deviceType = args[1];
            devicebanlist.push(deviceType);
            world.setDynamicProperty("dbl", `[${devicebanlist.join(", ")}]`)
            player.sendMessage(`Platform "${deviceType}" Banned`);
        } else if (args[0] === "unban") {
            const deviceType = args[1];
            if (!devicebanlist.includes(deviceType)) {
                player.sendMessage(`Device Type "${deviceType}" not found in banned list`);
            } else {
                devicebanlist = devicebanlist.filter(x => x !== deviceType);
                world.setDynamicProperty("dbl", `[${devicebanlist.join(", ")}]`)
                player.sendMessage(`Platform "${deviceType}" Unbanned`);
            }
        } else if (args[0] === "list") {
            player.sendMessage(`List of banned devices: [${devicebanlist.join(", ")}]`);
        } else {
            player.sendMessage(`§6[§eSafeGuard§6]§f Invalid command. Use ban, unban, or list.`);
        }
    }
});
