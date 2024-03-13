import { newCommand } from '../handle';

newCommand({
    name:"clearchat",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/clearchat");
    }
})