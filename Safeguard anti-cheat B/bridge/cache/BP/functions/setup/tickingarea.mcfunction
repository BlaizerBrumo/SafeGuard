{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\setup\\tickingarea.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "7431874f_aeef_4632_8350_97578261ed1e",
	"file_version": 3,
	"cache_content": "#setup\r\ntickingarea add ~-10 ~-10 ~-10 ~10 ~10 ~10 \r\ntellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §aSuccessfully setup the tickingarea!§r\"}]}\r\n#deny\r\ntellraw @s[tag=!admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r\"}]}\r\nplaysound random.anvil_land @s[tag=!admin] "
}