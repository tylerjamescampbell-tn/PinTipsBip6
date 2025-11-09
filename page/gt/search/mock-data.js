// Mock tournament and PinTips data for development
export const mockTournament = {
  id: "12345",
  name: "Pinburgh 2025 - Division A",
  games: [
    { id: "g1", name: "Iron Man", manufacturer: "Stern", year: 2010 },
    { id: "g2", name: "Medieval Madness", manufacturer: "Williams", year: 1997 },
    { id: "g3", name: "Attack from Mars", manufacturer: "Bally", year: 1995 },
    { id: "g4", name: "Monster Bash", manufacturer: "Williams", year: 1998 },
    { id: "g5", name: "Twilight Zone", manufacturer: "Bally", year: 1993 },
    { id: "g6", name: "The Addams Family", manufacturer: "Bally", year: 1992 },
    { id: "g7", name: "Cirqus Voltaire", manufacturer: "Bally", year: 1997 },
    { id: "g8", name: "Theatre of Magic", manufacturer: "Bally", year: 1995 }
  ]
};

export const mockPinTips = {
  "Iron Man": [
    { tip: "Hit left ramp 3x to start Armor multiball", priority: "high" },
    { tip: "Right outlane is very aggressive - nudge carefully", priority: "medium" },
    { tip: "Complete all 6 missions for War Machine mode", priority: "high" },
    { tip: "Monger target bank gives big points when lit", priority: "low" }
  ],
  "Medieval Madness": [
    { tip: "Complete Castle missions in order: Catapult, Trolls, Damsel", priority: "high" },
    { tip: "Castle gate opens after 6 catapult hits", priority: "medium" },
    { tip: "Shoot left ramp during multiball for jackpots", priority: "high" },
    { tip: "Peasant revolt = easy points, ignore other modes", priority: "low" }
  ],
  "Attack from Mars": [
    { tip: "Complete all 5 countries to start Total Annihilation", priority: "high" },
    { tip: "Left loop -> Right loop combo for flying saucer", priority: "medium" },
    { tip: "Hit stroke of luck for random country completion", priority: "low" },
    { tip: "Super jackpot available during Rule the Universe", priority: "high" }
  ],
  "Monster Bash": [
    { tip: "Collect all 6 monsters to start Monster Bash multiball", priority: "high" },
    { tip: "Mosh pit shots are worth huge points", priority: "medium" },
    { tip: "Complete Drac's castle by hitting all 4 shots", priority: "low" }
  ],
  "Twilight Zone": [
    { tip: "Clock millions: shoot piano when lit", priority: "high" },
    { tip: "Powerball multiball: keep powerball in play", priority: "medium" },
    { tip: "Door panels unlock after hitting gumball", priority: "low" }
  ]
};
