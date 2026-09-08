import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEASON_IDS } from '../config/siteManifest.js';

const root = process.cwd();
const colorPattern = /^#[0-9a-f]{6}$/i;
const kitPatterns = new Set(['solid', 'half-and-half', 'vertical-stripes', 'vertical-pinstripes', 'contrast-sleeves']);
const fail = (message) => {
  throw new Error(`Team kit validation: ${message}`);
};

for (const seasonId of SEASON_IDS) {
  const teamsPath = join(root, 'data', 'seasons', seasonId, 'teams.json');
  const teams = JSON.parse(readFileSync(teamsPath, 'utf8'));

  for (const team of teams) {
    if (team.kits === undefined) continue;
    if (!team.kits || typeof team.kits !== 'object' || Array.isArray(team.kits)) {
      fail(`${seasonId} ${team.id}: kits must be an object`);
    }

    for (const field of ['home', 'away']) {
      const value = team.kits[field];
      if (typeof value !== 'string' || !colorPattern.test(value)) {
        fail(`${seasonId} ${team.id}: kits.${field} must be a six-digit hex color`);
      }
    }

    for (const field of ['homeSecondary', 'awaySecondary']) {
      const value = team.kits[field];
      if (value !== undefined && (typeof value !== 'string' || !colorPattern.test(value))) {
        fail(`${seasonId} ${team.id}: kits.${field} must be a six-digit hex color when provided`);
      }
    }

    for (const side of ['home', 'away']) {
      const patternField = `${side}Pattern`;
      const secondaryField = `${side}Secondary`;
      const pattern = team.kits[patternField];
      if (pattern !== undefined && !kitPatterns.has(pattern)) {
        fail(`${seasonId} ${team.id}: kits.${patternField} must be one of ${[...kitPatterns].join(', ')}`);
      }
      if (pattern !== undefined && pattern !== 'solid' && team.kits[secondaryField] === undefined) {
        fail(`${seasonId} ${team.id}: kits.${secondaryField} is required for ${pattern}`);
      }
    }
  }
}

console.log('Team kit colour validation passed');
