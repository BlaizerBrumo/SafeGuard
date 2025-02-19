import { newCommand } from '../handle';

newCommand({
    name:"removeowner",
    description:"Removes your owner status",
    ownerOnly: true,
    run: (data) => {
        const { player } = data;
        player.setDynamicProperty("safeguard:ownerStatus",false);
        player.sendMessage(`§6[§eSafeGuard§6]§f Your owner status was removed.`);
    }
})