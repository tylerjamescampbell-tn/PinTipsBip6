console.log("HOME PAGE MODULE LOADING");

Page({
  onInit() {
    console.log("HOME PAGE INIT");
  },
  
  build() {
    console.log("HOME PAGE BUILD START");
    
    let tournamentId = "202988"; // Default tournament ID
    let inputMode = false;
    let currentInput = "";
    
    // Title
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 30,
      w: 350,
      h: 40,
      text: "PinTipZ Tournament Finder",
      text_size: 20,
      color: 0xffffff,
      align_h: hmUI.align.CENTER
    });
    
    // Tournament ID label
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 90,
      w: 350,
      h: 30,
      text: "Enter Tournament ID:",
      text_size: 16,
      color: 0xffffff
    });

    // Tournament ID display
    const idDisplay = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 130,
      w: 350,
      h: 40,
      text: "Tournament ID: " + tournamentId,
      text_size: 16,
      color: 0x00ff00,
      align_h: hmUI.align.CENTER,
      background_color: 0x333333,
      radius: 8
    });

    // Input status display
    const statusDisplay = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 180,
      w: 350,
      h: 30,
      text: "Tap numbers below to input ID",
      text_size: 14,
      color: 0x888888,
      align_h: hmUI.align.CENTER
    });

    // Number input keypad
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    numbers.forEach(function(num, idx) {
      const x = 45 + (idx % 5) * 60;
      const y = 220 + Math.floor(idx / 5) * 45;
      
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: x,
        w: 50,
        y: y,
        h: 35,
        text: num,
        text_size: 18,
        color: 0xffffff,
        normal_color: 0x444444,
        press_color: 0x666666,
        radius: 6,
        click_func: function() {
          if (currentInput.length < 6) { // Limit to 6 digits
            currentInput += num;
            idDisplay.setProperty(hmUI.prop.TEXT, "Entering: " + currentInput);
            statusDisplay.setProperty(hmUI.prop.TEXT, "Continue entering or tap Clear/Set");
          } else {
            hmUI.showToast({
              text: "Max 6 digits"
            });
          }
        }
      });
    });

    // Clear button
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 20,
      y: 310,
      w: 80,
      h: 35,
      text: "Clear",
      text_size: 14,
      color: 0xffffff,
      normal_color: 0x666666,
      press_color: 0x888888,
      radius: 8,
      click_func: function() {
        currentInput = "";
        idDisplay.setProperty(hmUI.prop.TEXT, "Tournament ID: " + tournamentId);
        statusDisplay.setProperty(hmUI.prop.TEXT, "Tap numbers to input new ID");
        hmUI.showToast({
          text: "Input cleared"
        });
      }
    });

    // Set button
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 120,
      y: 310,
      w: 80,
      h: 35,
      text: "Set ID",
      text_size: 14,
      color: 0xffffff,
      normal_color: 0x0066cc,
      press_color: 0x0055aa,
      radius: 8,
      click_func: function() {
        console.log("Set ID clicked, currentInput:", currentInput);
        
        if (currentInput.length > 0) {
          tournamentId = currentInput;
          currentInput = "";
          console.log("Tournament ID updated to:", tournamentId);
          
          idDisplay.setProperty(hmUI.prop.TEXT, "Tournament ID: " + tournamentId);
          idDisplay.setProperty(hmUI.prop.COLOR, 0x00ff00);
          statusDisplay.setProperty(hmUI.prop.TEXT, "ID set! Tap Find Tournament below");
          
          hmUI.showToast({
            text: "Tournament ID set: " + tournamentId
          });
        } else {
          hmUI.showToast({
            text: "Enter ID first"
          });
        }
      }
    });
    
    // Find Tournament button
    const findBtn = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 220,
      y: 310,
      w: 150,
      h: 35,
      text: "Find Tournament",
      text_size: 14,
      color: 0xffffff,
      normal_color: 0x00aa00,
      press_color: 0x008800,
      radius: 8,
      click_func: function() {
        console.log("Find Tournament clicked, tournamentId:", tournamentId);
        
        // Debug: Show current tournament ID
        hmUI.showToast({
          text: "Current ID: " + tournamentId
        });
        
        if (!tournamentId || tournamentId.length < 3) {
          hmUI.showToast({
            text: "Enter valid tournament ID first"
          });
          return;
        }

        // Save tournament ID and navigate
        hmApp.setStorageSync("tournamentId", tournamentId);
        console.log("Saved tournament ID to storage:", tournamentId);
        
        hmUI.showToast({
          text: "Loading MatchPlay " + tournamentId
        });
        
        // Navigate to tournament games page
        console.log("Attempting navigation to search page");
        hmApp.gotoPage({ url: "page/gt/search/index" });
      }
    });
    
    console.log("HOME PAGE WIDGETS CREATED");

  }
});
