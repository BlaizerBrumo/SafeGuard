import { newCommand } from '../handle';

newCommand({
    name:"vanish",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/vanish");
    }
})