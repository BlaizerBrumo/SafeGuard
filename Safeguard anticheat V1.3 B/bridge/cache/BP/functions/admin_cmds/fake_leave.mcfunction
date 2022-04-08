{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\admin_cmds\\fake_leave.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "28eba9a1_0cac_45ae_ae7e_c94441c5280f",
	"file_version": 9,
	"cache_content": "execute @s[tag=admin] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§e\"},{\"selector\":\"@s\"},{\"text\":\" left the realm\"}]}\ntellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§a Fake left success!\"}]}\nplaysound random.levelup @s[tag=admin]\ntellraw @s[tag=!admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §4You need admin tag to run this!\"}]}\nplaysound random.anvil_land @s[tag=!admin] \n#notify\ntellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@s\"},{\"text\":\" §bfake left!§r\"}]}"
}