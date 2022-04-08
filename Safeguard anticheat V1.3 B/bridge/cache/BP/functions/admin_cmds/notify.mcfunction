{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\admin_cmds\\notify.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "4565c2cc_86a0_47b5_8448_568bef68d4d6",
	"file_version": 6,
	"cache_content": "scoreboard players add @s notify 1\r\nscoreboard players set @s[tag=admin,scores={notify=2..}] notify 0\r\ntellraw @s[tag=admin,scores={notify=0}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§l§b You will §5no longer§b recieve anticheat notifications!§r\"}]}\r\ntellraw @s[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§l§b You will now §5get notified§b by the anticheat!§r\"}]}\r\ntellraw @s[tag=!admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r\"}]}\r\nplaysound random.anvil_land @s[tag=!admin] ~~~\r\nplaysound note.bass @s[tag=admin] ~~~"
}