import GameScene from "./GameScene";
import StartScene from "./StartScene";

const WIDTH = 1080
const HEIGHT = 1920

const KOEF_X = window.innerWidth / 1080
const KOEF_Y = window.innerHeight / 1920

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("PreloadScene")
  }
  preload() {
    // this.main_theme = this.sound.add("main_theme", {
    //   mute: false,
    //   volume: 0.8,
    //   rate: 1,
    //   detune: 0,
    //   seek: 0,
    //   loop: true,
    //   delay: 0,
    // });
    // this.main_theme.play();   

    this.createElements()
    this.preloadAssets();
  }
  create() {
    // this.scale.displaySize.setAspectRatio( window.innerWidth/window.innerHeight );
    // this.scale.refresh();

    this.game.scene.add('Start', StartScene, true, {mute: false});
      // this.game.scene.add('Game', GameScene, true, {hero: "musya", play_num: 1, mute: false});
}
  preloadAssets() {
    // this.load.setBaseURL(document.location.href);
    // this.load.setBaseURL(document.location.origin + document.location.pathname);

    this.load.audio("get_positive", "src/assets/sounds/get_positive.mp3");
    this.load.audio("get_negative", "src/assets/sounds/get_negative.mp3");
    this.load.audio("get_negative_musya", "src/assets/sounds/get_negative_musya.mp3");
    this.load.audio("swipe_sound", "src/assets/sounds/swipe.mp3");
    this.load.audio("win", "src/assets/sounds/win.mp3");

    this.load.atlas(
      "ui_spritesheet", "src/assets/sprites/mob/ui/ui_spritesheet.png", 
      "src/assets/sprites/mob/ui/ui_spritesheet.json");

    this.load.atlas(
      "prompts_spritesheet", "src/assets/sprites/mob/prompts_spritesheet.png", 
      "src/assets/sprites/mob/prompts_spritesheet.json");
    
      
    // this.load.image("left_element", "src/assets/sprites/mob/left_element.png");
    // this.load.image("right_element", "src/assets/sprites/mob/right_element.png");

    this.load.image("left_element", "src/assets/sprites/mob/left_element1920.jpg");
    this.load.image("right_element", "src/assets/sprites/mob/right_element1920.jpg");

    this.load.image("button_back", "src/assets/sprites/desk/button_back.png");


    this.preloadStartScene()
    this.preloadPlayers()
    this.preloadRooms()
    this.preloadNegativePositive()

  }
  preloadPlayers() {
    this.load.image("player_rita_1", "src/assets/sprites/mob/player/player_rita_1.png");
    this.load.atlas(
      "player_rita", "src/assets/sprites/mob/player/player_rita_spritesheet.png", 
      "src/assets/sprites/mob/player/player_rita_spritesheet.json");

    this.load.image("player_musya_1", "src/assets/sprites/mob/player/player_musya_1.png");
    this.load.atlas(
      "player_musya", "src/assets/sprites/mob/player/player_musya_spritesheet.png", 
      "src/assets/sprites/mob/player/player_musya_spritesheet.json");

    this.load.image("player_dima_1", "src/assets/sprites/mob/player/player_dima_1.png");
    this.load.atlas(
      "player_dima", "src/assets/sprites/mob/player/player_dima_spritesheet.png", 
      "src/assets/sprites/mob/player/player_dima_spritesheet.json");
  }
  preloadStartScene() {
    this.load.atlas(
      "start_spritesheet", "src/assets/sprites/mob/StartScene/start_spritesheet.png", 
      "src/assets/sprites/mob/StartScene/start_spritesheet.json");
  }
  preloadRooms() {
    this.load.image("room1", "src/assets/sprites/mob/rooms/room1.png");
    this.load.image("room2", "src/assets/sprites/mob/rooms/room2.png");
    this.load.image("room3", "src/assets/sprites/mob/rooms/room3.png");
    this.load.image("room4", "src/assets/sprites/mob/rooms/room4.png");
    this.load.image("room5", "src/assets/sprites/mob/rooms/room5.png");

    // this.load.image("room1", "src/assets/sprites/mob/rooms/jpg/room1.jpg");
    // this.load.image("room2", "src/assets/sprites/mob/rooms/jpg/room2.jpg");
    // this.load.image("room3", "src/assets/sprites/mob/rooms/jpg/room3.jpg");
    // this.load.image("room4", "src/assets/sprites/mob/rooms/jpg/room4.jpg");
    // this.load.image("room5", "src/assets/sprites/mob/rooms/jpg/room5.jpg");

    // this.load.atlas(
    //   "rooms", "src/assets/sprites/mob/rooms/rooms_spritesheet.png", 
    //   "src/assets/sprites/mob/rooms/rooms_spritesheet.json");
  }
  preloadNegativePositive() {
    this.load.atlas(
      "negative_spritesheet", "src/assets/sprites/mob/negative/test/negative_spritesheet.png", 
      "src/assets/sprites/mob/negative/test/negative_spritesheet.json");

    this.load.atlas(
      "positive_spritesheet", "src/assets/sprites/mob/positive/test2/positive_spritesheet.png", 
      "src/assets/sprites/mob/positive/test2/positive_spritesheet.json");
  }
  createElements() {
    let preload_graphics = this.add.graphics()
      .fillGradientStyle(0x062A67,0x062A67,0x1A499B, 0x1A499B, 1)
      .fillRect(0, 0, window.innerWidth , window.innerHeight);

    let preload_text = this.add.text(window.innerWidth / 2, 300, "Подумай\nо хорошем,\nпока ждёшь 😊", {
        font: 'bold 70px Montserrat',
        fill: '#FFFFFF',
        align: 'center',  // 'left'|'center'|'right'|'justify'
        lineSpacing: 10,
      }).setOrigin(0.5)
    let preload_label = this.add.sprite(window.innerWidth / 2, window.innerHeight - 500, "preload_spritesheet", "pg_label")
    let preload_pattern = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "preload_spritesheet", "pattern")
    .setScale(window.innerWidth / WIDTH, window.innerHeight / HEIGHT)
    // let circle = this.add.sprite(WIDTH / 2, HEIGHT / 2, "preload_spritesheet", "circle")

      this.circle = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2 - 40, "preload_spritesheet", "circle")

      this.tweens.add({
        targets: this.circle,
        angle : {
          from : 0,
          to: 360
        },
        ease: "Linear",
        duration: 1400,
        repeat: -1
      });

    this.load.on('complete', ()=> {
      preload_text.destroy()
      preload_graphics.destroy()
      preload_label.destroy()
      preload_pattern.destroy()
      this.circle.destroy()
      this.load.removeAllListeners()
    }, this)




  }
  
}
