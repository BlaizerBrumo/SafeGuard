//Edit items in this file if you want customization:
export default {
    "version": "2.0.2",
    //the owner password to edit config in game
    "OWNER_PASSWORD": "password",
    "ranks": {
        "owner": {
            "name": "Owner",
            "displayText": "§c[Owner]",
            "nameColor": "§c",
            "messageColor": "§f",
            "permissionsLevel": 4,
            "id": "owner"
        },
        "admin": {
            "name": "Admin",
            "displayText": "§6[Admin]",
            "nameColor": "§6",
            "messageColor": "§f",
            "permissionsLevel": 3,
            "id": "admin"
        },
        "staff": {
            "name": "Staff",
            "displayText": "§e[Staff]",
            "nameColor": "§e",
            "messageColor": "§f",
            "permissionsLevel": 2,
            "id": "staff"
        },
        "donator": {
            "name": "Donator",
            "displayText": "§b[Donator]",
            "nameColor": "§b",
            "messageColor": "§f",
            "permissionsLevel": 1,
            "id": "donator"
        },
        "member": {
            "name": "Member",
            "displayText": "§a[Member]",
            "nameColor": "§a",
            "messageColor": "§f",
            "permissionsLevel": 0,
            "id": "member"
        }
    },
    "defaultRank": "member",
    "other":{
        //dev stuff
        "consoleDebugMode": true,
        //wether to send detection alerts to everyone(true) or just to admins (false)
        "sendAlertsToEveryone": true,
        //if only owner status players can edit modules
        "ownerOnlySettings": false

    },
    "combat": {
        "autoclicker":{
            //if player cps go over this number, player gets flagged for autoclicker
            "maxCps": 17
        },
        "killaura":{
            //if player attacks this or many more number of entities in a single tick, gets flagged for killaura
            "maxHitEntities": 2
        },
        "combatLogging":{
            //how many milliseconds player will stay in combat after last damage they received from a player
            //this is set to 15 seconds by default
            "timeToStayInCombat": 15000,
            //punishment for when player is detected combat logging
            //0 - send alert to everyone, do nothing
            //1 - kill player
            //2 - clear inventory
            //3 - ban player (duration specified in "punishmentTime")
            "punishmentType": 3,
            //enabling this will send an alert when player combat logs to everyone in game
            "alwaysSendAlert": false,
            //valid input: <number> <day|hour|minute>
            "punishmentTime": "15 minute",
            //if admins don't get affected by anti combatlogging
            "adminsBypass": false
        },
        "reachCheck": {
            "enabled": true,
            "maxHitDistanceSurvival": 3.5,
            "maxHitDistanceCreative": 6.0,
            "checkBlockBreak": true,
            "maxBlockBreakDistanceSurvival": 5.0,
            "maxBlockBreakDistanceCreative": 7.0,
            "checkBlockPlace": true,
            "maxBlockPlaceDistanceSurvival": 5.0,
            "maxBlockPlaceDistanceCreative": 7.0,
            "violationThreshold": 5,
            "action": "alert",
            "customCommand": "say {playerName} might be using Reach ({reachType})!"
        },
        "noSwingCheck": {
            "enabled": true,
            "violationThreshold": 3,
            "action": "alert", 
            "customCommand": "say {playerName} might be using NoSwing!",
            "maxTimeSinceSwingMs": 750 
        },
        "contextualKillauraCheck": {
            "enabled": true,
            "checkWhileUsingItem": true, 
            "checkWhileSleeping": true,  
            "checkWhileChestOpen": true, 
            "violationThreshold": 3,
            "action": "alert", 
            "customCommand": "say {playerName} might be using Killaura (Invalid Context)!"
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
            //the anticheat checks for sudden changes in player velocity
            //for example if it suddenly jumps from -4 to 6, the threshold determines how high that difference can be
            "maxYVelocityThreshold": 8
        }
    },
    "world":{
        "endLock":{
            //wether admin players can go into the end even if the lock is enabled
            "adminsBypass": false
        },
        "netherLock": {
            //wether admin players can go into the nether even if the lock is enabled
            "adminsBypass": false
        },
        "nuker":{
            //if player breaks this many or more blocks in a single tick, gets flagged for nuker 
            "maxBlocks": 3,
            //checks if admin players are using nuker (good for anti op abuse)
            "checkAdmins": true,
            //blocks that are excluded from nuker check because they are instant broken
            "blockExceptions": ["minecraft:sea_pickle","minecraft:sugar_cane","minecraft:deadbush","minecraft:horn_coral","minecraft:coral_fan","minecraft:coral_fan_dead","minecraft:brain_coral","minecraft:bubble_coral","minecraft:dead_brain_coral","minecraft:dead_bubble_coral","minecraft:dead_fire_coral","minecraft:dead_horn_coral","minecraft:dead_tube_coral","minecraft:fire_coral","minecraft:tube_coral","minecraft:red_flower","minecraft:yellow_flower","minecraft:grass","minecraft:seagrass","minecraft:netherrack","minecraft:torchflower","minecraft:sapling","minecraft:cherry_sapling","minecraft:tallgrass","minecraft:double_plant","minecraft:nether_sprouts"]
        },
        "worldborder":{
            //the minimum border size required, this is used so if a possible admin abuse or force op occurs hackers don't create a border of a size 1 block or less which
            //will teleport all the players up in the air constantly
            "minBorderDistance": 500,
            //if admins can go beyond world border
            "adminsBypassBorder": true,
        }
    },
    "itemInteractions": { 
        "fastUseCheck": {
            "enabled": true,
            "itemSpecificCooldowns": {
                "minecraft:ender_pearl": 1000, 
                "minecraft:snowball": 200,    
                "minecraft:egg": 200,         
                "minecraft:splash_potion": 800, 
                "minecraft:lingering_potion": 800, 
                "minecraft:experience_bottle": 200, 
                "minecraft:fishing_rod": 500 
            },
            "foodCooldownMs": 1600, 
            "defaultCooldownMs": 300, 
            "violationThreshold": 5,
            "action": "alert", 
            "customCommand": "say {playerName} might be using FastUse for {itemName}!"
        }
    },
    "packetChecks": { 
        "invalidHeadRotationCheck": {
            "enabled": true,
            "minPitch": -90.0, 
            "maxPitch": 90.0,  
            "maxYawDeltaPerTick": 200.0, 
            "violationThreshold": 10, 
            "action": "alert", 
            "customCommand": "say {playerName} might have invalid head rotation!"
        }
    },
    "scaffoldCheck": {
        "enabled": true, 
        "existingRotationCheck": { 
             "enabled": true
        },
        "towerCheck": {
            "enabled": true,
            "maxBlocksPerSecond": 8, 
            "minSameXZCount": 3, 
            "violationThreshold": 2, 
            "action": "alert",
            "customCommand": "say {playerName} might be using Tower/Scaffold!"
        },
        "upwardsPlacementCheck": {
            "enabled": true,
            "minPitchLookingUp": -75.0, 
            "violationThreshold": 3,
            "action": "alert",
            "customCommand": "say {playerName} might be using Scaffold (Upwards Placement)!"
        },
        "downwardScaffoldCheck": {
            "enabled": true,
            "maxXZSpeedWhenNotSneaking": 0.2, 
            "minDownwardBlocks": 3, 
            "violationThreshold": 2,
            "action": "alert",
            "customCommand": "say {playerName} might be using Downward Scaffold!"
        }
    },
    "chat":{
        //chat command prefix
        "prefix": "!",
        "spammer":{
            //maximum amount characters the message can have before it's considered spam
            "maxMessageCharLimit": 512,
            //maximum amount of words the message can have before it's considered spam
            "maxMessageWordLimit": 512,
            //minimum time between messages in milliseconds
            "minTime": 1500,
            //if a message starts with this word/symbol/letter or whatever you enter it won't be flagged for spam
            "whitelistedPrefixes": ["!"]
        }
    },
    "aliases": {
        "b": "ban",
        "k": "kick",
        "m": "mute",
        "um": "unmute",
        "p": "pardon",
        "uban": "unban",
        "ofb": "offlineban",
        "ofub": "offlineunban",
        "sr": "setrank",
        "fl": "fakeleave",
        "cl": "lagclear",
        "cc": "clearchat",
        "ver": "version",
        "info": "systeminfo",
        "invs": "invsee",
        "h": "help",
        "cw": "clearwarn",
        "wn": "warn",
        "wns": "warnings",
        "fr": "freeze",
        "vn": "vanish",
        "ci": "copyinv",
        "wb": "worldborder"
    }
}