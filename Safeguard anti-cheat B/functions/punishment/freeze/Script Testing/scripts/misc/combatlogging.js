import { MinecraftEnchantmentTypes, EnchantmentList, world, EntityInventoryComponent , Player, ItemStack, MinecraftItemTypes, Items  } from '@minecraft/server';
const overworld = world.getDimension("overworld");
world.events.entityHurt.subscribe((data) => {
   try{
    const damaged = data.hurtEntity;
    const damager = data.damagingEntity;
    let inCombat = world.scoreboard.getObjective('in_combat').getScore(damager.scoreboard);

    const damagedHP = damaged.getComponent("health").current;
    const damagerHP = damager.getComponent("health").current;
    //if(player.typeId !== "minecraft:player" || damager.typeId !== "minecraft:player") return;
    //damagedHP.runCommandAsync(`scoreboard players set @s in_combat 1200`);
   if(!damager.typeId == "minecraft:player") return;
   else{    
      if(inCombat == 0){
            damager.tell(`now in combat!`);
            }
         damager.runCommandAsync(`scoreboard players set @s in_combat 1200`);
            
    }
}catch (error) {world.say("§l§4ERROR: §r"+ error)}
});
 

world.events.tick.subscribe(() => {
	[...world.getPlayers()].forEach(player => {
		let plrName = player.name;
      let inCombat = world.scoreboard.getObjective('in_combat').getScore(player.scoreboard);
      player.runCommandAsync("scoreboard players remove @a[scores={in_combat=1..}] in_combat 1");
      if(inCombat == 1){
      player.tell("now out of combat!");
      }
   });
});
world.events.playerJoin.subscribe(join => {
   const player = join.player;
   const inCombat = world.scoreboard.getObjective("in_combat").getScore(player.scoreboard);
   if(inCombat > 1){
      world.say(player.name);
   }

    });