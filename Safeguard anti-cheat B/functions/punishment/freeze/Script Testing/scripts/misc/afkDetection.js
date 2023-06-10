import { world } from '@minecraft/server';
world.events.tick.subscribe(() => {
	[...world.getPlayers()].forEach(player => {
    if(player.hasTag("admin")) return;
    else{
      player.runCommandAsync(`scoreboard players add @s afkTimer 1`);
      const afkTimer = world.scoreboard.getObjective('afkTimer').getScore(player.scoreboard);
      if(afkTimer > 5300){
        if(afkTimer == 5400) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c30§4 SECONDS!`);
        else if(afkTimer == 5700) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c15§4 SECONDS!`);
        else if(afkTimer == 5800) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c10§4 SECONDS!`);
        else if(afkTimer == 5900) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c5§4 SECONDS!`);
        else if(afkTimer == 5920) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c4§4 SECONDS!`);
        else if(afkTimer == 5940) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c3§4 SECONDS!`);
        else if(afkTimer == 5960) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c2§4 SECONDS!`);
        else if(afkTimer == 5980) player.tell(`§6[§eSafeGuard§6] §l§4YOU WILL BE KICKED FOR AFK IN §c1§4 SECOND!`);
        else if(afkTimer > 6000){
          stillHere(player);
          player.runCommandAsync(`kick ${player.nameTag} §l§4Kicked for being §cAFK §4 || §c${new Date()}`);
          world.say(`§6[§eSafeGuard Notify§6]§5§l §r§5${player.nameTag}§b Was kicked for being AFK§r`)
        }
      }
      const {x, y, z} = player.velocity; 
        if(x > .15 || y > .43 || z > .15){
          stillHere(player);
        }
      
    }
  }
)});

world.events.playerJoin.subscribe(join => {
  const player = join.player;
  stillHere(player);

   });


world.events.beforeItemUseOn.subscribe((data) => {
	let {item} = data;
	const player = data.source;
	if (item) {
      stillHere(player);
		}
});

world.events.blockBreak.subscribe((data) => {
	const player = data.player;
  stillHere(player);
});


world.events.beforeChat.subscribe((data) => {
    const player = data.player;
    stillHere(player);
});

world.events.entityHurt.subscribe((data) => {

   const damaged = data.hurtEntity;
   const damager = data.damagingEntity;

  if(damager.typeId == "minecraft:player" && damaged.typeId == "minecraft:player" && damaged.getComponent("health").current <= 0){
    damager.runCommandAsync(`scoreboard players add @s kills 1`);
  }
  else if(damager.typeId == "minecraft:player"){
    stillHere(damager);
  }
});




function stillHere(player){
  player.runCommandAsync(`scoreboard players set @s afkTimer 1`);
}