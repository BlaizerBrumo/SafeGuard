import { newCommand } from '../handle';

newCommand({
    name:"fakeleave",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/fake_leave");
    }
})