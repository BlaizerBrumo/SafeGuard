#bridge-file-version: #27
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
#Hasitem detection and alert
execute @a[tag=!admin,scores={item_on=0},hasitem={item=structure_void}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSTRCUCTURE VOID!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=structure_block}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSTRUCTURE BLOCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=jigsaw}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cJIGSAW!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=allow}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cALLOW!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=deny}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cDENY!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=bedrock}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBEDROCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=command_block}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCOMMAND BLOCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=repeating_command_block}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cREPEATING COMMAND BLOCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=chain_command_block}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCHAIN COMMAND BLOCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=barrier}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBARRIER!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=border_block}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBORDER BLOCK!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=mob_spawner}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cMOB SPAWNER!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=command_block_minecart}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBCOMMAND BLOCK MINECART!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=end_portal_frame}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cEND PORTAL FRAME!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=bat_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBAT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=bee_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBEE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=blaze_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBLAZE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=cat_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCAT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=cave_spider_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCAVE SPIDER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=chicken_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCHICKEN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=cod_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCOD SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=cow_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCOW SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=creeper_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cCREEPER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=dolphin_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cDOLPHIN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=donkey_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cDONKEY SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=drowned_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cDROWNED SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=elder_guardian_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cELDER GUARDIAN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=enderman_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cENDERMAN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=endermite_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cENDERMITE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=evoker_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cEVOKER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=fox_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cFOX SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=ghast_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cGHAST SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=guardian_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cGUARDIAN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=hoglin_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cHOGLIN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=horse_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cHORSE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=husk_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cHUSK SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=llama_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cLLAMA SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=magma_cube_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cMAGMA CUBE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=mooshroom_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cMOOSHROOM SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=mule_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cMULE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=ocelot_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§OCELOT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=panda_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPANDA SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=parrot_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPARROT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=phantom_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPHANTOM SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=pig_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPIG SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=piglin_brute_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPIGLIN BRUTE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=piglin_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPIGLIN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=pillager_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPILLAGER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=polar_bear_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPOLAR BEAR SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=pufferfish_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cPUFFERFISH SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=rabbit_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cRABBIT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=ravager_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cRAVENGER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=salmon_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSALMON SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=sheep_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSHEEP SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=shulker_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSHULKER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=silverfish_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSILVERFISH SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=skeleton_horse_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSKELETON HORSE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=skeleton_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSKELETON SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=slime_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSLIME SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=spider_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSPIDER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=squid_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSQUID SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=stray_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSTRAY SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=strider_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cSTRIDER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=tropical_fish_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cTROPICAL FISH SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=turtle_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cTURTLE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=vex_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cVEX SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=vindicator_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cVINDICATOR SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=villager_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cVILLAGER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=wandering_trader_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cWANDERING TRADER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=witch_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cWITCH SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=wither_skeleton_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cWITHER SKELETON SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=wolf_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cWOLF SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=zoglin_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cZOGLIN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=zombie_horse_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cZOMBIE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=zombie_pigman_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cZOMBIE PIGMAN SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=zombie_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cZOMBIE SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=zombie_villager_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cZOMBIE VILLAGER SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=axolotl_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cAXOLOTL SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=glow_squid_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cGLOW SQUID SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=goat_spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cGOAT SPAWN EGG!§r"}]}
execute @a[tag=!admin,scores={item_on=0},hasitem={item=spawn_egg}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cNPC SPAWN EGG!§r"}]}
#Non-survival item wipe
clear @a[tag=!admin,scores={item_on=0}] structure_void
clear @a[tag=!admin,scores={item_on=0}] structure_block
clear @a[tag=!admin,scores={item_on=0}] jigsaw
clear @a[tag=!admin,scores={item_on=0}] allow
clear @a[tag=!admin,scores={item_on=0}] deny
clear @a[tag=!admin,scores={item_on=0}] bedrock
clear @a[tag=!admin,scores={item_on=0}] command_block
clear @a[tag=!admin,scores={item_on=0}] repeating_command_block
clear @a[tag=!admin,scores={item_on=0}] chain_command_block
clear @a[tag=!admin,scores={item_on=0}] barrier
clear @a[tag=!admin,scores={item_on=0}] border_block
clear @a[tag=!admin,scores={item_on=0}] mob_spawner
clear @a[tag=!admin,scores={item_on=0}] command_block_minecart
clear @a[tag=!admin,scores={item_on=0}] end_portal_frame
#Type clear @a[tag=!admin,scores={item_on=0}] [item] [data] [value] for custom items
#Clear all spawn eggs(case sensetive)
clear @a[tag=!admin,scores={item_on=0}] spawn_egg
clear @a[tag=!admin,scores={item_on=0}] bat_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] bee_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] blaze_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] cat_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] cave_spider_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] chicken_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] cod_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] cow_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] creeper_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] dolphin_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] donkey_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] drowned_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] elder_guardian_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] enderman_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] endermite_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] evoker_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] fox_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] ghast_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] guardian_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] hoglin_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] horse_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] husk_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] llama_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] magma_cube_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] mooshroom_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] mule_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] ocelot_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] panda_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] parrot_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] phantom_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] pig_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] piglin_brute_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] piglin_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] pillager_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] polar_bear_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] pufferfish_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] rabbit_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] ravager_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] salmon_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] sheep_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] shulker_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] silverfish_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] skeleton_horse_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] skeleton_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] slime_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] spider_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] squid_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] stray_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] strider_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] tropical_fish_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] turtle_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] vex_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] vindicator_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] villager_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] wandering_trader_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] witch_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] wither_skeleton_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] wolf_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] zoglin_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] zombie_horse_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] zombie_pigman_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] zombie_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] zombie_villager_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] axolotl_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] glow_squid_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] goat_spawn_egg
clear @a[tag=!admin,scores={item_on=0}] spawn_egg 51