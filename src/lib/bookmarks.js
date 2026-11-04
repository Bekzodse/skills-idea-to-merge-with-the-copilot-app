const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function normalizeUrl(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) {
      return null;
    }

    return parsed.pathname === '/' && !parsed.search && !parsed.hash
      ? parsed.href.slice(0, -1)
      : parsed.href;
  } catch {
    return null;
  }
}

export function isBookmark(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.url === 'string' &&
      normalizeUrl(value.url) === value.url &&
      typeof value.slug === 'string' &&
      /^mona-[0-9a-zA-Z]+$/.test(value.slug),
  );
}

export function loadBookmarks(rawValue) {
  if (typeof rawValue !== 'string' || !rawValue.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter(isBookmark) : [];
  } catch {
    return [];
  }
}

export function formatBookmark({ url, slug }) {
  return `${url} :: ${slug}`;
}

export function toBase62(value) {
  let number = Math.max(0, Math.floor(value));
  let result = '';

  do {
    result = BASE62[number % BASE62.length] + result;
    number = Math.floor(number / BASE62.length);
  } while (number > 0);

  return result;
}

export function createSlug(existingSlugs = []) {
  const used = new Set(existingSlugs);
  let slug;

  do {
    const randomValue = Math.floor(Math.random() * 62 ** 4);
    slug = `mona-${toBase62(randomValue).padStart(4, '0')}`;
  } while (used.has(slug));

  return slug;
}
