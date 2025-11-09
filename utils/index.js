export function assets(type) {
  return (path) => type + "/" + path;
}

// Re-export network helpers (optional) so pages can import from utils
export { setEndpoint, fetchPinTips, clearCache } from "./network.js";
