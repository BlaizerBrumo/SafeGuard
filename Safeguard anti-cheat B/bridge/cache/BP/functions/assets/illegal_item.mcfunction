{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\assets\\illegal_item.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "a14c9b6a_0031_41b7_962e_a0609d7efa0d",
	"file_version": 3,
	"cache_content": "execute @s[scores={auto_mod_on=0}] ~~~ tag @s add flagged\r\nreplaceitem entity @s slot.weapon.mainhand 0 air\r\ntellraw @a {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"selector\":\"@s\"},{\"text\":\" §r§4Was detected having an §l§cILLEGAL ITEM!§r\"}]}"
}