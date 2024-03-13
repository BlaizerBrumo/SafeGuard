import { newCommand } from '../handle';
import config from '../../config';

newCommand({
    name:"help",
    run: (data) => {
        //TODO: change this to work somehow else because this is not a-okay
        data.player.sendMessage(`§l§aPREFIX:§2 §r${config.chat.prefix}\n§l§aCOMMANDS:\n§r§eban <player name> §r|| to ban a person\n§einvsee <player name> §r|| see inventory of a player\n§ecopyinv <player name> §r|| copy inventory of a player to yours\n§emute <player name> §r|| mute a player\n§eunmute <player name>§r || unmute a player\n§eworldborder [border] §r|| get or set the world border\n§evanish §r|| toggle vanish mode\n§eclearchat §r|| clear the chat\n§efakeleave §r|| simulate leaving the realm\n§efakeleave_server §r|| simulate leaving the server\n§esummon_npc §r|| summon an NPC\n§enotify §r|| toggle anticheat notifications\n§elagclear §r|| clear lag\n§eunban <player name> §r|| unban a player`)
    }
})