import { newCommand } from '../handle';

newCommand({
    name:"summon_npc",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/summon_npc");
    }
})