//Edit items in this file if you want customization:
export default {

    //dev only don't touch
    "debug": false,


    "combat": {
        "autoclicker":{
            //if player cps go over this number, player gets flagged for autoclicker
            "maxCps": 12
        },
        "killaura":{
            //if player attacks this or many more number of entities in a single tick, gets flagged for killaura
            "maxHitEntities": 2
        }
    },
    "item":{
        "anti_items":{
            //items flagged by anti-items
            //you can add your custom items here
            "bannedItems": ['minecraft:allow', 'minecraft:command_block', 'minecraft:repeating_command_block', 'minecraft:chain_command_block', 'minecraft:border_block', 'minecraft:mob_spawner', 'minecraft:command_block_minecart','minecraft:flowing_lava', 'minecraft:lava', 'minecraft:flowing_water', 'minecraft:water', 'minecraft:lit_redstone_lamp', 'minecraft:pistonarmcollision', 'minecraft:tripwire', 'minecraft:unpowered_comparator', 'minecraft:powered_comparator', 'minecraft:fire', 'minecraft:lit_furnace', 'minecraft:lit_redstone_ore', 'minecraft:unlit_redstone_torch', 'minecraft:portal','minecraft:structure_block', 'minecraft:powered_repeater', 'minecraft:invisiblebedrock','minecraft:bedrock', 'minecraft:wgateway', 'minecraft:end_portal', 'minecraft:end_portal_frame', 'minecraft:structure_void', 'minecraft:chalkboard', 'minecraft:bubble_column', 'minecraft:lit_smoker', 'minecraft:lava_cauldron', 'minecraft:jigsaw', 'minecraft:lit_blast_furnace', 'minecraft:light_block', 'minecraft:stickypistonarmcollision', 'minecraft:soul_fire', 'minecraft:lit_deepslate_redstone_ore', 'minecraft:camera', 'minecraft:deny', 'minecraft:barrier', 'minecraft:glowingobsidian', 'minecraft:glow_stick', 'minecraft:netherreactor', 'minecraft:info_update'],
            //items that were found with these words in the name or lore will get cleared and player will get flagged (you can also include symbols)
            //you can also remove all keywords if you don't want custom keyword detection
            "bannedKeyWords": ["horion","32k","nbt","hack","nested","cbe","nuker","illegal"],
            //the maximum length of an item name tag - 30 is the vanilla limit
            "maxItemNameLength": 30,
            //checks if an item has lore
            "antiLore": true
        }
    },
    "movement":{
        "fly":{
            //if the fall distance goes over this number player gets flagged for flying, increase to -11 or above if you are getting a lot of false positives
            "minFallDistance": -10
        }
    },
    "world":{
        "nuker":{
            //if player breaks this many or more blocks in a single tick, gets flagged for nuker 
            "maxBlocks": 3,
            //checks if admin players are using nuker (good for anti op abuse)
            "checkAdmins": true
        }
    },
    "chat":{
        //chat command prefix
        "prefix": "!",
        "spammer":{
            //minimum time between messages in milliseconds
            "minTime": 1500,
            //if a message starts with this word/symbol/letter or whatever you enter it won't be flagged for spam
            "whitelistedPrefixes": ["!","?"]
        }
    }
}