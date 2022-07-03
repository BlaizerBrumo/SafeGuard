{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\assets\\death_coords.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "a8fa9155_672a_41e2_a910_9a6e46de250e",
	"file_version": 2,
	"cache_content": "execute @s[scores={death_coord_on=0}] ~~~ tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §eYou died at the Coordinates on the next line\"}]}\r\nexecute @s[scores={death_coord_on=0}] ~~~ gamerule sendcommandfeedback true\r\nexecute @s[scores={death_coord_on=0}] ~~~ execute @s ~ ~ ~ tp ~ ~ ~\r\nexecute @s[scores={death_coord_on=0}] ~~~ gamerule sendcommandfeedback false"
}