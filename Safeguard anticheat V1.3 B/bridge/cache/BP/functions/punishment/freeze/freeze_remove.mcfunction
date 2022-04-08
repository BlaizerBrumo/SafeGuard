{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\freeze\\freeze_remove.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "0547cede_0c39_434e_8d50_e32782d911a7",
	"file_version": 11,
	"cache_content": "#unfreezes person\ntag @a[tag=unfreeze] remove freeze\neffect @a[tag=unfreeze] clear\ntellraw @a[tag=unfreeze] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6] §aFreeze was removed!!\"}]}\nexecute @a[tag=unfreeze] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@a[tag=unfreeze]\"},{\"text\":\" §bwas unfreezed! §r\"}]}\ntag @a[tag=unfreeze] remove unfreeze"
}