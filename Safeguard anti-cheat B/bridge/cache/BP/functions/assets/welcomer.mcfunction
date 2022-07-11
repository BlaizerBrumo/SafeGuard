{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\assets\\welcomer.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "b2c9970b_238e_4198_ac3c_d9229b9b3854",
	"file_version": 26,
	"cache_content": "#Tag \r\ntellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\r\nexecute @a[scores={welcome_on=0}] ~~~ scoreboard players set @a[scores={welcomer=3..}] welcomer 2\r\nexecute @a[scores={welcome_on=0}] ~~~ execute @a[scores={welcomer=..1}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§e\"},{\"selector\":\"@s\"},{\"text\":\" §bIs joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r\"}]}\r\nexecute @a[scores={welcome_on=0}] ~~~ scoreboard players add @a welcomer 1\r\nexecute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] title §e§lSafe§6Guard\r\nexecute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] subtitle §l§fProtecting §a24§f/§a7\r\nexecute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] times 20 80 20"
}