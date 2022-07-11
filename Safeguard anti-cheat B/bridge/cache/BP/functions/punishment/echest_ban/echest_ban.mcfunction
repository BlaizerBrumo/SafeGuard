{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\echest_ban\\echest_ban.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "65afd82b_d4f8_466d_82e2_812e5a9d5fb8",
	"file_version": 2,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\ntitle @a[tag=echest_ban] times 1 1 1\ntitle @a[tag=echest_ban] actionbar §l§4You are echest banned.\nexecute @a[tag=echest_ban] ~~~ fill ~7 ~7 ~7 ~-7 ~-7 ~-7 air 0 replace ender_chest\nclear @a[tag=echest_ban] ender_chest"
}