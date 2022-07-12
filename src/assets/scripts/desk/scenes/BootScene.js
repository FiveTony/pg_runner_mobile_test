export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
    console.log("BootScene")
  }
  preload() {
    // this.load.setBaseURL(document.location.href);
    this.load.setBaseURL(document.location.origin + document.location.pathname);
    this.load.image("circle", "src/assets/sprites/desk/PreloadScene/circle.png");
    this.load.image("pg_label", "src/assets/sprites/desk/PreloadScene/pg_label.png");
    this.load.image("pattern", "src/assets/sprites/desk/PreloadScene/pattern.png");
    
    this.load.audio("main_theme", "src/assets/sounds/main_theme.mp3");
    this.load.bitmapFont('Montserrat-Bold', 'src/assets/fonts/Montserrat-Bold.png', 'src/assets/fonts/Montserrat-Bold.xml');

  }
  create() {
    this.scene.start("Preload");
  }
}
