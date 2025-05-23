import { ItemStack, world, EnchantmentTypes, Block } from '@minecraft/server';
import { logDebug } from './util';

export function giveIronKit(playerName) {
  const player = world.getPlayers({ name: playerName })[0];

  logDebug(player);
  const { x, y, z } = player.location;


  const Helmet = new ItemStack("minecraft:iron_helmet", 1)
  const Chest = new ItemStack("minecraft:iron_chestplate", 1)
  const Pants = new ItemStack("minecraft:iron_leggings", 1)
  const Boots = new ItemStack("minecraft:iron_boots", 1)

  const helmetEnchant = Helmet.getComponent("minecraft:enchantable");
  const chestEnchant = Chest.getComponent("minecraft:enchantable");
  const pantsEnchant = Pants.getComponent("minecraft:enchantable");
  const bootsEnchant = Boots.getComponent("minecraft:enchantable");

  // Enchanting the helmet
  helmetEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("respiration") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("aqua_affinity") });

  // Enchanting the chestplate
  chestEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  chestEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  chestEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });

  // Enchanting the leggings
  pantsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  pantsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("swift_sneak") });

  // Enchanting the boots
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  bootsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("depth_strider") });
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("feather_falling") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("soul_speed") });

  const Sword = new ItemStack("minecraft:iron_sword", 1);
  const Pick = new ItemStack("minecraft:iron_pickaxe", 1);
  const Axe = new ItemStack("minecraft:iron_axe", 1);
  const Shovel = new ItemStack("minecraft:iron_shovel", 1);

  const swordEnchant = Sword.getComponent("minecraft:enchantable");
  const pickEnchant = Pick.getComponent("minecraft:enchantable");
  const axeEnchant = Axe.getComponent("minecraft:enchantable");
  const shovelEnchant = Shovel.getComponent("minecraft:enchantable");

  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("sharpness"), level: 5 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("looting"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("fire_aspect"), level: 2 });

  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("silk_touch"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  world.getDimension("overworld").runCommand(`fill ${x + 1} ${y} ${z} ${x + 1} ${y} ${z} chest`)

  const chest = world.getDimension("overworld").getBlock({ x: x + 1, y: y, z: z })
  const inventory = chest.getComponent("minecraft:inventory").container;

  // const inventory = player.getComponent("minecraft:inventory").container;

  inventory.setItem(0, Helmet)
  inventory.setItem(1, Chest)
  inventory.setItem(2, Pants)
  inventory.setItem(3, Boots)
  inventory.setItem(4, Sword)
  inventory.setItem(5, Axe)
  inventory.setItem(6, Pick)
  inventory.setItem(7, Shovel)

}

export function giveDiamondKit(playerName) {
  const player = world.getPlayers({ name: playerName })[0];

  logDebug(player);
  const { x, y, z } = player.location;


  const Helmet = new ItemStack("minecraft:diamond_helmet", 1)
  const Chest = new ItemStack("minecraft:diamond_chestplate", 1)
  const Pants = new ItemStack("minecraft:diamond_leggings", 1)
  const Boots = new ItemStack("minecraft:diamond_boots", 1)

  const helmetEnchant = Helmet.getComponent("minecraft:enchantable");
  const chestEnchant = Chest.getComponent("minecraft:enchantable");
  const pantsEnchant = Pants.getComponent("minecraft:enchantable");
  const bootsEnchant = Boots.getComponent("minecraft:enchantable");

  // Enchanting the helmet
  helmetEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("respiration") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("aqua_affinity") });

  // Enchanting the chestplate
  chestEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  chestEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  chestEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });

  // Enchanting the leggings
  pantsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  pantsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("swift_sneak") });

  // Enchanting the boots
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  bootsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("depth_strider") });
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("feather_falling") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("soul_speed") });

  const Sword = new ItemStack("minecraft:diamond_sword", 1);
  const Pick = new ItemStack("minecraft:diamond_pickaxe", 1);
  const Axe = new ItemStack("minecraft:diamond_axe", 1);
  const Shovel = new ItemStack("minecraft:diamond_shovel", 1);

  const swordEnchant = Sword.getComponent("minecraft:enchantable");
  const pickEnchant = Pick.getComponent("minecraft:enchantable");
  const axeEnchant = Axe.getComponent("minecraft:enchantable");
  const shovelEnchant = Shovel.getComponent("minecraft:enchantable");

  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("sharpness"), level: 5 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("looting"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("fire_aspect"), level: 2 });

  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("silk_touch"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  world.getDimension("overworld").runCommand(`fill ${x + 1} ${y} ${z} ${x + 1} ${y} ${z} chest`)

  const chest = world.getDimension("overworld").getBlock({ x: x + 1, y: y, z: z })
  const inventory = chest.getComponent("minecraft:inventory").container;

  // const inventory = player.getComponent("minecraft:inventory").container;

  inventory.setItem(0, Helmet)
  inventory.setItem(1, Chest)
  inventory.setItem(2, Pants)
  inventory.setItem(3, Boots)
  inventory.setItem(4, Sword)
  inventory.setItem(5, Axe)
  inventory.setItem(6, Pick)
  inventory.setItem(7, Shovel)

}

export function giveNetheriteKit(playerName) {
  const player = world.getPlayers({ name: playerName })[0];

  logDebug(player);
  const { x, y, z } = player.location;


  const Helmet = new ItemStack("minecraft:netherite_helmet", 1)
  const Chest = new ItemStack("minecraft:netherite_chestplate", 1)
  const Pants = new ItemStack("minecraft:netherite_leggings", 1)
  const Boots = new ItemStack("minecraft:netherite_boots", 1)

  const helmetEnchant = Helmet.getComponent("minecraft:enchantable");
  const chestEnchant = Chest.getComponent("minecraft:enchantable");
  const pantsEnchant = Pants.getComponent("minecraft:enchantable");
  const bootsEnchant = Boots.getComponent("minecraft:enchantable");

  // Enchanting the helmet
  helmetEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  helmetEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("respiration") });
  helmetEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("aqua_affinity") });

  // Enchanting the chestplate
  chestEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  chestEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  chestEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });

  // Enchanting the leggings
  pantsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  pantsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  pantsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("swift_sneak") });

  // Enchanting the boots
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("protection") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("unbreaking") });
  bootsEnchant.addEnchantment({ level: 1, type: EnchantmentTypes.get("mending") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("depth_strider") });
  bootsEnchant.addEnchantment({ level: 4, type: EnchantmentTypes.get("feather_falling") });
  bootsEnchant.addEnchantment({ level: 3, type: EnchantmentTypes.get("soul_speed") });

  const Sword = new ItemStack("minecraft:netherite_sword", 1);
  const Pick = new ItemStack("minecraft:netherite_pickaxe", 1);
  const Axe = new ItemStack("minecraft:netherite_axe", 1);
  const Shovel = new ItemStack("minecraft:netherite_shovel", 1);

  const swordEnchant = Sword.getComponent("minecraft:enchantable");
  const pickEnchant = Pick.getComponent("minecraft:enchantable");
  const axeEnchant = Axe.getComponent("minecraft:enchantable");
  const shovelEnchant = Shovel.getComponent("minecraft:enchantable");

  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("sharpness"), level: 5 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("looting"), level: 3 });
  swordEnchant.addEnchantment({ type: EnchantmentTypes.get("fire_aspect"), level: 2 });

  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  pickEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("fortune"), level: 3 });
  axeEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("mending"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("unbreaking"), level: 3 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("silk_touch"), level: 1 });
  shovelEnchant.addEnchantment({ type: EnchantmentTypes.get("efficiency"), level: 5 });

  world.getDimension("overworld").runCommand(`fill ${x + 1} ${y} ${z} ${x + 1} ${y} ${z} chest`)

  const chest = world.getDimension("overworld").getBlock({ x: x + 1, y: y, z: z })
  const inventory = chest.getComponent("minecraft:inventory").container;

  // const inventory = player.getComponent("minecraft:inventory").container;

  inventory.setItem(0, Helmet)
  inventory.setItem(1, Chest)
  inventory.setItem(2, Pants)
  inventory.setItem(3, Boots)
  inventory.setItem(4, Sword)
  inventory.setItem(5, Axe)
  inventory.setItem(6, Pick)
  inventory.setItem(7, Shovel)

}