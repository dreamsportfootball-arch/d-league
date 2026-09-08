import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CURRENT_SEASON_ID } from '../config/siteManifest.js';

const root = process.cwd();
const seasonDir = join(root, 'data', 'seasons', CURRENT_SEASON_ID);
const importsDir = join(seasonDir, 'registrationImports');
const teamsPath = join(seasonDir, 'teams.json');
const playersPath = join(seasonDir, 'players.json');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const fail = (message) => { throw new Error(`registration imports: ${message}`); };

if (!existsSync(importsDir)) {
  console.log('registration imports: no import directory');
  process.exit(0);
}

const importFiles = readdirSync(importsDir)
  .filter((name) => name.endsWith('.json'))
  .sort();

let teams = readJson(teamsPath);
let players = readJson(playersPath);
let importedTeamCount = 0;
let importedPlayerCount = 0;

for (const fileName of importFiles) {
  const payload = readJson(join(importsDir, fileName));
  const team = payload?.team;
  const importedPlayers = payload?.players;

  if (!team || typeof team !== 'object' || Array.isArray(team)) {
    fail(`${fileName}: missing team object`);
  }
  if (!Array.isArray(importedPlayers)) {
    fail(`${fileName}: players must be an array`);
  }
  if (team.seasonId !== CURRENT_SEASON_ID) {
    fail(`${fileName}: team seasonId must be ${CURRENT_SEASON_ID}`);
  }
  if (typeof team.id !== 'string' || !team.id.trim()) fail(`${fileName}: team id is required`);
  if (typeof team.identityId !== 'string' || !team.identityId.trim()) fail(`${fileName}: team identityId is required`);

  const seenPlayerIds = new Set();
  const seenIdentityIds = new Set();
  const seenPositiveNumbers = new Set();
  const normalizedPlayers = importedPlayers.map((player, index) => {
    const label = `${fileName} player ${index + 1}`;
    if (!player || typeof player !== 'object' || Array.isArray(player)) fail(`${label}: invalid player object`);
    if (player.teamId !== team.id) fail(`${label}: teamId must match ${team.id}`);
    if (typeof player.id !== 'string' || !player.id.trim()) fail(`${label}: id is required`);
    if (seenPlayerIds.has(player.id)) fail(`${label}: duplicate id ${player.id}`);
    seenPlayerIds.add(player.id);
    if (typeof player.identityId !== 'string' || !player.identityId.trim()) fail(`${label}: identityId is required`);
    if (seenIdentityIds.has(player.identityId)) fail(`${label}: duplicate identityId ${player.identityId}`);
    seenIdentityIds.add(player.identityId);
    if (typeof player.name !== 'string' || !player.name.trim()) fail(`${label}: name is required`);

    const shirtNumber = player.number;
    if (shirtNumber !== null && (!Number.isInteger(shirtNumber) || shirtNumber < 1 || shirtNumber > 99)) {
      fail(`${label}: shirt number must be 1-99 or null`);
    }
    if (shirtNumber !== null) {
      if (seenPositiveNumbers.has(shirtNumber)) fail(`${label}: duplicate shirt number ${shirtNumber}`);
      seenPositiveNumbers.add(shirtNumber);
    }

    // Canonical season data uses 0 as the internal sentinel for an unconfirmed shirt number.
    return { ...player, number: shirtNumber ?? 0 };
  });

  teams = teams.filter((existing) => existing.id !== team.id && existing.identityId !== team.identityId);
  teams.push(team);

  players = players.filter((existing) => existing.teamId !== team.id && !seenPlayerIds.has(existing.id));
  players.push(...normalizedPlayers);

  importedTeamCount += 1;
  importedPlayerCount += normalizedPlayers.length;
}

writeJson(teamsPath, teams);
writeJson(playersPath, players);
console.log(`registration imports: applied ${importedTeamCount} team(s), ${importedPlayerCount} player(s)`);
