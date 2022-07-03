{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\flag\\flagged.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "50559ccb_cd70_4b33_94e1_890a6f42cbfb",
	"file_version": 14,
	"cache_content": "title @a[tag=flagged] times 1 1 1\ngamemode adventure @a[tag=flagged]\neffect @a[tag=flagged] slowness 1000 10 true\neffect @a[tag=flagged] blindness 1000 10 true\ntitle @a[tag=flagged] title §4You have been flagged!§r\ntitle @a[tag=flagged] subtitle §4Contact your admin for appeal.§r\nscoreboard players add @a[tag=flagged] flagged 0\nexecute  @a[tag=flagged] ~~~ tp @p[tag=flagged,c=1] ~ 1000 ~"
}