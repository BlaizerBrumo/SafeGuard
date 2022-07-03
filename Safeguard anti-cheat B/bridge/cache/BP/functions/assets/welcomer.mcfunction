{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\assets\\welcomer.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "b2c9970b_238e_4198_ac3c_d9229b9b3854",
	"file_version": 10,
	"cache_content": "#Tag \r\nscoreboard players set @a[scores={welcomer=3..}] welcomer 2\r\nexecute @a[scores={welcomer=..1}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§e\"},{\"selector\":\"@s\"},{\"text\":\" §bIs joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r\"}]}\r\nscoreboard players add @a welcomer 1"
}