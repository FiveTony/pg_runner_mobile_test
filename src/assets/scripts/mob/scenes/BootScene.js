const WIDTH = 1080
const HEIGHT = 1920

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
    console.log("BootScene")
  }
  preload() {
    // this.load.setBaseURL(document.location.href);
    this.load.setBaseURL(document.location.origin + document.location.pathname);

    this.load.atlas(
      "preload_spritesheet", "src/assets/sprites/mob/PreloadScene/preload_spritesheet.png", 
      "src/assets/sprites/mob/PreloadScene/preload_spritesheet.json");
    
    // this.load.audio("main_theme", "assets/sounds/main_theme.mp3");
    this.load.bitmapFont('Montserrat-Bold', 'src/assets/fonts/Montserrat-Bold.png', 'src/assets/fonts/Montserrat-Bold.xml');

    this.preload_graphics = this.add.graphics()
      .fillGradientStyle(0x062A67,0x062A67,0x1A499B, 0x1A499B, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);
  }
  create() {
    this.preload_graphics.destroy()
    this.scene.start("Preload");
  }
}
