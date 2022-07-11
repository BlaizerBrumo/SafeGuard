{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\freeze\\freeze.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "e1c54d56_b991_44d4_880b_1e359d5f558f",
	"file_version": 9,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\ntitle @a[tag=freeze] times 1 1 1\nexecute @a[tag=freeze] ~ ~ ~ tp @s[tag=freeze] ~ ~ ~ facing @s\neffect @a[tag=freeze] slowness 100 100 true\ntitle @a[tag=freeze] actionbar §b§lYou are freezed.§r"
}