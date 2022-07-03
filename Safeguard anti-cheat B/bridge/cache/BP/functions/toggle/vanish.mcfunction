{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\FTEES mod\\functions\\toggle\\vanish.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "3a0a5ba3_60a3_4a2d_8b9a_7e652ec27321",
	"file_version": 11,
	"cache_content": "scoreboard players add @s toggle 1\r\nscoreboard players set @s[scores={toggle=2..}] toggle 0\r\neffect @s[scores={toggle=0}] invisibility 0 0\r\neffect @s[scores={toggle=1}] invisibility 99999 0 true\r\ntellraw @s[scores={toggle=1}]  {\"rawtext\":[{\"text\":\"§7Poof! You vanished!§r\"}]}\r\ntellraw @s[scores={toggle=0}]  {\"rawtext\":[{\"text\":\"§7Poof! You re-appeared!§r\"}]}"
}