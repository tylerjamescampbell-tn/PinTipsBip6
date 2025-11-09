// MatchPlay API integration for PinTipZ
// - Mock-first approach: returns realistic tournament data by default
// - Call setMatchPlayEndpoint() to use real MatchPlay API
// - Automatic fallback to mocks on network failure

const DEFAULT_TTL = 60 * 1000; // cache entries live 60s by default
let _matchPlayEndpoint = null;
let _pinTipsEndpoint = null;
const cache = new Map();

// Mock tournament data for development
const mockTournament = {
  id: "12345",
  name: "Pinburgh 2025 - Division A",
  games: [
    { id: "g1", name: "Iron Man", manufacturer: "Stern", year: 2010 },
    { id: "g2", name: "Medieval Madness", manufacturer: "Williams", year: 1997 },
    { id: "g3", name: "Attack from Mars", manufacturer: "Bally", year: 1995 },
    { id: "g4", name: "Monster Bash", manufacturer: "Williams", year: 1998 },
    { id: "g5", name: "Twilight Zone", manufacturer: "Bally", year: 1993 }
  ]
};

// Mock PinTips database
const mockPinTips = {
  "Iron Man": [
    { tip: "Hit left ramp 3x to start Armor multiball", priority: "high" },
    { tip: "Right outlane is very aggressive - nudge carefully", priority: "medium" },
    { tip: "Complete all 6 missions for War Machine mode", priority: "high" },
    { tip: "Monger target bank gives big points when lit", priority: "low" }
  ],
  "Medieval Madness": [
    { tip: "Complete Castle missions in this order: Catapult, Trolls, Damsel", priority: "high" },
    { tip: "Castle gate opens after 6 catapult hits", priority: "medium" },
    { tip: "Shoot left ramp during multiball for jackpots", priority: "high" },
    { tip: "Peasant revolt = easy points, ignore other modes", priority: "low" }
  ],
  "Attack from Mars": [
    { tip: "Complete all 5 countries to start Total Annihilation", priority: "high" },
    { tip: "Left loop -> Right loop combo for flying saucer", priority: "medium" },
    { tip: "Hit stroke of luck for random country completion", priority: "low" },
    { tip: "Super jackpot available during Rule the Universe", priority: "high" }
  ]
};

export function setMatchPlayEndpoint(url) {
  _matchPlayEndpoint = url;
}

export function setPinTipsEndpoint(url) {
  _pinTipsEndpoint = url;
}

export async function fetchTournament(tournamentId) {
  const key = `tournament:${tournamentId}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expires > now) return cached.data;

  // Return mock data if no endpoint configured
  if (!_matchPlayEndpoint) {
    const data = { ...mockTournament, id: tournamentId };
    cache.set(key, { data, expires: now + DEFAULT_TTL });
    return data;
  }

  // Try MatchPlay API, fallback to mock on failure
  try {
    if (typeof fetch !== 'function') throw new Error('fetch-unavailable');
    const res = await fetch(`${_matchPlayEndpoint}/tournaments/${tournamentId}`);
    if (!res.ok) throw new Error('tournament-not-found');
    const data = await res.json();
    cache.set(key, { data, expires: now + DEFAULT_TTL });
    return data;
  } catch (err) {
    // Fallback to mock data
    const data = { ...mockTournament, id: tournamentId };
    return data;
  }
}

export async function fetchPinTips(gameName) {
  const key = `tips:${gameName}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expires > now) return cached.data;

  // Return mock tips if no endpoint configured
  if (!_pinTipsEndpoint) {
    const data = mockPinTips[gameName] || [
      { tip: `No tips available for ${gameName} yet`, priority: "low" }
    ];
    cache.set(key, { data, expires: now + DEFAULT_TTL });
    return data;
  }

  // Try PinTips API, fallback to mock on failure
  try {
    if (typeof fetch !== 'function') throw new Error('fetch-unavailable');
    const res = await fetch(`${_pinTipsEndpoint}/games/${encodeURIComponent(gameName)}/tips`);
    if (!res.ok) throw new Error('tips-not-found');
    const data = await res.json();
    cache.set(key, { data, expires: now + DEFAULT_TTL });
    return data;
  } catch (err) {
    // Fallback to mock data
    const data = mockPinTips[gameName] || [
      { tip: `No tips available for ${gameName} yet`, priority: "low" }
    ];
    return data;
  }
}

export function clearCache() {
  cache.clear();
}
