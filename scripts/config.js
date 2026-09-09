//Edit items in this file if you want customization:
export default {
    "version": "2.1.0-beta",
    "debug": false,
    //the owner password to edit config in game
    "OWNER_PASSWORD": "",
    "other":{
        //dev stuff
        "consoleDebugMode": false,
        //wether to send detection alerts to everyone(true) or just to admins (false)
        "sendAlertsToEveryone": false,
        //if only owner status players can edit modules
        "ownerOnlySettings": false,
        "performance": {
            //how often (in ticks) to scan inventory/armor for invalid items
            "inventoryScanEveryTicks": 10
        },
        "autoMod": {
            //if true, players who keep getting flagged will be automatically temp banned
            "escalationEnabled": true,
            //how many times a player needs to be flagged before they get auto banned
            "detectionThreshold": 4,
            //how long (in ms) those flags are remembered before they reset
            "escalationWindowMs": 10 * 60 * 1000,
            //how long (in ms) the automatic ban lasts
            "banDurationMs": 30 * 24 * 60 * 60 * 1000
        }
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
        "noSwing":{
            //if a player attacks, places, or breaks something with no arm swing in this many ticks beforehand, gets flagged
            "thresholdTicks": 60,
            //how many ticks to wait before actually checking for no swing
            "verifyDelayTicks": 10
        },
        "fov":{
            //how far off (in degrees) a player's aim can be from their target when they hit them before it's flagged (higher is more lenient)
            "maxAngle": 80,
            //don't check hits closer than this many blocks
            "minDistance": 2,
            //minimum time (ms) between FOV alerts for the same player, so it doesn't spam
            "alertCooldownMs": 3000
        },
        "autoTotem":{
            //how fast (in ticks, 20 ticks = 1 second) a player can put a new totem in after using one before it's too fast for a human
            "minSwapTicks": 5,
            //how many times in a row a player has to swap that fast before its flagged
            "fastSwapStreakRequired": 2,
            //how many spawps in a row with same timing until flagged as consistent
            "consistentSwapsRequired": 3,
            //how close (in ticks) two swap speeds need to be to count as "the same speed" for the setting above
            "tickTolerance": 1
        },
        "antiFastUse":{
            //which items this check applies to
            "items": ["minecraft:splash_potion", "minecraft:lingering_potion", "minecraft:experience_bottle", "minecraft:snowball"],
            //throwing one of the items above faster than this many ms between throws
            "minThrowIntervalMs": 50
        },
        "autoCrystal":{
            //how long (in ticks, 20 ticks = 1 second) a right-click still counts toward the next crystal placement
            "pendingPlacementTicks": 60,
            //an unplaced crystal has to be broken within this many ticks of spawning to be attributed to a player
            "maxBreakDelayTicks": 6,
            //how many of these suspicious crystals in a row the same player has to break before it's flagged
            "streakRequired": 3,
            //how far away (in blocks) a real placement can be from a crystal spawn and still explain it
            "nearbyPlayerRadius": 10
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
            "blockExceptions": ["minecraft:sea_pickle","minecraft:sugar_cane","minecraft:deadbush","minecraft:horn_coral","minecraft:coral_fan","minecraft:coral_fan_dead","minecraft:brain_coral","minecraft:bubble_coral","minecraft:dead_brain_coral","minecraft:dead_bubble_coral","minecraft:dead_fire_coral","minecraft:dead_horn_coral","minecraft:dead_tube_coral","minecraft:fire_coral","minecraft:tube_coral","minecraft:red_flower","minecraft:yellow_flower","minecraft:grass","minecraft:seagrass","minecraft:netherrack","minecraft:torchflower","minecraft:sapling","minecraft:cherry_sapling","minecraft:tallgrass","minecraft:double_plant","minecraft:nether_sprouts", "minecraft:tnt"]
        },
        "worldborder":{
            //the minimum border size required, this is used so if a possible admin abuse or force op occurs hackers don't create a border of a size 1 block or less which
            //will teleport all the players up in the air constantly
            "minBorderDistance": 500,
            //if admins can go beyond world border
            "adminsBypassBorder": true,
            //each time a player hits the border again without a break, they get pushed back in twice as far as last time, how long until push back resets to 1
            "pushStreakResetMs": 30000,
            //hard cap on how far a single push-back can ever be, no matter how long the streak gets
            "maxPushBlocks": 200
        }
    },
    "chat":{
        //chat command prefix
        "prefix": "!",
        "spammer":{
            //if a message contains non ASCII characters, it does not get sent
            "preventNonAsciiChars": true,
            //maximum amount characters the message can have before it's considered spam
            "maxMessageCharLimit": 256,
            //maximum amount of words the message can have before it's considered spam
            "maxMessageWordLimit": 30,
            //minimum time between messages in milliseconds
            "minTime": 1500,
            //if a message starts with this word/symbol/letter or whatever you enter it won't be flagged for spam
            "whitelistedPrefixes": ["!"]
        }
    }
}