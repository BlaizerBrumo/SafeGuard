import { unban } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unban",
    run: (data) => {
        const setNameUnban = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		unban(data.player,setNameUnban);
    }
})