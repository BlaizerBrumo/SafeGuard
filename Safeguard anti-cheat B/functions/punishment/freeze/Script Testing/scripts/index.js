import * as ui from "mojang-minecraft-ui"
import { world } from "mojang-minecraft"

//Form Creation
let form1 = new ui.ActionFormData()
form1.title("Tutorial")
form1.body("Tutorial Body")
//start at 0
form1.button("Creative mode")

world.events.beforeItemUse.subscribe(eventdata => {
    let player = eventdata.source
    let item = eventdata.item

    if (item.id == "minecraft:compass") {
        form1.show(player).then(result => {
            let selection = result.selection
            if (selection == 0) {
                player.runcommand(
                    "gamemode c @s"
                )
            }
        }
    // @ts-ignore
    }
})