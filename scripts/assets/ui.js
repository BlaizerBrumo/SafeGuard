import * as Minecraft from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';
import { addPlayerToUnbanQueue, getPlayerByName, invsee, logDebug, millisecondTime, sendMessageToAllAdmins } from './util.js';
import { SafeguardModule } from '../classes/module.js';


const world = Minecraft.world;


//ban form
function banForm(player, targetPlayer, type, banReason) {
	if (targetPlayer.hasAdmin()) return player.sendMessage(`§6[§eSafeGuard§6]§r Can't ban §e${targetPlayer.name}§f they're an admin.`);

	if (type == "quick") {
		let confirmF = new MessageFormData()
			.title("Ban Player")
			.body(`Are you sure you want to ban this player:\n${targetPlayer.name}`)
			.button2("Ban")
			.button1("Cancel")
		confirmF.show(player).then((confirmData) => {
			if (confirmData.selection === 1) {
				targetPlayer.ban("No reason provided.", Date.now(), true, player);

				targetPlayer.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §cNo reason provided\n§4Banned by: §c${player.name}`)

				player.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}`);
				sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${player.name}§f banned §e${targetPlayer.name}§f!`, true);

			}
			else return player.sendMessage(`§6[§eSafeGuard§6]§f Cancelled`);
		})
	}
	else if (type == "slow") {
		let banForm = new ModalFormData()
			.title("SafeGuard Ban Form")
			.slider("Ban Time:\n\nDays", 0, 360, 1, 0)
			.slider("Hours", 0, 23, 1, 0)
			.slider("Minutes", 0, 59, 1, 0)
			.toggle("Permanent", false)
		banForm.show(player).then((banFormData) => {
			if (banFormData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§f Cancelled`);
			const now = Date.now();
			const values = banFormData.formValues;
			let unbanMinute = values[2] * millisecondTime.minute;
			let unbanHour = values[1] * millisecondTime.hour;
			let unbanDay = values[0] * millisecondTime.day;
			const unbanTime = now + (unbanMinute + unbanHour + unbanDay);
			const isPermanent = values[3];
			banReason = banReason ?? "No reason provided."

			if (unbanTime == now && !isPermanent) return player.sendMessage(`§r§6[§eSafeGuard§6]§r§l§c ERROR:§r§4 You did not enter an unban time and did not set the ban to permanent, please make the ban permanent or enter a custom time for unban. The ban was not performed on §c${targetPlayer.name}`)

			targetPlayer.ban(banReason, unbanTime, isPermanent, player);

			player.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}`);
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${player.name}§f banned §e${targetPlayer.name}§f!`, true);

			if (!isPermanent) player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are banned.\n§4Time Remaining: §c${values[0]} Days ${values[1]} Hours ${values[2]} Mins\n§4Reason: §c${banReason == "" ? "No reason provided." : banReason}\n§4Banned by: §c${player.name}`)
			if (isPermanent) player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${banReason == "" ? "No reason provided." : banReason}\n§4Banned by: §c${player.name}`)


		})
	}
	else {
		return player.sendMessage(`§6[§eSafeGuard§6]§r§c§lERROR:§4 Unexpected type of ban: §c${type}`)
	}
}

export function unbanForm(player) {
	let unbanForm = new ModalFormData()
		.title("SafeGuard Player Unban")
		.textField("Player Name", "Player name to unban (case sensitive)");

	unbanForm.show(player).then((formData) => {
		if (formData.canceled) {
			player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
			return;
		}
		const playerName = formData.formValues[0];

		addPlayerToUnbanQueue(player, playerName);
	})
}

export function settingSelector(player) {
	//if (world.config.other.ownerOnlySettings && !player.isOwner()) return ownerLoginForm(player);

	const form = new ActionFormData()
		.title("SafeGuard Settings")
		.body(`Please select an option from below:`)
		.button("Module Settings")
		.button("Config Editor")
		.button("Other Settings")
	player.playSound("random.pop");

	form.show(player).then((formData) => {
		if (formData.canceled) return;
		switch (formData.selection) {
			case 0:
				return moduleSettingsForm(player);
			case 1:
				return configEditorForm(player);
			case 2:
				return player.sendMessage(`§6[§eSafeGuard§6]§r Nothing here yet!`);
		}
	})
}


function ownerLoginForm(player) {
	return;
	if (!world.config.OWNER_PASSWORD) {
		return player.sendMessage(`§6[§eSafeGuard§6]§4 Error!§c You have not set an owner password inside of the configuration file, access denied.`);
	}
	const form = new ModalFormData().title("SafeGuard Owner Login");
	form.textField("Owner Password", "Enter password here...");

	form.show(player).then((formData) => {
		if (formData.canceled) return;
		if (formData.formValues[0] === world.config.OWNER_PASSWORD) {
			player.sendMessage("§6[§eSafeGuard§6]§a Access granted, you now have owner status.");
			player.setDynamicProperty("safeguard:ownerStatus", true);
		}
		else player.sendMessage("§6[§eSafeGuard§6]§4 Invalid password!");
	})
}

function configEditorForm(player) {
	return player.sendMessage(`§6[§eSafeGuard§6]§r Config editor is disabled as it's not finished.`)
	if (!player.isOwner()) return ownerLoginForm(player);

	const mainConfigForm = new ActionFormData().title("SafeGuard Config Editor");
	const configOptions = Object.keys(config).filter(key => typeof (config[key]) === "object");

	for (let i = 0; i < configOptions.length; i++) {
		mainConfigForm.button(configOptions[i]);
	}
	mainConfigForm.show(player).then((configSelection) => {
		if (configSelection.canceled) return;

		const configModuleForm = new ModalFormData();
		const configModuleOptions = Object.entries(config[configOptions[configSelection.selection]]);
		configModuleForm.title(`Settings: ${configOptions[configSelection.selection]}`)

		for (const [key, value] of configModuleOptions) {
			if (typeof value === "object") {
				const entries = Object.entries(value);

				for (const [subKey, subValue] of entries) {
					switch (typeof subValue) {
						case "boolean":
							configModuleForm.toggle(`${key} -> ${subKey}\n`, subValue);
						case "number":
						case "string":
							configModuleForm.textField(`${key} -> ${subKey}\n`, subValue.toString(), subValue.toString());
						default:
							continue;
					}
				}
			}
			else {
				switch (typeof value) {
					case "boolean":
						configModuleForm.toggle(`${key}\n`, value);
					case "number":
					case "string":
						configModuleForm.textField(`${key}\n`, value.toString(), value.toString());
					default:
						continue;
				}
			}
		}

		configModuleForm.show(player).then((formData) => {
			if (formData.canceled) {
				player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
				return;
			}
			player.sendMessage(JSON.stringify(formData.formValues));
		})
	})
}
//settings form
function moduleSettingsForm(player) {

	let settingsform = new ModalFormData()
		.title("SafeGuard Module Settings");

	const validModules = SafeguardModule.getValidModules();
	for (let i = 0; i < validModules.length; i++) {
		const setting = validModules[i];
		const isSettingEnabled = SafeguardModule.getModuleStatus(setting);

		settingsform.toggle(setting, isSettingEnabled);
	}

	settingsform.show(player).then((formData) => {
		if (formData.canceled) {
			player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
			return;
		}

		for (let i = 0; i < validModules.length; i++) {
			const setting = validModules[i];
			const isSettingEnabled = SafeguardModule.getModuleStatus(setting)
			const shouldEnableSetting = formData.formValues[i];

			if (isSettingEnabled !== shouldEnableSetting) {
				SafeguardModule.toggleModule(setting);
				sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f ${player.name}§f turned ${shouldEnableSetting ? "on" : "off"} §e${setting}§f!`, true);
			}
		}
	});
}

export function playerSelectionForm(player, action) {
	let players = [...world.getPlayers()];
	let form = new ActionFormData()
		.title("SafeGuard Player Selector")
		.body(`Please select a player from ${players.length} online players:`);
	players.forEach((targetPlayer) => {
		let playerName = targetPlayer.name;
		if (targetPlayer.name == player.name) playerName += " (YOU)";
		if (targetPlayer.hasAdmin()) playerName += " (ADMIN)";
		form.button(playerName, "textures/ui/icon_steve.png");
	})
	form.show(player).then((formData) => {
		if (formData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);
		if (action == "action") return playerActionForm(player, players[formData.selection]);
		if (action == "ban") return banForm(player, players[formData.selection], "quick")
	})
}

function playerActionForm(player, targetPlayer) {
	if (targetPlayer.hasAdmin()) return player.sendMessage(`§6[§eSafeGuard§6]§r Can't perform actions on §e${targetPlayer.name}§f they're an admin.`);

	const playerActions = ["Ban Player", "Kick Player", "Warn Player", "Freeze Player", "Mute Player", "View Inventory", "Unmute Player", "Unfreeze Player", "Remove All Warnings"];

	let form = new ModalFormData()
		.title(`SafeGuard Action Selector`)
		.dropdown(`Select an Action for ${targetPlayer.name}:`, playerActions)
		.textField("Reason (optional)", "")
	form.show(player).then((formData) => {
		if (formData.canceled) return player.sendMessage(`§6[§eSafeGuard§6]§r You closed the form without saving!`);

		const action = formData.formValues[0];
		const reason = formData.formValues[1] ?? "";
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§5§l ${player.name} §bperformed ${playerActions[action]} on§l§5 ${targetPlayer.name}! §r`, true);

		switch (action) {
			case 0:
				return banForm(player, targetPlayer, "slow", reason);
			case 1:
				player.runCommandAsync(`kick "${targetPlayer.name}" ${reason}`);
				break
			case 2:
				targetPlayer.setWarning("manual");
				targetPlayer.sendMessage(`§6[§eSafeGuard§6]§r§4§l You were warned!${reason ? ` Reason: §c${reason}` : ""}`);
				player.sendMessage(`§6[§eSafeGuard§6]§r Successfully warned player §e${targetPlayer.name}`);
				break;
			case 3:
				if (targetPlayer.getDynamicProperty("safeguard:freezeStatus")) return player.sendMessage(`§6[§eSafeGuard§6]§f §e${targetPlayer.name}§f is already frozen.`);

				targetPlayer.setFreezeTo(true);
				player.sendMessage(`§6[§eSafeGuard§6]§f Succesfully froze §e${targetPlayer.name}`);
				targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were §efrozen§f by the admin §e${player.name}`);
				break;
			case 4:
				//permanent mute
				targetPlayer.mute(player, reason, -1);
				break;
			case 5:
				return invsee(player, targetPlayer);
			case 6:
				if (!targetPlayer.isMuted) {
					player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetPlayer.name}§f is not muted.`);
					return;
				}
				player.unmute();

				player.sendMessage(`§6[§eSafeGuard§6]§r Successfully unmuted §e${targetPlayer.name}`);
				player.sendMessage(`§6[§eSafeGuard§6]§r You were unmuted!`)
				break;
			case 7:
				if (!targetPlayer.getDynamicProperty("safeguard:freezeStatus")) return player.sendMessage(`§6[§eSafeGuard§6]§f §e${targetPlayer.name}§f is not frozen.`);

				targetPlayer.setFreezeTo(false);
				player.sendMessage(`§6[§eSafeGuard§6]§f Succesfully unfroze §e${targetPlayer.name}`);
				targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were §eunfrozen§f by the admin §e${player.name}`);
				break;
			case 8:
				targetPlayer.clearWarnings();
				player.sendMessage(`§6[§eSafeGuard§6]§r Successfully reset all warnings of §e${targetPlayer.name}`);
				break;
		}
	})
}