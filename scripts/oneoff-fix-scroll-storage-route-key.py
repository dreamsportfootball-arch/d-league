from pathlib import Path

path = Path('App.tsx')
text = path.read_text()

replacements = [
    (
        """const ScrollMemory: React.FC = () => {\n  const { pathname, search, hash, key } = useLocation();\n  const navigationType = useNavigationType();\n""",
        """const ScrollMemory: React.FC = () => {\n  const { pathname, search, hash, key } = useLocation();\n  const navigationType = useNavigationType();\n  const storageLocationKey = `${key}:${pathname}${search}${hash}`;\n""",
    ),
    ('writeScrollPosition(key, window.scrollY);', 'writeScrollPosition(storageLocationKey, window.scrollY);'),
    ('  }, [key]);\n\n  useEffect(() => {\n    const handleTrackedNavigation', '  }, [storageLocationKey]);\n\n  useEffect(() => {\n    const handleTrackedNavigation'),
    ('writeScrollAnchor(key, {', 'writeScrollAnchor(storageLocationKey, {'),
    ('  }, [key]);\n\n  useLayoutEffect(() => {', '  }, [storageLocationKey]);\n\n  useLayoutEffect(() => {'),
    ("const savedPosition = navigationType === 'POP' ? readScrollPosition(key) : null;", "const savedPosition = navigationType === 'POP' ? readScrollPosition(storageLocationKey) : null;"),
    ('const savedAnchor = consumeScrollAnchor(key);', 'const savedAnchor = consumeScrollAnchor(storageLocationKey);'),
]

for old, new in replacements:
    if old not in text:
        raise SystemExit(f'Expected App.tsx pattern not found: {old!r}')
    text = text.replace(old, new, 1)

path.write_text(text)
Path('scripts/oneoff-fix-scroll-storage-route-key.py').unlink()
