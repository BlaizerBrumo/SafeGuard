import { newCommand } from '../handle';

newCommand({
    name:"notify",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/notify");
    }
})