import { newCommand } from '../handle';

newCommand({
    name:"lagclear",
    run: (data) => {
        data.player.runCommandAsync("function anti/anti_lag");
    }
})