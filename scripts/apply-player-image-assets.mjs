import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join, parse } from 'node:path';
import { CURRENT_SEASON_ID } from '../config/siteManifest.js';

const root = process.cwd();
const seasonDir = join(root, 'data', 'seasons', CURRENT_SEASON_ID);
const playersPath = join(seasonDir, 'players.json');
const imagesPath = join(seasonDir, 'playerImages.json');
const assetsDir = join(root, 'public', 'assets', 'seasons', CURRENT_SEASON_ID, 'players');
const extensionPriority = new Map([
  ['.png', 0],
  ['.jpg', 1],
  ['.jpeg', 2],
  ['.webp', 3],
]);

if (!existsSync(assetsDir)) {
  console.log('player image assets: no current-season asset directory');
  process.exit(0);
}

const players = JSON.parse(readFileSync(playersPath, 'utf8'));
const images = JSON.parse(readFileSync(imagesPath, 'utf8'));
const assetFiles = readdirSync(assetsDir)
  .filter((fileName) => extensionPriority.has(extname(fileName).toLowerCase()))
  .sort();

const assetsByPlayerId = new Map();
for (const fileName of assetFiles) {
  const playerId = parse(fileName).name;
  const extension = extname(fileName).toLowerCase();
  const currentFile = assetsByPlayerId.get(playerId);
  if (!currentFile) {
    assetsByPlayerId.set(playerId, fileName);
    continue;
  }

  const currentPriority = extensionPriority.get(extname(currentFile).toLowerCase());
  const nextPriority = extensionPriority.get(extension);
  if (nextPriority < currentPriority) assetsByPlayerId.set(playerId, fileName);
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
