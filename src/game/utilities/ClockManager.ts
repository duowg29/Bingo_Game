import Phaser from "phaser";

export default class ClockManager {
    private scene: Phaser.Scene;
    private duration: number;
    private timerArc: Phaser.GameObjects.Graphics;
    private timerClock: Phaser.GameObjects.Graphics;
    private timerX: number;
    private timerY: number;
    private timerRadius: number;
    private onTimeOut: () => void;
    private initialAngle: number = Phaser.Math.DegToRad(270);
    private remainingTime: number;
    private timerEvent: Phaser.Time.TimerEvent | null = null; // Lưu trữ sự kiện

    constructor(
        scene: Phaser.Scene,
        duration: number,
        onTimeOut: () => void,
        timerX: number,
        timerY: number,
        timerRadius: number = 40
    ) {
        this.scene = scene;
        this.duration = duration;
        this.timerX = timerX;
        this.timerY = timerY;
        this.timerRadius = timerRadius;
        this.onTimeOut = onTimeOut;
        this.remainingTime = duration; // Khởi tạo remainingTime

        // Vẽ đồng hồ
        this.timerClock = this.scene.add.graphics();
        this.timerClock.lineStyle(4, 0x000000, 1);
        this.timerClock.strokeCircle(
            this.timerX,
            this.timerY,
            this.timerRadius
        );

        this.timerArc = this.scene.add.graphics();
        this.timerArc.setDepth(1);
    }

    start() {
        // Nếu đồng hồ đã bắt đầu, thì không khởi động lại
        if (this.remainingTime <= 0 || this.timerEvent) return; // Kiểm tra nếu có sự kiện đang chạy

        this.scene.time.addEvent({
            delay: 1000 / 60, // Tốc độ cập nhật đồng hồ
            callback: () => {
                this.updateClock(this.remainingTime);
                this.remainingTime = Math.max(0, this.remainingTime - 1 / 60); // Giảm thời gian
                if (this.remainingTime <= 0) {
                    this.onTimeOut(); // Gọi callback khi hết thời gian
                }
            },
            callbackScope: this,
            loop: true,
        });
    }

    reset(duration: number) {
        // Dừng đồng hồ hiện tại nếu có
        if (this.timerEvent) {
            this.timerEvent.remove(); // Xóa sự kiện hiện tại
        }
        this.remainingTime = this.duration; // Đặt lại thời gian về ban đầu
        this.timerArc.clear(); // Xóa các hình vẽ cũ
        this.start(); // Bắt đầu lại đồng hồ
    }

    public updateClock(remainingTime: number) {
        this.timerArc.clear(); // Xóa phần đồng hồ cũ

        // Tính tiến trình còn lại
        const progress = remainingTime / this.duration;
        const endAngle = this.initialAngle - progress * Phaser.Math.PI2;

        // Vẽ phần màu xanh
        this.timerArc.fillStyle(0x007bff, 1);
        this.timerArc.slice(
            this.timerX,
            this.timerY,
            this.timerRadius - 5,
            this.initialAngle,
            endAngle,
            true
        );
        this.timerArc.fillPath(); // Vẽ lại phần đồng hồ
    }
}
