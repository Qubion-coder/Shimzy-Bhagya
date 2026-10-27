/** Couple names used in generated messages; keep in sync with the invitation. */
export const COUPLE = { groom: 'Shimzy', bride: 'Bhagya' } as const;

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

const PREFIX_PARAM = 't';

// Short URL codes: a link ending in "Mr." would lose its final dot when WhatsApp auto-links it
const PREFIX_CODES: Record<Exclude<Prefix, 'Dear'>, string> = {
  'Mr.': 'mr',
  'Mrs.': 'mrs',
  Miss: 'miss',
  'Mr. & Mrs.': 'mrmrs',
  Family: 'family',
};

const isPrefix = (value: string | null): value is Prefix =>
  !!value && (PREFIXES as readonly string[]).includes(value);

const prefixFromCode = (code: string | null): Prefix | '' => {
  const match = Object.entries(PREFIX_CODES).find(([, c]) => c === code?.toLowerCase());
  return match ? (match[0] as Prefix) : '';
};

/**
 * Combine prefix and name into the name shown to the guest.
 * "Dear" is a greeting style, not a title, so it never appears in the display name.
 */
export function formatDisplayName(prefix: Prefix | '', name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ');
  if (!clean) return '';
  switch (prefix) {
    case 'Family':
      return `${clean} and Family`;
    case 'Dear':
    case '':
      return clean;
    default:
      return `${prefix} ${clean}`;
  }
}

/** {origin}/{guestName}, with the prefix carried as a query param when it changes the display name. */
export function buildInviteLink(origin: string, prefix: Prefix, name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ');
  const url = `${origin.replace(/\/+$/, '')}/${encodeURIComponent(clean)}`;
  return prefix === 'Dear' ? url : `${url}?${PREFIX_PARAM}=${PREFIX_CODES[prefix]}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${COUPLE.groom} & ${COUPLE.bride}`;
}

/** Read the guest's display name from /{guestName}?t=Prefix (or the older ?title=&name= links). */
export function readGuestFromLocation(loc: Location = window.location): string {
  const params = new URLSearchParams(loc.search);

  const legacyName = params.get('name');
  if (legacyName) {
    const title = params.get('title');
    return formatDisplayName(isPrefix(title) ? title : '', legacyName);
  }

  const segment = loc.pathname.split('/').filter(Boolean)[0];
  if (!segment || segment === 'admin') return '';

  let name: string;
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }
  return formatDisplayName(prefixFromCode(params.get(PREFIX_PARAM)), name);
}
