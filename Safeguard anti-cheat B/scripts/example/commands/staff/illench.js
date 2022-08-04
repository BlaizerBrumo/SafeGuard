//bridge-file-version: #0
import { Server } from '../../../library/Minecraft.js';
import scoreboard from '../../../library/scoreboard.js'
const registerInformation = {
    cancelMessage: true,
    name: 'illench',
    staff: 'true',
    description: 'Enables / disables illegal enchantment detection',
    usage: '[ on | off ]',
    example: [
        'illench',
        'illench on',
        'illench off',
    ]
};

let sbtoggle = scoreboard.objective.for('EBMT').dummies
sbtoggle.useCache(false)

/** @type {number} */
let toggle = sbtoggle.get('value') ?? ( sbtoggle.set('value', 1), 1 )

import { ItemStack, MinecraftEnchantmentTypes, MinecraftItemTypes, world } from 'mojang-minecraft';

const overworld = world.getDimension('overworld')

/** @type {{[k: string]: {[k: string]: number}}} */
const enchantmentDefs = {
    0: {},
    1: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        aquaAffinity: 1,
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    2: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    4: {
        protection: 4,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        depthStrider: 3,
        unbreaking: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        soulSpeed: 3
    },
    8: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        unbreaking: 3,
        swiftSneak: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    15: {
        protection: 4,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        depthStrider: 3,
        aquaAffinity: 1,
        unbreaking: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        soulSpeed: 3
    },
    16: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        knockback: 2,
        fireAspect: 2,
        looting: 3,
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    32: {
        unbreaking: 3,
        power: 5,
        punch: 2,
        flame: 1,
        infinity: 1,
        mending: 1,
        vanishing: 1
    },
    64: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    128: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    256: {
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    512: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    1024: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    2048: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    3648: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    4096: { 
        unbreaking: 3,
        luckOfTheSea: 3,
        lure: 3,
        mending: 1,
        vanishing: 1
    },
    8192: { 
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    16384: { 
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    32768: {
      unbreaking: 3,
      mending: 1,
      vanishing: 1,
      impaling: 5,
      riptide: 3,
      loyalty: 3,
      channeling: 1
    },
    65536: {
      unbreaking: 3,
      mending: 1,
      vanishing: 1,
      multishot: 1,
      piercing: 4,
      quickCharge: 3
    },
    131072: {
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    131520: {
      efficiency: 5,
      silkTouch: 1,
      unbreaking: 3,
      fortune: 3,
      mending: 1,
      vanishing: 1
    },
    262144: {
        binding: 1,
        vanishing: 1
    },
    '-1': {
        protection: 4,
        swiftSneak: 3,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        depthStrider: 3,
        aquaAffinity: 1,
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        knockback: 2,
        fireAspect: 2,
        looting: 3,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        power: 5,
        punch: 2,
        flame: 1,
        infinity: 1,
        luckOfTheSea: 3,
        lure: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        impaling: 5,
        riptide: 3,
        loyalty: 3,
        channeling: 1,
        multishot: 1,
        piercing: 4,
        quickCharge: 3,
        soulSpeed: 3
    }
}

const allEnchantments = Object.values(MinecraftEnchantmentTypes)
const air = new ItemStack(MinecraftItemTypes.air, 0, 0)

world.events.tick.subscribe(() => {
    if (!toggle) return
    for (let plr of world.getPlayers()) {
        if (plr.hasTag('admin')) continue
        let c = plr.getComponent('inventory').container
        for (let i = 0, m = c.size; i < m; i++) {
            let item = c.getItem(i)
            if (item === undefined) continue
            let enchantment = item.getComponent('enchantments').enchantments
            let enchlist = enchantmentDefs[enchantment.slot]
            let verify = false;
            for ( let ench of allEnchantments ) {
                let enchLvl = enchantment.hasEnchantment(ench),
                    maxLvl = enchlist[ench.id] ?? 0
                if ( enchLvl > maxLvl ) {
                    verify = true;
                    
                    plr.tellraw(`§6[§eSafeGuard§6]§r§c§l ${plr.name} §r§4has §cillegal enchantment §4detected §e${item.id.replace('minecraft:', '')} §4in their inventory: §e${ench.id} §b[§e${enchLvl}§7/§e${maxLvl}§b]`);
                    c.setItem(i, air);
                }
            }
            if(verify === true) {
                plr.runCommand(`execute ${plr.name} ~~~  function punishment/warning/ill_warning`);
            }
        }
    }
})

Server.command.register(registerInformation, (chatmsg, args) => {
    const sender = chatmsg.sender
    try {
        if (sender.hasTag('admin')) {
            if (!args[0]) return sender.tellraw(`§6[§eSafeGuard§6]§r§b§l Illegal enchantment detection status: ${toggle ? '§aENABLED' : '§cDISABLED'}`)
            switch (args[0]) {
                case 'on':
                case 'enable': {
                    sender.runCommand(`scoreboard players set illenchdummy illench 1`)
                    sender.runCommand(`scoreboard players operation @a illench = illenchdummy illench`)
                    sender.tellraw(`§¶§cIllegal§b enchantment detection has been §aENABLED`)
                    sbtoggle.set('value', toggle = 1)
                }; break

                case 'off':
                case 'disable': {
                    sender.runCommand(`scoreboard players set illenchdummy illench 0`)
                    sender.runCommand(`scoreboard players operation @a illench = illenchdummy illench`)
                    sender.tellraw(`§¶§cIllegal§b enchantment detection has been §cDISABLED`)
                    sbtoggle.set('value', toggle = 0)
                }; break

                default:
                    return plr.tellraw(`§6[§eSafeGuard§6]§r§c§l §c§lError: Invalid argument ${args[0]}`)
            }
        } else {
            sender.tellraw(`§6[§eSafeGuard§6]§r§4§l You have to be admin tagged to use this!`);
        }
    } catch(e) {
        console.warn(`${e}\n${e?.stack}`)
    }
});
