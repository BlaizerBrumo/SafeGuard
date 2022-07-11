{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\softban\\softban.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "62aa987c_a861_40ae_b943_d667dafd9ac6",
	"file_version": 7,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\r\ntitle @a[tag=softban] times 1 1 1\r\ngamemode adventure @a[tag=softban]\r\neffect @a[tag=softban] slowness 1000 10 true\r\neffect @a[tag=softban] blindness 1000 10 true\r\ntitle @a[tag=softban] title §4You have been softbanned!§r\r\nscoreboard players add @a[tag=softban] softban 0\r\nexecute  @a[tag=softban] ~~~ tp @p[tag=softban,c=1] ~ 1000 ~"
}