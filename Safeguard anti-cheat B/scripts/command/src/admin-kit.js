import { newCommand } from "../handle";
import * as Minecraft from "@minecraft/server";
import { giveDiamondKit, giveIronKit, giveNetheriteKit } from "../../assets/kits";

newCommand({
  name: "adminkit",
  description: "Spawns a fully maxed armor kit",
  //not finished
  disabled:true,
  run: (data) => {
    const player = data.player;
    const args = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
    const validArgs = ["iron", "diamond", "netherite"];

    if (!player.hasTag("admin")) {
      return player.sendMessage(`Only admins can run this command`);
    }

    if (!validArgs.includes(args)) {
      return player.sendMessage(`${args} is not a valid kitname`);
    }

    if (args === "diamond") {
      Minecraft.system.run(() => { giveDiamondKit(player) })
      return player.sendMessage(`§4Spawned Diamond kit near you`);
    }

    if (args === "iron") {
      Minecraft.system.run(() => { giveIronKit(player) })
      return player.sendMessage(`§4Spawned Iron kit near you`);
    }

    if (args === "netherite") {
      Minecraft.system.run(() => { giveNetheriteKit(player) })
      return player.sendMessage(`§4Spawned Netherite kit near you`);
    }

  },
});
