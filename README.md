# SafeGuard
SafeGuard is a minecraft bedrock anti-cheat add-on with simple protection and customizable functions to use against hackers, it includes such things as:

 # ======Functions======

Anti CBE- Kills NPCs and command block minecarts to stop hackers from using command block exploit.



Anti GMC- Sets non staff players back to survival



Anti Lag- Kills entities in the world to clear lag(doesn't include pets)



Anti Items- Clears un-obtainable items from non staff players, can also be customized



Anti Grief- Clears all tnt and respawn anchors from player's inventory



# =====Helpful Features=====

Vanish- This function is a toggle command which puts you in and out of invisibility

Summon NPC- Since the anti-cheat kills all NPCs, this command will summon an NPC at your location which will not die.

Admin Panel(BETA)- Shows commands for the add-on



Welcomer- Sends a message in chat when a person join the game for the first time



Flagged- A tag which puts the person in adventure mode



# =====Customize=====

Custom server name- If you go to the resource pack of the anti-cheat, UI > debug_screen.json  and change the part where it says [Server Name] you will get a custom server name.

Custom server image- If you go to the resource pack of the anti-cheat, textures > image.png and change it, you will get a custom server image.



Custom banned items- If you go to the behavior pack of the anti-cheat, functions > anti > anti_items.mcfunction  you can scroll until you find a clear space to write the items you want to clear, template: clear @a[tag=!admin] [item name] [data]

# =====How to Use=====

Download the files from gihub or files below
If you want to customize, change the .mcpack to .zip, unzip files, change the things you want, zip it, and change .zip to .mcpack
Add the add-on to world/realm
Run /function setup/setup
Put use_all or the functions you want to be activated in a repeating command block
Stand near the command block and run /function setup/tickingarea so the anti-cheat works anywhere in the world
Enjoy!
