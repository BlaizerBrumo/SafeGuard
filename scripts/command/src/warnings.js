import { newCommand } from '../handle';
import { getPlayerByName, logDebug } from '../../assets/util';
import { SafeguardModule } from '../../classes/module';

newCommand({
    name: "warnings",
    description: "<player> List the player's warnings",
    run: (data) => {
        const { player, args } = data;

        const setName = args.slice(1).join(" ").replace(/["@]/g, "");

        const targetPlayer = getPlayerByName(setName);

        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);

        if (targetPlayer.hasAdmin()) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the warnings of §e${targetPlayer.name}§f, they're an admin.`);
            return;
        }
        player.sendMessage(`§6[§eSafeGuard§6]§f ${targetPlayer.name} warnings count:`);
        
        const warnings = targetPlayer.getWarnings(); 
        const moduleKeys = SafeguardModule.getValidModules(true);

        player.sendMessage(`§6[§eSafeGuard§6]§f Manual §eWarnings by Admins§f: §e${warnings["manual"] ?? 0}`)
        for(let i = 0; i < moduleKeys.length; i++){
            player.sendMessage(`§6[§eSafeGuard§6]§f Module §e${SafeguardModule.Modules[SafeguardModule.getModuleID(moduleKeys[i])]}§f: §e${warnings[SafeguardModule.getModuleID(moduleKeys[i])] ?? 0}`);
        }

    }
})