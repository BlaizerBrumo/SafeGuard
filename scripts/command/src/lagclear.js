import { system, world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"lagclear",
    description:"Clears lag by killing entities",
    run: async (data) => {
        const { dimension } = data.player;

        world.sendMessage(`§6[§eSafeGuard§6]§r§a Ground items will be cleared in 10 seconds...`);

        await system.waitTicks(20 * 5);

        for (let seconds = 5; seconds >= 1; seconds--) {
            world.sendMessage(`§6[§eSafeGuard§6]§r§a Ground items will be cleared in ${seconds} seconds...`);
            await system.waitTicks(20);
        }

        const xpOrbs = dimension.getEntities({
            type: "xp_orb"
        });
        const entities_monsters = dimension.getEntities({
            families: ["monster"]
        });
        const arrows = dimension.getEntities({
            type: "arrow"
        });
        const areaEffectClouds = dimension.getEntities({
            type: "area_effect_cloud"
        });
        const items = dimension.getEntities({
            type: "item"
        });

        // Combine all entities to be removed
        const entitiesToKill = [...items, ...xpOrbs, ...entities_monsters, ...arrows, ...areaEffectClouds];
        const len = entitiesToKill.length;

        for (let i = 0; i < len; i++) {
            entitiesToKill[i].remove();
        }

        world.sendMessage("§6[§eSafeGuard§6]§r§a Lag cleared!§r");
    }
})