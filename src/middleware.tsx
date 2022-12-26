import { createIntlMiddleware } from 'next-intl/server';

// This middleware intercepts requests to `/` and will redirect
// to one of the configured locales instead (e.g. `/en`). A cookie
// is set in the background, so if the user switches to a new
// language, this language will take precedence from now on.
export default createIntlMiddleware();
