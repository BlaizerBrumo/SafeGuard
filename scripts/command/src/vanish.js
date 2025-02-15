import { newCommand } from '../handle';

newCommand({
    name:"vanish",
    description:"Toggles vanish mode",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/vanish");
    }
})