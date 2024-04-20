import { newCommand } from '../handle';

newCommand({
    name:"lagclear",
    description:"Clears lag by killing entities",
    run: (data) => {
        data.player.runCommandAsync("function anti/anti_lag");
    }
})