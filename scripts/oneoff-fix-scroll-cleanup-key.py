from pathlib import Path

path = Path('App.tsx')
text = path.read_text()
old = '      writeScrollPosition(key, window.scrollY);'
new = '      writeScrollPosition(storageLocationKey, window.scrollY);'
if text.count(old) != 1:
    raise SystemExit(f'Expected exactly one old cleanup write, found {text.count(old)}')
path.write_text(text.replace(old, new, 1))
Path('scripts/oneoff-fix-scroll-cleanup-key.py').unlink()
