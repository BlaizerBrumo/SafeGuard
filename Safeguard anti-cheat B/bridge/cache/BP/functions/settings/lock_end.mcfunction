{
	"file_path": "C:\\Users\\ilyas\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Safeguard anti-cheat\\functions\\settings\\lock_end.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "51ddf5a5_4806_4021_8c7d_74b12349265c",
	"file_version": 27,
	"cache_content": "#Toggle the end lock\r\nscoreboard players add @s[tag=admin] endnether_toggle 1\r\nscoreboard players set @s[tag=admin,scores={endnether_toggle=2..}] endnether_toggle 0\r\ntellraw @s[tag=admin,scores={endnether_toggle=0}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§b End lock §l§5turned off! §r\"}]}\r\nexecute @s[tag=admin,scores={endnether_toggle=0}] ~~~ scoreboard objectives remove end_lock\r\nexecute @s[tag=admin,scores={endnether_toggle=0}] ~~~ scoreboard objectives add end_yes dummy\r\ntellraw @s[tag=admin,scores={endnether_toggle=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§b End lock §l§5turned on! §r\"}]}\r\nexecute @s[tag=admin,scores={endnether_toggle=1}] ~~~ scoreboard objectives add end_lock dummy\r\nexecute @s[tag=admin,scores={endnether_toggle=1}] ~~~ scoreboard objectives remove end_yes\r\nplaysound note.bass @s[tag=admin] ~~~\r\n#deny\r\ntellraw @s[tag=!admin] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r\"}]}\r\nplaysound random.anvil_land @s[tag=!admin]\r\n#Notify\r\nexecute @s[scores={endnether_toggle=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@s[scores={endnether_toggle=1}]\"},{\"text\":\" §bturned on§l§5 End Lock! §r\"}]}\r\nexecute @s[scores={endnether_toggle=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {\"rawtext\":[{\"text\":\"§6[§eSafeGuard Notify§6]§5§l \"},{\"selector\":\"@s[scores={endnether_toggle=0}]\"},{\"text\":\" §bturned off§l§5 End Lock! §r\"}]}"
}