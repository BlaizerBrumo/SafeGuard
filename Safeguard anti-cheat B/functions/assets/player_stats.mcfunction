#bridge-file-version: #71
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin §brequested stats of§5 "}, {"selector": "@s"}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Warnings§e---------"}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Warnings: §b[§e"},{"score":{"name": "@s","objective": "warning"}},{"text": "§7/§e3§b] "}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Illegal Item Warnings: §b[§e"},{"score":{"name": "@s","objective": "ill_warning"}},{"text": "§7/§e6§b] "}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "CBE Warnings: §b[§e"},{"score":{"name": "@s","objective": "cbe_warning"}},{"text": "§7/§e6§b] "}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode Warnings: §b[§e"},{"score":{"name": "@s","objective": "gmc_warning"}},{"text": "§7/§e4§b] "}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Grief Warnings: §b[§e"},{"score":{"name": "@s","objective": "grief_warning"}},{"text": "§7/§e4§b] "}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Permissions§e---------"}]}
execute @a[tag=stats,m=creative] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aCREATIVE"}]}
execute @a[tag=stats,m=survival] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aSURVIVAL"}]}
execute @a[tag=stats,m=adventure] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aADVENTURE"}]}
#execute @a[tag=stats,m=spectator] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aSPECTATOR"}]}
execute @a[tag=stats,tag=admin] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin Tag: §aTRUE"}]}
execute @a[tag=stats,tag=!admin] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin Tag: §4FALSE"}]}
execute @a[tag=stats,tag=!freeze] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Frozen: §4FALSE"}]}
execute @a[tag=stats,tag=freeze] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Frozen: §aTRUE"}]}
execute @a[tag=stats,tag=!inv_lock] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "INV Lock: §4FALSE"}]}
execute @a[tag=stats,tag=inv_lock] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "INV Lock: §aTRUE"}]}
execute @a[tag=stats,tag=!echest_ban] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Echest Ban: §4FALSE"}]}
execute @a[tag=stats,tag=echest_ban] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Echest Ban: §aTRUE"}]}
execute @a[tag=stats,tag=!flagged] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Flagged: §4FALSE"}]}
execute @a[tag=stats,tag=flagged] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Flagged: §aTRUE"}]}
execute @a[tag=stats] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Equipment§e---------"}]}
#Helmet
execute @a[tag=stats,hasitem={location=slot.armor.head,item=chainmail_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=diamond_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=leather_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=golden_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=turtle_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=netherite_helmet,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.head,item=iron_helmet,quantity=!1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §4NONE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=chainmail_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aCHAINMAIL"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=diamond_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aDIAMOND"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=golden_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aGOLDEN"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=iron_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aIRON"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=turtle_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aTURTLE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=leather_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aLEATHER"}]}
execute @a[tag=stats,hasitem={location=slot.armor.head,item=netherite_helmet}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aNETHERITE"}]}
#Chesplate
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=chainmail_chestplate,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=elytra,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=diamond_chestplate,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=leather_chestplate,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=golden_chestplate,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=netherite_chestplate,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.chest,item=iron_chestplate,quantity=!1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §4NONE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=chainmail_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aCHAINMAIL"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=golden_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aGOLDEN"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=netherite_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aNETHERITE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=diamond_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aDIAMOND"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=leather_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aLEATHER"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=iron_chestplate}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aIRON"}]}
execute @a[tag=stats,hasitem={location=slot.armor.chest,item=elytra}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aELYTRA"}]}
#Leggings
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=chainmail_leggings,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.legs,item=diamond_leggings,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.legs,item=leather_leggings,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.legs,item=golden_leggings,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.legs,item=netherite_leggings,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.legs,item=iron_leggings,quantity=!1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §4NONE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=chainmail_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aCHAINMAIL"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=golden_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aGOLDEN"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=netherite_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aNETHERITE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=diamond_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aDIAMOND"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=leather_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aLEATHER"}]}
execute @a[tag=stats,hasitem={location=slot.armor.legs,item=iron_leggings}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aIRON"}]}
#Feet
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=chainmail_boots,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.feet,item=diamond_boots,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.feet,item=leather_boots,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.feet,item=golden_boots,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.feet,item=netherite_boots,quantity=!1}] ~~~ execute @s[hasitem={location=slot.armor.feet,item=iron_boots,quantity=!1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §4NONE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=chainmail_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aCHAINMAIL"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=golden_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aGOLDEN"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=netherite_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aNETHERITE"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=diamond_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aDIAMOND"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=leather_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aLEATHER"}]}
execute @a[tag=stats,hasitem={location=slot.armor.feet,item=iron_boots}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aIRON"}]}
execute @a[tag=stats,hasitem={item=shulker_box,data=-1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §aTRUE"}]}
execute @a[tag=stats,hasitem={item=undyed_shulker_box,data=-1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §aTRUE"}]}
execute @a[tag=stats,hasitem={item=shulker_box,data=-1,quantity=!1}] ~~~ execute @s[tag=stats,hasitem={item=undyed_shulker_box,data=-1,quantity=!1}] ~~~ tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §4FALSE"}]}
#ac
execute @a[tag=ac_stats] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Warnings§e---------"}]}
execute @a[tag=ac_stats] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Illegal Item Warnings: §b[§e"},{"score":{"name": "@s","objective": "ill_warning"}},{"text": "§7/§e6§b] "}]}
execute @a[tag=ac_stats] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "CBE Warnings: §b[§e"},{"score":{"name": "@s","objective": "cbe_warning"}},{"text": "§7/§e6§b] "}]}
execute @a[tag=ac_stats] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode Warnings: §b[§e"},{"score":{"name": "@s","objective": "gmc_warning"}},{"text": "§7/§e4§b] "}]}
execute @a[tag=ac_stats] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Grief Warnings: §b[§e"},{"score":{"name": "@s","objective": "grief_warning"}},{"text": "§7/§e4§b] "}]}
#remove tag
tag @a[tag=stats] remove stats
tag @a[tag=ac_stats] remove ac_stats