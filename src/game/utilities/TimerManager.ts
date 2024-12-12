export default class TimerManager {
    private scene: Phaser.Scene;
    private duration: number;
    private timerEvent: Phaser.Time.TimerEvent | null = null;
    private onTimeOutCallback: () => void;

    constructor(
        scene: Phaser.Scene,
        duration: number,
        onTimeOutCallback: () => void
    ) {
        this.scene = scene;
        this.duration = duration;
        this.onTimeOutCallback = onTimeOutCallback;
    }

    start(): void {
        this.stop();
        this.timerEvent = this.scene.time.addEvent({
            delay: this.duration * 1000,
            callback: this.onTimeOutCallback,
            callbackScope: this,
        });
    }

    stop(): void {
        if (this.timerEvent) {
            this.timerEvent.remove(false);
            this.timerEvent = null;
        }
    }

    reset(duration?: number): void {
        if (duration) {
            this.duration = duration;
        }
        this.start();
    }

    getRemainingTime(): number {
        return this.timerEvent ? this.timerEvent.getRemaining() / 1000 : 0;
    }
}
