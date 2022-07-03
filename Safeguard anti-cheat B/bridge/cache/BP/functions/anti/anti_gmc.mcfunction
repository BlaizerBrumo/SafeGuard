{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\anti\\anti_gmc.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "58bfa55b_464a_4478_83c4_aff8726f5925",
	"file_version": 23,
	"cache_content": "execute @a[scores={gmc_on=0}] ~~~ execute @a [m=creative , tag=!admin] ~~~ tellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"selector\":\"@p[m=creative]\"},{\"text\":\" §r§4Was detected being in §l§ccreative!§r\"}]}\r\nexecute @a[scores={gmc_on=0}] ~~~ execute @a[tag=!admin, m=creative, scores={auto_mod_on=0}] ~~~ tag @s add flagged\r\nexecute @a[scores={gmc_on=0}] ~~~ gamemode survival @a[tag=!admin , m=creative]"
}