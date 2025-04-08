import { newCommand } from '../handle';

newCommand({
    name:"clearchat",
    description: "Clear the chat",
    run: (data) => {
        data.player.runCommand("function admin_cmds/clearchat");
    }
})