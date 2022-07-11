{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\softban\\twenty.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "f6550d1f_a6c2_4d3e_b6a7_815b580eed1f",
	"file_version": 3,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\r\nscoreboard objectives add softtwen dummy\r\nscoreboard players add @a[tag=softban_twen] softtwen 1\r\nscoreboard players add @a[scores={softtwen=1..23999}] softtwen 1\r\nscoreboard players add @a[scores={softtwen=23999}] softtwen 1\r\ntag @a[scores={softtwen=24000}] add softunban\r\ntag @a[scores={softtwen=23999..}] remove softban_twen\r\ntag @a[scores={softtwen=1..23999}] add softban\r\nexecute @a[scores={softtwen=1..2}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§5§l \"},{\"selector\":\"@a[scores={softtwen=1..2}]\"},{\"text\":\" §bwas softbanned for 20 minutes! §r\"}]}"
}