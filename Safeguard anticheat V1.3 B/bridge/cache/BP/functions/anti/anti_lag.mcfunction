{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\anti\\anti_lag.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "5340b39c_73e0_4e25_909f_196ded6fee58",
	"file_version": 35,
	"cache_content": "#PUT THIS IN A REPEATING COMMAND BLOCK ONLY WITH A TICK PER SECOND DELAY\r\n#Killing the entities and stuff idk\r\ngamerule domobloot false\r\nscoreboard objectives add anti_lag dummy\r\nscoreboard players add @r[tag=admin] anti_lag 1\r\nexecute @a[scores={anti_lag=1}] ~~~ tellraw @a[scores={anti_lag=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 10 seconds...\"}]}"
}