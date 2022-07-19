import Phaser from "phaser";
import device from "current-device";

import BootSceneMob from "./src/assets/scripts/mob/scenes/BootScene";
import PreloadSceneMob from "./src/assets/scripts/mob/scenes/PreloadScene";

import BootSceneDesk from "./src/assets/scripts/desk/scenes/BootScene";
import PreloadSceneDesk from "./src/assets/scripts/desk/scenes/PreloadScene";






class TestScene extends Phaser.Scene {
    constructor() {
      super("Test");
      console.log("TestScene")
    }
    preload() {
      this.load.atlas(
        "ui_spritesheet", "src/assets/sprites/mob/ui/ui_spritesheet.png", 
        "src/assets/sprites/mob/ui/ui_spritesheet.json");
      }
    create() {
      this.button = this.add.sprite(500, 800, "ui_spritesheet", "start").setAlpha(0)
      // this.button.flipX = true

      this.tweens.add({
        targets: this.button,
        alpha : {
          from : 0,
          to: 1,
          // duration: 200
        },

        scale: {
          from: 1.2,
          to: 1,
          
        },

        x: {
          duration: 400,
          yoyo: true,
          repeat: 8,
          ease: 'Sine.easeInOut',
          value: {
              getActive: function (target, key, value, targetIndex, totalTargets, tween)
              {
                  return value;
              },
              getStart: function (target, key, value, targetIndex, totalTargets, tween)
              {
                  return value + 30;
              },
              getEnd: function (target, key, value, targetIndex, totalTargets, tween)
              {
                  value -= 30;
                  return value;
              }
          }
      },

        ease: "Linear",
        duration: 1000
      });
    }
  }
  // var scenes = [
  //   TestScene
  // ];



  
  console.log("device.mobile(): ", device.mobile(), "device.desktop(): ", device.desktop())
  
  // const mobile = device.mobile()
  const mobile = true
  
  console.log("mobile")
  var scenes = [
    BootSceneMob,
    PreloadSceneMob,
  ];

  var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1600,
    scene: scenes,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  
    // multiTexture: true,
    enableDebug: false,
    
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    render: {
      antialias: true,
      antialiasGL: true,
      desynchronized: false,
      pixelArt: false,
      roundPixels: false,
      // transparent: false,
      clearBeforeRender: true,
      preserveDrawingBuffer: true,
      // premultipliedAlpha: true,
      // failIfMajorPerformanceCaveat: true,
      powerPreference: "high-performance", // 'high-performance', 'low-power' or 'default'
      batchSize: 4096,
      // maxLights: 10,
      maxTextures: -1,
      mipmapFilter: "LINEAR_MIPMAP_LINEAR", // 'NEAREST', 'LINEAR', 'NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR'
      // pipeline: []
    },
    fps: {
      // min: 32,
      // target: 42,
      // forceSetTimeOut: false,
      // deltaHistory: 320,
      // panicMax: 600,
      // smoothStep: true,
    },
    parent: "game", // чтобы игра была внутри div
  };








var game = new Phaser.Game(config);

