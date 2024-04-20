import { newCommand } from '../handle';

newCommand({
    name:"fakeleave_server",
    description: "Simulate leaving the server",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/fake_leave_server");
    }
})