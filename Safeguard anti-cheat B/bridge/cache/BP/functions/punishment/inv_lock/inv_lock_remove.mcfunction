{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\inv_lock\\inv_lock_remove.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "78cf51cb_e8f0_4636_9da6_0ce469255147",
	"file_version": 6,
	"cache_content": "tellraw @a[tag=inv_unlock] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6] §aInventory lock was removed!!\"}]}\nclear @a[tag=inv_unlock]\nexecute @a[tag=inv_unlock] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@a[tag=inv_unlock]\"},{\"text\":\"'s §binventory was unlocked! §r\"}]}\ntag @a[tag=inv_unlock] remove inv_lock\ntag @a[tag=inv_unlock] remove inv_unlock\ntellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}"
}