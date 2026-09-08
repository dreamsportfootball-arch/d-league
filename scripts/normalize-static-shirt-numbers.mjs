import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const teamsDir = path.join(process.cwd(), 'dist', 'teams');

const walkHtmlFiles = async (dir) => {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkHtmlFiles(target));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(target);
  }
  return files;
};

const files = await walkHtmlFiles(teamsDir);
let changed = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const normalized = html.replaceAll('>#0 ', '>');
  if (normalized === html) continue;
  await writeFile(file, normalized);
  changed += 1;
}

console.log(`Static roster shirt numbers normalized in ${changed} file(s)`);
