import Boot from "./scenes/Boot";
import SelectDifficulty from "./scenes/SelectDifficulty";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";

import { AUTO, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 900,
    parent: "game-container",
    backgroundColor: "#028af8",
    scene: [Boot, MenuScene, SelectDifficulty, GameScene],
    scale: {
        mode: Phaser.Scale.FIT, // Canvas sẽ vừa vặn với kích thước cửa sổ mà không bị tràn
        autoCenter: Phaser.Scale.CENTER_BOTH, // Căn giữa game trong cửa sổ
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
