import StartScene from "@assets/scripts/desk/scenes/StartScene.js";

const WIDTH = 1920
const HEIGHT = 1080

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("PreloadScene")
  }
  preload() {
    document.querySelector('body').classList.add('bg-dark-color');
    this.main_theme = this.sound.add("main_theme", {
      mute: false,
      volume: 0.4,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
    this.main_theme.play();   
    
    this.createElements()
    this.preloadAssets();

    this.circle = this.add.sprite(WIDTH / 2, HEIGHT / 2, "circle")
  
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
  }
  create() {
    document.querySelector('body').classList.remove('bg-dark-color');
    this.game.scene.add('Start', StartScene, true, {play_num: 1, mute: false});
  }
  preloadAssets() {
    this.load.audio("get_positive", "assets/sounds/get_positive.mp3");
    this.load.audio("get_negative", "assets/sounds/get_negative.mp3");
    this.load.audio("get_negative_musya", "assets/sounds/get_negative_musya.mp3");
    this.load.audio("win", "assets/sounds/win.mp3");
    this.load.audio("swipe_sound", "assets/sounds/swipe.mp3");

    
    this.load.image("border", "assets/sprites/desk/border.png");

    this.load.atlas(
      "ui_spritesheet", "assets/sprites/desk/ui/ui_spritesheet.png", 
      "assets/sprites/desk/ui/ui_spritesheet.json");

    this.load.image("start", "assets/sprites/desk/button.png");
    this.load.image("start_hover", "assets/sprites/desk/button_blue.png");


    this.load.atlas(
      "prompts_spritesheet", "assets/sprites/desk/prompts_spritesheet.png", 
      "assets/sprites/desk/prompts_spritesheet.json");
    
      
    this.load.image("left_element", "assets/sprites/desk/left_element.jpg");
    this.load.image("right_element", "assets/sprites/desk/right_element.jpg");

    this.load.image("button_back", "assets/sprites/desk/button_back.png");


    this.preloadStartScene()
    this.preloadPlayers()
    this.preloadRooms()
    this.preloadNegativePositive()

  }
  preloadPlayers() {
    this.load.image("player_rita_1", "assets/sprites/desk/player/player_rita_1.png");
    this.load.atlas(
      "player_rita", "assets/sprites/desk/player/player_rita.png", 
      "assets/sprites/desk/player/player_rita.json");

    this.load.image("player_musya_1", "assets/sprites/desk/player/player_musya_1.png");
    this.load.atlas(
      "player_musya", "assets/sprites/desk/player/player_musya.png", 
      "assets/sprites/desk/player/player_musya.json");

    this.load.image("player_dima_1", "assets/sprites/desk/player/player_dima_1.png");
    this.load.atlas(
      "player_dima", "assets/sprites/desk/player/player_dima.png", 
      "assets/sprites/desk/player/player_dima.json");
  }
  preloadStartScene() {
    this.load.atlas(
      "start_spritesheet", "assets/sprites/desk/StartScene/start_spritesheet.png", 
      "assets/sprites/desk/StartScene/start_spritesheet.json");

    // this.load.image("rita_button_hover", "assets/sprites/desk/StartScene/rita_button_hover.png");
    // this.load.image("dima_button_hover", "assets/sprites/desk/StartScene/dima_button_hover.png");
    // this.load.image("musya_button_hover", "assets/sprites/desk/StartScene/musya_button_hover.png");
    
    // this.load.image("rita_button", "assets/sprites/desk/StartScene/rita_button.png");
    // this.load.image("dima_button", "assets/sprites/desk/StartScene/dima_button.png");
    // this.load.image("musya_button", "assets/sprites/desk/StartScene/musya_button.png");

  }
  preloadRooms() {
    this.load.image("room1", "assets/sprites/desk/rooms/room1.jpg");
    this.load.image("room2", "assets/sprites/desk/rooms/room2.jpg");
    this.load.image("room3", "assets/sprites/desk/rooms/room3.jpg");
    this.load.image("room4", "assets/sprites/desk/rooms/room4.jpg");
    this.load.image("room5", "assets/sprites/desk/rooms/room5.jpg");

    // this.load.atlas(
    //   "rooms", "assets/sprites/desk/rooms/rooms_spritesheet.png", 
    //   "assets/sprites/desk/rooms/rooms_spritesheet.json");
  }
  preloadNegativePositive() {
    this.load.atlas(
      "negative_spritesheet", "assets/sprites/desk/negative/negative_spritesheet.png", 
      "assets/sprites/desk/negative/negative_spritesheet.json");

    this.load.atlas(
      "positive_spritesheet", "assets/sprites/desk/positive/positive_spritesheet.png", 
      "assets/sprites/desk/positive/positive_spritesheet.json");
  }
  createElements() {
  let preload_graphics = this.add.graphics()
    .fillGradientStyle(0x062A67,0x062A67,0x1A499B, 0x1A499B, 1)
    .fillRect(0, 0, WIDTH, HEIGHT);

  let preload_text = this.add.text(WIDTH / 2, 235, "Подумай о хорошем,\nпока ждёшь 😊", {
      font: 'bold 76px Monserrat',
      fill: '#FFFFFF',
      align: 'center',  // 'left'|'center'|'right'|'justify'
      lineSpacing: 20,
    }).setOrigin(0.5)
  let preload_label = this.add.sprite(WIDTH / 2, 725 + 120, "pg_label")
  let preload_pattern = this.add.sprite(WIDTH / 2, HEIGHT / 2, "pattern")
  // let circle = this.add.sprite(WIDTH / 2, HEIGHT / 2, "circle")
  this.load.on('progress', ()=> {
    // circle.angle += 1
  }, this)
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
