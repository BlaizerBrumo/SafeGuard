import * as Minecraft from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';
import { invsee, unban, millisecondTime } from './util.js';
const world = Minecraft.world;


//ban form
function banForm(player,targetPlayer,type,banReason){
	if(targetPlayer.hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§r Can't ban §e${targetPlayer.name}§f they're an admin.`);
	if(type == "quick"){
		let confirmF = new MessageFormData()
			.title("Ban Player")
			.body(`Are you sure you want to ban this player:\n${targetPlayer.name}`)
			.button2("Ban")
			.button1("Cancel")
		confirmF.show(player).then((confirmData) => {
			if(confirmData.selection === 1){
				player.addTag('Ban');
				player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${targetPlayer.name}`);
				player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You were banned by §c${player.name}`)
				player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bbanned§l§5 ${targetPlayer.name}! §r"}]}`);

			}
			else return player.sendMessage(`§6[§eSafeGuard§6]§f Cancelled`);
		})
	}
	else if(type=="slow"){
		let banForm = new ModalFormData()
		.title("SafeGuard Ban Form")
		.slider("Ban Time:\n\nDays",0,360,1,0)
		.slider("Hours",0,23,1,0)
		.slider("Minutes",0,59,1,0)
		.toggle("Permanent",false)
		banForm.show(player).then((banFormData) => {
			if(banFormData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§f Cancelled`);
			const now = Date.now();
			const values = banFormData.formValues;
			let unbanMinute = values[2] * millisecondTime.minute;
			let unbanHour = values[1] * millisecondTime.hour;
			let unbanDay = values[0] * millisecondTime.day;
			const unbanTime = now + (unbanMinute + unbanHour + unbanDay);
			const isPermanent = values[3];
			banReason = banReason ?? "No reason provided."
			//if(banReason.includes(":")) banReason.replaceAll(":","");

			if(unbanTime == now && !isPermanent) return player.sendMessage(`§r§6[§eSafeGuard§6]§r§l§c ERROR:§r§4 You did not enter an unban time and did not set the ban to permanent, please make the ban permanent or enter a custom time for unban. The ban was not performed on §c${targetPlayer.name}`) 

			targetPlayer.addTag(`safeguardBanInfo**${isPermanent}**${unbanTime}**${player.name}**${banReason}`);
			targetPlayer.addTag(`safeguard:Ban`);

			player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${targetPlayer.name}`);
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bbanned§l§5 ${targetPlayer.name}! §r"}]}`);
			if(!isPermanent) player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are banned.\n§4Time Remaining: §c${values[0]} Days ${values[1]} Hours ${values[2]} Mins\n§4Reason: §c${banReason == "" ? "No reason provided." : banReason}\n§4Banned by: §c${player.name}`)
			if(isPermanent) player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${banReason == "" ? "No reason provided." : banReason}\n§4Banned by: §c${player.name}`)
			

		})
	}
	else{
		return player.sendMessage(`§6[§eSafeGuard§6]§r§c§lERROR:§4 Unexpected type of ban: §c${type}`)
	}
}

export function unbanForm(player){
	let unbanForm = new ModalFormData()
	.title("SafeGuard Player Unban")
	.textField("Player Name","Player name to unban (case sensitive)");

	unbanForm.show(player).then((formData) => {
		if (formData.canceled) {
			player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
			return;
		}
		const playerName = formData.formValues;
		unban(player,playerName);
	})
}

//settings form
function moduleSettingsForm(player){	
	const settings = ["anti_gmc","anti_grief","anti_items","auto_mod","death_coords","death_effect","lock_end","welcomer","anti_autoclicker","anti_fly","anti_killaura","anti_nuker","anti_spammer"];
	const settingsName = ["Anti GMC","Anti Grief","Anti Items","Auto Mod","Death Coords","Death Effect","Lock End","Welcomer","High CPS Check","Anti Fly","Anti Killaura","Anti Block Nuker","Anti Spammer"];
	const settingsScoreboard = ["gmc_on","grief_on","item_on","auto_mod_on","death_coord_on","death_effect","end_lock","welcome_on","safeguard:cps_check","safeguard:fly_check","safeguard:killaura_check","safeguard:nuker_check","safeguard:spammer_protection"];
	

	let settingsform = new ModalFormData()
	.title("SafeGuard Module Settings");

	for (let i = 0; i < settings.length; i++) {
		const setting = settingsName[i];
		const scoreboard = settingsScoreboard[i];
		const isSettingEnabled = world.scoreboard.getObjective(scoreboard) !== undefined;

		settingsform.toggle(setting, isSettingEnabled);
	}

		settingsform.show(player).then((formData) => {
			if (formData.canceled) {
				player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
				return;
			}

		for (let i = 0; i < settings.length; i++) {
			const setting = settings[i];
			const scoreboard = settingsScoreboard[i];
			const isSettingEnabled = world.scoreboard.getObjective(scoreboard) !== undefined;
			const shouldEnableSetting = formData.formValues[i];

			if (isSettingEnabled !== shouldEnableSetting) {
				player.runCommand(`function settings/${setting}`);
			}
		}
	});
}

function oreAlertSettingsForm(player){

	const settings = ["diamond","netherite"];
	const settingsName = ["Diamond ore Alert","Netherite ore Alert"];
	const settingsScoreboard = ["safeguard:diamond_alert","safeguard:netherite_alert"];

	let oreForm = new ModalFormData()
	.title("SafeGuard Ore Alert Settings")


	for (let i = 0; i < settings.length; i++) {
		const setting = settingsName[i];
		const scoreboard = settingsScoreboard[i];
		const isSettingEnabled = world.scoreboard.getObjective(scoreboard) !== undefined;

		oreForm.toggle(setting, isSettingEnabled);
	}

	oreForm.show(player).then((formData) => {
		if (formData.canceled) {
			player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
			return;
		}

		for (let i = 0; i < settings.length; i++) {
			const setting = settings[i];
			const scoreboard = settingsScoreboard[i];
			const isSettingEnabled = world.scoreboard.getObjective(scoreboard) !== undefined;
			const shouldEnableSetting = formData.formValues[i];

			if (isSettingEnabled !== shouldEnableSetting) {
				player.runCommand(`function settings/xray/${setting}`);
			}
		}
	})
}

export function settingsForm(player){
	let form = new ActionFormData()
	.title("SafeGuard Setting Selection")
	.body("Choose which settings you want to update:")
	.button("Module Settings")
	.button("Ore alert settings")
	form.show(player).then((formData) => {
		if(formData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
		if(formData.selection === 0) return moduleSettingsForm(player);
		if(formData.selection === 1) return oreAlertSettingsForm(player);
	})
}

export function playerSelectionForm(player,action){
	let players = [...world.getPlayers()];
	let form = new ActionFormData()
	.title("SafeGuard Player Selector")
	.body(`Please select a player from ${players.length} online players:`);
	players.forEach((targetPlayer) => {
		let playerName = targetPlayer.name;
		if(targetPlayer.name == player.name) playerName += " (YOU)";
		if(targetPlayer.hasTag("admin")) playerName += " (ADMIN)";
		form.button(playerName,"textures/ui/icon_steve.png");
	})
	form.show(player).then((formData) => {
		if(formData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
		if(action == "action") return playerActionForm(player,players[formData.selection]);
		if(action == "ban") return banForm(player,players[formData.selection],"quick")
	})
}

function playerActionForm(player,targetPlayer){
	if(targetPlayer.hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§r Can't perform actions on §e${targetPlayer.name}§f they're an admin.`);

	const playerActions = ["Ban Player","Kick Player","Warn Player","Echest Wipe","Freeze Player","Mute Player","View Inventory","Unmute Player","Unfreeze Player","Remove All Warnings"];

	let form = new ModalFormData()
	.title(`SafeGuard Action Selector`)
	.dropdown(`Select an Action for ${targetPlayer.name}:`,playerActions)
	.textField("Reason (optional)","")
	form.show(player).then((formData) => {
		if(formData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);

		const action = formData.formValues[0];
		const reason = formData.formValues[1] ?? "";
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bperformed ${playerActions[action]} on§l§5 ${targetPlayer.name}! §r"}]}`);
		if(action === 0){
			return banForm(player,targetPlayer,"slow",reason);
		}
		if(action === 1) player.runCommandAsync(`kick "${targetPlayer.name}" ${reason}`);
		if(action === 2){
			let warnings = world.scoreboard.getObjective("warning");
			if(warnings == undefined) return player.sendMessage(`§6[§eSafeGuard§6]§r §c§lERROR:§4 Please setup the anticheat!`);
			let newWarnings = warnings.getScore(targetPlayer.scoreboardIdentity) + 1;
			world.scoreboard.setScore(warnings,targetPlayer.scoreboardIdentity,newWarnings);
			targetPlayer.sendMessage(`§6[§eSafeGuard§6]§r§4§l You were warned!${reason ? ` Reason: §c${reason}` : ""}`);
			if(newWarnings == 2) targetPlayer.sendMessage(`§6[§eSafeGuard§6]§r§l§c §4Next warning will result in a permanent ban!§r`);
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully warned player §e${targetPlayer.name}`);
		}
		if(action === 3){
			targetPlayer.addTag("echest_wipe");
			if(reason) targetPlayer.sendMessage(`§6[§eSafeGuard§6]§r §4Reason: §c${reason}`);
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully wiped §e${targetPlayer.name}§f's enderchest`)
		}
		if(action === 4){
			targetPlayer.addTag("freeze");
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully frozen §e${targetPlayer.name}`);
		}
		if(action === 5){
			targetPlayer.addTag("muted");
			targetPlayer.sendMessage(`§6[§eSafeGuard§6]§r §4You were muted!${reason ? ` Reason: §c${reason}` : ""}`);
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully muted §e${targetPlayer.name}`);
		}
		if(action === 6) return invsee(player.name,targetPlayer.name);
		if(action === 7){
			if(!targetPlayer.hasTag("muted")) return player.sendMessage(`§6[§eSafeGuard§6]§r §e${targetPlayer.name}§f is not muted!`);
			targetPlayer.removeTag("muted");
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully unmuted §e${targetPlayer.name}`);
			player.sendMessage(`§6[§eSafeGuard§6]§r You were unmuted!`)
		}
		if(action === 8){
			if(!targetPlayer.hasTag("freeze")) return player.sendMessage(`§6[§eSafeGuard§6]§r §e${targetPlayer.name}§f is not frozen`);
			targetPlayer.addTag("unfreeze");
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully unfreezed §e${targetPlayer.name}`);
		}
		if(action === 9){
			targetPlayer.addTag("warning_reset");
			player.sendMessage(`§6[§eSafeGuard§6]§r Successfully reset all warnings of §e${targetPlayer.name}`);
		}
	})
}
