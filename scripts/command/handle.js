import * as config from "../config";

let commands = {};

/**
 * Creates a new safeguard command.
 *
 * @param {Object} obj - The command object configuration.
 * @param {boolean} [obj.disabled=false] - Whether the command is disabled.
 * @param {string} obj.name - The name of the command.
 * @param {string} obj.description - A description of the command.
 * @param {boolean} [obj.adminOnly=true] - Whether the command is admin-only.
 * @param {boolean} [obj.ownerOnly=false] - Whether the command is only for the owner.
 * @param {function} obj.run - The function to execute when the command is triggered.
 */
export function newCommand(obj){
    if(typeof obj !== "object") throw TypeError(`The function "newCommand()" takes in an object as a parameter`);
    if(obj.disabled) return;
    if(commands[obj.name]) return console.error(`§4[SafeGuard] A command named "${obj.name}" already exists!`)
    if(!obj.description) {
        obj.description = "No description provided";
        console.error(`§4[SafeGuard] The command "${obj.name}" does not have a description!`)
    }
    if(obj.adminOnly !== false) obj.adminOnly = true;
    commands[obj.name] = obj;
}

export function getHelpData() {
    const helpData = [];
    for (const commandName in commands) {
      const command = commands[commandName];
      helpData.push({ name: command.name, description: command.description, adminOnly: command.adminOnly, ownerOnly: command.ownerOnly });
    }
    return helpData;
}

export function commandHandler(data){
    const prefix = config.default.chat.prefix;
    const player = data.sender;
	const message = data.message;
    const args = message.substring(prefix.length).split(" ");
    const cmdName = args[0];
    const command = commands[cmdName];


    if (!command) return player.sendMessage(`§r§6[§eSafeGuard§6]§c Unknown command: §f${args[0]}`);

    let runData = {
        args: args,
        player: player,
        message: message
    }
    if(cmdName == "help") runData.commandsData = getHelpData();

    if(command.adminOnly && !player.hasAdmin()) return player.sendMessage('§6[§eSafeGuard§6]§r§c You need admin tag to run this!');
    if (command.ownerOnly && !player.isOwner()) return player.sendMessage('§6[§eSafeGuard§6]§r§c You need owner status to run this!')

    try{
        command.run(runData);
    }
    catch(error){
        player.sendMessage(`§6[§eSafeGuard§6]§r§c Caught error while running command "${cmdName}":\n\n${error}\n${error.stack}`);
    }
}