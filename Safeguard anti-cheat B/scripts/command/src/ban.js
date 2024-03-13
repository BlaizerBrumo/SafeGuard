import { canFindPlayer, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"ban",
    run: (data) => {
        let player = data.player;
        const setNameBan = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
        if (!canFindPlayer(setNameBan)) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameBan}§f was not found`);
            return;
        }
        if (getPlayerByName(setNameBan).hasTag("admin")) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't ban §e${setNameBan}§f, they're an admin.`);
            return;
        }
        player.runCommandAsync('tag "' + setNameBan +'" add Ban');
        player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${setNameBan}`);
        player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bbanned§l§5 ${setNameBan}! §r"}]}`);
    }
})