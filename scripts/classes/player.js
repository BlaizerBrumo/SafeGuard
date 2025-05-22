import { Player, world, InputPermissionCategory } from "@minecraft/server";
import { formatMilliseconds, generateBanLog, logDebug, sendMessageToAllAdmins } from "../assets/util";
import { SafeguardModule } from "./module";

Player.prototype.initialClick = 0;
Player.prototype.finalCps = 0;
Player.prototype.currentCps = 0;
Player.prototype.hitEntities = [];
Player.prototype.previousYVelocity = 0;
Player.prototype.previousSpeed = 0;
Player.prototype.registerValidCoords = true; 
Player.prototype.isMuted = false;
Player.prototype.tridentLastUse = 0;

//get warns
Player.prototype.getWarnings = function(){
	const warnings_string = this.getDynamicProperty("safeguard:warnings");
	if(!warnings_string) return {};
	const warnings = JSON.parse(warnings_string);

	return warnings;
}
//clear warns
Player.prototype.clearWarnings = function(){
	this.setDynamicProperty("safeguard:warnings",JSON.stringify({}));
}
//set warn
Player.prototype.setWarning = function(module){
	if (module !== "manual" && !SafeguardModule.getValidModules().includes(module)) throw ReferenceError(`"${module}" isn't a safeguard module.`);
	const warnings = this.getWarnings();
	const moduleID = module === "manual" ? module : SafeguardModule.getModuleID(module);

	if(!warnings[moduleID]) warnings[moduleID] = 1;
	else warnings[moduleID] += 1;
	
	logDebug(JSON.stringify(warnings));

	this.setDynamicProperty("safeguard:warnings", JSON.stringify(warnings));

	if(module === "manual"){
		const manualWarningCount = warnings[moduleID];
		if (manualWarningCount === 2) this.sendMessage(`§r§6[§eSafeGuard§6]§4 Warning!§c Next warning from an admin will result in a permanent ban.`);
		else if(manualWarningCount === 3){
			this.ban("Reaching 3 manual warnings", -1, true, "SafeGuard AntiCheat");
			this.runCommand(`kick "${this.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §cReaching 3 manual warnings.\n§4Banned by: §cSafeGuard AntiCheat`);
			sendMessageToAllAdmins(`§r§6[§eSafeGuard Notify§6]§4 The player §c${this.name}§4 was permanently banned for reaching 3 manual warnings.`,true);
		}
	}
	
}

//get ban info 
Player.prototype.getBan = function() {
	const banProperty = this.getDynamicProperty("safeguard:banInfo");
	if (!banProperty) return { isBanned: false };

	const playerBanInfo = JSON.parse(banProperty);

	if (!playerBanInfo.isBanned) return { isBanned: false };

	// Check if the ban has expired
	if (!playerBanInfo.isPermanent && Date.now() > playerBanInfo.unbanTime) {
		// Unban the player
		playerBanInfo.isBanned = false;
		this.setDynamicProperty("safeguard:banInfo", JSON.stringify(playerBanInfo));
		return { isBanned: false };
	}

	return playerBanInfo;
};

//mute
Player.prototype.getMuteInfo = function(){
	const muteInfo = JSON.parse(this.getDynamicProperty("safeguard:muteInfo") ?? '{"duration":-1}');
	const isActive = muteInfo.isPermanent ? true : (muteInfo.duration - Date.now()) > 0;
	muteInfo.isActive = isActive;
	if(!isActive) muteInfo.duration = -1;
	logDebug("[Mute Info]",isActive, muteInfo.duration - Date.now());
	return muteInfo;
}

//ban
Player.prototype.ban = function(reason="No reason provided", unbanTime, permanent, admin) {
	if (typeof reason !== "string") throw TypeError(`Parameter "reason" is typeof "${typeof reason}", should be typeof string`);
	if (typeof permanent !== "boolean") throw TypeError(`Parameter "permanent" is typeof "${typeof permanent}", should be typeof boolean`);
	if (typeof unbanTime !== "number") throw TypeError(`Parameter "time" is typeof "${typeof unbanTime}", should be typeof number`);
	
	if(admin && typeof admin !== "string"){
		if (!(admin instanceof Player)) throw TypeError(`Parameter "admin" is not instanceof player`);
		if (!admin.hasAdmin()) throw Error(`The player "${admin.name}" does not have permission to ban`);
	}
	if (this.hasAdmin()) throw Error(`Player "${this.name}" cannot be banned, is admin`);
	if (reason.length > 200) throw RangeError(`Reason length is more than allowed 200 characters long (is ${reason.length})`);

	const banProperty = this.getDynamicProperty("safeguard:banInfo");

	if (banProperty?.isBanned) throw SyntaxError(`Player "${this.name}" is already banned`);

	const bannedByAdminName = (admin?.name ?? admin) || "SafeGuard AntiCheat";

	//a - banned persons name
	//b - admin name
	//c - time of ban
	//d - ban reason
	try{
		generateBanLog({
			a:this.name,
			b:bannedByAdminName,
			c:Date.now(),
			d:reason
		})
	}
	catch(error){
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§c There was an error creating a ban log for §4${this.name}§c Error: \n§4${error}`)
	}

	const banObject = {
		isBanned: true,
		unbanTime: unbanTime,
		isPermanent: permanent,
		bannedBy: bannedByAdminName,
		banTime: Date.now(),
		reason: reason,
	};

	this.setDynamicProperty("safeguard:banInfo", JSON.stringify(banObject));
};

//unban
Player.prototype.unban = function() {
	function removeFromUnbanQueue(player){
		const unbanInfo = {
			isBanned: false,
		};
		world.safeguardUnbanQueue.splice(world.safeguardUnbanQueue.indexOf(player.name), 1);
		world.setDynamicProperty("safeguard:unbanQueue", world.safeguardUnbanQueue.join(","));
		player.setDynamicProperty("safeguard:banInfo", JSON.stringify(unbanInfo));
	}
	const banProperty = this.getDynamicProperty("safeguard:banInfo");
	if (!banProperty) {
		removeFromUnbanQueue(this)
		logDebug(`Player "${this.name}" is not banned (property missing)`);
		return false;
	}
	const banInfo = JSON.parse(banProperty);
	if (!banInfo?.isBanned) {
		removeFromUnbanQueue(this)
		logDebug(`Player "${this.name}" is not banned (.isBanned=${banInfo.isBanned.toString() ?? "null"})`);
		return false;
	}
	
	removeFromUnbanQueue(this)
	
	return true;
};

Player.prototype.setFreezeTo = function(freeze){
	if(typeof freeze !== "boolean") throw TypeError(`Type of freeze is "${typeof freeze}" should be boolean`);

	this.setDynamicProperty("safeguard:freezeStatus",freeze);

	this.inputPermissions.setPermissionCategory(InputPermissionCategory.Camera, !freeze);
	this.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, !freeze);
};

//mute
Player.prototype.mute = function(adminPlayer,reason, durationMs) {
	if (adminPlayer && typeof adminPlayer !== "string") {
		if (!(adminPlayer instanceof Player)) throw TypeError(`Parameter "adminPlayer" is not instanceof player`);
		if (!adminPlayer.hasAdmin()) throw Error(`The player "${adminPlayer.name}" does not have permission to ban`);
	}
	if(typeof reason !== "string") throw TypeError(`Type of reason is "${typeof reason}" should be string`);
	if(typeof durationMs !== "number") throw TypeError(`Type of durationMs is "${typeof durationMs}" should be number`);

	const adminName = (adminPlayer?.name ?? adminPlayer) || "SafeGuard AntiCheat";

	const isPermanent = durationMs == -1;
	const endTime = isPermanent ? "permanent" : Date.now() + durationMs;
	const muteTime = isPermanent ? "permanent time" : `${timeValue}${timeUnit}`;
	const muteInfo = {
		admin: adminName,
		duration: endTime,
		isPermanent: isPermanent,
		reason: reason
	}
	this.setDynamicProperty("safeguard:muteInfo", JSON.stringify(muteInfo));
	this.isMuted = true;

	// Notify player and admins
	adminPlayer.sendMessage(`§6[§eSafeGuard§6]§f You have muted §e${this.name}§f for §e${muteTime}.`);
	sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${this.name}§f has been muted for §e${muteTime}§f by §e${adminPlayer.name}§f. Reason: §e${reason}§f`, true);
	logDebug(`MUTED NAME="${this.name}"; REASON="${reason}"; DURATION=${formatMilliseconds(durationMs)}`);
}

//unmute
Player.prototype.unmute = function(){
	if(!this.isMuted) throw Error(`"${this.name}" is not muted`);

	const muteInfo_string = JSON.stringify({
		admin: "",
		duration: -1,
		isPermanent: false,
		reason: ""
	});;
	this.setDynamicProperty("safeguard:muteInfo", muteInfo_string);
	this.isMuted = false;

	logDebug(muteInfo_string);
}

Player.prototype.isOwner = function(){
	return this.getDynamicProperty("safeguard:ownerStatus") ?? false;
	//TODO: save the owner password in dynamic property
	//NOTE: owner should have more powers than admins, for example editing config and denying admins ppermissions
	//CHALLENGE: determining which player to give owner to on initiliaze
	//
	//POSSIBLE SOLUTION: 
	//first player to use owner password, the owner password could be either set inside config.js (where only owner can access)
	//another way could be to randomly generate a password on initialize, and display it to the first player to run setup
	//problem, if owner doesn't setup correctly, another admin can get owner status with no way to get it back 
};

//check admin status
Player.prototype.hasAdmin = function() {
	// this is in case I ever change the admin tag or if the user wants to change it
	return this.hasTag("admin") || this.isOwner();
};

logDebug(`[SafeGuard] Updated Player class`);