{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\punishment\\flag\\flagged_remove.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "3ca13d14_c8bf_4270_a1bc_83bfc3919004",
	"file_version": 13,
	"cache_content": "tag @a[tag=unflag] remove flagged\ngamemode survival @a[tag=unflag]\neffect @a[tag=unflag] clear\ntellraw @a[tag=unflag] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6] §aFlag was removed!!\"}]}\nexecute  @a[tag=unflag] ~~~ tp @p[tag=unflag] ~ 140 ~\neffect @a[tag=unflag] slow_falling 60 0 true\nexecute @a[tag=unflag] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@a[tag=unflag]\"},{\"text\":\" §bwas unflagged! §r\"}]}\ntag @a[tag=unflag] remove unflag"
}