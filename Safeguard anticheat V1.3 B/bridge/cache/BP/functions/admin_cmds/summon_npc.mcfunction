{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\setup\\summon_npc.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "2d34af5f_fffe_4d96_9027_164b28f650ed",
	"file_version": 4,
	"cache_content": "execute @s[tag=admin] ~ ~ ~ summon npc ~ ~ ~\r\ntag @e[type=npc , r=5] add friend\r\ntellraw @s[tag=admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §aSuccessfully summoned the NPC!§r\"}]}\r\nplaysound random.levelup @s[tag=admin]\r\ntellraw @s[tag=!admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §4You need admin tag to run this!\"}]}\r\nplaysound random.anvil_land @s[tag=!admin] "
}