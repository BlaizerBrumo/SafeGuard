SafeGuard is a minecraft bedrock anti-cheat add-on with simple protection and customizable functions to use against hackers, it includes such things as:

## ======Modules======

- Anti CBE- Kills NPCs and command block minecarts to stop hackers from using command block exploit.



- Anti GMC- Sets non staff players back to survival



- Anti Lag- Kills entities in the world to clear lag(doesn't include pets)



- Anti Items- Clears un-obtainable items from non staff players, can also be customized



- Anti Grief- Clears all tnt and respawn anchors from player's inventory



## =====Admin Commands=====

- Vanish- This function is a toggle command which puts you in and out of invisibility

- Summon NPC- Since the anti-cheat kills all NPCs, this command will summon an NPC at your location which will not die /function setup/summon_npc.

- Clearchat- Clear the chat, /function admin_cmds/clearchat

## =====Punishments=====

- Flagged- A tag which puts the person in adventure mode | /tag [name] add flagged to flag person | /execute [name] ~~~ function punishment/flag/flagged_remove



- Freeze- Freezes selected person in place | /tag [name] add freeze to freeze | /execute [name] ~~~ function punishment/freeze/freeze_remove to remove



- Inventory Lock- Clears person inventory and puts un-removable items in their inventory | /tag[name] add inv_lock to inventory lock | /execute [name] ~~~ function punishment/inv_lock/inv_lock_remove to remove inventory lock

- Enderchest wipe- Clears person's enderchest, /tag [name] add echest_wipe

- Enderchest ban- Doesn't allow person to use enderchests | /tag [name] add echest_ban to enderchest ban | /execute [name] ~~~ function punishment/echest_ban/echest_ban to remove enderchest ban 

- Ban- Bans people forever, cannot unban people yet | /execute [name] ~~~ function punishments/ban/ban

## =====Helpful Features=====

- Auto Mod- Auto flags people

- Illegal items crash- Kick people if they obtain items like movingblock or fire

- Help Command- Gives a quick guide of the anticheat | /function setup/help

- Welcomer- Sends a message in chat when a person join the game for the first time



## =====Customize=====

- Custom banned items- If you go to the behavior pack of the anti-cheat, functions > anti > anti_items.mcfunction  you can scroll until you find a clear space to write the items you want to clear, template: clear @a[tag=!admin] [item name] [data]

## =====Settings(toggle)=====

- Lock End- Teleports players away from the end portal

- Auto Mod- Auto flags people

- No Shulker Barrels- Clears either shulker boxes, barrels, or both(made to prevent kits like 32k)

## =====How to Use=====

- Download the files from gihub or files below
- If you want to customize, change the .mcpack to .zip, unzip files, change the things you want, zip it, and change .zip to .mcpack
- Add the add-on to world/realm
- Run /function setup/setup
- Put use_all to activate all modules, or use_all_auto_mod to have auto mod on. Or the modules you want to be activated in an always active repeating command block
- Stand near the command block and run /function setup/tickingarea so the anti-cheat works anywhere in the world
- Turn on any setting you want in /function settings/
- Enjoy!
