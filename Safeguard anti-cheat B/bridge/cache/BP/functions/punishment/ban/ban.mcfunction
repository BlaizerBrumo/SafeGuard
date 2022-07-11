{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\ban\\ban.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "a7ca5dde_1e5f_45fa_8b5b_a95ad0457adb",
	"file_version": 13,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\nscoreboard players add @a[tag=ban,tag=!admin] banned 1\ntag @a[scores={banned=100..}] add Ban\nexecute @a[scores={banned=99}] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"selector\":\"@s\"},{\"text\":\"§r got banned!\"}]}\nexecute @a[scores={banned=1}] ~~~ tag @s remove admin\nexecute @a[tag=Ban] ~~~ tag @s remove admin"
}