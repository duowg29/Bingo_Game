import Boot from "./scenes/Boot";
import SelectDifficulty from "./scenes/SelectDifficulty";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import EndScene from "./scenes/EndScene";
import LostScene from "./scenes/LostScene";

import { AUTO, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 900,
    parent: "game-container",
    backgroundColor: "#ffffff",
    scene: [Boot, MenuScene, SelectDifficulty, GameScene, EndScene, LostScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const StartGame = (parent: string) => {
    const game = new Game({ ...config, parent });

    window.addEventListener("resize", () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });

    return game;
};

export default StartGame;
