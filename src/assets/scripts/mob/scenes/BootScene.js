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
    
    this.load.audio("main_theme", "src/assets/sounds/main_theme.mp3");
    this.load.bitmapFont('Montserrat-Bold', 'src/assets/fonts/Montserrat-Bold.png', 'src/assets/fonts/Montserrat-Bold.xml');

  }
  create() {
    this.scene.start("Preload");
  }
}
