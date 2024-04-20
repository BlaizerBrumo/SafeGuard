import { unban } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unban",
    description:"<player> Unbans a player",
    run: (data) => {
        const setNameUnban = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		unban(data.player,setNameUnban);
    }
})