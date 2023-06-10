import { EntityInventoryComponent, Items, ItemStack, MinecraftBlockTypes, MinecraftItemTypes, Player, world } from '@minecraft/server';

world.events.beforeItemUseOn.subscribe((event) => {
  const player = event.source;
  if (!(player instanceof Player)) return;
  const block = player.dimension.getBlock( event.blockLocation );
  if(block.typeId == "minecraft:chest"){
    const inv = block.getComponent("minecraft:inventory").container;
    const item = inv.getItem(0);
    if(!item) return; 
    const itemName = item.nameTag ?? '';
    if(itemName.startsWith("chestOwner:")){
      if(itemName == `chestOwner:${player.nameTag}`){
        return;
      }
      else{
        event.cancel = true;
        player.onScreenDisplay.setActionBar('§4§lChest is locked!');
      }
    }
}
});