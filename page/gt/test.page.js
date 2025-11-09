import * as hmUI from "@zos/ui";

Page({
  onInit() {
    console.log("TEST PAGE INIT - ZeppOS is working!");
  },
  
  build() {
    console.log("TEST PAGE BUILD - Creating widgets");
    
    // Create a more visible test text
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 100,
      w: 390,
      h: 60,
      text: "PinTipZ Test Working!",
      text_size: 28,
      color: 0x00ff00,  // Bright green
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V
    });
    
    // Create a button to test interaction
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 50,
      y: 200,
      w: 290,
      h: 50,
      text: "Click Me!",
      text_size: 20,
      color: 0xffffff,
      normal_color: 0x0066cc,
      press_color: 0x0055aa
    });
    
    console.log("TEST PAGE BUILD - Widgets created successfully");
  },
  
  onDestroy() {
    console.log("TEST PAGE DESTROY");
  }
});