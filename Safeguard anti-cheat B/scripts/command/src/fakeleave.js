import { newCommand } from '../handle';

newCommand({
    name:"fakeleave",
    description: "Simulate leaving the realm",
    run: (data) => {
        data.player.runCommandAsync("function admin_cmds/fake_leave");
    }
})