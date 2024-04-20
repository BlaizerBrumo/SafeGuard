import * as config from "../config";

let commands = {};

export function newCommand(obj){
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
      helpData.push({ name: command.name, description: command.description, adminOnly: command.adminOnly });
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
    data.cancel = true;


    if(!command) return player.sendMessage(`§cUnknown command: §f${args[0]}`);

    let runData = {
        args: args,
        player: player,
        message: message
    }
    if(cmdName == "help") runData.commandsData = getHelpData();

    if(command.adminOnly && !player.hasTag("admin")) return player.sendMessage('§6[§eSafeGuard§6]§r§c You need admin tag to run this!');
    
    command.run(runData);
}