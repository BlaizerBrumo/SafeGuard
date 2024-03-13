import * as config from "../config";

let commands = {};

export function newCommand(obj){
    if(commands[obj.name]) return console.warn(`§4[ERROR] A command named "${obj.name}" already exists!`)
    commands[obj.name] = obj;
}

export function commandHandler(data){
    const prefix = config.default.chat.prefix;
    const player = data.sender;
	const message = data.message;
    const args = message.substring(prefix.length).split(" ");
    const cmdName = args[0];
    data.cancel = true;


    if(!commands[cmdName]) return player.sendMessage(`§cUnknown command: §f${args[0]}`);

    let runData = {
        args: args,
        player: player,
        message: message
    }

    commands[cmdName].run(runData);
}