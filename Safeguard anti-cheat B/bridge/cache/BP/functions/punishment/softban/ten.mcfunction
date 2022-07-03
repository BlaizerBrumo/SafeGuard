{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\softban\\ten.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "c40e557b_c542_4fe1_9c57_6956c63c9a2b",
	"file_version": 0,
	"cache_content": "scoreboard objectives add softten dummy\r\nscoreboard players add @a[tag=softban_ten] softten 1\r\nscoreboard players add @a[scores={softten=1..11999}] softten 1\r\nscoreboard players add @a[scores={softten=11999}] softten 1\r\ntag @a[scores={softten=12000}] add softunban\r\ntag @a[scores={softten=11999..}] remove softban_ten\r\ntag @a[scores={softten=1..11999}] add softban\r\nexecute @a[scores={softten=1..2}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§5§l \"},{\"selector\":\"@a[scores={softten=1..2}]\"},{\"text\":\" §bwas softbanned for 10 minutes! §r\"}]}"
}