import { newCommand } from '../handle';

newCommand({
    name:"fakeleave_server",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/fake_leave_server");
    }
})