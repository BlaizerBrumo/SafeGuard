<img src="https://img.shields.io/github/downloads/BlaizerBrumo/SafeGuard/total?style=for-the-badge" alt="Downloads"/><br>

# Info
SafeGuard is a minecraft bedrock anti-cheat add-on with protection against combat, item, and movement hacks.

SafeGuard offers a variety of features, all of them will be listed inside their hack type.
Almost all of the cheat detections require Beta APIs so please turn that on inside of minecraft experiment settings.

Also please note that all of the SafeGuard's detections/alerts/modules are disable by default, to enable a module use the SafeGuard admin panel (`/give @s safeguard:admin_panel`) and navigate to the settings option.

For any questions or help please join the official SafeGuard discord server: [discord.gg/nGu5gehXs3](https://discord.gg/nGu5gehXs3)

# ⚠️ Cheat Detections

> ### ⚔️ Combat Cheat Detections
  > _If player matches any of these checks, player is warned and is given weakness for 2s to prevent giving attacks_
  > - **High CPS Check:** Checks if a player has a cps higher than the set amount inside of [config]
  > - **Multi Killaura Check:** Checks if a player attacks more entities then the set amount inside [config]
> 
> 
> ### 🏷️ Item Cheat Detections
  > _If an item matches any of these check, the item is removed and player is warned_
  > - **Illegal Item Check:** Checks if a player has obtained a non-survival item (spawn eggs, bedrock, etc) change/add custom items in [config]
  > - **Illegal Item Name:** Checks if the item player is holding has a nametag length that is over the vanilla limit (30)
  > - **Illegal Item Lore:** Checks if the item player is holding contains lore
  > - **Banned Keyword Check:** Checks if the item player is holding contains banned keywords from [config]
> 
> 
> ### 🏃 Movement Cheat Detections
  > _If player matches any of these checks, player is warned and the anticheat tries to fix their position by teleporting_
  > - **Fly Check:** Checks if player is flying
>
>
> ### 🌎 World Cheat Detections
  > _If player matches any of these checks, player is warned and anticheat replaces any broken blocks_
  > - **Nuker Check:** Checks if player breaks more blocks than the set amount inside [config]
  > - **Illegal Item Place Check:** Checks if player places a block or uses an item that is inside the banned item list in [config] 
>
> 
> ### 💬 Chat Cheat Detections
  > _If player matches any of these checks, player is warned and message is cancelled_
  > - **Same Message Check:** Checks if player send the same message 2 or more times in a row
  > - **Short Timed Messages Check:** Checks if player sends a message within a 1.5 second gap to prevent spam
  > - **Sending Message While Moving Check:** Checks if player send a message while moving
>
>
>

# 💡 Miscellaneous Features

> ### 👁️ Xray Alerts
  > _This module alerts all staff members when a player mines enabled ores_
  > - **Diamond Ore:** Alerts when player mines diamond ore or diamond deepslate ore
  > - **Netherite Ore:** Alerts when player mines ancient debris
>
>
> ### 🛡️ World Protection
  > _These modules are all disabled by default and need to be enabled(read [info](#info))_
  > - **Anti GMC:** Switches back any non staff players from creative to survival and alerts everyone
  > - **Anti Grief:** Clears all explosive blocks, as well as automatically put out nearby fires
>
>
> ### ⭐ Utility Features
  > _These modules do not do any protection but are just here for utility/fun_
  > - **Death Effects:** Creates a cool effect at the place where someone dies
  > - **Death Coords:** Tells the player where they died when they die
  > - **End Lock:** Kills all the players which enter the end, as well as teleporting them away from the end portal and killing any thrown eyes of ender
  > - **Welcomer:** Welcomes newly joined players and shows a welcome screeen
>
> 
>

# 🛠 Admin Helpful Utilities

> ### 🤖 Chat Commands
  > _SafeGuard offers a variety of commands which can be viewed with `!help`, and the command prefix can be changed inside [config]_
  > - **ban [player name]:** Ban a person
  > - **invsee [player name]:** See the inventory of a player
  > - **mute [player name]:** Mute a player
  > - **unmute [player name]:** Unmute a player
  > - **worldborder [border]:** Get or set the world border
  > - **vanish:** Toggle vanish mode
  > - **clearchat:** Clear the chat
  > - **fakeleave:** Simulate leaving the realm
  > - **fakeleave_server:** Simulate leaving the server
  > - **summon_npc:** Summon an NPC
  > - **notify:** Toggle anticheat notifications
  > - **lagclear:** Run lag clear function
  > - **unban [player name]:** Unban a player
>
> 
> ### 📃 Admin Panel Item
  > _The admin panel is an item which can be obtained with command `/give @s safeguard:admin_panel`_
  > - **Settings:** Turn SafeGuard module/feature settings
  > - **Quick Ban:** Quickly ban a player using SafeGuard ban system 
  > - **Player Actions:** Select an online player to ban, clear echest, warn, etc
  > - **Unban Player:** Enter a player's name to unban, they will be unban when they rejoin
>
> 
> ### ⚙️ Auto Mod
  > _Auto mod is disabled by default, enable it inside admin panel_
  > - **Illegal Item Action:** When automod is enabled and player is flagged for illegal item, they will be kicked
>
>
>

# 📖 Setup Instructions
  
  > 1. Download the mcpacks from [latest github release](https://github.com/BlaizerBrumo/SafeGuard/releases/latest)
  > 2. If you want to customize, change the .mcpack to .zip, unzip files, change the things you want, zip it, and change .zip to .mcpack
  > 3. Add the add-on to world/realm
  > 4. Turn on Holiday Creator Features & Beta API
  > 5. Run `/function setup/setup`
  > 6. Toggle all the modules you want inside admin panel
  > 7. Enjoy!

[config]: https://github.com/BlaizerBrumo/SafeGuard/blob/main/Safeguard%20anti-cheat%20B/scripts/config.js
