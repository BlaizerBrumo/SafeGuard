import { newCommand } from '../handle';

newCommand({
    name:"notify",
    description:"Toggle anticheat notifications",
    run: (data) => {
        data.player.runCommand("function admin_cmds/notify");
    }
})