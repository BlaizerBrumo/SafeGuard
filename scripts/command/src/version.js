import { newCommand } from '../handle';
import * as config from '../../config';

newCommand({
    name:"version",
    description: "Shows the pack version",
    adminOnly: false,
    run: (data) => {
        data.player.sendMessage(`§r§6[§eSafeGuard§6]§f Version: §ev${config.default.version}`)
    }
})