<img src="https://img.shields.io/github/downloads/BlaizerBrumo/SafeGuard/total?style=for-the-badge" alt="Downloads"/><br>

# Info
SafeGuard is a minecraft bedrock anti-cheat add-on with protection against combat, item, and movement hacks.

SafeGuard offers a variety of features, all of them will be listed inside their hack type.
Almost all of the cheat detections require Beta APIs so please turn that on inside of minecraft experiment settings.

Also please note that all of the SafeGuard's detections/alerts/modules are disable by default, to enable a module use the SafeGuard admin panel (`/give @s safeguard:admin_panel`) and navigate to the settings option.

For any questions or help please join the official SafeGuard discord server: [discord.gg/nGu5gehXs3](https://discord.gg/nGu5gehXs3)

# Owner Status
SafeGuard owner status allows players to use the in-game config editor and clear ban logs at will. To obtain owner status you must first edit the `OWNER_PASSWORD` field inside [config] (`MOD_FOLDER/scripts/config.js`). Then obtain the SafeGuard admin panel and head over to Settings -> Config Editor. If setup correctly you will be prompted with entering the password you set. After, entering the correct password you will be granted owner status and can edit the config. Please not that the config changes made through config editor will only save on the current instance of the world, in order to export the config you can use config debug option to log the current config to your console.

> [!NOTE]
> If you are unsure how to edit the config file, please refer to the expandable section in [Setup Instructions](https://github.com/BlaizerBrumo/SafeGuard?tab=readme-ov-file#-setup-instructions) titled "How to Edit .mcpack Addon Files (Windows & Mobile)."

> [!IMPORTANT]
> Owner status is an extremely sensitive permission and you should never give anyone your owner password.

# ⚠️ Cheat Detections

> ### ⚔️ Combat Cheat Detections
  > _If player matches any of these checks, player is warned and is given weakness for 2s to prevent giving attacks_
  > - **High CPS Check:** Checks if a player has a cps higher than the set amount inside of [config]
  > - **Multi Killaura Check:** Checks if a player attacks more entities then the set amount inside [config]
  > - **Combat Log Detection:** Checks if a player rejoins the server after leaving during combat and gives them the punishment selected in [config]
> 
> 
> ### 🏃 Movement Cheat Detections
  > _If player matches any of these checks, player is warned and the anticheat tries to fix their position by teleporting_
  > - **Fly Check:** Checks if player is flying
  > - **Invalid Velocity Check:** Checks if player is reaching an invalid Y velocity
  > - **High Velocity Check:** Checks if player reaches high velocity 
>
>
> ### 🌎 World Cheat Detections
  > _If player matches any of these checks, player is warned and anticheat replaces any broken blocks_
  > - **Nuker Check:** Checks if player breaks more blocks than the set amount inside [config]
  > - **Scaffold Check:** Checks if player is using scaffold or tower modules for horion
  > - **Illegal Item Place Check:** Checks if player places a block or uses an item that is inside the banned item list in [config]
  > - **Anti Namespoof:** Kicks and bans players with invalid usernames
>
> 
> ### 💬 Chat Cheat Detections
  > _If player matches any of these checks, player is warned and message is cancelled_
  > - **Same Message Check:** Checks if player send the same message 2 or more times in a row
  > - **Short Timed Messages Check:** Checks if player sends a message within a 1.5 second gap to prevent spam, edit in [config]
  > - **Sending Message While Moving Check:** Checks if player send a message while moving
  > - **Message Large Character Amount Check:** Checks if player sends a message with more than 512 characters, edit in [config]
  > - **Message Too Many Words Check:** Checks if player has a message with too many words, edit in [config]
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
  > - **End Lock:** Teleports players out of the end
  > - **Nether Lock:** Teleports players out of the nether
  > - **Welcomer:** Welcomes newly joined players and shows a welcome screen, shows what device they joined on.
>
> 
>

# 🛠 Admin Helpful Utilities

> ### 🤖 Chat Commands
  > _SafeGuard offers a variety of commands which can be viewed with `!help`, and the command prefix can be changed inside [config]_
  > - **ban [player name]:** Ban a person
  > - **invsee [player name]:** See the inventory of a player
  > - **mute [time S | M | H | D] [reason]:** Mute a player for a specific duration
  > - **unmute [player name]:** Unmute a player
  > - **worldborder [border | remove]:** Get or set the world border
  > - **vanish:** Toggle vanish mode
  > - **clearchat:** Clear the chat
  > - **fakeleave:** Simulate leaving the realm
  > - **fakeleave_server:** Simulate leaving the server
  > - **summon_npc:** Summon an NPC
  > - **notify:** Toggle anticheat notifications
  > - **lagclear:** Run lag clear function
  > - **copyinv [player name]:** Copy the inventory of a player
  > - **unban [player name]:** Unban a player
  > - **report [player name]:** Report players anonymously to all online admins, admins can check a player's report count
  > - **systeminfo [player name]:** Get the system info of a selected player
  > - **version:** Shows the pack version
  > - **warn [player name]:** Warns the selected player
  > - **warnings [player name]:** Lists the selected player's warnings
  > - **toggledeviceban [device name | Desktop | Console | Mobile | View]:** Toggles a device ban or view the banned ones
  > - **kick [player name]:** The same as /kick but without reason
  > - **removeowner:** Removes your owner status
  > - **clearbanlogs** Clears ban logs  
>
> 
> ### 📃 Admin Panel Item
  > _The admin panel is an item which can be obtained with command `/give @s safeguard:admin_panel`_
  > - **Settings:** Toggle SafeGuard modules/features as well as config editor
  > - **Quick Ban:** Quickly ban a player using SafeGuard ban system 
  > - **Player Actions:** Select an online player to ban, clear echest, warn, etc
  > - **Unban Player:** Enter a player's name to unban, they will be unban when they rejoin
  > - **Ban Logs:** Display info on recently banned players
>
> 
> ### ⚙️ Auto Mod
  > _Auto mod is disabled by default, enable it inside admin panel_
  > - **What it does:** The SafeGuard AutoMod will automatically kick players who are detected by an anticheat module.
>
>
>

# 📖 Setup Instructions
  
  > 1. Download the mcpacks from [latest github release](https://github.com/BlaizerBrumo/SafeGuard/releases/latest)
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
  >    - On Windows, you can find your Minecraft folders in `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang`.
  >    - On mobile, use your device’s file manager to navigate to the Minecraft folders.
  >
  >    </details>
  >
  > 3. Add the add-on to world/realm
  > 4. Turn on Beta API
  > 5. Run `/function setup/setup`
  > 6. Toggle all the modules you want inside admin panel
  > 7. Enjoy!

[config]: https://github.com/BlaizerBrumo/SafeGuard/blob/main/scripts/config.js
