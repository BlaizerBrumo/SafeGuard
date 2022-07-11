{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\softban\\five.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "13c035ce_83e9_4648_b791_614945b2a3b8",
	"file_version": 9,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\r\nscoreboard objectives add softfive dummy\r\nscoreboard players add @a[tag=softban_five] softfive 1\r\nscoreboard players add @a[scores={softfive=1..5999}] softfive 1\r\nscoreboard players add @a[scores={softfive=5999}] softfive 1\r\ntag @a[scores={softfive=6000}] add softunban\r\ntag @a[scores={softfive=5999..}] remove softban_five\r\ntag @a[scores={softfive=1..5999}] add softban\r\nexecute @a[scores={softfive=1..2}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§5§l \"},{\"selector\":\"@a[scores={softfive=1..2}]\"},{\"text\":\" §bwas softbanned for 5 minutes! §r\"}]}"
}