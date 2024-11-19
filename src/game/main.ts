import Boot from "./scenes/Boot";
import SelectDifficulty from "./scenes/SelectDifficulty";
import MenuScene from "./scenes/MenuScene";
import { AUTO, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 900,
    parent: "game-container",
    backgroundColor: "#028af8",
    scene: [Boot, MenuScene, SelectDifficulty],
};

const StartGame = (parent: string) => {
    const game = new Game({ ...config, parent });

    window.addEventListener("resize", () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });

    return game;
};

export default StartGame;
