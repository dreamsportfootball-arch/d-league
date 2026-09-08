import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join, parse } from 'node:path';
import { CURRENT_SEASON_ID } from '../config/siteManifest.js';

const root = process.cwd();
const seasonDir = join(root, 'data', 'seasons', CURRENT_SEASON_ID);
const playersPath = join(seasonDir, 'players.json');
const imagesPath = join(seasonDir, 'playerImages.json');
const assetsDir = join(root, 'public', 'assets', 'seasons', CURRENT_SEASON_ID, 'players');
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);

if (!existsSync(assetsDir)) {
  console.log('player image assets: no current-season asset directory');
  process.exit(0);
}

const players = JSON.parse(readFileSync(playersPath, 'utf8'));
const images = JSON.parse(readFileSync(imagesPath, 'utf8'));
const assetFiles = readdirSync(assetsDir)
  .filter((fileName) => supportedExtensions.has(extname(fileName).toLowerCase()))
  .sort();

const assetsByPlayerId = new Map();
for (const fileName of assetFiles) {
  const playerId = parse(fileName).name;
  if (assetsByPlayerId.has(playerId)) {
    throw new Error(`player image assets: duplicate files for player id ${playerId}`);
  }
  assetsByPlayerId.set(playerId, fileName);
}

let added = 0;
for (const player of players) {
  if (typeof player?.id !== 'string' || typeof player?.name !== 'string') continue;
  if (images[player.name]) continue;

  const fileName = assetsByPlayerId.get(player.id);
  if (!fileName) continue;

  images[player.name] = `assets/seasons/${CURRENT_SEASON_ID}/players/${fileName}`;
  added += 1;
}

if (added > 0) {
  writeFileSync(imagesPath, `${JSON.stringify(images, null, 2)}\n`, 'utf8');
}

console.log(`player image assets: added ${added} mapping(s)`);
