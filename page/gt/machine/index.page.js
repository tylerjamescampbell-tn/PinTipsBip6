console.log("MACHINE PAGE LOADING");

Page({
  onInit() {
    console.log("MACHINE PAGE INIT");
  },
  
  build() {
    console.log("MACHINE PAGE BUILD");
    
    // Get selected machine data from storage
    const machineJson = hmApp.getStorageSync("selectedMachine") || '{"name":"Medieval Madness","manufacturer":"Williams","year":"1997"}';
    const machine = JSON.parse(machineJson);
    
    console.log("Loading tips for machine:", machine);

    // Dynamic title with machine name
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 20,
      w: 350,
      h: 30,
      text: `${machine.name} Tips`,
      text_size: 18,
      color: 0xffffff,
      align_h: hmUI.align.CENTER,
      text_style: hmUI.text_style.WRAP
    });

    // Dynamic machine info
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 50,
      w: 350,
      h: 25,
      text: `${machine.manufacturer} ${machine.year}`,
      text_size: 14,
      color: 0x888888,
      align_h: hmUI.align.CENTER
    });

    // Enhanced mock PinTips database
    const mockTipsDB = {
      "Medieval Madness": [
        { text: "Focus on Castle Gate - shoot it to start multiball modes", priority: "high" },
        { text: "Complete Catapult targets for big points", priority: "medium" },
        { text: "Troll bombs add 2x scoring to all shots", priority: "medium" },
        { text: "Keep left flipper up during Castle multiball", priority: "high" },
        { text: "Damsel rescue is worth huge points when stacked", priority: "low" }
      ],
      "Attack from Mars": [
        { text: "Start Total Annihilation for massive scoring", priority: "high" },
        { text: "Complete Martian Attack for super jackpots", priority: "high" },
        { text: "Build up bonus multiplier early", priority: "medium" },
        { text: "Stroke of Luck can be very valuable", priority: "medium" },
        { text: "Focus on left orbit for quick progress", priority: "low" }
      ],
      "The Addams Family": [
        { text: "Get multiball started ASAP via bookcase", priority: "high" },
        { text: "Complete mansion rooms for Tour the Mansion", priority: "high" },
        { text: "Thing Flips can save difficult shots", priority: "medium" },
        { text: "Graveyard value increases throughout game", priority: "medium" },
        { text: "Electric chair scores increase with hits", priority: "low" }
      ],
      "Twilight Zone": [
        { text: "Lost in the Zone is the ultimate goal", priority: "high" },
        { text: "Complete Clock Millions for big points", priority: "high" },
        { text: "Door panels unlock major scoring", priority: "medium" },
        { text: "Gumball machine adds unpredictability", priority: "medium" },
        { text: "Piano shot requires precise timing", priority: "low" }
      ],
      "Indiana Jones": [
        { text: "Start Adventure modes for huge scoring", priority: "high" },
        { text: "Path of Adventure leads to Grail", priority: "high" },
        { text: "Jackpot value builds throughout game", priority: "medium" },
        { text: "Idol multiball is worth major points", priority: "medium" },
        { text: "Right ramp builds bonus multiplier", priority: "low" }
      ],
      "Scared Stiff": [
        { text: "Crate multiball is the key to big scoring", priority: "high" },
        { text: "Complete Stiff-O-Meter for extra ball", priority: "high" },
        { text: "Terror from the Crate mode = huge points", priority: "medium" },
        { text: "Bony Beast shots build toward multiball", priority: "medium" },
        { text: "Spider hole feeds can be dangerous", priority: "low" }
      ],
      "Theatre of Magic": [
        { text: "Grand Finale is the ultimate wizard mode", priority: "high" },
        { text: "Complete all 8 magic tricks for huge bonus", priority: "high" },
        { text: "Tiger Saw multiball builds jackpots quickly", priority: "medium" },
        { text: "Trunk shot starts most magic tricks", priority: "medium" },
        { text: "Lock balls via ramp for multiball prep", priority: "low" }
      ],
      "White Water": [
        { text: "5x Playfield multiplier is the holy grail", priority: "high" },
        { text: "Complete all rapids for Wet Willie's billions", priority: "high" },
        { text: "Multiball jackpots increase with river letters", priority: "medium" },
        { text: "Disaster Drop targets build toward 5x", priority: "medium" },
        { text: "Class VI Rapids = major risk/reward", priority: "low" }
      ],
      "Fish Tales": [
        { text: "Catch all fish for Multiball Madness", priority: "high" },
        { text: "Million+ point fish available in multiball", priority: "high" },
        { text: "Complete boat ramp for big bonuses", priority: "medium" },
        { text: "Caster's Choice can double fish values", priority: "medium" },
        { text: "Video mode gives safe points", priority: "low" }
      ],
      "Cirqus Voltaire": [
        { text: "Join the Cirqus for Highwire Multiball", priority: "high" },
        { text: "Complete all acts for The Cirqus", priority: "high" },
        { text: "Spinning ring shots build toward multiball", priority: "medium" },
        { text: "Neon multiball offers consistent scoring", priority: "medium" },
        { text: "Ring Master's choice can be very valuable", priority: "low" }
      ],
      "Bram Stoker's Dracula": [
        { text: "Castle multiball is key to huge scoring", priority: "high" },
        { text: "Complete Mist multiball for consistent points", priority: "high" },
        { text: "Coffin shot starts most major modes", priority: "medium" },
        { text: "Side ramp builds castle locks quickly", priority: "medium" },
        { text: "Video mode offers safe million+ points", priority: "low" }
      ],
      "Foo Fighters (Premium)": [
        { text: "Complete all band members for Foo Fighters multiball", priority: "high" },
        { text: "Stage lighting effects add scoring multipliers", priority: "high" },
        { text: "Hit cymbal targets to advance song progression", priority: "medium" },
        { text: "Backstage Pass shots unlock special modes", priority: "medium" },
        { text: "Encore mode can double all scoring", priority: "low" }
      ],
      "Godzilla (Premium)": [
        { text: "Destroy all cities for Godzilla multiball", priority: "high" },
        { text: "Kaiju battles offer massive point potential", priority: "high" },
        { text: "Building shots advance destruction progress", priority: "medium" },
        { text: "Mecha-Godzilla mode has huge jackpots", priority: "medium" },
        { text: "Tokyo Tower shot is worth major points", priority: "low" }
      ],
      "Guardians of the Galaxy": [
        { text: "Collect all Infinity Stones for massive wizard mode", priority: "high" },
        { text: "Groot multiball offers consistent big scoring", priority: "high" },
        { text: "Milano ramp builds toward stone collection", priority: "medium" },
        { text: "Hadron Enforcer shots multiply all scores", priority: "medium" },
        { text: "Awesome Mix modes provide steady progression", priority: "low" }
      ],
      "Iron Maiden: Legacy of the Beast": [
        { text: "Complete all album modes for Legacy wizard mode", priority: "high" },
        { text: "Eddie's Army multiball = massive scoring opportunity", priority: "high" },
        { text: "Sarcophagus shot advances album progression", priority: "medium" },
        { text: "Mummy targets build toward special modes", priority: "medium" },
        { text: "Number of the Beast adds 666x multiplier", priority: "low" }
      ],
      "James Bond 007 (Pro)": [
        { text: "Complete all missions for 007 multiball", priority: "high" },
        { text: "Q Branch upgrades provide scoring multipliers", priority: "high" },
        { text: "Aston Martin ramp advances mission progress", priority: "medium" },
        { text: "Villain shots unlock special attack modes", priority: "medium" },
        { text: "Goldeneye satellite offers huge bonus", priority: "low" }
      ],
      "John Wick": [
        { text: "Continental Hotel mode offers biggest scoring", priority: "high" },
        { text: "Complete all assassination contracts for multiball", priority: "high" },
        { text: "Gold coin shots build contract progression", priority: "medium" },
        { text: "Weapon select affects scoring multipliers", priority: "medium" },
        { text: "Excommunicado mode adds risk/reward element", priority: "low" }
      ],
      "Joker Poker": [
        { text: "Build poker hands for increasing bonuses", priority: "high" },
        { text: "Royal Flush = maximum bonus collection", priority: "high" },
        { text: "Card collection determines end-of-ball bonus", priority: "medium" },
        { text: "Joker targets multiply current hand value", priority: "medium" },
        { text: "Side targets advance card collection", priority: "low" }
      ],
      "Metallica": [
        { text: "Complete all songs for Master of Puppets wizard mode", priority: "high" },
        { text: "Electric chair multiball = huge jackpots", priority: "high" },
        { text: "Sparky shot advances song progression", priority: "medium" },
        { text: "Cross targets build toward special modes", priority: "medium" },
        { text: "Fuel tank shot provides consistent scoring", priority: "low" }
      ],
      "Skateball": [
        { text: "Complete skateboard tricks for maximum bonus", priority: "high" },
        { text: "Ramp shots build trick progression quickly", priority: "high" },
        { text: "Kickback saves are crucial for ball control", priority: "medium" },
        { text: "Drop targets advance skill level", priority: "medium" },
        { text: "Spinner shots add to current trick value", priority: "low" }
      ],
      "Terminator 2: Judgement Day": [
        { text: "Destroy Skynet for ultimate wizard mode", priority: "high" },
        { text: "Multiball modes offer massive jackpot potential", priority: "high" },
        { text: "Skull shots advance toward Judgement Day", priority: "medium" },
        { text: "Time machine locks build multiball quickly", priority: "medium" },
        { text: "Cannon shot provides dramatic scoring boost", priority: "low" }
      ]
    };

    // Get tips for this machine
    const tips = mockTipsDB[machine.name] || [
      { text: "No specific tips available for this machine", priority: "low" },
      { text: "Focus on completing objectives", priority: "medium" },
      { text: "Build up bonus and multipliers", priority: "medium" }
    ];

    // Show success message
    hmUI.showToast({ 
      text: `Loaded ${tips.length} tips for ${machine.name}` 
    });
    
    // Display tips with priority colors
    tips.forEach((tip, idx) => {
      const y = 120 + idx * 55;
      
      // Priority indicator color
      let priorityColor = 0x888888; // low = gray
      if (tip.priority === "medium") priorityColor = 0xffaa00; // medium = orange
      if (tip.priority === "high") priorityColor = 0xff4444; // high = red
      
      // Priority dot
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 20,
        y: y + 5,
        w: 8,
        h: 8,
        radius: 4,
        color: priorityColor
      });
      
      // Tip text
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 35,
        y,
        w: 340,
        h: 45,
        text: tip.text,
        text_size: 14,
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP
      });
    });

    // Back button
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 20,
      y: 360,
      w: 80,
      h: 35,
      text: "Back",
      text_size: 16,
      color: 0xffffff,
      normal_color: 0x666666,
      press_color: 0x888888,
      radius: 8,
      click_func: function() {
        console.log("Back to tournament");
        hmApp.goBack();
      }
    });
  }
});
