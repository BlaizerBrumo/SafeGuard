import { addPlayerToUnbanQueue, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unban",
    description:"<player> Unbans a player",
    run: (data) => {
        const {player} = data;
        const setNameUnban = data.args.slice(1).join(" ").replace(/["@]/g, "");
        
        addPlayerToUnbanQueue(player,setNameUnban);
    }
})