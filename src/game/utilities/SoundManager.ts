export default class SoundManager {
    scene: Phaser.Scene;
    soundKeys: string[];
    sounds: { [key: string]: Phaser.Sound.BaseSound };

    constructor(scene: Phaser.Scene, soundKeys: string | string[]) {
        this.scene = scene;
        this.soundKeys = Array.isArray(soundKeys) ? soundKeys : [soundKeys];
        this.sounds = {};
    }

    preload() {
        this.soundKeys.forEach((key) => {
            this.scene.load.audio(key, `assets/audio/${key}.mp3`);
        });
    }

    play(soundKey: string, loop: boolean = false) {
        if (!this.sounds[soundKey]) {
            this.sounds[soundKey] = this.scene.sound.add(soundKey, { loop });
        }
        this.sounds[soundKey].play();
    }

    stop(soundKey: string) {
        if (this.sounds[soundKey]) {
            this.sounds[soundKey].stop();
        }
    }

    isPlaying(key: string): boolean {
        const sound = this.scene.sound.get(key);
        return sound ? sound.isPlaying : false;
    }
}
