<img src="https://img.shields.io/github/downloads/BlaizerBrumo/SafeGuard/total?style=for-the-badge" alt="Downloads"/><br>



# Info
SafeGuard is a Minecraft Bedrock anti-cheat add-on with protection against combat, item, and world-abuse hacks, plus a full set of admin moderation tools.

SafeGuard offers a variety of features, all of them listed below by category. Almost all of the cheat detections require Beta APIs, so please turn that on inside Minecraft's experiment settings when creating/editing your world.

Also please note that all of SafeGuard's detection modules are **disabled by default** - to enable one, get the SafeGuard admin panel (`/give @s safeguard:admin_panel`) and navigate to Settings.

For any questions or help please join the official SafeGuard Discord server: [discord.gg/nGu5gehXs3](https://discord.gg/nGu5gehXs3)

> [!CAUTION]
> SafeGuard is distributed free of charge, exclusively through this GitHub repository and our official [MCPEDL page](https://mcpedl.com/safeguard-anticheat/). Any other website, app, or Discord server claiming to offer SafeGuard is an impersonation that wasn't uploaded by the developer, and may therefore be unsafe. Do not click their links or download their `.mcpack` files. We never use link shorteners or advertisement links (e.g. Adfly). Report any unauthorized uploads to Blazer on discord.

# License
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

SafeGuard is licensed under [CC BY-NC-SA 4.0](LICENSE). In plain terms: you're free to modify and redistribute the code (including forks), as long as you **credit the original SafeGuard project**, keep any fork under this same license, and **never charge money for it or any modified version**.

# Owner Status
SafeGuard owner status allows players to use the in-game config editor and clear ban logs at will. To obtain owner status you must first edit the `OWNER_PASSWORD` field inside [config] (`MOD_FOLDER/scripts/config.js`). Then obtain the SafeGuard admin panel and head over to Settings -> Config Editor. If setup correctly you will be prompted to enter the password you set. After entering the correct password you will be granted owner status and can edit the config. Please note that config changes made through the config editor only save on the current instance of the world - to export the config, use the config debug option to log the current config to your console.

> [!NOTE]
> If you are unsure how to edit the config file, please refer to the expandable section in [Setup Instructions](https://github.com/BlaizerBrumo/SafeGuard?tab=readme-ov-file#-setup-instructions) titled "How to Edit .mcpack Addon Files (Windows & Mobile)."

> [!IMPORTANT]
> Owner status is an extremely sensitive permission and you should never give anyone your owner password.

# ⚠️ Cheat Detections

> ### ⚔️ Combat Cheat Detections
  > - **High CPS Check:** Flags players clicking faster than the max CPS set in [config]
  > - **Killaura Check:** Flags hitting too many entities at once, an aim angle that snaps to an exact whole-degree value, or attacking while performing another action
  > - **No Swing Check:** Flags attacking, placing, or breaking a block with no arm swing beforehand
  > - **FOV Check:** Flags hitting an entity or placing a block without actually looking at it
  > - **Anti Fast Use:** Flags throwing potions, snowballs, or experience bottles faster than humanly possible
  > - **Auto Totem Check:** Flags re-equipping a totem of undying faster than humanly possible, or with suspiciously consistent timing
  > - **Auto Crystal Check:** Flags auto crystal behavior
  > - **Combat Log Detection:** Punishes a player who leaves the game while flagged as in combat (punishment type set in [config])
> 
> 
> ### 🌎 World Cheat Detections
  > - **Anti Block Nuker:** Flags breaking more blocks in a single tick than allowed in [config], and restores the broken blocks
  > - **Anti Scaffold:** Flags placing blocks with a suspiciously round angle head rotations
  > - **Anti Air Place:** Cancels placing a block with nothing solid supporting it
  > - **Anti Invalid Durability:** Detects and repairs items with impossible durability values (a sign of item duplication/editing)
  > - **Anti Invalid Equipment:** Bans a player instantly for wearing an item in an armor slot it can't legitimately go in
  > - **Anti Namespoof:** Kicks and bans players joining with an invalid username
>
>
> ### 💬 Chat Protection
  > - Blocks messages over the character/word limits set in [config]
  > - Blocks repeated (spam) messages and messages sent too quickly in a row
  > - Blocks messages containing non-ASCII characters (optional, set in [config])
  > - Permanently bans a player for sending an oversized/invalid chat packet
>
>
>

# 💡 Miscellaneous Features

> ### 👁️ Ore Alerts
  > _Alerts all staff members when a player mines an enabled ore_
  > - **Diamond Ore Alerts:** Alerts when a player mines diamond ore or deepslate diamond ore
  > - **Netherite Ore Alerts:** Alerts when a player mines ancient debris
>
>
> ### 🛡️ World Protection
  > - **Anti GMC:** Switches any non-admin player back from creative to survival
  > - **End Lock:** Stops players from entering the End
  > - **Nether Lock:** Stops players from entering the Nether
>
>
> ### ⭐ Utility Features
  > _These modules don't do any protection, they're just for utility/fun_
  > - **Death Effect:** Plays a visual effect where a player died
  > - **Death Coords:** Tells a player their coordinates when they die
  > - **Welcomer:** Welcomes newly joined players and shows what device they joined on
>
> 
>

# 🛠 Admin Helpful Utilities

> ### 🤖 Chat Commands
  > _SafeGuard offers a variety of commands which can be viewed in-game with `!help`; the command prefix (`!`) can be changed inside [config]_
  > - **ban `<player name>`:** Permanently bans a player by their name
  > - **unban `<player>`:** Unbans a player
  > - **kick `<player>`:** Kicks the target player
  > - **mute `<player> [time S | M | H | D] [reason]`:** Mutes a player for a specific duration
  > - **unmute `<player>`:** Unmutes a muted player
  > - **freeze `<player>`:** Toggles freeze on the selected player
  > - **warn `<player>`:** Warns a player
  > - **warnings `<player>`:** Lists a player's warnings
  > - **clearwarn `<player>`:** Clears a player's warnings
  > - **report `<player> <reason>`:** Reports a player privately to online admins
  > - **invsee `<player>`:** Lists everything in a player's inventory
  > - **copyinv `<player>`:** Copies a player's items into your own inventory
  > - **worldborder `<border | remove | origin <x> <z>>`:** Gets or sets the world border, and where it's centered
  > - **toggledeviceban `<device name | Desktop | Console | Mobile | View>`:** Toggles a device ban, or views the banned ones
  > - **vanish:** Toggles vanish mode
  > - **notify:** Toggles anticheat notifications for yourself
  > - **clearchat:** Clears the chat
  > - **clearbanlogs:** Clears ban logs
  > - **fakeleave:** Simulates leaving the realm
  > - **fakeleave_server:** Simulates leaving the server
  > - **summon_npc:** Summons an NPC at your location
  > - **lagclear:** Clears lag by killing entities
  > - **systeminfo `<player>`:** Gets the system info of a selected player
  > - **version:** Shows the pack version
  > - **removeowner:** Removes your own owner status
>
> 
> ### 📃 Admin Panel Item
  > _The admin panel is an item which can be obtained with the command `/give @s safeguard:admin_panel`_
  > - **Settings:** Toggle SafeGuard modules/features, and the config editor
  > - **Quick Ban:** Quickly ban a player using SafeGuard's ban system
  > - **Player Actions:** Select an online player to ban, clear ender chest, warn, etc.
  > - **Unban Player:** Enter a player's name to unban - they'll be unbanned when they rejoin
  > - **Ban Logs:** View info on recently banned players
>
> 
> ### ⚙️ Auto Mod
  > _Auto Mod is disabled by default - enable it inside the admin panel_
  > - **What it does:** Pools detections from every enabled module for each player - once a player racks up enough detections within a short window (both set in [config]), Auto Mod automatically bans them, no admin action needed
>
>
>

# 📖 Setup Instructions
  
  > 1. Download the mcpacks from the [latest GitHub release](https://github.com/BlaizerBrumo/SafeGuard/releases/latest)
  > 2. If you want to customize, expand for step-by-step instructions:
  >
  >    <details>
  >    <summary><strong>How to Edit .mcpack Addon Files (Windows & Mobile)</strong></summary>
  >
  >    ### For Windows
  >
  >    1. **Locate the `.mcpack` file** you downloaded.
  >    2. **Enable file extensions** in File Explorer:
  >        - Go to the "View" tab and check "File name extensions."
  >    3. **Rename the file extension** from `.mcpack` to `.zip`.
  >        - Right-click the file, select "Rename," and change `.mcpack` to `.zip`. Confirm if prompted.
  >    4. **Extract the zip archive**:
  >        - Right-click the `.zip` file and choose "Extract All..." or use a tool like 7-Zip or WinRAR.
  >    5. **Edit the files** inside the extracted folder:
  >        - Use a text editor (e.g., Notepad, Visual Studio Code) for JSON/scripts, or an image editor for textures.
  >    6. **Repack the folder**:
  >        - Select all the files/folders you edited (not the parent folder), right-click, and choose "Send to > Compressed (zipped) folder."
  >    7. **Rename the new `.zip` file back to `.mcpack`**.
  >        - Right-click, select "Rename," and change `.zip` to `.mcpack`.
  >    8. **Import the edited `.mcpack`** into Minecraft:
  >        - Double-click the file or move it to the appropriate resource/behavior pack folder.
  >
  >    ---
  >
  >    ### For Mobile (iOS/Android)
  >
  >    1. **Download the `.mcpack` file** to your device.
  >    2. **Use a file manager app** (such as "Files" on iOS or "ZArchiver" on Android).
  >    3. **Rename the file extension** from `.mcpack` to `.zip`.
  >        - Tap and hold the file, select "Rename," and change `.mcpack` to `.zip."
  >    4. **Extract the `.zip` file** using your file manager.
  >    5. **Edit the desired files**:
  >        - Use a text editor app for JSON/scripts or an image editor for textures.
  >    6. **Re-compress the files**:
  >        - Select the modified files/folders and compress them into a new `.zip` file.
  >    7. **Rename the new `.zip` file back to `.mcpack`**.
  >    8. **Import the `.mcpack`**:
  >        - Tap the file to open it with Minecraft, or move it to the correct folder using your file manager.
  >
  >    ---
  >
  >    **Tips:**
  >    - Always back up your original `.mcpack` before editing.
  >    - On Windows, you can find your Minecraft folders in `%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang`.
  >    - On mobile, use your device's file manager to navigate to the Minecraft folders.
  >
  >    </details>
  >
  > 3. Add the add-on to your world/realm
  > 4. Turn on the Beta APIs experiment
  > 5. Run `/function setup/setup`
  > 6. Toggle the modules you want inside the admin panel (all detections start disabled)
  > 7. Enjoy!

[config]: https://github.com/BlaizerBrumo/SafeGuard/blob/main/scripts/config.js
