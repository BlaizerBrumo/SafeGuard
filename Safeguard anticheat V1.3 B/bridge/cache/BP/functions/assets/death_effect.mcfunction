{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\assets\\death_effect.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "4eec2387_1136_4e8a_8bfa_e67cc1506142",
	"file_version": 22,
	"cache_content": "gamerule mobgriefing false\r\nexecute @s[scores={death_effect=0}] ~~~ summon minecraft:lightning_bolt ~ ~3~\r\nexecute @s[scores={death_effect=0}] ~~~ playsound random.levelup @s\r\nexecute @s[scores={death_effect=0}] ~~~ particle minecraft:totem_particle ~~1~\r\ngamerule mobgriefing true"
}