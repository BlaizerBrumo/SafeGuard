import { newCommand } from '../handle';
import * as config from '../../config';

// Define a reusable function to get the version message
export function getSafeGuardVersionMessage() {
    return `§r§6[§eSafeGuard§6]§f Version: §ev${config.default.version}`;
}

newCommand({
    name:"version",
    description: "Shows the pack version",
    adminOnly: false,
    run: (data) => {
        data.player.sendMessage(getSafeGuardVersionMessage());
    }
})