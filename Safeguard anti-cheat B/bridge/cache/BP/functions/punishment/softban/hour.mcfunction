{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\softban\\hour.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "a2922ca9_4668_4734_aabc_551df258b6ca",
	"file_version": 2,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\r\nscoreboard objectives add softhour dummy\r\nscoreboard players add @a[tag=softban_hour] softhour 1\r\nscoreboard players add @a[scores={softhour=1..71999}] softhour 1\r\nscoreboard players add @a[scores={softhour=71999}] softhour 1\r\ntag @a[scores={softhour=72000}] add softunban\r\ntag @a[scores={softhour=71999..}] remove softban_hour\r\ntag @a[scores={softhour=1..71999}] add softban\r\nexecute @a[scores={softhour=1..2}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§5§l \"},{\"selector\":\"@a[scores={softhour=1..2}]\"},{\"text\":\" §bwas softbanned for 60 minutes! §r\"}]}"
}