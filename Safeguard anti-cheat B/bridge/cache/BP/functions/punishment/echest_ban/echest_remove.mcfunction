{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\echest_ban\\echest_remove.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "3454b72b_06dc_4672_ac62_880d8b57bb77",
	"file_version": 9,
	"cache_content": "tellraw @s {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r§c§l \"},{\"text\":\"ERROR: §r§4This function shouldn't be ran manually§r\"}]}\ntellraw @a[tag=echest_unban] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6] §aEchest ban was removed!!\"}]}\nexecute @a[tag=echest_unban] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@a[tag=echest_unban]\"},{\"text\":\"'s §benderchest ban was removed! §r\"}]}\ntag @a[tag=echest_unban] remove echest_ban\ntag @a[tag=echest_unban] remove echest_unban"
}