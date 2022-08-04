
import { clearTickInterval, clearTickTimeout, setTickInterval, setTickTimeout } from "./utils/scheduling.js";
export { clearTickInterval, clearTickTimeout, setTickInterval, setTickTimeout };
import { compressNumber, formatNumber, MS, rainbowText } from "./utils/formatter.js";
export { compressNumber, formatNumber, MS, rainbowText };
import Database from "./build/classes/databaseBuilder.js";
export { Database };
import { world } from 'mojang-minecraft';
import { Entity } from "./build/classes/entityBuilder.js";
import { Player } from "./build/classes/playerBuilder.js";
import { Command } from "./build/classes/commandBuilder.js";
import { ServerBuilder } from "./build/classes/serverBuilder.js";
class ServerBuild extends ServerBuilder {
    constructor() {
        super();
        this.entity = Entity;
        this.player = Player;
        this.command = Command;
        this._buildEvent();
    }
    ;
    /**
     * @private
     */
    _buildEvent() {
        try {


            world.events.beforeChat.subscribe(data => {


                const date = new Date();
                /**
                 * Emit to 'beforeMessage' event listener
                 */
                const sender = data.sender;
                this.emit('beforeMessage', data);
                /**
                 * This is for the command builder and a emitter
                 */
                if (!data.message.startsWith(this.command.prefix))
                    return;
                const args = data.message.substring(this.command.prefix.length).trim().replace(/ {2,}/g, ' ').match(/".*?"|[\S]+/g).map(value => value.replace(/[@"]/g, ''));
                const command = args.shift().toLowerCase();
                const getCommand = Command.getAllRegistation().some(element => element.name === command || element.aliases && element.aliases.includes(command));
                if (!getCommand) {
                    data.cancel = true;
                    return sender.runCommand(`tellraw "${data.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["§f${command}§c"]}]}`);
                }
                ;
                Command.getAllRegistation().forEach(element => {
                    if (!data.message.startsWith(this.command.prefix) || element.name !== command)
                        return;
                    /**
                     * Registration callback
                     */
                    if (element?.cancelMessage)
                        data.cancel = true;
                    try {
                        element.callback(data, args);
                    }
                    catch (error) {
                        this.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC JS Error ► §c${error}"}]}`);
                        
                    }
                    ;
                    /**
                     * Emit to 'customCommand' event listener
                     */
                    this.emit('customCommand', {
                        registration: element,
                        data,
                        createdAt: date,
                        createdTimestamp: date.getTime()
                    });
                });


            });
            /**
             * Emit to 'beforeExplosion' event listener
             */
            world.events.beforeExplosion.subscribe(data => this.emit('beforeExplosion', data));
            /**
             * Emit to 'beforePistonActivate' event listener
             */
            world.events.beforePistonActivate.subscribe(data => this.emit('beforePistonActivate', data));
            /**
             * Emit to 'blockExplode' event listener
             */
            world.events.blockExplode.subscribe(data => this.emit('blockExplode', data));
            /**
             * Emit to 'beforeExplosion' event listener
             */
            world.events.explosion.subscribe(data => this.emit('explosion', data));
            /**
             * Emit to 'beforeExplosion' event listener
             */
            world.events.pistonActivate.subscribe(data => this.emit('pistonActivate', data));
            /**
             * Emit to 'messageCreate' event listener
             */
            world.events.chat.subscribe(data => this.emit('messageCreate', data));
            /**
             * Emit to 'entityEffected' event listener
             */
            world.events.effectAdd.subscribe(data => this.emit('entityEffected', data));
            /**
             * Emit to 'weatherChange' event listener
             */
            world.events.weatherChange.subscribe(data => this.emit('weatherChange', data));
            let oldPlayer = [];
            world.events.entityCreate.subscribe(data => {
                /**
                 * Emit to 'entityCreate' event listener
                 */
                this.emit('entityCreate', data.entity);
                if (data.entity.id !== 'minecraft:player')
                    return;
                let playerJoined = Player.list().filter(current => !oldPlayer.some(old => current === old));
                /**
                 * Emit to 'playerJoin' event listener
                 */
                if (playerJoined.includes(data.entity.nameTag))
                    this.emit('playerJoin', data.entity);
            });
            let worldLoaded = false, tickCount = 0;
            world.events.tick.subscribe((data) => {
                if (!this.runCommand('testfor @a').error && !worldLoaded) {
                    /**
                     * Emit to 'ready' event listener
                     */
                    this.emit('ready', { loadTime: tickCount });
                    worldLoaded = true;
                }
                ;
            });
        } catch (error) {
            console.warn(error, error.stack);
        }
    }
    ;
}
;
/**
 * Import this constructor
 */
export const Server = new ServerBuild();
