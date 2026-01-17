// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Rachanont';
export const SITE_DESCRIPTION =
  'On my blog, I dive into everything from pharmacy insights to the latest in tech know-how, and I even sprinkle in some financial wisdom for good measure.';
export const TWITTER_HANDLE = '@elixer';
export const MY_NAME = 'Rachanont';

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
